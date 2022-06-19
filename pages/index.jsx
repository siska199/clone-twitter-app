import { getProviders, getSession } from "next-auth/react";
import AuthPage from "../components/AuthPage";
import HomePage from "../components/HomePage";

const Home = ({ providers, auth }) => {
  return <>{auth ? <HomePage /> : <AuthPage providers={providers} />}</>;
};

export default Home;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const sessions = await getSession(context);
  const auth = sessions ? true : false;
  return {
    props: {
      providers,
      auth,
    },
  };
};
