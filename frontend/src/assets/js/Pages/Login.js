import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(
        "/account/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("user", response.data.user);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="ml-5">
      <h1 className="font-bold text-4xl">Log In</h1>
      <div className="pt-7">
        <label className="text-gray-600 font-semibold">Username:</label>
        <br />
        <input
          value={username}
          type="text"
          className="border-gray-300 border rounded-sm outline-none p-1 w-72 h-11"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="pt-5">
        <label className="text-gray-600 font-semibold">Password:</label>
        <br />
        <input
          value={password}
          type="password"
          className="border-gray-300 border rounded-sm outline-none p-1 w-72 h-11"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={login}
        className="bg-green-300 text-white font-semibold w-72 h-11 mt-4 rounded-sm"
      >
        Log In
      </button>
      <h3 className="pt-5 font-semibold text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up!
        </Link>
      </h3>
    </div>
  );
};

export default Login;
