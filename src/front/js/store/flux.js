const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      token: "",
      userInfo: {
        id: "",
        email: "",
        password: "",
      },
      message: null,
      demo: [
        {
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
            message: data.message,
          });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      login: (email, password, callback) => {
        const store = getStore();
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
          "https://3001-4geeksacade-reactflaskh-atqb8dl5l3o.ws-us87.gitpod.io/login",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status == 200) {
              if (typeof Storage !== "undefined") {
                sessionStorage.setItem("token", result.token);
              } else {
                console.log("sessionStorage no soportado en este navegador");
              }
              setStore({
                user: result.info_user,
                token: result.token,
              });
              if (store.user) {
                callback("/private");
              } else {
                callback("/login");
              }
            } else {
              console.log("result.msg", result.msg);
            }
          })
          .catch((error) => console.log("error", error));
      },

      logout: (callback) => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        console.log("login out");
        setStore({
          info_user: {
            email: "",
            password: "",
          },
          login: false,
          token: "",
        });
        callback("/");
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

        return true;
      },
      tokenValidation: async (ruta) => {
        let token = "";
        let retorno = "/";
        if (typeof localStorage.getItem("token") == "string") {
          token = localStorage.getItem("token");
        } else if (typeof sessionStorage.getItem("token") == "string") {
          token = sessionStorage.getItem("token");
        }

        if (token !== "") {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);
          try {
            const response = await fetch(
              "https://3001-4geeksacade-reactflaskh-atqb8dl5l3o.ws-us87.gitpod.io/token",
              {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
              }
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              if (data.msg == "token valido") {
                const user = jwt_decode(token).sub;
                setStore({
                  userInfo: user,
                  login: true,
                  token: token,
                });
                if (
                  user.email == "user@example.com" &&
                  user.password == "password"
                ) {
                  retorno = "/private";
                } else {
                  retorno = "/login";
                }
              } else {
                retorno = "/login";
              }
            } else {
              retorno = "/login";
            }
          } catch (e) {
            setStore({
              userInfo: {
                email: "",
                password: "",
                type: "",
              },
              login: false,
              token: "",
            });
            localStorage.clear();
            sessionStorage.clear();

            if (ruta != "/login") return "/private";
          }
        } else {
          if (ruta != "/login") retorno = "/login";
        }
        return retorno;
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
          demo: demo,
        });
      },
    },
  };
};

export default getState;
