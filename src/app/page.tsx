'use client';

import FirstSection from './first-section';
import MultiStepForm from './clientInfo/client-info';

export default function Home() {
  return (
    <main className="w-full">
      <section className="w-full">
        <FirstSection />
      </section>

      <section
        id="second-section"
        className="h-screen bg-[url('/quemSomos.png')] bg-cover bg-center bg-no-repeat relative px-8 flex items-center justify-start"
      >
        <div className="max-w-4xl w-full px-4">
          <p className="p">
            A Elo Drinks é especializada em serviços de coquetelaria para eventos sociais e eventos corporativos. Hoje ela vem sendo reconhecida no mercado de eventos corporativos e de wedding por indicações dos melhores assessores, decoradores e espaço de eventos da Grande São Paulo por terem ótimos profissionais e um excelente atendimento.
          </p>
        </div>
      </section>

      <section
        id="third-section"
        className="min-h-screen bg-[#FFF3E4] flex flex-col justify-start pt-10"
      >
        <MultiStepForm />
      </section>
    </main>
  );
}