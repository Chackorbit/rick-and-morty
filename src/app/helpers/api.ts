import axios from "axios";

export const urlCharacter = "https://rickandmortyapi.com/api/character";

export const instance = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character",
});
