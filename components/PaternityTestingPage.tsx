import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { ChevronRightIcon } from './icons';
import AffiliateProductCTA from './AffiliateProductCTA';
import { pageToPath } from '../App';

const TestTypeCard: React.FC<{ title: string; subtitle: string; children: React.ReactNode; isLegal: boolean }> = ({ title, subtitle, children, isLegal }) => (
    <div className={`rounded-xl shadow-lg p-8 border-t-8 ${isLegal ? 'border-primary-green' : 'border-primary-orange'} bg-white`}>
        <h3 className={`text-2xl font-bold font-serif ${isLegal ? 'text-primary-green' : 'text-primary-orange'}`}>{title}</h3>
        <p className="font-semibold text-dark-blue mb-4">{subtitle}</p>
        <div className="text-gray-700">{children}</div>
    </div>
);


const PaternityTestingPage: React.FC = () => {
  const navigate = useNavigate();

  const viewPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="bg-light-bg">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/hu-chen-tCbTGNwrFNM-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF PATERNITY</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">The Truth is in the Test: DNA & Paternity</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            A DNA test provides the scientific certainty needed to establish legal rights and move forward with clarity.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Why it Matters */}
            <section className="mb-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Certainty is Non-Negotiable</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700">
                In any paternity case, a DNA test is the single most important piece of evidence. It replaces doubt with facts, providing the foundation for all legal proceedings related to custody, visitation, and child support. It's not just about biology; it's about securing your legal rights and ensuring the child knows their true heritage and medical history.
              </p>
              <button onClick={() => viewPost('why-dna-matters')} className="mt-6 text-primary-blue font-semibold hover:text-primary-orange group flex items-center mx-auto">
                <span>Read Blog: Why DNA Matters More Than Anything</span>
                <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </section>

            {/* Early Affiliate CTA */}
            <section className="mb-20">
              <AffiliateProductCTA
                productName="My Forever DNA Paternity Test Kit"
                description="Get peace of mind with a simple at-home test. AABB & CAP accredited with 99.999% accuracy. Perfect for initial certainty before pursuing legal proceedings."
                affiliateUrl="https://amzn.to/47GPdEa"
                imageUrl="/images/paternity-test-product.png"
                price="$99-$149"
              />
            </section>

            {/* Test Types */}
            <section className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">At-Home vs. Legal DNA Tests: A Critical Difference</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <TestTypeCard title="At-Home Test" subtitle="For Personal Knowledge Only" isLegal={false}>
                        <p>These are "peace of mind" tests bought online or in a pharmacy. You collect the samples yourself and mail them in.</p>
                        <ul className="list-disc list-inside mt-4 space-y-1 font-semibold">
                            <li>Pros: Private, convenient, less expensive.</li>
                            <li className="text-red-600">Con: NOT ADMISSIBLE IN COURT.</li>
                        </ul>
                    </TestTypeCard>
                    <TestTypeCard title="Legal Test" subtitle="Required for Court Proceedings" isLegal={true}>
                        <p>This test follows a strict "chain of custody" protocol. Samples are collected by a neutral third party at an approved facility, and identities are verified.</p>
                         <ul className="list-disc list-inside mt-4 space-y-1 font-semibold">
                            <li className="text-green-600">Pro: Results are legally binding and admissible in court.</li>
                            <li>Cons: More expensive, requires a scheduled appointment.</li>
                        </ul>
                    </TestTypeCard>
                </div>
                 <div className="text-center mt-8">
                    <button onClick={() => viewPost('paternity-testing-explained')} className="bg-dark-blue text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                        Read a Detailed Comparison
                    </button>
                </div>
            </section>

             {/* The Process */}
            <section className="bg-light-bg -mx-6 px-6 py-16">
              <div className="container mx-auto max-w-4xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center mb-12">The Legal DNA Testing Process</h2>
                  <ol className="relative border-l border-gray-300">
                      <li className="mb-10 ml-6">
                          <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-blue rounded-full -left-4 ring-4 ring-white">1</span>
                          <h3 className="font-bold text-xl text-dark-blue font-serif">File a Petition</h3>
                          <p className="text-gray-700">A paternity case is initiated in family court. If paternity is denied, a party requests the court to order genetic testing.</p>
                      </li>
                      <li className="mb-10 ml-6">
                          <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-blue rounded-full -left-4 ring-4 ring-white">2</span>
                          <h3 className="font-bold text-xl text-dark-blue font-serif">Court Order Issued</h3>
                          <p className="text-gray-700">A judge issues an order compelling the mother, child, and alleged father to submit to testing.</p>
                      </li>
                      <li className="mb-10 ml-6">
                          <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-blue rounded-full -left-4 ring-4 ring-white">3</span>
                          <h3 className="font-bold text-xl text-dark-blue font-serif">Sample Collection</h3>
                          <p className="text-gray-700">All parties go to an AABB-accredited lab or clinic. IDs are verified, photos may be taken, and a neutral technician collects cheek swabs.</p>
                      </li>
                       <li className="ml-6">
                          <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-blue rounded-full -left-4 ring-4 ring-white">4</span>
                          <h3 className="font-bold text-xl text-dark-blue font-serif">Results Issued</h3>
                          <p className="text-gray-700">The lab sends notarized results directly to the court, attorneys, and parties involved. These results (typically 99.9%+ accurate) are then used to issue a final order of paternity.</p>
                      </li>
                  </ol>
              </div>
            </section>

            {/* Affiliate CTA */}
            <section className="max-w-4xl mx-auto mt-20">
              <AffiliateProductCTA
                productName="My Forever DNA Paternity Test Kit"
                description="AABB & CAP accredited with 99.999% accuracy. Tests 24 DNA genetic markers. All lab fees and shipping included. Results in 1-3 business days. Perfect for peace of mind before pursuing legal testing."
                affiliateUrl="https://amzn.to/47GPdEa"
                imageUrl="/images/paternity-test-product.png"
                price="$99-$149"
              />
            </section>

            <div className="mt-20 text-center">
                <button
                    onClick={() => navigate(pageToPath(Page.Paternity))}
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

export default PaternityTestingPage;
