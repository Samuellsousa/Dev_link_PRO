import { useState, useEffect } from  'react'

import { auth } from '../services/firebaseConection'
import {onAuthStateChanged } from 'firebase/auth'

import { Navigate } from 'react-router-dom'
import { async } from '@firebase/util'

export default function Private ({ children}){
   const [loading, setLoading] = useState(true)
   const [signed,setSigned] = useState(false);

   useEffect(() => {

    async function checkLogin(){
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user.uid,
                    email: user.email
                };

                localStorage.setItem("@detaiUser", JSON.stringify(userData))
                setLoading(false);
                setSigned(true)
            }else{
                setLoading(false);
                setSigned(false);
                
            }
        })

    }

    checkLogin();

   },[])
   

   if(loading){
    return(
        <div></div>
    )
   }
   
   if(!signed){
    return <Navigate to="/login" />
   }
   
    return children;
}

