import React, { useState } from 'react';
import LandingView from './views/LandingView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import UniversalBridge from './views/UniversalBridge';

type ViewState = 'landing' | 'login' | 'dashboard' | 'bridge';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  const handleEnter = () => setView('login');
  const handleLogin = () => setView('dashboard');
  const handleLogout = () => setView('landing');
  const handleTryBridge = () => setView('bridge');

  return (
    <div className="w-full min-h-screen">
      {view === 'landing' && <LandingView onEnter={handleEnter} onTry={handleTryBridge} />}
      {view === 'login' && <LoginView onLogin={handleLogin} />}
      {view === 'dashboard' && <DashboardView onLogout={handleLogout} />}
      {view === 'bridge' && <UniversalBridge onBack={handleLogout} />}
    </div>
  );
};

export default App;
