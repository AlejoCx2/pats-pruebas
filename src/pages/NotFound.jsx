function NotFound() {
    return (
        <div className="flex mt-8 justify-center">
            <div className="flex flex-col items-center font-semibold text-senthia-100 p-6 rounded-lg">
                <h1 className="text-8xl">404</h1>
                <h4 className="text-4xl">¡Page Not Found!</h4>
                <p className="mt-6 text-center">Parece que la direccion a la que tratas de acceder no esta disponible. <br />
                Por favor revisa si dirrecion del navegador.    </p>
            </div>
        </div>
    )
}

export default NotFound