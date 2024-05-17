import { useState } from "react";
import ListElement from "./ListElement";
import logo from "../../../assets/logos/logo_side.png";
import menuData from "../menu.json";
import { LockOpenIcon } from "@heroicons/react/24/outline";

function DesktopSideBar() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const handleOptionClick = (name) => {
    if (selectedOption !== name) {
      setSelectedOption(name);
      setSelectedSubOption("");
    }
  };

  const handleSubOptionClick = (name) => {
    setSelectedSubOption(name);
  };

  return (
    <aside className="z-20 flex-shrink-0 hidden w-56 h-screen overflow-y-auto bg-purple_senthia-100 md:block">
      <div className="pb-4 pt-2 text-white">
        <a className="flex flex-col items-center justify-items-center" href="#">
          <img className="w-36" src={logo} alt="" />
        </a>
        <ul className="mt-6">
          {menuData.map((option) => (
            <ListElement
              key={option.name}
              option={option}
              isSelected={selectedOption === option.name}
              selectedSubOption={selectedSubOption}
              onSelect={handleOptionClick}
              onSubSelect={handleSubOptionClick}
            />
          ))}
          <li className="relative transition-colors duration-150 hover:bg-purple_senthia-200">
            <a
              className="inline-flex px-6 py-3 items-center w-full text-sm font-semibold"
              href={import.meta.env.VITE_API_URL + "admin"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LockOpenIcon className="w-5 h-5" />
              <span className="ml-4">Permissions</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default DesktopSideBar;
