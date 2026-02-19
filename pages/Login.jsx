import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Smartphone } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username || 'Usuario'); // Default mock logic
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex bg-orange-600 p-3 rounded-xl mb-4 shadow-lg shadow-orange-500/20">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
          <p className="text-gray-500 mt-2">Inicia sesión en Davantech.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              placeholder="usuario123"
              required
            />
          </div>
          <div>
             <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
             <input 
               type="password" 
               id="pass"
               className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
               placeholder="••••••••"
             />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">

          <Link to="/home" className="text-orange-600 hover:text-orange-700 font-semibold">Volver al Home</Link>

        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta? <Link to="/register" className="text-orange-600 hover:text-orange-700 font-semibold">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;