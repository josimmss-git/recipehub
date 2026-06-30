import { baseURL } from "./baseUrl";

export const serverMutation = async (
  path,
  method = "POST",
  data = {}
) => {
  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to make request");
  }

  return res.json();
};