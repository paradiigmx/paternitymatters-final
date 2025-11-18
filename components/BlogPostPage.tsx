
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../data/blogPosts';
import ShareButton from './ShareButton';
import { pageToPath } from '../App';
import { Page } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const articleContent = document.querySelector('.prose');
    if (!articleContent) return;

    const handleArticleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a[data-postid]');
        if (link) {
            event.preventDefault();
            const postId = link.getAttribute('data-postid');
            if (postId) {
                navigate(`/blog/${postId}`);
            }
        }
    };

    articleContent.addEventListener('click', handleArticleClick);

    return () => {
        articleContent.removeEventListener('click', handleArticleClick);
    };
  }, [post.id, navigate]);

  const postUrl = `${window.location.origin}/blog/${post.id}`;

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigate(pageToPath(Page.Blog))} className="mb-8 font-semibold text-dark-blue hover:text-primary-orange transition-colors duration-300">
            &larr; Back to All Articles
          </button>
          
          <article>
            <p className="text-sm font-semibold text-primary-blue mb-2">{post.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-dark-blue font-serif mb-4">{post.title}</h1>
            
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[550px] object-cover rounded-2xl my-8 shadow-xl" />
            
            <div className="my-8 py-6 border-y border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-semibold text-dark-blue">Share this article:</span>
              <ShareButton title={post.title} urlOverride={postUrl} />
            </div>

            <div className="prose lg:prose-xl max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.content.replace(/text-brand-gold/g, 'text-primary-blue') }} />

            {post.sources && post.sources.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-dark-blue mb-4 font-serif">Sources:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {post.sources.map((source, index) => (
                    <li key={index}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline break-words">
                        {source.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
