import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValue } from "../../state/sideBar/isOpenSlice";
import UserButton from "../../components/UserButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobilSideBar from "../../components/SideBar/Mobil/MobilSideBar";

function TopBar() {
  const isOpen = useSelector((state) => state.isOpen.value);
  const dispatch = useDispatch();

  return (
    <>
      <header className="z-10 h-1/12 bg-purple_senthia-100 shadow-md">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-white">
          {/*<!-- Mobile hamburger --> */}
          <button
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            onClick={() => {
              dispatch(changeValue());
            }}
            aria-label="Menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <ul className="flex items-center grow justify-end flex-shrink-0 space-x-6">
            <li className="">
              <UserButton />
            </li>
          </ul>
        </div>
      </header>
      {isOpen && <MobilSideBar />}
    </>
  );
}

export default TopBar;
