import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { PlusIcon, MinusIcon } from './icons';
import { pageToPath } from '../App';

interface TimelineLink {
    type: 'page' | 'post';
    destination: Page | string;
    text: string;
}

interface TimelineItem {
    stage: string;
    title: string;
    description: string;
    link?: TimelineLink;
}

const timelineData: TimelineItem[] = [
    {
      stage: '1',
      title: 'Filing a Petition',
      description: 'The process begins when one parent files a "Petition to Establish Parental Relationship" with their local family court. This legal document formally asks the court to determine the child\'s legal parents and is the first step in asserting your rights.',
      link: { type: 'page', destination: Page.Resources, text: 'Find legal aid to help you file' }
    },
    {
      stage: '2',
      title: 'Service of Process & Response',
      description: 'After filing, the other parent must be formally notified of the lawsuit. This is a legal requirement called "service of process." They then have a specific amount of time (e.g., 30 days) to file a legal response with the court.',
    },
    {
      stage: '3',
      title: 'DNA Testing',
      description: 'If paternity is disputed in the response, the court will almost certainly order a legally admissible DNA test. This involves a strict chain-of-custody procedure at an AABB-accredited lab to ensure results are accurate and tamper-proof.',
      link: { type: 'post', destination: 'paternity-testing-explained', text: 'Learn the difference between legal and at-home tests' }
    },
    {
      stage: '4',
      title: 'Court Hearing & Mediation',
      description: 'Before a final hearing, the court often requires parents to attend mediation to try and reach an agreement on custody, visitation, and support. If no agreement is reached, a hearing is scheduled where a judge reviews evidence (like DNA results) and hears arguments from both sides.',
      link: { type: 'post', destination: 'custody-battle-mistakes', text: 'Avoid common mistakes in court' }
    },
    {
      stage: '5',
      title: 'Final Order',
      description: 'The judge issues a final court order. This order legally establishes paternity and is a binding judgment. It will also include detailed, enforceable orders for child custody, visitation schedules, and child support obligations.',
    },
];

const PaternityTimeline: React.FC = () => {
  const navigate = useNavigate();
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  const handleLinkClick = (link: TimelineLink) => {
    if (link.type === 'page') {
      navigate(pageToPath(link.destination as Page));
    } else {
      navigate(`/blog/${link.destination}`);
    }
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
      
      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-16">
            {/* Circle on the line */}
            <div className={`absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full font-bold font-serif text-xl transition-all duration-300
              ${expandedStage === index ? 'bg-dark-blue text-primary-orange ring-4 ring-primary-orange/50' : 'bg-gray-200 text-dark-blue'}
            `}>
              {item.stage}
            </div>

            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex justify-between items-center text-left p-4 focus:outline-none"
                    aria-expanded={expandedStage === index}
                    aria-controls={`timeline-desc-${index}`}
                >
                    <h3 className="text-xl font-bold text-dark-blue font-serif">{item.title}</h3>
                    {expandedStage === index ? <MinusIcon className="w-6 h-6 text-dark-blue flex-shrink-0" /> : <PlusIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />}
                </button>
                <div 
                    id={`timeline-desc-${index}`}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedStage === index ? 'max-h-96' : 'max-h-0'}`}
                >
                    <div className="p-4 pt-0">
                        <p className="text-gray-700">
                            {item.description}
                        </p>
                        {item.link && (
                            <button onClick={() => handleLinkClick(item.link!)} className="mt-4 font-semibold text-primary-blue hover:text-primary-orange group flex items-center">
                                <span>{item.link.text}</span>
                                <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaternityTimeline;
