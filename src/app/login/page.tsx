'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const [shake, setShake] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (usuario === 'admin' && senha === 'senha123') {
      setErro('');
      router.push('/admin');
    } else {
      setErro('Usuário ou senha incorretos.');
      setShake(false); // zera primeiro
      setTimeout(() => setShake(true), 10); // força reatribuição após pequeno atraso
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF3E4] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-[490px] mx-auto">
        <h1 className="h1 !text-center !ml-0">Login</h1>

        {erro && <p className="text-red-500 text-lg text-center mb-4">{erro}</p>}

        <form onSubmit={handleLogin} className={`space-y-5 ${shake ? 'animate-shake' : ''}`}>
          <div>
            <label htmlFor="usuario" className="block text-lg font-medium text-gray-700">Usuário</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md outline-none
                ${erro ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#343230] focus:border-[#343230]'}
              `}
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-lg font-medium text-gray-700">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md outline-none
                ${erro ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#343230] focus:border-[#343230]'}
              `}
              required
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-2 px-6 bg-[#FF6B00] text-white font-semibold rounded-md hover:bg-[#cc5500] transition">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
