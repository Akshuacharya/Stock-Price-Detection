import React, { useState, useEffect } from 'react';
import { ModelEvaluation } from '../types';
import { evaluateModel } from '../utils/modelEvaluation';
import { BarChart, Activity, Target, Zap, TrendingUp } from 'lucide-react';

const ModelEvaluationComponent: React.FC = () => {
  const [logisticEval, setLogisticEval] = useState<ModelEvaluation | null>(null);
  const [randomForestEval, setRandomForestEval] = useState<ModelEvaluation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const evaluateModels = async () => {
      setLoading(true);
      try {
        const lrEval = evaluateModel('logistic');
        const rfEval = evaluateModel('random-forest');
        setLogisticEval(lrEval);
        setRandomForestEval(rfEval);
      } catch (error) {
        console.error('Error evaluating models:', error);
      } finally {
        setLoading(false);
      }
    };

    evaluateModels();
  }, []);

  const MetricCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{(value * 100).toFixed(1)}%</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ConfusionMatrix = ({ matrix }: { matrix: ModelEvaluation['confusionMatrix'] }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h4 className="font-semibold text-gray-800 mb-3">Confusion Matrix</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-100 p-3 rounded text-center">
          <p className="text-sm text-green-700">True Positive</p>
          <p className="text-xl font-bold text-green-800">{matrix.truePositive}</p>
        </div>
        <div className="bg-red-100 p-3 rounded text-center">
          <p className="text-sm text-red-700">False Positive</p>
          <p className="text-xl font-bold text-red-800">{matrix.falsePositive}</p>
        </div>
        <div className="bg-red-100 p-3 rounded text-center">
          <p className="text-sm text-red-700">False Negative</p>
          <p className="text-xl font-bold text-red-800">{matrix.falseNegative}</p>
        </div>
        <div className="bg-green-100 p-3 rounded text-center">
          <p className="text-sm text-green-700">True Negative</p>
          <p className="text-xl font-bold text-green-800">{matrix.trueNegative}</p>
        </div>
      </div>
    </div>
  );

  const ROCVisualization = ({ auc }: { auc: number }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h4 className="font-semibold text-gray-800 mb-3">ROC Curve (AUC)</h4>
      <div className="relative h-32 bg-gray-50 rounded">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="0" y1="100" x2="100" y2="0" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
          <path
            d={`M 0 100 Q 20 ${100 - auc * 80} 50 ${100 - auc * 90} Q 80 ${100 - auc * 95} 100 0`}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <p className="text-center mt-2 text-sm text-gray-600">
        AUC: <span className="font-semibold">{auc.toFixed(3)}</span>
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Evaluating models...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BarChart className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Model Evaluation</h2>
      </div>

      {/* Logistic Regression */}
      {logisticEval && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Logistic Regression</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Accuracy"
              value={logisticEval.accuracy}
              icon={Target}
              color="bg-blue-500"
            />
            <MetricCard
              title="Precision"
              value={logisticEval.precision}
              icon={Zap}
              color="bg-green-500"
            />
            <MetricCard
              title="Recall"
              value={logisticEval.recall}
              icon={Activity}
              color="bg-yellow-500"
            />
            <MetricCard
              title="F1-Score"
              value={logisticEval.f1Score}
              icon={TrendingUp}
              color="bg-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConfusionMatrix matrix={logisticEval.confusionMatrix} />
            <ROCVisualization auc={logisticEval.auc} />
          </div>
        </div>
      )}

      {/* Random Forest */}
      {randomForestEval && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Random Forest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Accuracy"
              value={randomForestEval.accuracy}
              icon={Target}
              color="bg-blue-500"
            />
            <MetricCard
              title="Precision"
              value={randomForestEval.precision}
              icon={Zap}
              color="bg-green-500"
            />
            <MetricCard
              title="Recall"
              value={randomForestEval.recall}
              icon={Activity}
              color="bg-yellow-500"
            />
            <MetricCard
              title="F1-Score"
              value={randomForestEval.f1Score}
              icon={TrendingUp}
              color="bg-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConfusionMatrix matrix={randomForestEval.confusionMatrix} />
            <ROCVisualization auc={randomForestEval.auc} />
          </div>
        </div>
      )}

      {/* Model Comparison */}
      {logisticEval && randomForestEval && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Model Comparison</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-600">Accuracy</p>
              <p className="text-blue-600">LR: {(logisticEval.accuracy * 100).toFixed(1)}%</p>
              <p className="text-green-600">RF: {(randomForestEval.accuracy * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Precision</p>
              <p className="text-blue-600">LR: {(logisticEval.precision * 100).toFixed(1)}%</p>
              <p className="text-green-600">RF: {(randomForestEval.precision * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Recall</p>
              <p className="text-blue-600">LR: {(logisticEval.recall * 100).toFixed(1)}%</p>
              <p className="text-green-600">RF: {(randomForestEval.recall * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">AUC</p>
              <p className="text-blue-600">LR: {logisticEval.auc.toFixed(3)}</p>
              <p className="text-green-600">RF: {randomForestEval.auc.toFixed(3)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelEvaluationComponent;