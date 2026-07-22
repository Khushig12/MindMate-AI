import React, { useState } from 'react';
import { Play, Clock, Wind, Music, Moon, Sun, Pause, Timer } from 'lucide-react';
import Modal from '../components/Modal';

const categories = [
  {
    id: 1,
    title: '5 Minute Meditation',
    subtitle: 'Quick & Refreshing',
    duration: '5 min',
    icon: Sun,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-100 dark:border-amber-800',
    emoji: '☀️',
    description: 'A quick mindfulness session to reset your mind and regain focus. Perfect for busy schedules.',
    steps: [
      'Find a comfortable seated position',
      'Close your eyes gently',
      'Focus on your natural breath',
      'Let thoughts pass without judgment',
      'Return focus to breath when distracted',
    ],
  },
  {
    id: 2,
    title: '10 Minute Relaxation',
    subtitle: 'Deep Rest & Renewal',
    duration: '10 min',
    icon: Wind,
    color: 'from-indigo-400 to-purple-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-100 dark:border-indigo-800',
    emoji: '🌊',
    description: 'A deeper relaxation journey that melts away stress and restores your natural calm.',
    steps: [
      'Lie down or sit comfortably',
      'Begin with 5 deep cleansing breaths',
      'Progressively relax each muscle group',
      'Visualize a peaceful place',
      'Allow your mind to fully rest',
    ],
  },
  {
    id: 3,
    title: 'Deep Breathing',
    subtitle: 'Activate Your Calm',
    duration: '7 min',
    icon: Wind,
    color: 'from-cyan-400 to-teal-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-100 dark:border-cyan-800',
    emoji: '🌿',
    description: 'Structured breathing exercises that activate your parasympathetic nervous system instantly.',
    steps: [
      'Sit upright with shoulders relaxed',
      'Inhale slowly for 4 counts through nose',
      'Hold the breath for 7 counts',
      'Exhale completely for 8 counts',
      'Repeat cycle 4-8 times',
    ],
  },
  {
    id: 4,
    title: 'Nature Sounds',
    subtitle: 'Forest & Ocean Ambience',
    duration: '20 min',
    icon: Music,
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-100 dark:border-emerald-800',
    emoji: '🌲',
    description: 'Immersive nature soundscapes — rain, forest, ocean waves — to soothe your senses.',
    steps: [
      'Use headphones for best experience',
      'Dim the lights or go to a quiet room',
      'Close your eyes and let the sounds guide you',
      'Focus on the layers of natural sound',
      'Allow yourself to drift into peaceful awareness',
    ],
  },
  {
    id: 5,
    title: 'Sleep Music',
    subtitle: 'Drift Off Peacefully',
    duration: '30 min',
    icon: Moon,
    color: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-100 dark:border-violet-800',
    emoji: '🌙',
    description: 'Soft, calming music designed to ease you into a deep, restorative sleep.',
    steps: [
      'Prepare your sleep environment',
      'Set a timer for the session',
      'Get into your sleeping position',
      'Focus on slow, even breathing',
      'Let the music carry you to sleep',
    ],
  },
  {
    id: 6,
    title: 'Body Scan',
    subtitle: 'Full Body Awareness',
    duration: '15 min',
    icon: Sun,
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-100 dark:border-rose-800',
    emoji: '💆',
    description: 'A guided body scan meditation to release tension and reconnect with physical sensations.',
    steps: [
      'Lie comfortably on your back',
      'Start awareness at the top of your head',
      'Slowly scan down through each body part',
      'Notice and release any tension you find',
      'End with whole-body awareness',
    ],
  },
];

const MeditationPage = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRef, setTimerRef] = useState(null);

  const startSession = (session) => {
    if (timerRef) clearInterval(timerRef);
    const total = parseInt(session.duration) * 60;
    setSecondsLeft(total);
    setActiveSession(session);
    setSelectedSession(null);

    const ref = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(ref);
          setActiveSession(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerRef(ref);
  };

  const stopSession = () => {
    if (timerRef) clearInterval(timerRef);
    setActiveSession(null);
    setSecondsLeft(0);
  };

  const formatTimer = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const progress = activeSession ? 1 - (secondsLeft / (parseInt(activeSession.duration) * 60)) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Meditation</h1>
          <p className="text-slate-400 text-sm mt-0.5">Find your inner peace, one session at a time</p>
        </div>
      </div>

      {/* Active Session */}
      {activeSession && (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white animate-fade-in">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-soft" />
          </div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-float">{activeSession.emoji}</div>
            <h2 className="text-xl font-bold mb-1">{activeSession.title}</h2>
            <p className="text-indigo-200 text-sm mb-6">Session in progress...</p>

            {/* Timer Ring */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke="white" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{formatTimer(secondsLeft)}</span>
              </div>
            </div>

            <button
              onClick={stopSession}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors font-medium"
            >
              <Pause className="w-4 h-4" /> End Session
            </button>
          </div>
        </div>
      )}

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((session) => {
          const Icon = session.icon;
          return (
            <div
              key={session.id}
              className={`${session.bg} rounded-2xl p-5 border ${session.border} card-hover group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${session.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {session.duration}
                </div>
              </div>

              <div className="text-3xl mb-3">{session.emoji}</div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">{session.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{session.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSession(session)}
                  className="flex-1 text-xs py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-indigo-300 transition-colors font-medium"
                >
                  Preview
                </button>
                <button
                  onClick={() => startSession(session)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-xl bg-gradient-to-r ${session.color} text-white font-semibold hover:opacity-90 transition-opacity shadow-md`}
                >
                  <Play className="w-3.5 h-3.5" /> Start
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        title={selectedSession?.title}
        size="md"
      >
        {selectedSession && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{selectedSession.emoji}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedSession.description}</p>
              <div className="flex items-center justify-center gap-1 mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                <Timer className="w-4 h-4" /> {selectedSession.duration}
              </div>
            </div>

            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">Session Guide:</h4>
            <ol className="space-y-2 mb-6">
              {selectedSession.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${selectedSession.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <button
              onClick={() => startSession(selectedSession)}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r ${selectedSession.color} text-white font-semibold shadow-lg hover:opacity-90 transition-opacity`}
            >
              <Play className="w-4 h-4" /> Start Session
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MeditationPage;
