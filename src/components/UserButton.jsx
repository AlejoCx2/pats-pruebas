import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanUser } from "../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

function UserButton() {
  const user = useSelector((state) => state.user.value);
  const [isOpen, setIsOpen] = useState(false);
  const navegate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.auth) {
      navegate("/");
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    dispatch(cleanUser());
    navegate("/");
  };

  return (
    <div className="relative">
      <button
        className="flex flex-row py-2 items-center hover:bg-purple_senthia-200"
        onClick={toggleDropdown}
        onKeyDownCapture={(e) => {
          console.log(e.key);
        }}
        aria-label="Account"
        aria-haspopup="true"
      >
        <span className="mx-2">{user.name + " " + user.lastname}</span>
        <img
          className="object-cover w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
          alt=""
          aria-hidden="true"
        />
        <ChevronDownIcon
          className={
            isOpen
              ? "mt-1 mx-1 w-3 h-3 stroke-2 transition-transform duration-100 rotate-180"
              : "mt-1 mx-1 w-3 h-3 stroke-2 transition-transform duration-100"
          }
        />
      </button>
      {isOpen && (
        <div
          className="absolute end-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-xs text-gray-500 hover:bg-purple_senthia-25 hover:text-gray-700"
              role="menuitem"
            >
              Configración
            </a>
            <a
              onClick={handleLogOut}
              className="flex items-center rounded-lg px-4 py-2 text-xs text-red-700 hover:bg-purple_senthia-25 hover:text-gray-700 hover:cursor-pointer"
              role="menuitem"
            >
              Log out
              <ArrowRightStartOnRectangleIcon className="mx-1 w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserButton;
