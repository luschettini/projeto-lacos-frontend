import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🐾 Laços de Pata</h3>
            <p className="text-gray-300 text-sm">
              Conectando corações e transformando vidas através da adoção responsável.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/listagem" className="block text-gray-300 hover:text-white transition-colors">
                Pets para Adoção
              </Link>
              <Link href="/sobre-mim" className="block text-gray-300 hover:text-white transition-colors">
                Sobre Nós
              </Link>
              <Link href="/contato" className="block text-gray-300 hover:text-white transition-colors">
                Contato
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ajuda</h4>
            <div className="space-y-2 text-sm">
              <Link href="/contato" className="block text-gray-300 hover:text-white transition-colors">
                Como Adotar
              </Link>
              <Link href="/contato" className="block text-gray-300 hover:text-white transition-colors">
                Seja um Protetor
              </Link>
              <Link href="/contato" className="block text-gray-300 hover:text-white transition-colors">
                Dúvidas Frequentes
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 contato@lacosdepata.com</p>
              <p>📱 (11) 99999-9999</p>
              <p>🕒 Seg-Sex: 9h às 18h</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Laços de Pata. Todos os direitos reservados. Feito com ❤️ para os animais.</p>
        </div>
      </div>
    </footer>
  );
}