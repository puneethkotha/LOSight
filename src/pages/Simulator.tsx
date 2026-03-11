import { useState } from "react";
import { Beaker, Info } from "lucide-react";
import { AGE_GROUPS, SEVERITY_LABELS, REGIONS, CLINICAL_CLUSTERS, GMLOS_BY_CLUSTER, LOS_BINS } from "../data/projectData";

export function Simulator() {
  const [ageGroup, setAgeGroup] = useState("30-49");
  const [severity, setSeverity] = useState<number>(2);
  const [region, setRegion] = useState("New York");
  const [clinicalCluster, setClinicalCluster] = useState("Heart Failure");
  const [isEmergent, setIsEmergent] = useState(true);
  const [isMedicare, setIsMedicare] = useState(false);

  const gmlos = GMLOS_BY_CLUSTER[clinicalCluster] ?? 5;

  const computeBin = (): { bin: number; score: number } => {
    let score = 0;
    const ageScores: Record<string, number> = { "18-29": 0, "30-49": 0.2, "50-69": 0.4, "70+": 0.6 };
    score += ageScores[ageGroup] ?? 0.2;
    score += (severity / 4) * 0.4;
    score += (gmlos / 15) * 0.3;
    if (isEmergent) score += 0.15;
    if (isMedicare) score += 0.1;
    if (region === "Western NY" || region === "Central NY") score += 0.05;

    if (score < 0.35) return { bin: 0, score };
    if (score < 0.6) return { bin: 1, score };
    return { bin: 2, score };
  };

  const { bin: predictedBin, score: riskScore } = computeBin();

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Beaker className="w-7 h-7 text-teal-600" />
          LOS Risk Simulator
        </h1>
        <div className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600">
            Simplified simulation based on model feature importance. Not the trained model. Adjust inputs to explore how
            age, severity, clinical cluster, GMLOS, region, and admission type influence predicted LOS bin.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-6">
          <h2 className="font-semibold text-slate-900">Patient Profile</h2>

          <div>
            <label htmlFor="sim-age" className="block text-sm font-medium text-slate-700 mb-2">Age Group</label>
            <select
              id="sim-age"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {AGE_GROUPS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sim-severity" className="block text-sm font-medium text-slate-700 mb-2">Severity of Illness (0-4)</label>
            <select
              id="sim-severity"
              value={String(severity)}
              onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {SEVERITY_LABELS.map((_, i) => (
                <option key={i} value={String(i)}>{i}: {SEVERITY_LABELS[i]}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sim-cluster" className="block text-sm font-medium text-slate-700 mb-2">Clinical Cluster</label>
            <select
              id="sim-cluster"
              value={clinicalCluster}
              onChange={(e) => setClinicalCluster(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {CLINICAL_CLUSTERS.map((c) => (
                <option key={c} value={c}>{c} (GMLOS: {GMLOS_BY_CLUSTER[c] ?? "?"}d)</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sim-region" className="block text-sm font-medium text-slate-700 mb-2">Region</label>
            <select
              id="sim-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isEmergent}
                onChange={(e) => setIsEmergent(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Emergency admission</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isMedicare}
                onChange={(e) => setIsMedicare(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-700">Medicare</span>
            </label>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-4">Predicted LOS Bin</h2>
          <div className={`p-6 rounded-xl text-center ${
            predictedBin === 0 ? "bg-teal-50 border border-teal-200" :
            predictedBin === 1 ? "bg-amber-50 border border-amber-200" :
            "bg-red-50 border border-red-200"
          }`}>
            <div className="text-2xl font-bold text-slate-900 mb-2">
              {LOS_BINS[predictedBin].label}
            </div>
            <div className="text-slate-600">{LOS_BINS[predictedBin].range}</div>
            <p className="text-sm text-slate-500 mt-4">
              {predictedBin === 0 && "Typical stay. Standard workflow."}
              {predictedBin === 1 && "Extended stay. Consider early flag for care manager."}
              {predictedBin === 2 && "Very long stay. Recommend discharge planning from day 1."}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
              <span className="font-medium">GMLOS for {clinicalCluster}:</span> {gmlos} days
            </div>
            <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-500">
              Risk score: {(riskScore * 100).toFixed(1)} (updates as you change inputs)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
