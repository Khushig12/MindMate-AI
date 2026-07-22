import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Brain, MessageCircle, BookOpen, BarChart3, Wind, Heart,
  Star, ArrowRight, CheckCircle, Sparkles, Shield, Clock,
  ChevronRight, Quote
} from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Support',
    desc: 'Talk to our empathetic AI companion anytime. Get personalized support for stress, anxiety, and daily challenges.',
    color: 'from-indigo-400 to-purple-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    icon: BarChart3,
    title: 'Mood Tracking',
    desc: 'Track your emotional journey with beautiful charts. Understand patterns and celebrate your progress.',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    icon: BookOpen,
    title: 'Guided Journaling',
    desc: 'Express yourself freely in your private journal. Reflect on your thoughts and emotions at your own pace.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Wind,
    title: 'Meditation & Breathing',
    desc: 'Discover calm with guided meditations. From 5-minute sessions to deep sleep music.',
    color: 'from-cyan-400 to-teal-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    icon: Heart,
    title: 'Self-Care Tips',
    desc: 'Personalized wellness recommendations including exercise, nutrition, sleep, and mindfulness tips.',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    desc: 'Your mental health data is completely private. End-to-end encryption keeps your journey safe.',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    avatar: 'PS',
    rating: 5,
    text: 'MindMate has completely changed how I manage my anxiety. The AI chat feels genuinely supportive, and the mood tracking helped me identify my stress triggers.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    name: 'Arjun Mehta',
    role: 'College Student',
    avatar: 'AM',
    rating: 5,
    text: 'During exam season, MindMate was my go-to companion. The breathing exercises and meditation sessions helped me stay focused and calm.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Sneha Patel',
    role: 'Marketing Manager',
    avatar: 'SP',
    rating: 5,
    text: 'The journaling feature is incredible. Writing my thoughts every day has become a calming ritual, and I can see how much I\'ve grown over the months.',
    color: 'from-pink-400 to-rose-500',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Users' },
  { value: '1M+', label: 'Sessions Completed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'AI Support' },
];

const LandingPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 gradient-calm dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 opacity-60" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-200 dark:bg-green-900 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Mental Wellness
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-6 leading-tight animate-slide-up">
            Your Mental Health{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Companion
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            MindMate is your personal AI-powered sanctuary for mental wellness. 
            Track moods, journal your thoughts, meditate, and chat with an empathetic AI — all in one beautiful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold shadow-xl"
            >
              Start Your Journey Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
            >
              Explore Features
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex -space-x-2">
              {['PS', 'AM', 'SP', 'RK', '+'].map((av, i) => (
                <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow
                  ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-emerald-500' : i === 2 ? 'bg-pink-500' : i === 3 ? 'bg-amber-500' : 'bg-purple-500'}`}>
                  {av}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Loved by 50,000+ users</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-indigo-200 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> Everything You Need
            </div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Features Built for Your Wellbeing
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A complete mental health toolkit designed with care, science, and compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`${bg} p-6 rounded-2xl border border-white/50 dark:border-slate-700 card-hover`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Start Feeling Better in Minutes
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Three simple steps to transform your mental wellness journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up for free in seconds. No credit card required.', icon: CheckCircle },
              { step: '02', title: 'Set Your Goals', desc: 'Tell us about yourself and your wellness goals.', icon: Heart },
              { step: '03', title: 'Start Your Journey', desc: 'Access AI chat, journaling, meditation, and more.', icon: Sparkles },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <span className="text-white font-bold text-lg">{step}</span>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-300 to-transparent z-0" />
                )}
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Real Stories, Real Impact
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Hear from our community of wellness warriors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, avatar, rating, text, color }) => (
              <div key={name} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-indigo-200 dark:text-indigo-800 mb-3" />
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Begin Your Wellness Journey Today
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Join 50,000+ people who've transformed their mental health with MindMate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-xl"
            >
              Get Started — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
