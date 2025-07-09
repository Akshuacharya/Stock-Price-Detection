export interface LoanApplication {
  id: string;
  applicantName: string;
  age: number;
  income: number;
  education: 'High School' | 'Bachelor' | 'Master' | 'PhD';
  creditScore: number;
  employmentType: 'Employed' | 'Self-Employed' | 'Unemployed';
  loanAmount: number;
  loanTerm: number;
  homeOwnership: 'Own' | 'Rent' | 'Mortgage';
  dependents: number;
  previousDefaults: boolean;
  bankRelationship: number; // years with bank
}

export interface PredictionResult {
  prediction: 'Approved' | 'Rejected';
  confidence: number;
  logisticRegression: {
    prediction: 'Approved' | 'Rejected';
    confidence: number;
  };
  randomForest: {
    prediction: 'Approved' | 'Rejected';
    confidence: number;
  };
  riskScore: number;
  factors: {
    factor: string;
    impact: number;
    description: string;
  }[];
}

export interface ModelEvaluation {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
}