"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

interface Auth0ProviderWrapperProps {
  children: React.ReactNode;
}

export default function Auth0ProviderWrapper({ children }: Auth0ProviderWrapperProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
