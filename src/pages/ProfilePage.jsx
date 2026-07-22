import React, { useState } from 'react';
import { User, Mail, Calendar, Phone, Shield, Camera, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Khushi Patel',
    email: user?.email || 'khushi@example.com',
    age: '24',
    gender: 'Female',
    phone: '+91 98765 43210',
    emergencyContact: '+91 91234 56789',
    bio: 'Mental wellness enthusiast. Practicing mindfulness daily. 🌿',
  });

  const handleSave = () => {
    login({ ...user, name: form.name, email: form.email }, localStorage.getItem('mindmate_token'));
    setEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    addToast('Logged out. Take care! 💙', 'info');
  };

  const stats = [
    { label: 'Day Streak', value: '12', emoji: '🔥' },
    { label: 'Journals', value: '23', emoji: '📓' },
    { label: 'Sessions', value: '41', emoji: '🧘' },
    { label: 'Wellness Score', value: '87%', emoji: '💚' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-2 border-white/30 shadow-xl">
              👩‍💻
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-md hover:bg-indigo-50 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{form.name}</h1>
            <p className="text-indigo-200 text-sm">{form.email}</p>
            <p className="text-indigo-100 text-sm mt-1 italic">"{form.bio}"</p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-sm font-medium"
            >
              <Edit2 className="w-4 h-4" />
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          {stats.map(({ label, value, emoji }) => (
            <div key={label} className="text-center">
              <div className="text-lg">{emoji}</div>
              <div className="text-xl font-bold">{value}</div>
              <div className="text-xs text-indigo-200">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-800 dark:text-white">Personal Information</h2>
          {editing && (
            <button onClick={handleSave} className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: User, label: 'Full Name', key: 'name' },
            { icon: Mail, label: 'Email Address', key: 'email' },
            { icon: Calendar, label: 'Age', key: 'age' },
            { icon: User, label: 'Gender', key: 'gender', type: 'select', options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'] },
            { icon: Phone, label: 'Phone', key: 'phone' },
            { icon: Shield, label: 'Emergency Contact', key: 'emergencyContact' },
          ].map(({ icon: Icon, label, key, type, options }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                <Icon className="w-3.5 h-3.5" /> {label}
              </label>
              {editing ? (
                type === 'select' ? (
                  <select
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )
              ) : (
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 px-3 py-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl">{form[key]}</p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <div className="mt-4">
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        )}
      </div>

      {/* Quick Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
        <h2 className="font-bold text-slate-800 dark:text-white mb-4">Quick Settings</h2>
        <div className="space-y-3">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3.5 rounded-2xl border-2 border-red-200 dark:border-red-800 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
