import "./globals.css";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const metadata = {
  title: 'Laços de Pata - Conectando corações e transformando vidas',
  description: 'Uma aplicação web que conecta ONGs, protetores independentes e adotantes em potencial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
