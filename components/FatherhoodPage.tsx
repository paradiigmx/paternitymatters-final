import React from 'react';
import { Page } from '../types';
import { ChevronRightIcon, ExternalLinkIcon } from './icons';

interface FatherhoodPageProps {
  setCurrentPage: (page: Page) => void;
}

const AgeStageCard: React.FC<{ title: string, subtitle: string, children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
    <h4 className="text-xl font-bold text-dark-blue font-serif">{title}</h4>
    <p className="font-semibold text-primary-blue mb-3">{subtitle}</p>
    <div className="text-gray-700 flex-grow">{children}</div>
  </div>
);

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


const FatherhoodPage: React.FC<FatherhoodPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/lawrence-crayton-KXOaNSU63NE-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">The Journey of Fatherhood</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Beyond the legal battles, being a present, engaged, and loving father is the ultimate goal.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">

          {/* The Father's Impact */}
          <section className="mb-20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif mb-4">The Irreplaceable Impact of a Dad</h2>
                <p className="text-gray-700 mb-4">
                  An involved father is a cornerstone in a child's development. Your presence, guidance, and love contribute to their emotional intelligence, cognitive abilities, and overall success in life. You are not just a provider or a disciplinarian; you are a teacher, a protector, and a role model.
                </p>
                <p className="text-gray-700">
                  This section of our site is dedicated to helping you be the best father you can be, offering practical advice and resources for every stage of your child's life.
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="/images/christian-bowen-OJOE587CWuE-unsplash.jpg" alt="Father reading a book to his child" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
          </section>

          {/* Sub-Pages Navigation */}
          <section className="my-20 bg-light-bg -mx-6 px-6 py-16">
             <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Explore Fatherhood Topics</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <SubPageCard 
                    title={Page.NewDads} 
                    description="Expecting or have a newborn? Get our survival guide for the first year, from bonding tips to supporting your partner."
                    onClick={() => setCurrentPage(Page.NewDads)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>}
                  />
                  <SubPageCard 
                    title={Page.CoParenting} 
                    description="Learn strategies for effective communication, boundary-setting, and conflict resolution with your child's other parent."
                    onClick={() => setCurrentPage(Page.CoParenting)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                  />
                  <SubPageCard 
                    title={Page.FathersWellbeing} 
                    description="Your health matters. Find resources for managing stress, building a support system, and prioritizing your mental well-being."
                    onClick={() => setCurrentPage(Page.FathersWellbeing)}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>}
                  />
              </div>
            </div>
          </section>
          
          {/* Fatherhood Through the Ages */}
          <section className="my-20 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Fatherhood Through the Ages</h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
                Your role as a father evolves as your child grows. Here are key areas to focus on during different stages of their life.
            </p>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <AgeStageCard title="Toddlers (1-3)" subtitle="The Explorer">
                  <ul className="list-disc list-inside space-y-3 text-left">
                      <li><strong>Emotional Support:</strong> Be their 'safe base.' When they have a tantrum, it's a big feeling, not bad behavior. Get on their level and say, "You're feeling very angry." This validates their emotions and teaches them to name them.</li>
                      <li><strong>Education:</strong> Their brain is a sponge. Read to them daily, even for a few minutes. Narrate your day ("Now Daddy is washing the dishes.") to build their vocabulary.</li>
                      <li><strong>Discipline:</strong> This is about teaching, not punishment. Use gentle redirection. Instead of "No, don't hit," try "We use gentle hands," and show them how. Keep rules simple and consistent.</li>
                  </ul>
                </AgeStageCard>
                <AgeStageCard title="School-Age (4-11)" subtitle="The Builder">
                    <ul className="list-disc list-inside space-y-3 text-left">
                        <li><strong>Emotional Support:</strong> Listen to their stories about friends and school. It might seem small to you, but it's their whole world. Celebrate their effort and resilience, not just their wins.</li>
                        <li><strong>Education:</strong> Show interest in their schoolwork. Create a consistent, screen-free homework space. Help them find a passion, whether it's sports, music, or art. This builds confidence far beyond the classroom.</li>
                        <li><strong>Discipline:</strong> Introduce natural consequences. "If you don't put your bike away, it might get rusty in the rain." This teaches responsibility instead of just compliance. Be firm but fair with boundaries.</li>
                    </ul>
                </AgeStageCard>
                <AgeStageCard title="Teenagers (12-18)" subtitle="The Guide">
                    <ul className="list-disc list-inside space-y-3 text-left">
                        <li><strong>Emotional Support:</strong> Shift from manager to consultant. Listen more than you talk. Ask open-ended questions about their life. Respect their growing need for independence while being a stable, non-judgmental presence they can always come back to.</li>
                        <li><strong>Education:</strong> Help them see the big picture. Talk about future goals, careers, and financial literacy. Help them manage their time and stress, but let them take the lead on their assignments.</li>
                        <li><strong>Discipline:</strong> This is about collaboration and trust. Discuss rules and consequences together. When they make mistakes (and they will), focus on the lesson learned rather than just the punishment. Hold them accountable, but also offer your unwavering support.</li>
                    </ul>
                </AgeStageCard>
            </div>
          </section>

           {/* Effective Co-Parenting */}
          <section className="my-20 bg-light-bg -mx-6 px-6 py-16">
              <div className="container mx-auto max-w-4xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Effective Co-Parenting Strategies</h2>
                  <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
                  <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
                      Even if you are not with the mother, a stable and respectful co-parenting relationship is one of the greatest gifts you can give your child.
                  </p>
                  <ul className="space-y-4 text-gray-700 list-disc list-inside">
                      <li><strong>Communicate Like a Business:</strong> Keep conversations with your co-parent focused on the child. Use tools like <a href="https://www.ourfamilywizard.com/" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-semibold hover:underline">co-parenting apps</a> to keep a written record and avoid emotional, in-the-moment arguments.</li>
                      <li><strong>Present a United Front:</strong> Never speak negatively about the other parent in front of your child. Support their co-parent's authority and maintain consistent rules across both households whenever possible.</li>
                      <li><strong>Be Flexible:</strong> Life happens. Be willing to compromise on scheduling when you can. A little flexibility goes a long way in building goodwill and reducing conflict.</li>
                      <li><strong>Focus on the Child:</strong> Every decision should be filtered through the question: "What is in my child's best interest?" This simple principle can help you navigate even the most difficult disagreements.</li>
                  </ul>
              </div>
          </section>

          {/* Essential Resources */}
           <section className="my-20 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Essential Resources for Fathers</h2>
                <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
                <div className="space-y-6">
                    <ResourceLink 
                        href="https://www.fatherhood.gov"
                        title="Fatherhood.gov"
                        description="A U.S. government-wide effort to promote responsible fatherhood, with resources on parenting, relationships, and financial stability."
                    />
                     <ResourceLink 
                        href="https://www.fatherhood.org"
                        title="National Fatherhood Initiative (NFI)"
                        description="A leading non-profit organization providing resources and programs to equip fathers and strengthen families."
                    />
                    <ResourceLink 
                        href="https://allprodad.com/"
                        title="All Pro Dad"
                        description="Provides practical parenting advice and resources through articles, podcasts, and local chapter meetings."
                    />
                    <ResourceLink 
                        href="https://thedadedge.com/"
                        title="The Dad Edge"
                        description="A community and podcast focused on helping men be better husbands, fathers, and leaders."
                    />
                </div>
            </section>

          {/* Related Articles CTA */}
          <section>
              <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-dark-blue font-serif">Explore Related Articles</h2>
                  <p className="text-gray-600 my-4">Our blog features stories and advice on co-parenting, well-being, and strengthening your father-child bond.</p>
                  <button onClick={() => setCurrentPage(Page.Blog)} className="text-primary-blue font-semibold hover:text-primary-orange group flex items-center mx-auto">
                    <span>Go to the Blog</span>
                    <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
              </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default FatherhoodPage;