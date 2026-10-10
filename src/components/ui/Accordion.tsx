import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-canvas-soft rounded-sm transition-all overflow-hidden border border-hairline-soft"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full py-4 px-6 text-left flex items-center justify-between text-ink hover:text-ink-soft select-none"
            >
              <span className="text-base font-semibold pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-text-muted transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-text-muted text-sm leading-relaxed border-t border-hairline/40">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
