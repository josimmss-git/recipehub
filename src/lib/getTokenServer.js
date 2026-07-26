import { headers } from "next/headers";
import { auth } from "./auth";


export const getTokenServer = async () => {
  const { token } = await auth.auth.api.getToken({
    headers:await headers()
  })
  return token || null;
}