import React, { useState } from 'react';
import { AuditSession, NavPath } from '../types/civic';
import { VISBUILD_ASSETS } from '../data/mockData';

interface ReportsExportViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
  activePlanId?: string;
}

export const ReportsExportView: React.FC<ReportsExportViewProps> = ({
  session,
  activePlanId = 'plan-b',
}) => {
  const [copied, setCopied] = useState(false);

  const selectedPlan =
    session.plans.find((p) => p.id === activePlanId) || session.plans[1] || session.plans[0];

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `DETAILED PROJECT REPORT (DPR) SUMMARY:
Project: ${session.locationName}
Reference: #DPR-VB-2026-${session.instanceId}
Recommended Intervention: ${selectedPlan.name}
Total Estimated CapEx: ₹${selectedPlan.totalCostInr.toLocaleString('en-IN')} INR
Target Shade Gain: +${selectedPlan.shadeGainPercent}%
IRC-103 Accessibility Index: ${selectedPlan.accessibilityScore}/100
Execution Duration: ${selectedPlan.implementationWeeks} Weeks
Standards Aligned: CPWD Schedule of Rates 2024 & IRC:103-2012 Pedestrian Guidelines.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto gap-6">
      {/* Action Header (Hidden during Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            Official Civic Proposal Dossier
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Detailed Project Report (DPR) & Export
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Standard format municipal and campus sanction submission package ready for tender committee review.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-[#006591] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW SHEET (Formats as print page) */}
      <div className="bg-white rounded-xl border border-[#c5c6ce]/60 shadow-lg p-6 sm:p-10 flex flex-col gap-8 print:border-none print:shadow-none print:p-0">
        {/* Document Formal Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-[#0b1c30]">
          <div className="flex items-center gap-3">
            <img
              src={VISBUILD_ASSETS.logo}
              alt="VisBuild AI Civic Tech"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[#0b1c30] tracking-tight">
                MUNICIPAL & CAMPUS INFRASTRUCTURE CELL
              </span>
              <span className="text-xs text-[#44474d]">
                Automated Civic Decision Support System // IRC-103 Certified
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-[#44474d] flex flex-col gap-0.5">
            <span className="font-mono font-bold text-[#0b1c30]">
              REF: #DPR-VB-2026-{session.instanceId}
            </span>
            <span>Date of Generation: {new Date().toLocaleDateString('en-IN')}</span>
            <span className="text-[#009969] font-semibold">Classification: Approved for Sanction</span>
          </div>
        </div>

        {/* Project Title Block */}
        <div className="bg-[#eff4ff] p-5 rounded-lg border border-[#dce9ff] flex flex-col gap-2">
          <span className="text-[11px] uppercase font-bold text-[#006591] tracking-wider">
            Detailed Project Proposal (DPR)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
            Pedestrian Corridor Modernization & Microclimate Remediation
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#44474d] mt-1">
            <span>
              <strong>Location:</strong> {session.locationName}
            </span>
            <span>
              <strong>Corridor Length:</strong> {session.corridorLengthMeters} Meters
            </span>
            <span>
              <strong>Budget Cap:</strong> ₹{session.budgetCap.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] border-b border-[#eff4ff] pb-1">
            1. Executive Summary & Problem Diagnosis
          </h3>
          <p className="text-xs text-[#44474d] leading-relaxed">
            {session.summary} Computer vision semantic segmentation recorded a surface heat peak of +
            {session.metrics.thermalIndexCelsius}°C across exposed paving slabs, representing severe
            pedestrian heat stress. Two significant non-compliant elevation drops violate IRC-103 (Guidelines for
            Pedestrian Facilities) Clause 4.2. Current stormwater percolation rate is limited to{' '}
            {session.metrics.stormwaterAbsorptionRate}%, causing standing water accumulation during monsoon
            events.
          </p>
        </div>

        {/* Section 2: Visual Survey Photographic Evidence */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] border-b border-[#eff4ff] pb-1">
            2. Ground Condition Audit & Synthesized Solution
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-[#0b1c30]">
                Figure 1: Original Deteriorated Corridor (Midday Solar Scan)
              </span>
              <img
                src={VISBUILD_ASSETS.heroBefore}
                alt="Before"
                className="w-full h-44 object-cover rounded-lg border border-[#c5c6ce]"
              />
              <span className="text-[10px] text-[#75777e]">
                Identified: 6 critical civic bottlenecks • Surface Temp: 44.2°C
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-[#006591]">
                Figure 2: AI Synthesized Intervention ({selectedPlan.name})
              </span>
              <img
                src={selectedPlan.imageAfter || VISBUILD_ASSETS.transformedSolar}
                alt="After"
                className="w-full h-44 object-cover rounded-lg border border-[#006591]/40"
              />
              <span className="text-[10px] text-[#009969] font-medium">
                Integrated: Tree canopy shade, bioswales, and continuous tactile guide path
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Intervention Package */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] border-b border-[#eff4ff] pb-1">
            3. Selected Intervention Strategy & Key Impacts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-1">
            <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
              <span className="text-[10px] text-[#75777e] block">Sanction Outlay</span>
              <span className="text-base font-bold text-[#006591] font-mono">
                ₹{selectedPlan.totalCostInr.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
              <span className="text-[10px] text-[#75777e] block">Shade Density Gain</span>
              <span className="text-base font-bold text-[#009969]">+{selectedPlan.shadeGainPercent}%</span>
            </div>
            <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
              <span className="text-[10px] text-[#75777e] block">IRC Accessibility</span>
              <span className="text-base font-bold text-[#0b1c30]">
                {selectedPlan.accessibilityScore}/100
              </span>
            </div>
            <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
              <span className="text-[10px] text-[#75777e] block">Execution Duration</span>
              <span className="text-base font-bold text-[#0b1c30]">
                {selectedPlan.implementationWeeks} Weeks
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Schedule of Rates (SOR) Bill of Quantities */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30]">
              4. CPWD Schedule of Rates Itemized Bill of Quantities (BOQ)
            </h3>
            <span className="text-[10px] text-[#75777e] font-mono">SOR Edition: CPWD 2024</span>
          </div>

          <table className="w-full text-left text-xs border-collapse mt-1">
            <thead>
              <tr className="bg-[#eff4ff] text-[#0b1c30]">
                <th className="py-2 px-3 font-bold">Item Description</th>
                <th className="py-2 px-2 font-bold text-center">Unit</th>
                <th className="py-2 px-3 font-bold text-right">Unit Rate (₹)</th>
                <th className="py-2 px-3 font-bold text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eff4ff] text-[#44474d]">
              {selectedPlan.boq.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3 font-medium text-[#0b1c30]">{item.item}</td>
                  <td className="py-2 px-2 text-center font-mono">{item.qty}</td>
                  <td className="py-2 px-3 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                  <td className="py-2 px-3 text-right font-mono font-semibold text-[#0b1c30]">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#0b1c30] font-bold text-[#0b1c30] bg-[#eff4ff]/60">
                <td className="py-2.5 px-3" colSpan={3}>
                  Total Estimated Capital Expenditure (CapEx)
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-sm text-[#006591]">
                  ₹{selectedPlan.totalCostInr.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Section 5: Sanction Signatures Block */}
        <div className="pt-6 border-t border-[#c5c6ce] flex flex-col gap-4">
          <span className="text-[11px] font-bold uppercase text-[#75777e] tracking-wider">
            Administrative & Technical Sanction Endorsements:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs text-[#0b1c30]">
            <div className="flex flex-col gap-6 border-t border-dashed border-[#c5c6ce] pt-2">
              <span className="text-[#75777e]">Prepared & Computed By:</span>
              <div>
                <div className="font-bold">Er. Adarsh Singh</div>
                <div className="text-[11px] text-[#75777e]">Lead Civic Infrastructure Consultant</div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-dashed border-[#c5c6ce] pt-2">
              <span className="text-[#75777e]">Technical Sanction Verified By:</span>
              <div>
                <div className="font-bold">Superintending Engineer (Civil)</div>
                <div className="text-[11px] text-[#75777e]">Public Works & Campus Division</div>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-dashed border-[#c5c6ce] pt-2">
              <span className="text-[#75777e]">Administrative Approval:</span>
              <div>
                <div className="font-bold">Municipal Commissioner / Dean</div>
                <div className="text-[11px] text-[#75777e]">Planning & Infrastructure Board</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
