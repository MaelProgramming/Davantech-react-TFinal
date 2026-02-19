import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Smartphone, AlertCircle } from 'lucide-react';

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
      await login(email, password);
      navigate('/home');
    } catch (err) {
      // Firebase renvoie des codes d'erreur, on les rend lisibles
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email o contraseña incorrectos.');
      } else {
        setError('Error al conectar con el servidor.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-orange-600 p-3 rounded-xl mb-4 shadow-lg shadow-orange-500/20">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
          <p className="text-gray-500 mt-2">Inicia sesión en Davantech.</p>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center space-x-2 rounded shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
               placeholder="••••••••"
               required
             />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.98] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta? <Link to="/register" className="text-orange-600 hover:underline font-bold">Regístrate</Link>
          </p>
          <Link to="/home" className="inline-block text-xs text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest font-semibold">
            ← Volver al Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;