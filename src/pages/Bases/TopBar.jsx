function TopBar() {
    return (
        <header className="z-10 py-2 h-1/12 bg-senthia-100 shadow-md">
            <div
                className="container flex items-center justify-between h-full px-6 mx-auto text-white"
            >
                {/*<!-- Mobile hamburger --> */}
                <button
                    className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                    onClick={() => { console.log('a') }}
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
                    <li className="relative">
                        <button
                            className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                            onClick={() => { console.log('click') }}
                            onKeyDownCapture={() => { console.log('key') }}
                            aria-label="Account"
                            aria-haspopup="true"
                        >
                            <img
                                className="object-cover w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default TopBar