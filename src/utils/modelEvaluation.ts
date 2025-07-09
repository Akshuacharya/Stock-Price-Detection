import { LoanApplication, ModelEvaluation } from '../types';
import { LogisticRegression, RandomForest } from './mlAlgorithms';
import { generateSyntheticData } from './dataPreprocessing';

// Generate ground truth for synthetic data
const generateGroundTruth = (application: LoanApplication): boolean => {
  let score = 0;
  
  // Credit score factor
  if (application.creditScore > 700) score += 3;
  else if (application.creditScore > 600) score += 2;
  else if (application.creditScore > 500) score += 1;
  
  // Income factor
  if (application.income > 80000) score += 2;
  else if (application.income > 50000) score += 1;
  
  // Employment factor
  if (application.employmentType === 'Employed') score += 2;
  else if (application.employmentType === 'Self-Employed') score += 1;
  
  // Loan to income ratio
  const loanToIncomeRatio = application.loanAmount / application.income;
  if (loanToIncomeRatio < 2) score += 2;
  else if (loanToIncomeRatio < 3) score += 1;
  
  // Previous defaults
  if (!application.previousDefaults) score += 1;
  
  // Add some randomness
  score += Math.random() * 2;
  
  return score > 5;
};

export const evaluateModel = (modelType: 'logistic' | 'random-forest'): ModelEvaluation => {
  const testData = generateSyntheticData(1000);
  const model = modelType === 'logistic' ? new LogisticRegression() : new RandomForest();
  
  let truePositive = 0;
  let falsePositive = 0;
  let trueNegative = 0;
  let falseNegative = 0;
  
  const predictions: { actual: boolean; predicted: boolean; confidence: number }[] = [];
  
  testData.forEach(application => {
    const actualApproval = generateGroundTruth(application);
    const prediction = model.predict(application);
    const predictedApproval = prediction.prediction === 'Approved';
    
    predictions.push({
      actual: actualApproval,
      predicted: predictedApproval,
      confidence: prediction.confidence
    });
    
    if (actualApproval && predictedApproval) truePositive++;
    else if (!actualApproval && predictedApproval) falsePositive++;
    else if (!actualApproval && !predictedApproval) trueNegative++;
    else if (actualApproval && !predictedApproval) falseNegative++;
  });
  
  const accuracy = (truePositive + trueNegative) / testData.length;
  const precision = truePositive / (truePositive + falsePositive) || 0;
  const recall = truePositive / (truePositive + falseNegative) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
  
  // Calculate AUC (simplified)
  const auc = calculateAUC(predictions);
  
  return {
    accuracy,
    precision,
    recall,
    f1Score,
    auc,
    confusionMatrix: {
      truePositive,
      falsePositive,
      trueNegative,
      falseNegative
    }
  };
};

const calculateAUC = (predictions: { actual: boolean; predicted: boolean; confidence: number }[]): number => {
  // Simplified AUC calculation
  const positives = predictions.filter(p => p.actual);
  const negatives = predictions.filter(p => !p.actual);
  
  let auc = 0;
  positives.forEach(pos => {
    negatives.forEach(neg => {
      if (pos.confidence > neg.confidence) auc += 1;
      else if (pos.confidence === neg.confidence) auc += 0.5;
    });
  });
  
  return auc / (positives.length * negatives.length) || 0.5;
};