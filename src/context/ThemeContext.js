import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#F9FAFB',
  text: '#111827',
  card: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#3B82F6',
  income: '#22C55E',
  expense: '#EF4444'
};

const darkTheme = {
  background: '#111827',
  text: '#F9FAFB',
  card: '#1F2937',
  border: '#374151',
  primary: '#60A5FA',
  income: '#4ADE80',
  expense: '#F87171'
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}