import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Calendar, BarChart3, PieChart as PieIcon } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', mood: 4, value: 4 },
  { day: 'Tue', mood: 3, value: 3 },
  { day: 'Wed', mood: 5, value: 5 },
  { day: 'Thu', mood: 2, value: 2 },
  { day: 'Fri', mood: 4, value: 4 },
  { day: 'Sat', mood: 5, value: 5 },
  { day: 'Sun', mood: 4, value: 4 },
];

const monthlyData = [
  { week: 'Week 1', avg: 3.8 },
  { week: 'Week 2', avg: 4.2 },
  { week: 'Week 3', avg: 3.5 },
  { week: 'Week 4', avg: 4.6 },
];

const pieData = [
  { name: 'Happy', value: 35, color: '#f59e0b' },
  { name: 'Calm', value: 28, color: '#10b981' },
  { name: 'Sad', value: 12, color: '#6366f1' },
  { name: 'Anxious', value: 10, color: '#8b5cf6' },
  { name: 'Tired', value: 9, color: '#94a3b8' },
  { name: 'Angry', value: 6, color: '#ef4444' },
];

const calendarMoods = {
  '2025-01-01': '😊', '2025-01-02': '😌', '2025-01-03': '😰',
  '2025-01-04': '😊', '2025-01-05': '😴', '2025-01-06': '😊',
  '2025-01-07': '😌',
};

const moodToScore = { '😊': 5, '😌': 4, '😴': 3, '😰': 2, '😔': 2, '😡': 1 };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 text-sm">
        <p className="font-semibold text-slate-700 dark:text-white mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>{entry.name}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const tabs = ['Weekly', 'Monthly', 'Calendar', 'Stats'];

const MoodTrackerPage = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mood Tracker</h1>
          <p className="text-slate-400 text-sm mt-0.5">Understand your emotional patterns</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Mood', value: '4.2/5', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Best Day', value: 'Saturday', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Check-ins', value: '28', icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Top Mood', value: 'Happy 😊', icon: PieIcon, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 border border-white/50 dark:border-slate-700`}>
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Content */}
      {activeTab === 'Weekly' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Weekly Mood Overview</h3>
          <p className="text-sm text-slate-400 mb-5">Your mood scores from 1 (low) to 5 (great)</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={3} fill="url(#moodGrad)" dot={{ fill: '#6366f1', r: 5 }} name="Mood Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'Monthly' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Monthly Mood Trend</h3>
          <p className="text-sm text-slate-400 mb-5">Average mood per week this month</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg" radius={[8, 8, 0, 0]} name="Avg Mood">
                {monthlyData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${240 + i * 20}, 70%, ${60 + i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'Calendar' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Mood Calendar</h3>
          <p className="text-sm text-slate-400 mb-5">January 2025</p>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-xs font-medium text-slate-400 text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Offset for Wednesday start */}
            {Array.from({ length: 3 }).map((_, i) => <div key={`blank-${i}`} />)}
            {days.map(day => {
              const key = `2025-01-${String(day).padStart(2, '0')}`;
              const emoji = calendarMoods[key];
              return (
                <div
                  key={day}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs cursor-pointer transition-all
                    ${emoji ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700' : 'bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700'}
                    hover:border-indigo-400`}
                >
                  <span className="text-slate-400 dark:text-slate-500 font-medium">{day}</span>
                  {emoji && <span className="text-base leading-none">{emoji}</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'Stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Mood Distribution</h3>
            <p className="text-sm text-slate-400 mb-4">Percentage of each mood this month</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, 'Frequency']} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Mood Breakdown</h3>
            <div className="space-y-3">
              {pieData.map(({ name, value, color }) => (
                <div key={name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{name}</span>
                    <span className="font-bold" style={{ color }}>{value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerPage;
