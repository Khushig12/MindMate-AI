import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Globe, AtSign, Rss, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MindMate</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your AI-powered mental health companion. We're here to help you thrive, one day at a time.
            </p>
            <div className="flex gap-3 mt-5">
              {[Globe, AtSign, Rss, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              {['AI Chat Support', 'Mood Tracker', 'Meditation', 'Journal', 'Self-Care Tips'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Security'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 MindMate. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 inline" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
