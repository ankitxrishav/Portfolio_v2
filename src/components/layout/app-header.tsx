"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code2, Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#about', label: 'About Me' },
  { href: '/#journey', label: 'Journey' },
  { href: '/#contact', label: 'Contact' },
];

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link on the same page
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }

  return (
    <>
      <header id="app-header" className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-screen-md -translate-x-1/2">
        <div className="flex h-16 items-center justify-between rounded-full border border-border/40 bg-card/80 px-4 shadow-lg backdrop-blur-lg supports-[backdrop-filter]:bg-card/60 md:px-6">
          <Link
            href="/#home"
            className="flex items-center space-x-2 font-headline font-bold text-foreground hover:text-accent transition-colors"
            onClick={handleLogoClick}
          >
            <Code2 className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
            <span className="text-base sm:text-lg">Ankit Kumar</span>
          </Link>
          <div className="flex items-center space-x-1 md:space-x-2">
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button key={item.href} variant="ghost" asChild
                  className="text-sm font-bold transition-all duration-300 text-foreground/80 hover:text-accent hover:bg-transparent"
                >
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.label}</Link>
                </Button>
              ))}
            </nav>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-foreground/70 transition-transform duration-200 hover:scale-110"
              >
                <div className="relative h-6 w-6">
                  <Menu className={cn("absolute inset-0 m-auto h-6 w-6 transition-all duration-300", isMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
                  <X className={cn("absolute inset-0 m-auto h-6 w-6 transition-all duration-300", isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-opacity duration-300 ease-in-out md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "animated-underline text-2xl font-semibold text-foreground transition-all duration-300 hover:text-accent",
                isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              )}
              style={{ transitionDelay: isMenuOpen ? `${100 + index * 50}ms` : '0ms' }}
              onClick={(e) => {
                e.stopPropagation();
                handleNavClick(e, item.href);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

