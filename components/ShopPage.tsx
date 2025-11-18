import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { pageToPath } from '../App';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  affiliateUrl: string;
  imageUrl: string;
  category: string;
}

const products: Product[] = [
  {
    id: 'dna-paternity-test',
    name: 'My Forever DNA Paternity Test Kit',
    description: '24 DNA genetic markers tested with 99.999% accuracy. AABB & CAP accredited, BBB A+ rated. Results in 1-3 business days. Includes all lab fees and shipping.',
    price: '$99-$149',
    affiliateUrl: 'https://amzn.to/47GPdEa',
    imageUrl: '/images/paternity-test-product.png',
    category: 'DNA Tests'
  },
  {
    id: 'intentional-father-book',
    name: 'The Intentional Father by Jon Tyson',
    description: 'A bestselling guide (150,000+ copies sold) to raising teenage sons into men of character, courage, and faith. Practical activities, rites of passage, and discipleship framework for fathers.',
    price: '$22.99',
    affiliateUrl: 'https://amzn.to/43vw0CL',
    imageUrl: '/images/intentional-father-book.png',
    category: 'Books'
  },
  {
    id: 'ancestry-dna-kit',
    name: 'AncestryDNA Origins Kit',
    description: 'Discover your ethnic origins and connect with relatives through the world\'s largest consumer DNA database. Uncover your family history and heritage with detailed ethnicity estimates.',
    price: '$99',
    affiliateUrl: 'https://amzn.to/444lvq7',
    imageUrl: '/images/ancestry-dna-kit.png',
    category: 'DNA Tests'
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col">
      <div className="relative h-64 bg-gray-200">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-orange text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-dark-blue mb-2 font-serif">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary-blue">{product.price}</span>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-orange text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]"
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative py-24 md:py-32 bg-cover bg-center text-white"
        style={{ 
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 95, 0.8)), url('/images/pm-image--15.jpg')",
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            Resources & Tools for Fathers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Carefully curated products to help you navigate paternity, fatherhood, and building strong family connections.
          </p>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8 mx-6 md:mx-auto md:max-w-4xl">
        <p className="text-sm text-amber-900">
          <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. When you purchase through our links, you support our mission to provide free resources for fathers, at no extra cost to you.
        </p>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-orange text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Why These Products Section */}
      <section className="bg-light-bg py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue text-center mb-12 font-serif">
            Why We Recommend These Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-2">Trusted Quality</h3>
              <p className="text-gray-600">
                Every product is vetted for accuracy, reliability, and positive user reviews.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-2">Father-Focused</h3>
              <p className="text-gray-600">
                Selected specifically to address the unique challenges fathers face in establishing and maintaining parental rights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dark-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-2">Supporting Our Mission</h3>
              <p className="text-gray-600">
                Your purchases help us continue providing free legal guidance, articles, and community support to fathers everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-dark-blue to-navy text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Need More Guidance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Beyond products, we offer comprehensive resources, legal information, and AI-powered tools to help you navigate your paternity journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(pageToPath(Page.Resources))}
              className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]"
            >
              Explore Resources
            </button>
            <button
              onClick={() => navigate(pageToPath(Page.Blog))}
              className="bg-white text-dark-blue font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_white/30%]"
            >
              Read the Blog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
