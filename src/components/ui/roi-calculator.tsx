import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign, Target, Users } from 'lucide-react';

interface ROICalculatorProps {
  serviceName?: string;
}

export function ROICalculator({ serviceName = "Marketing" }: ROICalculatorProps) {
  const [inputs, setInputs] = useState({
    marketingSpend: '',
    expectedLeads: '',
    conversionRate: '',
    averageDealValue: ''
  });

  const [results, setResults] = useState({
    totalRevenue: 0,
    roi: 0,
    profit: 0,
    conversions: 0
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    // Only allow numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputs(prev => ({
        ...prev,
        [field]: value
      }));
      setIsCalculated(false);
    }
  };

  const calculateROI = () => {
    const spend = parseFloat(inputs.marketingSpend) || 0;
    const leads = parseFloat(inputs.expectedLeads) || 0;
    const conversionRate = parseFloat(inputs.conversionRate) || 0;
    const dealValue = parseFloat(inputs.averageDealValue) || 0;

    if (spend > 0 && leads > 0 && conversionRate > 0 && dealValue > 0) {
      const conversions = leads * (conversionRate / 100);
      const totalRevenue = conversions * dealValue;
      const profit = totalRevenue - spend;
      const roi = ((profit / spend) * 100);

      setResults({
        totalRevenue,
        roi,
        profit,
        conversions
      });
      setIsCalculated(true);
    }
  };

  const resetCalculator = () => {
    setInputs({
      marketingSpend: '',
      expectedLeads: '',
      conversionRate: '',
      averageDealValue: ''
    });
    setResults({
      totalRevenue: 0,
      roi: 0,
      profit: 0,
      conversions: 0
    });
    setIsCalculated(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(num);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-heading text-foreground">
              {serviceName} ROI Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-lg font-paragraph">
            Calculate your potential return on investment and see how our {serviceName.toLowerCase()} services can grow your business
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Your Investment Details
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="marketingSpend" className="text-sm font-medium text-foreground">
                    Monthly Marketing Spend ($)
                  </Label>
                  <Input
                    id="marketingSpend"
                    type="text"
                    placeholder="5000"
                    value={inputs.marketingSpend}
                    onChange={(e) => handleInputChange('marketingSpend', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedLeads" className="text-sm font-medium text-foreground">
                    Expected Monthly Leads
                  </Label>
                  <Input
                    id="expectedLeads"
                    type="text"
                    placeholder="100"
                    value={inputs.expectedLeads}
                    onChange={(e) => handleInputChange('expectedLeads', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="conversionRate" className="text-sm font-medium text-foreground">
                    Conversion Rate (%)
                  </Label>
                  <Input
                    id="conversionRate"
                    type="text"
                    placeholder="5"
                    value={inputs.conversionRate}
                    onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="averageDealValue" className="text-sm font-medium text-foreground">
                    Average Deal Value ($)
                  </Label>
                  <Input
                    id="averageDealValue"
                    type="text"
                    placeholder="2000"
                    value={inputs.averageDealValue}
                    onChange={(e) => handleInputChange('averageDealValue', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={calculateROI}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!inputs.marketingSpend || !inputs.expectedLeads || !inputs.conversionRate || !inputs.averageDealValue}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate ROI
                </Button>
                <Button 
                  onClick={resetCalculator}
                  variant="outline"
                  className="px-6"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Potential Results
              </h3>

              {isCalculated ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Total Revenue</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900">
                          {formatCurrency(results.totalRevenue)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">ROI</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">
                          {formatNumber(results.roi)}%
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">Net Profit</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-900">
                          {formatCurrency(results.profit)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Conversions</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-900">
                          {formatNumber(results.conversions)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mt-6">
                    <h4 className="font-heading text-lg text-foreground mb-3">
                      💡 What This Means for Your Business
                    </h4>
                    <div className="space-y-2 text-sm font-paragraph text-foreground/80">
                      <p>• For every ${inputs.marketingSpend} invested, you could generate <strong>{formatCurrency(results.totalRevenue)}</strong> in revenue</p>
                      <p>• Your investment could return <strong>{formatNumber(results.roi)}%</strong> ROI</p>
                      <p>• You could acquire <strong>{formatNumber(results.conversions)}</strong> new customers monthly</p>
                      <p>• Net profit potential: <strong>{formatCurrency(results.profit)}</strong> per month</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Calculator className="h-16 w-16 text-secondary/50 mb-4" />
                  <h4 className="text-lg font-heading text-foreground mb-2">
                    Ready to See Your Potential?
                  </h4>
                  <p className="text-secondary font-paragraph">
                    Fill in your details on the left and click "Calculate ROI" to see your potential returns
                  </p>
                </div>
              )}
            </div>
          </div>

          {isCalculated && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm font-paragraph text-secondary mb-4">
                  Ready to turn these projections into reality?
                </p>
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}