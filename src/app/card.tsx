import { Character } from "./page";

interface CardProps {
  character: Character;
  openModal: (character: Character) => void;
}

const Card: React.FC<CardProps> = ({ character, openModal }) => {
  const { name, image, status, location, species, gender } = character;

  //   const openModal = () => {
  //     const modal = document.getElementById("default-modal");
  //     modal?.classList.remove("hidden");
  //   };

  return (
    <div className="card" id="card" onClick={() => openModal(character)}>
      <div className="flex items-center justify-center w-[100%] h-[200px] hover:bg-gray-300">
        <img className="w-32 h-32 rounded-[10px]" src={image} alt="img" />
        <div className="w-[400px] ml-4 ">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-gray-600">{gender}</p>
          <p className="text-gray-600">{species}</p>
          <p className="text-gray-600">
            {status}
            <span
              className={`inline-block w-3 h-3 ml-1 rounded-full ${
                status === "Alive" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Card;
