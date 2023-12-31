import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import useToken from "../../../hooks/useToken";
import auth from "../../../auth/Firebase/firebase.init";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { BiHomeHeart } from "react-icons/bi";
import { ScaleLoader } from "react-spinners";
import { AppName } from "../../../AppName";

const Login = () => {
  useScrollToTop();
  useTitle("Get Started");
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token || from === "/getStarted" || auth?.currentUser?.email) {
      navigate(from, { replace: true });
      toast.success(`Welcome to ${AppName} | Keep Notes Safe, ${auth?.currentUser?.displayName}`);
    }
  }, [token, navigate, from]);

  if (gLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ScaleLoader color="#fff" />
      </div>
    );
  }

  return (
    <div className="h-screen justify-center items-center flex w-full">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <h2 className="text-center text-white text-4xl font-bold pb-6">Let's Get Started..!</h2>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline border-white text-white flex items-center justify-center rounded-full hover:bg-white duration-500 gap-2 hover:text-black w-full"
          >
            <i className="bx bxl-google text-2xl"></i>Continue with Google
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-outline border-white mt-6 text-white flex items-center justify-center rounded-full hover:bg-white duration-500 gap-2 hover:text-black w-full"
          >
            <BiHomeHeart className="text-2xl" /> Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
