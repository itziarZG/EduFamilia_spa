import React, { useState } from 'react';
import { User, BookOpen, Calendar, Award, LogIn } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // En un MVP real, aquí conectaríamos con el backend
      console.log('Autenticando usuario:', email);
      
      // Simular una autenticación exitosa
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      // Redireccionar al dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error durante la autenticación:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="text-emerald-600 mr-2" />
            <h1 className="text-xl font-bold text-slate-800">EduFamilia</h1>
          </div>
          <button 
            onClick={() => setIsLogin(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row">
        {/* Left Column - Value Proposition */}
        <div className="md:w-1/2 pr-0 md:pr-12 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Acompaña el aprendizaje de tus hijos, sin pantallas adicionales
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            EduFamilia te ayuda a crear material educativo personalizado para niños de primaria,
            basado en técnicas pedagógicas efectivas y adaptado a las necesidades de tu hijo.
          </p>
          
          <div className="space-y-6">
            <FeatureItem 
              icon={<BookOpen className="text-emerald-600" />}
              title="Fichas personalizadas"
              description="Genera material educativo adaptado al nivel y estilo de aprendizaje de tu hijo."
            />
            <FeatureItem 
              icon={<Calendar className="text-emerald-600" />}
              title="Rutinas de estudio"
              description="Crea hábitos de estudio efectivos con rutinas adaptadas a tu horario familiar."
            />
            <FeatureItem 
              icon={<Award className="text-emerald-600" />}
              title="Sistema de logros"
              description="Motiva el aprendizaje con un tablero de logros físico personalizable."
            />
          </div>
        </div>

        {/* Right Column - Auth Form */}
        <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="********"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="pt-4 pb-2">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Información básica</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Podrás añadir el perfil de tu hijo después de crear tu cuenta.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex">
    <div className="flex-shrink-0 mt-1">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
);

export default LandingPage; 