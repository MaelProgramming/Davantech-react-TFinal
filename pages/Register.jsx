import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration then auto-login
    login('NuevoMiembro');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex bg-gray-100 p-3 rounded-xl mb-4 border border-gray-200">
            <UserPlus className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
          <p className="text-gray-500 mt-2">Únete a nuestra comunidad.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input type="text" className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="Elige un usuario" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="tu@ejemplo.com" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
             <input type="password" className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500" placeholder="Contraseña segura" />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all mt-4"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Ya eres miembro? <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;