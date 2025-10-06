"use client";

import { useState, useEffect } from 'react';
import PetCard from '../../components/PetCard';

export default function Listagem() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    especie: '',
    porte: '',
    sexo: '',
    localizacao: ''
  });

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
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:3002/api/animals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const apiData = await response.json();
        
        if (Array.isArray(apiData)) {
          const mappedData = mapApiDataToFrontend(apiData);
          setPets(mappedData);
          setFilteredPets(mappedData);
        } else {
          throw new Error('API retornou dados em formato inválido');
        }
        
      } catch (error) {
        console.error('Erro ao carregar pets:', error);
        setError('Não foi possível carregar os animais. Tente novamente mais tarde.');
        setPets([]);
        setFilteredPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Filtros corrigidos
  useEffect(() => {
    if (!Array.isArray(pets) || pets.length === 0) {
      setFilteredPets([]);
      return;
    }

    let filtered = [...pets];

    // Filtro por espécie
    if (filters.especie && filters.especie !== '') {
      filtered = filtered.filter(pet => {
        if (!pet.especie) return false;
        return pet.especie.toLowerCase() === filters.especie.toLowerCase();
      });
    }

    // Filtro por porte
    if (filters.porte && filters.porte !== '') {
      filtered = filtered.filter(pet => {
        if (!pet.porte) return false;
        return pet.porte.toLowerCase() === filters.porte.toLowerCase();
      });
    }

    // Filtro por sexo
    if (filters.sexo && filters.sexo !== '') {
      filtered = filtered.filter(pet => {
        if (!pet.sexo) return false;
        return pet.sexo.toLowerCase() === filters.sexo.toLowerCase();
      });
    }

    // Filtro por localização (busca parcial)
    if (filters.localizacao && filters.localizacao.trim() !== '') {
      filtered = filtered.filter(pet => {
        if (!pet.localizacao) return false;
        return pet.localizacao.toLowerCase().includes(filters.localizacao.toLowerCase().trim());
      });
    }

    setFilteredPets(filtered);
  }, [pets, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      especie: '',
      porte: '',
      sexo: '',
      localizacao: ''
    });
  };

  // Função para recarregar dados
  const reloadData = () => {
    setLoading(true);
    setError(null);
    
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/animals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const apiData = await response.json();
        
        if (Array.isArray(apiData)) {
          const mappedData = mapApiDataToFrontend(apiData);
          setPets(mappedData);
          setFilteredPets(mappedData);
        }
        
      } catch (error) {
        console.error('Erro ao recarregar pets:', error);
        setError('Não foi possível carregar os animais. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Animais para Adoção 🐾
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre seu novo melhor amigo! Todos esses animais estão esperando por uma família amorosa.
          </p>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-red-600 mr-2">❌</span>
                <p className="text-red-800">{error}</p>
              </div>
              <button
                onClick={reloadData}
                className="text-red-600 hover:text-red-700 font-medium text-sm underline"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {/* Filtros com CSS melhorado */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">🔍</span>
            Filtrar Animais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            {/* Filtro Espécie */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Espécie
              </label>
              <div className="relative">
                <select
                  value={filters.especie}
                  onChange={(e) => handleFilterChange('especie', e.target.value)}
                  className="w-full p-3 pl-4 pr-10 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                >
                  <option value="">Todas as espécies</option>
                  <option value="Cão">🐕 Cão</option>
                  <option value="Gato">🐱 Gato</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtro Porte */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Porte
              </label>
              <div className="relative">
                <select
                  value={filters.porte}
                  onChange={(e) => handleFilterChange('porte', e.target.value)}
                  className="w-full p-3 pl-4 pr-10 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                >
                  <option value="">Todos os portes</option>
                  <option value="Pequeno">🐕‍🦺 Pequeno</option>
                  <option value="Médio">🐕 Médio</option>
                  <option value="Grande">🐕‍🦮 Grande</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtro Sexo */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Sexo
              </label>
              <div className="relative">
                <select
                  value={filters.sexo}
                  onChange={(e) => handleFilterChange('sexo', e.target.value)}
                  className="w-full p-3 pl-4 pr-10 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                >
                  <option value="">Todos</option>
                  <option value="Macho">♂️ Macho</option>
                  <option value="Fêmea">♀️ Fêmea</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtro Localização */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Localização
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite a cidade..."
                  value={filters.localizacao}
                  onChange={(e) => handleFilterChange('localizacao', e.target.value)}
                  className="w-full p-3 pl-10 pr-4 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300 transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Informações dos filtros e botão limpar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium text-primary-600 mr-1">
                {filteredPets.length}
              </span>
              <span>
                animal(is) encontrado(s)
                {pets.length > 0 && filteredPets.length !== pets.length && (
                  <span className="text-gray-400 ml-1">de {pets.length} total</span>
                )}
              </span>
            </div>
            
            {(filters.especie || filters.porte || filters.sexo || filters.localizacao) && (
              <button
                onClick={clearFilters}
                className="flex items-center px-4 py-2 text-sm font-medium text-primary-500 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Lista de Pets */}
        <div className="mb-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-gray-600">Carregando animais...</p>
            </div>
          ) : (
            <div>
              {filteredPets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  {filteredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} showStatus />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl">🔍</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">
                    {error ? 'Erro ao carregar animais' : 'Nenhum animal encontrado'}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {error 
                      ? 'Verifique sua conexão e tente novamente' 
                      : pets.length === 0 
                        ? 'Não há animais cadastrados no momento'
                        : 'Tente ajustar os filtros para encontrar mais opções'
                    }
                  </p>
                  {(filters.especie || filters.porte || filters.sexo || filters.localizacao) && !error && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
                    >
                      Ver todos os animais
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}