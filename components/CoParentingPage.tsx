import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { ExternalLinkIcon } from './icons';
import { pageToPath } from '../App';

const StrategyCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-blue h-full">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-primary-blue mt-1">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-dark-blue font-serif mb-2">{title}</h3>
                <div className="text-gray-700">{children}</div>
            </div>
        </div>
    </div>
);

const CoParentingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/kelli-mcclintock-wBgAVAGjzFg-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/80"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF FATHERHOOD</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Co-Parenting Strategies</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-white">
            Give your child the gift of a peaceful and stable upbringing, even if you're no longer with their mother.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <section className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Your New Job Title: Co-Parent</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Effective co-parenting is one of the most important factors in a child's well-being after a separation. It requires you to shift your mindset from that of a former partner to a current teammate, with a shared goal: raising a happy, healthy child. It's not easy, but it is achievable with the right strategies.
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">The Pillars of Successful Co-Parenting</h2>
              <div className="space-y-6">
                <StrategyCard title="Communicate Like a Colleague" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}>
                    Keep all communication focused on the child. Avoid bringing up past relationship issues. Use the "BIFF" method: keep messages <strong>B</strong>rief, <strong>I</strong>nformative, <strong>F</strong>riendly, and <strong>F</strong>irm. Using a court-approved co-parenting app like OurFamilyWizard can create an accountable record.
                </StrategyCard>
                <StrategyCard title="Create a Detailed Parenting Plan" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>}>
                    A vague agreement leads to conflict. Your parenting plan should be your roadmap, clearly outlining schedules for weekends, holidays, and vacations. It should also detail how you'll handle decisions on healthcare, education, and extracurricular activities. The more detail, the less room for argument.
                </StrategyCard>
                <StrategyCard title="Maintain Consistency for the Child" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}>
                    Children thrive on routine and predictability. Whenever possible, align on key rules like bedtimes, screen time limits, and discipline strategies across both households. This consistency provides a crucial sense of stability for your child.
                </StrategyCard>
                 <StrategyCard title="Never Put the Child in the Middle" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>}>
                    Do not use your child as a messenger, spy, or confidant for your frustrations with the other parent. Speak positively (or at least neutrally) about your co-parent in front of your child. Your conflict is an adult issue, and burdening your child with it is damaging.
                </StrategyCard>
              </div>
            </section>
            
            <section className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-dark-blue">Recommended Tools</h3>
               <p className="text-gray-600 my-4">These apps are frequently recommended by courts to facilitate communication.</p>
               <div className="flex justify-center gap-4">
                  <a href="https://www.ourfamilywizard.com/" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-semibold hover:underline">OurFamilyWizard <ExternalLinkIcon className="inline w-4 h-4" /></a>
                  <a href="https://appclose.com/" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-semibold hover:underline">AppClose <ExternalLinkIcon className="inline w-4 h-4" /></a>
               </div>
            </section>

            <div className="mt-20 text-center">
                <button
                    onClick={() => navigate(pageToPath(Page.Fatherhood))}
                    className="font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300"
                >
                    &larr; Back to Fatherhood Overview
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoParentingPage;
