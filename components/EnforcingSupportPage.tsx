import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { ExternalLinkIcon } from './icons';
import { pageToPath } from '../App';

const EnforcementMethod: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary-orange">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-primary-orange mt-1">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-dark-blue font-serif mb-2">{title}</h3>
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    </div>
);

const EnforcingSupportPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/amit-kumar-KTrqC-yD9zU-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/80"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF CHILD SUPPORT</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Enforcing Child Support Orders</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-white">
            A court order is not a suggestion. Learn about the powerful tools states use to collect unpaid child support and the serious consequences for non-payment.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <section className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">What Happens When Payments Are Missed?</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 mb-4">
                When a parent fails to pay court-ordered child support, the missed payments do not disappear. They accumulate as "arrears," which is essentially a debt owed to the other parent and, in some cases, to the state. This debt is legally enforceable, and state and federal governments have a wide array of powerful tools to collect it.
              </p>
               <p className="text-lg text-gray-700">
                It is crucial to understand that you cannot stop paying support because of a visitation dispute. Child support and visitation are separate legal issues. If you are being denied your court-ordered time, you must address it through the court, not by withholding payment.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">Common Enforcement Methods</h2>
              <div className="space-y-6">
                <EnforcementMethod title="Income Withholding Order (Wage Garnishment)" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}>
                  This is the most common and effective method. A court order is sent directly to the paying parent's employer, who is legally required to deduct the child support amount from their paycheck and send it to the state disbursement unit.
                </EnforcementMethod>
                <EnforcementMethod title="Interception of Tax Refunds" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>}>
                  If significant arrears are owed, the state can report the debt to the federal government, which can intercept the paying parent's federal and state tax refunds to satisfy the debt.
                </EnforcementMethod>
                 <EnforcementMethod title="License Suspension" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><line x1="3.27" y1="6.96" x2="12" y2="12.01"></line></svg>}>
                  States can suspend a variety of licenses for non-payment, including driver's licenses, professional licenses (e.g., medical, legal, contractor), and even recreational licenses (e.g., hunting and fishing).
                </EnforcementMethod>
                 <EnforcementMethod title="Contempt of Court" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>}>
                  If a parent has the ability to pay but willfully refuses, they can be held in "contempt of court." This is a serious charge that can result in fines, probation, and even jail time until a portion of the arrears is paid.
                </EnforcementMethod>
              </div>
            </section>
            
            <section className="mt-20 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-dark-blue font-serif text-center">How to Get Help</h3>
              <p className="text-gray-700 my-4 text-center">Every state has a child support enforcement agency. If you are owed child support, you can open a case with them, and they will use these tools to enforce the order on your behalf, often at no cost to you.</p>
              <div className="text-center">
                <a href="https://www.acf.hhs.gov/css/contact-information/state-and-tribal-child-support-agency-contacts" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary-orange text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                  Find Your State Agency <ExternalLinkIcon className="inline w-5 h-5 ml-2" />
                </a>
              </div>
            </section>

            <div className="mt-20 text-center">
                <button
                    onClick={() => navigate(pageToPath(Page.ChildSupport))}
                    className="font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300"
                >
                    &larr; Back to Child Support Overview
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnforcingSupportPage;
