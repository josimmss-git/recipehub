import { baseURL } from "./baseUrl";

export const serverMutation = async (
  path,
  method = "POST",
  data = {}
) => {
  const res = await fetch(`${baseURL}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to make request");
  }

  return res.json();
};