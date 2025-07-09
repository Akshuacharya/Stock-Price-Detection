import { LoanApplication, PredictionResult } from '../types';
import { preprocessLoanData, handleMissingValues } from './dataPreprocessing';

// Simulated Logistic Regression
export class LogisticRegression {
  private weights: number[] = [
    0.15,  // age
    0.25,  // income
    0.18,  // education
    0.35,  // credit score
    0.22,  // employment type
    -0.30, // loan amount to income ratio
    -0.12, // loan term
    0.14,  // home ownership
    -0.08, // dependents
    0.28,  // previous defaults
    0.16   // bank relationship
  ];
  
  private bias: number = -0.5;
  
  predict(application: LoanApplication): { prediction: 'Approved' | 'Rejected'; confidence: number } {
    const features = handleMissingValues(preprocessLoanData(application));
    
    const logit = this.bias + features.reduce((sum, feature, index) => {
      return sum + feature * this.weights[index];
    }, 0);
    
    const probability = 1 / (1 + Math.exp(-logit));
    
    return {
      prediction: probability > 0.5 ? 'Approved' : 'Rejected',
      confidence: probability > 0.5 ? probability : 1 - probability
    };
  }
}

// Simulated Random Forest
export class RandomForest {
  private trees: DecisionTree[] = [];
  
  constructor() {
    // Initialize multiple decision trees
    for (let i = 0; i < 10; i++) {
      this.trees.push(new DecisionTree(Math.random()));
    }
  }
  
  predict(application: LoanApplication): { prediction: 'Approved' | 'Rejected'; confidence: number } {
    const features = handleMissingValues(preprocessLoanData(application));
    
    const votes = this.trees.map(tree => tree.predict(features));
    const approvedVotes = votes.filter(vote => vote === 1).length;
    const confidence = approvedVotes / votes.length;
    
    return {
      prediction: confidence > 0.5 ? 'Approved' : 'Rejected',
      confidence: confidence > 0.5 ? confidence : 1 - confidence
    };
  }
}

// Simple Decision Tree simulation
class DecisionTree {
  private randomSeed: number;
  
  constructor(seed: number) {
    this.randomSeed = seed;
  }
  
  predict(features: number[]): number {
    // Simplified decision tree logic
    const creditScore = features[3];
    const income = features[1];
    const employmentType = features[4];
    const loanToIncomeRatio = features[5];
    const previousDefaults = features[9];
    
    let score = 0;
    
    if (creditScore > 0.7) score += 0.3;
    if (income > 0.6) score += 0.25;
    if (employmentType > 0.8) score += 0.2;
    if (loanToIncomeRatio < 0.3) score += 0.15;
    if (previousDefaults > 0.5) score += 0.1;
    
    // Add some randomness based on seed
    score += (this.randomSeed - 0.5) * 0.1;
    
    return score > 0.5 ? 1 : 0;
  }
}

export const ensemblePredict = (application: LoanApplication): PredictionResult => {
  const logisticRegression = new LogisticRegression();
  const randomForest = new RandomForest();
  
  const lrResult = logisticRegression.predict(application);
  const rfResult = randomForest.predict(application);
  
  // Ensemble prediction (weighted average)
  const ensembleConfidence = (lrResult.confidence * 0.6 + rfResult.confidence * 0.4);
  const ensemblePrediction = ensembleConfidence > 0.5 ? 'Approved' : 'Rejected';
  
  // Calculate risk score
  const features = preprocessLoanData(application);
  const riskScore = Math.max(0, Math.min(100, 100 - (ensembleConfidence * 100)));
  
  // Analyze factors
  const factors = [
    {
      factor: 'Credit Score',
      impact: (application.creditScore / 850) * 100,
      description: `Credit score of ${application.creditScore} ${application.creditScore > 700 ? 'shows good' : 'indicates poor'} credit history`
    },
    {
      factor: 'Income Level',
      impact: Math.min(application.income / 100000, 1) * 100,
      description: `Annual income of $${application.income.toLocaleString()} ${application.income > 60000 ? 'meets' : 'below'} recommended level`
    },
    {
      factor: 'Employment Status',
      impact: application.employmentType === 'Employed' ? 85 : application.employmentType === 'Self-Employed' ? 60 : 20,
      description: `${application.employmentType} status affects loan stability`
    },
    {
      factor: 'Loan-to-Income Ratio',
      impact: Math.max(0, 100 - (application.loanAmount / application.income) * 20),
      description: `Loan amount represents ${((application.loanAmount / application.income) * 100).toFixed(1)}% of annual income`
    }
  ];
  
  return {
    prediction: ensemblePrediction,
    confidence: ensembleConfidence,
    logisticRegression: lrResult,
    randomForest: rfResult,
    riskScore,
    factors
  };
};