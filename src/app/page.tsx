"use client";

import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import Card from "./components/Card/card";
import Modal from "./components/Modal/Modal";
import { urlCharacter } from "./helpers/api";
import axios from "axios";
import SortDropdown from "./components/SortDropdown/SortDropdown";

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string; // URL
  episode: string[]; // URLs
  url: string; // URL
  created: string; // Time format
}

interface DataInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export default function Home() {
  const [dataInfo, setDataInfo] = useState<DataInfo>(Object);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [filterParametr, setFilterParametr] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [modalCharacter, setModalCharacter] = useState<Character>(Object);
  const [modalIsOpen, setModalIsOpen] = useState<Boolean>(false);

  const openModal = (character: Character) => {
    setModalCharacter(character);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextPage = () => {
    return setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    return setPage((prev) => prev - 1);
  };

  const onSort = (filterParametr: string, sort: string) => {
    setFilterParametr(filterParametr),
      setSort(sort),
      setIsOpenDropdown(!isOpenDropdown);
  };

  useEffect(() => {
    let url = `${urlCharacter}/?${filterParametr}=${sort}&name=${filter}&page=${page}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setDataInfo(data.info);
        setCharacters(data.results);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Error fetching filtered data:", error);
      });
  }, [filter, filterParametr, page, sort]);

  return (
    <main className="p-[20px]">
      <h1>Dashboard</h1>

      <form>
        <div className="flex relative">
          <button
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            type="button"
          >
            <span className="text-gray-500">Sort by {filterParametr} - </span>
            {sort}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isOpenDropdown && <SortDropdown onSort={onSort} />}

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search by name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              required
            />
          </div>
        </div>
      </form>

      {errorMessage ? (
        <div className="w-[100%] h-[400px] flex items-center justify-center ">
          <p className="font-bold text-4xl text-red-300">{errorMessage}</p>
        </div>
      ) : (
        <ul className="characters">
          {characters?.map((character) => (
            <li key={character.id} className="mb-4">
              <Card character={character} openModal={openModal}></Card>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-center">
        {dataInfo?.prev ? (
          <Button disabled={false} onClick={prevPage}>
            Prev
          </Button>
        ) : (
          <Button disabled={true} onClick={prevPage}>
            Prev
          </Button>
        )}
        {dataInfo?.next ? (
          <Button disabled={false} onClick={nextPage}>
            Next
          </Button>
        ) : (
          <Button disabled={true} onClick={nextPage}>
            Next
          </Button>
        )}
      </div>

      {modalIsOpen && (
        <Modal character={modalCharacter} closeModal={closeModal} />
      )}
    </main>
  );
}
