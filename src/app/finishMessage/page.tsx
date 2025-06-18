"use client";

import React from "react";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-[#fdf2e1] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-xl w-full text-center">
                <h1 className="h1 !text-center !ml-0 mb-6">Pedido enviado!</h1>
                <p className="text-xl text-[#3D3933] mb-4">
                    Seu pedido foi anotado e enviado para ser realizado um orçamento.
                </p>
                <p className="text-lg text-[#3D3933]">
                    Obrigado por escolher a EloDrinks! Em breve entraremos em contato.
                </p>
            </div>
        </div>
    );
}