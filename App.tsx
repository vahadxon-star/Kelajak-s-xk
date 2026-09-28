import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full flex-grow flex flex-col"
      >
        <Suspense
          fallback={
            <div
              className="w-full flex-grow min-h-screen bg-[#0d0d0d]"
              aria-busy="true"
            />
          }
        >
          <Routes location={location}>
            {/* Requested primary routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/biz-haqimizda" element={<AboutPage />} />
            <Route path="/loyihalar" element={<ProjectsPage />} />
            <Route path="/loyihalar/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/aloqa" element={<ContactPage />} />
            <Route path="/maxfiylik-siyosati" element={<PrivacyPolicyPage />} />
            <Route path="/foydalanish-shartlari" element={<TermsPage />} />

            {/* Convenient redirects */}
            <Route path="/studio" element={<Navigate to="/biz-haqimizda" replace />} />
            <Route path="/projects" element={<Navigate to="/loyihalar" replace />} />
            <Route path="/contact" element={<Navigate to="/aloqa" replace />} />

            {/* 404 for everything else */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#efeeec] font-sans antialiased selection:bg-[#efeeec] selection:text-[#0d0d0d]">
          <Header />
          <main id="main-content" className="flex-grow flex flex-col">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}
