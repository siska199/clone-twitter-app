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
    <Layout title="login" customeStyle="grid md:grid-cols-2">
      <section className="hidden md:block ">
        <div className="h-full flex">
          <img
            className="object-cover md:object-cover"
            src="/assets/bg-twitter-login.webp"
            alt=""
          />
        </div>
      </section>

      <section className=" px-[2rem] w-full h-full flex flex-col justify-center items-center">
        <BsTwitter size="2rem" />
        <h1 className="font-bold text-[3.3rem] text-center tracking-wider">
          Happening now
        </h1>
        <form action="" className=" flex flex-col items-center md:items-start">
          <h5 className="font-bold text-[1.7rem] mb-4 tracking-[0.15rem]">
            Join Twitter Today
          </h5>
          {Object.values(providers).map((provider) => (
              <button
                onClick={(e) => handleSignUp(e, provider.id)}
                key={provider.name}
                className="bg-gray-200 text-black mx-auto w-full md:w-fit px-4 rounded-3xl py-[0.5rem] flex justify-center items-center font-medium hover:bg-gray-300"
              >
                <FcGoogle className="mr-3" />
                Sign In with {provider.name}
              </button>
            ))}
        </form>
      </section>
    </Layout>
  );
};
export default AuthPage;
