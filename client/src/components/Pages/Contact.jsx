import Navbar from "../Navbar/Navbar";
import contact from "../../assests/cont.jpg";
import "./HeroStyles.css";
import Footer from "./Footer";


import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/contact";
      const { data: res } = await axios.post(url, data);
      alert("Message sent successfully");
      console.log(res.message);
      setData({
        fullName:"",
        email:"",
        subject:"",
        message:"",
      });

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero-mid">
        <img src={contact} alt="hero" />

        <div className="hero-text">
          <h1>Contact</h1>
        </div>
      </div>

      <div class="flex items-center justify-center p-12 text-left">
        <div class="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit} >
            <div class="mb-5">
              <label
                for="name"
                class="mb-3 block text-base font-medium text-[#07074D] "
              >
                Full Name
              </label>
              <input
               type="text"
               name="fullName"
               id="fullName"
               value={data.fullName}
               onChange={handleChange}
               placeholder="Enter your fullname"
               required
               class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="email"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="subject"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={data.subject}
                onChange={handleChange}
                placeholder="Enter your subject"
                required
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="message"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                onChange={handleChange}
                value={data.message}
                placeholder="Type your message"
                required
                class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              ></textarea>
            </div>
            <div>
                {error && <div className="error_msg">{error}</div>}
              <button type="submit" class="hover:shadow-form rounded-md bg-green-600 hover:bg-green-500 py-3 px-8 text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
