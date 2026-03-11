import { Outlet, Link, useLocation } from "react-router-dom";
import { Activity, Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { GITHUB_URL } from "../data/projectData";

const NAV_LINKS = [
  { path: "/", label: "Overview", icon: Activity },
  { path: "/problem", label: "Problem" },
  { path: "/data", label: "Data" },
  { path: "/model", label: "Model" },
  { path: "/results", label: "Results" },
  { path: "/calculator", label: "Impact Calculator" },
  { path: "/simulator", label: "LOS Simulator" },
];

export function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-slate-800 hover:text-teal-600 transition-colors">
              <Activity className="w-7 h-7 text-teal-600" />
              <span className="font-semibold text-lg">LOSight</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
            {GITHUB_URL && (
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === path ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileOpen && (
            <nav className="md:hidden py-4 border-t border-slate-200 flex flex-col gap-1">
              {NAV_LINKS.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === path ? "bg-teal-50 text-teal-700" : "text-slate-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 mt-16 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-slate-500">
          <span>LOSight: length of stay prediction for NY State hospitals. SPARCS 2024 data.</span>
          {GITHUB_URL && (
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
