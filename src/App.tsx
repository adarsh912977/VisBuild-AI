import React, { useState } from 'react';
import { NavPath, AuditSession, BenchmarkRates } from './types/civic';
import { INITIAL_AUDIT_SESSION, DEFAULT_BENCHMARKS, SAMPLE_CORRIDOR_PRESETS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { NewAuditView } from './components/NewAuditView';
import { AuditFindingsView } from './components/AuditFindingsView';
import { ImprovementPlansView } from './components/ImprovementPlansView';
import { ComparisonMatrixView } from './components/ComparisonMatrixView';
import { ProjectRoadmapView } from './components/ProjectRoadmapView';
import { ReportsExportView } from './components/ReportsExportView';
import { SettingsView } from './components/SettingsView';
import { AiAdvisorModal } from './components/AiAdvisorModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavPath>('overview-dashboard');
  const [session, setSession] = useState<AuditSession>(INITIAL_AUDIT_SESSION);
  const [selectedDeficitId, setSelectedDeficitId] = useState<string | null>('DEF-01');
  const [activePlanId, setActivePlanId] = useState<string>('plan-b');
  const [benchmarks, setBenchmarks] = useState<BenchmarkRates>(DEFAULT_BENCHMARKS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  const handleNavigate = (path: NavPath) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuditComplete = (newSession: AuditSession) => {
    setSession(newSession);
    setSelectedDeficitId(newSession.deficits[0]?.id || 'DEF-01');
  };

  const handleSwitchCorridor = (presetId: string) => {
    const preset = SAMPLE_CORRIDOR_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSession((prev) => ({
        ...prev,
        instanceId: `VB-${Math.floor(1000 + Math.random() * 9000)}`,
        locationName: preset.name,
        corridorLengthMeters: preset.length,
        budgetCap: preset.budgetCap,
        imageBeforeUrl: preset.image,
        imageAfterUrl: preset.transformed,
      }));
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex antialiased selection:bg-[#c9e6ff] selection:text-[#001e2f]">
      {/* Navigation Spine Rail */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Working Shell */}
      <div className="w-full lg:pl-72 flex flex-col min-h-screen">
        {/* Persistent Top Header */}
        <Header
          session={session}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onSwitchCorridor={handleSwitchCorridor}
        />

        {/* Dynamic Working Stage Content */}
        <main className="w-full pt-16 flex-1 flex flex-col">
          {currentPath === 'overview-dashboard' && (
            <OverviewView
              session={session}
              onNavigate={handleNavigate}
              onSelectDeficit={(defId) => {
                setSelectedDeficitId(defId);
                handleNavigate('audit-results-vision-ai-findings');
              }}
            />
          )}

          {currentPath === 'new-infrastructure-audit' && (
            <NewAuditView
              onAuditComplete={handleAuditComplete}
              onNavigate={handleNavigate}
            />
          )}

          {currentPath === 'audit-results-vision-ai-findings' && (
            <AuditFindingsView
              session={session}
              onNavigate={handleNavigate}
              selectedDeficitId={selectedDeficitId}
            />
          )}

          {currentPath === 'three-improvement-plans' && (
            <ImprovementPlansView
              session={session}
              onNavigate={handleNavigate}
              onSelectActivePlan={(planId) => setActivePlanId(planId)}
            />
          )}

          {currentPath === 'plan-comparison-matrix' && (
            <ComparisonMatrixView
              session={session}
              onNavigate={handleNavigate}
              onSelectPlan={(planId) => setActivePlanId(planId)}
            />
          )}

          {currentPath === 'detailed-project-roadmap' && (
            <ProjectRoadmapView
              session={session}
              onNavigate={handleNavigate}
            />
          )}

          {currentPath === 'reports-export' && (
            <ReportsExportView
              session={session}
              onNavigate={handleNavigate}
              activePlanId={activePlanId}
            />
          )}

          {currentPath === 'settings-cost-benchmarks' && (
            <SettingsView
              benchmarks={benchmarks}
              onUpdateBenchmarks={(rates) => setBenchmarks(rates)}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Global AI Civic Engineering Advisor Modal */}
      <AiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        session={session}
      />
    </div>
  );
}
