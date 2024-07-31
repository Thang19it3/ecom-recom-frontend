import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OutStore from './pages/OutStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SingleBlog from './pages/SingleBlog';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRotes } from "./routing/PrivateRotes"
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import GHN from './pages/GHN';
import Brand from './pages/Brand';
import Status from './pages/Status';
import Category from './pages/Category';
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='about' element={<About/>} />
          <Route path='contact' element={<Contact/>} />
          <Route path='product/:id' element={<SingleProduct/>} />
          <Route path='product' element={<OutStore/>} />
          <Route path='my-orders' element={<PrivateRotes><Orders/></PrivateRotes>} />
          <Route path='my-profile' element={<PrivateRotes><Profile/></PrivateRotes>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='blogs' element={<Blog />} />
          <Route path='compare-product' element={<CompareProduct />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='login' element={<Login />} />
          <Route path='sign' element={<SignUp />} />
          <Route path='brand/:id' element={<Brand />} />
          <Route path='ghn' element={<GHN />} />
          <Route path='blog/:id' element={<SingleBlog />} />
          <Route path='order/:id' element={<Status />} />
          <Route path='category/:id' element={<Category />} />
          <Route path='forgot-password' element={<Forgotpassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
