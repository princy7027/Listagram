import localStore from "./localstore.util";

export const getToken = () => localStore.get_data("token");

export const setToken = (token) => localStore.store_data("token", token);

export const deleteToken = () => localStore.remove_data("token");


export const getUser = () => localStore.get_data("user");

export const setUser = (token) => localStore.store_data("user", token);

export const deleteuser = () => localStore.remove_data("user");
