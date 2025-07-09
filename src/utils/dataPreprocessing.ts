import { LoanApplication } from '../types';

export const preprocessLoanData = (application: LoanApplication): number[] => {
  const features: number[] = [];
  
  // Age normalization (0-1 scale)
  features.push(Math.min(application.age / 100, 1));
  
  // Income normalization (log scale)
  features.push(Math.log(application.income + 1) / Math.log(1000000));
  
  // Education encoding
  const educationMap = {
    'High School': 0.25,
    'Bachelor': 0.5,
    'Master': 0.75,
    'PhD': 1.0
  };
  features.push(educationMap[application.education]);
  
  // Credit score normalization
  features.push(application.creditScore / 850);
  
  // Employment type encoding
  const employmentMap = {
    'Unemployed': 0,
    'Self-Employed': 0.5,
    'Employed': 1.0
  };
  features.push(employmentMap[application.employmentType]);
  
  // Loan amount to income ratio
  features.push(Math.min(application.loanAmount / application.income, 5) / 5);
  
  // Loan term normalization
  features.push(application.loanTerm / 30);
  
  // Home ownership encoding
  const homeOwnershipMap = {
    'Rent': 0.3,
    'Mortgage': 0.6,
    'Own': 1.0
  };
  features.push(homeOwnershipMap[application.homeOwnership]);
  
  // Dependents normalization
  features.push(Math.min(application.dependents / 5, 1));
  
  // Previous defaults (boolean to number)
  features.push(application.previousDefaults ? 0 : 1);
  
  // Bank relationship normalization
  features.push(Math.min(application.bankRelationship / 20, 1));
  
  return features;
};

export const handleMissingValues = (features: number[]): number[] => {
  return features.map(feature => isNaN(feature) ? 0.5 : feature);
};

export const generateSyntheticData = (count: number): LoanApplication[] => {
  const data: LoanApplication[] = [];
  
  for (let i = 0; i < count; i++) {
    const age = 22 + Math.random() * 43;
    const income = 25000 + Math.random() * 175000;
    const creditScore = 300 + Math.random() * 550;
    
    data.push({
      id: `synthetic-${i}`,
      applicantName: `Applicant ${i}`,
      age: Math.round(age),
      income: Math.round(income),
      education: ['High School', 'Bachelor', 'Master', 'PhD'][Math.floor(Math.random() * 4)] as any,
      creditScore: Math.round(creditScore),
      employmentType: ['Employed', 'Self-Employed', 'Unemployed'][Math.floor(Math.random() * 3)] as any,
      loanAmount: Math.round(10000 + Math.random() * 90000),
      loanTerm: [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)],
      homeOwnership: ['Own', 'Rent', 'Mortgage'][Math.floor(Math.random() * 3)] as any,
      dependents: Math.floor(Math.random() * 4),
      previousDefaults: Math.random() < 0.15,
      bankRelationship: Math.floor(Math.random() * 15)
    });
  }
  
  return data;
};