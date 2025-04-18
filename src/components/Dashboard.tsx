import React, { useState } from 'react';
import { 
  BookOpen, Calendar, Award, Settings, 
  PlusCircle, Clock, User, LogOut, Home
} from 'lucide-react';
import ChildRegistrationForm from './ChildRegistrationForm';

// Tipos
interface StudentProfile {
  id: number;
  name: string;
  grade: string;
  age: number;
  school?: string;
  autonomousCommunity?: string;
  subjects?: string[];
  learningStyle?: string;
  specialNeeds?: string;
  interests?: string[];
}

// Datos de muestra para el MVP
const sampleStudentProfiles: StudentProfile[] = [
  { id: 1, name: 'Ana', grade: '3º Primaria', age: 8 },
];

const sampleActivities = [
  { id: 1, title: 'Repaso Multiplicaciones', subject: 'Matemáticas', date: 'Hoy', isNew: true },
  { id: 2, title: 'Lectura Comprensiva', subject: 'Lengua', date: 'Ayer', isNew: false },
  { id: 3, title: 'Provincias de España', subject: 'Conocimiento del Medio', date: '12/04', isNew: false },
];

const Dashboard = () => {
  const [activeStudent, setActiveStudent] = useState(sampleStudentProfiles[0]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [studentProfiles, setStudentProfiles] = useState(sampleStudentProfiles);

  const handleAddChild = (childData: any) => {
    const newChild = {
      id: studentProfiles.length + 1,
      ...childData,
      age: calculateAge(childData.birthDate)
    };
    
    setStudentProfiles(prev => [...prev, newChild]);
    setShowAddChild(false);
    
    // Si es el primer hijo, establecerlo como activo
    if (studentProfiles.length === 0) {
      setActiveStudent(newChild);
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-emerald-700 flex flex-col items-center py-8">
        <div className="mb-8">
          <BookOpen className="text-white" size={28} />
        </div>
        <nav className="flex flex-col items-center space-y-8">
          <NavItem icon={<Home size={20} />} label="Inicio" isActive />
          <NavItem icon={<PlusCircle size={20} />} label="Crear" />
          <NavItem icon={<Calendar size={20} />} label="Planificar" />
          <NavItem icon={<Award size={20} />} label="Logros" />
          <NavItem icon={<User size={20} />} label="Perfiles" onClick={() => setShowAddChild(true)} />
        </nav>
        <div className="mt-auto">
          <NavItem icon={<Settings size={20} />} label="Ajustes" />
          <NavItem icon={<LogOut size={20} />} label="Salir" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-20 p-8">
        {showAddChild ? (
          <ChildRegistrationForm
            onSubmit={handleAddChild}
            onCancel={() => setShowAddChild(false)}
          />
        ) : (
          <>
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">¡Bienvenido a EduFamilia!</h1>
                <p className="text-slate-600">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center">
                {studentProfiles.length > 0 ? (
                  <>
                    <div className="mr-4 text-right">
                      <p className="text-sm font-semibold text-slate-800">Perfil activo:</p>
                      <p className="text-emerald-600 font-medium">{activeStudent.name} ({activeStudent.grade})</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      {activeStudent.name[0]}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAddChild(true)}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <PlusCircle className="mr-2" size={20} />
                    Añadir Hijo/a
                  </button>
                )}
              </div>
            </header>

            {studentProfiles.length > 0 ? (
              <>
                {/* Quick Actions */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <QuickActionCard 
                    icon={<PlusCircle size={24} />}
                    title="Crear Ficha de Repaso"
                    description="Generar una nueva ficha personalizada para imprimir"
                    buttonText="Crear ficha"
                    buttonLink="/crear-ficha"
                  />
                  <QuickActionCard 
                    icon={<Calendar size={24} />}
                    title="Planificar Rutina"
                    description="Organizar la semana de estudio con horarios y temas"
                    buttonText="Crear rutina"
                    buttonLink="/rutina"
                  />
                  <QuickActionCard 
                    icon={<Award size={24} />}
                    title="Tablero de Logros"
                    description="Personalizar y descargar nuevos tableros de recompensas"
                    buttonText="Ver tableros"
                    buttonLink="/tableros"
                  />
                </section>

                {/* Recent Activities */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Actividades recientes</h2>
                    <button className="text-emerald-600 text-sm font-medium hover:text-emerald-800">
                      Ver todas
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actividad
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Asignatura
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {sampleActivities.map(activity => (
                          <tr key={activity.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-slate-900">
                                  {activity.title}
                                </div>
                                {activity.isNew && (
                                  <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                    Nuevo
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-900">{activity.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-slate-500">{activity.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                Ver detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            ) : (
              // Estado vacío
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-sm font-medium text-slate-900">No hay perfiles</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Comienza añadiendo el perfil de tu hijo/a para personalizar su experiencia de aprendizaje.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddChild(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Añadir Hijo/a
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive?: boolean; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${
      isActive ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
    } transition-colors`}
    title={label}
  >
    {icon}
    <span className="text-xs mt-1">{label.substring(0, 1)}</span>
  </button>
);

const QuickActionCard = ({ icon, title, description, buttonText, buttonLink }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 mb-4">{description}</p>
    <a
      href={buttonLink}
      className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
    >
      {buttonText}
      <Clock className="ml-2" size={16} />
    </a>
  </div>
);

export default Dashboard; 