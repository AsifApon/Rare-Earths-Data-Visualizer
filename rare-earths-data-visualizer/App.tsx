
import React from 'react';
import DashboardContent from './components/DashboardContent';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Rare Earths Data Visualizer</h1>
          <p className="text-sm text-slate-300">Insights from U.S. Geological Survey & Gemini API</p>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardContent />
      </main>
      <footer className="text-center py-4 text-sm text-slate-500">
        <p>Data based on U.S. Geological Survey, Mineral Commodity Summaries, January 2025 (simulated data extraction from OCR).</p>
        <p>&copy; 2024 AI Generated Application</p>
      </footer>
    </div>
  );
};

export default App;
