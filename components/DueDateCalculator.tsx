import React, { useState } from 'react';

const DueDateCalculator: React.FC = () => {
  const [calcMethod, setCalcMethod] = useState<'lmp' | 'conception'>('lmp');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);

  const calculateDueDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setDueDate(null);
      return;
    }

    const inputDate = new Date(date + 'T00:00:00'); // Ensure it's treated as local time
    let resultDate: Date;

    if (calcMethod === 'lmp') {
      // Add 280 days (40 weeks) to LMP
      resultDate = new Date(inputDate.getTime());
      resultDate.setDate(resultDate.getDate() + 280);
    } else { // 'conception'
      // Add 266 days (38 weeks) to conception date
      resultDate = new Date(inputDate.getTime());
      resultDate.setDate(resultDate.getDate() + 266);
    }
    
    setDueDate(resultDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  };

  return (
    <div className="bg-dark-blue text-white p-8 rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold font-serif text-center mb-6 text-primary-orange">Estimated Due Date Calculator</h3>
      <form onSubmit={calculateDueDate} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Calculate based on:</label>
          <div className="flex gap-4 rounded-lg bg-gray-700 p-1">
            <button
              type="button"
              onClick={() => setCalcMethod('lmp')}
              className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${calcMethod === 'lmp' ? 'bg-primary-orange text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
              Last Menstrual Period
            </button>
            <button
              type="button"
              onClick={() => setCalcMethod('conception')}
              className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 focus:outline-none ${calcMethod === 'conception' ? 'bg-primary-orange text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
              Date of Conception
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="date-input" className="block text-sm font-medium text-gray-300 mb-2">
            {calcMethod === 'lmp' ? 'First Day of Last Menstrual Period' : 'Estimated Date of Conception'}
          </label>
          <input
            type="date"
            id="date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
          />
        </div>

        <div className="text-center">
            <button type="submit" className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:opacity-95">
                Calculate
            </button>
        </div>
      </form>
      
      {dueDate && (
        <div className="mt-8 text-center bg-black bg-opacity-20 p-6 rounded-lg">
          <p className="text-lg text-gray-300">Estimated Due Date:</p>
          <p className="text-4xl font-bold font-serif text-primary-orange mt-2">{dueDate}</p>
        </div>
      )}
       <p className="text-xs text-gray-400 text-center mt-6">
          Disclaimer: This is only an estimate. Please consult with a healthcare provider for an accurate due date.
      </p>
    </div>
  );
};

export default DueDateCalculator;