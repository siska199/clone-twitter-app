import { getProviders, getSession } from "next-auth/react";
import AuthPage from "../components/AuthPage";

const index = ({ providers }) => {
  return <AuthPage providers={providers} />;
};

export default index;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
