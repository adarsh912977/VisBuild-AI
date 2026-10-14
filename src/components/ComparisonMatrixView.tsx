import React, { useState, useMemo } from 'react';
import { AuditSession, NavPath } from '../types/civic';

interface ComparisonMatrixViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
  onSelectPlan?: (planId: string) => void;
}

export const ComparisonMatrixView: React.FC<ComparisonMatrixViewProps> = ({
  session,
  onNavigate,
  onSelectPlan,
}) => {
  const [budgetLimit, setBudgetLimit] = useState<number>(session.budgetCap || 600000);
  const [shadeWeight, setShadeWeight] = useState<number>(40);
  const [accessWeight, setAccessWeight] = useState<number>(40);
  const [costWeight, setCostWeight] = useState<number>(20);

  // Expanded 5-theme plans for the complete comparison matrix
  const allThemes = useMemo(() => {
    return [
      {
        id: 'plan-a',
        key: 'A',
        name: 'Budget-Friendly',
        category: 'Triage & Patching',
        cost: 195000,
        shade: 18,
        access: 72,
        weeks: 3,
        upkeep: 'Bi-monthly joint sand patchup',
        carbon: 'Low (0.4 tons CO₂/yr)',
        drainage: '28% (Localized soak-wells)',
        citizenRating: 3.8,
        materials: 'Cold-mix asphalt, PVC tactiles, canvas sails',
      },
      {
        id: 'plan-b',
        key: 'B',
        name: 'Eco-Focused Micro-Bioswales',
        category: 'Urban Ecology',
        cost: 485000,
        shade: 68,
        access: 92,
        weeks: 8,
        upkeep: 'Seasonal tree care & silt flush',
        carbon: 'High (3.6 tons CO₂/yr)',
        drainage: '94% (Permeable pavers & swales)',
        citizenRating: 4.8,
        materials: 'PICB pavers, Neem/Arjun trees, gravel sub-base',
      },
      {
        id: 'plan-c',
        key: 'C',
        name: 'Universal Accessibility',
        category: 'Barrier-Free Inclusion',
        cost: 580000,
        shade: 45,
        access: 100,
        weeks: 6,
        upkeep: 'Quarterly electrical & tactile check',
        carbon: 'Moderate (1.8 tons CO₂/yr)',
        drainage: '65% (Anti-glare textured pavers)',
        citizenRating: 4.9,
        materials: 'Polyurethane blister pavers, SS handrails, ramps',
      },
      {
        id: 'plan-d',
        key: 'D',
        name: 'Low-Maintenance',
        category: 'Heavy-Duty Civic',
        cost: 310000,
        shade: 30,
        access: 80,
        weeks: 4,
        upkeep: 'Semi-annual pressure wash',
        carbon: 'Low (0.8 tons CO₂/yr)',
        drainage: '50% (Standard concrete slope)',
        citizenRating: 4.1,
        materials: 'Reinforced cast stone, galvanized steel, agave',
      },
      {
        id: 'plan-e',
        key: 'E',
        name: 'Smart & Tech',
        category: 'Digital Infrastructure',
        cost: 720000,
        shade: 55,
        access: 95,
        weeks: 9,
        upkeep: 'Monthly sensor calibration',
        carbon: 'High (2.9 tons CO₂/yr via solar)',
        drainage: '75% (Perforated solar pavers)',
        citizenRating: 4.7,
        materials: 'Photovoltaic canopies, IoT weather nodes, USB hubs',
      },
    ];
  }, []);

  // Compute composite score for each plan based on user weights
  const scoredThemes = useMemo(() => {
    const maxCost = 800000;
    return allThemes.map((plan) => {
      const shadeScore = plan.shade; // 0 - 100
      const accessScore = plan.access; // 0 - 100
      const costScore = Math.max(0, 100 - (plan.cost / maxCost) * 100);

      const totalWeight = shadeWeight + accessWeight + costWeight || 1;
      const compositeScore =
        (shadeScore * shadeWeight + accessScore * accessWeight + costScore * costWeight) /
        totalWeight;

      const isWithinBudget = plan.cost <= budgetLimit;

      return {
        ...plan,
        compositeScore: Math.round(compositeScore),
        isWithinBudget,
      };
    });
  }, [allThemes, budgetLimit, shadeWeight, accessWeight, costWeight]);

  // Find the winning plan among those within budget (or highest composite)
  const winningPlan = useMemo(() => {
    const feasible = scoredThemes.filter((p) => p.isWithinBudget);
    if (feasible.length > 0) {
      return feasible.reduce((prev, curr) =>
        curr.compositeScore > prev.compositeScore ? curr : prev
      );
    }
    return scoredThemes.reduce((prev, curr) =>
      curr.compositeScore > prev.compositeScore ? curr : prev
    );
  }, [scoredThemes]);

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
            Stage III Decision Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Comprehensive Plan Comparison Matrix
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Evaluate CapEx trade-offs, ecological ROI, and accessibility standards across all 5 architectural themes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onSelectPlan) onSelectPlan(winningPlan.id);
            onNavigate('reports-export');
          }}
          className="inline-flex items-center gap-2 bg-[#000412] hover:bg-[#213145] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-[#6ffbbe]">recommend</span>
          <span>Adopt Winning Plan #{winningPlan.key} in DPR</span>
        </button>
      </div>

      {/* Decision Intelligence Controls Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs">
        {/* Dynamic Budget Slider */}
        <div className="lg:col-span-6 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006591] text-[18px]">currency_rupee</span>
              Dynamic Municipal Budget Ceiling
            </span>
            <span className="text-base font-bold text-[#006591] font-mono tabular-nums">
              ₹{budgetLimit.toLocaleString('en-IN')}
            </span>
          </div>

          <input
            type="range"
            min="150000"
            max="900000"
            step="25000"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(parseInt(e.target.value, 10))}
            className="w-full accent-[#006591] cursor-pointer"
          />

          <div className="flex items-center justify-between text-[11px] text-[#75777e]">
            <span>₹1.5 Lakhs (Triage Only)</span>
            <span>₹5.0 Lakhs (Standard)</span>
            <span>₹9.0 Lakhs (Smart / Full)</span>
          </div>
        </div>

        {/* Priority Weight Sliders */}
        <div className="lg:col-span-6 flex flex-col gap-2.5 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#eff4ff]">
          <span className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#009969] text-[18px]">tune</span>
            Civic Priority Weight Allocators
          </span>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Shade Focus</span>
                <span className="font-bold text-[#009969]">{shadeWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={shadeWeight}
                onChange={(e) => setShadeWeight(parseInt(e.target.value, 10))}
                className="w-full accent-[#009969] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Access (IRC)</span>
                <span className="font-bold text-[#006591]">{accessWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={accessWeight}
                onChange={(e) => setAccessWeight(parseInt(e.target.value, 10))}
                className="w-full accent-[#006591] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Cost Economy</span>
                <span className="font-bold text-[#0b1c30]">{costWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={costWeight}
                onChange={(e) => setCostWeight(parseInt(e.target.value, 10))}
                className="w-full accent-[#000412] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Winner Alert Card */}
      <div className="bg-[#eff4ff] border border-[#006591]/40 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006591] text-white flex items-center justify-center font-bold font-mono text-base shadow-xs">
            {winningPlan.key}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#6ffbbe] text-[#002113] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Algorithmic Winner
              </span>
              <span className="text-xs text-[#006591] font-mono font-semibold">
                Score: {winningPlan.compositeScore}/100
              </span>
            </div>
            <div className="text-base font-bold text-[#0b1c30] mt-0.5">
              Plan {winningPlan.key}: {winningPlan.name} (₹{winningPlan.cost.toLocaleString('en-IN')})
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onSelectPlan) onSelectPlan(winningPlan.id);
            onNavigate('three-improvement-plans');
          }}
          className="inline-flex items-center gap-1.5 bg-[#006591] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          <span>Inspect Plan {winningPlan.key}</span>
          <span className="material-symbols-outlined text-[16px]">visibility</span>
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="w-full bg-white rounded-xl shadow-xs border border-[#e5eeff] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#dce9ff] text-[#0b1c30]">
              <th className="py-3 px-3.5 font-bold uppercase text-[11px] sticky left-0 bg-[#dce9ff] z-10">
                Evaluation Metric
              </th>
              {scoredThemes.map((plan) => {
                const isWinner = plan.id === winningPlan.id;
                return (
                  <th
                    key={plan.id}
                    className={`py-3 px-3.5 font-bold uppercase text-[11px] min-w-[160px] ${
                      isWinner ? 'bg-[#c9e6ff] text-[#001e2f] border-x border-[#006591]/30' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Plan {plan.key}</span>
                      {isWinner && (
                        <span className="bg-[#006591] text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                          WINNER
                        </span>
                      )}
                    </div>
                    <div className="normal-case font-medium text-[10px] text-[#44474d] truncate">
                      {plan.name}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eff4ff] text-[#44474d]">
            {/* Feasibility Row */}
            <tr className="bg-[#eff4ff]/30">
              <td className="py-2.5 px-3.5 font-bold text-[#0b1c30] sticky left-0 bg-[#eff4ff]/60">
                Budget Feasibility
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.isWithinBudget
                        ? 'bg-[#6ffbbe]/40 text-[#002416]'
                        : 'bg-[#ffdad6] text-[#93000a]'
                    }`}
                  >
                    {p.isWithinBudget ? 'Within Ceiling' : 'Requires Deficit Funding'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Total CapEx */}
            <tr className="hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-white">
                Total CapEx (INR ₹)
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 font-mono font-bold ${
                    p.id === winningPlan.id
                      ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20 text-[#006591]'
                      : 'text-[#0b1c30]'
                  }`}
                >
                  ₹{p.cost.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>

            {/* Shade Gain */}
            <tr className="bg-[#eff4ff]/20 hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-[#eff4ff]/30">
                Canopy Shade Gain (%)
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  <span
                    className={`font-bold ${p.shade >= 60 ? 'text-[#009969]' : 'text-[#0b1c30]'}`}
                  >
                    +{p.shade}%
                  </span>
                </td>
              ))}
            </tr>

            {/* IRC-103 Accessibility */}
            <tr className="hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-white">
                IRC-103 Compliance
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  <span
                    className={`font-bold ${p.access === 100 ? 'text-[#006591]' : 'text-[#44474d]'}`}
                  >
                    {p.access}/100
                  </span>
                </td>
              ))}
            </tr>

            {/* Execution Timeline */}
            <tr className="bg-[#eff4ff]/20 hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-[#eff4ff]/30">
                Execution Time
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 font-medium ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  {p.weeks} Weeks
                </td>
              ))}
            </tr>

            {/* Stormwater Drainage */}
            <tr className="hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-white">
                Stormwater Infiltration
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  {p.drainage}
                </td>
              ))}
            </tr>

            {/* Upkeep Burden */}
            <tr className="bg-[#eff4ff]/20 hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-[#eff4ff]/30">
                Maintenance Frequency
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 text-[11px] ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20' : ''
                  }`}
                >
                  {p.upkeep}
                </td>
              ))}
            </tr>

            {/* Projected Citizen Rating */}
            <tr className="hover:bg-[#eff4ff]/50">
              <td className="py-2.5 px-3.5 font-semibold text-[#0b1c30] sticky left-0 bg-white">
                Citizen Approval Rating
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-2.5 px-3.5 font-bold ${
                    p.id === winningPlan.id
                      ? 'bg-[#c9e6ff]/20 border-x border-[#006591]/20 text-[#006591]'
                      : 'text-[#0b1c30]'
                  }`}
                >
                  ★ {p.citizenRating} / 5.0
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr className="bg-[#f8f9ff]">
              <td className="py-3 px-3.5 font-bold text-[#0b1c30] sticky left-0 bg-[#f8f9ff]">
                Selection
              </td>
              {scoredThemes.map((p) => (
                <td
                  key={p.id}
                  className={`py-3 px-3.5 ${
                    p.id === winningPlan.id ? 'bg-[#c9e6ff]/30 border-x border-[#006591]/30' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) onSelectPlan(p.id);
                      onNavigate('three-improvement-plans');
                    }}
                    className={`w-full py-1.5 px-2 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      p.id === winningPlan.id
                        ? 'bg-[#006591] text-white hover:bg-[#0284c7]'
                        : 'bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff]'
                    }`}
                  >
                    Select Plan {p.key}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
