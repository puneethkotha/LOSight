import { Building2, DollarSign, Bed, Users, TrendingUp } from "lucide-react";

export function Problem() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Problem Statement</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed">
            Compared to other high income countries, the United States spends almost twice as much per capita on health care,
            adding up to approximately $4.9T in 2023, or about 17-18% of GDP. Spending continues to increase and is projected
            to reach 19-20% over the next decade. Yet this does not translate to superior outcomes: lifespan in the US is 78.6,
            four years lower than the average comparable OECD countries.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Hospital care accounts for 31% ($1.5T in 2023). As expenses rise faster than inflation and regulatory requirements
            shift, hospitals are under increasing pressure to manage costs. 39% of hospitals operate with a negative operating
            margin. Operational efficiency is paramount.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Value-Based Care</h2>
          </div>
          <p className="text-sm text-slate-600">
            Revenue streams: Medicare 35%, Medicaid 19%, private insurance 37%. Pay-for-performance and value-based programs
            mean hospitals earn bonuses or face penalties based on quality and efficiency.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Bed className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Capacity Management</h2>
          </div>
          <p className="text-sm text-slate-600">
            High operating costs require hospitals to run at or near full capacity. When LOS is unpredictable or extended,
            hospitals face higher costs per case, limited bed availability, and risk of poorer outcomes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Project Goal</h2>
        <p className="text-slate-600 leading-relaxed">
          Improve operational efficiency and patient flow by shifting from reactive to proactive discharge and resource planning
          based on predictive LOS classification. At admission, hospital leaders, clinicians, and bed management teams lack a
          reliable way to identify high-risk patients. Predicting length of stay enables optimal bed management and highlights
          opportunities for interventions that could reduce LOS.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Stakeholder Benefits</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3 p-4 bg-white rounded-lg border border-slate-200">
            <Building2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-slate-900">COO / CFO</h3>
              <p className="text-sm text-slate-600">Optimized bed and staffing allocation, fewer avoidable bed-days, better value-based contract performance.</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 bg-white rounded-lg border border-slate-200">
            <Users className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-slate-900">CNO / CMO / Patients</h3>
              <p className="text-sm text-slate-600">Targeted early interventions for high-risk patients, smoother care transitions, shorter unnecessary stays.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Success Metrics</h2>
        <div className="flex flex-wrap gap-3">
          {[
            "High risk identification accuracy vs published benchmarks",
            "Bed occupancy rate, unit census, throughput",
            "Patient satisfaction, discharge delays, non-clinical days",
          ].map((metric) => (
            <span key={metric} className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-700">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              {metric}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
