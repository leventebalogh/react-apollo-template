import React from "react";
import fetch from "node-fetch";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import { ApolloProvider } from "@apollo/react-common";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { App } from "app-client/compiled/components/App";
import { readClientFile } from "../utils";
import { config } from "../services";

const HTML = readClientFile("build/index.html");

const getClient = req => {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: `http://localhost:${config.port}/graphql`,
      credentials: "same-origin",
      fetch,
      headers: {
        cookie: req.header("Cookie")
      }
    })
  });
};

export const getSSRMiddleware = () => {
  return async (req, res) => {
    // We are requireing this in here dynamically because we only want to use
    // the different "babel-node" config in production mode. (which allows transpilation of code outside of this package)
    // eslint-disable-next-line

    const client = getClient(req);
    const WrappedApp = () => (
      <ApolloProvider client={client}>
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>
      </ApolloProvider>
    );

    await getDataFromTree(<WrappedApp />);
    const renderedMarkup = renderToString(<WrappedApp />);
    const renderedHtml = HTML.replace(
      '<div id="react-app"></div>',
      `<div id="react-app">${renderedMarkup}</div>`
    );

    res.send(renderedHtml);
  };
};
