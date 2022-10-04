import React from "react";
import Layout from "../layout/Layout";
import Feeds from "../components/Feeds";

const home = () => {
  return (
    <Layout title="homepage" customeStyle="flex ">
      <Feeds />
    </Layout>
  );
};
export default home;
