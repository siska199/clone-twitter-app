import React from "react";
import Layout from "../layout/Layout";
import { BsTwitter } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const AuthPage = ({ providers }) => {
  console.log("providers Auth: ", providers);
  const handleSignIn = (e,id) => {
    e.preventDefault();
    signIn(id);
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
          <div className="flex flex-col space-y-3 text-black w-[60%] lg:w-[40%]  text-sm ">
            <button className="bg-sky-600 rounded-3xl py-[0.5rem] font-medium text-white hover:bg-sky-500">
              Sign in with phone or email
            </button>
            <div className="text-center">
              <p className="line relative text-white ">OR</p>
            </div>
            {Object.values(providers).map((provider) => (
              <button
                onClick={(e) => handleSignIn(e, provider.id)}
                key={provider.name}
                className="bg-gray-200 rounded-3xl py-[0.5rem] flex justify-center items-center font-medium hover:bg-gray-300"
              >
                <FcGoogle className="mr-3" />
                Sign in with {provider.name}
              </button>
            ))}
            <p className="text-gray-400 text-[0.6rem] leading-3">
              By signing up, you agree to the{" "}
              <span className="text-sky-400"> Terms of Service</span> and{" "}
              <span className="text-sky-400">Privacy Policy,</span>{" "}
              <span className="text-sky-400">including Cookie Use</span>.
            </p>
          </div>
          <div className="flex flex-col w-[60%] lg:w-[40%] mt-[3rem]">
            <h5 className="font-medium mb-3 text-medium">
              Already have account
            </h5>
            <button className="border-[0.05rem] rounded-3xl py-[0.5rem] font-medium text-sm text-sky-500 hover:bg-gray-800">
              Sign In
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};
export default AuthPage;
