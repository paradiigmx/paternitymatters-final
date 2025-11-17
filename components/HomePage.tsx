
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { ChevronRightIcon } from './icons/index';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { pageToPath } from '../App';

const FeatureCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({ title, description, imageUrl }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full border border-gray-200/50">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-dark-blue mb-2 font-serif">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const HomeBlogCard: React.FC<{ post: BlogPost; onReadMore: () => void }> = ({ post, onReadMore }) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col cursor-pointer h-full border border-gray-200/50" onClick={onReadMore}>
    <div className="overflow-hidden">
      <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-primary-blue mb-2">{post.category}</p>
      <h3 className="text-xl font-bold text-dark-blue font-serif mb-3 group-hover:text-primary-orange transition-colors duration-300">{post.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
      <div className="font-semibold text-dark-blue group-hover:text-primary-orange transition-colors duration-300 self-start mt-auto">Read More &rarr;</div>
    </div>
  </div>
);


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, 4);

  const viewPost = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-40 bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/minnie-zhou-40UwNzsJOt0-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/95 via-dark-blue/75 to-dark-blue/60"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-4">Your Rights, Your Family, Your Legacy.</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            PaternityMatters.org is a dedicated resource for fathers striving to establish their parental rights and build stronger connections with their children.
          </p>
           <button
              onClick={() => navigate(pageToPath(Page.Paternity))}
              className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]"
            >
              Start Here
            </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light-bg">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Empowering Fathers at Every Step</h2>
                  <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We provide the crucial resources you need to secure your role in your child's life.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard 
                      title="Legal Guidance" 
                      description="Understand the laws in your state and learn how to navigate the family court system effectively."
                      imageUrl="/images/pm-image--02.jpg"
                  />
                  <FeatureCard 
                      title="Community Support" 
                      description="Connect with other fathers who have faced similar challenges. You are not alone in this journey."
                      imageUrl="/images/pm-image--03.jpg"
                  />
                  <FeatureCard 
                      title="Paternity Testing" 
                      description="Get clear information on the process and importance of legally establishing paternity."
                      imageUrl="/images/pm-image--04.jpg"
                  />
              </div>
          </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif">Blog</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Insights, advice, and stories to empower you on your journey.</p>
          </div>
          
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16 bg-white rounded-2xl shadow-2xl overflow-hidden group cursor-pointer" onClick={() => viewPost(featuredPost.id)}>
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-64 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center lg:w-1/2">
                  <p className="text-sm font-semibold text-primary-blue mb-2">{featuredPost.category}</p>
                  <h3 className="text-3xl font-bold text-dark-blue font-serif mb-4 group-hover:text-primary-orange transition-colors duration-300">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="font-semibold text-dark-blue group-hover:text-primary-orange transition-colors duration-300 self-start">Read More &rarr;</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <HomeBlogCard key={post.id} post={post} onReadMore={() => viewPost(post.id)} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button
              onClick={() => navigate(pageToPath(Page.Blog))}
              className="bg-primary-orange text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_theme(colors.primary-orange/50%)]"
            >
              View All Posts
            </button>
          </div>
        </div>
      </section>

      {/* Fatherhood Moments Section */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue font-serif mb-4">The Importance of a Father's Presence</h2>
              <p className="text-gray-600 mb-6">Research consistently shows that children with involved, loving fathers are more likely to thrive. They achieve higher levels of academic success, have fewer behavioral problems, and report greater overall happiness. Your fight for your rights is a fight for their future.</p>
              <button onClick={() => navigate(pageToPath(Page.About))} className="text-primary-blue font-semibold hover:text-primary-orange group flex items-center">
                <span>Learn Why This Matters</span>
                <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="/images/pm-image--07.jpg" alt="Father teaching child" className="rounded-2xl shadow-lg object-cover w-full h-full" />
              <img src="/images/pm-image--08.jpg" alt="Father and child together" className="rounded-2xl shadow-lg object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
