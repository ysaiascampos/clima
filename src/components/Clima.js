import React from 'react';
import PropTypes from 'prop-types';
const Clima = ({resultado}) => {
    //extraer valores
    const { name , main } = resultado;
    if(!name) return null;

    //grados kelvin 
    const kelvin = 273.15;
    return ( 
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es :</h2>
                <p className="temperatura">
                    {parseFloat( main.temp - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
                </p>
                <h2>Temperatura Máxima:</h2>
                <p>
                    {parseFloat( main.temp_max - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
                </p>
                <h2>Temperatura Minima:</h2>
                <p>
                    {parseFloat( main.temp_min - kelvin, 10).toFixed(2)} <span> &#x2103;</span>
                </p>
            </div>
        </div>
     );
}
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}
 
export default Clima;