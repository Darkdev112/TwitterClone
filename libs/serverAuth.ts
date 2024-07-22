import { NextApiRequest } from "next";
import {getSession} from 'next-auth/react'

const serverAuth = async (req:NextApiRequest) => {
    const session = await getSession({req});

    if(!session?.user?.email){
        // console.log("first bro");
        throw new Error('Not signed in')
        
    }

    const currentUser = await prisma?.user.findUnique({
        where : {
            email : session.user.email
        }
    })

    if(!currentUser){
        // console.log("second bro");
        throw new Error('Not signed in')
    }

    return {currentUser};
}

export default serverAuth