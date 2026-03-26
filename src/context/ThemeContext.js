import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#F9FAFB',
  text: '#111827',
  card: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#3B82F6',

  summaryBg: '#DBEAFE',
  summaryText: '#1E40AF',
 
  incomeBg: '#ECFDF5',
  expenseBg: '#FEF2F2'
};  

const darkTheme = {
  background: '#111827',
  text: '#F9FAFB',
  card: '#1F2937',
  border: '#374151',
  primary: '#60A5FA',

  summaryBg: '#1E3A8A', 
  summaryText: '#BFDBFE',
  
  incomeBg: '#064E3B', 
  expenseBg: '#3F1D1D' 
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