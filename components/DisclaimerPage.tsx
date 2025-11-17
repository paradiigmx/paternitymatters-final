import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue font-serif mb-4 text-center">Legal Disclaimer</h1>
          <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
          
          <div className="prose lg:prose-xl max-w-none text-gray-800 bg-light-bg p-8 rounded-lg shadow-md">
            <p className="lead font-semibold">The information provided on PaternityMatters.org is for educational and informational purposes only and does not, and is not intended to, constitute legal advice.</p>
            
            <p>All content, including text, graphics, images, and information, available on or through this website is for general informational purposes only. The content is not a substitute for professional legal advice from a qualified attorney licensed in your jurisdiction. You should not act or refrain from acting on the basis of any information on this site without first seeking legal advice from counsel in the relevant jurisdiction.</p>
            
            <h3 className="text-dark-blue font-serif">No Attorney-Client Relationship</h3>
            <p>Use of this website or communication with PaternityMatters.org through this site does not form an attorney-client relationship between you and the website's operators or any of its contributors. An attorney-client relationship is only formed when you have signed a formal engagement agreement with a licensed attorney.</p>

            <h3 className="text-dark-blue font-serif">Jurisdictional Variations</h3>
            <p>Laws regarding paternity, child custody, child support, and other family law matters vary significantly from state to state and are constantly changing. The information on this website may not be current or applicable to your specific legal situation or jurisdiction. We do not represent or warrant that the information on this website is complete, accurate, or up-to-date.</p>
            
            <h3 className="text-dark-blue font-serif">Consult a Professional</h3>
            <p>We strongly urge you to consult with a qualified attorney for advice on your individual situation. Do not disregard professional legal advice or delay in seeking it because of something you have read on this website.</p>
            
            <p className="mt-6 font-bold text-dark-blue">By using this website, you acknowledge and agree that you have read and understand this disclaimer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
