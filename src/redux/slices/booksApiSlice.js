import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../axios/apiService"

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => 'api/books'
        }),
        getBookById: builder.query({
            query: (id) => `api/books/${id}`
        }),
        getUserInfo: builder.mutation({
            query: (body) => ({
                url: `api/auth/me`,
                method: 'GET',
                body,
              }),
        })
    })
})
export const { useGetBooksQuery , useGetBookByIdQuery ,useGetUserInfoMutation } = booksApi