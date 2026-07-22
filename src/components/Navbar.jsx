import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">MindMate</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'About', 'Testimonials', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode
              ? <Sun className="w-5 h-5 text-amber-400" />
              : <Moon className="w-5 h-5 text-slate-500" />
            }
          </button>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="hidden md:block btn-primary px-5 py-2 rounded-xl text-sm font-medium"
            >
              Dashboard
            </Link>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary px-5 py-2 rounded-xl text-sm font-medium"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {mobileOpen
              ? <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              : <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-6 py-4 shadow-lg animate-slide-up">
          {['Features', 'About', 'Testimonials', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-2 mt-4">
            <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2 rounded-xl text-sm font-medium text-center border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors">
              Sign In
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2 rounded-xl text-sm font-medium text-center btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
