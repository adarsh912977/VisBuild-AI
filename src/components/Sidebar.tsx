import React from 'react';
import { NavPath } from '../types/civic';

interface SidebarProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems: { path: NavPath; label: string; icon: string }[] = [
    { path: 'overview-dashboard', label: 'Overview / Dashboard', icon: 'space_dashboard' },
    { path: 'new-infrastructure-audit', label: 'New Infrastructure Audit', icon: 'add_a_photo' },
    { path: 'audit-results-vision-ai-findings', label: 'Audit & Vision Findings', icon: 'travel_explore' },
    { path: 'three-improvement-plans', label: 'Three Improvement Plans', icon: 'architecture' },
    { path: 'plan-comparison-matrix', label: 'Plan Comparison Matrix', icon: 'compare_arrows' },
    { path: 'detailed-project-roadmap', label: 'Detailed Project Roadmap', icon: 'route' },
    { path: 'reports-export', label: 'Reports & Export (PDF)', icon: 'picture_as_pdf' },
    { path: 'settings-cost-benchmarks', label: 'Settings & Benchmarks', icon: 'tune' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-[#0f1e36] text-white z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.12)] transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Header Title Bar */}
          <div className="h-16 px-6 flex items-center justify-between bg-[#000412] border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#006591] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-white text-[20px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[18px] text-white tracking-tight leading-none">
                  VisBuild AI
                </span>
                <span className="text-[11px] text-[#89ceff] font-semibold uppercase tracking-wider mt-1">
                  Civic Tech OS
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              className="lg:hidden text-[#7886a3] hover:text-white transition-colors p-1"
              type="button"
              onClick={onCloseMobile}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Standards & Currency Ribbon */}
          <div className="px-4 py-2.5">
            <div className="bg-[#000412]/80 border border-white/5 rounded-lg p-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">verified</span>
                <span className="text-[#eaf1ff] font-medium text-[11px]">INR (₹) Standard</span>
              </div>
              <span className="text-[11px] bg-white/10 text-[#c9e6ff] px-2 py-0.5 rounded font-mono font-medium">
                FY 2026-27
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    onNavigate(item.path);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-[#006591] text-white font-semibold shadow-xs'
                      : 'text-[#7886a3] hover:bg-[#000412]/60 hover:text-white'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-white' : 'text-[#89ceff]/80'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Platform Telemetry Footer */}
        <div className="p-4 bg-[#000412]/60 m-3 rounded-lg border border-white/5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-[#7886a3]">
            <span className="text-[11px] uppercase font-semibold tracking-wider">Platform Health</span>
            <span className="text-[11px] text-[#6ffbbe] font-mono font-bold">99.8%</span>
          </div>
          <div className="w-full bg-[#000412] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4edea3] h-full w-[99.8%] rounded-full"></div>
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px] text-[#7886a3]">
            <span>Urban Inference Cluster #3</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
          </div>
        </div>
      </aside>
    </>
  );
};
