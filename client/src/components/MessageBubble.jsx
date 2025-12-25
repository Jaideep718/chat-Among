import { useState } from "react";
import { HiLanguage } from "react-icons/hi2";
import { MdGTranslate } from "react-icons/md";

export const MessageBubble = ({ message, isOwnMessage }) => {
  const initialShowOriginal = isOwnMessage; 
  const [showOriginal, setShowOriginal] = useState(initialShowOriginal);

  const hasTranslation = message.translatedText && message.translatedText !== message.text;

  const displayText = (hasTranslation && !showOriginal) 
    ? message.translatedText 
    : message.text;

  return (
    <div
      className={`relative group flex flex-col ${
        isOwnMessage ? "items-end" : "items-start"
      }`}
    >
      {/* The Bubble */}
      <div
        className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all text-white relative
        ${
          isOwnMessage
            ? "bg-violet-500/30 rounded-br-none"
            : "bg-gray-700/50 rounded-bl-none"
        }`}
      >
        <p>{displayText}</p>

        {/* Translation Indicator / Toggle Button */}
        {hasTranslation && (
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`absolute -right-6 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white ${
              isOwnMessage ? "-right-6" : "-left-6"
            }`}
            title={showOriginal ? "Show Translation" : "Show Original"}
          >
            <HiLanguage size={16} />
          </button>
        )}
      </div>

      {/* Tiny label below bubble */}
      {hasTranslation && !showOriginal && (
        <span className="text-[10px] text-gray-500 mt-1 mr-1 flex items-center gap-1">
          <MdGTranslate size={10} /> Translated
        </span>
      )}
    </div>
  );
};