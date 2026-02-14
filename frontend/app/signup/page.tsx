"use client";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignupPage() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
  }, [loginWithRedirect]);

  return <p>Redirecting to sign up...</p>;
}
