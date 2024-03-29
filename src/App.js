import React from "react";
import {
  ApolloClient,
  InMemoryCache, 
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HomePage from "./pages/HomePage";
import "@stripe/stripe-js"

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "https://e--commerce-backend-2351df4a39a2.herokuapp.com/graphql ",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}
