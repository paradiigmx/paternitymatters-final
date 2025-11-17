import React from 'react';
import { ExternalLinkIcon } from './icons/index';

interface ResourceLinkProps {
  href: string;
  title: string;
  description: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ href, title, description }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-primary-blue"
    >
        <div className="flex justify-between items-start">
            <div>
                <h4 className="text-xl font-bold text-dark-blue">{title}</h4>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
            <ExternalLinkIcon className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        </div>
    </a>
);

interface ResourceCategoryProps {
  title: string;
  children: React.ReactNode;
}

const ResourceCategory: React.FC<ResourceCategoryProps> = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-dark-blue font-serif mb-6 border-b-2 border-primary-orange pb-2">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </section>
);

const ResourcesPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue font-serif">Resources</h1>
          <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A curated list of trusted organizations and tools to assist you in your journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <ResourceCategory title="Legal Advocacy">
                <ResourceLink 
                    href="https://www.nationalparentsorganization.org"
                    title="National Parents Organization"
                    description="Advocates for family law reform and shared parenting."
                />
                <ResourceLink 
                    href="https://www.tfrm.org"
                    title="The Fathers' Rights Movement (TFRM)"
                    description="A grassroots movement fighting for fathers' rights and family court reform."
                />
                <ResourceLink 
                    href="https://www.lsc.gov"
                    title="Legal Aid Society (LSC)"
                    description="Provides financial support for civil legal aid to low-income Americans."
                />
            </ResourceCategory>

            <ResourceCategory title="DNA Testing Providers">
                <ResourceLink 
                    href="https://www.dnacenter.com"
                    title="DNA Diagnostics Center (DDC)"
                    description="A leading provider of AABB-accredited legal paternity tests."
                />
                <ResourceLink 
                    href="https://www.labcorp.com"
                    title="LabCorp DNA Testing"
                    description="Offers a range of DNA testing services, including legal paternity establishment."
                />
            </ResourceCategory>

            <ResourceCategory title="Support & Education">
                <ResourceLink 
                    href="https://www.fatherhood.gov"
                    title="Fatherhood.gov"
                    description="A national initiative to promote responsible fatherhood."
                />
                <ResourceLink 
                    href="https://www.fatherhood.org"
                    title="National Fatherhood Initiative (NFI)"
                    description="Provides resources to equip fathers and strengthen families."
                />
                <ResourceLink 
                    href="https://www.dadsdivorce.com"
                    title="DadsDivorce.com"
                    description="An online community and resource for divorced fathers."
                />
            </ResourceCategory>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;