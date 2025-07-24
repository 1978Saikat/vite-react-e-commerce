import { useState } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';

function App() {
  // Determine if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname === "1978saikat.github.io";
  const Router = isGitHubPages ? HashRouter : BrowserRouter;
  const basename = isGitHubPages ? "/vite-react-e-commerce" : "/";

  return (
    <Router basename={basename}>
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
    </Router>
  );
}

export default App;

