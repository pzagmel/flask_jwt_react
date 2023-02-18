import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //necesitamos tener el email y password e una variable y que esten habilitadas para enviarlas al backend "controled component"
  
  //controled component, cada vez que input cambie(onChange) hara un set(cambio=setEmail) y cada vez que variable
  //"email" es set(cambiada linea 8), variable cambiará en value(linea20) al nuevo valor
  const handleclick = () =>{

    fetch 
  }
  
  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="email" value={email}
          onChange={() => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="password" value={password}
          onChange={() => setPassword(e.target.value)}
        />
      </div>
      <button onClick={Handleclick}>Log in</button> 
    </div>
  );
};
//onClick es quien hará el fetch {handleclick}, haremos su funcion arriba