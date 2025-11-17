import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-6 rounded-lg my-12 max-w-4xl mx-auto shadow-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.636-1.026 2.252-1.026 2.888 0l6.22 10.052c.636 1.026-.168 2.349-1.444 2.349H3.481c-1.276 0-2.08-1.323-1.444-2.349L8.257 3.099zM9 13a1 1 0 112 0 1 1 0 01-2 0zm1-5a1 1 0 00-1 1v3a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold">Legal Disclaimer</h3>
          <div className="mt-2 text-sm">
            <p>The information provided on this website is for educational purposes only and does not constitute legal advice. The content is intended to provide general information and should not be relied upon as a substitute for consultation with a qualified attorney.</p>
            <p className="mt-2">Laws regarding paternity, custody, and child support vary by jurisdiction and are subject to change. For advice on your specific situation, please consult with a licensed legal professional in your area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
