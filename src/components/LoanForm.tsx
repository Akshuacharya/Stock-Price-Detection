import React, { useState } from 'react';
import { LoanApplication } from '../types';
import { User, DollarSign, GraduationCap, CreditCard, Briefcase, Home, Users } from 'lucide-react';

interface LoanFormProps {
  onSubmit: (application: LoanApplication) => void;
  loading?: boolean;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<Omit<LoanApplication, 'id'>>({
    applicantName: '',
    age: 30,
    income: 60000,
    education: 'Bachelor',
    creditScore: 650,
    employmentType: 'Employed',
    loanAmount: 25000,
    loanTerm: 36,
    homeOwnership: 'Rent',
    dependents: 0,
    previousDefaults: false,
    bankRelationship: 2
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString()
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Loan Application</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.applicantName}
              onChange={(e) => handleChange('applicantName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              min="18"
              max="80"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <GraduationCap className="inline w-4 h-4 mr-1" />
              Education Level
            </label>
            <select
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="High School">High School</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              Number of Dependents
            </label>
            <input
              type="number"
              value={formData.dependents}
              onChange={(e) => handleChange('dependents', parseInt(e.target.value))}
              min="0"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Financial Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <DollarSign className="inline w-4 h-4 mr-1" />
              Annual Income ($)
            </label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => handleChange('income', parseInt(e.target.value))}
              min="10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <CreditCard className="inline w-4 h-4 mr-1" />
              Credit Score
            </label>
            <input
              type="number"
              value={formData.creditScore}
              onChange={(e) => handleChange('creditScore', parseInt(e.target.value))}
              min="300"
              max="850"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <Briefcase className="inline w-4 h-4 mr-1" />
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) => handleChange('employmentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <Home className="inline w-4 h-4 mr-1" />
              Home Ownership
            </label>
            <select
              value={formData.homeOwnership}
              onChange={(e) => handleChange('homeOwnership', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Own">Own</option>
              <option value="Rent">Rent</option>
              <option value="Mortgage">Mortgage</option>
            </select>
          </div>
        </div>

        {/* Loan Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Loan Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Loan Amount ($)</label>
            <input
              type="number"
              value={formData.loanAmount}
              onChange={(e) => handleChange('loanAmount', parseInt(e.target.value))}
              min="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Loan Term (months)</label>
            <select
              value={formData.loanTerm}
              onChange={(e) => handleChange('loanTerm', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
              <option value={48}>48 months</option>
              <option value={60}>60 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Bank Relationship (years)</label>
            <input
              type="number"
              value={formData.bankRelationship}
              onChange={(e) => handleChange('bankRelationship', parseInt(e.target.value))}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="previousDefaults"
              checked={formData.previousDefaults}
              onChange={(e) => handleChange('previousDefaults', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="previousDefaults" className="text-sm font-medium text-gray-600">
              Previous loan defaults
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {loading ? 'Processing...' : 'Submit Application'}
      </button>
    </form>
  );
};

export default LoanForm;