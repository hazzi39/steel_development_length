import React from 'react';
import ReinforcementCalculator from './components/ReinforcementCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <ReinforcementCalculator />
        </div>
      </main>
      <footer className="bg-slate-800 text-slate-300 py-4 px-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>Calculated using DummyMember.com's Reinforcement Development Length Calculator</p>
        </div>
      </footer>
    </div>
  );
}

export default App;