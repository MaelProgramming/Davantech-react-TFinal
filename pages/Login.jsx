import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Smartphone } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // On appelle la vraie fonction Firebase de ton Context
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError('Erreur de connexion : email ou mot de passe invalide');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex bg-orange-600 p-3 rounded-xl mb-4 shadow-lg shadow-orange-500/20">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
          <p className="text-gray-500 mt-2">Inicia sesión en Davantech.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
               placeholder="••••••••"
               required
             />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta? <Link to="/register" className="text-orange-600 hover:text-orange-700 font-semibold">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;