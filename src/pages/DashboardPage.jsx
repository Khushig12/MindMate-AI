import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle, BookOpen, BarChart3, Wind, Heart,
  TrendingUp, Calendar, Clock, Sparkles, ArrowRight, Zap
} from 'lucide-react';
import MoodCard from '../components/MoodCard';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const moods = [
  { mood: 'Happy', emoji: '😊' },
  { mood: 'Sad', emoji: '😔' },
  { mood: 'Angry', emoji: '😡' },
  { mood: 'Anxious', emoji: '😰' },
  { mood: 'Tired', emoji: '😴' },
  { mood: 'Calm', emoji: '😌' },
];

const quickActions = [
  { to: '/journal', icon: BookOpen, label: 'Write Journal', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { to: '/chat', icon: MessageCircle, label: 'Chat with AI', color: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { to: '/meditation', icon: Wind, label: 'Meditation', color: 'from-cyan-400 to-teal-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { to: '/mood-tracker', icon: BarChart3, label: 'Mood History', color: 'from-pink-400 to-rose-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
  { to: '/self-care', icon: Heart, label: 'Self Care Tips', color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
];

const recentActivities = [
  { icon: BookOpen, text: 'Wrote a journal entry', time: '2 hours ago', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { icon: Wind, text: 'Completed 10-min meditation', time: '5 hours ago', color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' },
  { icon: MessageCircle, text: 'Chat session with AI', time: 'Yesterday', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' },
  { icon: BarChart3, text: 'Logged mood: Calm', time: '2 days ago', color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20' },
];

const DashboardPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const firstName = user?.name?.split(' ')[0] || 'Khushi';

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    addToast(`Mood logged: ${mood} ✓`, 'success');
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-indigo-200 font-medium mb-1">{getGreeting()} 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Hello, {firstName}!
            </h1>
            <p className="text-indigo-200">How are you feeling today?</p>
          </div>
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-indigo-200">Day Streak</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">87%</div>
              <div className="text-xs text-indigo-200">Wellness Score</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-indigo-200">Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Check-in */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Daily Mood Check-in</h2>
            <p className="text-sm text-slate-400">Select how you're feeling right now</p>
          </div>
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {moods.map(({ mood, emoji }) => (
            <MoodCard
              key={mood}
              mood={mood}
              emoji={emoji}
              selected={selectedMood === mood}
              onClick={handleMoodSelect}
            />
          ))}
        </div>
        {selectedMood && (
          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl animate-fade-in">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
              ✓ Mood logged: You're feeling <strong>{selectedMood}</strong> today.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map(({ to, icon: Icon, label, color, bg }) => (
            <Link
              key={to}
              to={to}
              className={`${bg} rounded-2xl p-4 text-center card-hover border border-white/50 dark:border-slate-700 group`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800 dark:text-white">Weekly Overview</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-end gap-2 h-32">
            {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-400 transition-all duration-500"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <div className="text-sm font-bold text-emerald-600">7/7</div>
              <div className="text-xs text-slate-400">Check-ins</div>
            </div>
            <div className="flex-1 text-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
              <div className="text-sm font-bold text-indigo-600">5/7</div>
              <div className="text-xs text-slate-400">Meditations</div>
            </div>
            <div className="flex-1 text-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <div className="text-sm font-bold text-amber-600">3/7</div>
              <div className="text-xs text-slate-400">Journals</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800 dark:text-white">Recent Activity</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.map(({ icon: Icon, text, time, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{text}</p>
                  <p className="text-xs text-slate-400">{time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/mood-tracker" className="mt-4 flex items-center gap-1 text-sm text-indigo-500 font-medium hover:gap-2 transition-all">
            View all activity <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
        <div className="flex items-start gap-4">
          <div className="text-4xl animate-float">🌱</div>
          <div>
            <p className="text-slate-700 dark:text-slate-200 font-medium italic text-base leading-relaxed">
              "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
            </p>
            <p className="text-sm text-slate-400 mt-2">— Noam Shpancer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
