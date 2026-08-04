import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://mortenserver.limestoneweb.se/api",
});

API.interceptors.request.use(
  (req) => {
    const token = Cookies.get("jwtToken");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const validateToken = () => API.get("/users/validateToken");
export const signIn = (formData) => API.post("/users/signin", formData);
export const signOut = () => API.post("/users/signout");
export const signUp = (formData) => API.post("/users/signup", formData);

// Menu and Category API calls
export const getCategory = () => API.get("/menus/getCategory");
export const getMenuCategory = () => API.get("/menus/getMenuCategory");

// Player API calls
export const getPlayer = () => API.get("/players");
export const getPlayers = ({ key, page = 1 }) =>
  API.get("/players/listPlayers", { params: { key: key || "none", page } });
export const getPlayerById = (id) => API.get(`/players/${id}`);
export const getPlayersBySearch = ({ searchQuery, page }) =>
  API.get("/players/search", {
    params: { searchQuery: searchQuery || "none", page },
  });

// Category management API calls
export const addCategory = (newCategory) =>
  API.post("/menus/addCategory", newCategory);
export const deleteCategory = (id) => API.delete(`/menus/deleteCategory/${id}`);
export const addSubCategory = (newSubCategory) =>
  API.post("/menus/addSubCategory", newSubCategory);
export const deleteSubCategory = (categoryId, subCategoryName) =>
  API.delete(
    `/menus/deleteSubCategory?categoryId=${categoryId}&subCategoryName=${subCategoryName}`
  );

// Player management API calls
export const addPlayer = (formData) => API.post("/players", formData);
export const updatePlayer = (id, formData) =>
  API.post(`/players/updatePlayer/${id}`, formData);
export const deletePlayer = (formData) => API.delete(`players/${formData}`);
