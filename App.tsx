import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
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

export const pageToPath = (page: Page): string => {
  if (page === Page.Home) return '/';
  return `/${page.toLowerCase().replace(/\s+/g, '-')}`;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans bg-light-bg text-gray-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path={pageToPath(Page.Home)} element={<HomePage />} />
            <Route path={pageToPath(Page.About)} element={<AboutPage />} />
            <Route path={pageToPath(Page.Paternity)} element={<PaternityPage />} />
            <Route path={pageToPath(Page.Custody)} element={<CustodyPage />} />
            <Route path={pageToPath(Page.ChildSupport)} element={<ChildSupportPage />} />
            <Route path={pageToPath(Page.Fatherhood)} element={<FatherhoodPage />} />
            <Route path={pageToPath(Page.NewDads)} element={<NewDadsPage />} />
            <Route path={pageToPath(Page.PaternityTesting)} element={<PaternityTestingPage />} />
            <Route path={pageToPath(Page.PaternityFraud)} element={<PaternityFraudPage />} />
            <Route path={pageToPath(Page.LegalDocuments)} element={<LegalDocumentsPage />} />
            <Route path={pageToPath(Page.DisclaimerPage)} element={<DisclaimerPage />} />
            <Route path={pageToPath(Page.Resources)} element={<ResourcesPage />} />
            <Route path={pageToPath(Page.Contact)} element={<ContactPage />} />
            <Route path={pageToPath(Page.Shop)} element={<ShopPage />} />
            <Route path={pageToPath(Page.CoParenting)} element={<CoParentingPage />} />
            <Route path={pageToPath(Page.FathersWellbeing)} element={<FathersWellbeingPage />} />
            <Route path={pageToPath(Page.EnforcingSupport)} element={<EnforcingSupportPage />} />
            <Route path={pageToPath(Page.SupportModifications)} element={<SupportModificationsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogPostWrapper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const BlogPostWrapper: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPostPage post={post} />;
};

export default App;
