function ListElement({ title, icon, goTo="#", isSelected = false }) {
    return (
        <li className="relative px-6 py-3 transition-colors duration-150 hover:bg-senthia-200">
            {isSelected && <span
                className="absolute inset-y-0 left-0 w-1 bg-orange_senthia-100 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
            ></span>}
            <a
                className="inline-flex items-center w-full text-sm font-semibold"
                href={goTo}
                target="_blank"
                rel="noopener noreferrer"
            >
                {icon}
                <span className="ml-4">{title}</span>
            </a>
        </li>
    )
}

export default ListElement