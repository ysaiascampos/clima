import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {
  const [busqueda, setbusqueda] = useState({
      ciudad: '',
      pais: ''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const { ciudad, pais } = busqueda;

  useEffect(()=>{
    if(consultar){
      setConsultar(false);
      const consultarAPI = async () => {
        const appId = 'c6f745f8f0392135911016865342dcab';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        console.log(url);
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
      }
      consultarAPI();
      
    }
    
  },[consultar,ciudad,pais,resultado]);
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
              <Clima 
                resultado={resultado}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
