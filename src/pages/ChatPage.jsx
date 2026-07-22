import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Info } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { formatTime } from '../utils/helpers';

const suggestedQuestions = [
  'I feel stressed',
  'I\'m anxious',
  'Help me sleep',
  'Motivate me',
  'I\'m feeling lonely',
  'I need to calm down',
];

const aiResponses = {
  'I feel stressed': 'I hear you — stress can feel really overwhelming. Let\'s take a moment together. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system and helps calm your body. Would you like to talk about what\'s causing the stress? 💙',
  'I\'m anxious': 'Anxiety can be so difficult to carry. You\'re not alone in this. 🤝 A grounding technique that often helps: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment. Want to explore what\'s triggering your anxiety?',
  'Help me sleep': 'Getting good sleep is so important for mental health. Here are some things that can help:\n\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Try a relaxing bedtime routine\n• Keep your room cool and dark\n• Practice progressive muscle relaxation\n\nWould you like to try a guided sleep meditation? 🌙',
  'Motivate me': 'You are stronger than you think! 💪 Remember — every big journey begins with a single step. You don\'t have to have everything figured out right now. What matters is that you\'re here, trying, and that alone is something to be proud of.\n\nWhat\'s one small thing you could do today to move forward? ✨',
  'I\'m feeling lonely': 'Loneliness is a deeply human feeling, and I\'m glad you shared it with me. 💙 Even when we feel most alone, there are always people who care. Sometimes reaching out — just like you\'re doing now — is the most courageous step.\n\nWould you like to explore some ways to build meaningful connections?',
  'I need to calm down': 'I\'m here with you. 🌿 Let\'s breathe together: Take a slow, deep breath in through your nose for 4 counts... hold for 2... and slowly release through your mouth for 6 counts.\n\nRepeat this a few times. Your nervous system will begin to settle. What happened that\'s made you feel this way?',
  default: 'Thank you for sharing that with me. I\'m here to listen and support you. 💙 Your feelings are valid, and it\'s okay to feel the way you do.\n\nCould you tell me more about what you\'re experiencing? The more you share, the better I can support you on your wellness journey.',
};

const getAIResponse = (input) => {
  const lower = input.toLowerCase();
  if (lower.includes('stress')) return aiResponses['I feel stressed'];
  if (lower.includes('anxi')) return aiResponses['I\'m anxious'];
  if (lower.includes('sleep')) return aiResponses['Help me sleep'];
  if (lower.includes('motiv')) return aiResponses['Motivate me'];
  if (lower.includes('lone') || lower.includes('alone')) return aiResponses['I\'m feeling lonely'];
  if (lower.includes('calm')) return aiResponses['I need to calm down'];
  return aiResponses.default;
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi there! 👋 I\'m MindMate AI, your compassionate mental health companion. I\'m here to listen, support, and guide you through your emotional journey.\n\nHow are you feeling today? You can share anything — this is a safe, private space. 💙',
      isUser: false,
      timestamp: formatTime(new Date()),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), text: text.trim(), isUser: true, timestamp: formatTime(new Date()) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg = {
      id: Date.now() + 1,
      text: getAIResponse(text),
      isUser: false,
      timestamp: formatTime(new Date()),
    };
    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: 'Chat cleared. I\'m still here whenever you need me. 💙',
      isUser: false,
      timestamp: formatTime(new Date()),
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 dark:text-white">MindMate AI</h2>
            <p className="text-xs text-emerald-500 font-medium">● Online & ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Clear
          </button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <Info className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin space-y-1">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
          ))}
          {isTyping && <ChatBubble isTyping />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-5 pb-3 border-t border-slate-100 dark:border-slate-700 pt-3">
          <p className="text-xs text-slate-400 mb-2 font-medium">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-5 pb-5 pt-2">
          <div className="flex items-end gap-3 bg-slate-50 dark:bg-slate-700 rounded-2xl p-2 border border-slate-200 dark:border-slate-600 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Share what's on your mind..."
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none max-h-32 py-2 px-1 scrollbar-thin"
              style={{ minHeight: '36px' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            MindMate AI provides emotional support, not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
