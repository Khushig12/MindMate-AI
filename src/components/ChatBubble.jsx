import React from 'react';

const ChatBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  if (isTyping) {
    return (
      <div className="flex items-end gap-3 mb-4">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          AI
        </div>
        <div className="chat-bubble-ai px-4 py-3">
          <div className="flex gap-1 items-center h-5">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          AI
        </div>
      )}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          K
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} px-4 py-3`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
