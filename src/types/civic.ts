export type NavPath =
  | 'overview-dashboard'
  | 'new-infrastructure-audit'
  | 'audit-results-vision-ai-findings'
  | 'three-improvement-plans'
  | 'plan-comparison-matrix'
  | 'detailed-project-roadmap'
  | 'reports-export'
  | 'settings-cost-benchmarks';

export type DeficitSeverity = 'CRITICAL' | 'MODERATE' | 'LOW';

export interface DeficitItem {
  id: string;
  title: string;
  category: string;
  severity: DeficitSeverity;
  surfaceTempCelsius: number;
  ircViolation: string;
  impact: string;
  coordinate: { x: number; y: number };
  proposedFix: string;
}

export interface BOQItem {
  item: string;
  rate: number;
  qty: string;
  amount: number;
}

export interface ImprovementPlan {
  id: string;
  key: string;
  name: string;
  tagline: string;
  totalCostInr: number;
  shadeGainPercent: number;
  accessibilityScore: number;
  implementationWeeks: number;
  maintenanceProfile: string;
  feasibility: string;
  boq: BOQItem[];
  pros: string[];
  cons: string[];
  imageBefore?: string;
  imageAfter?: string;
}

export interface AuditSession {
  instanceId: string;
  locationName: string;
  auditTimestamp: string;
  confidenceScore: number;
  inferenceDurationMs: number;
  summary: string;
  imageBeforeUrl: string;
  imageAfterUrl: string;
  budgetCap: number;
  corridorLengthMeters: number;
  deficits: DeficitItem[];
  metrics: {
    currentShadePercentage: number;
    ircComplianceScore: number;
    thermalIndexCelsius: number;
    stormwaterAbsorptionRate: number;
  };
  plans: ImprovementPlan[];
}

export interface BenchmarkRates {
  sorRegion: string;
  permeablePaversPerSqM: number;
  tactileTilePerUnit: number;
  nativeTreePlanting: number;
  curbRampCastUnit: number;
  tensileShadePerBay: number;
  solarBollardPerUnit: number;
}
