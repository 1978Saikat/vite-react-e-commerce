import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={
          <>
            <Search />
            <Home />
          </>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

