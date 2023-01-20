import { useState, useEffect } from 'react'
import './networks.css'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { MdAddLink } from 'react-icons/md'
import { async } from '@firebase/util'

import { db } from '../../services/firebaseConection'
import { setDoc,doc,getDoc, } from 'firebase/firestore'
import { toast } from 'react-toastify'



export default function Networks(){
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    useEffect(() => {

        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setFacebook(snapshot.data().facebook)
                    setInstagram(snapshot.data().instagram)
                    setGithub(snapshot.data().github)
                    setLinkedin(snapshot.data().linkedin)
                }
            } )
            
        }

        loadLinks();

    }, [])    



    async function handleSave(e){
        e.preventDefault();

        setDoc(doc(db,"social","link"), {
        facebook: facebook,
        instagram:instagram,
        github:github,
        linkedin:linkedin
      })
      .then(() => {
        console.log("Url salva com sucesso !")
        toast.success("Salvo com sucesso!")
      })
      .catch((error) => {
        console.log("ERRO AO SALVAR" + error)
        toast.error("Erro ao salvar seus links !")
      })

    }
    return(
       <div className='admin-container'>
        <Header/>
        
        <h1 className='title-social'> Suas redes sociais </h1>

        <form className="form" onSubmit={handleSave}> 
            <label> Link do facebook</label>
            <Input 
            placeholder= "digite a url do facebook..."
            value={facebook}
            onChange={ (e) => setFacebook(e.target.value) }
            />

        <label> Link do Instagram</label>
            <Input 
            placeholder= "digite a url do Instagram..."
            value={instagram}
            onChange={ (e) => setInstagram(e.target.value) }
            />
        
        <label> Link do GitHub</label>
            <Input 
            placeholder= "digite a url do GitHub..."
            value={github}
            onChange={ (e) => setGithub(e.target.value) }
            />
        
        <label> Link do Linkedin</label>
            <Input 
            placeholder= "digite a url do Linkedin..."
            value={linkedin}
            onChange={ (e) => setLinkedin(e.target.value) }
            />

            <button type='submit' className='btn-gegister'>
                Salvar link <MdAddLink size = {24} color= "#000000"/>

            </button>
        
        </form>

       </div>     
    )

}