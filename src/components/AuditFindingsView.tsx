import React, { useState } from 'react';
import { AuditSession, DeficitItem, NavPath } from '../types/civic';
import { VISBUILD_ASSETS } from '../data/mockData';

interface AuditFindingsViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
  selectedDeficitId?: string | null;
}

export const AuditFindingsView: React.FC<AuditFindingsViewProps> = ({
  session,
  onNavigate,
  selectedDeficitId: initialSelectedId,
}) => {
  const [selectedDeficitId, setSelectedDeficitId] = useState<string>(
    initialSelectedId || session.deficits[0]?.id || 'DEF-01'
  );
  const [showThermalLayer, setShowThermalLayer] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'CRITICAL' | 'MODERATE'>('ALL');
  const [advisorQuestion, setAdvisorQuestion] = useState('');
  const [advisorAnswer, setAdvisorAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const selectedDeficit =
    session.deficits.find((d) => d.id === selectedDeficitId) || session.deficits[0];

  const filteredDeficits = session.deficits.filter((d) => {
    if (filterSeverity === 'ALL') return true;
    return d.severity === filterSeverity;
  });

  const handleAskAdvisor = async (q?: string) => {
    const questionToAsk = q || advisorQuestion;
    if (!questionToAsk.trim()) return;

    setIsAsking(true);
    setAdvisorAnswer(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          context: {
            location: session.locationName,
            deficit: selectedDeficit,
            metrics: session.metrics,
          },
        }),
      });
      const data = await res.json();
      setAdvisorAnswer(data.answer || 'Consultation generated.');
    } catch (e) {
      setAdvisorAnswer(
        'According to IRC:103-2012 Clause 4.2: Tactile paving must be installed with warning blister tiles across the full 1.8m walkway width at all approach ramps and hazard intersections.'
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            Stage I Audit Report
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Computer Vision Findings & Deficit Ledger
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Instance #{session.instanceId} // {session.locationName} • Scanned in {session.inferenceDurationMs}ms
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('three-improvement-plans')}
            className="inline-flex items-center gap-2 bg-[#006591] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Proceed to 3 Improvement Plans</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#75777e] text-xs">
            <span>Thermal Index</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">thermostat</span>
          </div>
          <span className="text-2xl font-bold text-[#ba1a1a] font-mono">
            +{session.metrics.thermalIndexCelsius}°C
          </span>
          <span className="text-[11px] text-[#44474d]">Unmitigated midday solar radiation</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#75777e] text-xs">
            <span>IRC-103 Compliance</span>
            <span className="material-symbols-outlined text-[#006591] text-[18px]">accessible</span>
          </div>
          <span className="text-2xl font-bold text-[#006591] font-mono">
            {session.metrics.ircComplianceScore}%
          </span>
          <span className="text-[11px] text-[#44474d]">Critical curb cuts & tactile tiles missing</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#75777e] text-xs">
            <span>Existing Canopy Shade</span>
            <span className="material-symbols-outlined text-[#009969] text-[18px]">park</span>
          </div>
          <span className="text-2xl font-bold text-[#0b1c30] font-mono">
            {session.metrics.currentShadePercentage}%
          </span>
          <span className="text-[11px] text-[#44474d]">Deficit of 46% vs campus standard</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-[#75777e] text-xs">
            <span>Stormwater Drainage</span>
            <span className="material-symbols-outlined text-[#39b8fd] text-[18px]">water_drop</span>
          </div>
          <span className="text-2xl font-bold text-[#006591] font-mono">
            {session.metrics.stormwaterAbsorptionRate}%
          </span>
          <span className="text-[11px] text-[#44474d]">Impervious slab stagnation hazards</span>
        </div>
      </div>

      {/* Main Analysis Stage: Interactive Spatial Canvas + Deficit Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Spatial Canvas */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Controls Bar */}
          <div className="bg-white p-3 rounded-lg border border-[#e5eeff] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#0b1c30]">Visual Layers:</span>
              <button
                type="button"
                onClick={() => setShowThermalLayer(!showThermalLayer)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                  showThermalLayer
                    ? 'bg-[#ba1a1a] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#dce9ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>Solar Heatmap</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[#75777e]">Filter:</span>
              {(['ALL', 'CRITICAL', 'MODERATE'] as const).map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    filterSeverity === sev
                      ? 'bg-[#0f1e36] text-white'
                      : 'bg-[#f8f9ff] text-[#44474d] hover:bg-[#e5eeff]'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Photo Canvas */}
          <div className="relative w-full h-[440px] sm:h-[480px] rounded-xl overflow-hidden bg-[#e5eeff] shadow-inner border border-[#c5c6ce]">
            <img
              src={session.imageBeforeUrl || VISBUILD_ASSETS.heroBefore}
              alt="Corridor Deficit Scan"
              className="w-full h-full object-cover"
            />

            {/* Thermal Heatmap Gradient Overlay when toggled */}
            {showThermalLayer && (
              <div className="absolute inset-0 bg-radial from-red-600/40 via-amber-500/30 to-blue-600/10 mix-blend-multiply pointer-events-none flex items-start justify-end p-4">
                <div className="bg-[#000412]/80 backdrop-blur-md p-2 rounded text-white text-[10px] font-mono">
                  <div>Peak Surface Temp: 46.8°C</div>
                  <div>Comfort Threshold: 34.0°C</div>
                </div>
              </div>
            )}

            {/* Interactive Deficit Pins */}
            {filteredDeficits.map((deficit) => {
              const isSelected = deficit.id === selectedDeficitId;
              const isCrit = deficit.severity === 'CRITICAL';
              return (
                <div
                  key={deficit.id}
                  style={{ left: `${deficit.coordinate.x}%`, top: `${deficit.coordinate.y}%` }}
                  onClick={() => setSelectedDeficitId(deficit.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-200 group ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  {/* Pin Circle */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 text-white font-bold text-xs ${
                      isCrit
                        ? 'bg-[#ba1a1a] border-white ring-4 ring-[#ba1a1a]/30'
                        : 'bg-[#006591] border-white ring-4 ring-[#006591]/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isCrit ? 'warning' : 'info'}
                    </span>
                  </div>

                  {/* Pin Callout Badge */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap shadow-md backdrop-blur-md transition-opacity ${
                      isSelected
                        ? 'bg-[#000412] text-white opacity-100'
                        : 'bg-[#0f1e36]/80 text-[#eaf1ff] opacity-90 group-hover:opacity-100'
                    }`}
                  >
                    {deficit.id}: {deficit.title.split('(')[0].trim()}
                  </div>
                </div>
              );
            })}

            {/* Bottom Status bar */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#000412]/90 backdrop-blur-md p-2.5 rounded-lg flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span>Click any deficit marker on the spatial canvas to inspect technical details</span>
              </div>
              <span className="text-[11px] text-[#89ceff] font-mono">
                {filteredDeficits.length} Active Bottlenecks
              </span>
            </div>
          </div>
        </div>

        {/* Right: Detailed Deficit Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Active Deficit Card */}
          {selectedDeficit && (
            <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] px-2.5 py-1 rounded font-bold uppercase tracking-wider ${
                    selectedDeficit.severity === 'CRITICAL'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#dce9ff] text-[#006591]'
                  }`}
                >
                  {selectedDeficit.severity} SEVERITY
                </span>
                <span className="text-xs text-[#75777e] font-mono">{selectedDeficit.id}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0b1c30]">{selectedDeficit.title}</h3>
                <span className="text-xs text-[#006591] font-semibold block mt-0.5">
                  Category: {selectedDeficit.category}
                </span>
              </div>

              {/* Standard Citation Box */}
              <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#dce9ff] flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">gavel</span>
                  <span>Non-Compliance Standard</span>
                </div>
                <div className="text-[#44474d] font-mono text-[11px]">
                  {selectedDeficit.ircViolation}
                </div>
              </div>

              {/* Technical Impact */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#0b1c30]">Civic & Pedestrian Impact:</span>
                <p className="text-xs text-[#44474d] leading-relaxed">{selectedDeficit.impact}</p>
              </div>

              {/* Proposed Engineering Mitigation */}
              <div className="bg-[#f8f9ff] p-3.5 rounded-lg border border-[#c5c6ce]/40 flex flex-col gap-1 text-xs">
                <span className="font-bold text-[#009969] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">build_circle</span>
                  Recommended Civil Engineering Fix:
                </span>
                <p className="text-[#0b1c30] font-medium leading-relaxed">
                  {selectedDeficit.proposedFix}
                </p>
              </div>
            </div>
          )}

          {/* AI Civic Advisor Micro-Consultation */}
          <div className="bg-[#0f1e36] text-white p-4 rounded-xl flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#6ffbbe] text-[20px]">psychology</span>
              <span className="font-bold text-xs">Ask Gemini Civil Engineering Advisor</span>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'How to fix tactile paving gradient?',
                'Which tree species maximize shade in 2 seasons?',
                'Estimate cold-mix paver cost vs concrete slab',
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setAdvisorQuestion(chip);
                    handleAskAdvisor(chip);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-[#c9e6ff] text-[10px] px-2 py-1 rounded transition-colors text-left"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input & Submit */}
            <div className="flex gap-2">
              <input
                type="text"
                value={advisorQuestion}
                onChange={(e) => setAdvisorQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAdvisor()}
                placeholder="Ask about IRC-103 specs, materials, or SOR rates..."
                className="flex-1 bg-[#000412] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#7886a3] focus:outline-hidden focus:border-[#6ffbbe]"
              />
              <button
                type="button"
                disabled={isAsking}
                onClick={() => handleAskAdvisor()}
                className="bg-[#006591] hover:bg-[#0284c7] text-white px-3 py-2 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                {isAsking ? 'Thinking...' : 'Ask'}
              </button>
            </div>

            {/* Answer Display */}
            {advisorAnswer && (
              <div className="bg-[#000412]/80 border border-[#6ffbbe]/30 p-3 rounded-lg text-xs text-[#eaf1ff] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line">
                {advisorAnswer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
