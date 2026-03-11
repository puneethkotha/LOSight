import { AlertTriangle } from "lucide-react";
import { CONFUSION_MATRIX, LOS_BINS } from "../data/projectData";

export function Results() {
  const { tp, fn, fp } = CONFUSION_MATRIX;

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Results and Evaluation</h1>
        <p className="text-slate-600 leading-relaxed">
          We favor recall over accuracy for extended and very long stays. The model performs well for class 0; the main weakness
          is identifying class 1 (extended) patients. Many are classified as typical. Combining class 1 and 2 as "long" gives
          moderate improvement.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900">Deployment Recommendation</h3>
            <p className="text-sm text-amber-800">
              Under our cost assumptions, net financial impact is negative (~$5.8M). We do not recommend deploying this model
              in its current form. Threshold adjustment, class-specific costs, and operational redesign may improve impact.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Confusion Matrix</h2>
        <p className="text-slate-600 mb-4">
          True label on rows, predicted on columns. Diagonal = correct. TP catches, FN missed, FP unnecessary alarms.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full max-w-xl border-collapse bg-white rounded-xl border border-slate-200 shadow-sm">
            <thead>
              <tr>
                <th className="border border-slate-200 p-2"></th>
                <th className="border border-slate-200 p-2 text-slate-600 font-medium">Pred 0</th>
                <th className="border border-slate-200 p-2 text-slate-600 font-medium">Pred 1</th>
                <th className="border border-slate-200 p-2 text-slate-600 font-medium">Pred 2</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="border border-slate-200 p-2 font-medium text-slate-700">True 0</td>
                <td className="border border-slate-200 p-2 bg-teal-50 text-center font-medium">{tp.class0.toLocaleString()}</td>
                <td className="border border-slate-200 p-2 text-center">{fp.class1 > 0 ? "49,943" : ""}</td>
                <td className="border border-slate-200 p-2 text-center">{fp.class2 > 0 ? "23,128" : ""}</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-medium text-slate-700">True 1</td>
                <td className="border border-slate-200 p-2 text-center">19,652</td>
                <td className="border border-slate-200 p-2 bg-teal-50 text-center font-medium">{tp.class1.toLocaleString()}</td>
                <td className="border border-slate-200 p-2 text-center">11,005</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-2 font-medium text-slate-700">True 2</td>
                <td className="border border-slate-200 p-2 text-center"></td>
                <td className="border border-slate-200 p-2 text-center">13,090</td>
                <td className="border border-slate-200 p-2 bg-teal-50 text-center font-medium">{tp.class2.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {LOS_BINS.map((bin, i) => (
            <div key={bin.id} className="p-3 bg-slate-50 rounded-lg text-sm">
              <span className="font-medium text-slate-700">{bin.label}:</span> TP {[tp.class0, tp.class1, tp.class2][i].toLocaleString()}, FN {[fn.class0, fn.class1, fn.class2][i].toLocaleString()}, FP {[fp.class0, fp.class1, fp.class2][i].toLocaleString()}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Impact Framework</h2>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <span className="font-semibold text-green-800 shrink-0">True Positive</span>
            <p className="text-sm text-green-700">Correct identification of long-stay patient. Early intervention can shorten LOS and improve satisfaction.</p>
          </div>
          <div className="flex gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="font-semibold text-red-800 shrink-0">False Negative</span>
            <p className="text-sm text-red-700">Long-stay patient not flagged. Care stays reactive; bed blocking, higher costs, lost opportunity.</p>
          </div>
          <div className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="font-semibold text-amber-800 shrink-0">False Positive</span>
            <p className="text-sm text-amber-700">Short-stay patient incorrectly flagged. Unnecessary staff time and intervention cost.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
