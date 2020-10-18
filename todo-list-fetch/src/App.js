import { useState, useEffect } from "react";
import React from 'react';


function App() {

      const [inputText, setInputText] = useState("")
      const [todos, setTodos] = useState([])

    
      useEffect(() => {
      obtenerDatos()
       
   },[])

    
    const obtenerDatos = async () => {
    const data =  await fetch(`https://assets.breatheco.de/apis/fake/todos/user/andres`)
    const info = await data.json()
    setTodos(info)
 }
    const enviarDatos = () => {

      fetch('https://assets.breatheco.de/apis/fake/todos/user/andres', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    }

    const eliminarDatos = () => {
      const arrayEliminar = [{done: false, label: " "}]
      fetch('https://assets.breatheco.de/apis/fake/todos/user/andres', {
      method: "PUT",
      body: JSON.stringify(arrayEliminar),
      headers: {
      "Content-Type": "application/json"
      }
    })

    }

    const guardarDatos = (evento) => {
    evento.preventDefault()
  
    if(!inputText.trim()){

      console.log("Campo esta vacio")
      return 
    }
    setTodos([...todos,{done: false, label: inputText}])

    console.log(`procesando datos ... ${ todos }`)
    evento.target.reset()
    setInputText("")
    enviarDatos()
  
}
  return (
    <div>
      <h2 className="text-center mt-4">TODOS</h2>   
      <form onSubmit={ guardarDatos }>
              <input 
                  type="text" 
                  placeholder="What needs to be done?" 
                  className=" col-4 form-control mb-2 mx-auto mt-4 font-italic"
                  onChange={evento => setInputText(evento.target.value)} 
                  />
              <button 
                  className="col-4 btn btn-primary btn-block mx-auto" type="submit">Agregar
              </button>
                                            
          </form>
        <div className="mt-5">
       
          <h4 className="text-center">TODOS List</h4>
            <ul className="col-5 list-group mx-auto">     
             {
                todos.map((item, index) => (
                    <li className="list-group-item" key={index}>{item.label}</li>
                ))
             }
            
            </ul>
            <form onSubmit={ eliminarDatos }>
                  <button 
                      className="col-4 btn btn-danger btn-block mx-auto mt-3">
                      Eliminar Lista
                  </button>
            </form>
        </div>
        
        
    </div>

  )
}


export default App;
