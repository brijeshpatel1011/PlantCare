import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import About from "./components/Pages/About"
import Service from "./components/Pages/Service"
import Contact from "./components/Pages/Contact"

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />

			<Route path="/about" exact element={<About />} />
			<Route path="/service" exact element={<Service />} />
			<Route path="/contact" exact element={<Contact />} />
		</Routes>
	);
}

export default App;
