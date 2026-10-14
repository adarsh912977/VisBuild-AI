import React, { useState } from 'react';
import { AuditSession, ImprovementPlan, NavPath } from '../types/civic';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { VISBUILD_ASSETS } from '../data/mockData';

interface ImprovementPlansViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
  onSelectActivePlan?: (planId: string) => void;
}

export const ImprovementPlansView: React.FC<ImprovementPlansViewProps> = ({
  session,
  onNavigate,
  onSelectActivePlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-b');
  const [selectedPlanSuccessAlert, setSelectedPlanSuccessAlert] = useState<string | null>(null);

  const activePlan =
    session.plans.find((p) => p.id === selectedPlanId) || session.plans[1] || session.plans[0];

  const handleSelectPlan = (plan: ImprovementPlan) => {
    setSelectedPlanId(plan.id);
    if (onSelectActivePlan) onSelectActivePlan(plan.id);
    setSelectedPlanSuccessAlert(`Selected "${plan.name}" as the active civic proposal.`);
    setTimeout(() => setSelectedPlanSuccessAlert(null), 3500);
  };

  const handleExportCSV = (plan: ImprovementPlan) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Item Description,Unit Rate (INR),Quantity,Subtotal (INR)\n' +
      plan.boq.map((b) => `"${b.item}",${b.rate},"${b.qty}",${b.amount}`).join('\n') +
      `\n"Total Estimated CapEx",,,"${plan.totalCostInr}"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${plan.id}-CPWD-BOQ.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">architecture</span>
            Stage II Synthesis
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Three Architectural Improvement Plans
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Grounded civic interventions calibrated to budget ceiling (₹{session.budgetCap.toLocaleString('en-IN')})
            and CPWD Schedule of Rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('plan-comparison-matrix')}
            className="inline-flex items-center gap-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006591]">compare_arrows</span>
            <span>Plan Comparison Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('reports-export')}
            className="inline-flex items-center gap-2 bg-[#000412] hover:bg-[#213145] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Export Civic DPR</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {selectedPlanSuccessAlert && (
        <div className="bg-[#6ffbbe]/30 border border-[#009969] text-[#002416] p-3 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-[18px] text-[#009969]">check_circle</span>
            <span>{selectedPlanSuccessAlert}</span>
          </div>
          <span className="text-[11px] underline cursor-pointer" onClick={() => onNavigate('reports-export')}>
            View in DPR
          </span>
        </div>
      )}

      {/* Plan Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {session.plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isUnderBudget = plan.totalCostInr <= session.budgetCap;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#006591] bg-[#eff4ff] shadow-sm ring-2 ring-[#006591]/20'
                  : 'border-[#e5eeff] bg-white hover:border-[#c5c6ce]'
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-md bg-[#006591] text-white flex items-center justify-center font-bold text-xs font-mono">
                    {plan.key}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      isUnderBudget
                        ? 'bg-[#6ffbbe]/40 text-[#002416]'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    {isUnderBudget ? 'Feasible' : 'Exceeds Cap'}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#0b1c30] mt-1">{plan.name}</div>
                <p className="text-[11px] text-[#44474d] line-clamp-2 leading-relaxed">
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e5eeff] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#75777e] block">Estimated CapEx</span>
                  <span className="text-base font-bold text-[#0b1c30] font-mono tabular-nums">
                    ₹{plan.totalCostInr.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#75777e] block">Shade Gain</span>
                  <span className="text-xs font-bold text-[#009969]">+{plan.shadeGainPercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Plan Detail Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* Left: Before / After Scrubber & Visual Inspection */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0b1c30] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006591] text-[20px]">
                    flip_camera_android
                  </span>
                  Photographic Transformation Simulator
                </h2>
                <span className="text-xs text-[#75777e]">
                  Slide scrubber to compare existing ground conditions vs proposed intervention
                </span>
              </div>
              <span className="bg-[#dce9ff] text-[#0b1c30] text-[11px] px-2.5 py-1 rounded font-mono font-medium">
                Photorealistic AI Render
              </span>
            </div>

            {/* Draggable Scrubber */}
            <BeforeAfterSlider
              beforeImage={activePlan.imageBefore || VISBUILD_ASSETS.heroBefore}
              afterImage={
                activePlan.imageAfter ||
                (activePlan.id === 'plan-a'
                  ? VISBUILD_ASSETS.transformedLibrary
                  : VISBUILD_ASSETS.transformedSolar)
              }
              beforeLabel="Current Deteriorated Walkway"
              afterLabel={`Synthesized: ${activePlan.name}`}
              heightClass="h-[380px] sm:h-[440px]"
            />

            {/* Strategic KPI Metric Pills */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#e5eeff] text-center">
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="text-[10px] text-[#75777e] block">Shade Coverage</span>
                <span className="text-sm font-bold text-[#009969]">+{activePlan.shadeGainPercent}%</span>
              </div>
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="text-[10px] text-[#75777e] block">Accessibility Score</span>
                <span className="text-sm font-bold text-[#006591]">
                  {activePlan.accessibilityScore}/100
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="text-[10px] text-[#75777e] block">Execution Duration</span>
                <span className="text-sm font-bold text-[#0b1c30]">
                  {activePlan.implementationWeeks} Weeks
                </span>
              </div>
            </div>
          </div>

          {/* Engineering Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-xs text-[#009969] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                Key Architectural Advantages
              </span>
              <ul className="text-xs text-[#44474d] flex flex-col gap-1.5 pl-1">
                {activePlan.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#009969] font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-2">
              <span className="font-bold text-xs text-[#ba1a1a] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                Trade-offs & Constraints
              </span>
              <ul className="text-xs text-[#44474d] flex flex-col gap-1.5 pl-1">
                {activePlan.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#ba1a1a] font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Itemized Bill of Quantities (BOQ) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <div>
                <h3 className="text-base font-bold text-[#0b1c30]">
                  Itemized Bill of Quantities (BOQ)
                </h3>
                <span className="text-[11px] text-[#75777e]">
                  CPWD Schedule of Rates (SOR) Benchmarks
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleExportCSV(activePlan)}
                className="inline-flex items-center gap-1 text-[11px] text-[#006591] font-semibold hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Export CSV</span>
              </button>
            </div>

            {/* BOQ Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#0b1c30]">
                    <th className="py-2 px-2.5 font-bold">Item Description</th>
                    <th className="py-2 px-2 font-bold text-center">Qty</th>
                    <th className="py-2 px-2.5 font-bold text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff] text-[#44474d]">
                  {activePlan.boq.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9ff]">
                      <td className="py-2 px-2.5 text-[11px]">
                        <span className="font-semibold text-[#0b1c30] block">{item.item}</span>
                        <span className="text-[10px] text-[#75777e]">
                          Rate: ₹{item.rate.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-[11px] text-center font-mono">{item.qty}</td>
                      <td className="py-2 px-2.5 text-[11px] font-mono text-right font-semibold text-[#0b1c30]">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#eff4ff] font-bold text-[#0b1c30] border-t-2 border-[#dce9ff]">
                    <td className="py-2.5 px-2.5" colSpan={2}>
                      Total Estimated CapEx (INR)
                    </td>
                    <td className="py-2.5 px-2.5 text-right font-mono text-sm text-[#006591]">
                      ₹{activePlan.totalCostInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Maintenance Profile */}
            <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#dce9ff] text-xs">
              <span className="font-bold text-[#0b1c30] block">Operational Maintenance Profile:</span>
              <p className="text-[#44474d] text-[11px] mt-0.5">{activePlan.maintenanceProfile}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleSelectPlan(activePlan)}
                className="w-full py-3 bg-[#006591] hover:bg-[#0284c7] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Select as Preferred Civic Plan</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('detailed-project-roadmap')}
                className="w-full py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">timeline</span>
                <span>View Detailed Execution Roadmap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
