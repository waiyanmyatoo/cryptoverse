import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const cryptoHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '949a136004mshbafa2cd9b5da784p1c154ejsn304cbb79a9ba'
}

const fetchRequest = (url) => ({url, headers: cryptoHeaders})

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (count) => fetchRequest(`/coins?limit=${count}`),
        }),
        getCoinDetails: builder.query({
            query: (coinId) => fetchRequest(`/coin/${coinId}`),
        }),
        getCoinHistory: builder.query({
            query: ({coinId, timePeroid}) => fetchRequest(`/coin/${coinId}/history/?timeperiod=${timePeroid}`),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetCoinsQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery } = cryptoApi