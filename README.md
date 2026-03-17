# LOSight

**Hospital length-of-stay prediction for NY hospitals.** Risk-stratify patients at admission for proactive discharge planning and bed management. Predict whether patients will have typical (0-6 days), extended (7-12 days), or very long (>12 days) stays.

[![Live Demo](https://img.shields.io/badge/demo-live-2563eb)](https://puneethkotha.github.io/LOSight/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Built on SPARCS 2024 data: 1.78M adult medical and surgical discharges across New York State.

---

## The Problem

US healthcare expenditure reached $4.9 trillion in 2024. Hospital care accounts for 31% of total spending. Length of stay drives costs, capacity planning, and patient outcomes.

Hospitals cannot anticipate which patients will require extended care at admission. Without risk stratification, discharge planning is reactive rather than proactive. Beds are held longer than necessary. High-risk patients are not flagged early for intervention.

**Result:** Inefficient resource allocation, delayed discharges, increased costs, and suboptimal patient flow.

---

## The Solution

LOSight predicts hospital length of stay at admission using patient demographics, clinical severity, admission type, and diagnosis cluster. The model assigns patients to three risk categories:

- **Typical:** 0-6 days (76% of cases)
- **Extended:** 7-12 days (15% of cases)
- **Very Long:** >12 days (9% of cases)

Clinical teams can use predictions to:

- Allocate discharge planning resources to high-risk patients on day 1
- Identify candidates for early social work or case management
- Improve bed turnover forecasting
- Reduce avoidable extended stays through proactive intervention

---

## Demo

**Live:** [puneethkotha.github.io/LOSight](https://puneethkotha.github.io/LOSight/)

Navigate through:
- Problem statement and healthcare context
- SPARCS dataset characteristics
- Model architecture and training approach
- Classification results and confusion matrix
- Impact calculator (cost/benefit analysis)
- LOS simulator (interactive patient profiling)

---

## Architecture

```
SPARCS 2024 Raw Data (1.78M discharges)
      ↓
Data Cleaning & Feature Engineering
      ↓
Three-Class Stratification
 [0: 0-6 days | 1: 7-12 days | 2: >12 days]
      ↓
Stratified Train/Test Split
      ↓
Model Training Pipeline
 - Baseline: XGBoost Regressor
 - Alternatives: Logistic, HGB, CatBoost, MLP
      ↓
Random Forest Classifier
 (Best recall on minority classes)
      ↓
Prediction Output: LOS Bin + Confidence
```

**Why Random Forest:** Logistic regression, histogram gradient boosting, CatBoost, and neural networks achieved high accuracy (78%+) but very low recall on extended and very long stays. They defaulted to class 0 (typical stay). Random Forest traded 10 points of accuracy for 5x better recall on minority classes.

**Key metrics:**
- Class 0 recall: 0.73 (typical stays)
- Class 1 recall: 0.42 (extended stays)
- Class 2 recall: 0.60 (very long stays)
- Macro F1: 0.53

Fine-tuning improved accuracy but reduced recall on high-risk patients. Baseline Random Forest was retained.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7.3 |
| Styling | Tailwind CSS 4.2 |
| Routing | React Router 7.13 |
| Charts | Recharts 3.8 |
| Icons | Lucide React |
| Deployment | GitHub Pages |

**Frontend only:** No backend. Model results and simulations use precomputed data and client-side logic. Full ML pipeline (Python) not included in this repo.

---

## Quickstart

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Clone
git clone https://github.com/puneethkotha/LOSight
cd LOSight

# 2. Install
npm install

# 3. Run
npm run dev
```

Open [localhost:5173](http://localhost:5173).

---

## SPARCS Data

**Source:** New York State Department of Health Statewide Planning and Research Cooperative System (SPARCS).

**Dataset:** 2024 hospital inpatient discharges. Public use de-identified dataset.

**Scope:** 1.78M adult medical and surgical discharges across all NYS hospitals.

**Key features:**
- **Demographics:** Age group (18-29, 30-49, 50-69, 70+), gender, race/ethnicity
- **Clinical:** APR severity (1-4), APR risk of mortality (1-4), CCS diagnosis cluster, APR-DRG clinical cluster
- **Admission:** Emergency vs elective, admission source
- **Payment:** Medicaid, Medicare, private, self-pay
- **Geography:** Hospital region (NYC, Long Island, Hudson Valley, Western NY, etc.)
- **Reference:** GMLOS (geometric mean length of stay for APR-DRG)

**Exclusions:**
- Pediatric discharges (<18 years)
- Obstetric service area (kept childbirth in medical/surgical for comparison)
- Incomplete records (missing LOS, severity, or cluster)

**Target variable:** Length of stay (days), binned into three classes.

**Class distribution:**
- Class 0 (typical): 76%
- Class 1 (extended): 15%
- Class 2 (very long): 9%

---

## Model Details

### Feature Engineering

10 features used for classification:

1. **Age x Severity:** Interaction term (age group × APR severity). Highest importance (14%).
2. **APR Severity:** 1 (minor) to 4 (catastrophic). Second highest importance (12%).
3. **Clinical Cluster:** Top 10 APR-DRG clusters (sepsis, childbirth, heart failure, joint replacement, etc.). 11% importance.
4. **GMLOS:** Geometric mean LOS for APR-DRG. National benchmark. 10% importance.
5. **Region:** Hospital region (8 regions across NYS). 9% importance.
6. **Age Group:** 18-29, 30-49, 50-69, 70+. 8% importance.
7. **APR Risk of Mortality:** 1-4 scale. 7% importance.
8. **is_medicare:** Binary. 6% importance.
9. **is_medicaid:** Binary. 5% importance.
10. **is_emergent:** Emergency admission flag. 4% importance (lower than expected).

**Feature exclusions:**
- Discharge disposition excluded (data leakage - only known at discharge, not admission)
- Specific diagnosis codes excluded (too sparse, captured via clinical cluster)

### Training

**Split:** 80/20 stratified train/test. Stratification preserves class distribution.

**Class weights:** Balanced. Minority classes weighted inversely proportional to frequency.

**Hyperparameters (baseline Random Forest):**
- `n_estimators`: 100
- `max_depth`: None
- `min_samples_split`: 2
- `class_weight`: balanced
- Random seed: 42

**Alternatives tested:**
- XGBoost Regressor (baseline): RMSE 6.03, MAE 3.12, R² 0.414
- Logistic Regression: 77.8% accuracy, 7.6% recall (class 1), 18% recall (class 2)
- Hist Gradient Boosting: 78% accuracy, poor minority recall
- CatBoost: 78% accuracy, poor minority recall
- Neural Network (MLP): 78.5% accuracy, poor minority recall

All high-accuracy models failed to detect extended/very long stays.

### Results

**Random Forest Confusion Matrix (test set):**

| Actual / Predicted | Class 0 | Class 1 | Class 2 |
|-------------------|---------|---------|---------|
| **Class 0 (typical)** | 197,594 | 63,033 | 10,038 |
| **Class 1 (extended)** | 22,474 | 22,474 | 8,183 |
| **Class 2 (very long)** | 6,456 | 6,634 | 19,423 |

**Metrics:**
- Overall accuracy: 67.2%
- Class 0 precision: 0.87 | recall: 0.73
- Class 1 precision: 0.24 | recall: 0.42
- Class 2 precision: 0.52 | recall: 0.60
- Macro F1: 0.53

**Interpretation:**
- Model correctly identifies 60% of very long stays (class 2).
- 42% recall on extended stays (class 1) is acceptable for a first-pass flag.
- 73% recall on typical stays means 27% of typical patients are flagged as higher risk (false positives).

**Model limitations:**
- Precision on class 1 is 24%. Three-quarters of predicted extended stays are false positives.
- High false positive rate increases unnecessary interventions.
- Not recommended for clinical deployment without refinement.

**Potential use case:** Screening tool, not diagnostic. Flag patients for manual review by discharge planning teams.

---

## Features

**Problem page:** Healthcare cost context, bed management challenges, LOS prediction value proposition.

**Data page:** SPARCS dataset overview, feature distributions by region and age, clinical cluster breakdown.

**Model page:** Regression baseline, classification model comparison, feature importance chart, Random Forest selection rationale.

**Results page:** Confusion matrix, precision/recall/F1 by class, classification report, accuracy vs recall tradeoff.

**Impact calculator:** Adjust cost per bed-day, intervention cost, true positive savings, false negative opportunity cost, false positive waste. Net financial impact estimate.

**LOS simulator:** Interactive patient profiling. Select age, severity, clinical cluster, region, admission type. See predicted LOS bin and explanation of contributing factors.

**Responsive design:** Works on desktop, tablet, mobile. Adaptive navigation and chart rendering.

---

## Development

```bash
# Run dev server with hot reload
npm run dev

# Type check
npx tsc -b

# Lint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

**Project structure:**

```
LOSight/
├── src/
│   ├── pages/
│   │   ├── Overview.tsx       # Landing page, navigation
│   │   ├── Problem.tsx        # Problem statement
│   │   ├── Data.tsx           # SPARCS data exploration
│   │   ├── Model.tsx          # Model training and selection
│   │   ├── Results.tsx        # Confusion matrix, metrics
│   │   ├── Calculator.tsx     # Financial impact calculator
│   │   └── Simulator.tsx      # Interactive LOS predictor
│   ├── components/
│   │   └── Layout.tsx         # Navigation, header, footer
│   ├── data/
│   │   └── projectData.ts     # Model results, SPARCS stats
│   ├── App.tsx                # Router setup
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── public/
│   └── vite.svg               # Favicon
├── index.html                 # HTML template
├── vite.config.ts             # Vite build config
├── tailwind.config.js         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

---

## Deployment

### GitHub Pages

Already deployed at [puneethkotha.github.io/LOSight](https://puneethkotha.github.io/LOSight/).

To redeploy:

1. Push to `main` branch.
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
3. Ensure `base` in `vite.config.ts` matches repo name (`base: '/LOSight/'`).

### Vercel

1. Import repo at [vercel.com](https://vercel.com).
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. Set `base: '/'` in `vite.config.ts` for root domain.

### Local Static Build

```bash
npm run build
# Output in dist/
# Serve with any static file server
```

---

## Roadmap

- [ ] Integrate calibrated probability scores (not just hard class predictions)
- [ ] Add SHAP or LIME explainability for individual predictions
- [ ] Retrain with cost-sensitive learning to reduce class 1 false positives
- [ ] Expand feature set (comorbidity indices, prior admission history if available)
- [ ] Evaluate CatBoost with focal loss for class imbalance
- [ ] Build API backend for real-time predictions
- [ ] Integrate with EHR systems (HL7 FHIR)
- [ ] Add audit logging for predictions (compliance, transparency)

---

## Contributing

This is a machine learning project built on 2024 SPARCS data. Contributions welcome.

To contribute:
1. Fork the repo
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

**Areas for improvement:**
- Model performance (especially class 1 precision)
- Feature engineering (interaction terms, polynomial features)
- UI/UX enhancements (better visualizations, accessibility)
- Documentation (model cards, data cards)

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Built By

**Puneeth Kotha**  
NYU MS Computer Engineering, 2026  
[GitHub](https://github.com/puneethkotha) · [LinkedIn](https://linkedin.com/in/puneeth-kotha-760360215) · [Website](https://puneethkotha.com)

---

## Acknowledgments

- New York State Department of Health for SPARCS public use dataset
- NYU faculty for project guidance and ML curriculum
- Open source maintainers of React, TypeScript, Vite, Recharts, and Tailwind CSS

---

**Healthcare ML project - Length of stay prediction on SPARCS 2024 data**
