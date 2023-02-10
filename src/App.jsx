import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [counter, setCounter] = useState(0)
  const [time, setTime] = useState(3)
  const showElementsToStart = isStarted ? "1" : "0" // quitar opacidad
  const hideElementsToStart = isStarted ? "0" : "1" // agregar opacidad
  let id = useRef()

  useEffect(() => {

    //Activa el contador al iniciar el juego
    if(isStarted){
      handleTime()
    }

    return () => clearInterval(id.current)                                                                                                          
  }, [isStarted])

  useEffect(() => {
    if(time === 0){
      stopTime()
      saveScoreInLocalStorage()
    }
  }, [time] )


  //Iniciar contador
  const handleTime = () => {
    id.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1)

    }, 1000)
  }

  const stopTime = () => {
    clearInterval(id.current)
  }

  const resetGame = () => {
    setCounter(0)
    setTime(3)
    setIsStarted(false)
  }

  const saveScoreInLocalStorage = () => {
    const score = localStorage.getItem('score')
    //si existe un score en el local storage y además el contador es mayor al score, se modifica el score por la nueva mejor puntuación
    if(score){
      if(counter > score){
        localStorage.setItem('score', counter)
      }
    } else{ // si no existe un score en el local storage, se crea uno con el contador
      localStorage.setItem('score', counter)
    }
  }

  const showBestScore = () => {
    const score = localStorage.getItem('score')

    if(score > counter){
      return (
        <h3>RECORD: <span>{score} clicks</span> </h3>
      )
    } else{
      return (
        <h3>RECORD: <span>{counter} clicks</span></h3>
      )
    }
  }
 



  return (
    <div className="main">
      {time !== 0 ?
      <div className='start'>
        <h2 style={{opacity: hideElementsToStart}}>¿Cuantos clicks puedes <br /> lograr en 3 segundos?</h2>
        <h3 style={{opacity: showElementsToStart}}>TIME: <span>{time}</span></h3>
        <button 
          onClick={() => {
          setCounter(counter + 1)
          setIsStarted(true)
        }}>CLICKER</button>
        <h2 style={{opacity: showElementsToStart}}>{counter}</h2>
      </div>
      :
      <div className='game-over'>
      <h2>GAME OVER</h2>
      <h3>Has logrado <span>{counter} clicks</span></h3>
      {showBestScore()}
      
      
      <button onClick={resetGame} className='reset'>RESET GAME</button>
      </div>
      
    }
    </div>
  )
}

export default App
