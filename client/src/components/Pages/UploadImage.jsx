import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import submit from "./../../assests/submit.webp";
import detect from "./../../assests/detect.webp";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
const { data } = await axios.get("http://localhost:8080/api/users/me", {
  headers: {
    'x-auth-token': token
  }
});
        const currentDate = new Date();
        
        if (data.subscription && new Date(data.subscription.endDate) > currentDate) {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasSubscription) {
      navigate("/Subscription");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="relative">
        <img src={submit} alt="Plant Disease Detection" className="w-[100%] h-[110vh]" />
        <div className="absolute top-0 pt-[120px] left-0 w-full h-full flex flex-wrap justify-center items-center">
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
                  {hasSubscription ? "Detect Disease" : "Subscribe to Detect"}
                </button>
              </form>
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