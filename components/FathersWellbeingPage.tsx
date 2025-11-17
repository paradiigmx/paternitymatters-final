import React from 'react';
import { Page } from '../types';

interface FathersWellbeingPageProps {
  setCurrentPage: (page: Page) => void;
}

const WellbeingPillar: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
        <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue text-white">{icon}</div>
            <h3 className="text-xl font-bold text-dark-blue font-serif">{title}</h3>
        </div>
        <p className="text-gray-700">{children}</p>
    </div>
);

const FathersWellbeingPage: React.FC<FathersWellbeingPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/dragos-gontariu-mBqd8S44Mt8-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF FATHERHOOD</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Father's Well-being</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            You can't pour from an empty cup. Taking care of your own mental and physical health is essential to being the father your child needs.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <section className="mb-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">The Overlooked Priority: Your Health</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700">
                In the midst of legal battles and the demands of parenting, it's easy for fathers to neglect their own well-being. But chronic stress, anxiety, and depression not only harm you—they impact your ability to be a patient, present, and effective parent. Prioritizing your health isn't selfish; it's a core parenting responsibility.
              </p>
            </section>

            <section className="mb-20">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">A Practical Toolkit for Well-being</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <WellbeingPillar title="Build Your Support System" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}>
                  Isolation is the enemy. You need a trusted circle. This could be close friends, family members, a men's group, or a therapist. Find people you can talk to honestly about your struggles without fear of judgment. Don't carry the weight alone.
                </WellbeingPillar>
                <WellbeingPillar title="Prioritize Physical Health" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}>
                  Mental and physical health are deeply connected. Make time for regular exercise, even just a 20-minute walk. Eat nutritious food to fuel your body and mind. Prioritize sleep; a rested mind makes better decisions and manages stress more effectively.
                </WellbeingPillar>
                <WellbeingPillar title="Practice Mindfulness & Stress Reduction" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}>
                  When you feel overwhelmed, focus on your breath. Simple breathing exercises can calm your nervous system in minutes. Apps like Calm or Headspace can be great tools. Find a healthy outlet for stress, whether it's a hobby, sports, or just listening to music.
                </WellbeingPillar>
                <WellbeingPillar title="Know When to Seek Professional Help" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}>
                  There is immense strength in asking for help. If feelings of sadness, anger, or hopelessness persist, it might be time to see a therapist. Paternal Postnatal Depression (PPND) is real. A professional can provide you with tools to navigate these challenges effectively.
                </WellbeingPillar>
              </div>
            </section>
            
            <section className="mt-20 text-center bg-light-bg -mx-6 px-6 py-12 rounded-lg">
                <h3 className="text-2xl font-bold text-dark-blue">Remember: Your Child Needs You Healthy</h3>
                <p className="text-gray-700 my-4 max-w-2xl mx-auto">The best thing you can do for your child is to model healthy emotional and physical habits. By taking care of yourself, you're not just improving your own life—you're ensuring you can be the resilient, stable, and loving father they deserve for years to come.</p>
            </section>

            <div className="mt-20 text-center">
                <button
                    onClick={() => setCurrentPage(Page.Fatherhood)}
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

export default FathersWellbeingPage;
