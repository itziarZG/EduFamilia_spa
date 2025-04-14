import React from 'react';

const features = [
  {
    title: 'Fichas de Repaso Personalizadas',
    description: 'Genera fichas adaptadas al nivel y necesidades de tu hijo/a, con actividades interactivas y juegos educativos.',
    icon: '📝',
  },
  {
    title: 'Rutinas de Estudio',
    description: 'Crea agendas semanales personalizadas con bloques temáticos de 15-20 minutos para mantener el interés.',
    icon: '📅',
  },
  {
    title: 'Técnicas de Estudio',
    description: 'Recibe recomendaciones de métodos de estudio adaptados al perfil y estilo de aprendizaje de tu hijo/a.',
    icon: '🎯',
  },
  {
    title: 'Juegos de Atención',
    description: 'Accede a mini desafíos diseñados para mejorar la concentración y memoria de forma divertida.',
    icon: '🎮',
  },
  {
    title: 'Tablero de Logros',
    description: 'Implementa un sistema de refuerzo positivo con medallas y mensajes personalizados.',
    icon: '🏆',
  },
  {
    title: 'Feedback Personalizado',
    description: 'Recibe mensajes de refuerzo adaptados para motivar y celebrar los logros de tu hijo/a.',
    icon: '💝',
  },
];

const Features: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Características Principales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Todo lo que necesitas para acompañar el aprendizaje de tu hijo/a
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 