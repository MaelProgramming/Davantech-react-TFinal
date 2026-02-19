import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase'; 
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Wallet as WalletIcon, PlusCircle, ArrowUpRight, Loader2 } from 'lucide-react';

const Wallet = () => {
    const { user, userData } = useAuth();
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleRecharge = async (e) => {
        e.preventDefault();
        const amount = parseFloat(rechargeAmount);
        
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Monto inválido.', type: 'error' });
            return;
        }

        if (!user) return;

        setLoading(true);
        try {
            const userRef = doc(db, "users", user.uid);
            
            await updateDoc(userRef, {
                balance: increment(amount)
            });

            setMessage({ text: `+${amount}€ Inyectados`, type: 'success' });
            setRechargeAmount('');
        } catch (error) {
            setMessage({ text: 'Error de red.', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-screen bg-gray-50 flex flex-col items-center">
            
            {/* Card Visuelle */}
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-[2.5rem] p-8 shadow-2xl text-white mb-8 relative overflow-hidden border border-white/10">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-[0.3em]">Davantech Balance</p>
                            <h2 className="text-5xl font-black mt-2 tracking-tighter">
                                {(userData?.balance || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                            </h2>
                        </div>
                        <WalletIcon className="w-12 h-12 text-orange-600" />
                    </div>
                    
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[10px] text-blue-200/30 uppercase font-bold tracking-widest">Titular</p>
                            <p className="font-bold text-lg tracking-tight">{userData?.username || 'User'}</p>
                        </div>
                        <span className="bg-orange-600/20 text-orange-500 border border-orange-500/30 px-4 py-1 rounded-full text-[10px] font-black italic">PREMIUM</span>
                    </div>
                </div>
            </div>

            {/* Input de recharge */}
            <div className="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                <form onSubmit={handleRecharge} className="space-y-6">
                    <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl group-focus-within:text-orange-600">€</span>
                        <input 
                            type="number" 
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 pl-12 pr-4 text-2xl font-black focus:border-orange-600 focus:bg-white outline-none transition-all"
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-orange-600 disabled:bg-gray-400 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center space-x-3 text-lg"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                            <>
                                <span>Recargar Saldo</span>
                                <ArrowUpRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </form>

                {message.text && (
                    <div className={`mt-6 p-4 rounded-xl text-center font-bold text-sm ${
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