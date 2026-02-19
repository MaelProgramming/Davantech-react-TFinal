import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet as WalletIcon, PlusCircle, History, ArrowUpRight } from 'lucide-react';

const Wallet = () => {
    const { user } = useAuth();
    
    const [balance, setBalance] = useState(150.00); 
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleRecharge = (e) => {
        e.preventDefault();
        const amount = parseFloat(rechargeAmount);
        
        if (isNaN(amount) || amount <= 0) {
            setMessage('Por favor, introduce un monto válido.');
            return;
        }

        setBalance(prev => prev + amount);
        setRechargeAmount('');
        setMessage(`¡Recarga de ${amount}€ exitosa!`);
        
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Tarjeta de Saldo Principal con Gradiente y Animación */}
            <div className="w-full max-w-md bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 shadow-2xl text-white mb-8 transform transition-all hover:scale-[1.02] duration-300">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Saldo Disponible</p>
                        <h2 className="text-5xl font-black mt-1">
                            {balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </h2>
                    </div>
                    <WalletIcon className="w-10 h-10 text-blue-200 opacity-50" />
                </div>
                <div className="pt-4 border-t border-blue-400/30 flex justify-between items-center text-sm">
                    <span>{user?.username || 'Usuario Invitado'}</span>
                    <span className="bg-blue-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase">Davantech Card</span>
                </div>
            </div>

            {/* Formulario de Recarga */}
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <PlusCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Recargar Saldo
                </h3>

                <form onSubmit={handleRecharge} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-500 mb-2">Monto a añadir</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">€</span>
                            <input 
                                type="number" 
                                value={rechargeAmount}
                                onChange={(e) => setRechargeAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-10 pr-4 text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center space-x-2"
                    >
                        <span>Confirmar Recarga</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 text-center rounded-xl font-medium text-sm animate-bounce">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;