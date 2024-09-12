from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import pandas as pd
import warnings
from flask_cors import CORS  # Import the CORS library

warnings.filterwarnings('ignore')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Apply CORS to the app

# Load your trained model
model = tf.keras.models.load_model("Plant_Model.h5")

# Define the class names
# class_names = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 
#                'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 
#                'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
#                'Common_rust', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 
#                'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 
#                'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 
#                'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 
#                'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 
#                'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 
#                'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 
#                'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 
#                'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 
#                'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']

class_names = [
    'Apple - Apple Scab', 'Apple - Black Rot', 'Apple - Cedar Apple Rust', 
    'Apple - Healthy', 'Blueberry - Healthy', 'Cherry (Including Sour) - Powdery Mildew', 
    'Cherry (Including Sour) - Healthy', 'Corn (Maize) - Cercospora Leaf Spot (Gray Leaf Spot)', 
    'Corn (Maize) - Common Rust', 'Corn (Maize) - Northern Leaf Blight', 'Corn (Maize) - Healthy', 
    'Grape - Black Rot', 'Grape - Esca (Black Measles)', 'Grape - Leaf Blight (Isariopsis Leaf Spot)', 
    'Grape - Healthy', 'Orange - Huanglongbing (Citrus Greening)', 'Peach - Bacterial Spot', 
    'Peach - Healthy', 'Bell Pepper - Bacterial Spot', 'Bell Pepper - Healthy', 
    'Potato - Early Blight', 'Potato - Late Blight', 'Potato - Healthy', 'Raspberry - Healthy', 
    'Soybean - Healthy', 'Squash - Powdery Mildew', 'Strawberry - Leaf Scorch', 
    'Strawberry - Healthy', 'Tomato - Bacterial Spot', 'Tomato - Early Blight', 
    'Tomato - Late Blight', 'Tomato - Leaf Mold', 'Tomato - Septoria Leaf Spot', 
    'Tomato - Spider Mites (Two-Spotted Spider Mite)', 'Tomato - Target Spot', 
    'Tomato - Tomato Yellow Leaf Curl Virus', 'Tomato - Tomato Mosaic Virus', 'Tomato - Healthy'
]


# Import disease information and supplement data
disease_info = pd.read_csv("disease_info.csv", encoding='cp1252')
supplement_info = pd.read_csv("supplement_info.csv")

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    file = request.files['image'].read()
    image = Image.open(io.BytesIO(file)).resize((128, 128))

    # Preprocess the image
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)

    # Predict using the model
    prediction = model.predict(img_array)
    result_index = np.argmax(prediction)
    predicted_class = class_names[result_index]

    # Fetch disease description and possible steps
    disease_name = disease_info.loc[result_index,:][ 'description']
    possible_steps = disease_info.loc[result_index,:][ 'Possible Steps']

    # Fetch supplement information
    supp_name = supplement_info.loc[result_index,:][ 'supplement name']
    supp_img = supplement_info.loc[result_index,:][ 'supplement image']

    # Return the prediction and additional information as JSON
    return jsonify({
        'disease': predicted_class,
        'description': disease_name,
        'possible_steps': possible_steps,
        'supplement_name': supp_name,
        'supplement_image': supp_img
    })

if __name__ == '__main__':
    app.run(debug=True)
