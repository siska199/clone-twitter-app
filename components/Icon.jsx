import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Icon = ({ data }) => {
  const router = useRouter();
  const { menu} = router.query;
  return (
    <Link href={`/?menu=${data?.name.toLowerCase()}`}>
      <div
        className={`${!data.important && "hidden"} ${
          menu == data?.name.toLowerCase() && "bg-zinc-900"
        } sm:flex  gap-4 cursor-pointer rounded-full text-white  hover:bg-zinc-900 w-auto  justify-start items-center px-3 py-[0.7rem] text-[1.2rem]`}
      >
        <div className="text-[1.7rem] font-thin">{data.icon}</div>
        <div className="hidden lg:block">{data.name}</div>
      </div>
    </Link>
  );
};
export default Icon;
