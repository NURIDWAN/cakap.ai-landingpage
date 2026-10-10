import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { SquircleIcon } from '../ui/SquircleIcon';
import { Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenDashboard: () => void;
  onOpenDemoWidget?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-4 pb-2 transition-all">
      <div className="max-w-6xl mx-auto flex justify-center">
        {/* Mobbin nav-pill: detached from top, centered stadium pill in canvas-soft #f3f3f3 */}
        <nav
          className={`w-full max-w-5xl bg-canvas-soft/95 backdrop-blur-md border border-hairline-soft rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all ${
            isScrolled ? 'border-hairline shadow-none' : ''
          }`}
        >
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 select-none">
            <SquircleIcon size="sm" className="bg-ink text-on-primary border-0">
              <span className="text-xs font-bold tracking-tight">C</span>
            </SquircleIcon>
            <span className="text-base font-bold tracking-tight text-ink">
              Cakap<span className="text-text-muted">.ai</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-ink">
            <a href="#fitur" className="hover:text-text-muted transition-colors">
              Fitur
            </a>
            <a href="#cara-kerja" className="hover:text-text-muted transition-colors">
              Cara Kerja
            </a>
            <a href="#use-case" className="hover:text-text-muted transition-colors">
              Use Case
            </a>
            <a href="#harga" className="hover:text-text-muted transition-colors">
              Harga
            </a>
            <a href="#faq" className="hover:text-text-muted transition-colors">
              FAQ
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dasbor</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenDashboard}
            >
              Coba Gratis 14 Hari ↗
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-ink p-1 rounded-full hover:bg-canvas transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-sm mx-auto mt-2 bg-canvas-soft border border-hairline rounded-md p-5 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium text-ink">
            <a
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-text-muted"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-text-muted"
            >
              Cara Kerja
            </a>
            <a
              href="#use-case"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-text-muted"
            >
              Use Case
            </a>
            <a
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-text-muted"
            >
              Harga
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-text-muted"
            >
              FAQ
            </a>
          </div>
          <div className="pt-3 border-t border-hairline flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Buka Dasbor SaaS</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full"
            >
              Coba Gratis 14 Hari ↗
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
