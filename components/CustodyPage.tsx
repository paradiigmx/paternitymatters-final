import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { PlusIcon, MinusIcon } from './icons/index';
import { GoogleGenAI } from "@google/genai";
import { usStates } from '../data/states';
import { pageToPath } from '../App';

const CustodyTypeCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary-blue h-full">
        <h3 className="text-2xl font-bold text-dark-blue font-serif mb-3">{title}</h3>
        <p className="text-gray-700">{children}</p>
    </div>
);

const formatResponseToHtml = (text: string) => {
    let inList = false;
    const lines = text.split('\n');
    const htmlLines = lines.map(line => {
        // Handle bolding and links within any line
        let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-blue hover:underline">$1</a>');

        // Handle list items
        if (processedLine.trim().startsWith('* ')) {
            const content = processedLine.trim().substring(2);
            if (!inList) {
                inList = true;
                return `<ul><li class="mb-2">${content}</li>`; // Start of a list
            }
            return `<li class="mb-2">${content}</li>`; // Continuation of a list
        }

        // Handle the end of a list
        let htmlLine = '';
        if (inList) {
            htmlLine += '</ul>';
            inList = false;
        }

        if (processedLine.trim() === '') {
            return htmlLine; // Return the closing ul if it exists
        }

        // Handle headings and paragraphs
        if (processedLine.startsWith('### ')) {
            htmlLine += `<h3 class="text-xl font-bold text-dark-blue font-serif mt-4 mb-2">${processedLine.substring(4)}</h3>`;
        } else if (processedLine.startsWith('## ')) {
            htmlLine += `<h2 class="text-2xl font-bold text-dark-blue font-serif mt-6 mb-3">${processedLine.substring(3)}</h2>`;
        } else if (processedLine.startsWith('# ')) {
            htmlLine += `<h1 class="text-3xl font-bold text-dark-blue font-serif mt-8 mb-4">${processedLine.substring(2)}</h1>`;
        } else {
            htmlLine += `<p class="mb-4">${processedLine}</p>`;
        }
        return htmlLine;
    });

    // If the text ends with a list, close the ul tag
    if (inList) {
        htmlLines.push('</ul>');
    }
    
    return htmlLines.join('');
};


const CustodyPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // State for local resources finder
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isLocalResourcesLoading, setIsLocalResourcesLoading] = useState(false);
  const [localResourcesError, setLocalResourcesError] = useState<string | null>(null);
  const [localResourcesResults, setLocalResourcesResults] = useState<{text: string; sources: any[]} | null>(null);

  // State for state law summary feature
  const [selectedState, setSelectedState] = useState<string>('California');
  const [isLawSummaryLoading, setIsLawSummaryLoading] = useState<boolean>(false);
  const [lawSummaryError, setLawSummaryError] = useState<string | null>(null);
  const [lawSummaryResults, setLawSummaryResults] = useState<{text: string; sources: any[]} | null>(null);


  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);
  
  const faqData = [
    { question: "What is the 'Best Interest of the Child' standard?", answer: "This is the legal standard courts use to make custody decisions. It means the court's primary focus is on what arrangement will best support the child's health, safety, and well-being. Factors include each parent's ability to care for the child, the child's relationship with each parent, and the stability of the home environments." },
    { question: "Will I automatically get 50/50 custody?", answer: "Not automatically, but many states now presume that equal shared parenting is in the child's best interest, unless there's evidence to the contrary (like abuse or neglect). You must demonstrate that you are a fit, willing, and able parent to make a strong case for 50/50 custody." },
    { question: "What is a parenting plan and why do I need one?", answer: "A parenting plan is a detailed, written agreement that outlines how you will co-parent. It covers visitation schedules (including holidays and vacations), decision-making on major issues, communication guidelines, and how disputes will be resolved. It's a crucial tool for reducing conflict and providing predictability for your child." },
    { question: "At what age can my child decide who they want to live with?", answer: "While a child's preference is a factor judges may consider (especially with older children, typically 12+), the child does not get the final say. The judge's decision is always based on the child's overall best interests, which may or may not align with their wishes." },
    { question: "What is a custody evaluation?", answer: "In high-conflict cases, a court may appoint a neutral mental health professional to conduct a custody evaluation. This evaluator will interview parents and children, observe interactions, and speak with others (like teachers or therapists) to provide the court with a detailed report and recommendation on the best custody arrangement." },
    { question: "How does child support work with 50/50 custody?", answer: "Even with a 50/50 time split, one parent may still be ordered to pay child support. The calculation is based on both parents' incomes and other factors. If one parent earns significantly more, they may be required to pay support to ensure the child has a similar standard of living in both homes." },
  ];

  const fetchCustodyResources = async (userLocation: string | { latitude: number; longitude: number; }) => {
    setIsLocalResourcesLoading(true);
    setLocalResourcesError(null);
    setLocalResourcesResults(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const prompt = `Find local resources for a father seeking child custody near ${typeof userLocation === 'string' ? userLocation : 'the provided coordinates'}. Include: 1. Top-rated family law attorneys or firms specializing in fathers' rights. 2. Certified child custody mediators. 3. Family court or courthouse locations. Provide names, addresses, and a brief description for each, formatted in markdown.`;
  
      const config: any = { tools: [{ googleMaps: {} }] };
  
      if (typeof userLocation !== 'string') {
        config.toolConfig = { retrievalConfig: { latLng: { latitude: userLocation.latitude, longitude: userLocation.longitude } } }
      }
  
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, config: config });
  
      setLocalResourcesResults({ text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] });
  
    } catch (err: any) {
      setLocalResourcesError(`An error occurred while fetching resources. Please try again. Error: ${err.message}`);
    } finally {
      setIsLocalResourcesLoading(false);
      setIsLocating(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocation('');
    navigator.geolocation.getCurrentPosition(
      (position) => fetchCustodyResources({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      (err) => {
        setLocalResourcesError(`Error getting location: ${err.message}. Please enter your location manually.`);
        setIsLocating(false);
      }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;
    fetchCustodyResources(location);
  };

  const handleGetLawSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) return;

    setIsLawSummaryLoading(true);
    setLawSummaryError(null);
    setLawSummaryResults(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const prompt = `Provide a concise summary of child custody laws in ${selectedState}. Include:
1.  A general overview of the state's approach (e.g., preference for joint custody).
2.  Links to or summaries of key statutes (e.g., the specific laws governing custody decisions).
3.  A brief mention of any recent, significant case law or legislative trends related to custody in ${selectedState}.
Format the output in markdown.`;
  
      const config = { tools: [{ googleSearch: {} }] };
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config,
      });
  
      setLawSummaryResults({
        text: response.text,
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
      });
  
    } catch (err: any) {
      setLawSummaryError(`An error occurred while fetching the summary. Please try again. Error: ${err.message}`);
    } finally {
      setIsLawSummaryLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/lawrence-crayton-hOiDpAZ8Pok-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">Navigating Child Custody</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">Fighting for your time with your child is the most important battle you'll ever face. We're here to help you prepare.</p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {/* Types of Custody */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Understanding Custody Types</h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">Custody is divided into two main categories: Legal and Physical. Both can be either "Sole" or "Joint."</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CustodyTypeCard title="Legal Custody">The right to make major decisions about your child’s life, including education, healthcare, and religious upbringing.</CustodyTypeCard>
              <CustodyTypeCard title="Physical Custody">Determines where the child lives primarily. This is also known as "parenting time" or "visitation."</CustodyTypeCard>
              <CustodyTypeCard title="Joint Custody">Both parents share the responsibility. Joint Legal is very common (shared decision-making), as is Joint Physical (child spends significant time with both parents).</CustodyTypeCard>
              <CustodyTypeCard title="Sole Custody">One parent holds all the rights and responsibilities. This is rare and usually only ordered in cases involving abuse, neglect, or substance abuse issues.</CustodyTypeCard>
            </div>
          </section>

          {/* State-Specific Laws Section */}
          <section className="my-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">State-Specific Custody Laws</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
                Custody laws vary significantly by state. Select your state to get an AI-powered summary of key statutes and recent case law, grounded by Google Search.
              </p>

              <div className="bg-light-bg p-8 rounded-xl shadow-inner border border-gray-200">
                <form onSubmit={handleGetLawSummary} className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:flex-grow">
                    <label htmlFor="state-select" className="sr-only">Select a state</label>
                    <select
                      id="state-select"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-orange"
                      disabled={isLawSummaryLoading}
                    >
                      {usStates.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isLawSummaryLoading}
                    className="w-full sm:w-auto flex-shrink-0 bg-dark-blue hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300 disabled:bg-gray-400"
                  >
                    {isLawSummaryLoading ? 'Loading...' : 'Get Summary'}
                  </button>
                </form>
              </div>

              {lawSummaryError && <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl" role="alert">{lawSummaryError}</div>}
              
              {isLawSummaryLoading && (
                <div className="mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-blue mx-auto"></div>
                        <p className="mt-4 text-lg font-semibold text-dark-blue">Searching legal databases for {selectedState}...</p>
                    </div>
                </div>
              )}

              {lawSummaryResults && (
                <div className="mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-dark-blue font-serif mb-4">Custody Law Summary: {selectedState}</h3>
                  <div className="prose lg:prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: formatResponseToHtml(lawSummaryResults.text) }}></div>
                  
                  {lawSummaryResults.sources.filter(s => s.web).length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-xl font-semibold text-dark-blue mb-4 font-serif">Sources from Google Search:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {lawSummaryResults.sources.filter(s => s.web).map((source, index) => (
                          <li key={index}>
                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline break-words">
                              {source.web.title || 'View Source'}
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

          {/* Local Resources Finder */}
          <section className="mb-20 bg-light-bg -mx-6 px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Find Local Custody Resources</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
                Find family law attorneys, mediators, and courthouses in your area. Our AI-powered tool uses Google Maps to provide relevant, up-to-date local information.
              </p>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your City, State or Zip Code" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-orange" disabled={isLocalResourcesLoading || isLocating} />
                  <button type="submit" disabled={isLocalResourcesLoading || isLocating || !location} className="bg-dark-blue hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 disabled:bg-gray-400">
                    {isLocalResourcesLoading && !isLocating ? 'Searching...' : 'Search'}
                  </button>
                </form>
                <div className="text-center my-4 text-gray-500">OR</div>
                <button onClick={handleUseCurrentLocation} disabled={isLocalResourcesLoading || isLocating} className="w-full bg-primary-orange hover:opacity-95 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center disabled:bg-yellow-200">
                  {isLocating ? 'Getting Location...' : 'Use My Current Location'}
                </button>
              </div>

              {localResourcesError && <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl" role="alert">{localResourcesError}</div>}
              {isLocalResourcesLoading && <div className="mt-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dark-blue mx-auto"></div><p className="mt-4 text-lg font-semibold text-dark-blue">Searching for local resources...</p></div>}
              {localResourcesResults && (
                <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-dark-blue font-serif mb-4">Your Local Resources</h3>
                  <div className="prose lg:prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: formatResponseToHtml(localResourcesResults.text) }}></div>
                  {localResourcesResults.sources.filter(s => s.maps).length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-xl font-semibold text-dark-blue mb-4 font-serif">Sources from Google Maps:</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {localResourcesResults.sources.filter(s => s.maps).map((source, index) => (
                          <li key={index}><a href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline break-words">{source.maps.title || 'View on Google Maps'}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl">
                    <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left p-6 focus:outline-none" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}>
                      <h3 className="text-lg font-semibold text-dark-blue">{faq.question}</h3>
                      {openFaq === index ? <MinusIcon className="w-6 h-6 text-dark-blue flex-shrink-0" /> : <PlusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />}
                    </button>
                    <div id={`faq-answer-${index}`} className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                      <p className="p-6 pt-0 text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CustodyPage;
