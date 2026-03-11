import { Link } from "react-router-dom";
import { Target, Database, Cpu, BarChart3, Calculator, ArrowRight, Beaker } from "lucide-react";

const SECTIONS = [
  {
    title: "Problem",
    description: "US healthcare spends $4.9T annually. Hospital care accounts for 31%. Predicting length of stay enables proactive bed management and targeted interventions.",
    path: "/problem",
    icon: Target,
  },
  {
    title: "Data",
    description: "SPARCS 2024 dataset: 1.78M adult medical and surgical discharges across NYS. Clinical clusters, severity scores, demographics.",
    path: "/data",
    icon: Database,
  },
  {
    title: "Model",
    description: "Random Forest classifier with best recall on extended and very long stays. Regression baseline with XGBoost.",
    path: "/model",
    icon: Cpu,
  },
  {
    title: "Results",
    description: "Three-class LOS bins. Confusion matrix analysis. Model not recommended for deployment until refinement.",
    path: "/results",
    icon: BarChart3,
  },
  {
    title: "Impact Calculator",
    description: "Adjust cost assumptions and see net financial impact. TP savings, FN opportunity cost, FP intervention cost.",
    path: "/calculator",
    icon: Calculator,
  },
  {
    title: "LOS Simulator",
    description: "Explore how patient features drive predicted LOS bin. Simplified simulation based on model insights.",
    path: "/simulator",
    icon: Beaker,
  },
];

export function Overview() {
  return (
    <div className="space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          LOSight
        </h1>
        <p className="text-lg text-slate-600 mb-4">
          Predicting length of stay across New York State hospitals.
        </p>
        <p className="text-slate-600">
          LOSight predicts hospital length of stay from admission data. Risk-stratify patients for proactive discharge planning and bed management. Built on SPARCS 2024 with 1.78M adult medical and surgical discharges.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ title, description, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-slate-900 group-hover:text-teal-700">{title}</h2>
                <p className="text-sm text-slate-600 mt-1 line-clamp-3">{description}</p>
                <span className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
