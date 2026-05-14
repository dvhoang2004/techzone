import { jwtDecode } from "jwt-decode";

import apiClient from "../utils/api-client";

const tokenName = "token";

export async function signup(userData, profile) {
  const body = new FormData();
  body.append("name", userData.name);
  body.append("email", userData.email);
  body.append("password", userData.password);
  body.append("deliveryAddress", userData.address);
  body.append("profilePic", profile);
  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem(tokenName, data.token);
}

export async function login(user) {
  const { data } = await apiClient.post("/user/login", user);
  localStorage.setItem(tokenName, data.token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
