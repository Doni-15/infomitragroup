
export function AdminProfil({user}){
    const initial = user?.nama ? user.nama.charAt(0).toUpperCase() : "U";

    return(
        <>
            <div className="flex items-center fixed z-50 right-15">
                <div className="size-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white font-bold text-base hover:scale-105 transition shadow-md">
                    {initial}
                </div>
                <div className="ml-3 text-xl">
                    {user?.nama}
                </div>
            </div>
        </>
    );
}