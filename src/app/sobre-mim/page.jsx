"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function SobreMim() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Conheça a história por trás do Laços de Pata e nossa missão de conectar corações
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Nossa Missão */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nossa Missão</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  O <strong>Laços de Pata</strong> nasceu do desejo de criar uma ponte entre animais que precisam de um lar e famílias prontas para amar incondicionalmente.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Acreditamos que cada animal merece uma segunda chance e que a tecnologia pode ser uma ferramenta poderosa para facilitar adoções responsáveis e conscientes.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">500+</h3>
                    <p className="text-sm text-gray-600">Animais cadastrados</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-600">100+</h3>
                    <p className="text-sm text-gray-600">Adoções realizadas</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                  <span className="text-8xl">🐾</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">
                    Transformando Vidas
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Uma adoção por vez
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nossa Equipe</h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 mb-6">
                  <Image
                    src="/luiza-photo.jpg"
                    alt="Luiza Nicoluci Schettini"
                    fill
                    className="object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Luiza Nicoluci Schettini
                </h3>
                
                <p className="text-blue-600 font-semibold text-lg mb-4">
                  Desenvolvedora
                </p>
                
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-6">
                  Apaixonada por tecnologia e animais, desenvolveu esta plataforma para fazer a diferença na vida dos pets.
                </p>
                
                {/* Características */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <span className="text-2xl mb-2 block">💻</span>
                    <p className="text-sm font-medium text-gray-800">Desenvolvedora</p>
                    <p className="text-xs text-gray-600">Full Stack</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <span className="text-2xl mb-2 block">🐾</span>
                    <p className="text-sm font-medium text-gray-800">Amante dos Animais</p>
                    <p className="text-xs text-gray-600">Protetor independente</p>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <span className="text-2xl mb-2 block">❤️</span>
                    <p className="text-sm font-medium text-gray-800">Missão Social</p>
                    <p className="text-xs text-gray-600">Fazer a diferença</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nossa História</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Como Tudo Começou</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A ideia do Laços de Pata surgiu da necessidade observada de facilitar o processo de adoção de animais. Muitas vezes, protetores e ONGs têm dificuldade em divulgar seus pets, enquanto famílias interessadas não sabem onde encontrar animais para adoção.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Combinando conhecimento em tecnologia com amor pelos animais, nasceu esta plataforma que conecta quem precisa de um lar com quem tem amor para dar.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Nossos Valores</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600"><strong>Adoção Responsável:</strong> Promovemos encontros conscientes e duradouros</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600"><strong>Transparência:</strong> Informações claras sobre cada animal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600"><strong>Gratuidade:</strong> Plataforma 100% gratuita para todos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-600"><strong>Bem-estar Animal:</strong> Priorizamos sempre o bem-estar dos pets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologia */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Tecnologia a Serviço do Amor</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-4xl mb-4 block">⚡</span>
                <h3 className="text-xl font-semibold mb-2">Plataforma Moderna</h3>
                <p className="text-blue-100">
                  Desenvolvida com as mais recentes tecnologias para garantir a melhor experiência
                </p>
              </div>
              
              <div>
                <span className="text-4xl mb-4 block">📱</span>
                <h3 className="text-xl font-semibold mb-2">Responsiva</h3>
                <p className="text-blue-100">
                  Funciona perfeitamente em computadores, tablets e smartphones
                </p>
              </div>
              
              <div>
                <span className="text-4xl mb-4 block">🔒</span>
                <h3 className="text-xl font-semibold mb-2">Segura</h3>
                <p className="text-blue-100">
                  Seus dados e informações estão protegidos com tecnologia de segurança avançada
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Faça Parte Desta História</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Seja você um protetor, uma ONG ou alguém interessado em adotar, venha fazer parte da nossa comunidade e ajudar a transformar vidas.
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex justify-center">
              <Link
                href="/listagem"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver Animais para Adoção
              </Link>
              <Link
                href="/contato"
                className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}