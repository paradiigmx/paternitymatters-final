import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { ExternalLinkIcon } from './icons';
import { pageToPath } from '../App';

const FraudStatCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({ title, description, imageUrl }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center h-full flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover"/>
        <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-dark-blue font-serif mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const StepCard: React.FC<{ number: string; title: string; children: React.ReactNode; image?: string }> = ({ number, title, children, image }) => (
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-dark-blue text-primary-orange font-bold text-2xl font-serif">
            {number}
        </div>
        <div className="flex-grow">
            <h4 className="text-2xl font-bold text-dark-blue font-serif mb-2">{title}</h4>
            <div className="text-gray-700">{children}</div>
            {image && <img src={image} alt={title} className="mt-4 rounded-xl shadow-md w-full max-w-sm" />}
        </div>
    </div>
);

const ResourceLink: React.FC<{ href: string; title: string; description: string; }> = ({ href, title, description }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-l-4 border-primary-blue"
    >
        <div className="flex justify-between items-start">
            <div>
                <h4 className="text-xl font-bold text-dark-blue">{title}</h4>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
            <ExternalLinkIcon className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 mt-1" />
        </div>
    </a>
);


const PaternityFraudPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light-bg">
       {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/topsphere-media-0mRerwRVqVA-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/80"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF PATERNITY</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Understanding Paternity Fraud</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-white">
            When the truth is concealed, the consequences can be devastating. Know the signs and your rights.
          </p>
        </div>
      </section>
       <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">What is Paternity Fraud?</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
                  Paternity fraud occurs when a mother knowingly misidentifies a man as the biological father of her child, leading him to assume the legal and financial responsibilities of fatherhood. This is a profound betrayal with devastating emotional and financial consequences for the man, the child, and the true biological father.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <FraudStatCard 
                title="Emotional Toll" 
                description="Men who discover they are not the biological father often experience feelings of betrayal, grief, depression, and a loss of identity." 
                imageUrl="/images/glodi-miessi-TbmwX1gvhDg-unsplash.jpg"
              />
              <FraudStatCard 
                title="Financial Ruin" 
                description="Years of child support payments can lead to significant financial hardship, with limited legal recourse for reimbursement." 
                imageUrl="/images/terricks-noah-n9R0MN3XGvY-unsplash.jpg"
              />
              <FraudStatCard 
                title="Child's Well-being" 
                description="The child is denied a relationship with their biological father and access to their true medical history and heritage." 
                imageUrl="/images/reynardo-etenia-wongso-EHmoH8aCQqU-unsplash (1).jpg"
              />
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark-blue font-serif">Suspect Paternity Fraud? What to Do Next.</h3>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">If you have doubts, taking measured, informed steps is critical.</p>
                </div>
                <div className="space-y-12 max-w-4xl mx-auto">
                    <StepCard
                        number="01"
                        title="Seek Legal Counsel Immediately"
                    >
                        <p>
                          Do not confront anyone or stop paying court-ordered support without legal advice. An attorney specializing in family law can explain your state's specific laws, statutes of limitation, and your legal options. See our <button onClick={() => navigate(pageToPath(Page.Resources))} className="font-semibold text-primary-blue hover:underline">Resources page</button> for help.
                        </p>
                    </StepCard>
                    <StepCard
                        number="02"
                        title="Pursue a Legal DNA Test"
                        image="/images/mjh-shikder--bJj_81Zois-unsplash.jpg"
                    >
                      <p>
                        An at-home paternity test is not admissible in court. You must obtain a legally-admissible test from an AABB-accredited laboratory. <button onClick={() => navigate(pageToPath(Page.PaternityTesting))} className="font-semibold text-primary-blue hover:underline">Learn more about the legal testing process</button>.
                      </p>
                    </StepCard>
                     <StepCard
                        number="03"
                        title="File a Petition to Disestablish Paternity"
                     >
                       <p>
                         If the DNA test confirms you are not the biological father, your attorney can file a motion with the court to be legally removed as the father, which can terminate future child support obligations. Success is not guaranteed and depends heavily on your state's laws.
                       </p>
                     </StepCard>
                </div>
            </div>

            <div className="mt-20">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark-blue font-serif">Paternity Fraud Resources</h3>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Organizations and information to help you navigate this difficult situation.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                    <ResourceLink 
                        href="https://www.nationalparentsorganization.org/paternity-fraud"
                        title="National Parents Organization on Paternity Fraud"
                        description="Information and advocacy regarding the injustice of paternity fraud."
                    />
                     <ResourceLink 
                        href="https://www.dadsdivorce.com/articles/paternity-fraud-what-are-your-rights.html"
                        title="DadsDivorce.com - Paternity Fraud Articles"
                        description="A collection of articles discussing the legal rights of men who are victims of paternity fraud."
                    />
                    <ResourceLink 
                        href="https://www.dnacenter.com/paternity-testing/legal-paternity-test/"
                        title="DNA Diagnostics Center (DDC)"
                        description="A leading provider of AABB-accredited legal paternity tests that are admissible in court."
                    />
                </div>
            </div>
             <div className="mt-20 text-center">
                <button
                    onClick={() => navigate(pageToPath(Page.Paternity))}
                    className="font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300"
                >
                    &larr; Back to Paternity Overview
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaternityFraudPage;
