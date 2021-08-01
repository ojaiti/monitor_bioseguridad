import React, { useCallback, useEffect, useState } from 'react'

const CuentaRegresiva = ({fecha, noches, setFinCuarentena}) => {
    const [mostrarRestante, setShowRestante] = useState({})
    const [playable, setPlayable] = useState(true);
    const [restante, setRestante] = useState(0);
    const d = new Date(fecha);

    /* Funcion que le suma 4 dias a la fecha */
    var newFecha = sumarDias(d, 6);
    function sumarDias(fecha, dias) {
        var f = fecha.setDate(fecha.getDate() + dias);
        return f;
    }


    var end = new Date(newFecha);
  
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
  
    const tiempoRestante = useCallback(() => {
      var now = new Date();
      var distance = end - now;
      setRestante(distance);
      setFinCuarentena(mostrarRestante)
      
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      setShowRestante({
        "days":days,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds
      })
  
      
    }, [restante]);
  
    useEffect(() => {
      if (playable === true) {
        const intervalId = setInterval(tiempoRestante, 1000);
        return () => clearInterval(intervalId);
      }
    }, [tiempoRestante]);


    /* const autoPlay = () => {
        var flag = !playable;
        setPlayable(flag);
      }; */
    return (
        <div className="main__body">
             <h1>Tiempo restante </h1>
             <h1>Dias: {mostrarRestante.days ? mostrarRestante.days : 0}, Horas: {mostrarRestante.hours ? mostrarRestante.hours : 0}, Minutos: {mostrarRestante.minutes ? mostrarRestante.minutes : 0}, Segundos: {mostrarRestante.seconds ? mostrarRestante.seconds : 0}</h1>
             {/* <button onClick={autoPlay}>Play</button> */}
        </div>
    )
}

export default CuentaRegresiva




/* import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState(10);
  const [playable, setPlayable] = useState(false);

  const increaseValue = useCallback(() => {
    console.log(value);
    setValue(value + 1);
  }, [value]);

  useEffect(() => {
    if (playable === true) {
      console.log("Trigger");
      const intervalId = setInterval(increaseValue, 1000);
      return () => clearInterval(intervalId);
    }
  }, [playable, increaseValue]);

  const autoPlay = () => {
    setPlayable(true);
  };

  return (
    <div>
      <button onClick={autoPlay}>Play</button>
    </div>
  );
} */
