import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../layout/Modal";
import Input from "./Input";
import Select from "./Select";
import { handleModalSignUp } from "../redux/features/userSlice";
import { dataDays, dataMonths, dataYears } from "../lib/data";

const SignUp = () => {
  const dispatch = useDispatch();
  const modalSignUp = useSelector((state) => state.user.value.modalSignUp);
  const [form, setForm] = useState({
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
  });
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const dataSended = {
      name: form.name,
      email: form.email,
      birthDate: `${form.month} ${form.day} ${form.year}`,
    };
    console.log("form: ", dataSended);
  };
  const handleCloseModal = () => {
    dispatch(handleModalSignUp(!modalSignUp));
  };

  return (
    <Modal
      handleCloseModal={handleCloseModal}
      style="lg:w-[45vw] h-full no-scrollbar overflow-y-auto lg:rounded-3xl"
    >
      <form autoComplete="off" className="px-10">
        <h1 className="text-[2rem] font-bold mb-5">Create your Account</h1>
        <Input
          label="name"
          style="mb-4 h-16"
          type="text"
          handleOnChange={handleOnChange}
        />
        <Input
          label="email"
          style="h-16"
          type="email"
          handleOnChange={handleOnChange}
        />
        <div className="mt-[3rem]">
          <label className="font-bold text-[1.1rem]" htmlFor="">
            Date of birth
          </label>
          <p className="text-sm leading-2 mb-4">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <Select
              data={dataMonths}
              style="h-16 w-1/3 lg:w-[45%]"
              label="month"
              handleOnChange={handleOnChange}
            />
            <Select
              data={dataDays}
              style="h-16 w-1/4"
              label="day"
              handleOnChange={handleOnChange}
            />
            <Select
              data={dataYears}
              style="h-16 w-1/4"
              label="year"
              handleOnChange={handleOnChange}
            />
          </div>
        </div>
        <button
          onClick={(e) => handleSignUp(e)}
          className="bg-white w-full rounded-3xl h-14 text-lg text-black font-bold"
        >
          Sign Up
        </button>
      </form>
    </Modal>
  );
};

export default SignUp;
