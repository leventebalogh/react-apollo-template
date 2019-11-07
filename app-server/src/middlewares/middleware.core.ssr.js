import React from "react";
import fetch from "node-fetch";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import { ApolloProvider } from "@apollo/react-common";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
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
    // Requiring in this here dynamically so we don't enforce having the client code compiled
    // during development mode. (otherwise it wouldn't find it until the client code is compiled)
    // eslint-disable-next-line
    const { App } = require("app-client/compiled/components/App");

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
