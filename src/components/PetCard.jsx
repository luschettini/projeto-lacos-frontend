import Link from 'next/link';
import Image from 'next/image';

export default function PetCard({ pet, showStatus = false }) {
  if (!pet) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Imagem */}
      <div className="relative h-56 bg-gray-100 overflow-hidden flex items-center justify-center">
        {pet.fotos && pet.fotos[0] ? (
          <Image
            src={`http://localhost:3002${pet.fotos[0]}`}
            alt={pet.nome || 'Animal'}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-6xl">🐾</span>
          </div>
        )}
        
        {/* Badge de disponibilidade */}
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
            Disponível
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {pet.nome || 'Nome não informado'}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">{pet.especie || 'N/A'}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span>{pet.porte || 'N/A'}</span>
          <span className="mx-2 text-gray-400">•</span>
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

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {pet.descricao || 'Sem descrição disponível'}
        </p>

        {/* Status de saúde */}
        {showStatus && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {pet.vacinado && (
              <span className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">
                ✅ Vacinado
              </span>
            )}
            {pet.castrado && (
              <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                ✅ Castrado
              </span>
            )}
          </div>
        )}

        {/* Botão para ver detalhes */}
        <div className="mt-auto">
          <Link 
            href={`/detalhes/${pet.id}`}
            className="block w-full bg-primary-500 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}