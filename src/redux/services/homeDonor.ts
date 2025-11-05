import URLS from '@/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const quickDonor = createApi({
  reducerPath: 'heroDonorSearch',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.USER.GET_USERS }),
  endpoints: (builder) => ({
    getDonors: builder.query({
      query: (params) => {
        const query = {
          bloodGroup: params.bloodGroup,
          // address object থাকলে stringify করে পাঠাও
          ...(params.address ? { address: JSON.stringify(params.address) } : {})
        }

        return {
          url: '/',
          method: 'GET',
          params: query, // ✅ এখানে object থাকবে, string না
        }
      },
    }),
  }),
})

export const { useGetDonorsQuery } = quickDonor
