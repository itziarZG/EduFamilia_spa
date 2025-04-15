import React, { useState } from 'react';
import { ArrowLeft, Printer, Download, Share2, Edit, Save, Star, ChevronDown, ChevronUp } from 'lucide-react';

// Datos de muestra para el MVP
const sampleWorksheet = {
  id: 'ws-123',
  title: 'Repaso de Multiplicaciones',
  subject: 'Matemáticas',
  level: 'Medio',
  studentName: 'Ana',
  grade: '3º Primaria',
  duration: '15 minutos',
  createdAt: '14/04/2025',
  sections: [
    {
      title: 'Recordatorio',
      content: `
        <p>Para multiplicar números de una cifra, recuerda que puedes usar las tablas de multiplicar.</p>
        <p>Ejemplo: 7 × 8 = 56</p>
      `
    },
    {
      title: 'Ejercicio 1: Completa las multiplicaciones',
      type: 'completion',
      exercises: [
        { problem: '6 × 7 = ', answer: '42' },
        { problem: '8 × 9 = ', answer: '72' },
        { problem: '3 × 4 = ', answer: '12' }
      ]
    },
    {
      title: 'Ejercicio 2: Resuelve los problemas',
      type: 'problems',
      exercises: [
        { 
          problem: 'Si tienes 4 bolsas con 6 caramelos cada una, ¿cuántos caramelos tienes en total?',
          answer: '24 caramelos'
        },
        { 
          problem: 'En una estantería hay 5 filas con 7 libros cada una. ¿Cuántos libros hay en total?',
          answer: '35 libros'
        }
      ]
    }
  ]
};

const VistaFicha = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    sampleWorksheet.sections.map((_section, index) => true)
  );

  const toggleSection = (index) => {
    const newExpanded = [...expandedSections];
    newExpanded[index] = !newExpanded[index];
    setExpandedSections(newExpanded);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/dashboard" className="flex items-center text-slate-800 hover:text-emerald-600">
            <ArrowLeft className="mr-2" size={20} />
            <span>Volver al Dashboard</span>
          </a>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg ${
                isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700" title="Editar">
              <Edit size={20} />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700" title="Compartir">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                {sampleWorksheet.subject}
              </div>
              <h1 className="text-2xl font-bold text-slate-800">{sampleWorksheet.title}</h1>
              <p className="text-slate-600 mt-1">
                Para {sampleWorksheet.studentName} • {sampleWorksheet.grade} • Nivel {sampleWorksheet.level}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className={`px-4 py-2 border rounded-lg ${
                  showAnswers 
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800' 
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {showAnswers ? 'Ocultar respuestas' : 'Mostrar respuestas'}
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center">
                <Printer size={18} className="mr-2" />
                <span>Imprimir</span>
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center">
                <Download size={18} className="mr-2" />
                <span>PDF</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-sm text-slate-500">
            <div className="flex items-center mr-4">
              <span className="mr-1">Duración:</span>
              <span className="font-medium">{sampleWorksheet.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">Creado el:</span>
              <span className="font-medium">{sampleWorksheet.createdAt}</span>
            </div>
          </div>
        </div>
        
        {/* Worksheet Content */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          {/* Print Header - Only visible when printing */}
          <div className="hidden print:block mb-6 pb-4 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800 text-center">{sampleWorksheet.title}</h1>
            <div className="flex justify-between mt-4 text-sm text-slate-600">
              <div>Nombre: _______________________</div>
              <div>Fecha: ____/____/________</div>
            </div>
          </div>
          
          {/* Worksheet Sections */}
          <div className="space-y-8">
            {sampleWorksheet.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-slate-200 rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center px-6 py-4 bg-slate-50 cursor-pointer"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  <h2 className="text-lg font-semibold text-slate-800">{section.title}</h2>
                  <button className="text-slate-500">
                    {expandedSections[sectionIndex] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {expandedSections[sectionIndex] && (
                  <div className="p-6">
                    {section.content && (
                      <div 
                        className="mb-6" 
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                    
                    {section.type === 'completion' && (
                      <div className="space-y-4">
                        {section.exercises.map((exercise, index) => (
                          <div key={index} className="flex items-center">
                            <div className="text-lg text-slate-800 mr-2">{exercise.problem}</div>
                            {showAnswers ? (
                              <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                                {exercise.answer}
                              </div>
                            ) : (
                              <div className="w-16 h-8 border-b-2 border-slate-400"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'problems' && (
                      <div className="space-y-6">
                        {section.exercises.map((exercise, index) => (
                          <div key={index}>
                            <div className="text-md text-slate-800 mb-2">{index + 1}. {exercise.problem}</div>
                            {showAnswers ? (
                              <div className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded-md inline-block">
                                Respuesta: {exercise.answer}
                              </div>
                            ) : (
                              <div className="h-12 border-b border-slate-300"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200 print:mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-500">
                ID de ficha: {sampleWorksheet.id}
              </div>
              <div className="text-sm text-slate-500">
                Generado con EduFamilia • www.edufamilia.com
              </div>
            </div>
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SuggestionCard 
              title="División por una cifra"
              subject="Matemáticas"
              level="Medio"
              isNew
            />
            <SuggestionCard 
              title="Problemas de multiplicación"
              subject="Matemáticas"
              level="Avanzado"
            />
            <SuggestionCard 
              title="Tablas de multiplicar"
              subject="Matemáticas"
              level="Fácil"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const SuggestionCard = ({ title, subject, level, isNew = false }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <div className="text-xs font-medium text-slate-500">
        {subject} • Nivel {level}
      </div>
      {isNew && (
        <div className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
          Nuevo
        </div>
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <div className="flex justify-between items-center">
      <div className="text-sm text-slate-600">15 minutos</div>
      <button className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium hover:bg-emerald-200">
        Ver
      </button>
    </div>
  </div>
);

export default VistaFicha;