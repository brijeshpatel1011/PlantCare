import Navbar from "../Navbar/Navbar";
import service from "../../assests/Servicemain.jpg";
import Footer from "./Footer";
import leaf from "../../assests/leafdetect.jpg"
import crop from "../../assests/cropdetect.jpg"
import weather from "../../assests/weather.jpg"
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <>
      <Navbar />
      <div className="hero-mid">
        <img src={service} alt="hero" />
        <div className="hero-text">
          <h1>Service</h1>
        </div>
      </div>

        <div class="text-4xl font-extrabold dark:text-black pt-10 pb-10">
            <h2>Our Services</h2>
        </div>
      <div class="w-full  gap-8 flex-wrap flex justify-center items-center pb-16">
        <div class="w-80 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img
            class="h-40 object-cover rounded-xl "
            src={leaf}
            alt=""
          />
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Disease Ditection</h2>

            <p class="text-sm text-gray-600">
            Accurately identify leaf diseases with precision for given images and provides supplements.
            </p>
          </div>

          <div class="m-2">
            <Link to="/UploadImage"  class="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-500">
              Try it
              <i class="fa-solid fa-arrow-right pl-2"></i>
            </Link>{" "}
          </div>
        </div>

        <div class="w-80 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img
            class="h-40 object-cover rounded-xl "
            src={crop}
            alt=""
          />
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Crop Recommendation</h2>

            <p class="text-sm text-gray-600">
            A personalized crop suggestion system that recommends the most suitable crops for a given parameters.
            </p>
          </div>

          <div class="m-2">
            <button class="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-500">
              Try it
              <i class="fa-solid fa-arrow-right pl-2"></i>
            </button>{" "}
          </div>
        </div>

        <div class="w-80 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img
            class="h-40 object-cover rounded-xl"
            src={weather}
            alt=""
          />
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Weather Forcast</h2>
            <p class="text-sm text-gray-600">
            A real-time weather forecasting system that provides you with accurate and localized weather updates.
            </p>
          </div>
          <div class="m-2">
            <Link to="/WeatherApp" class="text-white bg-green-600 px-3 py-1 rounded-md hover:bg-green-500">
              Try it
              <i class="fa-solid fa-arrow-right pl-2"></i>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Service;
