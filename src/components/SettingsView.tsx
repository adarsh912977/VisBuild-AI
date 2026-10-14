import React, { useState } from 'react';
import { BenchmarkRates, NavPath } from '../types/civic';
import { DEFAULT_BENCHMARKS } from '../data/mockData';

interface SettingsViewProps {
  benchmarks: BenchmarkRates;
  onUpdateBenchmarks: (rates: BenchmarkRates) => void;
  onNavigate: (path: NavPath) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  benchmarks,
  onUpdateBenchmarks,
  onNavigate,
}) => {
  const [rates, setRates] = useState<BenchmarkRates>(benchmarks);
  const [saveAlert, setSaveAlert] = useState(false);
  const [apiTesting, setApiTesting] = useState(false);
  const [apiResult, setApiResult] = useState<string | null>(null);

  const handleSave = () => {
    onUpdateBenchmarks(rates);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleTestGemini = async () => {
    setApiTesting(true);
    setApiResult(null);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setApiResult(
        `Gemini API Status: ${data.status.toUpperCase()} • Model: ${data.model} • Server Version: v${data.version}`
      );
    } catch (e: any) {
      setApiResult(`Error testing API: ${e.message}`);
    } finally {
      setApiTesting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5eeff]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#006591] font-bold">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            System Benchmarks & Rates
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0b1c30]">
            Settings & Cost Benchmarks
          </h1>
          <p className="text-xs text-[#44474d] mt-1">
            Configure Public Works Schedule of Rates (SOR), IRC-103 strictness standards, and AI model parameters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-[#006591] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">save</span>
          <span>Save Benchmarks</span>
        </button>
      </div>

      {saveAlert && (
        <div className="bg-[#6ffbbe]/30 border border-[#009969] text-[#002416] p-3 rounded-lg text-xs flex items-center gap-2 font-semibold animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-[#009969]">check_circle</span>
          <span>Schedule of Rates benchmarks updated across all dynamic BOQ calculations.</span>
        </div>
      )}

      {/* Grid: SOR Settings & AI Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule of Rates (SOR) Benchmarks */}
        <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#eff4ff]">
            <span className="material-symbols-outlined text-[#006591] text-[20px]">currency_rupee</span>
            <h2 className="text-base font-bold text-[#0b1c30]">Schedule of Rates (SOR) Units</h2>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#0b1c30]">Regional Public Works Schedule</label>
            <select
              value={rates.sorRegion}
              onChange={(e) => setRates({ ...rates, sorRegion: e.target.value })}
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c5c6ce] rounded-lg text-xs font-medium focus:outline-hidden focus:border-[#006591]"
            >
              <option>CPWD Central Standard (2023-24)</option>
              <option>Delhi PWD Plinth & Pavement SOR</option>
              <option>Maharashtra PWD Schedule 2024</option>
              <option>Karnataka PWD Civic Infrastructure</option>
              <option>Tamil Nadu Highways & Works Schedule</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#44474d]">Permeable Concrete Pavers (80mm)</span>
              <div className="flex items-center gap-1">
                <span className="text-[#75777e]">₹</span>
                <input
                  type="number"
                  value={rates.permeablePaversPerSqM}
                  onChange={(e) =>
                    setRates({ ...rates, permeablePaversPerSqM: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-24 px-2 py-1 bg-[#f8f9ff] border border-[#c5c6ce] rounded text-right font-mono"
                />
                <span className="text-[#75777e]">/m²</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#44474d]">Tactile Warning Blister Tile (300x300mm)</span>
              <div className="flex items-center gap-1">
                <span className="text-[#75777e]">₹</span>
                <input
                  type="number"
                  value={rates.tactileTilePerUnit}
                  onChange={(e) =>
                    setRates({ ...rates, tactileTilePerUnit: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-24 px-2 py-1 bg-[#f8f9ff] border border-[#c5c6ce] rounded text-right font-mono"
                />
                <span className="text-[#75777e]">/tile</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#44474d]">Semi-Mature Native Tree (Neem/Arjun 3m)</span>
              <div className="flex items-center gap-1">
                <span className="text-[#75777e]">₹</span>
                <input
                  type="number"
                  value={rates.nativeTreePlanting}
                  onChange={(e) =>
                    setRates({ ...rates, nativeTreePlanting: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-24 px-2 py-1 bg-[#f8f9ff] border border-[#c5c6ce] rounded text-right font-mono"
                />
                <span className="text-[#75777e]">/tree</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#44474d]">In-Situ 1:12 Concrete Wheelchair Ramp</span>
              <div className="flex items-center gap-1">
                <span className="text-[#75777e]">₹</span>
                <input
                  type="number"
                  value={rates.curbRampCastUnit}
                  onChange={(e) =>
                    setRates({ ...rates, curbRampCastUnit: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-24 px-2 py-1 bg-[#f8f9ff] border border-[#c5c6ce] rounded text-right font-mono"
                />
                <span className="text-[#75777e]">/ramp</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#44474d]">Solar Walkway Lighting Bollard</span>
              <div className="flex items-center gap-1">
                <span className="text-[#75777e]">₹</span>
                <input
                  type="number"
                  value={rates.solarBollardPerUnit}
                  onChange={(e) =>
                    setRates({ ...rates, solarBollardPerUnit: parseInt(e.target.value, 10) || 0 })
                  }
                  className="w-24 px-2 py-1 bg-[#f8f9ff] border border-[#c5c6ce] rounded text-right font-mono"
                />
                <span className="text-[#75777e]">/unit</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Engine & Regulatory Standards */}
        <div className="flex flex-col gap-6">
          {/* Gemini AI Status Card */}
          <div className="bg-[#0f1e36] text-white p-5 rounded-xl flex flex-col gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6ffbbe] text-[20px]">smart_toy</span>
                <h3 className="text-sm font-bold">Gemini Multimodal Inference Engine</h3>
              </div>
              <span className="bg-[#002416] text-[#6ffbbe] text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-[#7886a3] leading-relaxed">
              Powering computer vision deficit segmentation, IRC-103 compliance parsing, and CPWD itemized
              quantities using model <strong className="text-white">gemini-3.8-flash</strong>.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                disabled={apiTesting}
                onClick={handleTestGemini}
                className="bg-[#006591] hover:bg-[#0284c7] text-white px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                {apiTesting ? 'Testing Server...' : 'Test Gemini Health'}
              </button>
            </div>

            {apiResult && (
              <div className="bg-[#000412] p-2.5 rounded text-xs font-mono text-[#6ffbbe] border border-white/10 mt-1">
                {apiResult}
              </div>
            )}
          </div>

          {/* Standards Compliance Protocols */}
          <div className="bg-white p-5 rounded-xl border border-[#e5eeff] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#eff4ff]">
              <span className="material-symbols-outlined text-[#009969] text-[20px]">verified_user</span>
              <h3 className="font-bold text-[#0b1c30]">Regulatory Compliance Toggles</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0b1c30]">IRC:103-2012 Pedestrian Guidelines</div>
                <div className="text-[11px] text-[#75777e]">Enforce 1.8m minimum walkway & 1:12 ramp maximums</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#006591] w-4 h-4 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0b1c30]">Indian Harmonized Guidelines 2021</div>
                <div className="text-[11px] text-[#75777e]">Enforce dual-tone yellow tactile blister guiding paths</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#006591] w-4 h-4 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#0b1c30]">CPWD Green Rating (GRIHA Civic Alignment)</div>
                <div className="text-[11px] text-[#75777e]">Require minimum 50% on-site rainwater percolation</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#006591] w-4 h-4 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
