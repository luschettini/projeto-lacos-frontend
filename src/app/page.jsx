"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/pets?limit=3');
        const data = await response.json();
        setFeaturedPets(data);
      } catch (error) {
        console.error('Erro ao buscar pets em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Laços de Pata 🐾
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Conectando corações e transformando vidas. Encontre seu novo melhor amigo 
            e dê uma segunda chance para quem mais precisa de amor.
          </p>
          <div className="space-x-4">
            <Link 
              href="/listagem" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Animais para Adoção
            </Link>
            <Link 
              href="/contato" 
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Seja um Protetor
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa Missão</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Facilitamos o processo de adoção responsável, conectando ONGs, protetores 
              independentes e famílias que desejam abrir seus corações para um novo membro.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adoção Responsável</h3>
              <p className="text-gray-600">
                Promovemos adoções conscientes, garantindo o bem-estar dos animais
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Conexões Seguras</h3>
              <p className="text-gray-600">
                Facilitamos o contato entre protetores e adotantes de forma segura
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Segunda Chance</h3>
              <p className="text-gray-600">
                Damos visibilidade a animais resgatados que precisam de um lar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pets em Destaque</h2>
            <p className="text-lg text-gray-600">
              Conheça alguns dos nossos amiguinhos que estão esperando por você
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando pets...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPets.map((pet) => (
                <div key={pet.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    {pet.fotos && pet.fotos[0] ? (
                      <Image
                        src={pet.fotos[0]}
                        alt={pet.nome}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <span className="text-4xl">🐾</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pet.nome}</h3>
                    <p className="text-gray-600 mb-2">{pet.especie} • {pet.porte}</p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pet.descricao}</p>
                    <Link 
                      href={`/detalhes/${pet.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Conhecer {pet.nome}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/listagem"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todos os Animais
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar uma Vida?</h2>
          <p className="text-xl mb-8">
            Cada adoção é uma história de amor que muda duas vidas para sempre.
          </p>
          <Link 
            href="/listagem"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </main>
  );
}