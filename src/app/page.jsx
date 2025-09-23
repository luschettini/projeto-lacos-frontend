"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PetCard from '../components/PetCard.jsx';

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para converter dados da API para formato do frontend
  const mapApiDataToFrontend = (apiData) => {
    return apiData.map(pet => ({
      id: pet.id,
      nome: pet.name,
      especie: pet.species === 'cachorro' ? 'Cão' : pet.species === 'gato' ? 'Gato' : pet.species,
      porte: pet.size === 'pequeno' ? 'Pequeno' : 
             pet.size === 'medio' ? 'Médio' : 
             pet.size === 'grande' ? 'Grande' : pet.size,
      sexo: pet.gender === 'macho' ? 'Macho' : 
            pet.gender === 'femea' ? 'Fêmea' : pet.gender,
      idade: pet.age_category === 'filhote' ? 'Filhote' :
             pet.age_category === 'adulto' ? 'Adulto' :
             pet.age_category === 'idoso' ? 'Idoso' : pet.age_category,
      descricao: pet.description || 'Sem descrição disponível',
      localizacao: pet.owner_city || 'Localização não informada',
      fotos: pet.photo_url ? [pet.photo_url] : [],
      vacinado: pet.is_vaccinated,
      castrado: pet.is_neutered,
      raca: pet.breed || 'SRD',
      personalidade: pet.personality,
      historicoMedico: pet.medical_history,
      necessidadesEspeciais: pet.special_needs,
      historiaResgate: pet.rescue_story,
      protetor: {
        nome: pet.owner_name,
        telefone: pet.owner_phone,
        cidade: pet.owner_city
      }
    }));
  };

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        console.log('Buscando pets em destaque...');
        
        const response = await fetch('http://localhost:3002/api/animals/featured', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const apiData = await response.json();
        console.log('Dados brutos da API:', apiData);
        
        if (Array.isArray(apiData) && apiData.length > 0) {
          const mappedData = mapApiDataToFrontend(apiData);
          console.log('Dados mapeados:', mappedData);
          setFeaturedPets(mappedData);
        } else {
          console.log('API não retornou pets featured, tentando buscar todos...');
          // Se não tiver featured, pegar os primeiros 3 da lista geral
          const allResponse = await fetch('http://localhost:3002/api/animals');
          const allData = await response.json();
          
          if (Array.isArray(allData)) {
            const mappedData = mapApiDataToFrontend(allData.slice(0, 3));
            setFeaturedPets(mappedData);
          }
        }
        
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
        setFeaturedPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50 to-white">
      {/* Banner de Doação - Fiel ao Design Original */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" 
               style={{
                 backgroundImage: "linear-gradient(135deg, #f3e8ff 0%, #fef3e2 50%, #f3e8ff 100%)",
                 minHeight: "350px"
               }}>
            <div className="grid lg:grid-cols-2 items-center h-full relative">
              {/* Lado esquerdo - Texto principal */}
              <div className="p-8 lg:p-12 z-10">
                <h1 className="text-5xl lg:text-7xl font-black leading-none">
                  <span className="block text-purple-700">Faça a</span>
                  <span className="block text-purple-800">diferença</span>
                  <span className="block text-purple-600">sem sair</span>
                  <span className="block text-purple-700">de casa!</span>
                </h1>
              </div>
              
              {/* Lado direito - Imagem e call-to-action */}
              <div className="relative h-[350px] lg:h-[400px]">
                {/* Imagem do cão ocupando todo o espaço */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&crop=face')"
                  }}
                ></div>
                
                {/* Conteúdo de texto sobreposto */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 text-right max-w-xs">
                  <div className="bg-white/95 backdrop-blur rounded-2xl p-4 lg:p-6 shadow-xl">
                    <p className="text-sm lg:text-base text-gray-800 leading-relaxed mb-4">
                      <span className="block mb-1">Se você também acha que todo</span>
                      <span className="block mb-1">animal de rua merece um lar,</span>
                      <span className="block mb-1 font-semibold">adote agora e ajude</span>
                      <span className="block font-semibold">a transformar uma vida!</span>
                    </p>
                    
                    <a 
                      href="/listagem" 
                      className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-sm lg:text-base"
                    >
                      ADOTE AGORA
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adoção Responsável</h3>
              <p className="text-gray-600">
                Promovemos adoções conscientes, garantindo o bem-estar dos animais
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Conexões Seguras</h3>
              <p className="text-gray-600">
                Facilitamos o contato entre protetores e adotantes de forma segura
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Pets em Destaque</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Conheça alguns dos nossos amiguinhos que estão esperando por você. Cada um tem uma história única e muito amor para dar.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Carregando pets...</p>
            </div>
          ) : (
            <div className="mb-16">
              {Array.isArray(featuredPets) && featuredPets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {featuredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
                    <span className="text-7xl block mb-4">🐾</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Carregando pets da API...
                    </h3>
                    <p className="text-gray-600">
                      Os dados estão sendo processados
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Botão centralizado com destaque */}
          <div className="flex justify-center">
            <div className="text-center">
              <Link 
                href="/listagem"
                className="inline-flex items-center bg-primary-500 text-white px-10 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Todos os Animais
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
              <p className="text-sm text-gray-500 mt-3">
                Explore nossa galeria completa de animais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar uma Vida?</h2>
          <p className="text-xl mb-8">
            Cada adoção é uma história de amor que muda duas vidas para sempre.
          </p>
          <Link 
            href="/listagem"
            className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
}