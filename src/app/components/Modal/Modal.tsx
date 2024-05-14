import { Character } from "@/app/page";

interface ModalProps {
  character: Character;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ character, closeModal }) => {
  console.log("character: ", character);
  const { name, gender, species, image, status, origin } = character;
  //   const closeModal = () => {
  //     const modal = document.getElementById("default-modal");
  //     modal?.classList.add("hidden");
  //   };

  return (
    <>
      <div
        id="default-modal"
        // tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        onClick={closeModal} // Закриття модального вікна при кліку на фон
      >
        <div
          className="relative p-4 w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()} // Ігнорування кліків всередині модального вікна
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal} // Закриття модального вікна при кліку на хрестик
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <img src={image} alt={name} />
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Status: <span className="text-gray-950">{status}</span>
                <span
                  className={`inline-block w-3 h-3 ml-1 rounded-full ${
                    status === "Alive" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Gender: <span className="text-gray-950">{gender}</span>
              </p>{" "}
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Species: <span className="text-gray-950">{species}</span>
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                From: <span className="text-gray-950">{origin.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
