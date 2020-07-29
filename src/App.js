import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda, setbusqueda] = useState({
      ciudad: '',
      pais: ''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(()=>{
    if(consultar){
      const consultarAPI = async () => {
        const appId = 'c6f745f8f0392135911016865342dcab';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        //detecta si hubo error en la consulta
        if(resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
      consultarAPI();
      
    }
    // eslint-disable-next-line
  },[consultar]);
  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultado" />
  } else {
    componente = <Clima 
          resultado={resultado}
        />
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                setbusqueda={setbusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;