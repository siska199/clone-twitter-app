import React from "react";
import Layout from "../layout/Layout";
import Feeds from "../components/Feeds";

import LoadingPage from "../components/LoadingPage";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const home = () => {
  const loading = useSelector((state) => state.post.value.loading);
  return (
    <Layout title="homepage" customeStyle="flex ">
      <Feeds />
      {loading && <LoadingPage />}
    </Layout>
  );
};
export default home;
