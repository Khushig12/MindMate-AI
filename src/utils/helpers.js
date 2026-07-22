export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });
};

export const truncate = (str, n = 100) =>
  str.length > n ? str.slice(0, n) + '...' : str;

export const getMoodColor = (mood) => {
  const colors = {
    Happy: 'from-yellow-400 to-orange-400',
    Sad: 'from-blue-400 to-blue-600',
    Angry: 'from-red-400 to-red-600',
    Anxious: 'from-purple-400 to-purple-600',
    Tired: 'from-gray-400 to-gray-600',
    Calm: 'from-green-400 to-emerald-500',
  };
  return colors[mood] || 'from-indigo-400 to-purple-500';
};

export const getMoodEmoji = (mood) => {
  const emojis = {
    Happy: '😊', Sad: '😔', Angry: '😡',
    Anxious: '😰', Tired: '😴', Calm: '😌',
  };
  return emojis[mood] || '😊';
};

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) =>
  password.length >= 8;
