import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Calendar from "./components/Calendar";



function App() {

  return (
    <> 
        <Calendar/>
        <button onClick={() => console.log("clicked")}>
        </button>
    </>
  )
}

export default App
