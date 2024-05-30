import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

export default function LoginNGO() {
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminEmail = (event) => {
    setAdminEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleApi = (event) => {
    // console.log(adminUsername);
    event.preventDefault();
    axios
      .post("http://localhost:8086/NGOLogin", {
        username: adminEmail,
        password: password,
      })
      .then((result) => {
        if (result.data === "Logged In") {
          alert("Log In Successful");
          message();
          window.location.href = "/auth/dashboard";
        } else {
          alert("Wrong Credentials");
          invalid();
        }
      })
      .catch((err) => console.log(err));
  };
  const invalid = () => {
    toast.warn("Wrong Credentials");
  };
  const message = () => {
    toast.success("Login Successful");
  };
  return (
    <>
      <main className="mt-12">
        <section>
          <ToastContainer />
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h1 className="font-bold text-4xl text-blue-600 text-center">
                        Login NGO
                      </h1>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <small>Sign in with credentials</small>
                    </div>
                    <form onSubmit={handleApi}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Admin Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Admin Email"
                          value={adminEmail}
                          onChange={handleAdminEmail}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          required={true}
                          value={password}
                          onChange={handlePassword}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          LogIn
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2 text-left   ">
                    <Link to="/RegisterForNGO" className="text-white">
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
