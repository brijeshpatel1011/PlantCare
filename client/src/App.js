import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import About from "./components/Pages/About"
import Service from "./components/Pages/Service"
import Contact from "./components/Pages/Contact"
import UploadImage from "./components/Pages/UploadImage"
import WeatherApp from "./components/Pages/WeatherApp";
import Supply from "./components/Pages/Supply";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />


			{user && <Route path="/about" exact element={<About />} /> }
			<Route path="/about" element={<Navigate replace to="/login" /> } />

			{user && <Route path="/service" exact element={<Service />} /> }
			<Route path="/service" element={<Navigate replace to="/login" /> } />

			{user && <Route path="/contact" exact element={<Contact />} />}
			<Route path="/contact" element={<Navigate replace to="/login" /> } />

			{user && <Route path="/UploadImage" exact element={<UploadImage />} />}
			<Route path="/UploadImage" element={<Navigate replace to="/login" /> } />

			{user && <Route path="/WeatherApp" exact element={<WeatherApp />} />}
			<Route path="/WeatherApp" element={<Navigate replace to="/login" /> } />

			{user && <Route path="/Supply" exact element={<Supply />} />}
			<Route path="/Supply" element={<Navigate replace to="/login" /> } />
		</Routes>
	);
}

export default App;
