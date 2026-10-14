import React, { useState } from 'react';
import { NavPath, AuditSession } from '../types/civic';
import { VISBUILD_ASSETS } from '../data/mockData';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface OverviewViewProps {
  session: AuditSession;
  onNavigate: (path: NavPath) => void;
  onSelectDeficit?: (deficitId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  session,
  onNavigate,
  onSelectDeficit,
}) => {
  const [maxBudget, setMaxBudget] = useState(600000);
  const [shadeTarget, setShadeTarget] = useState(55);
  const [activeDeficitHover, setActiveDeficitHover] = useState<string | null>(null);

  // Dynamic cost adjustment calculation based on budget slider
  const planBCost = 485000;
  const isWithinBudget = planBCost <= maxBudget;

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Architectural Atmospheric Glows */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 right-12 w-96 h-96 bg-[#c9e6ff]/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-96 -left-24 w-80 h-80 bg-[#4edea3]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* HERO SECTION */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
            {/* Header Tag & Micro-Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 bg-[#dce9ff] px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#006591]" />
                <span className="text-[11px] uppercase tracking-wider text-[#0b1c30] font-bold">
                  Official Decision Support Platform for Municipalities & Campuses
                </span>
                <span className="text-[#006591] text-[11px] font-semibold hidden sm:inline">
                  • FY 2026-27 Approved Standard
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#44474d] text-xs">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">verified_user</span>
                <span>State Civic Standards CPWD & IRC-103 Aligned</span>
              </div>
            </div>

            {/* Headline & Split Intro Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0b1c30] tracking-tight leading-tight text-balance">
                  Transform Public Spaces Into Smarter Places.
                </h1>
                <p className="text-base text-[#44474d] max-w-2xl text-pretty leading-relaxed">
                  Analyze infrastructure problems, explore feasible improvements, and make smarter decisions
                  with AI-powered insights and budget-aware planning.
                </p>
              </div>

              {/* CTAs + Live Indicator */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-start lg:items-end">
                <button
                  type="button"
                  onClick={() => onNavigate('new-infrastructure-audit')}
                  className="inline-flex items-center justify-center gap-2 bg-[#000412] text-white px-6 py-3 rounded-lg shadow-sm hover:bg-[#213145] transition-all group cursor-pointer"
                >
                  <span className="text-sm font-semibold">Start Infrastructure Audit</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006591]">explore</span>
                  <span>Explore How It Works</span>
                </a>
              </div>
            </div>

            {/* HERO SHOWCASE: Interactive Civic Vision Cockpit Preview */}
            <div className="w-full bg-white rounded-xl shadow-md border border-[#e5eeff] p-4 lg:p-6 flex flex-col gap-4">
              {/* Workspace Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ba1a1a]" />
                  <div className="w-3 h-3 rounded-full bg-[#39b8fd]" />
                  <div className="w-3 h-3 rounded-full bg-[#4edea3]" />
                  <div className="h-4 w-px bg-[#c5c6ce] mx-1" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0b1c30]">
                    Audit Instance #{session.instanceId} // {session.locationName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#002416] text-[#6ffbbe] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Vision AI Active
                  </span>
                  <span className="bg-[#dce9ff] text-[#0b1c30] text-[11px] px-2.5 py-1 rounded-full font-mono font-medium">
                    Model YOLO-Urban-X v2.4
                  </span>
                </div>
              </div>

              {/* Bento Spatial Canvas: Visual Before/After vs Real-time Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left: Scannable Camera Feed & Semantic Segmentation */}
                <div className="lg:col-span-7 relative group rounded-lg overflow-hidden bg-[#e5eeff] h-[380px] sm:h-[440px] shadow-inner">
                  <div
                    className="bg-cover bg-center w-full h-full relative"
                    style={{ backgroundImage: `url('${VISBUILD_ASSETS.heroBefore}')` }}
                  >
                    {/* Bounding Box Overlays */}
                    {/* Deficit 01 */}
                    <div
                      onMouseEnter={() => setActiveDeficitHover('DEF-01')}
                      onMouseLeave={() => setActiveDeficitHover(null)}
                      onClick={() => {
                        if (onSelectDeficit) onSelectDeficit('DEF-01');
                        onNavigate('audit-results-vision-ai-findings');
                      }}
                      className="absolute top-12 left-8 sm:left-12 p-2 bg-[#0f1e36]/90 backdrop-blur-md rounded-lg text-white flex flex-col gap-0.5 shadow-lg border border-red-500/40 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#ffdad6] text-[16px]">warning</span>
                        <span className="text-[11px] font-bold tracking-wider text-[#ffdad6]">DEFICIT 01</span>
                      </div>
                      <span className="text-xs text-[#eaf1ff]">Zero Canopy Shade (11:00 - 15:30)</span>
                      <span className="text-[11px] text-[#89ceff] font-mono">Surface Temp: 44.2°C</span>
                    </div>

                    {/* Deficit 02 */}
                    <div
                      onMouseEnter={() => setActiveDeficitHover('DEF-02')}
                      onMouseLeave={() => setActiveDeficitHover(null)}
                      onClick={() => {
                        if (onSelectDeficit) onSelectDeficit('DEF-02');
                        onNavigate('audit-results-vision-ai-findings');
                      }}
                      className="absolute bottom-20 right-6 sm:right-14 p-2 bg-[#0f1e36]/90 backdrop-blur-md rounded-lg text-white flex flex-col gap-0.5 shadow-lg border border-cyan-400/40 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#39b8fd] text-[16px]">accessible_forward</span>
                        <span className="text-[11px] font-bold tracking-wider text-[#39b8fd]">NON-COMPLIANT</span>
                      </div>
                      <span className="text-xs text-[#eaf1ff]">Missing Tactile Paving & Curb Cut</span>
                      <span className="text-[11px] text-[#6ffbbe] font-mono">IRC-103 Violations: 2</span>
                    </div>

                    {/* Deficit 03 */}
                    <div
                      onMouseEnter={() => setActiveDeficitHover('DEF-03')}
                      onMouseLeave={() => setActiveDeficitHover(null)}
                      onClick={() => {
                        if (onSelectDeficit) onSelectDeficit('DEF-03');
                        onNavigate('audit-results-vision-ai-findings');
                      }}
                      className="absolute top-1/2 left-1/4 p-2 bg-[#0f1e36]/90 backdrop-blur-md rounded-lg text-white flex flex-col gap-0.5 shadow-lg border border-emerald-400/40 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#4edea3] text-[16px]">water_drop</span>
                        <span className="text-[11px] font-bold tracking-wider text-[#4edea3]">DRAINAGE RISK</span>
                      </div>
                      <span className="text-xs text-[#eaf1ff]">Depressed Pavers / Monsoon Stagnation</span>
                    </div>

                    {/* Live Tag bottom strip */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#000412]/90 backdrop-blur-md px-3 py-2 rounded-lg flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#39b8fd] text-[18px]">travel_explore</span>
                        <span className="font-medium text-[11px] sm:text-xs">
                          Original Capture: 6 visible civics bottlenecks tagged in 1.4s
                        </span>
                      </div>
                      <span className="text-[11px] text-[#89ceff] bg-white/10 px-2 py-0.5 rounded font-mono font-semibold">
                        Confidence: 96.8%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Real-time Rupee Budget & Plan Synthesis Preview */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
                  {/* Plan Quick Picker Card */}
                  <div className="bg-[#eff4ff] p-4 rounded-lg flex flex-col gap-2 border border-[#dce9ff]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase font-bold text-[#006591] tracking-wider">
                        Active Synthesis
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          isWithinBudget ? 'bg-[#6ffbbe]/40 text-[#002416]' : 'bg-[#ffdad6] text-[#93000a]'
                        }`}
                      >
                        {isWithinBudget ? 'Feasible' : 'Exceeds Ceiling'}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-[#0b1c30]">
                      Plan B: Eco-Focused Micro-Bioswales
                    </div>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Integrates perforated tree wells, indigenous Neem-Arjun canopies, and permeable concrete
                      pavers to lower heat retention.
                    </p>

                    {/* Cost Comparison Bar */}
                    <div className="mt-1 pt-2 bg-white p-2.5 rounded-lg border border-[#e5eeff] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#75777e] block">Estimated CapEx (INR ₹)</span>
                        <span className="text-xl font-bold text-[#0b1c30] tabular-nums font-mono">
                          ₹4,85,000
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-[#009969] block">
                          Within Campus Grant
                        </span>
                        <span className="text-[11px] text-[#75777e]">Savings vs Traditional: ₹1.2L</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Simulation Sliders Display */}
                  <div className="bg-[#eff4ff] p-4 rounded-lg flex flex-col gap-3 border border-[#dce9ff]">
                    <div className="flex items-center justify-between text-[#0b1c30]">
                      <span className="text-xs font-bold">Priority Allocator</span>
                      <span className="text-xs text-[#006591] font-mono font-semibold">
                        Max Budget: ₹{maxBudget.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Budget Scrubber Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#44474d]">Budget Ceiling</span>
                        <span className="text-[#0b1c30] font-bold">₹{maxBudget.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min="200000"
                        max="1000000"
                        step="25000"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))}
                        className="w-full accent-[#006591] cursor-pointer"
                      />
                    </div>

                    {/* Shade Progress */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#44474d]">Shade Density Target</span>
                        <span className="text-[#0b1c30] font-bold">+{shadeTarget}% (High)</span>
                      </div>
                      <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#006591] h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, shadeTarget * 1.4)}%` }}
                        />
                      </div>
                    </div>

                    {/* Accessibility Index */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#44474d]">Universal Accessibility Score</span>
                        <span className="text-[#0b1c30] font-bold">96/100 (Full IRC-103)</span>
                      </div>
                      <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#4edea3] h-full w-[96%]" />
                      </div>
                    </div>

                    {/* Action Button in Card */}
                    <button
                      type="button"
                      onClick={() => onNavigate('three-improvement-plans')}
                      className="mt-1 w-full py-2.5 bg-[#0f1e36] text-white rounded font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#000412] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#6ffbbe]">schema</span>
                      <span>Inspect All 3 Comparative Plans</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE IMPACT METRICS COUNTER BAR */}
        <section className="w-full bg-[#0f1e36] text-white py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl text-[#39b8fd] leading-none font-bold">+42%</span>
              <span className="text-sm sm:text-base font-semibold text-[#eaf1ff]">Avg. Shade Coverage</span>
              <span className="text-xs text-[#7886a3]">Generated across 320+ audited institutional corridors</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl text-[#6ffbbe] leading-none font-bold">94%</span>
              <span className="text-sm sm:text-base font-semibold text-[#eaf1ff]">Accessibility Index</span>
              <span className="text-xs text-[#7886a3]">Compliant with Indian Harmonized Guidelines</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl text-[#c9e6ff] leading-none font-bold">₹1.4 Cr</span>
              <span className="text-sm sm:text-base font-semibold text-[#eaf1ff]">Budget Optimized</span>
              <span className="text-xs text-[#7886a3]">Savings derived through phased intervention models</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl text-white leading-none font-bold">1,850+</span>
              <span className="text-sm sm:text-base font-semibold text-[#eaf1ff]">Interventions Costed</span>
              <span className="text-xs text-[#7886a3]">Native Schedule of Rates (SOR) pricing benchmarks</span>
            </div>
          </div>
        </section>

        {/* PROBLEM STATEMENT SECTION (6 Core Civic Challenges) */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
                <span className="material-symbols-outlined text-[16px]">report_problem</span>
                The Ground Reality
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Millions Navigate Deficient Public Corridors Every Day.
              </h2>
              <p className="text-sm sm:text-base text-[#44474d] leading-relaxed">
                Public spaces like university campuses, neighborhood roads, and transit stops shape daily urban
                existence across India. The bottleneck isn't spotting faults—it is reaching quick civic consensus
                on what to fix first within strict municipal budgets.
              </p>
            </div>

            {/* 6 Challenge Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Problem 1 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#ffdad6]/60 flex items-center justify-center text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[24px]">wb_sunny</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Excessive Heat & Shade Deficit</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Exposed black asphalt and vast concrete walkways radiate unmitigated solar heat, making pedestrian
                  commuting unbearable for students and elderly pedestrians from March through July.
                </p>
                <div className="mt-auto pt-2 text-[#ba1a1a] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">thermostat</span> +6°C to +9°C microclimate spike
                </div>
              </div>

              {/* Problem 2 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#c9e6ff]/50 flex items-center justify-center text-[#006591]">
                  <span className="material-symbols-outlined text-[24px]">accessible</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Accessibility Gaps & Safety Risks</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Broken curb ramps, missing tactile paving tiles, discontinuous pedestrian paths, and unramped kerbs
                  make spaces hazardous for wheelchair users and visually impaired citizens.
                </p>
                <div className="mt-auto pt-2 text-[#006591] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">rule</span> Low IRC-103 walkway compliance
                </div>
              </div>

              {/* Problem 3 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[24px]">chair</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Lack of Seating & Rest Amenities</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Long corridors without functional resting spots force visitors to sit on curbs or dusty floor
                  walls. The absence of durable civic furniture deters community gathering.
                </p>
                <div className="mt-auto pt-2 text-[#44474d] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">groups</span> Severe social dwell time drop
                </div>
              </div>

              {/* Problem 4 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#6ffbbe]/30 flex items-center justify-center text-[#002416]">
                  <span className="material-symbols-outlined text-[24px]">park</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Depleted Urban Greenery</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Unplanned paving chokes existing root systems, leaving barren soil pockets prone to erosion and dust
                  storms rather than fostering drought-resilient native bio-canopies.
                </p>
                <div className="mt-auto pt-2 text-[#009969] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">eco</span> Poor carbon capture & soil health
                </div>
              </div>

              {/* Problem 5 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#c9e6ff]/50 flex items-center justify-center text-[#006591]">
                  <span className="material-symbols-outlined text-[24px]">water_damage</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Inadequate Drainage & Monsoon Risks</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Flat impervious paving without cross-slopes leads to prolonged water stagnation during monsoons,
                  damaging foundational slabs and creating vector mosquito breeding hubs.
                </p>
                <div className="mt-auto pt-2 text-[#006591] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">flood</span> High seasonal surface deterioration
                </div>
              </div>

              {/* Problem 6 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0b1c30]">
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
                <div className="text-base font-semibold text-[#0b1c30]">Limited Capital Budgets & Vague Bids</div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Civic administrators and college committees often defer projects because architectural consultants
                  take months to submit drawings, without clear INR unit breakdown trade-offs.
                </p>
                <div className="mt-auto pt-2 text-[#44474d] text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">hourglass_bottom</span> Protracted approval deadlocks
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: 3-STEP DECISION ENGINE */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#eff4ff]" id="how-it-works">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
                  <span className="material-symbols-outlined text-[16px]">alt_route</span>
                  Linear Precision Workflow
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                  From Single Photo to Costed Civic Execution in Three Steps.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('new-infrastructure-audit')}
                className="inline-flex items-center gap-2 text-[#006591] font-semibold text-sm hover:underline cursor-pointer"
              >
                <span>Try with your own walkway photo</span>
                <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </button>
            </div>

            {/* 3 Process Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#d3e4fe]">01</span>
                  <span className="bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded text-xs font-semibold">
                    Stage I
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Analyze & Audit</h3>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Upload or capture any photo of a sidewalk, public square, or campus entry. Vision AI evaluates
                    terrain condition, shade deficiencies, pavement cracks, and missing accessibility elements in
                    seconds.
                  </p>
                </div>
                <div className="bg-[#e5eeff] p-3 rounded-lg flex flex-col gap-1.5 text-[#0b1c30] text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#009969]">check_circle</span>
                    <span>Automatic Obstacle & Kerb Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#009969]">check_circle</span>
                    <span>Severity Classification (Hazard / Wear)</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#39b8fd]">02</span>
                  <span className="bg-[#c9e6ff] text-[#001e2f] px-2.5 py-1 rounded text-xs font-semibold">
                    Stage II
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Plan & Synthesize</h3>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    The engine drafts 3 bespoke, realistic spatial concepts tailored to your photo: Budget-Friendly,
                    Eco-Focused, and Universal Accessibility, paired with generated concept renders.
                  </p>
                </div>
                <div className="bg-[#e5eeff] p-3 rounded-lg flex flex-col gap-1.5 text-[#0b1c30] text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#006591]">check_circle</span>
                    <span>Intervention-Aligned Concept Renders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#006591]">check_circle</span>
                    <span>Itemized Bill of Quantities (BOQ)</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#4edea3]">03</span>
                  <span className="bg-[#6ffbbe]/30 text-[#002416] px-2.5 py-1 rounded text-xs font-semibold">
                    Stage III
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-[#0b1c30]">Compare & Export</h3>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Benchmark all options on an interactive matrix comparing INR costs, shade increase, wheelchair ease,
                    and upkeep burden. Export a municipal-ready DPR / tender-ready PDF.
                  </p>
                </div>
                <div className="bg-[#e5eeff] p-3 rounded-lg flex flex-col gap-1.5 text-[#0b1c30] text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#009969]">check_circle</span>
                    <span>Real-time Rupee Budget Sliders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#009969]">check_circle</span>
                    <span>1-Click PDF Civic Proposal Package</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE 5-THEME CATALOG PREVIEW */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-[#006591] font-bold">
                Comprehensive Options
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Built-in Architectural Improvement Themes
              </h2>
              <p className="text-sm text-[#44474d] max-w-2xl">
                VisBuild AI structures its interventions around five grounded civic methodologies, balancing capital
                outlay against operational resilience.
              </p>
            </div>

            {/* 5 Themes Horizontal Bento Slider/Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Theme A */}
              <div
                onClick={() => onNavigate('three-improvement-plans')}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center font-bold text-[#0b1c30] font-mono text-sm">
                    A
                  </div>
                  <div className="text-base font-bold text-[#0b1c30] group-hover:text-[#006591] transition-colors">
                    Budget-Friendly
                  </div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Repairs the most urgent physical risks at minimal cost. Uses existing pavement foundations and
                    localized repair patches.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5eeff]">
                  <span className="text-[11px] text-[#006591] font-bold">Trade-off:</span>
                  <p className="text-[11px] text-[#44474d]">Defers major tree root rebuilding and long-term amenities.</p>
                </div>
              </div>

              {/* Theme B */}
              <div
                onClick={() => onNavigate('three-improvement-plans')}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#6ffbbe]/40 flex items-center justify-center font-bold text-[#002416] font-mono text-sm">
                    B
                  </div>
                  <div className="text-base font-bold text-[#0b1c30] group-hover:text-[#009969] transition-colors">
                    Eco-Focused
                  </div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Prioritizes native saplings, permeable ground tiles, bioswales, and soil hydration to remediate
                    urban heat islands.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5eeff]">
                  <span className="text-[11px] text-[#009969] font-bold">Trade-off:</span>
                  <p className="text-[11px] text-[#44474d]">Requires 2–3 seasons for saplings to deliver peak canopy shade.</p>
                </div>
              </div>

              {/* Theme C */}
              <div
                onClick={() => onNavigate('three-improvement-plans')}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#c9e6ff] flex items-center justify-center font-bold text-[#006591] font-mono text-sm">
                    C
                  </div>
                  <div className="text-base font-bold text-[#0b1c30] group-hover:text-[#006591] transition-colors">
                    Accessibility-First
                  </div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Continuous yellow tactile pavers, gradual 1:12 curb ramps, audible crosswalk markers, and ergonomic
                    rest benches.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5eeff]">
                  <span className="text-[11px] text-[#006591] font-bold">Trade-off:</span>
                  <p className="text-[11px] text-[#44474d]">Redirects initial funds away from decorative landscaping.</p>
                </div>
              </div>

              {/* Theme D */}
              <div
                onClick={() => onNavigate('three-improvement-plans')}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center font-bold text-[#0b1c30] font-mono text-sm">
                    D
                  </div>
                  <div className="text-base font-bold text-[#0b1c30]">Low-Maintenance</div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Heavy-duty cast stone benches, vandal-resistant steel, and drought-tolerant foliage that survives zero
                    irrigation.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5eeff]">
                  <span className="text-[11px] text-[#0b1c30] font-bold">Trade-off:</span>
                  <p className="text-[11px] text-[#44474d]">Industrial visual appearance with fewer floral species.</p>
                </div>
              </div>

              {/* Theme E */}
              <div
                onClick={() => onNavigate('three-improvement-plans')}
                className="bg-white p-4 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer group"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0f1e36] flex items-center justify-center font-bold text-white font-mono text-sm">
                    E
                  </div>
                  <div className="text-base font-bold text-[#0b1c30]">Smart & Tech</div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Solar roof walkways with kinetic sensors, device charge stations, and digital civic announcement
                    displays.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5eeff]">
                  <span className="text-[11px] text-[#0b1c30] font-bold">Trade-off:</span>
                  <p className="text-[11px] text-[#44474d]">Higher upfront hardware spend and scheduled electrical checks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 INTERACTIVE FEATURE MODULES */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#eff4ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-[#006591] font-bold">
                Platform Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Engineered for Municipal & Campus Leaders
              </h2>
              <p className="text-sm text-[#44474d] max-w-2xl">
                From field photo scanning to final project committee approvals, our software turns urban challenges into
                structured decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Feature 1 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#000412]">
                  <span className="material-symbols-outlined text-[24px]">center_focus_strong</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">Computer Vision Deficit Audit</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Trained on thousands of Indian streetscapes and institutional grounds to detect pavement failures,
                  missing curbs, root-heaves, and litter choke points.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006591]">
                  <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">Native INR Rate Benchmarks</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Every suggested intervention is instantly priced against verified state public works schedules,
                  preventing unrealistic architectural fantasies.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#009969]">
                  <span className="material-symbols-outlined text-[24px]">view_comfy_alt</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">Dynamic Before / After Slider</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Interactive scrubbers allow council members and donors to visually slide between present-day
                  deterioration and future state transformations.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006591]">
                  <span className="material-symbols-outlined text-[24px]">tune</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">Real-Time Constraint Sliders</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Adjust your budget ceiling or prioritize shade over paving. The recommendation deck reorganizes
                  automatically to surface the most viable plan.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#000412]">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">Accessibility Scoring (IRC-103)</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Direct audit metrics referencing the Indian Harmonized Guidelines to guarantee ramps, braille points,
                  and tactile surfaces are never dropped during budget trimming.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-5 rounded-xl shadow-xs border border-[#e5eeff] flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#009969]">
                  <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                </div>
                <h3 className="text-base font-bold text-[#0b1c30]">1-Click Civic DPR Export</h3>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Generate presentation-ready executive briefs, bill-of-quantity estimates, and photographic comparative
                  tables directly exportable into PDF format.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON MATRIX PREVIEW TEASER */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#f8f9ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-[#006591] font-bold">
                  Decision Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                  Transparent Trade-Off Comparison
                </h2>
              </div>
              <span className="text-xs text-[#44474d] font-mono">
                Sample Benchmark Data: Walkway 400m Stretch
              </span>
            </div>

            {/* Matrix Table Container */}
            <div className="w-full bg-white rounded-xl shadow-xs border border-[#e5eeff] overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#dce9ff] text-[#0b1c30]">
                    <th className="py-3 px-4 font-bold uppercase text-xs">Metric / Attribute</th>
                    <th className="py-3 px-4 font-bold uppercase text-xs">Plan A: Budget</th>
                    <th className="py-3 px-4 font-bold uppercase text-xs">Plan B: Eco-Green</th>
                    <th className="py-3 px-4 font-bold uppercase text-xs">Plan C: Universal Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff] text-[#44474d]">
                  <tr className="hover:bg-[#eff4ff] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0b1c30]">Total Cost (INR ₹)</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0b1c30]">₹1,95,000</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#006591]">₹4,85,000</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0b1c30]">₹3,40,000</td>
                  </tr>
                  <tr className="bg-[#eff4ff]/40 hover:bg-[#eff4ff] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0b1c30]">Shade Gain (%)</td>
                    <td className="py-3 px-4">+15% (Fabric sails)</td>
                    <td className="py-3 px-4 text-[#009969] font-bold">+68% (Tree Canopy)</td>
                    <td className="py-3 px-4">+25% (Covered pergolas)</td>
                  </tr>
                  <tr className="hover:bg-[#eff4ff] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0b1c30]">Accessibility Compliance</td>
                    <td className="py-3 px-4">
                      <span className="bg-[#ffdad6] text-[#93000a] text-[11px] px-2 py-0.5 rounded font-semibold">
                        Partial
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-[#dce9ff] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-semibold">
                        Good
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-[#6ffbbe] text-[#002113] text-[11px] px-2 py-0.5 rounded font-bold">
                        100% Certified
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-[#eff4ff]/40 hover:bg-[#eff4ff] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0b1c30]">Implementation Time</td>
                    <td className="py-3 px-4">3 Weeks</td>
                    <td className="py-3 px-4">8 Weeks</td>
                    <td className="py-3 px-4">5 Weeks</td>
                  </tr>
                  <tr className="hover:bg-[#eff4ff] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#0b1c30]">Upkeep Frequency</td>
                    <td className="py-3 px-4">Bi-monthly patchup</td>
                    <td className="py-3 px-4">Seasonal arbor care</td>
                    <td className="py-3 px-4">Quarterly inspections</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('plan-comparison-matrix')}
                className="inline-flex items-center gap-1.5 text-[#006591] font-semibold text-xs sm:text-sm hover:underline cursor-pointer"
              >
                <span>Open Detailed 5-Theme Comparison Matrix</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>
        </section>

        {/* PHOTO DEMO GALLERY TEASER WITH INTERACTIVE BEFORE/AFTER */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#eff4ff]">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-[#006591] font-bold">
                Visual Proof of Concept
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
                Real Spaces Transformed by AI Reasoning
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transformation 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5eeff] flex flex-col">
                <div className="relative">
                  <BeforeAfterSlider
                    beforeImage={VISBUILD_ASSETS.heroBefore}
                    afterImage={VISBUILD_ASSETS.transformedSolar}
                    beforeLabel="Before: Scorching Concrete"
                    afterLabel="After: Solar Pergolas & Shade"
                    heightClass="h-64 sm:h-72"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#6ffbbe] text-[#002113] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs z-20 pointer-events-none">
                    ₹3,80,000 Budget Cap
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="text-base font-bold text-[#0b1c30]">Engineering Faculty Spine Walkway</div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Converted 250m of scorching paved concrete into a shaded corridor with integrated smartphone
                    charging stations and bioswale storm channels.
                  </p>
                </div>
              </div>

              {/* Transformation 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5eeff] flex flex-col">
                <div className="relative">
                  <BeforeAfterSlider
                    beforeImage={VISBUILD_ASSETS.heroBefore}
                    afterImage={VISBUILD_ASSETS.transformedLibrary}
                    beforeLabel="Before: Broken Steps"
                    afterLabel="After: 1:12 Ramp & Tactile"
                    heightClass="h-64 sm:h-72"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#c9e6ff] text-[#001e2f] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs z-20 pointer-events-none">
                    IRC-103 Certified
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="text-base font-bold text-[#0b1c30]">South City Public Library Approach</div>
                  <p className="text-xs text-[#44474d] leading-relaxed">
                    Eliminated 3 hazardous broken steps with an inclusive 1:12 ramp while preserving 100% of
                    surrounding historic shade tree roots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION BANNER */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto bg-[#000412] text-white rounded-xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            {/* Decorative Ambient Light Shape */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#006591]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-2 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-[#6ffbbe] text-[11px] px-2.5 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                Zero Setup Required • Instant Analysis
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Ready to Upgrade Your Campus or City Block?
              </h2>
              <p className="text-xs sm:text-sm text-[#7886a3] leading-relaxed">
                Snap a single photograph of your walkway, courtyard, or corridor. Receive computer vision bottleneck
                audits and three costed intervention strategies in under two minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onNavigate('new-infrastructure-audit')}
                className="inline-flex items-center justify-center gap-2 bg-[#006591] text-white hover:bg-[#39b8fd] hover:text-[#001e2f] px-6 py-3.5 rounded-lg transition-all shadow-md group font-bold text-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                <span>Start Your First Audit</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('reports-export')}
                className="inline-flex items-center justify-center gap-2 bg-[#0f1e36] text-white hover:bg-white/10 px-5 py-3.5 rounded-lg transition-colors text-sm font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
                <span>Download Sample DPR</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#eff4ff] px-4 sm:px-6 lg:px-8 py-3 border-t border-[#e5eeff]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[#44474d] text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4edea3]" />
            <span>AI Assessment Engine v2.4</span>
            <span className="text-[#c5c6ce]">|</span>
            <span>Computer Vision Model YOLO-Urban-X</span>
          </div>
          <div>
            <span className="text-[11px] text-[#75777e]">
              Verification Notice: Cost estimates are indicative (INR ₹) and subject to on-site engineering review.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
