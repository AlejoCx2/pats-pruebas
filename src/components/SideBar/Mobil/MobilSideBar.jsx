import { useSelector, useDispatch } from "react-redux";
import { setSelectedOption } from "../../../state/sideBar/selectedOptionSlice";
import { setSelectedSubOption } from "../../../state/sideBar/selectedSubOptionSlice";
import ListElement from "../ListElement";
import logo from "../../../assets/logos/logo_side.png";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import menuData from "../../../menu.json";
import { permissionsDict } from "../../../menuPermissions";

const permissions = permissionsDict(menuData)

function MobilSideBar() {
  const userRoles = useSelector((state) => state.user.value.roles);
  const userPermissions = useSelector((state) => state.user.value.permissions);
  const selectedOption = useSelector((state) => state.selectedOption.value);
  const selectedSubOption = useSelector(
    (state) => state.selectedSubOption.value
  );

  const dispatch = useDispatch();

  const handleOptionClick = (name) => {
    if (selectedOption.name !== name) {
      dispatch(setSelectedOption({ name: name }));
      dispatch(setSelectedSubOption({ name: "" }));
    }
  };

  const handleSubOptionClick = (name) => {
    dispatch(setSelectedSubOption({ name: name }));
  };

  const hasPermissions = () => {
    if (userRoles.includes("Admin") || userPermissions.includes("superuser")) return true;
    return false;
  };

  return (
    <aside className="md:hidden z-10 fixed mt-12 w-56 h-screen overflow-y-auto bg-purple_senthia-100">
      <div className="pb-4 pt-2 text-white">
        <a className="flex flex-col items-center justify-items-center" href="#">
          <img className="w-36" src={logo} alt="" />
        </a>
        <ul className="mt-6">
          {menuData.map((option) => (
            <ListElement
              key={option.name}
              option={option}
              isSelected={selectedOption.name === option.name}
              selectedSubOption={selectedSubOption.name}
              onSelect={handleOptionClick}
              onSubSelect={handleSubOptionClick}
              permissions={permissions[option.name]}
            />
          ))}
          <li className={`relative transition-colors duration-150 hover:bg-purple_senthia-200 ${!hasPermissions() ? 'hidden' : ''}`}>
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

export default MobilSideBar;
