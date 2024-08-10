import home from "../../assests/Home.jpeg"
import "./HeroStyles.css"
import leaf from "../../assests/leafdetect.jpg"
import crop from "../../assests/cropdetect.jpg"
import weather from "../../assests/weather.jpg"

const Home = () => {

    return(
        <>
        <div className="hero">
            <img src={home} alt="hero" />
            <div className="hero-text">
                <h1>Cultivate Success with PlantCare</h1>
                <p>Where Technology Meets Sustainable Farming</p>
            </div>
        </div>


        <div class="text-4xl font-extrabold dark:text-black pt-10 pb-10">
            <h2>Our Features</h2>
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
          
        </div>
      </div>
        </>
    )
}

export default Home;