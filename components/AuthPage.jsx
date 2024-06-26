import React from "react";
import Layout from "../layout/Layout";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleModalSignUp,
  handleModalSignIn,
} from "../redux/features/userSlice";

const AuthPage = ({ providers }) => {
  const dispatch = useDispatch();
  const modalSignUp = useSelector((state) => state.user.value.modalSignUp);
  const modalSignIn = useSelector((state) => state.user.value.modalSignIn);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(handleModalSignIn(!modalSignIn));
  };
  const handleSignUp = (e, id) => {
    e.preventDefault();
    id ? signIn(id) : dispatch(handleModalSignUp(!modalSignUp));
  };

  return (
    <Layout title="login" customeStyle="grid grid-cols-2">
      <section className="hidden md:block ">
        <div className="h-full flex">
          <img
            className="object-cover md:object-cover"
            src="/assets/bg-twitter-login.webp"
            alt=""
          />
        </div>
      </section>

      <section className="w-full col-span-2 md:col-span-1 p-8 space-y-[3rem]">
        <BsTwitter size="2rem" />
        <h1 className="font-bold text-[3.3rem] tracking-wider">
          Happening now
        </h1>
        <form action="" className=" flex flex-col items-center md:items-start">
          <h5 className="font-bold text-[1.7rem] mb-4 tracking-[0.15rem]">
            Join Twitter Today
          </h5>
          <div className="flex flex-col space-y-3 text-black w-[60%] lg:w-full  text-sm ">
            {/* <button
              onClick={(e) => handleSignUp(e)}
              className="bg-sky-600 rounded-3xl py-[0.5rem] font-medium text-white hover:bg-sky-500"
            >
              Sign Up with phone or email
            </button>
            <div className="text-center">
              <p className="line relative text-white ">OR</p>
            </div> */}
            {Object.values(providers).map((provider) => (
              <button
                onClick={(e) => handleSignUp(e, provider.id)}
                key={provider.name}
                className="bg-gray-200 w-fit px-4 rounded-3xl py-[0.5rem] flex justify-center items-center font-medium hover:bg-gray-300"
              >
                <FcGoogle className="mr-3" />
                Sign Up / Sign In with {provider.name}
              </button>
            ))}
            {/* <p className="text-gray-400 text-[0.6rem] leading-3">
              By signing up, you agree to the{" "}
              <span className="text-sky-400"> Terms of Service</span> and{" "}
              <span className="text-sky-400">Privacy Policy,</span>{" "}
              <span className="text-sky-400">including Cookie Use</span>.
            </p> */}
          </div>
          {/* <div className="flex flex-col w-[60%] lg:w-[40%] mt-[3rem]">
            <h5 className="font-medium mb-3 text-medium">
              Already have account
            </h5>
            <button
              onClick={(e) => handleSignIn(e)}
              className="border-[0.05rem] rounded-3xl py-[0.5rem] font-medium text-sm text-sky-500 hover:bg-gray-800"
            >
              Sign In
            </button>
          </div> */}
        </form>
      </section>
      {modalSignUp && <SignUp />}
      {modalSignIn && <SignIn providers={providers} />}
    </Layout>
  );
};
export default AuthPage;
