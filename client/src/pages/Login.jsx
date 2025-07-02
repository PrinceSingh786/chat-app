import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1c2c] bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col">
      {/*----------left-------------*/}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/*----------right------*/}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-[#23244a] text-white border-[#4f46e5] p-8 flex flex-col gap-6 rounded-2xl shadow-2xl min-w-[320px] max-w-[400px]"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white/10 text-white placeholder-gray-300 transition"
            placeholder="Full Name "
            required
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-white placeholder-gray-300 transition"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-white placeholder-gray-300 transition"
            />
          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/10 text-white placeholder-gray-300 transition"
            value={bio}
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer shadow-md hover:scale-105 transition"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
      
        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-200">
              Already have an account?
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-300 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-200">
              Create an account
              <span
                onClick={() => {
                  setCurrState("Sign up");
                }}
                className="font-medium text-violet-300 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
