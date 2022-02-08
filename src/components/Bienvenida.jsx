import React from 'react';
import getFarmsByRegion from './helpers/API/getFarmsById'
const Bienvenida = () => {
  const granjas = getFarmsByRegion()
  granjas.then(data => console.log(data))
  return <div>Hola Bienvenidos</div>;
};

export default Bienvenida;
