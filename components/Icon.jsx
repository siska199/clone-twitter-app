import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import {
  handleResetPosts,
} from "../redux/features/postSlice";
const Icon = ({ data }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const route = router.route.split("/")[1];
  const active = route == data?.name.toLowerCase();
  const path =
    data.path == "profile" ? `${data.path}/${session?.user?.id}` : data.path;
  const handleNavigateMenu = () => {
    dispatch(handleResetPosts());
    router.push(`/${path}`);
  };
  return (
    <div
      onClick={() => handleNavigateMenu()}
      className={`${!data.important && "hidden"} ${
        active && "bg-zinc-900"
      } sm:flex  gap-4 cursor-pointer rounded-full text-white  hover:bg-zinc-900 w-auto  justify-start items-center px-3 py-[0.7rem] text-[1.2rem]`}
    >
      <div className="text-[1.7rem] font-thin">{data.icon}</div>
      <div className="hidden lg:block">{data.name}</div>
    </div>
  );
};
export default Icon;
