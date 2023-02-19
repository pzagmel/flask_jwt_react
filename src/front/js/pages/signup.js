import { useState , useEffect, useContext} from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Signup = () => {
    let navigate = useNavigate();
    const {store, actions} = useContext(Context)

  return (
    <div className="container">
      <form onSubmit={(evento)=>{
        evento.preventDefault();
        let m= evento.target[0].value
        let p =evento.target[1].value
        let rp= evento.target[2].value
        if(p!=rp ){
            alert("las contraseñas deben ser identicas")
        }
        if(m=='' || p=='' || rp==''){
            alert("debe completar datos")
        }
        if(actions.register(m,p)){
            alert("Registrado")
            navigate('/login')
        }
        else{
          alert("error desconocido")
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
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            repetir contraseña
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" />
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
