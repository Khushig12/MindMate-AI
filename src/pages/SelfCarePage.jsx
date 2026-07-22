import React from 'react';
import {
  Activity, Brain, Wind, Apple, Moon, Droplets, Smile,
  ArrowRight, CheckCircle, Heart
} from 'lucide-react';

const tips = [
  {
    icon: Activity,
    title: 'Exercise Daily',
    tagline: 'Move your body, lift your mood',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-100 dark:border-orange-800',
    iconBg: 'bg-orange-50 dark:bg-orange-900/30',
    iconColor: 'text-orange-500',
    tips: [
      'Aim for 30 minutes of moderate exercise daily',
      'Even a brisk 10-minute walk improves mood',
      'Try yoga or stretching to reduce tension',
      'Dancing counts as exercise — put on your favorite song!',
    ],
    benefit: 'Releases endorphins and reduces cortisol',
  },
  {
    icon: Brain,
    title: 'Meditation',
    tagline: 'Quiet the mind, find your center',
    color: 'from-indigo-400 to-purple-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-100 dark:border-indigo-800',
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/30',
    iconColor: 'text-indigo-500',
    tips: [
      'Start with just 5 minutes a day',
      'Focus on your breath — no perfection needed',
      'Use a guided meditation app for beginners',
      'Consistency beats duration in meditation practice',
    ],
    benefit: 'Reduces anxiety and improves focus',
  },
  {
    icon: Wind,
    title: 'Breathing Exercises',
    tagline: 'Breathe in calm, breathe out stress',
    color: 'from-cyan-400 to-teal-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-100 dark:border-cyan-800',
    iconBg: 'bg-cyan-50 dark:bg-cyan-900/30',
    iconColor: 'text-cyan-500',
    tips: [
      'Try 4-7-8: inhale 4s, hold 7s, exhale 8s',
      'Box breathing: 4s inhale, hold, exhale, hold',
      'Do 5 deep breaths before stressful situations',
      'Diaphragmatic breathing activates your calm response',
    ],
    benefit: 'Activates parasympathetic nervous system',
  },
  {
    icon: Apple,
    title: 'Healthy Nutrition',
    tagline: 'Nourish your body, fuel your mind',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-100 dark:border-emerald-800',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-500',
    tips: [
      'Eat omega-3 rich foods (fish, walnuts, flax)',
      'Reduce sugar and processed foods',
      'Include fermented foods for gut-brain health',
      'Don\'t skip meals — low blood sugar affects mood',
    ],
    benefit: 'Gut health is directly linked to mental health',
  },
  {
    icon: Moon,
    title: 'Sleep Hygiene',
    tagline: 'Rest well, recover fully',
    color: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-100 dark:border-violet-800',
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-500',
    tips: [
      'Maintain a consistent sleep/wake schedule',
      'Avoid screens 1 hour before bedtime',
      'Keep your bedroom cool, dark, and quiet',
      'Avoid caffeine after 2pm for better sleep quality',
    ],
    benefit: '7-9 hours of sleep is essential for mental health',
  },
  {
    icon: Droplets,
    title: 'Stay Hydrated',
    tagline: 'Water is life — stay refreshed',
    color: 'from-blue-400 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-100 dark:border-blue-800',
    iconBg: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-500',
    tips: [
      'Drink 8 glasses (2 litres) of water daily',
      'Start your morning with a glass of water',
      'Dehydration worsens anxiety and focus',
      'Herbal teas count toward your hydration goal',
    ],
    benefit: 'Even mild dehydration affects mood and cognition',
  },
  {
    icon: Smile,
    title: 'Positive Thinking',
    tagline: 'Shift your mindset, change your life',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-100 dark:border-amber-800',
    iconBg: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-500',
    tips: [
      'Practice daily gratitude — write 3 things you\'re thankful for',
      'Challenge negative thoughts with evidence',
      'Celebrate small wins — they all count',
      'Surround yourself with positive, supportive people',
    ],
    benefit: 'Rewires your brain towards resilience and joy',
  },
];

const SelfCarePage = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Self-Care Tips</h1>
        <p className="text-slate-400 text-sm mt-0.5">Evidence-based practices to support your mental wellness</p>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-7 mb-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex items-center gap-5">
          <div className="text-5xl animate-float">🌿</div>
          <div>
            <h2 className="text-xl font-bold mb-1">Your Daily Self-Care Toolkit</h2>
            <p className="text-emerald-100 max-w-xl text-sm">
              Small, consistent self-care habits compound into profound mental health improvements. 
              Pick one to focus on today.
            </p>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tips.map(({ icon: Icon, title, tagline, color, bg, border, iconBg, iconColor, tips: tipList, benefit }) => (
          <div key={title} className={`${bg} rounded-2xl p-5 border ${border} card-hover group`}>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{tagline}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {tipList.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0 mt-0.5`} />
                  {tip}
                </li>
              ))}
            </ul>

            <div className={`${iconBg} rounded-xl p-3 flex items-start gap-2`}>
              <Heart className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0 mt-0.5`} />
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfCarePage;
