export default function Login({isLogged, handleLogin}){

    

    return(
        <div className="flex gap-5 items-center text-white">
            {isLogged && <p className="text-white">Olá usúario</p>}
            <button 
            onClick={handleLogin}
            className={`${isLogged ? "bg-blue-300" : "bg-white"} text-black px-4 py-1 rounded`}>{isLogged ? "Logout": "Login"}
            </button>
        </div>
    )
}