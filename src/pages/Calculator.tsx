import { useState } from "react";
import { Calculator, DollarSign } from "lucide-react";
import { CONFUSION_MATRIX } from "../data/projectData";

export function CalculatorPage() {
  const [tpSavings, setTpSavings] = useState(1000);
  const [fpCost, setFpCost] = useState(100);
  const [fnCost, setFnCost] = useState(2000);

  const { tp, fn, fp } = CONFUSION_MATRIX;

  const calcClass = (tpVal: number, fnVal: number, fpVal: number) => {
    const savings = tpVal * tpSavings;
    const fnLoss = fnVal * fnCost;
    const fpLoss = fpVal * fpCost;
    return { savings, fnLoss, fpLoss, net: savings - fnLoss - fpLoss };
  };

  const c0 = calcClass(tp.class0, fn.class0, fp.class0);
  const c1 = calcClass(tp.class1, fn.class1, fp.class1);
  const c2 = calcClass(tp.class2, fn.class2, fp.class2);

  const totalNet = c0.net + c1.net + c2.net;

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Calculator className="w-7 h-7 text-teal-600" />
          Financial Impact Calculator
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl">
          Adjust cost assumptions to see net financial impact. Formula: Net = (TP x savings) - (FP x intervention cost) - (FN x missed bed cost).
          Using report defaults: $1,000 per TP, $100 per FP, $2,000 per FN.
        </p>
      </section>

      <section className="space-y-6">
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200">
            <h2 className="font-semibold text-slate-900 mb-4">Cost Assumptions</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="calc-tp" className="block text-sm font-medium text-slate-700 mb-1">
                  Savings per correctly flagged long-stay patient (TP)
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <input
                    id="calc-tp"
                    type="number"
                    min={0}
                    step={100}
                    value={tpSavings}
                    onChange={(e) => setTpSavings(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="calc-fp" className="block text-sm font-medium text-slate-700 mb-1">
                  Cost per false alarm (FP) intervention
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <input
                    id="calc-fp"
                    type="number"
                    min={0}
                    step={10}
                    value={fpCost}
                    onChange={(e) => setFpCost(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="calc-fn" className="block text-sm font-medium text-slate-700 mb-1">
                  Opportunity cost per missed long-stay (FN)
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <input
                    id="calc-fn"
                    type="number"
                    min={0}
                    step={100}
                    value={fnCost}
                    onChange={(e) => setFnCost(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Class</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">TP Savings</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">FN Cost</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">FP Cost</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900">Net Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Class 0 (typical)</td>
                  <td className="py-3 px-4 text-right">{(tp.class0 * tpSavings / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fn.class0 * fnCost / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fp.class0 * fpCost / 1e6).toFixed(1)}M</td>
                  <td className={`py-3 px-4 text-right font-medium ${c0.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${(c0.net / 1e6).toFixed(1)}M
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Class 1 (extended)</td>
                  <td className="py-3 px-4 text-right">{(tp.class1 * tpSavings / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fn.class1 * fnCost / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fp.class1 * fpCost / 1e6).toFixed(1)}M</td>
                  <td className={`py-3 px-4 text-right font-medium ${c1.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${(c1.net / 1e6).toFixed(1)}M
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4">Class 2 (very long)</td>
                  <td className="py-3 px-4 text-right">{(tp.class2 * tpSavings / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fn.class2 * fnCost / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-4 text-right">{(fp.class2 * fpCost / 1e6).toFixed(1)}M</td>
                  <td className={`py-3 px-4 text-right font-medium ${c2.net >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${(c2.net / 1e6).toFixed(1)}M
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 max-w-md">
          <h2 className="font-semibold text-slate-900 mb-2">Total Net Impact</h2>
          <div className={`text-3xl font-bold ${totalNet >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${(totalNet / 1e6).toFixed(1)}M
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {totalNet >= 0
              ? "Positive net impact. Model may be viable under these assumptions."
              : "Negative net impact. Threshold adjustment or cost optimization may help."}
          </p>
        </div>
      </section>
    </div>
  );
}
