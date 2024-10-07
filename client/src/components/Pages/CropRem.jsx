import React, { useState } from 'react';

const CropRem = () => {
  // State variables to store form input values and prediction result
  const [formValues, setFormValues] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
    temperature: ''
  });
  
  const [result, setResult] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();
      setResult(data.crop);  // Set the predicted crop result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-[#07074D] text-center">Crop Recommendation Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left">Nitrogen</label>
              <input
                type="number"
                name="nitrogen"
                placeholder="Enter Nitrogen level"
                value={formValues.nitrogen}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left">Phosphorus</label>
              <input
                type="number"
                name="phosphorus"
                placeholder="Enter Phosphorus level"
                value={formValues.phosphorus}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left">Potassium</label>
              <input
                type="number"
                name="potassium"
                placeholder="Enter Potassium level"
                value={formValues.potassium}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left">Temperature</label>
              <input
                type="number"
                name="temperature"
                placeholder="Enter Temperature level"
                value={formValues.temperature}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left">Moisture</label>
              <input
                type="number"
                name="moisture"
                placeholder="Enter Moisture level"
                value={formValues.moisture}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full rounded-md bg-green-600 hover:bg-green-500 py-3 text-base font-semibold text-white transition duration-200 ease-in-out">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        <div className="w-1/2 bg-gradient-to-r from-green-100 to-green-200 p-8">
          {result && (
            <div className="mt-5 p-5 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-bold text-green-700">Recommended Crop:</h3>
              <h2 className="text-2xl font-bold text-green-800">{result}</h2>
            </div>
          )}
          {!result && (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-lg text-gray-500">Enter the details to see the recommended crop!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRem;
