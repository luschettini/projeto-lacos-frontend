"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DetalhesAnimal() {
  const params = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para converter dados da API para formato do frontend
  const mapApiDataToFrontend = (pet) => ({
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
    disponivel: pet.is_available,
    protetor: {
      nome: pet.owner_name,
      telefone: pet.owner_phone,
      cidade: pet.owner_city
    }
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!params.id) return;

      setLoading(true);
      setError(null);

      try {
        console.log('Buscando animal ID:', params.id);
        
        const response = await fetch(`http://localhost:3002/api/animals/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Animal não encontrado (${response.status})`);
        }

        const apiData = await response.json();
        console.log('Dados do animal da API:', apiData);
        
        const mappedData = mapApiDataToFrontend(apiData);
        console.log('Dados mapeados:', mappedData);
        
        setAnimal(mappedData);

      } catch (error) {
        console.error('Erro ao buscar animal:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Carregando informações do animal...</p>
        </div>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <span className="text-6xl">😿</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Animal não encontrado</h1>
          <p className="text-gray-600 mt-2">{error || 'Não conseguimos encontrar este animal.'}</p>
          <div className="mt-6 space-x-4">
            <Link 
              href="/listagem"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Outros Animais
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="inline-block border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    const message = `Olá! Tenho interesse em adotar o(a) ${animal.nome}. Poderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/55${animal.protetor.telefone?.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/listagem" className="hover:text-blue-600 transition-colors">Animais</Link>
            <span>›</span>
            <span className="text-gray-800 font-medium">{animal.nome}</span>
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Imagem */}
            <div className="lg:w-1/2">
              <div className="h-96 lg:h-full bg-gray-200 relative">
                {animal.fotos && animal.fotos[0] ? (
                  <Image
                    src={animal.fotos[0]}
                    alt={animal.nome}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-8xl">🐾</span>
                  </div>
                )}
                
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    animal.disponivel 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {animal.disponivel ? '✅ Disponível' : '❌ Não disponível'}
                  </span>
                </div>
              </div>
            </div>

            {/* Informações */}
            <div className="lg:w-1/2 p-8">
              {/* Cabeçalho */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{animal.nome}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {animal.especie}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                    {animal.porte}
                  </span>
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-medium">
                    {animal.sexo}
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                    {animal.idade}
                  </span>
                </div>
                
                {animal.raca && (
                  <p className="text-gray-600 mt-2">
                    <strong>Raça:</strong> {animal.raca}
                  </p>
                )}
                
                <p className="text-gray-500 mt-1 flex items-center">
                  <span className="mr-1">📍</span>
                  {animal.localizacao}
                </p>
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Sobre {animal.nome}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {animal.descricao}
                </p>
              </div>

              {/* Personalidade */}
              {animal.personalidade && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personalidade</h3>
                  <p className="text-gray-600">{animal.personalidade}</p>
                </div>
              )}

              {/* Status de Saúde */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Status de Saúde</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${animal.vacinado ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-gray-600">
                      {animal.vacinado ? 'Vacinado' : 'Não vacinado'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${animal.castrado ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-gray-600">
                      {animal.castrado ? 'Castrado' : 'Não castrado'}
                    </span>
                  </div>
                </div>
                
                {animal.historicoMedico && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Histórico Médico:</p>
                    <p className="text-sm text-gray-600">{animal.historicoMedico}</p>
                  </div>
                )}
                
                {animal.necessidadesEspeciais && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Necessidades Especiais:</p>
                    <p className="text-sm text-gray-600">{animal.necessidadesEspeciais}</p>
                  </div>
                )}
              </div>

              {/* História de Resgate */}
              {animal.historiaResgate && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">História de Resgate</h3>
                  <p className="text-gray-600">{animal.historiaResgate}</p>
                </div>
              )}

              {/* Protetor */}
              {animal.protetor && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Informações do Protetor</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800">{animal.protetor.nome}</p>
                    {animal.protetor.telefone && (
                      <p className="text-sm text-gray-600">📱 {animal.protetor.telefone}</p>
                    )}
                    {animal.protetor.cidade && (
                      <p className="text-sm text-gray-600">📍 {animal.protetor.cidade}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Botões de ação */}
              <div className="space-y-3">
                {animal.disponivel && animal.protetor?.telefone && (
                  <button 
                    onClick={handleContact}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">💬</span>
                    Entrar em Contato via WhatsApp
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `Adote o ${animal.nome}`,
                        text: `Conheça o ${animal.nome}, um ${animal.especie.toLowerCase()} que está procurando um lar!`,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copiado para a área de transferência!');
                    }
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">📤</span>
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão voltar */}
        <div className="mt-8 text-center">
          <Link 
            href="/listagem"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span className="mr-1">←</span>
            Voltar para lista de animais
          </Link>
        </div>
      </div>
    </div>
  );
}