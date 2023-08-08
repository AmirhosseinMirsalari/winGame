import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
baseUrl: "https://wingame-api.iran.liara.run/api",
headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),

  tagTypes: ["Product", "Article", "Wishlist", "Cart", "User", "Users", "Orders"],
  endpoints: () => ({}),
});
// baseUrl: "https://wingame-api.iran.liara.run/api",
