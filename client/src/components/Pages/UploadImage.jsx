import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./../Navbar/Navbar";
import submit from "./../../assests/submit.webp";
import detect from "./../../assests/detect.webp";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [disease, setDisease] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [supplement_name, setSuppname] = useState("");
  const [supplement_image, setSuppimage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Set state values
      setDisease(res.data.disease);
      setDescription(res.data.description);
      setSteps(res.data.possible_steps);
      setSuppname(res.data.supplement_name);
      setSuppimage(res.data.supplement_image);

      // Navigate to the Supply page with state
      navigate("/Supply", {
        state: {
          disease: res.data.disease,
          description: res.data.description,
          steps: res.data.possible_steps,
          supplement_name: res.data.supplement_name,
          supplement_image: res.data.supplement_image,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="relative">
        {/* Display selected image preview */}
        <img
          src={submit} // If imagePreview is not set, show the default image
          alt="Plant Disease Detection"
          className="w-[100%] h-[110vh]"
        />

        <div className="absolute top-0 pt-[120px] left-0 w-full h-full flex flex-wrap justify-center items-center">
          {/* Content related to plant disease detection */}
          <div className="w-80 h-[460px] p-2 bg-white rounded-xl shadow-lg hover:shadow-2xl m-4">
            <div className="p-2 text-left">
              <h5>
                <b>Why is it necessary to detect disease in plant ?</b>
              </h5>
              <p className="pt-2">
                Plant diseases affect the growth of their respective species. In
                addition, some research gaps are identified from which to obtain
                greater transparency for detecting diseases in plants, even before
                their symptoms appear clearly. Diagnosis is one of the most
                important aspects of a plant pathologist's training. Without proper
                identification of the disease and the disease-causing agent, disease
                control measures can be a waste of time and money and can lead to
                further plant losses. Proper disease diagnosis is necessary.
              </p>
            </div>
          </div>

          <div className="w-80 h-[460px] p-2 bg-white rounded-xl shadow-lg hover:shadow-2xl m-4">
            <div className="p-2">
              <h1>
                <b>Plant Disease Detection</b>
              </h1>
              <img
                className="h-[300px] p-2 object-cover rounded-xl"
                src={imagePreview || detect}
                alt=""
              />
              <form className="p-2" onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button
                  type="submit"
                  className="inline-flex items-center mt-4 justify-center py-2 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-green-600 hover:bg-green-500"
                >
                  Upload
                </button>
              </form>
              {disease && <h2>Detected Disease: {disease}</h2>}
              {description && <h2>Disease Description: {description}</h2>}
              {steps && <h2>Possible Steps: {steps}</h2>}
              {supplement_name && <h2>Supplement Name: {supplement_name}</h2>}
              {supplement_image && (
                <h2>
                  Supplement Image: <img src={supplement_image} alt="Supplements" />
                </h2>
              )}
            </div>
          </div>

          {/* Additional content */}
          <div className="w-80 h-[460px] p-2 bg-white rounded-xl shadow-lg hover:shadow-2xl m-4">
            <div className="p-2 text-left">
              <h5>
                <b>Prevent Plant Disease follow below steps:</b>
              </h5>
              <ol className="pt-2">
                <li className="pt-2">1. Follow Good Sanitation Practices.</li>
                <li className="pt-2">2. Fertilize to Keep Your Plants Healthy.</li>
                <li className="pt-2">
                  3. Inspect Plants for Diseases Before You Bring Them Home.
                </li>
                <li className="pt-2">4. Allow the Soil to Warm Before Planting.</li>
                <li className="pt-2">
                  5. Ensure a Healthy Vegetable Garden By Rotating Crops.
                </li>
                <li className="pt-2">6. Provide Good Air Circulation.</li>
                <li className="pt-2">7. Remove Diseased Stems and Foliage.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
