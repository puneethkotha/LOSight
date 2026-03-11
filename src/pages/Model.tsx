import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { REGRESSION_RESULTS, CLASSIFICATION_RESULTS, FEATURE_IMPORTANCE } from "../data/projectData";

export function Model() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Modeling Approach</h1>
        <p className="text-slate-600 leading-relaxed">
          We performed regression on the full dataset for baseline, then classification with stratified train/test split.
          Models evaluated: Random Forest, Logistic Regression, Hist Gradient Boosting, CatBoost, Neural Network (MLP).
          We focused on F1, precision, recall. Not AUC, due to class imbalance masking poor minority-class performance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Regression Models</h2>
        <p className="text-slate-600 mb-4">
          XGBoost achieved RMSE 6.03, MAE 3.12. Variability limits real-time use; regression output could serve as a feature
          in future classification. Discharge disposition excluded to avoid leakage.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Model</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-900">RMSE</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-900">MAE</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-900">R2</th>
              </tr>
            </thead>
            <tbody>
              {REGRESSION_RESULTS.map((row) => (
                <tr key={row.model} className="border-b border-slate-100">
                  <td className="py-3 px-4">{row.model}</td>
                  <td className="py-3 px-4 text-right">{row.rmse.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">{row.mae.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">{row.r2.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Classification: Why Random Forest</h2>
        <p className="text-slate-600 mb-4">
          Logistic regression, HGB, CatBoost, and MLP had high accuracy but very low recall for extended and very long stays;
          they mostly defaulted to class 0. Random Forest traded accuracy for much better recall on bins 1 (0.42) and 2 (0.60),
          and best macro-F1 (~0.53). Fine-tuned RF slightly improved accuracy but reduced recall on minority classes, so we kept
          the baseline RF.
        </p>
        <div className="h-64 bg-white rounded-xl border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CLASSIFICATION_RESULTS} margin={{ top: 10, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="model" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={60} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="recall1" fill="#0d9488" name="Recall Bin 1 (extended)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="recall2" fill="#0f766e" name="Recall Bin 2 (very long)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Feature Importance (Random Forest)</h2>
        <div className="h-72 bg-white rounded-xl border border-slate-200 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...FEATURE_IMPORTANCE].reverse()} layout="vertical" margin={{ left: 80, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 0.2]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={75} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => (v != null ? (Number(v) * 100).toFixed(1) + "%" : "")} />
              <Bar dataKey="importance" fill="#0d9488" radius={[0, 4, 4, 0]} name="Importance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-3">
          Age, severity, clinical cluster drive LOS. Region ranks high; hospital-level variation may matter. is_emergent ranked
          lower than expected.
        </p>
      </section>
    </div>
  );
}
