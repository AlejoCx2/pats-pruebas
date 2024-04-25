function Login() {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-none flex-col items-center justify-center w-96 md:w- shadow-xl">
                <div>
                    Title
                </div>
                <div>
                    Login into your account
                </div>
                <form className="flex flex-col">
                    <label htmlFor="user_name_input">Correo electrónico</label>
                    <input className="bg-slate-200 rounded-md outline-offset-2 outline-gray-400" placeholder="james.cardona@senthia.com" type="text" name="username" id="user_name_input" />
                    <label htmlFor="password_input">Contraseña</label>
                    <input className="bg-slate-200 rounded-md outline-offset-2 outline-gray-400" placeholder="Ingrese su contraseña" type="password" name="password" id="password_input" />
                </form>
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