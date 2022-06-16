import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../layout/Modal";
import Input from "./Input";
import { FcGoogle } from "react-icons/fc";
import { handleModalSignIn } from "../redux/features/userSlice";
import { signIn } from "next-auth/react";

const SignIn = ({ providers }) => {
  const dispatch = useDispatch();
  const modalSignIn = useSelector((state) => state.user.value.modalSignIn);
  const initialStateForm = {
    email: "",
    password: "",
  }
  const [form, setForm] = useState(initialStateForm)
  const handleCloseModal = () => {
    dispatch(handleModalSignIn(!modalSignIn));
  };
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignIn = (e, id) => {
    e.preventDefault();
    if (id) return signIn(id);
    console.log("form sign in: ", form)
  };
  return (
    <Modal
      handleCloseModal={handleCloseModal}
      style="lg:w-[45vw] h-full no-scrollbar flex flex-col overflow-y-auto lg:rounded-3xl"
    >
      <form action="" autoComplete="off" className="lg:w-2/3 mx-auto">
        <h1 className="text-[2rem] font-bold mb-8 text-center">
          Sign in to twitter
        </h1>
        {Object.values(providers).map((provider) => (
          <button
            onClick={(e) => handleSignIn(e, provider.id)}
            key={provider.name}
            className="bg-gray-200 w-full text-black rounded-3xl py-[0.5rem] flex justify-center items-center font-medium hover:bg-gray-300"
          >
            <FcGoogle className="mr-3" />
            Sign In with {provider.name}
          </button>
        ))}
        <div className="text-center my-3">
          <p className="line relative text-white ">or</p>
        </div>
        <Input
          handleOnChange={handleOnChange}
          label="email"
          style="mb-4 h-16"
          type="email"
        />
        <Input
          handleOnChange={handleOnChange}
          label="password"
          style="mb-4 h-16"
          type="password"
        />
        <button
          onClick={(e) => handleSignIn(e)}
          className="bg-white w-full mt-5 rounded-3xl h-10 text-lg text-black font-bold"
        >
          Sign In
        </button>
      </form>
    </Modal>
  );
};

export default SignIn;
