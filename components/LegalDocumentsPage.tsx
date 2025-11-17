import React from 'react';
import { Page } from '../types';

interface LegalDocumentsPageProps {
  setCurrentPage: (page: Page) => void;
}

const DocItem: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary-blue">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-primary-blue mt-1">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-dark-blue font-serif mb-2">{title}</h3>
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    </div>
);

const LegalDocumentsPage: React.FC<LegalDocumentsPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/jernej-graj-JoATK-EDqu8-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF PATERNITY</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Document Your Case: A Father's Checklist</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            In family law, strong documentation is your most powerful tool. Get organized to build a compelling case.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <section className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Why Documentation Matters</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 mb-4 text-center">
                When it comes to establishing paternity and fighting for custody, your word alone is not enough. Courts rely on evidence. A well-documented case demonstrates your commitment, involvement, and stability as a parent. It transforms subjective claims into objective facts. Start gathering these documents immediately.
              </p>
            </section>

            {/* Document Checklist */}
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">The Essential Documents Checklist</h2>
              <div className="space-y-6">
                <DocItem title="Legal Paternity Documents" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}>
                  These are the foundational documents proving your legal relationship to the child.
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Birth Certificate:</strong> Obtain a certified copy.</li>
                    <li><strong>Voluntary Acknowledgment of Paternity (AOP):</strong> A copy of the signed and filed form.</li>
                    <li><strong>DNA Test Results:</strong> The full report from a court-admissible, AABB-accredited lab.</li>
                    <li><strong>Court Orders:</strong> Any existing temporary or final orders related to paternity, custody, or support.</li>
                  </ul>
                </DocItem>
                <DocItem title="Evidence of Your Parental Role" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}>
                  Show the court you've been an active and involved father from the beginning.
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Photos and Videos:</strong> Dated pictures of you with the child (at birth, birthdays, holidays, everyday activities).</li>
                    <li><strong>Records of Involvement:</strong> Emails with teachers, doctor's visit summaries with your name, proof of attendance at school events.</li>
                    <li><strong>Witness List:</strong> A list of potential witnesses (family, friends, teachers) who can testify to your bond with your child.</li>
                  </ul>
                </DocItem>
                <DocItem title="Communication Records" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}>
                  All communication with the other parent should be documented and preserved.
                   <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Text Messages & Emails:</strong> Print out or take screenshots of all communication. Never delete anything.</li>
                    <li><strong>Co-Parenting App Logs:</strong> If you use an app like OurFamilyWizard, its records are admissible in court.</li>
                    <li><strong>Personal Journal:</strong> Keep a log of every interaction, missed visit, or significant event. Note date, time, and what happened.</li>
                  </ul>
                </DocItem>
                <DocItem title="Financial Records" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}>
                  Be prepared to demonstrate your financial stability and contributions.
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Pay Stubs & Tax Returns:</strong> Typically, the last 2-3 years are required.</li>
                    <li><strong>Proof of Support:</strong> Receipts for diapers, formula, clothes, medical bills, or any financial support you've provided for the child.</li>
                    <li><strong>Proof of Health Insurance:</strong> Documents showing you have or can provide health insurance for the child.</li>
                  </ul>
                </DocItem>
              </div>
            </section>
            
            <div className="mt-20 text-center">
                <button
                    onClick={() => setCurrentPage(Page.Paternity)}
                    className="font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300"
                >
                    &larr; Back to Paternity Overview
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocumentsPage;