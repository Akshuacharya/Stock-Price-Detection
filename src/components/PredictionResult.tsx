import React from 'react';
import { PredictionResult } from '../types';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Brain, TreePine } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResult;
}

const PredictionResultComponent: React.FC<PredictionResultProps> = ({ result }) => {
  const isApproved = result.prediction === 'Approved';
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-50';
    if (score < 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getFactorColor = (impact: number) => {
    if (impact >= 75) return 'bg-green-500';
    if (impact >= 50) return 'bg-yellow-500';
    if (impact >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Main Result */}
      <div className={`rounded-lg p-6 ${isApproved ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {isApproved ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <h2 className={`text-2xl font-bold ${isApproved ? 'text-green-800' : 'text-red-800'}`}>
              Loan {result.prediction}
            </h2>
          </div>
          <div className="text-right">
            <p className={`text-sm ${isApproved ? 'text-green-600' : 'text-red-600'}`}>
              Confidence
            </p>
            <p className={`text-xl font-bold ${isApproved ? 'text-green-800' : 'text-red-800'}`}>
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Risk Score */}
      <div className={`rounded-lg p-4 ${getRiskColor(result.riskScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Risk Score</span>
          </div>
          <span className="text-xl font-bold">{result.riskScore.toFixed(0)}/100</span>
        </div>
        <div className="mt-2 bg-white bg-opacity-50 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-current"
            style={{ width: `${result.riskScore}%` }}
          />
        </div>
      </div>

      {/* Model Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Logistic Regression</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className={`font-medium ${
              result.logisticRegression.prediction === 'Approved' ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.logisticRegression.prediction}
            </span>
            <span className="text-sm text-blue-600">
              {(result.logisticRegression.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TreePine className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Random Forest</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className={`font-medium ${
              result.randomForest.prediction === 'Approved' ? 'text-green-600' : 'text-red-600'
            }`}>
              {result.randomForest.prediction}
            </span>
            <span className="text-sm text-green-600">
              {(result.randomForest.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Factor Analysis */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Factor Analysis</h3>
        </div>
        <div className="space-y-4">
          {result.factors.map((factor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{factor.factor}</h4>
                <span className="text-sm font-semibold text-gray-600">
                  {factor.impact.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${getFactorColor(factor.impact)}`}
                  style={{ width: `${factor.impact}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionResultComponent;