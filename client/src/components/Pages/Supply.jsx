import React from "react";
import { useLocation } from "react-router-dom";
import submit from "./../../assests/submit.webp";

function Supply() {
  // Use the useLocation hook to get passed state
  const location = useLocation();
  const { disease, description, steps, supplement_name, supplement_image } =
    location.state || {};

  return (
    <div className="relative">
      
      <img
        src={submit}
        alt="Plant Disease Detection"
        className="w-full h-[160vh]"
      />

      <div className="absolute top-0 container text-white text-3xl font-bold mx-auto p-4 mt-5">
        {disease && <h2>Detected Disease: {disease}</h2>}
      </div>

      <div className="absolute top-0 pt-[120px] left-0 w-full h-full container mx-auto flex flex-col items-center">
        <div className="w-[80%] bg-white p-4 rounded-lg shadow-lg border border-green-500 mb-4">
          <h5 className="text-lg font-semibold mb-2">Disease Description:</h5>
          {description && <p>{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%]">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-green-500">
            <h5 className="text-lg font-semibold mb-2">Possible Steps:</h5>
            {steps && <p>{steps}</p>}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg border border-green-500 flex flex-col items-center">
            <h5 className="text-lg font-semibold mb-2">Supplement Information:</h5>
            {supplement_image && (
              <div className="mb-4">
                <img
                  src={supplement_image}
                  alt="Supplement"
                  className="object-contain h-76 w-96 object-cover"
                />
              </div>
            )}
            {supplement_name && <h3 className="text-lg font-semibold">{supplement_name}</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supply;
