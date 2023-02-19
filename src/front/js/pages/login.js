import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
    const {store, actions} = useContext(Context)

  return (
    <div className="container">
      <form onSubmit={(evento)=>{
        evento.preventDefault();
        let m= evento.target[0].value
        let p =evento.target[1].value
      
        if(m=='' || p==''){
            alert("debe completar datos")    
        }
        else{
          actions.login(m,p)
        }
      }}>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            email
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            contraseña
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword"/>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
//   const { store, actions } = useContext(Context);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   //necesitamos tener el email y password e una variable y que esten habilitadas para enviarlas al backend "controled component"

//   //controled component, cada vez que input cambie(onChange) hara un set(cambio=setEmail) y cada vez que variable
//   //"email" es set(cambiada linea 8), variable cambiará en value(linea20) al nuevo valor
//   const Handleclick = () => {
//     fetch
//   };
//   return (
//     <div className="text-center mt-5">
//       <h1>Login</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={Handleclick}>Log in</button>
//     </div>
//   );
 };
//onClick es quien hará el fetch {handleclick}, haremos su funcion arriba
