import React, { useState } from 'react';
import { BookOpen, Filter, Settings, ArrowLeft, Download, Printer, MoveLeft, MoveRight } from 'lucide-react';

// Datos de muestra para el MVP
const subjects = [
  { id: 'math', name: 'Matemáticas', icon: '➗' },
  { id: 'lang', name: 'Lengua', icon: '📝' },
  { id: 'science', name: 'Conocimiento del Medio', icon: '🌍' },
  { id: 'english', name: 'Inglés', icon: '🇬🇧' },
];

const mathTopics = [
  { id: 'mult', name: 'Multiplicaciones' },
  { id: 'div', name: 'Divisiones' },
  { id: 'fract', name: 'Fracciones' },
  { id: 'geom', name: 'Geometría' },
];

const difficultyLevels = [
  { id: 'easy', name: 'Fácil' },
  { id: 'medium', name: 'Medio' },
  { id: 'hard', name: 'Avanzado' },
];

const learningStyles = [
  { id: 'visual', name: 'Visual', description: 'Con imágenes y diagramas' },
  { id: 'practical', name: 'Práctico', description: 'Con ejercicios aplicados' },
  { id: 'theoretical', name: 'Teórico', description: 'Con conceptos y explicaciones' },
];

const CrearFicha = () => {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [duration, setDuration] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);

  const handleNext = () => {
    if (step === 3) {
      generateWorksheet();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const generateWorksheet = () => {
    setIsLoading(true);
    
    // Simulación de llamada a API con IA
    setTimeout(() => {
      setGeneratedWorksheet({
        title: `Ficha de ${topic ? topic.name : 'Matemáticas'}`,
        content: "Esta es una ficha generada para el MVP. En la versión real, aquí vendría el contenido generado por la IA.",
        exercises: [
          { type: 'multiple', question: '¿Cuánto es 7 x 8?', options: ['54', '56', '64', '72'], answer: 1 },
          { type: 'open', question: 'Resuelve: 24 ÷ 6 = ' },
          { type: 'match', question: 'Une cada multiplicación con su resultado', 
            pairs: [
              { left: '5 x 7', right: '35' },
              { left: '9 x 6', right: '54' },
              { left: '8 x 4', right: '32' }
            ]
          }
        ]
      });
      setIsLoading(false);
      setStep(4);
    }, 2000);
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
          <h1 className="text-xl font-bold text-slate-800 flex items-center">
            <BookOpen className="text-emerald-600 mr-2" />
            Crear Ficha Educativa
          </h1>
          <div className="w-32"></div> {/* Spacer para centrar el título */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <ProgressStep number={1} title="Materia" isActive={step === 1} isCompleted={step > 1} />
            <ProgressLine isCompleted={step > 1} />
            <ProgressStep number={2} title="Tema" isActive={step === 2} isCompleted={step > 2} />
            <ProgressLine isCompleted={step > 2} />
            <ProgressStep number={3} title="Personalizar" isActive={step === 3} isCompleted={step > 3} />
            <ProgressLine isCompleted={step > 3} />
            <ProgressStep number={4} title="Resultado" isActive={step === 4} isCompleted={step > 4} />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          {/* Step 1: Subject Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Selecciona la materia</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subj) => (
                  <SubjectCard 
                    key={subj.id}
                    subject={subj}
                    isSelected={subject?.id === subj.id}
                    onClick={() => setSubject(subj)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Topic Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Selecciona el tema de {subject?.name}
              </h2>
              <p className="text-slate-600 mb-6">
                Elige el tema específico para generar la ficha de actividades
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mathTopics.map((top) => (
                  <TopicCard 
                    key={top.id}
                    topic={top}
                    isSelected={topic?.id === top.id}
                    onClick={() => setTopic(top)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Customization */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Personaliza la ficha
              </h2>
              <p className="text-slate-600 mb-6">
                Ajusta los parámetros según las necesidades y preferencias de tu hijo/a
              </p>
              
              <div className="space-y-6">
                {/* Difficulty */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Nivel de dificultad</h3>
                  <div className="flex space-x-4">
                    {difficultyLevels.map((level) => (
                      <button
                        key={level.id}
                        className={`px-4 py-2 rounded-lg border ${
                          difficulty === level.id
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                        onClick={() => setDifficulty(level.id)}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Learning Style */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Estilo de aprendizaje</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {learningStyles.map((style) => (
                      <button
                        key={style.id}
                        className={`px-4 py-3 rounded-lg border text-left ${
                          learningStyle === style.id
                            ? 'bg-emerald-100 border-emerald-500'
                            : 'bg-white border-slate-300 hover:bg-slate-50'
                        }`}
                        onClick={() => setLearningStyle(style.id)}
                      >
                        <div className="font-medium text-slate-800">{style.name}</div>
                        <div className="text-sm text-slate-600">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Duración aproximada</h3>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="5"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-64 mr-4"
                    />
                    <span className="text-slate-800 font-medium">{duration} minutos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generated Worksheet */}
          {step === 4 && (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Ficha generada: {topic?.name}
                </h2>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                    <Printer size={18} className="mr-1" />
                    <span>Imprimir</span>
                  </button>
                  <button className="flex items-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    <Download size={18} className="mr-1" />
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </div>
              
              {/* Worksheet Preview */}
              <div className="bg-slate-100 p-8 rounded-lg border border-slate-300 min-h-96">
                <div className="bg-white p-6 shadow-sm rounded-lg max-w-3xl mx-auto">
                  <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
                    {topic?.name} - {difficultyLevels.find(d => d.id === difficulty)?.name}
                  </h1>
                  
                  <div className="mb-8 text-center text-slate-500 text-sm">
                    Nombre: _____________________ Fecha: ___/___/______
                  </div>
                  
                  <div className="space-y-8">
                    {generatedWorksheet?.exercises.map((exercise, index) => (
                      <div key={index} className="border-b pb-6 mb-6 last:border-0">
                        <h3 className="font-bold text-slate-800 mb-3">Ejercicio {index + 1}: {exercise.question}</h3>
                        
                        {exercise.type === 'multiple' && (
                          <div className="grid grid-cols-2 gap-3">
                            {exercise.options.map((option, i) => (
                              <div key={i} className="flex items-center">
                                <div className="h-5 w-5 border border-slate-400 rounded-full mr-2"></div>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {exercise.type === 'open' && (
                          <div className="border-b border-slate-300 h-10"></div>
                        )}
                        
                        {exercise.type === 'match' && (
                          <div className="flex justify-between">
                            <div className="space-y-4 w-1/3">
                              {exercise.pairs.map((pair, i) => (
                                <div key={i} className="p-2 border border-slate-300 rounded text-center">
                                  {pair.left}
                                </div>
                                ))}
                                </div>
                                <div className="flex items-center justify-center w-1/3">
                                  {exercise.pairs.map((pair, i) => (
                                    <div key={i} className="h-0.5 w-full bg-slate-200 my-6"></div>
                                  ))}
                                </div>
                                <div className="space-y-4 w-1/3">
                                  {exercise.pairs.map((pair, i) => (
                                    <div key={i} className="p-2 border border-slate-300 rounded text-center">
                                      {pair.right}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center mt-8">
                        <div className="border border-slate-300 rounded-lg p-3 max-w-sm text-center">
                          <p className="text-sm text-slate-600">
                            Generado con EduFamilia • Un recurso educativo para imprimir en casa
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* More Actions */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">¿Qué quieres hacer ahora?</h3>
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => setStep(1)} 
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                      >
                        Crear otra ficha
                      </button>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                        Guardar en mi colección
                      </button>
                    </div>
                  </div>
                </div>
              )}
    
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-emerald-400 border-t-emerald-700 rounded-full animate-spin mb-4"></div>
                  <p className="text-lg font-medium text-slate-800">Generando ficha personalizada...</p>
                  <p className="text-slate-600">Esto puede tomar unos segundos</p>
                </div>
              )}
            </div>
    
            {/* Navigation Buttons */}
            {!isLoading && step !== 4 && (
              <div className="flex justify-between mt-6">
                {step > 1 ? (
                  <button 
                    onClick={handleBack}
                    className="px-6 py-2 flex items-center text-slate-700 hover:text-slate-900"
                  >
                    <MoveLeft className="mr-2" size={20} />
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button 
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !subject) || 
                    (step === 2 && !topic)
                  }
                  className={`px-6 py-2 flex items-center rounded-lg ${
                    ((step === 1 && !subject) || (step === 2 && !topic))
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {step === 3 ? 'Generar Ficha' : 'Siguiente'}
                  <MoveRight className="ml-2" size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      );
    };
    
    const ProgressStep = ({ number, title, isActive, isCompleted }) => (
      <div className="flex flex-col items-center">
        <div 
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isActive 
              ? 'bg-emerald-600 text-white' 
              : isCompleted
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-600' 
                : 'bg-slate-100 text-slate-500'
          }`}
        >
          {number}
        </div>
        <div className={`text-sm mt-2 font-medium ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
          {title}
        </div>
      </div>
    );
    
    const ProgressLine = ({ isCompleted }) => (
      <div className="h-0.5 flex-grow mx-2">
        <div 
          className={`h-full ${isCompleted ? 'bg-emerald-600' : 'bg-slate-200'}`}
        ></div>
      </div>
    );
    
    const SubjectCard = ({ subject, isSelected, onClick }) => (
      <button
        onClick={onClick}
        className={`p-4 rounded-xl border flex items-center transition-all ${
          isSelected 
            ? 'bg-emerald-50 border-emerald-500 shadow-sm' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
        }`}
      >
        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl mr-4">
          {subject.icon}
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-slate-800">{subject.name}</h3>
          <p className="text-slate-600 text-sm">Fichas personalizadas</p>
        </div>
      </button>
    );
    
    const TopicCard = ({ topic, isSelected, onClick }) => (
      <button
        onClick={onClick}
        className={`p-4 rounded-xl border transition-all ${
          isSelected 
            ? 'bg-emerald-50 border-emerald-500 shadow-sm' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
        }`}
      >
        <h3 className="text-lg font-semibold text-slate-800">{topic.name}</h3>
      </button>
    );
    
    export default CrearFicha;