import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import {AiOutlineMail} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {LuAsterisk} from 'react-icons/lu';
import {RiLockPasswordLine} from 'react-icons/ri';


const LoginSignup = () => {

    const [action, setAction] = useState("Login");


    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire

        try {
            const response = await axios.post('/users', {
                // Les données que vous souhaitez envoyer au backend
                nom: "John",
                prenom: "Doe",
                email: "john.doe@example.com",
                motDePasse: "motdepasse"
            });

            // Traitez la réponse du backend ici (par exemple, affichez un message de succès)
            console.log('Inscription réussie:', response.data);
        } catch (error) {
            // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
            console.error('Erreur lors de l\'inscription:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                <p className="icons"><BsFillPersonFill/></p>
                <input type="text" placeholder="Nom"/>
            </div>}
                
            </div>

            <div className="inputs">
                {action==="Login" ?<div></div>:<div className="input">
                <p className="icons"><LuAsterisk/></p>
                <input type="text" placeholder="Prénom" />
            </div>}
                
            </div>

            <div className="inputs">
                <div className="input">
                    <p className="icons"><AiOutlineMail/></p>
                    <input type="email" placeholder="email"/>
                </div>
            </div>

            <div className="inputs">
                <div className="input">
                    <p className="icons"><RiLockPasswordLine/></p>
                    <input type="password" placeholder="mot de passe"/>
                </div>
            </div>
            <div className="forgot_password">Lost Password ? <span>click here</span></div>
           <div className="submit_container">
           <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>
                Sign Up
            </div>
            <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
                Login
            </div>
            </div>
          
        </div>
    )
}

export default LoginSignup