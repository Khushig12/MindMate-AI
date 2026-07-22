import React, { useState } from 'react';
import { Plus, Save, BookOpen, Calendar, Tag } from 'lucide-react';
import JournalCard from '../components/JournalCard';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/helpers';

const moodOptions = [
  { emoji: '😊', mood: 'Happy' },
  { emoji: '😔', mood: 'Sad' },
  { emoji: '😌', mood: 'Calm' },
  { emoji: '😰', mood: 'Anxious' },
  { emoji: '😴', mood: 'Tired' },
  { emoji: '😡', mood: 'Angry' },
];

const sampleJournals = [
  {
    id: 1,
    title: 'A Day of Small Wins',
    content: 'Today was actually pretty good. I managed to finish my morning routine without rushing, had a healthy breakfast, and took a short walk in the park. The fresh air really helped clear my head. I also managed to have a difficult conversation with my colleague that had been weighing on me.',
    date: new Date(Date.now() - 86400000 * 1),
    mood: '😊',
    tags: 'Gratitude',
  },
  {
    id: 2,
    title: 'Dealing with Uncertainty',
    content: 'I\'ve been feeling anxious about the upcoming presentation at work. Every time I think about it, I feel my chest tighten. But I remembered what I learned in meditation — to focus on the present moment. I tried the breathing exercise and it actually helped.',
    date: new Date(Date.now() - 86400000 * 3),
    mood: '😰',
    tags: 'Work',
  },
  {
    id: 3,
    title: 'Grateful for Friends',
    content: 'Had a wonderful evening with friends. We watched a movie, ordered food, and just laughed for hours. I realized how much I\'ve been isolating myself lately, and how healing human connection is.',
    date: new Date(Date.now() - 86400000 * 7),
    mood: '😌',
    tags: 'Relationships',
  },
];

const JournalPage = () => {
  const [journals, setJournals] = useState(sampleJournals);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', mood: '', tags: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { addToast } = useToast();

  const openNew = () => {
    setEditingJournal(null);
    setForm({ title: '', content: '', mood: '', tags: '' });
    setModalOpen(true);
  };

  const openEdit = (journal) => {
    setEditingJournal(journal);
    setForm({ title: journal.title, content: journal.content, mood: journal.mood, tags: journal.tags || '' });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.content.trim()) { addToast('Please write something in your journal', 'warning'); return; }
    if (editingJournal) {
      setJournals(prev => prev.map(j => j.id === editingJournal.id ? { ...j, ...form, date: new Date() } : j));
      addToast('Journal entry updated! ✓', 'success');
    } else {
      const newEntry = { id: Date.now(), ...form, date: new Date() };
      setJournals(prev => [newEntry, ...prev]);
      addToast('Journal entry saved! ✓', 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setJournals(prev => prev.filter(j => j.id !== id));
    setDeleteConfirm(null);
    addToast('Journal entry deleted', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Journal</h1>
          <p className="text-slate-400 text-sm mt-0.5">Your private space to reflect and grow</p>
        </div>
        <button
          onClick={openNew}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          New Entry
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Entries', value: journals.length, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'This Week', value: '3', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Day Streak', value: '7', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 text-center border border-white/50 dark:border-slate-700`}>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Journal Entries */}
      {journals.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <BookOpen className="w-16 h-16 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-2">No journal entries yet</h3>
          <p className="text-slate-400 text-sm mb-6">Start capturing your thoughts and emotions</p>
          <button onClick={openNew} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold">
            Write First Entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journals.map(journal => (
            <JournalCard key={journal.id} journal={journal} onEdit={openEdit} onDelete={(id) => setDeleteConfirm(id)} />
          ))}
        </div>
      )}

      {/* Write/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingJournal ? 'Edit Journal Entry' : 'New Journal Entry'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title (optional)</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="Give your entry a title..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">How are you feeling?</label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map(({ emoji, mood }) => (
                  <button
                    key={mood}
                    onClick={() => setForm(p => ({ ...p, mood: emoji }))}
                    className={`px-3 py-2 rounded-xl text-sm border transition-all ${form.mood === emoji ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'}`}
                  >
                    {emoji} {mood}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Tag className="w-3.5 h-3.5 inline mr-1" />Tags
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="e.g. Work, Family, Growth"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your Thoughts</label>
            <textarea
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              placeholder="Let your thoughts flow freely... This is your safe space."
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none scrollbar-thin"
            />
            <p className="text-right text-xs text-slate-400 mt-1">{form.content.length} characters</p>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              <Save className="w-4 h-4" />
              {editingJournal ? 'Update Entry' : 'Save Journal'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Entry" size="sm">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default JournalPage;
