import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS } from '../translations';

export type LocaleType = 'zh' | 'en';

interface LocaleContextProps {
  locale: LocaleType;
  setLocale: (lang: LocaleType) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  authorizedEmail: string | null;
  authenticate: (email: string) => boolean;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [locale, setLocale] = useState<LocaleType>(() => {
    const saved = localStorage.getItem('ais_pricing_locale');
    if (saved === 'en' || saved === 'zh') return saved;
    // Fast default to zh
    return 'zh';
  });

  const [authorizedEmail, setAuthorizedEmail] = useState<string | null>(() => {
    return localStorage.getItem('sgsyen_authorized_email');
  });

  const setLocaleAndPersist = (newLocale: LocaleType) => {
    setLocale(newLocale);
    localStorage.setItem('ais_pricing_locale', newLocale);
  };

  const authenticate = (email: string) => {
    if (email && email.includes('@')) {
      const sanitized = email.trim();
      setAuthorizedEmail(sanitized);
      localStorage.setItem('sgsyen_authorized_email', sanitized);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthorizedEmail(null);
    localStorage.removeItem('sgsyen_authorized_email');
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const langDict = TRANSLATIONS[locale] || TRANSLATIONS.zh;
    let text = (langDict as any)[key] || (TRANSLATIONS.zh as any)[key] || key;
    
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  return (
    <LocaleContext.Provider value={{ 
      locale, 
      setLocale: setLocaleAndPersist, 
      t, 
      authorizedEmail, 
      authenticate, 
      logout,
      showLoginModal,
      setShowLoginModal
    }}>
      {children}
    </LocaleContext.Provider>
  );
}
