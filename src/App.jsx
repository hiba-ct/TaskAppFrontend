
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthForm from './components/AuthForm'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'
import TasksPage from './components/TasksPage'

function App() {
  

  return (
    <>
   

   <Header/>
<Routes>
<Route path='/' element={<AuthForm/>}/>
<Route path='/taskform' element={<TaskForm/>}/>
<Route path='/tasklist' element={<TaskList/>}/>
<Route path='/taskitem' element={<TaskItem/>}/>
<Route path='/tasks' element={<TasksPage/>}/>



</Routes>

   <Footer/>
    </>
  )
}

export default App
