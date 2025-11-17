

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLinkIcon, PlusIcon, MinusIcon, ChevronRightIcon } from './icons/index';
import { Page } from '../types';
import { GoogleGenAI } from "@google/genai";
import PaternityTimeline from './PaternityTimeline';
import DueDateCalculator from './DueDateCalculator';
import { pageToPath } from '../App';

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


const PaternityPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{text: string; sources: any[]} | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqData = [
    {
      question: "Do I have to pay child support if I'm not on the birth certificate?",
      answer: "Potentially, yes. A birth certificate is not the final word on legal paternity. If a court establishes you as the legal father (usually through a DNA test), you will be obligated to pay child support, regardless of what the birth certificate says."
    },
    {
      question: "What happens if I sign the Voluntary Acknowledgment of Paternity (AOP) and later find out I'm not the father?",
      answer: "This is a serious situation. Once you sign an AOP, there's a very short window (often 60 days, but it varies by state) to rescind it. After that period, overturning it is extremely difficult and requires proving fraud, duress, or a material mistake of fact in court. This is why it's critical to be 100% certain before signing."
    },
    {
      question: "Can a mother refuse a DNA test?",
      answer: "A mother can refuse to voluntarily submit herself or the child to a DNA test. However, if a paternity action has been filed in court, a judge can order all parties to participate in genetic testing. Refusing a court order can have serious legal consequences for her."
    },
    {
      question: "Do I have rights to see my child if we were never married?",
      answer: "Yes, but only after paternity is legally established. An unmarried father has no automatic rights to custody or visitation. Once you are declared the legal father by the court or through a signed AOP, you can petition the court for a custody and visitation schedule. Your marital status does not determine your parental rights once paternity is established."
    },
  ];

  const fetchPaternityResources = async (userLocation: string | { latitude: number; longitude: number; }) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const prompt = `Find and list local resources for a father dealing with paternity issues near ${typeof userLocation === 'string' ? userLocation : 'the provided coordinates'}. Include the following types of places: 1. Family law courts or courthouses. 2. Legal aid societies that offer free or low-cost legal help. 3. AABB-accredited DNA testing centers. Provide names, addresses, and a brief description for each, formatted in markdown.`;
  
      const config: any = {
        tools: [{ googleMaps: {} }],
      };
  
      if (typeof userLocation !== 'string') {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }
          }
        }
      }
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
      });
  
      const text = response.text;
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      setResults({ text, sources });
  
    } catch (err: any) {
      setError(`An error occurred while fetching resources. Please try again. Error: ${err.message}`);
    } finally {
      setLoading(false);
      setIsLocating(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocation('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchPaternityResources({ latitude, longitude });
        },
        (err) => {
          setError(`Error getting location: ${err.message}. Please enter your location manually.`);
          setIsLocating(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Please enter your location manually.");
      setIsLocating(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    fetchPaternityResources(location);
  };

  const formatResponseToHtml = (text: string) => {
      let inList = false;
      const lines = text.split('\n');
      const htmlLines = lines.map(line => {
          if (line.trim().startsWith('* ')) {
              const content = line.trim().substring(2);
              if (!inList) {
                  inList = true;
                  return `<ul><li>${content}</li>`;
              }
              return `<li>${content}</li>`;
          }
          
          let htmlLine = '';
          if (inList) {
              htmlLine += '</ul>';
              inList = false;
          }

          if (line.trim() === '') return htmlLine;

          if (line.startsWith('### ')) {
              htmlLine += `<h3 class="text-xl font-bold text-dark-blue font-serif mt-4 mb-2">${line.substring(4)}</h3>`;
          } else if (line.startsWith('## ')) {
              htmlLine += `<h2 class="text-2xl font-bold text-dark-blue font-serif mt-6 mb-3">${line.substring(3)}</h2>`;
          } else if (line.startsWith('# ')) {
              htmlLine += `<h1 class="text-3xl font-bold text-dark-blue font-serif mt-8 mb-4">${line.substring(2)}</h1>`;
          } else {
              htmlLine += `<p class="mb-2">${line}</p>`;
          }
          return htmlLine;
      });

      if (inList) {
          htmlLines.push('</ul>');
      }
      
      return htmlLines.join('');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/lawrence-crayton-bZf2oInAGWk-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">Understanding Paternity</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Establishing legal fatherhood is the first and most critical step to securing your parental rights.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* What is Paternity? */}
          <section className="mb-20 max-w-4xl mx-auto">
            <h2 id="what-it-matters" className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">What is Paternity and Why It Matters</h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
            <p className="text-lg text-gray-700 mb-4">
              Paternity means legal fatherhood. When paternity is established, a man gains both the rights and responsibilities of a parent. For unmarried fathers, this is not automatic and requires taking specific legal steps.
            </p>
            <div className="mt-8 grid md:grid-cols-2 gap-8 text-gray-700">
                <div className="bg-light-bg p-6 rounded-xl">
                    <h3 className="font-serif font-bold text-xl text-dark-blue mb-2">Rights You Gain:</h3>
                    <ul className="list-disc list-inside space-y-2 text-primary-green">
                        <li className="text-gray-700">The right to seek custody or visitation (parenting time).</li>
                        <li className="text-gray-700">The right to make decisions about your child's health, education, and welfare.</li>
                        <li className="text-gray-700">The right for your child to inherit from you.</li>
                        <li className="text-gray-700">The right for your name to be on the birth certificate.</li>
                    </ul>
                </div>
                <div className="bg-light-bg p-6 rounded-xl">
                    <h3 className="font-serif font-bold text-xl text-dark-blue mb-2">Responsibilities You Assume:</h3>
                     <ul className="list-disc list-inside space-y-2">
                        <li>The legal obligation to provide financial support (child support).</li>
                        <li>The duty to care for and protect your child.</li>
                        <li>The responsibility to share medical history information.</li>
                    </ul>
                </div>
            </div>
          </section>

          {/* Sub-Pages Navigation */}
          <section className="my-20">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Explore Paternity Topics</h2>
             <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
             <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                <SubPageCard 
                  title={Page.PaternityTesting} 
                  description="Understand the difference between at-home and legal DNA tests and why getting the right one is crucial."
                  onClick={() => navigate(pageToPath(Page.PaternityTesting))}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                />
                <SubPageCard 
                  title={Page.PaternityFraud} 
                  description="Learn the signs of paternity fraud, its devastating impact, and the legal steps you can take if you are a victim."
                  onClick={() => navigate(pageToPath(Page.PaternityFraud))}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
                />
                <SubPageCard 
                  title={Page.LegalDocuments} 
                  description="Get a checklist of the essential documents you need to gather to build a strong, evidence-based legal case."
                  onClick={() => navigate(pageToPath(Page.LegalDocuments))}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>}
                />
             </div>
          </section>

          {/* Due Date Calculator Section */}
          <section className="my-20 bg-light-bg -mx-6 px-6 py-16">
            <div className="container mx-auto max-w-4xl">
              <DueDateCalculator />
            </div>
          </section>

          {/* The Paternity Case Timeline */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 id="timeline" className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">The Paternity Case Timeline: A Step-by-Step Guide</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 text-center mb-12">
                Navigating a paternity case can feel overwhelming. This interactive timeline breaks down the typical legal process into key stages, so you know what to expect on your journey.
              </p>
              <PaternityTimeline />
            </div>
          </section>
          
          {/* Link to Child Support Page */}
          <section className="mt-20 bg-gradient-to-br from-dark-blue to-[#1e3a8a] text-white -mx-6 px-6 py-16 md:py-20 text-center rounded-2xl">
              <div className="container mx-auto">
                  <h2 className="text-3xl font-bold font-serif mb-4">Estimate Your Child Support</h2>
                  <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                      Understanding potential financial obligations is a key part of paternity. Use our detailed, state-specific calculator to get an estimate based on income and parenting time.
                  </p>
                  <button
                      onClick={() => navigate(pageToPath(Page.ChildSupport))}
                      className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]"
                  >
                      Go to Child Support Calculator
                  </button>
              </div>
          </section>
          
          {/* Beyond Paternity Section */}
           <section className="my-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Beyond Paternity: Your Fatherhood Journey</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 mb-12">
                Establishing paternity is the legal key to your rights, but the true reward is building a strong, lifelong bond with your child. An involved father is crucial for a child's development, confidence, and happiness. Explore our resources to help you be the best dad you can be.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div 
                  onClick={() => navigate(pageToPath(Page.NewDads))}
                  className="bg-light-bg p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
                >
                  <h3 className="text-2xl font-bold text-dark-blue font-serif mb-3">Guide for New Dads</h3>
                  <p className="text-gray-600 mb-4">Are you a new or expecting father? Get practical tips on bonding, supporting your partner, and navigating the first year.</p>
                  <span className="font-semibold text-primary-blue group-hover:text-primary-orange transition-colors duration-300">
                    View the Guide &rarr;
                  </span>
                </div>
                <div 
                  onClick={() => navigate(pageToPath(Page.Blog))}
                  className="bg-light-bg p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
                >
                  <h3 className="text-2xl font-bold text-dark-blue font-serif mb-3">Fatherhood Blog</h3>
                  <p className="text-gray-600 mb-4">Read articles on co-parenting strategies, well-being tips for dads, and stories from fathers who've been in your shoes.</p>
                  <span className="font-semibold text-primary-blue group-hover:text-primary-orange transition-colors duration-300">
                    Read Articles &rarr;
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Frequently Asked Questions</h2>
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

          {/* Find Local Resources Section */}
          <section className="mt-20">
            <div className="max-w-4xl mx-auto">
              <h2 id="local-resources" className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Find Local Paternity Resources</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
                Get up-to-date, location-specific information about family courts, legal aid, and DNA testing centers near you. Powered by Google Maps.
              </p>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your City, State or Zip Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-orange"
                    disabled={loading || isLocating}
                  />
                  <button
                    type="submit"
                    disabled={loading || isLocating || !location}
                    className="bg-dark-blue hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 disabled:bg-gray-400"
                  >
                    {loading && !isLocating ? 'Searching...' : 'Search'}
                  </button>
                </form>
                <div className="text-center my-4 text-gray-500">OR</div>
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={loading || isLocating}
                  className="w-full bg-primary-orange hover:opacity-95 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center disabled:bg-yellow-200"
                >
                  {isLocating ? 'Getting Location...' : 'Use My Current Location'}
                </button>
              </div>

              {error && <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl" role="alert">{error}</div>}
              
              {loading && <div className="mt-8 text-center text-lg font-semibold text-dark-blue">Searching for local resources...</div>}

              {results && (
                <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-dark-blue font-serif mb-4">Your Local Resources</h3>
                  <div className="prose lg:prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: formatResponseToHtml(results.text) }}></div>
                  
                  {results.sources.filter(s => s.maps).length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-xl font-semibold text-dark-blue mb-4 font-serif">Sources from Google Maps:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {results.sources.filter(s => s.maps).map((source, index) => (
                          <li key={index}>
                            <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline break-words">
                              {source.maps.title || 'View on Google Maps'}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PaternityPage;
