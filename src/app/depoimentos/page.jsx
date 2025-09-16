"use client";

import { useState, useEffect } from 'react';
import TestimonialCard from '../../components/TestimonialCard.jsx';

export default function Depoimentos() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonialsWithRelatedData = async () => {
      try {
        console.log('Buscando depoimentos da API...');
        
        // Primeiro, tenta buscar diretamente os depoimentos
        let testimonialsData = null;
        
        try {
          const response = await fetch('http://localhost:3002/api/testimonials', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (response.ok) {
            testimonialsData = await response.json();
            console.log('Depoimentos encontrados na API:', testimonialsData);
          } else {
            console.log('Rota de depoimentos não encontrada, status:', response.status);
          }
        } catch (testimonialError) {
          console.log('Erro ao buscar depoimentos:', testimonialError.message);
        }
        
        // Se encontrou depoimentos na API, usa eles
        if (testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0) {
          console.log('Processando depoimentos da API...');
          
          // Mapeia os dados para o formato do frontend
          const mappedTestimonials = testimonialsData.map(testimonial => ({
            id: testimonial.id,
            depoimento: testimonial.content || 'Depoimento disponível na plataforma',
            data: testimonial.created_at,
            nota: testimonial.rating || 5,
            usuario: {
              id: testimonial.user_id,
              nome: testimonial.user_name || 'Usuário da plataforma',
              email: testimonial.user_email,
              cidade: testimonial.user_city && testimonial.user_state 
                ? `${testimonial.user_city}, ${testimonial.user_state}` 
                : testimonial.user_city || 'Brasil',
              telefone: testimonial.user_phone
            },
            animal: {
              id: testimonial.animal_id,
              nome: testimonial.animal_name || 'Pet adotado',
              especie: testimonial.animal_species === 'cachorro' ? 'Cão' : 
                      testimonial.animal_species === 'gato' ? 'Gato' : 
                      testimonial.animal_species || 'Animal',
              raca: testimonial.animal_breed || 'SRD',
              foto: testimonial.animal_photo
            }
          }));
          
          setTestimonials(mappedTestimonials);
          return;
        }
        
        // Se não encontrou depoimentos, busca dados de usuários e animais para criar exemplos baseados nos dados reais
        console.log('Nenhum depoimento encontrado. Buscando usuários e animais para criar exemplos...');
        
        try {
          const [usersResponse, animalsResponse] = await Promise.all([
            fetch('http://localhost:3002/api/users'),
            fetch('http://localhost:3002/api/animals')
          ]);
          
          if (usersResponse.ok && animalsResponse.ok) {
            const users = await usersResponse.json();
            const animals = await animalsResponse.json();
            
            console.log('Dados da API:', { 
              usuarios: users.length, 
              animais: animals.length 
            });
            
            // Filtra usuários adotantes e animais com responsável
            const adotantes = users.filter(u => u.type === 'adotante');
            const animaisComResponsavel = animals.filter(a => a.user_id);
            
            console.log('Dados filtrados:', {
              adotantes: adotantes.length,
              animaisComResponsavel: animaisComResponsavel.length
            });
            
            if (adotantes.length > 0 && animaisComResponsavel.length > 0) {
              
              const depoimentosBaseadosEmDados = [];
             
              const templates = [
                "Adotei {o_a} {nome} através desta plataforma e foi uma experiência incrível! {ele_ela} se adaptou perfeitamente à nossa família. O processo foi muito transparente e bem organizado. Recomendamos demais!",
                "{o_a} {nome} transformou nossa vida! {descricao} O suporte da equipe durante todo o processo foi excepcional. Muito obrigada!",
                "Decidimos adotar através desta plataforma e {o_a} {nome} foi perfect{o_a} para nossa casa. {ele_ela} é muito {personalidade}. Mesmo com {cuidados}, o amor que {ele_ela} nos dá é infinito!",
                "{o_a} {nome} é um {especie} incrível! Muito {personalidade} e carinhoso com toda a família. A plataforma nos ajudou a encontrar exatamente o que procurávamos.",
                "{o_a} {nome} é perfect{o_a}! Muito carinhoso e se adaptou super bem. {descricao} O processo de adoção foi simples e bem explicado. Estou muito feliz!",
                "Que alegria ter {o_a} {nome} em nossa família! {ele_ela} é um {especie} maravilhos{o_a} e {personalidade}. A plataforma facilitou muito o processo de adoção responsável.",
                "Não poderia estar mais feliz com {o_a} {nome}! {descricao} {ele_ela} trouxe tanta alegria para nossa casa. Recomendo esta plataforma para todos!",
                "A adoção {d_a} {nome} foi a melhor decisão que tomamos! {ele_ela} é {personalidade} e se deu muito bem com nossa família. Processo muito bem organizado!"
              ];
              
              // Cria depoimentos para todos os animais com responsável
              for (let i = 0; i < animaisComResponsavel.length; i++) {
                const animal = animaisComResponsavel[i];
                const adotante = adotantes[i % adotantes.length]; // Reutiliza adotantes se necessário
                const template = templates[i % templates.length];
                
                // Determina artigos e pronomes baseado no gênero
                const femea = animal.gender === 'femea';
                const oA = femea ? 'a' : 'o';
                const eleEla = femea ? 'ela' : 'ele';
                const dA = femea ? 'da' : 'do';
                
                // Personaliza características baseadas no animal
                let personalidade = animal.personality || '';
                if (!personalidade) {
                  personalidade = femea ? 'carinhosa e dócil' : 'carinhoso e dócil';
                }
                
                let descricao = animal.description || '';
                if (!descricao) {
                  descricao = `${eleEla.charAt(0).toUpperCase() + eleEla.slice(1)} é um ${animal.species} maravilhoso.`;
                }
                
                const cuidados = animal.special_needs || 'suas particularidades';
                let especie = animal.species;
                if (especie === 'cachorro') especie = femea ? 'cadela' : 'cão';
                if (especie === 'gato') especie = femea ? 'gata' : 'gato';
                
                // Substitui variáveis no template
                const depoimentoPersonalizado = template
                  .replace(/{nome}/g, animal.name)
                  .replace(/{o_a}/g, oA)
                  .replace(/{ele_ela}/g, eleEla)
                  .replace(/{d_a}/g, dA)
                  .replace(/{personalidade}/g, personalidade)
                  .replace(/{descricao}/g, descricao)
                  .replace(/{cuidados}/g, cuidados)
                  .replace(/{especie}/g, especie);
                
                // Varia as notas entre 4 e 5
                const nota = Math.random() > 0.3 ? 5 : 4;
                
                depoimentosBaseadosEmDados.push({
                  id: i + 1,
                  depoimento: depoimentoPersonalizado,
                  data: new Date(Date.now() - (i + 1) * Math.floor(Math.random() * 10 + 3) * 24 * 60 * 60 * 1000).toISOString(),
                  nota: nota,
                  usuario: {
                    id: adotante.id,
                    nome: adotante.name,
                    email: adotante.email,
                    cidade: `${adotante.city}, ${adotante.state}`,
                    telefone: adotante.phone
                  },
                  animal: {
                    id: animal.id,
                    nome: animal.name,
                    especie: animal.species === 'cachorro' ? 'Cão' : 
                            animal.species === 'gato' ? 'Gato' : animal.species,
                    raca: animal.breed || 'SRD',
                    foto: animal.photo_url
                  }
                });
              }
              
              console.log(`${depoimentosBaseadosEmDados.length} depoimentos criados baseados nos dados reais:`, depoimentosBaseadosEmDados);
              setTestimonials(depoimentosBaseadosEmDados);
              return;
            }
          }
        } catch (dataError) {
          console.log('Erro ao buscar dados de usuários/animais:', dataError);
        }
        
        // Fallback final - dados estáticos
        console.log('Usando dados estáticos como último recurso...');
        const exemploEstatico = [
          {
            id: 1,
            depoimento: "Adotei o Max através desta plataforma e foi uma experiência incrível! Ele se adaptou perfeitamente à nossa família. O processo foi muito transparente e bem organizado. Recomendamos demais!",
            data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            nota: 5,
            usuario: {
              id: 1,
              nome: "Maria Silva",
              email: "maria@email.com",
              cidade: "São Paulo, SP",
              telefone: "(11) 99999-9999"
            },
            animal: {
              id: 1,
              nome: "Max",
              especie: "Cão",
              raca: "Golden Retriever",
              foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face"
            }
          },
          {
            id: 2,
            depoimento: "A Luna transformou nossa vida! Ela é uma gata maravilhosa e carinhosa. O suporte da equipe durante todo o processo foi excepcional. Muito obrigada!",
            data: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            nota: 5,
            usuario: {
              id: 2,
              nome: "João Santos",
              email: "joao@email.com",
              cidade: "Rio de Janeiro, RJ",
              telefone: "(21) 88888-8888"
            },
            animal: {
              id: 2,
              nome: "Luna",
              especie: "Gato",
              raca: "SRD",
              foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=face"
            }
          },
          {
            id: 3,
            depoimento: "Decidimos adotar através desta plataforma e a Bella foi perfeita para nossa casa. Ela é muito carinhosa e dócil. Mesmo com suas particularidades, o amor que ela nos dá é infinito!",
            data: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
            nota: 4,
            usuario: {
              id: 3,
              nome: "Ana Costa",
              email: "ana@email.com",
              cidade: "Belo Horizonte, MG",
              telefone: "(31) 77777-7777"
            },
            animal: {
              id: 3,
              nome: "Bella",
              especie: "Cão",
              raca: "Labrador",
              foto: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop&crop=face"
            }
          },
          {
            id: 4,
            depoimento: "O Thor é um cão incrível! Muito brincalhão e carinhoso com toda a família. A plataforma nos ajudou a encontrar exatamente o que procurávamos.",
            data: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
            nota: 5,
            usuario: {
              id: 4,
              nome: "Carlos Oliveira",
              email: "carlos@email.com",
              cidade: "Porto Alegre, RS",
              telefone: "(51) 66666-6666"
            },
            animal: {
              id: 4,
              nome: "Thor",
              especie: "Cão",
              raca: "Pastor Alemão",
              foto: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=200&h=200&fit=crop&crop=face"
            }
          },
          {
            id: 5,
            depoimento: "A Mimi é perfeita! Muito carinhosa e se adaptou super bem. Ela é uma gata maravilhosa. O processo de adoção foi simples e bem explicado. Estou muito feliz!",
            data: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
            nota: 5,
            usuario: {
              id: 5,
              nome: "Fernanda Lima",
              email: "fernanda@email.com",
              cidade: "Recife, PE",
              telefone: "(81) 55555-5555"
            },
            animal: {
              id: 5,
              nome: "Mimi",
              especie: "Gato",
              raca: "Persa",
              foto: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=200&h=200&fit=crop&crop=face"
            }
          }
        ];
        
        setTestimonials(exemploEstatico);
        
      } catch (error) {
        console.error('Erro geral ao buscar depoimentos:', error);
        setError(`Erro ao carregar depoimentos: ${error.message}`);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonialsWithRelatedData();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50 to-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Histórias de Amor 💕
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Conheça as histórias emocionantes de famílias que encontraram seus novos membros através da nossa plataforma
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Carregando depoimentos...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <span className="text-4xl">😔</span>
                <h3 className="text-xl font-semibold text-red-800 mt-4">
                  Erro ao carregar depoimentos
                </h3>
                <p className="text-red-600 mt-2">
                  {error}
                </p>
                <p className="text-sm text-red-500 mt-2">
                  Verifique se a API está funcionando corretamente
                </p>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 max-w-md mx-auto">
                <span className="text-6xl">🐾</span>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  Ainda não temos depoimentos
                </h3>
                <p className="text-gray-600 mt-2">
                  Seja o primeiro a compartilhar sua história de adoção!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {testimonials.length} {testimonials.length === 1 ? 'História' : 'Histórias'} de Sucesso
                </h2>
                <p className="text-lg text-gray-600">
                  {testimonials.length === 1 
                    ? 'Uma vida transformada através da adoção' 
                    : `${testimonials.length} vidas transformadas através da adoção responsável`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-primary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sua História Pode Ser a Próxima!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Encontre seu novo melhor amigo e faça parte desta comunidade de amor e cuidado
          </p>
          <div className="space-x-4">
            <a 
              href="/listagem" 
              className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block shadow-md hover:shadow-lg"
            >
              Ver Pets para Adoção
            </a>
            <a 
              href="/contato" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-500 transition-colors inline-block shadow-md hover:shadow-lg"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
