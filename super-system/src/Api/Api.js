import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

// get Bearer token from Cookie
// const token = `Bearer ${Cookies.get("token")}`;

// console.log(token);

// create the api
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://calm-beach-92689.herokuapp.com/",
  // }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/users/admin_login",
        method: "POST",
        body: user,
      }),
    }),

    // creating product
    // createProduct: builder.mutation({
    //   query: (product) => ({
    //     url: "/products",
    //     body: product,
    //     method: "POST",
    //     headers: { Authorization: token },
    //   }),
    // }),

    // // delete product
    // deleteProduct: builder.mutation({
    //   query: ({ product_id, user_id }) => ({
    //     url: `/products/${product_id}`,
    //     headers: { Authorization: token },
    //     body: {
    //       user_id,
    //     },
    //     method: "DELETE",
    //   }),
    // }),

    // // update product
    // updateProduct: builder.mutation({
    //   query: (product) => ({
    //     url: `/products/${product.id}`,
    //     headers: { Authorization: token },
    //     body: product,
    //     method: "PATCH",
    //   }),
    // }),

    // // add to cart
    // addToCart: builder.mutation({
    //   query: (cartInfo) => ({
    //     url: "/cart/add-to-cart",
    //     headers: { Authorization: token },
    //     body: cartInfo,
    //     method: "POST",
    //   }),
    // }),

    // // remove from cart
    // removeFromCart: builder.mutation({
    //   query: (body) => ({
    //     url: "/cart/remove-from-cart",
    //     headers: { Authorization: token },
    //     body,
    //     method: "POST",
    //   }),
    // }),

    // // increase cart
    // increaseCartProduct: builder.mutation({
    //   query: (body) => ({
    //     url: "/cart/increase-cart",
    //     headers: { Authorization: token },
    //     body,
    //     method: "POST",
    //   }),
    // }),

    // // decrease cart
    // decreaseCartProduct: builder.mutation({
    //   query: (body) => ({
    //     url: "/cart/decrease-cart",
    //     headers: { Authorization: token },
    //     body,
    //     method: "POST",
    //   }),
    // }),

    // // create order
    // createOrder: builder.mutation({
    //   query: (body) => ({
    //     url: "/orders",
    //     headers: { Authorization: token },
    //     method: "POST",
    //     body,
    //   }),
    // }),

    // // update Notifications
    // updateNotifications: builder.mutation({
    //   query: (id) => ({
    //     url: `/users/${id}/updateNotifications`,
    //     headers: { Authorization: token },
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  //   useCreateProductMutation,
  //   useAddToCartMutation,
  //   useRemoveFromCartMutation,
  //   useIncreaseCartProductMutation,
  //   useDecreaseCartProductMutation,
  //   useCreateOrderMutation,
  //   useDeleteProductMutation,
  //   useUpdateProductMutation,
  //   useUpdateNotificationsMutation,
} = appApi;

export default appApi;
