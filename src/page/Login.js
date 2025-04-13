import React from "react";
import signUpGif from "../assets/login-animation.gif";
import { BiShowAlt } from "react-icons/bi";
import { GrHide } from "react-icons/gr";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPass((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      try {
        const fetchData = await fetch(
          `http://localhost:8080/api/auth/authenticate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();

        if (dataRes.access_token) {
          // Save token
          login(dataRes.access_token);
          navigate("/krye");
        
        }
      } catch (error) {
        toast.error("Gabim gjatë kyçjes.");
      }
    } else {
      toast.error("Ju lutem plotësoni të gjitha fushat.");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign U6p</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={signUpGif} className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Fjalekalimi</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPass ? <BiShowAlt /> : <GrHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Kyçu
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Nuk ke llogari ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Regjistrohu
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
