function Login() {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-none flex-col items-center justify-center w-96 md:w- shadow-xl">
                <div>
                    Title
                </div>
                <p className="my-2 font-bold">
                    Login into your account
                </p>
                <form className="flex flex-col w-5/6 p-2">
                    <label htmlFor="user_name_input" className="mt-4">Correo electrónico</label>
                    <input className="bg-slate-200 rounded-md outline-offset-2 outline-gray-400 mt-1 p-2" placeholder="james.cardona@senthia.com" type="text" name="username" id="user_name_input" />
                    <label htmlFor="password_input" className="mt-4">Contraseña</label>
                    <input className="bg-slate-200 rounded-md outline-offset-2 outline-gray-400 mt-1 p-2" placeholder="Ingrese su contraseña" type="password" name="password" id="password_input" />
                    <a href="#" className="text-xs flex flex-row-reverse underline mt-2">Olvido su clave?</a>
                </form>
                <button style={{ backgroundColor: "#007F51" }} className="w-5/6 py-2 my-2 rounded-md font-bold text-white">
                    Ingresar
                </button>
                <div className="flex items-center justify-center space-x-2">
                    <div className="flex-1 w-20 h-px bg-gray-300"></div>
                    <span className="text-gray-400">or</span>
                    <div className="flex-1 w-20 h-px bg-gray-300"></div>
                </div>
                <div>
                    Register
                </div>
            </div>
            <div className="flex-auto">
                <p>Lorem</p>
            </div>
        </div>
    )
}

export default Login