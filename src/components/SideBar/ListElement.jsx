import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SubListElement from "./SubListElement";
import {
  HomeIcon,
  UsersIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  CursorArrowRaysIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function ListElement({
  option,
  isSelected = false,
  onSelect,
  selectedSubOption,
  onSubSelect,
  permissions,
}) {
  const userRoles = useSelector((state) => state.user.value.roles);
  const userPermissions = useSelector((state) => state.user.value.permissions);
  const getIcon = (name) => {
    switch (name) {
      case "Dashboard":
        return <HomeIcon className="w-5 h-5" />;
      case "Forms":
        return <ClipboardDocumentListIcon className="w-5 h-5" />;
      case "Ususarios":
        return <UsersIcon className="w-5 h-5" />;
      case "Cards":
        return <RectangleStackIcon className="w-5 h-5" />;
      case "Charts":
        return <ChartPieIcon className="w-5 h-5" />;
      case "Buttons":
        return <CursorArrowRaysIcon className="w-5 h-5" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5" />;
    }
  };

  const hasPermissions = () => {
    if (!permissions.roles.length) {
      return true;
    }
    if (!permissions.roles.some((elemento) => userRoles.includes(elemento))) {
      if (
        !permissions.permissions.some((elemento) =>
          userPermissions.includes(elemento)
        )
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <li
        className={
          isSelected
            ? `text-green_senthia-100 relative transition-colors duration-150 bg-purple_senthia-200 ${
                !hasPermissions() ? "hidden" : ''
              }`
            : `relative transition-colors duration-150 hover:bg-purple_senthia-200 ${
                !hasPermissions() ? "hidden" : ''
              }`
        }
        onClick={() => onSelect(option.name)}
      >
        {isSelected && (
          <span
            className="absolute inset-y-0 left-0 w-1 bg-green_senthia-100 rounded-tr-lg rounded-br-lg"
            aria-hidden="true"
          ></span>
        )}

        <Link
          className="inline-flex px-6 py-3 items-center w-full text-sm font-semibold"
          to={option.to}
        >
          {getIcon(option.name)}
          <span className="ml-4 grow">{option.name}</span>
          {option.hasChildrens && (
            <ChevronDownIcon className="mt-1 w-4 h-4 stroke-2" />
          )}
        </Link>
      </li>
      {isSelected && option.hasChildrens && (
        <ul className="my-1 mx-2 p-1 rounded-md text-sm bg-purple_senthia-200">
          {option.childrens.map((subOption) => (
            <SubListElement
              key={subOption.name}
              subOption={subOption}
              isSelected={selectedSubOption === subOption.name}
              onSelect={onSubSelect}
              permissions={permissions.childrens[subOption.name]}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default ListElement;
