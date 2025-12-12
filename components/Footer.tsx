import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-base text-gray-400">
              © {new Date().getFullYear()} Susindran D. All rights reserved.
            </p>
            <p className="mt-1 text-sm text-gray-500">
            </p>
          </div>
          
          <div className="flex gap-6 text-base font-medium text-gray-400">
             <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
             <span className="hover:text-primary transition-colors cursor-pointer">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;