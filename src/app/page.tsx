"use client";

import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import Card from "./card";
import Modal from "./components/Modal/Modal";

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
  const [page, setPage] = useState<number>(1);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [filterParametr, setFilterParametr] = useState<string>("name");

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

  useEffect(() => {
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`;

    if (filter) {
      switch (filterParametr) {
        case "name":
          url = `https://rickandmortyapi.com/api/character?name=${filter}&page=${page}`;
          break;
        case "status":
          url = `https://rickandmortyapi.com/api/character/?status=${filter}&page=${page}`;
          break;
        case "gender":
          url = `https://rickandmortyapi.com/api/character/?gender=${filter}&page=${page}`;
          break;
        case "species":
          url = `https://rickandmortyapi.com/api/character/?species=${filter}&page=${page}`;
          break;
        default:
          break;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataInfo(data.info);
        setCharacters(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // if (filter.length === 0) {
    //   fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setDataInfo(data.info);
    //       setCharacters(data.results);
    //     });
    // }

    // if (filter.length > 0) {
    //   if (filterParametr === "name") {
    //     filterByName();
    //   }
    //   if (filterParametr === "status") {
    //     filterByStatus();
    //   }
    //   if (filterParametr === "gender") {
    //     filterByGender();
    //   }
    //   if (filterParametr === "species") {
    //     filterBySpecies();
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page]);

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
            Filters by {filterParametr}{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isOpenDropdown && (
            <div
              id="dropdown"
              className="z-20 absolute top-[40px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    onClick={() => {
                      setFilterParametr("name"),
                        setIsOpenDropdown(!isOpenDropdown);
                    }}
                    className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Name
                  </button>
                </li>{" "}
                <li>
                  <button
                    onClick={() => {
                      setFilterParametr("gender"),
                        setIsOpenDropdown(!isOpenDropdown);
                    }}
                    className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Gender
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setFilterParametr("status"),
                        setIsOpenDropdown(!isOpenDropdown);
                    }}
                    className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Status
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setFilterParametr("species"),
                        setIsOpenDropdown(!isOpenDropdown);
                    }}
                    className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Species
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              required
            />
          </div>
        </div>
      </form>

      <ul className="characters">
        {characters?.map((character) => (
          <li key={character.id} className="mb-4">
            <Card character={character} openModal={openModal}></Card>
          </li>
        ))}
      </ul>
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
        <Modal character={modalCharacter} closeModal={() => closeModal()} />
      )}
    </main>
  );
}
