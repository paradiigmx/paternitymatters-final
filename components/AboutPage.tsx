import React from 'react';
import { Page } from '../types';

interface AboutPageProps {
  setCurrentPage: (page: Page) => void;
}

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-7xl lg:text-8xl font-bold text-primary-orange font-serif tracking-tighter">{value}</p>
        <p className="mt-4 text-gray-600 max-w-xs mx-auto">{label}</p>
    </div>
);

const ValueCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-blue text-white mb-4 shadow-lg">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-dark-blue font-serif mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-white">
       {/* Hero Section */}
       <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/pm-image--06.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/70 to-dark-blue/50"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">About Paternity Matters</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Empowering fathers with knowledge, supporting them through challenges, and advocating for their essential role in the family.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
        
          {/* Mission and Vision */}
          <section className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">A Fair Chance for Every Father</h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to be the definitive resource for fathers navigating the complexities of paternity and custody. We provide clear, actionable information, a supportive community, and a powerful voice advocating for the essential role fathers play in their children's lives. We believe an informed father is an empowered father.
            </p>
            <p className="text-lg text-gray-700">
              We envision a world where the legal system unconditionally recognizes the importance of both parents, where fathers have the tools to build and maintain strong bonds with their children, and where every child thrives with the love and support of an actively involved dad.
            </p>
          </section>

          {/* Our Approach */}
           <section className="mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Our Approach: A 360° View of Fatherhood</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We turn confusion into clarity and isolation into community.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <ValueCard title="Inform & Educate" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>}>
                        We demystify complex legal topics with comprehensive guides, state-specific resources, and expert articles.
                    </ValueCard>
                    <ValueCard title="Support & Connect" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}>
                        No father should walk this path alone. We foster a community where men can share experiences and find encouragement.
                    </ValueCard>
                     <ValueCard title="Advocate & Empower" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}>
                        We champion fathers' rights, fighting for systemic changes that promote shared parenting and recognize a father's value.
                    </ValueCard>
                </div>
            </section>

          {/* Why This Matters */}
          <section className="mb-20 bg-light-bg -mx-6 px-6 py-20">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Why This Matters</h2>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">The fight for fathers' rights is a fight for children's well-being. The statistics are clear.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
                <StatCard value="40%" label="Of children in the U.S. are born to unmarried mothers, making paternity establishment crucial." />
                <StatCard value="2.5x" label="More likely for children without fathers to live in poverty." />
                <StatCard value="71%" label="Of high school dropouts are from fatherless homes." />
                <StatCard value="90%" label="Of all homeless and runaway children are from fatherless homes." />
              </div>
              <p className="text-center text-xs text-gray-500 mt-12">Statistics are illustrative and sourced from various fatherhood initiatives.</p>
            </div>
          </section>

          {/* Founding Story */}
          <section className="mb-20">
             <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-1/2">
                      <img src="/images/pm-image--09.jpg" alt="Father and son looking out at the horizon" className="rounded-2xl shadow-xl w-full" />
                  </div>
                  <div className="md:w-1/2">
                      <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif mb-4">Our Founding Story</h2>
                      <p className="text-gray-700 mb-4">
                          PaternityMatters.org was founded by fathers who experienced firsthand the emotional turmoil and systemic obstacles of the family court system. Frustrated by the lack of clear, supportive resources for dads, they committed to building a platform that would serve as a beacon of hope and a source of strength for others.
                      </p>
                      <p className="text-gray-700">
                          This organization is built on the belief that a father's love is irreplaceable and that every father deserves a fair chance to be a central figure in his child's life. We are here to ensure you have that chance.
                      </p>
                  </div>
              </div>
          </section>

           {/* Testimonial Section */}
            <section className="my-20">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-dark-blue to-navy text-white p-12 rounded-2xl shadow-2xl">
                    <svg className="w-16 h-16 mx-auto mb-4 text-primary-orange" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.5 2A1.5 1.5 0 004 3.5v9A1.5 1.5 0 005.5 14h.086c.493 0 .964.225 1.28.61l.515.618a.5.5 0 00.838 0l.515-.618c.316-.385.787-.61 1.28-.61H14.5A1.5 1.5 0 0016 12.5v-9A1.5 1.5 0 0014.5 2h-9zM3 3.5C3 2.12 4.12 1 5.5 1h9C15.88 1 17 2.12 17 3.5v9c0 1.38-1.12 2.5-2.5 2.5h-.086a2.492 2.492 0 01-1.28.61l-.515.618a1.5 1.5 0 01-2.518 0l-.515-.618a2.492 2.492 0 01-1.28-.61H5.5C4.12 16 3 14.88 3 13.5v-10z" clipRule="evenodd"></path></svg>
                    <blockquote className="text-2xl font-serif italic">
                       "Finding this site was a turning point. I felt lost and alone in my custody battle. The resources here gave me the knowledge and confidence to fight for my daughter. I now have a 50/50 parenting plan, and our relationship is stronger than ever."
                    </blockquote>
                    <cite className="block mt-6 font-semibold not-italic">- Mark T., A Grateful Father</cite>
                </div>
            </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-dark-blue to-navy text-white text-center py-16 rounded-2xl">
            <h2 className="text-3xl font-bold font-serif mb-4">Your Journey Starts Here</h2>
            <p className="max-w-2xl mx-auto mb-8">
              You have the power to shape your future and your child's. Explore our resources, read our blog for insights, or reach out to us for guidance. You are not alone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => setCurrentPage(Page.Resources)} className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]">
                    Explore Resources
                </button>
                 <button onClick={() => setCurrentPage(Page.Blog)} className="bg-white text-dark-blue font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_white/30%]">
                    Read the Blog
                </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;