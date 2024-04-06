import { useState } from 'react'


function App() {
  let [counter, setCount] = useState(0)
  
  const add = () => {
    setCount(counter + 1)
  }
  
  const remove = () => {
    setCount(counter - 1)
  }
  return (
    <div className='bg-red-400'>
      <h1>Jay Shree Ram</h1>
      <h2>Count value {counter}</h2>
      <button onClick={add}>add {counter}</button>
      <br></br>
      <button onClick={remove}>remove</button>
    </div>
  )
}

export default App
