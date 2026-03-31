import React, { useState } from 'react';
import LandingView from './views/LandingView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

type ViewState = 'landing' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  const handleEnter = () => setView('login');
  const handleLogin = () => setView('dashboard');
  const handleLogout = () => setView('landing');

  return (
    <div className="w-full min-h-screen">
      {view === 'landing' && <LandingView onEnter={handleEnter} />}
      {view === 'login' && <LoginView onLogin={handleLogin} />}
      {view === 'dashboard' && <DashboardView onLogout={handleLogout} />}
    </div>
  );
};

export default App;
