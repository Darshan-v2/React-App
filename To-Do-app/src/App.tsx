import React from 'react'
import './App.css'
import LoginForm from './Components/LoginForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ToDoTaskModule from './Components/ToDoTaskModule'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import PageScrollingInfinite from './Components/PageScrollingInfinite'
import NavigationTab from './Components/Layouts/NavigationTab'
import About from './Components/Layouts/About'
import Home from './Components/Layouts/Home'
import Error from './Components/Error'
import LoggedInHeader from './Components/Layouts/LoggedInHeader'
import AddTask from './Components/AddTask'
import PostForm from './Components/PostForm'

function App() {

  const { loggedIn } = useSelector(selectUser)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!loggedIn &&
            <>
              <Route path='/' element={<NavigationTab />} >
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='*' element={<LoginForm />} />
              </Route>
            </>}
          {loggedIn &&
            <>
              <Route path='/' element={<LoggedInHeader />}>
                <Route path='/' element={<ToDoTaskModule />} />
                <Route path='*' element={<Error />} />
                <Route path='/addtask' element={<AddTask />} />
                <Route path='/postform' element={<PostForm />} />
                <Route path='/about' element={<About />} />
                <Route path='/userprofiles' element={<PageScrollingInfinite />} />
              </Route>
            </>}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

