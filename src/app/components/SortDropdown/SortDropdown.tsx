const options = [
  {
    title: "gender",
    options: ["male", "female", "genderless", "unknown"],
  },
  {
    title: "status",
    options: ["alive", "dead", "unknown"],
  },
];

interface SortDropdownProps {
  onSort: (category: string, option: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  return (
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
            onClick={() => onSort("", "")}
            className="w-[100%] block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Reset
          </button>
        </li>
        {options.map((group) => (
          <li key={group.title}>
            <p className="font-bold">
              {group.title.charAt(0).toUpperCase() + group.title.slice(1)}
            </p>
            {group.options.map((option) => (
              <button
                key={option}
                onClick={() => onSort(group.title, option)}
                className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;
