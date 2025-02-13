'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

type NavigationItem = {
  label: string;
  href: string;
};

const navigationItems: NavigationItem[] = [
  { label: 'Дышать', href: '/breathe' },
  { label: 'Календарь эмоций', href: '/calendar' },
  // { label: 'Выбрать психолога', href: '/psychologist' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentItem = navigationItems.find(item =>
    pathname.startsWith(item.href)
  ) || navigationItems[0];

  return (
    <header className="w-full bg-white">
      <nav className="w-full flex justify-between items-center p-4 sm:p-10">


        {/* Center: Navigation Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-[24px] font-bold"
            style={{ color: '#456cf5' }}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="navigation-menu"
          >
            {currentItem.label}
            <ChevronDown
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              size={24}
            />
          </button>

          {isOpen && (
            <div
              id="navigation-menu"
              className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
              role="menu"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-[18px] hover:bg-blue-50 transition-colors"
                  style={{ color: '#456cf5' }}
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {/* Left: Logo */}
        <span className="italic font-bold text-[24px]" style={{ color: '#456cf5' }}>
          Сенти ✨
        </span>

        {/* Right: Year */}
        {/* <span className="text-[24px] font-bold" style={{ color: '#456cf5' }}>
          2025
        </span> */}
      </nav>
    </header>
  );
}