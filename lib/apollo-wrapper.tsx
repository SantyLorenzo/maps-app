"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  const httpLink = new HttpLink({
    fetchOptions: { cache: "no-store" },
    uri: "https://countries.trevorblades.com",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}