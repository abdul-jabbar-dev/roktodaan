import URLS from "@/config";
import { getItemFromStore } from "@/utils/store/localstore";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const request = createApi({
  reducerPath: "requestDonation",
  baseQuery: fetchBaseQuery({
    baseUrl: URLS.REQUEST.BASE,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json; charset=UTF-8");

      try {
        const tokenStr = getItemFromStore();
        const token = tokenStr ? JSON.parse(tokenStr)?.token : null;

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRequest: builder.query({
      query: (params) => {
        return {
          url: "/",
          method: "GET",
          params,
        };
      },
    }),
    publishRequest: builder.mutation({
      query: (request) => {
        // Merge address fields into the root object if address exists
        const data = request.address
          ? { ...request, ...request.address }
          : { ...request };

        // Remove the nested address key (optional)
        delete data.address;

        return {
          url: "/publish",
          method: "POST",
          body: data,
        };
      },
    }),
    makeAppoinmentRequest: builder.mutation({
      query: (request) => {
          
        return {
          url: "/appointment",
          method: "POST",
          body: request,
        };
      },
    }),
  }),
});

export const { useGetRequestQuery, usePublishRequestMutation,useMakeAppoinmentRequestMutation } = request;
