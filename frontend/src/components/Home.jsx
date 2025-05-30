import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils.js";
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-neutral-200 to-neutral-300 h-[1250px] md:h-[1050px] text-white container mx-auto">
        {/* Header */}
        <header className=" flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-15 h-10 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl  text-amber-900 font-bold">
              CodeCrafters
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-black rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-black rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-black rounded"
                >
                  Signup
                </Link>
                <Link
                  to={"/admin/login"}
                  className="bg-transparent text-black text-xs md:text-lg md:py-2 md:px-4 p-2 border border-black rounded"
                >
                  Admin Login
                </Link>
                
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-amber-900">
            CodeCrafters
          </h1>

          <br />
          <p className="text-gray-500">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-amber-800 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"https://youtube.com/@greatlearning?si=FqilbdOHZBCdgxD_"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-amber-800 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
        </section>
        <section className="p-10">
          <Slider className="" {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course.image.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-black">
                        {course.title}
                      </h2>
                      <Link to={`/buy/${course._id}`} className="mt-8 bg-amber-900 text-white py-2 px-4 rounded-full hover:bg-rose-500 duration-300">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <hr className=" bg-gray-900 " />
        </div>
        
        {/* Footer */}
        
        <footer className="bg-zinc-800 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl  text-amber-900  font-bold ">
                 CodeCrafters
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  youtube- CodeCrafters
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  telegram- CodeCrafters
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github- CodeCrafters
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyrights &#169; 2025
              </h3>
              <ul className=" space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
          </footer>
      
    </div>
      
  );
}

export default Home;