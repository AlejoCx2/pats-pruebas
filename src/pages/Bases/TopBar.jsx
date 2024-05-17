import UserButton from "../../components/UserButton";

function TopBar() {
  return (
    <header className="z-10 h-1/12 bg-purple_senthia-100 shadow-md">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-white">
        {/*<!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => {
            console.log("a");
          }}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <ul className="flex items-center grow justify-end flex-shrink-0 space-x-6">
          <li className="">
            <UserButton />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default TopBar;
