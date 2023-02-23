import { useState, useEffect } from 'react'

import './App.css'

function App() {

  const [pausa, setPausa] = useState(5 * 60);
  const [sesion, setSesion] = useState(25 * 60);
  const [tiempo, setTiempo] = useState(25 * 60);
  const [playPausa, setPlayPausa] = useState(false);
  const [estado, setEstado] = useState('Sesión');

  const sonido = document.getElementById('beep')


  function minutos(tiempo){
    return Math.floor(tiempo / 60);
  }


  function formato(tiempo){
    const formatoMinutos = Math.floor(tiempo/60);
    const formatoSegundos = tiempo % 60;

    return(
      (formatoMinutos < 10 ? '0' + formatoMinutos : formatoMinutos) + ':' + 
      (formatoSegundos < 10 ? '0' + formatoSegundos : formatoSegundos)
    );
  };

  const aumentarPausa = () => {
    if(pausa < 60 * 60 && !playPausa){
      setPausa(pausa + 60);
      if(estado === 'Descanso'){
        setTiempo(pausa + 60);
      }
    };
  };
  const reducirPausa = () => {
    if(pausa > 60 && !playPausa){
      setPausa(pausa - 60);
      if(estado === 'Descanso'){
        setTiempo(pausa - 60);
      }
    };
  };
  const aumentarSesion = () => {
    if(sesion < 60 * 60 && !playPausa){
      setSesion(sesion + 60);
      if(estado === 'Sesión'){
        setTiempo(sesion + 60);
      }
    };
  };
  const reducirSesion = () => {
    if(sesion > 60 && !playPausa){
      setSesion(sesion - 60);
      if(estado === 'Sesión'){
        setTiempo(sesion - 60);
      }
    };
  };
  const encenderApagar = () => {
    if(!playPausa){
      setPlayPausa(true);
    }else{
      setPlayPausa(false);
    }
  }

  const reset = () => {
    setPausa(5 * 60);
    setSesion(25 * 60);
    setEstado('Sesión');
    setPlayPausa(false);
    setTiempo(25 * 60);
    clearInterval(timer);
    sonido.pause();
    sonido.currentTime = 0;
  }

  if(tiempo === -1 && estado === 'Sesión'){
    setEstado('Descanso');
    setTiempo(pausa);
    sonido.play();
  }

  if(tiempo === -1 && estado === 'Descanso'){
    setEstado('Sesion');
    setTiempo(sesion);
    sonido.play();
  }

  


  let timer

  useEffect(() => {
    if(playPausa){
      timer = setInterval(() => {
        setTiempo((prevstate) => (prevstate) - 1)
      }, 1000);
    };
    return () => (clearInterval(timer));
  });

  return (
    <div className="App">
      <div className='divTitulo'>
        <h1 className='titulo'>Pomodoron't</h1>
      </div>
      <div className='botones'>
        <div className='divPausa' id="break-label">
          <h2>Tiempo de Pausa</h2>
          <div id="break-length">{ minutos(pausa) }</div>
          <button value='-' onClick={ reducirPausa } id="break-decrement">-</button>
          <button value='+' onClick={ aumentarPausa } id="break-increment">+</button>
        </div>
        <div className='divTiempo' id="session-label">
          <h2>Tiempo de Sesion</h2>
          <div id="session-length">{ minutos(sesion) }</div>
          <button value='-' onClick={ reducirSesion } id="session-decrement">-</button>
          <button value='+' onClick={ aumentarSesion } id="session-increment">+</button>
        </div>
      </div>
        <div className='divSesion'>
          <h2 id="timer-label">{ estado }</h2>
          <div id="time-left">{ formato(tiempo) }</div>
          <audio id='beep' src='https://github.com/leonardoarielcostante/pomodoront/blob/main/beep.wav?raw=true'></audio>
        </div>
        <div className='divControl'>
          <button onClick={ encenderApagar } id="start_stop">Play/Stop</button>
          <button onClick={ reset } id="reset">Reset</button>
        </div>
    </div>
  )
}

export default App
