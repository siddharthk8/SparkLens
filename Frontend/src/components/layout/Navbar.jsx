import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Sun, Moon, Laptop, ArrowUpRight } from "lucide-react";
import { Link, scroller } from "react-scroll";
import { navLinks } from "../../Data/Data.jsx";
import { SparkLensLogo } from "../common/SparkLensLogo";

const getSavedSections = () => {
  if (typeof window === "undefined") return ["home"];
  try {
    const saved = localStorage.getItem("activeSections");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const valid = parsed.filter((href) => navLinks.some((l) => l.href === href));
        if (valid.length > 0) return valid;
      }
    }
  } catch {
    // Ignore read error
  }
  return ["home"];
};

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSections, setActiveSections] = useState(getSavedSections);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("sparklens_theme") || "dark";
      } catch {
        return "dark";
      }
    }
    return "dark";
  });

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const progressBarRef = useRef(null);
  const isAutoScrollingRef = useRef(false);
  const userInteractedRef = useRef(false);

  const applyTheme = useCallback((targetTheme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.add("theme-switching");

    let isDark = false;
    if (targetTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.setItem("sparklens_theme", "system");
      isDark = systemPrefersDark;
    } else if (targetTheme === "light") {
      localStorage.setItem("sparklens_theme", "light");
      isDark = false;
    } else if (targetTheme === "dark") {
      localStorage.setItem("sparklens_theme", "dark");
      isDark = true;
    }

    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", isDark ? "#07090e" : "#f8fafc");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.remove("theme-switching");
      });
    });
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, [applyTheme, theme]);

  // System theme change listener
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const savedTheme = localStorage.getItem("sparklens_theme");
      if (!savedTheme || savedTheme === "system") {
        const isDark = media.matches;
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute("content", isDark ? "#07090e" : "#f8fafc");
      }
    };

    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  /* Reliable Auto-Scroll to saved storage section on initial load */
  const scrollToSection = useCallback((sectionName) => {
    if (!sectionName || sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    isAutoScrollingRef.current = true;

    const attemptScroll = (retryCount = 0) => {
      if (userInteractedRef.current) {
        isAutoScrollingRef.current = false;
        return;
      }

      const el =
        document.querySelector(`[name="${sectionName}"]`) ||
        document.getElementById(sectionName) ||
        (sectionName === "home" ? document.getElementById("hero") : null);

      if (!el) {
        if (retryCount < 8) {
          setTimeout(() => attemptScroll(retryCount + 1), 100);
        } else {
          isAutoScrollingRef.current = false;
        }
        return;
      }

      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 65);

      try {
        scroller.scrollTo(sectionName, {
          duration: 750,
          smooth: "easeInOutQuart",
          offset: -65,
          ignoreCancelEvents: true,
        });
      } catch {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }

      // Fallback check after 180ms
      setTimeout(() => {
        if (userInteractedRef.current) return;
        const currentY = window.scrollY;
        if (Math.abs(currentY - targetY) > 60 && currentY < 40) {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }, 180);

      // Re-alignment check after 850ms to account for dynamic asset loads
      setTimeout(() => {
        if (userInteractedRef.current) return;
        const rect = el.getBoundingClientRect();
        if (Math.abs(rect.top - 65) > 60) {
          const finalY = Math.max(0, rect.top + window.scrollY - 65);
          window.scrollTo({ top: finalY, behavior: "smooth" });
        }
        isAutoScrollingRef.current = false;
      }, 850);
    };

    attemptScroll(0);
  }, []);

  /* Stepped progressive highlight on initial load, then scroll to saved section */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const savedSections = getSavedSections();
    const targetSection = savedSections[savedSections.length - 1];

    const markUserInteracted = () => {
      userInteractedRef.current = true;
      isAutoScrollingRef.current = false;
    };

    window.addEventListener("wheel", markUserInteracted, { passive: true, once: true });
    window.addEventListener("touchstart", markUserInteracted, { passive: true, once: true });

    // Progressive stepped highlight
    savedSections.forEach((section, index) => {
      setTimeout(() => {
        if (userInteractedRef.current) return;

        setActiveSections((prev) => (prev.includes(section) ? prev : [...prev, section]));

        if (index === savedSections.length - 1 && targetSection !== "home") {
          scrollToSection(targetSection);
        }
      }, index * 100);
    });

    return () => {
      window.removeEventListener("wheel", markUserInteracted);
      window.removeEventListener("touchstart", markUserInteracted);
    };
  }, [scrollToSection]);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Close mobile menu on Escape key */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  /* Auto-close mobile menu on desktop viewport resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Close mobile menu on outside click or scroll */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const closeOnScroll = () => {
      setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("touchstart", closeMenu);
    window.addEventListener("scroll", closeOnScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("touchstart", closeMenu);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [mobileMenuOpen]);

  /* Optimized 120fps Scroll Progress Bar using GPU scaleX with boundary edge-case detection */
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (!isAutoScrollingRef.current) {
        // Edge Case: At the very top of the page (< 40px)
        if (window.scrollY < 40) {
          setActiveSections((prev) => {
            if (prev.length === 1 && prev[0] === "home") return prev;
            return ["home"];
          });
        }
        // Edge Case: At the very bottom of the document
        else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 25) {
          const allSections = navLinks.map((l) => l.href);
          setActiveSections((prev) => {
            if (
              prev.length === allSections.length &&
              prev[prev.length - 1] === allSections[allSections.length - 1]
            )
              return prev;
            return allSections;
          });
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* Progressive Active Sections Handler: updates trail as user scrolls naturally */
  const handleSetActive = useCallback((currentHref) => {
    if (isAutoScrollingRef.current) return;

    const index = navLinks.findIndex((link) => link.href === currentHref);
    if (index === -1) return;

    const range = navLinks.slice(0, index + 1).map((link) => link.href);

    setActiveSections((prev) => {
      if (prev.length === range.length && prev[prev.length - 1] === currentHref) {
        return prev;
      }
      return range;
    });

    try {
      localStorage.setItem("activeSections", JSON.stringify(range));
    } catch {
      // Ignore storage write error
    }
  }, []);

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed top-0 z-50 w-full transform-gpu bg-white/85 dark:bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200"
    >
      {/* GPU Accelerated Real-time Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 origin-left scale-x-0 will-change-transform pointer-events-none shadow-sm"
      />

      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 h-16 flex items-center justify-between">
        {/* Brand Logo Section */}
        <Link
          to="home"
          smooth="easeInOutQuart"
          duration={650}
          spy={true}
          offset={-65}
          aria-label="SparkLens Home"
          onSetActive={() => handleSetActive("home")}
          onClick={() => setMobileMenuOpen(false)}
          className="cursor-pointer select-none shrink-0"
        >
          <SparkLensLogo size={34} withText={true} className="group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation (Displays cleanly on lg: 1024px and wider) */}
        <ul className="hidden lg:flex items-center">
          {navLinks.map((link, idx) => {
            const isActive = activeSections.includes(link.href);
            return (
              <li key={link.name} className="flex items-center relative">
                <Link
                  to={link.href}
                  smooth="easeInOutQuart"
                  duration={650}
                  spy={true}
                  offset={-65}
                  onSetActive={handleSetActive}
                  className={`relative px-3.5 xl:px-4 py-2 font-mono text-[11px] xl:text-[12px] uppercase tracking-wider cursor-pointer transition-colors duration-200 select-none ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}
                >
                  <span
                    className={`mr-1 inline-block transition-[transform,opacity] duration-200 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                    }`}
                  >
                    &gt;
                  </span>
                  {link.name}
                  {/* GPU transform underline animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-emerald-400 origin-left transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                {idx !== navLinks.length - 1 && (
                  <span
                    className={`h-px w-2 xl:w-3.5 transition-colors duration-300 ${
                      isActive ? "bg-cyan-500/50" : "bg-slate-300 dark:bg-slate-800"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Action Buttons (Theme + CTA + Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Early Access CTA on Desktop */}
          <Link
            to="coming-soon"
            smooth="easeInOutQuart"
            duration={650}
            offset={-65}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black tracking-wide text-slate-950 transition-all hover:scale-105 cursor-pointer shadow-md shrink-0 bg-gradient-to-r from-cyan-400 to-emerald-400"
          >
            <span>Early Access</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Theme Toggle (3-way: system -> light -> dark) */}
          <button
            onClick={() => {
              let nextTheme = "system";
              if (theme === "system") nextTheme = "light";
              else if (theme === "light") nextTheme = "dark";
              else if (theme === "dark") nextTheme = "system";

              setTheme(nextTheme);
              applyTheme(nextTheme);
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 transition-all cursor-pointer hover:scale-105"
            aria-label="Toggle Theme"
            title={`Current theme: ${theme} (Click to switch)`}
          >
            {theme === "system" && <Laptop size={17} className="text-cyan-500 dark:text-cyan-400" />}
            {theme === "light" && <Sun size={17} className="text-amber-500" />}
            {theme === "dark" && <Moon size={17} className="text-cyan-400" />}
          </button>

          {/* Mobile Menu Toggle (Visible below lg: 1024px) */}
          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Backdrop Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-16 backdrop-blur-sm transition-opacity duration-300 z-30 bg-black/40 dark:bg-black/70 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile / Tablet Menu Drawer */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-16 left-0 w-full z-40 transition-all duration-300 ease-out origin-top ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0e131f]/95 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <ul className="py-3">
            {navLinks.map((link, idx) => {
              const isActive = activeSections.includes(link.href);
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    smooth="easeInOutQuart"
                    duration={650}
                    spy={true}
                    offset={-65}
                    isDynamic={true}
                    onSetActive={handleSetActive}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 select-none ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block transition-[transform,opacity] duration-200 ${
                          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                        }`}
                      >
                        &gt;
                      </span>
                      {link.name}
                    </span>
                    <span
                      className={`h-0.5 w-6 rounded-full transition-colors duration-200 ${
                        isActive ? "bg-cyan-500 dark:bg-cyan-400" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    />
                  </Link>
                  {idx !== navLinks.length - 1 && (
                    <div className="h-px mx-6 bg-slate-200 dark:bg-slate-800" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
