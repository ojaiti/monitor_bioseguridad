import React, { useRef, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import 'moment-timezone';
const Regresiva = ({forwardedRef, parentCallback, isVisitedRegistered}) => {

  const { user:{ user_detail }} = useContext(AuthContext);
  const [mostrarDate, setMostrarDate] = useState({'days':0,'hours':0,'minutes':0,'seconds':0})

    const [pause, setPause] = useState(false);
    const [datailQuarantine, setDetailQuarantine] = useState(user_detail)
    if(isVisitedRegistered){
      /* fetch("http://127.0.0.1:8000/last_farm_visited_by_user/"+user_detail.id)
        .then(function(response) {
          return response.json();
        })
        .then(function(json2){
          setDetailQuarantine(json2)
          console.log('Entro a quiiiiii')
        }) */
    }else{
    }

    var end = new Date(sumarDias(datailQuarantine.frm_visited_date, datailQuarantine.quarentine_nights));
    function sumarDias(fecha, noches) {
      const fechaFinal = new Date(fecha)
      var f = fechaFinal.setDate(fechaFinal.getDate() + noches);
      return f;
    }

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
        parentCallback({'days':days,'hours':hours,'minutes':minutes,'seconds':seconds})
      }
      
    };
    useEffect(() => {
        setPause(false);
        console.log('Days 1: ', mostrarDate.days)
        intervalRef.current = setInterval(decreaseDate, 1000);
        return () => {
          console.log('Days 2: ', mostrarDate.days)
          clearInterval(intervalRef.current)
        };
      }, []);
      
    
     

    return (
      <div className="main__body">
        <h1>Tiempo restante </h1>
        <h1>Dias: {mostrarDate.days < 0 ? 0 : mostrarDate.days}, Horas: {mostrarDate.hours < 0 ? 0 : mostrarDate.hours}, Minutos: {mostrarDate.minutes < 0 ? 0 : mostrarDate.minutes}, Segundos: {mostrarDate.seconds < 0 ? 0 : mostrarDate.seconds}</h1>
      </div>
    )
}

export default Regresiva



