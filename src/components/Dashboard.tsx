import React, { useState } from 'react';
import { 
  BookOpen, Calendar, Award, Settings, 
  PlusCircle, Clock, User, LogOut, Home
} from 'lucide-react';

// Datos de muestra para el MVP
const sampleStudentProfiles = [
  { id: 1, name: 'Ana', grade: '3º Primaria', age: 8 },
];

const sampleActivities = [
  { id: 1, title: 'Repaso Multiplicaciones', subject: 'Matemáticas', date: 'Hoy', isNew: true },
  { id: 2, title: 'Lectura Comprensiva', subject: 'Lengua', date: 'Ayer', isNew: false },
  { id: 3, title: 'Provincias de España', subject: 'Conocimiento del Medio', date: '12/04', isNew: false },
];

const Dashboard = () => {
  const [activeStudent, setActiveStudent] = useState(sampleStudentProfiles[0]);
  
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
          <NavItem icon={<User size={20} />} label="Perfiles" />
        </nav>
        <div className="mt-auto">
          <NavItem icon={<Settings size={20} />} label="Ajustes" />
          <NavItem icon={<LogOut size={20} />} label="Salir" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-20 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">¡Bienvenido a EduFamilia!</h1>
            <p className="text-slate-600">Lunes, 14 de abril de 2025</p>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-semibold text-slate-800">Perfil activo:</p>
              <p className="text-emerald-600 font-medium">{activeStudent.name} ({activeStudent.grade})</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              {activeStudent.name[0]}
            </div>
          </div>
        </header>

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

        {/* Recommended Activity */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-slate-800">Actividad recomendada para hoy</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                15 minutos
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <BookOpen className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Repaso de multiplicaciones con juegos
                </h3>
                <p className="text-slate-600">
                  Matemáticas • Adecuado para el nivel actual de Ana
                </p>
              </div>
              <button className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                Ver ficha
              </button>
            </div>
          </div>
        </section>

        {/* Activity History */}
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
                {sampleActivities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-slate-800">
                          {activity.title}
                          {activity.isNew && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                              Nuevo
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{activity.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{activity.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-emerald-600 hover:text-emerald-800">
                        Imprimir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isActive }) => (
  <a 
    href="#"
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${
      isActive ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
    } transition-colors`}
    title={label}
  >
    {icon}
    <span className="text-xs mt-1">{label.substring(0, 1)}</span>
  </a>
);

const QuickActionCard = ({ icon, title, description, buttonText, buttonLink }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
        {React.cloneElement(icon, { className: "text-emerald-600" })}
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <p className="text-slate-600 mb-4">{description}</p>
    <a 
      href={buttonLink}
      className="block w-full py-2 px-4 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors"
    >
      {buttonText}
    </a>
  </div>
);

export default Dashboard; 