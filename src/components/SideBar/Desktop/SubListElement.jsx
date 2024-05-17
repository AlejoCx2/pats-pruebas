import { Link } from "react-router-dom";
import {
  UserPlusIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function SubListElement({ subOption, isSelected = false, onSelect }) {
  const getIcon = (name) => {
    switch (name) {
      case "Solicitar creación":
        return <UserPlusIcon className="w-5 h-5" />;
      case "Aprobar creación":
        return <CheckBadgeIcon className="w-5 h-5" />;
      case "Listar usuarios":
        return <UserGroupIcon className="w-5 h-5" />;
      case "Crear usuario":
        return <PaperAirplaneIcon className="w-5 h-5" />;
      default:
        return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  return (
    <>
      <li className="">
        <Link
          to={subOption.to}
          className={`flex items-center py-2 pl-4 rounded-sm transition-colors duration-150 hover:bg-purple_senthia-100 ${
            isSelected ? "text-green_senthia-100" : ""
          }`}
          onClick={() => onSelect(subOption.name)}
        >
          {getIcon(subOption.name)}
          <span className="ml-2 font-medium">{subOption.name}</span>
        </Link>
      </li>
    </>
  );
}

export default SubListElement;
