import React, { useRef, useEffect, useState, useContext } from 'react'
import 'moment-timezone';
const Regresiva = ({parentCallback, lastDateVisitedFarm}) => {

  const [mostrarDate, setMostrarDate] = useState({'days':0,'hours':0,'minutes':0,'seconds':0})
    
    var end = new Date(sumarDias(lastDateVisitedFarm.frm_visited_date, lastDateVisitedFarm.quarentine_nights));
    function sumarDias(fecha, noches) {
      const fechaFinal = new Date(fecha)
      var f = fechaFinal.setDate(fechaFinal.getDate() + noches);
      return f;
    }
    var dateRef = useRef(end);
    console.log('DateRef: ', dateRef.current);
    let intervalRef = useRef();
    const decreaseDate = () => {
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

      if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
        console.log('Wor')
        
        clearInterval(intervalRef.current);
      }else{
        setMostrarDate({'days':days,'hours':hours,'minutes':minutes,'seconds':seconds})
        
      }
      
    };


    


    useEffect(() => {
      parentCallback(mostrarDate)
      const dateToday = new Date()

        if(end.getTime() < dateToday.getTime()){
          console.log('GHeklo')
        }else{
          console.log('Se ejecutó')
          intervalRef.current = setInterval(decreaseDate, 1000);
          return () => {
            clearInterval(intervalRef.current)
          };
        }
        
      }, [lastDateVisitedFarm, decreaseDate]);
      
    
    return (
      <div className="main__body">
        {/* Numero test */}
        <h1>Tiempo restante </h1>
        <h1>Dias: {mostrarDate.days < 0 ? 0 : mostrarDate.days}, Horas: {mostrarDate.hours < 0 ? 0 : mostrarDate.hours}, Minutos: {mostrarDate.minutes < 0 ? 0 : mostrarDate.minutes}, Segundos: {mostrarDate.seconds < 0 ? 0 : mostrarDate.seconds}</h1>
      </div>
    )
}

export default Regresiva



