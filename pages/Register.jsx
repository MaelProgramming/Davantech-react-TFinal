import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase'; // Importe ta config
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations de base (vu qu'on n'a pas TS, on check à la main)
    if (formData.password !== formData.confirmPassword) {
      return setError('Los passwords no coinciden');
    }

    setLoading(true);

    try {
      // 1. Création de l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // 2. Création du profil dans Firestore
      // On utilise l'UID de Firebase Auth comme ID de document
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        role: 'student', // Par défaut
        credits: 100,    // On est généreux pour le shop
        createdAt: new Date().toISOString()
      });

      navigate('/home');
    } catch (err) {
      setError('Error al crear cuenta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex bg-orange-600 p-3 rounded-xl mb-4 shadow-lg shadow-orange-500/20">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
          <p className="text-gray-500 mt-2">Únete a la comunidad Davantech.</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input type="text" id="username" onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="email@escuela.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" id="password" onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="••••••••" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

            <div className="mt-6 text-center text-sm text-gray-500">
            
                      <Link to="/home" className="text-orange-600 hover:text-orange-700 font-semibold">Volver al Home</Link>
            
                    </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta? <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;