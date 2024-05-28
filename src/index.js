import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Login from './components/Login';
import ErrorPage from './ErrorPage'
import Explore from './components/Explore';
import Details from './components/Details';
import Signup from './components/Signup';
import { Provider } from 'react-redux';
import store from './store';
import Account from './components/Account';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='account' element={<Account />} />
      <Route path='explore' element={<Explore />} />
      <Route path='details/:id' element={<Details />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='contact' element={<Contact />} />
      <Route path='*' element={<ErrorPage></ErrorPage>} />
    </Route>
  )
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
