import React, { useState } from 'react';
import { AuditSession, NavPath } from '../types/civic';

interface ProjectRoadmapViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
}

export const ProjectRoadmapView: React.FC<ProjectRoadmapViewProps> = ({
  session,
  onNavigate,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const toggleStep = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const phases = [
    {
      id: 1,
      phase: 'Phase I',
      days: 'Days 1 – 5',
      title: 'Topographic Survey & Underground Utility Demarcation',
      desc: 'Verify subterranean electrical cables and water pipes. Establish 1:50 cross-slope datum lines according to CPWD engineering specifications.',
      tasks: [
        'Total station survey of 400m corridor perimeter',
        'Mark subterranean electric conduits and stormwater invert levels',
        'Acquire municipal campus safety barricading clearance',
      ],
      cpwdClause: 'CPWD Spec Vol 1 Section 2',
      status: 'Ready for Contractor',
    },
    {
      id: 2,
      phase: 'Phase II',
      days: 'Days 6 – 14',
      title: 'Sub-Grade Excavation & Bioswale Trenching',
      desc: 'Break deteriorated concrete slabs using low-vibration pneumatic cutters to protect surrounding historic tree roots.',
      tasks: [
        'Excavate 45 running meters of bioswale percolation channels (depth 650mm)',
        'Lay non-woven geotextile membrane to prevent fine silt contamination',
        'Deposit 150mm coarse 40mm aggregate drainage bedding layer',
      ],
      cpwdClause: 'CPWD Spec Section 18.2',
      status: 'Pending Phase I',
    },
    {
      id: 3,
      phase: 'Phase III',
      days: 'Days 15 – 28',
      title: 'Permeable Paver Laying & Sub-base Compaction',
      desc: 'Lay 80mm heavy-duty permeable interlocking concrete blocks with 6mm aggregate bedding for 100% rainwater percolation.',
      tasks: [
        'Plate compaction of 100mm stone dust base layer',
        'Lay 180 sq.m of M-35 grade permeable interlocking blocks',
        'Perform water percolation infiltration rate test (>300mm/hr)',
      ],
      cpwdClause: 'IS 15658:2021 Concrete Paver Specification',
      status: 'Pending Phase II',
    },
    {
      id: 4,
      phase: 'Phase IV',
      days: 'Days 29 – 38',
      title: 'IRC-103 Universal Tactile Guide Path & Curb Cuts',
      desc: 'Cast 1:12 slope gradient concrete ramps with continuous yellow polyurethane tactile directional pavers.',
      tasks: [
        'Install 110 linear meters of continuous directional guide tiles',
        'Cast 2 in-situ wheelchair curb ramps with 1:12 maximum gradient',
        'Affix 300x300mm blister hazard warning tiles at all transition points',
      ],
      cpwdClause: 'IRC:103-2012 Clause 4.2 / Harmonized Guidelines',
      status: 'Pending Phase III',
    },
    {
      id: 5,
      phase: 'Phase V',
      days: 'Days 39 – 48',
      title: 'Arboriculture: Semi-Mature Native Canopy Planting',
      desc: 'Plant 12 semi-mature Azadirachta indica (Neem) and Terminalia arjuna (Arjun) trees in 1.2m x 1.2m perforated tree pits.',
      tasks: [
        'Excavate tree pits with organic compost and root enhancer mix',
        'Install cast-iron aeration tree grates to prevent soil compaction',
        'Set up drip irrigation sub-surface moisture lines for root establishment',
      ],
      cpwdClause: 'MoHUA Urban Greening Directives',
      status: 'Pending Phase IV',
    },
    {
      id: 6,
      phase: 'Phase VI',
      days: 'Days 49 – 56',
      title: 'Civic Furniture, Solar Illumination & Final Handover',
      desc: 'Install vandalism-resistant cast-stone benches, solar powered dusk-to-dawn bollards, and Braille signage.',
      tasks: [
        'Bolt down 3 cast-stone modular resting benches',
        'Commission 10 solar dusk-to-dawn safety lighting bollards',
        'Final accessibility inspection with university disability cell & sign-off',
      ],
      cpwdClause: 'CPWD Electrical Section 6',
      status: 'Pending Phase V',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">route</span>
            Execution Phase & Contractor Milestones
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Detailed Project Implementation Roadmap
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Standard 8-week phased execution schedule for {session.locationName} (#VB-9824).
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('reports-export')}
          className="inline-flex items-center gap-2 bg-[#000412] hover:bg-[#213145] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Print Contractor Schedule in DPR</span>
        </button>
      </div>

      {/* Timeline Gantt / Phases */}
      <div className="flex flex-col gap-4">
        {phases.map((phase) => {
          const isDone = completedSteps.includes(phase.id);
          return (
            <div
              key={phase.id}
              className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                isDone ? 'border-[#009969]/40 bg-[#f8f9ff]' : 'border-[#e5eeff]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#eff4ff]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleStep(phase.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isDone ? 'bg-[#009969] text-white' : 'border-2 border-[#c5c6ce] text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#006591]">{phase.phase}</span>
                      <span className="text-[#75777e]">•</span>
                      <span className="text-xs font-mono font-semibold text-[#0b1c30]">{phase.days}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] mt-0.5">{phase.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-[11px] bg-[#eff4ff] text-[#44474d] px-2.5 py-1 rounded font-mono">
                    {phase.cpwdClause}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-1 rounded font-semibold ${
                      isDone
                        ? 'bg-[#6ffbbe]/40 text-[#002416]'
                        : 'bg-[#e5eeff] text-[#006591]'
                    }`}
                  >
                    {isDone ? 'Completed' : phase.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-3 text-xs">
                <div className="md:col-span-6 text-[#44474d] leading-relaxed">
                  {phase.desc}
                </div>
                <div className="md:col-span-6 bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
                  <span className="font-bold text-[#0b1c30]">Key Engineering Deliverables:</span>
                  <ul className="text-[11px] text-[#44474d] flex flex-col gap-1">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006591]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quality Control & Standards Assurance Block */}
      <div className="bg-[#0f1e36] text-white p-5 rounded-xl flex flex-col gap-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6ffbbe] text-[20px]">verified</span>
            <span className="font-bold text-sm">Mandatory CPWD & IRC Quality Assurance Protocol</span>
          </div>
          <span className="text-xs text-[#c9e6ff] font-mono">3rd Party Testing Required</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#eaf1ff]">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="font-bold text-[#6ffbbe]">1. Compressive Strength</div>
            <p className="text-[11px] text-[#7886a3] mt-1">
              Paver blocks must satisfy 35 N/mm² minimum 28-day curing load test per IS 15658.
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="font-bold text-[#39b8fd]">2. Ramp Slope Audit</div>
            <p className="text-[11px] text-[#7886a3] mt-1">
              Wheelchair curb ramps must not exceed 1:12 incline verified with digital inclinometer.
            </p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="font-bold text-[#4edea3]">3. Sub-surface Infiltration</div>
            <p className="text-[11px] text-[#7886a3] mt-1">
              Bioswale percolation layer must absorb simulated 50mm/hr cloudburst without ponding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
