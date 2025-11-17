
import React, { useState, useMemo } from 'react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { SearchIcon } from './icons';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => {
  const formattedDate = new Date(post.publishDate + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col cursor-pointer border border-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" onClick={onReadMore}>
      <div className="overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-gray-500 mb-1">{formattedDate}</p>
        <p className="text-sm font-semibold text-primary-blue mb-2">{post.category}</p>
        <h3 className="text-lg font-bold text-dark-blue font-serif mb-3 group-hover:text-primary-orange transition-colors duration-300 leading-tight">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
        <div className="font-semibold text-dark-blue group-hover:text-primary-orange transition-colors duration-300 self-start mt-auto text-sm">Read More &rarr;</div>
      </div>
    </div>
  );
};

interface BlogPageProps {
  viewPost: (postId: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ viewPost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const categories = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))], []);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    posts.sort((a, b) => {
      const dateA = new Date(a.publishDate).getTime();
      const dateB = new Date(b.publishDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="py-16 md:py-24 bg-light-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark-blue font-serif">Blog</h1>
          <div className="w-24 h-1 bg-primary-orange mx-auto my-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Insights, advice, and stories to empower you on your journey.
          </p>
        </div>

        {/* Controls Panel */}
        <div className="mb-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-200/80">
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="relative w-full md:flex-grow">
                    <input
                        type="text"
                        placeholder="Search articles by keyword..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-base border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                        aria-label="Search articles"
                    />
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                 <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                    <label htmlFor="sort-order" className="font-semibold text-gray-700 text-sm">Sort by:</label>
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                        className="appearance-none w-full md:w-auto bg-gray-100 border border-gray-300 text-dark-blue py-2 px-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-orange text-sm"
                        aria-label="Sort blog posts"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Category Filters */}
            <div>
              <div className="flex flex-wrap justify-center gap-2">
                  {categories.map(category => (
                      <button 
                          key={category} 
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 border-2 ${selectedCategory === category ? 'bg-primary-orange text-white border-primary-orange' : 'bg-white text-dark-blue hover:bg-gray-100 border-gray-300'}`}
                          aria-pressed={selectedCategory === category}
                      >
                          {category}
                      </button>
                  ))}
              </div>
            </div>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onReadMore={() => viewPost(post.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-dark-blue">No Articles Found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
