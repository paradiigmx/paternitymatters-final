import React from 'react';
import { Page } from '../types';

interface SupportModificationsPageProps {
  setCurrentPage: (page: Page) => void;
}

const StepCard: React.FC<{ number: string; title: string; children: React.ReactNode; }> = ({ number, title, children }) => (
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-dark-blue text-primary-orange font-bold text-2xl font-serif">
            {number}
        </div>
        <div className="flex-grow">
            <h4 className="text-2xl font-bold text-dark-blue font-serif mb-2">{title}</h4>
            <div className="text-gray-700">{children}</div>
        </div>
    </div>
);

const SupportModificationsPage: React.FC<SupportModificationsPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/aditya-romansa-5zp0jym2w9M-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/80"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF CHILD SUPPORT</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">Modifying Child Support</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-white">
            Life changes. Your child support order can too, but you have to follow the correct legal process.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <section className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">The "Material and Substantial Change" Standard</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 mb-4">
                A child support order is a legally binding court order. You cannot change the amount on your own, even if you and the other parent have a verbal agreement. To legally change the amount, you must file a motion with the court and prove that there has been a <strong>"material and substantial change in circumstances"</strong> since the last order was made.
              </p>
               <p className="text-lg text-gray-700">
                This is a high legal standard designed to prevent constant litigation. The change must be significant, ongoing, and usually involuntary.
              </p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">What Qualifies for a Modification?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl text-dark-blue mb-2">Common Grounds for a DECREASE:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Involuntary job loss or significant pay cut.</li>
                        <li>A long-term disability or illness that reduces your ability to earn.</li>
                        <li>A significant increase in your parenting time (overnights).</li>
                        <li>The other parent has had a significant increase in their income.</li>
                    </ul>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl text-dark-blue mb-2">Common Grounds for an INCREASE:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                         <li>You have received a major promotion or raise.</li>
                         <li>The child develops a condition requiring significant new medical expenses.</li>
                         <li>A significant increase in work-related childcare or health insurance costs.</li>
                         <li>The other parent has become unemployed or disabled.</li>
                    </ul>
                </div>
              </div>
            </section>
            
            <section className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark-blue font-serif">The Legal Process for Modification</h3>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Follow these steps carefully to protect your rights.</p>
                </div>
                <div className="space-y-12">
                    <StepCard
                        number="01"
                        title="File a Petition to Modify"
                    >
                        <p>
                          You or your attorney must file a formal legal motion with the court that issued the original order. This officially starts the process and, crucially, sets the effective date for any potential change.
                        </p>
                    </StepCard>
                    <StepCard
                        number="02"
                        title="Serve the Other Party"
                    >
                      <p>
                        The other parent must be legally served with the petition, notifying them of the lawsuit and giving them an opportunity to respond.
                      </p>
                    </StepCard>
                     <StepCard
                        number="03"
                        title="Provide Financial Disclosures"
                     >
                       <p>
                         Both parties will be required to exchange detailed financial information, including recent pay stubs, tax returns, and proof of expenses like childcare and health insurance. Honesty and accuracy are critical.
                       </p>
                     </StepCard>
                     <StepCard
                        number="04"
                        title="Attend Mediation or a Hearing"
                     >
                       <p>
                         The court may order you to mediation to try and reach an agreement. If you cannot agree, a judge will hear evidence from both sides and issue a new order based on the current circumstances and state guidelines.
                       </p>
                     </StepCard>
                </div>
            </section>

            <div className="mt-20 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">CRITICAL WARNING: Do Not Delay!</h3>
                <p className="mt-2">In almost every state, a judge can only modify child support retroactively to the date you filed your petition. If you lose your job in January but wait until June to file, you are still responsible for the full support amount for those six months. This can create thousands of dollars in debt (arrears) that cannot be erased. Act immediately when your circumstances change.</p>
            </div>

            <div className="mt-20 text-center">
                <button
                    onClick={() => setCurrentPage(Page.ChildSupport)}
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

export default SupportModificationsPage;
