import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate();
	
	const llamada = async () => {
		if (sessionStorage.getItem("token")?? localStorage.getItem("token")) {
		  const ruta = await actions.tokenValidation("/private");
		  console.log("ruta", ruta);
		  if (ruta !== "/private") {
			navigate(ruta);
		  }      
		}
		else 
		navigate("/login")
	  };
	  
	
	  useEffect(() => {
		llamada();
	  }, []);
	
	
	return (
		<div className="text-center mt-5">
			<h1>Hello, this is you private view</h1>		
		</div>
	);
};
