import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LOS_BINS, MDC_LOS } from "../data/projectData";

const BIN_COLORS = ["#0d9488", "#0f766e", "#134e4a"];

export function Data() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Data Understanding</h1>
        <p className="text-slate-600 leading-relaxed">
          Dataset from NY State Department of Health. 2024 SPARCS (Statewide Planning and Research Cooperative System)
          Inpatient De-identified file. Discharge-level detail from all NYS hospitals. De-identified to protect patient privacy.
          Original: 2.2M rows, 33 variables.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          Scope: adult (18+) medical and surgical patients. Excluded pediatric, mental health, rehabilitation, transplant.
          Filtered to 1.78M rows.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Target Variable: LOS Bins</h2>
        <p className="text-slate-600 mb-6">
          Length of stay is heavily right-skewed. Decile cutoffs created three ordered categories. 80th percentile ~7 days,
          90th percentile ~12 days.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {LOS_BINS.map((bin) => (
            <div key={bin.id} className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-teal-600">{bin.range}</div>
              <div className="text-slate-700 font-medium mt-1">{bin.label}</div>
              <div className="text-sm text-slate-500 mt-2">
                {bin.count.toLocaleString()} discharges ({bin.pct}%)
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Class Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={LOS_BINS}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ payload }) => payload ? `${payload.label} (${payload.pct}%)` : ""}
              >
                {LOS_BINS.map((_, i) => (
                  <Cell key={i} fill={BIN_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => (v != null ? Number(v).toLocaleString() : "")} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Median LOS by Body System (Top MDCs)</h2>
        <div className="h-72 bg-white rounded-xl border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MDC_LOS} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 8]} tick={{ fontSize: 12 }} />
              <YAxis dataKey="mdc" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="medianLOS" fill="#0d9488" radius={[0, 4, 4, 0]} name="Median LOS (days)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Key Features</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Features</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4">Clinical</td>
                <td className="py-3 px-4">Clinical cluster (115), GMLOS, APR severity, APR risk of mortality, is_surgical, is_procedure, is_emergent</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4">Demographic</td>
                <td className="py-3 px-4">Region (8), age group, race, ethnicity, gender, is_medicare, is_medicaid</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 px-4">Engineered</td>
                <td className="py-3 px-4">Age x Severity (16 categories)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
