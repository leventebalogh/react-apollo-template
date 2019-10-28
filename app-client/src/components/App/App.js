import React from "react";
import { Router } from "@reach/router";
import { Layout, LayoutTitle } from "../Layout";
import { Foo } from "../Foo";

export const App = () => (
  <Layout>
    <Router>
      <LayoutTitle title="Main Path" path="/" />
      <LayoutTitle title="Bar" path="/bar" />
      <Foo path="/foo" />
    </Router>
  </Layout>
);
