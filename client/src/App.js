import './App.css';
import {useEffect} from "react"

function App() {
  useEffect(()=>{
    fetch("/hello")
    .then(res => res.json())
    .then(data => console.log(data.message))
  }, [])

  return (
    <div className="App">
      Budget-Yourself!
    </div>
  );
}

export default App;
