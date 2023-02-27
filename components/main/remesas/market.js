import React from "react";

function Market({
    connected,
    publicKey,
    initializeUser,
    initialized,
    transactionPending, 
}){
    return(
        <body className="sticky top-0 transition-all md:grid md:grid-cols-3 items-center px-10 xl:px-20 py-4 z-50 bg-white border-b ">
        
        <div className="flex items-center justify-end ">
            {initialized ? (<></>) : (
            <button type="button" className="border border-black cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2 bg-[#gray] "
            onClick={()=>initializeUser()} disabled = {transactionPending}>
                Become a Seller !
            </button>
            )}
        </div>

        </body>
    );
}

export default Market;