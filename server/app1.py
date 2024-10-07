# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

# Load the trained model using joblib
model = joblib.load("crop_recommand.pkl")

# Route to handle crop recommendation
@app.route('/predict', methods=['POST'])
def predict():
    # Get form data from the frontend
    data = request.json
    nitrogen = float(data['nitrogen'])
    phosphorus = float(data['phosphorus'])
    potassium = float(data['potassium'])
    moisture = float(data['moisture'])
    temperature = float(data['temperature'])

    # Prepare the input for the model
    input_features = np.array([[nitrogen, phosphorus, potassium, moisture, temperature]])

    # Predict the crop using the model
    prediction = model.predict(input_features)
    crop_name = prediction[0]  # Assuming the model predicts the crop name

    # Return the predicted crop as a JSON response
    return jsonify({
        'crop': crop_name
    })

if __name__ == '__main__':
    app.run(debug=True)
