import Image from 'next/image';

export default function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  const renderStars = (rating = 5) => {
    const validRating = Math.min(Math.max(parseInt(rating) || 5, 1), 5);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < validRating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  // Extrai dados do usuário com fallbacks
  const usuario = testimonial.usuario || {};
  const nomeUsuario = usuario.nome || testimonial.user_name || 'Usuário anônimo';
  const cidadeUsuario = usuario.cidade || testimonial.user_city || 'Localização não informada';

  // Extrai dados do animal com fallbacks
  const animal = testimonial.animal || {};
  const nomeAnimal = animal.nome || testimonial.animal_name || 'Animal não identificado';
  const especieAnimal = animal.especie || testimonial.animal_species || 'Espécie não informada';
  const racaAnimal = animal.raca || testimonial.animal_breed;
  const fotoAnimal = animal.foto || testimonial.animal_photo;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Header do Depoimento */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6">
        <div className="flex items-center space-x-4">
          {/* Avatar do usuário */}
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {nomeUsuario.charAt(0).toUpperCase()}
          </div>
          
          {/* Informações do usuário */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">
              {nomeUsuario}
            </h3>
            <p className="text-sm text-gray-600">
              {cidadeUsuario}
            </p>
          </div>
          
          {/* Avaliação */}
          <div className="flex">
            {renderStars(testimonial.nota)}
          </div>
        </div>
      </div>

      {/* Conteúdo do Depoimento */}
      <div className="p-6">
        <blockquote className="text-gray-700 italic mb-4 text-sm leading-relaxed">
          "{testimonial.depoimento || 'Depoimento não disponível'}"
        </blockquote>
        
        <div className="text-xs text-gray-500 mb-4">
          {formatDate(testimonial.data)}
        </div>

        {/* Informações do Animal */}
        {(nomeAnimal !== 'Animal não identificado' || fotoAnimal) && (
          <div className="border-t pt-4">
            <div className="flex items-center space-x-3">
              {/* Foto do animal */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {fotoAnimal ? (
                  <Image
                    src={fotoAnimal}
                    alt={nomeAnimal}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center text-gray-400 ${fotoAnimal ? 'hidden' : ''}`}>
                  <span className="text-2xl">🐾</span>
                </div>
              </div>
              
              {/* Informações do animal */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">
                  {nomeAnimal}
                </h4>
                <p className="text-xs text-gray-600">
                  {especieAnimal}
                  {racaAnimal && racaAnimal !== 'SRD' && ` • ${racaAnimal}`}
                  {racaAnimal === 'SRD' && ' • Sem raça definida'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer com badge */}
      <div className="bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            História de adoção
          </span>
          <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full">
            ❤️ Família feliz
          </span>
        </div>
      </div>
    </div>
  );
}
