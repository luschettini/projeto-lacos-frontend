import Link from 'next/link';
import Image from 'next/image';

export default function PetCard({ pet, showStatus = false }) {
  if (!pet) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagem */}
      <div className="relative h-48 bg-gray-200">
        {pet.fotos && pet.fotos[0] ? (
          <Image
            src={pet.fotos[0]}
            alt={pet.nome || 'Animal'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-6xl">🐾</span>
          </div>
        )}
        
        {/* Badge de disponibilidade */}
        <div className="absolute top-2 right-2">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Disponível
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {pet.nome || 'Nome não informado'}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span>{pet.especie || 'N/A'}</span>
          <span className="mx-1">•</span>
          <span>{pet.porte || 'N/A'}</span>
          <span className="mx-1">•</span>
          <span>{pet.sexo || 'N/A'}</span>
        </div>

        {pet.idade && (
          <p className="text-sm text-gray-600 mb-2">
            <strong>Idade:</strong> {pet.idade}
          </p>
        )}

        {pet.localizacao && (
          <p className="text-sm text-gray-500 mb-3 flex items-center">
            <span className="mr-1">📍</span>
            {pet.localizacao}
          </p>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pet.descricao || 'Sem descrição disponível'}
        </p>

        {/* Status de saúde */}
        {showStatus && (
          <div className="flex gap-2 mb-4">
            {pet.vacinado && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                ✅ Vacinado
              </span>
            )}
            {pet.castrado && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                ✅ Castrado
              </span>
            )}
          </div>
        )}

        {/* Botão para ver detalhes */}
        <Link 
          href={`/detalhes/${pet.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}