import React, { useState } from 'react';
import {
  Bell, Lock, Globe, Palette, Trash2, Info, ChevronRight,
  Shield, Sun, Moon, Volume2, Smartphone, Mail, Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${enabled ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}
  >
    <div className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
);

const SettingsSection = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
    <div className="px-5 py-3 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{title}</h3>
    </div>
    <div className="divide-y divide-slate-50 dark:divide-slate-700">
      {children}
    </div>
  </div>
);

const SettingsRow = ({ icon: Icon, label, desc, children, onClick, iconColor = 'text-slate-500' }) => (
  <div
    className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center`}>
        <Icon className={`w-4.5 h-4.5 ${iconColor}`} style={{ width: '18px', height: '18px' }} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
        {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
      </div>
    </div>
    {children || (onClick && <ChevronRight className="w-4 h-4 text-slate-400" />)}
  </div>
);

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [notifs, setNotifs] = useState({
    daily: true,
    reminders: true,
    tips: false,
    email: true,
    push: true,
  });

  const [privacy, setPrivacy] = useState({
    analytics: true,
    datasharing: false,
    activity: true,
  });

  const [lang, setLang] = useState('English');
  const [deleteModal, setDeleteModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const toggle = (setter, key) => setter(p => ({ ...p, [key]: !p[key] }));

  const handleDelete = () => {
    addToast('Account deletion requested. We\'re sorry to see you go. 💙', 'info');
    setDeleteModal(false);
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <SettingsSection title="Notifications">
        <SettingsRow icon={Bell} label="Daily Check-in Reminders" desc="Get a gentle nudge each day" iconColor="text-amber-500">
          <Toggle enabled={notifs.daily} onToggle={() => toggle(setNotifs, 'daily')} />
        </SettingsRow>
        <SettingsRow icon={Smartphone} label="Meditation Reminders" desc="Reminders to meditate" iconColor="text-indigo-500">
          <Toggle enabled={notifs.reminders} onToggle={() => toggle(setNotifs, 'reminders')} />
        </SettingsRow>
        <SettingsRow icon={Volume2} label="Wellness Tips" desc="Daily self-care suggestions" iconColor="text-emerald-500">
          <Toggle enabled={notifs.tips} onToggle={() => toggle(setNotifs, 'tips')} />
        </SettingsRow>
        <SettingsRow icon={Mail} label="Email Notifications" desc="Weekly progress reports" iconColor="text-blue-500">
          <Toggle enabled={notifs.email} onToggle={() => toggle(setNotifs, 'email')} />
        </SettingsRow>
      </SettingsSection>

      {/* Privacy */}
      <SettingsSection title="Privacy & Data">
        <SettingsRow icon={Shield} label="Usage Analytics" desc="Help improve MindMate" iconColor="text-purple-500">
          <Toggle enabled={privacy.analytics} onToggle={() => toggle(setPrivacy, 'analytics')} />
        </SettingsRow>
        <SettingsRow icon={Eye} label="Activity Visibility" desc="Allow insights from your activity" iconColor="text-cyan-500">
          <Toggle enabled={privacy.activity} onToggle={() => toggle(setPrivacy, 'activity')} />
        </SettingsRow>
        <SettingsRow icon={Lock} label="Manage Data" desc="View and export your data" onClick={() => addToast('Data export requested — check your email!', 'info')} iconColor="text-rose-500" />
      </SettingsSection>

      {/* Language */}
      <SettingsSection title="Language & Region">
        <SettingsRow icon={Globe} label="Language" desc={`Currently set to ${lang}`} iconColor="text-indigo-500">
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="text-sm text-slate-700 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer"
          >
            {['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese'].map(l => (
              <option key={l} className="dark:bg-slate-800">{l}</option>
            ))}
          </select>
        </SettingsRow>
      </SettingsSection>

      {/* Theme */}
      <SettingsSection title="Appearance">
        <SettingsRow
          icon={darkMode ? Moon : Sun}
          label="Dark Mode"
          desc={darkMode ? 'Dark theme is active' : 'Light theme is active'}
          iconColor={darkMode ? 'text-indigo-400' : 'text-amber-400'}
        >
          <Toggle enabled={darkMode} onToggle={toggleDarkMode} />
        </SettingsRow>
        <SettingsRow icon={Palette} label="App Theme" desc="Personalize your color scheme" onClick={() => addToast('Custom themes coming soon! 🎨', 'info')} iconColor="text-pink-500" />
      </SettingsSection>

      {/* About */}
      <SettingsSection title="About">
        <SettingsRow icon={Info} label="About MindMate" desc="Version 1.0.0" onClick={() => setAboutModal(true)} iconColor="text-slate-500" />
        <SettingsRow icon={Lock} label="Privacy Policy" onClick={() => addToast('Opening privacy policy...', 'info')} iconColor="text-slate-500" />
        <SettingsRow icon={Shield} label="Terms of Service" onClick={() => addToast('Opening terms of service...', 'info')} iconColor="text-slate-500" />
      </SettingsSection>

      {/* Delete Account */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800 p-5">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">Delete Account</h3>
            <p className="text-sm text-red-500/80 dark:text-red-400/80 mb-3">
              This will permanently delete all your data including journals, mood logs, and settings. This action cannot be undone.
            </p>
            <button
              onClick={() => setDeleteModal(true)}
              className="text-sm font-semibold text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 px-4 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Account" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
            Are you absolutely sure? All your journals, mood data, and settings will be permanently deleted.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Cancel
            </button>
            <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
              Delete Forever
            </button>
          </div>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal isOpen={aboutModal} onClose={() => setAboutModal(false)} title="About MindMate" size="sm">
        <div className="text-center">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">MindMate</h3>
          <p className="text-sm text-slate-400 mb-4">Version 1.0.0</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            MindMate is an AI-powered mental health companion designed to support your emotional wellness journey. 
            We believe mental health support should be accessible to everyone, anytime.
          </p>
          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              💙 Built with care for your wellbeing
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
