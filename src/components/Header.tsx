import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">Estudia con tu Hija</h1>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500">
              Inicio
            </a>
            <a href="/fichas" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
              Fichas de Repaso
            </a>
            <a href="/rutinas" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
              Rutinas
            </a>
            <a href="/tecnicas" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
              Técnicas
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 