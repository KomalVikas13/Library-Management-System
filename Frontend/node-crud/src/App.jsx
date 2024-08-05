import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Student from './components/Student'
import Book from './components/Book'
import Library from './components/Library'
import BookUpdate from './components/BookUpdate'
import StudentUpdate from './components/StudentUpdate'
import LibraryUpdate from './components/LibraryUpdate'
import {Route, Routes} from "react-router-dom"
import Routes_file from './components/Routes_file'

function App() {
  return(
    <>
      <Routes_file></Routes_file>
      <Routes>
        <Route path='/student' element={<Student></Student>}></Route>
        <Route path='/book' element={<Book></Book>}></Route>
        <Route path='/' element={<Library></Library>}></Route>
        <Route path='/update/:data' element={<BookUpdate></BookUpdate>}></Route>
        <Route path='/updateStudent/:data' element={<StudentUpdate></StudentUpdate>}></Route>
        <Route path='/updateLibray/:id' element={<LibraryUpdate></LibraryUpdate>}></Route>
      </Routes>
    </>
  )
}

export default App
