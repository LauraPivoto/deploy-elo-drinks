'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function FirstSection() {
  const router = useRouter();
  
  const scrollToThirdSection = () => {
    const thirdSection = document.getElementById('third-section'); // Get the section by id
    if (thirdSection) {
      thirdSection.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section
    }
  };

  const scrollToSecondSection = () => {
    const thirdSection = document.getElementById('second-section'); // Get the section by id
    if (thirdSection) {
      thirdSection.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <section className="h-screen bg-[url('/background.png')] bg-cover bg-center relative px-8">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button onClick={goToLogin}  className="border-[2px] border-[#343230] bg-transparent text-[#343230] font-bold py-1 px-2 rounded-md">
          Login
        </button>
        <button
          onClick={scrollToThirdSection} // Call the scroll function
          className="border-[2px] border-[#343230] bg-transparent text-[#343230] font-bold py-1 px-2 rounded-md"
        >
          Fazer um orçamento
        </button>
        <button onClick={scrollToSecondSection}  className="border-[2px] border-[#343230] bg-transparent text-[#343230] font-bold py-1 px-2 rounded-md">
          Quem somos
        </button>
        <a href="https://www.instagram.com/elodrinks" target="_blank" rel="noopener noreferrer">
          <button>
            <img src="/instagram_icon.png" alt="Ícone" className="w-10 h-10" />
          </button>
        </a>
      </div>

      <div className="h-full flex items-end">
        <h1 className="text-white title font-bold tracking-wider text-left">
          ELO DRINKS
        </h1>
      </div>
    </section>
  );
}