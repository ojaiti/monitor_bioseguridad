import React, { useCallback, useEffect, useState } from 'react'

const CuentaRegresiva = ({fecha, noches, setFinCuarentena}) => {
    const [mostrarRestante, setShowRestante] = useState({'days':0,'hours':0,'minutes':0,'seconds':0})
    /* Como medida de detenr el ciclo poner noches igual a guion - */
    const d = new Date(fecha);
    /* Funcion que le suma 4 dias a la fecha */
    var newFecha = sumarDias(d, noches);
    
    function sumarDias(fecha, dias) {
      setFinCuarentena(mostrarRestante)

      var f = fecha.setDate(fecha.getDate() + dias);
      return f;
    }
    
    
    var end = new Date(newFecha);
    
    


    console.log(0)
    const tiempoRestante = useCallback(() => {
      var now = new Date();
      var distance = end - now;


      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24;
      
      
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);

      setShowRestante({
        days,
        hours,
        minutes,
        seconds,
      })
      
        
    },);
  
    useEffect(() => {
      if(noches >= -1){
          const intervalId = setInterval(tiempoRestante, 1000);
          return () => clearInterval(intervalId);
      }
    }, [noches]);

    return (
        <div className="main__body">
             <h1>Tiempo restante </h1>
             <h1>Dias: {mostrarRestante.days < 0 ? 0 : mostrarRestante.days}, Horas: {mostrarRestante.hours < 0 ? 0 : mostrarRestante.hours}, Minutos: {mostrarRestante.minutes < 0 ? 0 : mostrarRestante.minutes}, Segundos: {mostrarRestante.seconds < 0 ? 0 : mostrarRestante.seconds}</h1>
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
