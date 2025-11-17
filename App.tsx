import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ResourcesPage from './components/ResourcesPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import PaternityPage from './components/PaternityPage';
import CustodyPage from './components/CustodyPage';
import BlogPostPage from './components/BlogPostPage';
import { blogPosts } from './data/blogPosts';
import ChildSupportPage from './components/ChildSupportPage';
import FatherhoodPage from './components/FatherhoodPage';
import NewDadsPage from './components/NewDadsPage';
import PaternityTestingPage from './components/PaternityTestingPage';
import PaternityFraudPage from './components/PaternityFraudPage';
import LegalDocumentsPage from './components/LegalDocumentsPage';
import DisclaimerPage from './components/DisclaimerPage';
import CoParentingPage from './components/CoParentingPage';
import FathersWellbeingPage from './components/FathersWellbeingPage';
import EnforcingSupportPage from './components/EnforcingSupportPage';
import SupportModificationsPage from './components/SupportModificationsPage';
import ShopPage from './components/ShopPage';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId) {
      const postExists = blogPosts.some(p => p.id === postId);
      if (postExists) {
        setSelectedPostId(postId);
        setCurrentPage(Page.Blog);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPostId]);
  
  const handleSetCurrentPage = (page: Page) => {
    setCurrentPage(page);
    setSelectedPostId(null); // Clear selected post when changing main pages
    // Clear query params when navigating away from a shared link
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const viewPost = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage(Page.Blog);
    window.history.pushState({}, '', `?post=${postId}`);
  };
  
  const viewBlogList = () => {
    setSelectedPostId(null);
    setCurrentPage(Page.Blog);
     if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const renderPage = () => {
    if (currentPage === Page.Blog) {
      if (selectedPostId) {
        const post = blogPosts.find(p => p.id === selectedPostId);
        if (post) {
          return <BlogPostPage post={post} onBack={viewBlogList} viewPost={viewPost} />;
        }
      }
      return <BlogPage viewPost={viewPost} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={handleSetCurrentPage} viewPost={viewPost} />;
      case Page.About:
        return <AboutPage setCurrentPage={handleSetCurrentPage} />;
      case Page.Paternity:
        return <PaternityPage setCurrentPage={handleSetCurrentPage} viewPost={viewPost} />;
      case Page.Custody:
        return <CustodyPage setCurrentPage={handleSetCurrentPage} viewPost={viewPost} />;
      case Page.ChildSupport:
        return <ChildSupportPage setCurrentPage={handleSetCurrentPage} />;
      case Page.Fatherhood:
        return <FatherhoodPage setCurrentPage={handleSetCurrentPage} />;
      case Page.NewDads:
        return <NewDadsPage setCurrentPage={handleSetCurrentPage} />;
      case Page.PaternityTesting:
        return <PaternityTestingPage setCurrentPage={handleSetCurrentPage} viewPost={viewPost}/>;
      case Page.PaternityFraud:
        return <PaternityFraudPage setCurrentPage={handleSetCurrentPage} viewPost={viewPost} />;
      case Page.LegalDocuments:
        return <LegalDocumentsPage setCurrentPage={handleSetCurrentPage} />;
      case Page.DisclaimerPage:
        return <DisclaimerPage />;
      case Page.Resources:
        return <ResourcesPage />;
      case Page.Contact:
        return <ContactPage />;
      case Page.Shop:
        return <ShopPage setCurrentPage={handleSetCurrentPage} />;
      case Page.CoParenting:
        return <CoParentingPage setCurrentPage={handleSetCurrentPage} />;
      case Page.FathersWellbeing:
        return <FathersWellbeingPage setCurrentPage={handleSetCurrentPage} />;
      case Page.EnforcingSupport:
        return <EnforcingSupportPage setCurrentPage={handleSetCurrentPage} />;
      case Page.SupportModifications:
        return <SupportModificationsPage setCurrentPage={handleSetCurrentPage} />;
      default:
        return <HomePage setCurrentPage={handleSetCurrentPage} viewPost={viewPost} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-light-bg text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={handleSetCurrentPage} />
    </div>
  );
};

export default App;