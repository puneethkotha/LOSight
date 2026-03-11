export const GITHUB_URL = "https://github.com/puneethkotha/LOSight";

export const REGIONS = [
  "New York",
  "Long Island",
  "Hudson Valley",
  "Catskill/Adirondacks",
  "Finger Lakes",
  "Western NY",
  "Central NY",
  "Southern Tier",
];

export const AGE_GROUPS = ["18-29", "30-49", "50-69", "70+"];

export const SEVERITY_LABELS = ["Minor", "Moderate", "Major", "Extreme", "Catastrophic"];

export const CLINICAL_CLUSTERS = [
  "Sepsis",
  "Childbirth",
  "Heart Failure",
  "Major Joint Replacement",
  "Spinal Fusion",
  "Tracheostomy",
  "Major Respiratory",
  "Appendicitis",
  "Vaginal Delivery",
  "Pneumonia",
];

export const GMLOS_BY_CLUSTER: Record<string, number> = {
  Sepsis: 7,
  Childbirth: 2,
  "Heart Failure": 5,
  "Major Joint Replacement": 4,
  "Spinal Fusion": 6,
  Tracheostomy: 22,
  "Major Respiratory": 8,
  Appendicitis: 2,
  "Vaginal Delivery": 2,
  Pneumonia: 5,
};

export const REGRESSION_RESULTS = [
  { model: "XGBoost Regressor", rmse: 6.03, mae: 3.12, r2: 0.414 },
  { model: "Ridge Regression", rmse: 6.12, mae: 3.27, r2: 0.395 },
  { model: "Linear Regression", rmse: 6.12, mae: 3.27, r2: 0.394 },
  { model: "Lasso Regression", rmse: 6.14, mae: 3.26, r2: 0.391 },
  { model: "Random Forest Regressor", rmse: 6.21, mae: 3.06, r2: 0.377 },
];

export const CLASSIFICATION_RESULTS = [
  { model: "Logistic Regression", accuracy: 0.778, recall1: 0.076, recall2: 0.18 },
  { model: "Random Forest", accuracy: 0.672, recall1: 0.423, recall2: 0.597 },
  { model: "Hist Gradient Boosting", accuracy: 0.78, recall1: 0.066, recall2: 0.17 },
  { model: "CatBoost", accuracy: 0.78, recall1: 0.1, recall2: 0.25 },
  { model: "Neural Network (MLP)", accuracy: 0.785, recall1: 0.08, recall2: 0.2 },
];

export const CONFUSION_MATRIX = {
  tp: { class0: 197594, class1: 22474, class2: 19423 },
  fn: { class0: 73071, class1: 30657, class2: 13090 },
  fp: { class0: 19652, class1: 63033, class2: 34133 },
};

export const LOS_BINS = [
  { id: 0, label: "Typical (0-6 days)", range: "0-6 days", count: 1353323, pct: 76.0 },
  { id: 1, label: "Extended (7-12 days)", range: "7-12 days", count: 265655, pct: 14.9 },
  { id: 2, label: "Very Long (>12 days)", range: ">12 days", count: 162565, pct: 9.1 },
];

export const FEATURE_IMPORTANCE = [
  { name: "Age x Severity", importance: 0.14 },
  { name: "APR Severity", importance: 0.12 },
  { name: "Clinical Cluster", importance: 0.11 },
  { name: "GMLOS", importance: 0.10 },
  { name: "Region", importance: 0.09 },
  { name: "Age Group", importance: 0.08 },
  { name: "APR Risk of Mortality", importance: 0.07 },
  { name: "is_medicare", importance: 0.06 },
  { name: "is_medicaid", importance: 0.05 },
  { name: "is_emergent", importance: 0.04 },
];

export const MDC_LOS = [
  { mdc: "Cardiac", medianLOS: 4, freq: 15 },
  { mdc: "Infectious", medianLOS: 6, freq: 5 },
  { mdc: "Musculoskeletal", medianLOS: 3, freq: 12 },
  { mdc: "Respiratory", medianLOS: 5, freq: 10 },
  { mdc: "Digestive", medianLOS: 3, freq: 8 },
  { mdc: "Nervous", medianLOS: 4, freq: 7 },
  { mdc: "Kidney", medianLOS: 4, freq: 6 },
  { mdc: "Circulatory", medianLOS: 5, freq: 9 },
  { mdc: "Pregnancy", medianLOS: 2, freq: 14 },
  { mdc: "Skin", medianLOS: 3, freq: 4 },
];
