import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface ChildFormData {
  name: string;
  birthDate: string;
  grade: string;
  school: string;
  autonomousCommunity: string;
  subjects: string[];
  learningStyle: string;
  specialNeeds: string;
  interests: string[];
}

interface ChildRegistrationFormProps {
  onSubmit: (data: ChildFormData) => void;
  onCancel: () => void;
}

const GRADES = [
  '1º Primaria',
  '2º Primaria',
  '3º Primaria',
  '4º Primaria',
  '5º Primaria',
  '6º Primaria'
];

const AUTONOMOUS_COMMUNITIES = [
  'Andalucía',
  'Aragón',
  'Asturias',
  'Baleares',
  'Canarias',
  'Cantabria',
  'Castilla-La Mancha',
  'Castilla y León',
  'Cataluña',
  'Comunidad Valenciana',
  'Extremadura',
  'Galicia',
  'La Rioja',
  'Madrid',
  'Murcia',
  'Navarra',
  'País Vasco',
  'Ceuta',
  'Melilla'
];

const SUBJECTS = [
  'Matemáticas',
  'Lengua Castellana y Literatura',
  'Ciencias Naturales',
  'Ciencias Sociales',
  'Inglés',
  'Educación Física',
  'Educación Artística',
  'Valores Sociales y Cívicos/Religión'
];

const LEARNING_STYLES = [
  'Visual',
  'Auditivo',
  'Kinestésico',
  'Mixto'
];

const ChildRegistrationForm: React.FC<ChildRegistrationFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ChildFormData>({
    name: '',
    birthDate: '',
    grade: '',
    school: '',
    autonomousCommunity: '',
    subjects: [],
    learningStyle: '',
    specialNeeds: '',
    interests: []
  });

  const [interestInput, setInterestInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subject = e.target.value;
    setFormData(prev => ({
      ...prev,
      subjects: e.target.checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()]
      }));
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Registrar Nuevo Hijo/a</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 mb-1">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-slate-700 mb-1">
              Curso
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Seleccionar curso</option>
              {GRADES.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Información Escolar */}
        <div className="space-y-4">
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-slate-700 mb-1">
              Centro Educativo
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="autonomousCommunity" className="block text-sm font-medium text-slate-700 mb-1">
              Comunidad Autónoma
            </label>
            <select
              id="autonomousCommunity"
              name="autonomousCommunity"
              value={formData.autonomousCommunity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Seleccionar comunidad</option>
              {AUTONOMOUS_COMMUNITIES.map(community => (
                <option key={community} value={community}>{community}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Asignaturas */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Asignaturas que necesitan refuerzo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SUBJECTS.map(subject => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={subject}
                checked={formData.subjects.includes(subject)}
                onChange={handleSubjectsChange}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Estilo de Aprendizaje */}
      <div className="mt-6">
        <label htmlFor="learningStyle" className="block text-sm font-medium text-slate-700 mb-1">
          Estilo de Aprendizaje Preferido
        </label>
        <select
          id="learningStyle"
          name="learningStyle"
          value={formData.learningStyle}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Seleccionar estilo</option>
          {LEARNING_STYLES.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      {/* Necesidades Especiales */}
      <div className="mt-6">
        <label htmlFor="specialNeeds" className="block text-sm font-medium text-slate-700 mb-1">
          Necesidades Especiales o Consideraciones
        </label>
        <textarea
          id="specialNeeds"
          name="specialNeeds"
          value={formData.specialNeeds}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Describe cualquier necesidad especial o consideración importante..."
        />
      </div>

      {/* Intereses */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Intereses y Aficiones
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Añadir interés..."
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Añadir
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.interests.map(interest => (
            <span
              key={interest}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
            >
              {interest}
              <button
                type="button"
                onClick={() => handleRemoveInterest(interest)}
                className="ml-2 text-emerald-600 hover:text-emerald-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-slate-700 hover:text-slate-900"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
        >
          <Save size={20} className="mr-2" />
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ChildRegistrationForm; 