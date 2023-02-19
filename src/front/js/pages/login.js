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
  const Handleclick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      email: email,
      password: password
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      "https://3001-4geeksacade-reactflaskh-atqb8dl5l3o.ws-us87.gitpod.io/login",
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        else alert("there has been some error");
      })
      .then()
      .catch((error) => console.error("there has been some error", error));
  };
  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={Handleclick}>Log in</button>
    </div>
  );
};
//onClick es quien hará el fetch {handleclick}, haremos su funcion arriba
