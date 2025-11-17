import React, { useState, useMemo } from 'react';
import { Page } from '../types';
import { ExternalLinkIcon, PlusIcon, MinusIcon } from './icons/index';
import { GoogleGenAI, Type } from "@google/genai";
import { usStates } from '../data/states';
import AffiliateProductCTA from './AffiliateProductCTA';

interface ChildSupportPageProps {
  setCurrentPage: (page: Page) => void;
}

const ResourceLink: React.FC<{ href: string; title: string; description: string; }> = ({ href, title, description }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-l-4 border-primary-blue"
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

const SubPageCard: React.FC<{ title: Page, description: string, onClick: () => void, icon: React.ReactNode }> = ({ title, description, onClick, icon }) => (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full border border-gray-200/50 cursor-pointer flex flex-col">
        <div className="p-6">
            <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0 text-primary-blue">{icon}</div>
                <h3 className="text-2xl font-bold text-dark-blue font-serif">{title}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
        <div className="mt-auto p-6 pt-0">
             <div className="font-semibold text-primary-blue group-hover:text-primary-orange transition-colors duration-300 self-start">Learn More &rarr;</div>
        </div>
    </div>
);


const ChildSupportPage: React.FC<ChildSupportPageProps> = ({ setCurrentPage }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State for Child Support Calculator
  const [calculatorState, setCalculatorState] = useState({
    usState: 'California',
    fatherIncome: '',
    fatherIncomeType: 'gross',
    motherIncome: '',
    motherIncomeType: 'gross',
    fatherOvernights: '100',
    numberOfChildren: '1',
    childcareCosts: '0',
    healthInsuranceCosts: '0',
    extracurricularCosts: '0',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    estimatedAmount: number;
    payingParent: string;
    breakdown: string[];
    disclaimer: string;
  } | null>(null);

  const validateField = (name: string, value: string): string => {
    const numValue = Number(value);
    if (name === 'numberOfChildren') {
        if (!Number.isInteger(numValue) || numValue <= 0) {
            return 'Must be a positive whole number.';
        }
    } else if (['fatherIncome', 'motherIncome', 'childcareCosts', 'healthInsuranceCosts', 'extracurricularCosts'].includes(name)) {
        if (isNaN(numValue) || numValue < 0) {
            return 'Must be a positive number.';
        }
    }
    return '';
  };

  const isFormValid = useMemo(() => {
    // FIX: Add type guard to ensure value is a string before calling .trim()
    return Object.values(calculatorState).every(value => typeof value === 'string' && value.trim() !== '') && 
           Object.values(errors).every(error => error === '');
  }, [calculatorState, errors]);


  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqData = [
    {
      question: "How is child support actually calculated?",
      answer: "Most states use an 'Income Shares Model,' which estimates the total amount parents would spend on a child if they were together and splits it based on their proportional incomes. Factors like parenting time, health insurance costs, and daycare expenses heavily influence the final number."
    },
    {
      question: "What if I lose my job? Do I still have to pay?",
      answer: "You are legally obligated to pay the court-ordered amount until the order is officially modified. If you have an involuntary, significant change in income, you must immediately file a motion with the court to modify your support order. Do not just stop paying, as this will lead to arrears and penalties."
    },
    {
      question: "Does child support end automatically when my child turns 18?",
      answer: "Not always. In most states, support continues until the child is 18 or graduates high school, whichever comes later (often capped at age 19). It does not typically continue through college unless agreed upon by the parents or, in some states, ordered by the court."
    },
    {
      question: "Does the other parent have to show me receipts for how they spend the money?",
      answer: "No. The law presumes the receiving parent is using the funds for the child's living expenses (like housing, food, and clothing). They are not required to provide an accounting or receipts for how the money is spent."
    },
    {
      question: "What's the difference between child support and alimony/spousal support?",
      answer: "Child support is for the financial care of the children. Alimony (or spousal support) is a payment from one ex-spouse to the other to help them maintain their standard of living after a divorce. They are two separate legal obligations."
    },
     {
      question: "Are bonuses or overtime included in 'income' for child support calculations?",
      answer: "Yes, in most cases. 'Gross income' is typically broadly defined to include wages, salaries, bonuses, commissions, overtime, and even investment income. A history of consistent overtime or bonuses will likely be included in the calculation."
    },
  ];

  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCalculatorState(prevState => ({
        ...prevState,
        [name]: value
    }));
    const error = validateField(name, value);
    setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
    }));
  };

  const handleCalculateSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsCalculating(true);
    setCalculationError(null);
    setCalculationResult(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const { usState, fatherIncome, fatherIncomeType, motherIncome, motherIncomeType, fatherOvernights, numberOfChildren, childcareCosts, healthInsuranceCosts, extracurricularCosts } = calculatorState;

        const prompt = `Based on the publicly available child support guidelines for ${usState}, calculate an estimated monthly child support payment and provide a brief breakdown.
        Data:
        - State: ${usState}
        - Number of children: ${numberOfChildren}
        - Father's monthly income: $${fatherIncome} (${fatherIncomeType === 'gross' ? 'Gross, before tax' : 'Net, after tax'})
        - Mother's monthly income: $${motherIncome} (${motherIncomeType === 'gross' ? 'Gross, before tax' : 'Net, after tax'})
        - Number of overnight visits per year for the father: ${fatherOvernights} (out of 365)
        - Monthly work-related childcare costs: $${childcareCosts}
        - Monthly health insurance premium for children: $${healthInsuranceCosts}
        - Monthly extracurricular activities costs: $${extracurricularCosts}`;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                estimatedAmount: { type: Type.NUMBER, description: 'The estimated monthly child support payment amount, rounded to the nearest dollar.' },
                payingParent: { type: Type.STRING, description: 'The parent likely to pay, either "Father" or "Mother".' },
                breakdown: {
                    type: Type.ARRAY,
                    description: 'A brief, 2-3 item list explaining the key factors in the calculation.',
                    items: { type: Type.STRING }
                },
            }
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        });

        const resultObj = JSON.parse(response.text);
        resultObj.disclaimer = "IMPORTANT DISCLAIMER: This is a simplified estimate for informational purposes only and is not legal or financial advice. The final amount can only be determined by a court.";
        setCalculationResult(resultObj);

    } catch (err: any) {
        setCalculationError(`An error occurred during calculation. The model may not be able to process the request for the provided state or income levels. Please try again. Error: ${err.message}`);
    } finally {
        setIsCalculating(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/derek-thomson-M1jCmRxO7cY-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">Clarity on Child Support</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Demystifying your financial obligations and empowering you with information.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Child Support Calculator Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Child Support Estimator</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
                Get a high-level estimate of potential child support obligations. This tool uses state guidelines to provide an informational estimate based on income and other key factors.
              </p>
              <div className="bg-gradient-to-br from-dark-blue to-[#1e3a8a] text-white p-8 rounded-2xl shadow-xl">
                <form onSubmit={handleCalculateSupport} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="usState" className="block text-sm font-medium text-gray-300 mb-1">State</label>
                      <select id="usState" name="usState" value={calculatorState.usState} onChange={handleCalculatorChange} className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange">
                        {usStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-300 mb-1">Number of Children</label>
                      <input type="number" name="numberOfChildren" id="numberOfChildren" value={calculatorState.numberOfChildren} onChange={handleCalculatorChange} required className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 1" />
                      {errors.numberOfChildren && <p className="text-red-400 text-xs mt-1">{errors.numberOfChildren}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="fatherIncome" className="block text-sm font-medium text-gray-300 mb-1">Your Monthly Income</label>
                        <div className="flex items-center gap-2">
                           <div className="relative flex-grow">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                              <input type="number" name="fatherIncome" id="fatherIncome" value={calculatorState.fatherIncome} onChange={handleCalculatorChange} required className="w-full pl-7 pr-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 4000" />
                           </div>
                           <select name="fatherIncomeType" value={calculatorState.fatherIncomeType} onChange={handleCalculatorChange} className="flex-shrink-0 w-36 px-2 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange">
                              <option value="gross">Gross (before tax)</option>
                              <option value="net">Net (after tax)</option>
                           </select>
                        </div>
                        {errors.fatherIncome && <p className="text-red-400 text-xs mt-1">{errors.fatherIncome}</p>}
                     </div>
                     <div>
                        <label htmlFor="motherIncome" className="block text-sm font-medium text-gray-300 mb-1">Mother's Monthly Income</label>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                               <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                               <input type="number" name="motherIncome" id="motherIncome" value={calculatorState.motherIncome} onChange={handleCalculatorChange} required className="w-full pl-7 pr-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 3000" />
                            </div>
                           <select name="motherIncomeType" value={calculatorState.motherIncomeType} onChange={handleCalculatorChange} className="flex-shrink-0 w-36 px-2 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange">
                              <option value="gross">Gross (before tax)</option>
                              <option value="net">Net (after tax)</option>
                           </select>
                        </div>
                        {errors.motherIncome && <p className="text-red-400 text-xs mt-1">{errors.motherIncome}</p>}
                     </div>
                  </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div>
                        <label htmlFor="childcareCosts" className="block text-sm font-medium text-gray-300 mb-1">Monthly Childcare Costs</label>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                           <input type="number" name="childcareCosts" id="childcareCosts" value={calculatorState.childcareCosts} onChange={handleCalculatorChange} required className="w-full pl-7 pr-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 500" />
                        </div>
                         {errors.childcareCosts && <p className="text-red-400 text-xs mt-1">{errors.childcareCosts}</p>}
                     </div>
                     <div>
                        <label htmlFor="healthInsuranceCosts" className="block text-sm font-medium text-gray-300 mb-1">Health Insurance (Child)</label>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                           <input type="number" name="healthInsuranceCosts" id="healthInsuranceCosts" value={calculatorState.healthInsuranceCosts} onChange={handleCalculatorChange} required className="w-full pl-7 pr-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 200" />
                        </div>
                        {errors.healthInsuranceCosts && <p className="text-red-400 text-xs mt-1">{errors.healthInsuranceCosts}</p>}
                     </div>
                     <div>
                        <label htmlFor="extracurricularCosts" className="block text-sm font-medium text-gray-300 mb-1">Extracurricular Costs</label>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">$</span>
                           <input type="number" name="extracurricularCosts" id="extracurricularCosts" value={calculatorState.extracurricularCosts} onChange={handleCalculatorChange} required className="w-full pl-7 pr-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange" placeholder="e.g., 100" />
                        </div>
                        {errors.extracurricularCosts && <p className="text-red-400 text-xs mt-1">{errors.extracurricularCosts}</p>}
                     </div>
                  </div>
                  <div>
                    <label htmlFor="fatherOvernights" className="block text-sm font-medium text-gray-300 mb-1">Your Number of Overnights Per Year</label>
                    <input type="range" id="fatherOvernights" name="fatherOvernights" min="0" max="182" value={calculatorState.fatherOvernights} onChange={handleCalculatorChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                    <div className="text-center font-semibold text-white mt-2">{calculatorState.fatherOvernights} nights</div>
                    <p className="text-xs text-gray-400 text-center mt-1">(182 nights represents a 50/50 time split)</p>
                  </div>
                  <div className="text-center">
                    <button type="submit" disabled={isCalculating || !isFormValid} className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)] disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
                        {isCalculating ? 'Calculating...' : 'Estimate Support'}
                    </button>
                  </div>
                </form>
              </div>

              {calculationError && <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">{calculationError}</div>}
              
              {isCalculating && <div className="mt-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-blue mx-auto"></div><p className="mt-4 text-lg font-semibold text-dark-blue">Generating your estimate...</p></div>}

              {calculationResult && (
                 <div className="mt-8 bg-gradient-to-br from-dark-blue to-[#1e3a8a] p-8 rounded-2xl shadow-xl text-white">
                    <p className="text-center text-lg text-gray-300 mb-2">
                        Estimated Monthly Payment by {calculationResult.payingParent}:
                    </p>
                    <div className="text-center text-6xl font-bold text-primary-orange font-serif my-4">
                        ${calculationResult.estimatedAmount.toLocaleString()}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h4 className="text-xl font-semibold text-white font-serif mb-3 text-center">Quick Breakdown</h4>
                        <ul className="space-y-2 text-gray-300 list-disc list-inside max-w-md mx-auto">
                            {calculationResult.breakdown.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="mt-8 text-xs text-yellow-300 text-center">{calculationResult.disclaimer}</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Sub-Pages Navigation */}
          <section className="my-20 bg-light-bg -mx-6 px-6 py-16">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Explore Child Support Topics</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <SubPageCard 
                    title={Page.EnforcingSupport} 
                    description="A court order is not a suggestion. Learn about the powerful tools states use to collect unpaid child support."
                    onClick={() => setCurrentPage(Page.EnforcingSupport)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>}
                  />
                  <SubPageCard 
                    title={Page.SupportModifications} 
                    description="Life changes. Find out about the 'material and substantial change' required to modify your support payments."
                    onClick={() => setCurrentPage(Page.SupportModifications)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>}
                  />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Child Support FAQs</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg font-semibold text-dark-blue">{faq.question}</h3>
                      {openFaq === index ? <MinusIcon className="w-6 h-6 text-dark-blue flex-shrink-0" /> : <PlusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />}
                    </button>
                    <div 
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <p className="p-6 pt-0 text-gray-700">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="bg-light-bg -mx-6 px-6 py-16 md:py-24">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Child Support Resources</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Key government agencies and organizations that can provide assistance and information.</p>
                </div>
                <div className="space-y-6">
                    <ResourceLink 
                        href="https://www.acf.hhs.gov/css"
                        title="Office of Child Support Services (Federal)"
                        description="The national office that oversees state child support programs. Provides data and policy information."
                    />
                     <ResourceLink 
                        href="https://www.acf.hhs.gov/css/contact-information/state-and-tribal-child-support-agency-contacts"
                        title="State Child Support Agency Locator"
                        description="Find contact information for the official child support enforcement agency in your state or territory."
                    />
                    <ResourceLink 
                        href="https://www.fatherhood.gov/for-dads/child-support"
                        title="Fatherhood.gov on Child Support"
                        description="Information and resources specifically for fathers navigating the child support system."
                    />
                </div>
            </div>
          </section>

          {/* Affiliate CTA */}
          <section className="max-w-4xl mx-auto py-16">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue font-serif text-center mb-8">Financial Planning Tools</h3>
            <AffiliateProductCTA
              productName="My Forever DNA Paternity Test Kit"
              description="Establish paternity with certainty before child support obligations begin. AABB & CAP accredited with 99.999% accuracy. Essential for protecting your legal and financial rights."
              affiliateUrl="https://amzn.to/47GPdEa"
              imageUrl="/images/paternity-test-product.png"
              price="$99-$149"
            />
          </section>

        </div>
      </div>
    </div>
  );
};

export default ChildSupportPage;