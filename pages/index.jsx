import { getProviders, getSession } from "next-auth/react";
import AuthPage from "../components/AuthPage";
import HomePage from "../components/HomePage";
import { useSession } from "next-auth/react";

const Home = ({ providers }) => {
  const { data: session, status } = useSession();
  return <>{session ? <HomePage /> : <AuthPage providers={providers} />}</>;
};

export default Home;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
