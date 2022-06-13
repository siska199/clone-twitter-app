import { getProviders, getSession } from "next-auth/react";
import AuthPage from "../components/AuthPage";
import HomePage from "../components/HomePage";
const Home = ({ session, providers }) => {
  return <>{session ? <HomePage /> : <AuthPage providers={providers} />}</>;
};

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const providers = await getProviders();

  return {
    props: {
      session,
      providers,
    },
  };
};
