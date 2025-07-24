import { useState } from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Search />
            <Home />
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;

