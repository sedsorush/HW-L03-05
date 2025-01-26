import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider , createBrowserRouter } from "react-router-dom"
import Home from './pages/home/index.jsx'
import Register from './pages/login/Register.jsx'
import Header from './pages/login/index.jsx'
import Login from './pages/login/Login.jsx'
import Books from './pages/Books/index.jsx'
import { Provider } from "react-redux"
import { store } from './redux/index.js'
import BookById from './pages/BookById/index.jsx'
import BookEditor from './pages/BookEditor/index.jsx'
import BookAdder from './pages/BookAdder/index.jsx'


const router = createBrowserRouter([
  {
    path: "/" , 
    element: <Home />},
  {
    path: "/login" , 
    element: <Header /> , 
    children: [{
      path:"/login/log" ,
      element: <Login />
    },
    {
      path: "/login/reg" ,
      element: <Register />
    }]
  },
  {
    path: "/books",
    element: <Books />
  },
  {
    path: "/books/:id",
    element: <BookById />
  },
  {
    path: "/books/:id/edit",
    element: <BookEditor />
  },
  {
    path: "/books/add",
    element: <BookAdder />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
