import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase'; 
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Wallet as WalletIcon, PlusCircle, ArrowUpRight, Loader2 } from 'lucide-react';

const Wallet = () => {
    const { user, userData } = useAuth(); // userData récupère le solde réel de Firebase
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleRecharge = async (e) => {
        e.preventDefault();
        const amount = parseFloat(rechargeAmount);
        
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Por favor, introduce un monto válido.', type: 'error' });
            return;
        }

        if (!user) {
            setMessage({ text: 'Debes iniciar sesión para recargar.', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, "users", user.uid);
            
            // On utilise increment() de Firebase : c'est atomique et safe
            await updateDoc(userRef, {
                balance: increment(amount)
            });

            setMessage({ text: `¡Recarga de ${amount}€ exitosa!`, type: 'success' });
            setRechargeAmount('');
        } catch (error) {
            console.error("Error en la recarga:", error);
            setMessage({ text: 'Hubo un fallo en la matriz bancaria.', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-50 flex flex-col items-center">
            
            {/* Tarjeta de Crédito Davantech */}
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-[2.5rem] p-8 shadow-2xl text-white mb-8 relative overflow-hidden group border border-white/10">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-all duration-700"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.3em]">Davantech Credit</p>
                            <h2 className="text-5xl font-black mt-2 tracking-tighter">
                                {/* On affiche le solde qui vient directement de Firestore via le context */}
                                {(userData?.balance || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                            </h2>
                        </div>
                        <WalletIcon className="w-12 h-12 text-orange-600" />
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] text-blue-200/30 uppercase font-bold tracking-widest">Titular</p>
                            <p className="font-bold text-lg tracking-tight">{userData?.username || 'Cargando...'}</p>
                        </div>
                        <div className="text-right">
                            <span className="bg-orange-600/20 text-orange-500 border border-orange-500/30 px-4 py-1 rounded-full text-[10px] font-black italic tracking-widest">PREMIUM USER</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulario de Recarga */}
            <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center uppercase tracking-tighter">
                    <PlusCircle className="w-6 h-6 mr-3 text-orange-600" />
                    Inyectar Capital
                </h3>

                <form onSubmit={handleRecharge} className="space-y-6">
                    <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl group-focus-within:text-orange-600 transition-colors">€</span>
                        <input 
                            type="number" 
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 pl-12 pr-4 text-2xl font-black focus:border-orange-600 focus:bg-white outline-none transition-all placeholder:text-gray-200"
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-orange-600 disabled:bg-gray-400 text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-3 text-lg overflow-hidden"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <span>Confirmar Operación</span>
                                <ArrowUpRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </form>

                {message.text && (
                    <div className={`mt-6 p-4 rounded-xl text-center font-bold text-sm animate-in slide-in-from-top-4 duration-300 ${
                        message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wallet;