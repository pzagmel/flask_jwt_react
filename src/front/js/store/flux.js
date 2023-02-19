const getState = ({
	getStore,
	getActions,
	setStore
}) => {
	return {
		store: {
			user:{},
			message: null,
			demo: [{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({
						message: data.message
					});
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			login: (email, password) => {
				const store = getStore()
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
				fetch("https://3001-4geeksacade-reactflaskh-atqb8dl5l3o.ws-us87.gitpod.io/login", requestOptions)
				//hare el inicio de sesion,	la respuesta la tendré en formato texto, y si
				//todo sale bien, me muetra el resultado y me lleva a la ruta private y en
				// caso que exista error no me redirige y me muestra descripcion de error
				
				.then(response => response.json()) 
					.then(result => 
	// respuesta es en formato json esperamos que resuesta sea positiva con objeto del user,
	// la guardaremos en store en el campo user {objeto}.
						{setStore({user:result})
						console.log('user:', store.user);
						console.log('que es el resultado', result)
						
						window.location.href = "/private";
					})
					.catch(error => console.log('error', error));
			},
			register: (email, password) => {
				
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					email: email,
					password: password,
				});

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow",
				};

				fetch(
						"https://3001-4geeksacade-reactflaskh-atqb8dl5l3o.ws-us87.gitpod.io/signup",
						requestOptions
					)
					.then((response) => response.json())
					.then((result) => console.log(result))
					.catch((error) => console.log("error", error));

				return true
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({
					demo: demo
				});
			},
		},
	};
};

export default getState;