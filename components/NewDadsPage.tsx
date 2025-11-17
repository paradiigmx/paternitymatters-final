import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { PlusIcon, MinusIcon } from './icons';
import AffiliateProductCTA from './AffiliateProductCTA';
import { pageToPath } from '../App';

const TipCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
        <div className="flex items-center gap-4 mb-3">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue text-white">{icon}</div>
            <h3 className="text-xl font-bold text-dark-blue font-serif">{title}</h3>
        </div>
        <p className="text-gray-700">{children}</p>
    </div>
);


const NewDadsPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqData = [
    { question: "How can I bond with my baby?", answer: "Skin-to-skin contact is powerful. Also, try wearing your baby in a carrier, talking and singing to them, and taking charge of routines like bath time or a feeding (if bottle-feeding)." },
    { question: "Is it normal to feel scared or overwhelmed?", answer: "Absolutely. Becoming a father is a massive identity shift. It's okay to feel anxious. Talk about these feelings with your partner, a friend, or a professional. You're not alone." },
    { question: "How can I best support my partner after birth?", answer: "Be her number one supporter. Take over household chores, manage visitors, make sure she has food and water, and tell her she's doing a great job. Her recovery is a marathon, and your support is crucial." },
    { question: "What if I feel like I'm doing everything wrong?", answer: "Every new parent feels this way. Babies are resilient. As long as your baby is safe, fed, and loved, you're doing great. Give yourself grace and remember that confidence comes with practice." },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/minnie-zhou-40UwNzsJOt0-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-dark-blue/70"></div>
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-semibold text-primary-orange">A SUBPAGE OF FATHERHOOD</p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mt-2">A Practical Guide for New Dads</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4">
            Welcome to the team. Here’s what you need to know to not just survive, but thrive in your new role.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <section className="mb-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Your New Mission: Dad</h2>
              <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
              <p className="text-lg text-gray-700">
                Becoming a father is one of life's most profound experiences. It's exhilarating, terrifying, and deeply rewarding. Your role in these early days is just as important as the mother's. You are a co-pilot, not a passenger. Let's get you prepared for the flight.
              </p>
            </section>

            {/* Practical Tips */}
            <section className="mb-20">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">The New Dad Playbook</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <TipCard title="Become the Logistics Manager" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.38"/><path d="M16 2l6 6h-6V2z"/></svg>}>
                  Your partner is recovering and feeding a tiny human. Your job is to run everything else. Handle the cooking (or ordering), cleaning, grocery shopping, and communication with family. A well-run house reduces stress for everyone.
                </TipCard>
                <TipCard title="Master the '5 S's'" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>}>
                  Learn Dr. Harvey Karp's techniques for soothing a fussy baby: Swaddle, Side/Stomach position (while holding), Shush, Swing, and Suck. Becoming a baby-soothing expert is a superpower that gives your partner a much-needed break.
                </TipCard>
                <TipCard title="Learn the Gear" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>}>
                  Don't be the dad who doesn't know how to fold the stroller or buckle the car seat. Practice with the gear before you need it in a high-pressure situation. Read the manuals. Watch YouTube tutorials. Confidence comes from competence.
                </TipCard>
                <TipCard title="Tag In, Don't Wait to Be Asked" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}>
                  When you see your partner is struggling or exhausted, don't ask "Can I help?" Just take the baby and say, "I've got this. Go take a shower/nap/walk." Proactive support is a game-changer for a new mom.
                </TipCard>
              </div>
            </section>

             {/* FAQ Section */}
            <section className="my-20 bg-light-bg -mx-6 px-6 py-16">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif text-center">Common Questions from New Dads</h2>
                  <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
                  <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl bg-white">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                        >
                          <h3 className="text-lg font-semibold text-dark-blue">{faq.question}</h3>
                          {openFaq === index ? <MinusIcon className="w-6 h-6 text-dark-blue flex-shrink-0" /> : <PlusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />}
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                          <p className="p-6 pt-0 text-gray-700">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </section>

            {/* Recommended Resources */}
            <section className="my-20">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-blue font-serif text-center mb-8">Recommended Reading for New Dads</h3>
              <AffiliateProductCTA
                productName="The Intentional Father by Jon Tyson"
                description="A bestselling guide (150,000+ copies sold) to raising teenage sons into men of character, courage, and faith. Practical activities, rites of passage, and discipleship framework."
                affiliateUrl="https://amzn.to/43vw0CL"
                imageUrl="/images/intentional-father-book.png"
                price="$22.99"
              />
            </section>

            {/* Back to Fatherhood button */}
            <div className="text-center">
                <button
                    onClick={() => navigate(pageToPath(Page.Fatherhood))}
                    className="font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300"
                >
                    &larr; Back to Fatherhood Main Page
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDadsPage;
