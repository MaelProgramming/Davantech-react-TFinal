import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AboutContact from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

// Layout for main pages (Home, Catalog, etc.) - Includes Header & Footer
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Layout for Auth pages - No Header/Footer
const AuthLayout = () => {
  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Auth Routes (No Header/Footer) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Main App Routes (With Header/Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path='/about' element={<AboutContact />} /> 
            <Route path= "/cart" element={<Cart />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;