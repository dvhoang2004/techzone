import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity: quantity });
}

export function getCartAPI() {
  return apiClient.get("/cart");
}

export function removeFromCartAPI(productId) {
  return apiClient.patch(`/cart/remove/${productId}`);
}

export function increaseProductAPI(productId) {
  return apiClient.patch(`/cart/increase/${productId}`);
}

export function decreaseProductAPI(productId) {
  return apiClient.patch(`/cart/decrease/${productId}`);
}
