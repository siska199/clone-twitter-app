import Layout from "../../layout/Layout";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import { BsCalendar3 } from "react-icons/bs";
import { dataMenuProfile } from "../../lib/data";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetPosts,
  handleResetPosts,
} from "../../redux/features/postSlice";

const profile = ({ profile }) => {
  const posts = useSelector((state) => state.post.value.posts);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("tweets");
  const bgGray =
    "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-dark-gray-solid-color-background.jpg";
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(handleGetPosts({ idUser: id }));
  }, []);

  const handleSetActive = async (name) => {
    setActiveMenu(name);
    dispatch(handleResetPosts());
    switch (name) {
      case "tweets":
        dispatch(handleGetPosts({ idUser: id }));
        break;
      case "tweets & replies":
        dispatch(handleGetPosts({ idUser: id, comments: true }));
        break;
      case "media":
        break;
      case "likes":
        dispatch(handleGetPosts({ idUser: id, likes: true }));
        break;
      case "":
        break;
    }
  };

  return (
    <Layout title={"profile"} customeStyle={"flex"}>
      <>
        <Navbar />
        <section className="relative flex flex-col">
          <img className="h-[13rem] w-full" src={bgGray} alt="" />

          <div className="absolute rounded-full -bottom-[9rem] left-[1rem] ">
            <img
              src={profile.image}
              alt=""
              className="w-[9rem] border-[0.5rem] border-black  h-[9rem] rounded-full"
            />
            <h1 className="font-bold text-[1.2rem]">{profile.name}</h1>
            <p className="text">@{profile.username}</p>
            <p className="text my-2 flex gap-2 items-center">
              <BsCalendar3 /> Joined May 2022
            </p>
            <div className="flex gap-4 text-sm">
              <p className="text cursor-pointer hover:underline hover:underline-offset-1">
                <span className="text-white font-bold">1</span> Following
              </p>
              <p className="text cursor-pointer hover:underline hover:underline-offset-1">
                <span className="text-white font-bold">0</span> Followers
              </p>
            </div>
          </div>

          <button className="ml-auto hover:bg-gray-800 mt-2 px-5 py-2 font-semibold border-[0.005rem] border-slate-500 rounded-full mr-[1rem]">
            Edit Profile
          </button>
        </section>
        <section className="mt-[10rem]">
          <nav className="">
            <ul className="flex justify-between">
              {dataMenuProfile.map((data, i) => (
                <li
                  key={i}
                  onClick={() => handleSetActive(data.name.toLocaleLowerCase())}
                  className={`${
                    activeMenu === data.name.toLocaleLowerCase() &&
                    "bg-zinc-900"
                  } text cursor-pointer text-center py-3 w-full border-b-[0.005rem] border-gray-600 hover:bg-zinc-900`}
                >
                  {data.name}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {posts.map((data, i) => (
              <Post data={data} key={i} />
            ))}
          </div>
        </section>
      </>
    </Layout>
  );
};

export default profile;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const profile = await fetch(`http://localhost:3000/api/users/${id}`).then(
    (res) => res.json()
  );

  return {
    props: {
      profile,
    },
  };
};
