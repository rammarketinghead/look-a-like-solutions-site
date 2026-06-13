import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
interface CPCData {
  overall: number;
  high: number;
  medium: number;
  low: number;
  counts: { high: number; medium: number; low: number };
}

interface FormInputs {
  monthlyBudget: number;
  avgCPC: number;
  landingPageConvRate: number;
  leadQualRate: number;
  qualLeadToApptRate: number;
  apptToSaleRate: number;
  avgRevenuePerSale: number;
  profitMargin: number;
}

interface SimulatorState extends FormInputs {
  isActive: boolean;
}

// Utility: Format currency in INR
const formatINR = (value: number): string => {
  if (value >= 10000000) {
    return '₹' + (value / 10000000).toFixed(2) + 'Cr';
  }
  if (value >= 100000) {
    return '₹' + (value / 100000).toFixed(2) + 'L';
  }
  return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

// Utility: Format percentage
const formatPercent = (value: number): string => {
  return value.toFixed(2) + '%';
};

// CSV Parser for Google Ads Keyword Planner
const parseKeywordCSV = (text: string): CPCData => {
  const lines = text.split('\n').filter(line => line.trim());
  const data = { overall: 0, high: 0, medium: 0, low: 0, counts: { high: 0, medium: 0, low: 0 } };
  
  let totalCPC = 0;
  let count = 0;
  let highCPC = 0, mediumCPC = 0, lowCPC = 0;
  let highCount = 0, mediumCount = 0, lowCount = 0;

  lines.forEach((line, idx) => {
    if (idx === 0) return; // Skip header
    const parts = line.split('\t');
    if (parts.length < 4) return;

    const competition = parts[1]?.trim().toLowerCase();
    const lowRange = parseFloat(parts[2]?.replace(/[^\d.]/g, '') || '0');
    const highRange = parseFloat(parts[3]?.replace(/[^\d.]/g, '') || '0');
    
    if (lowRange > 0 && highRange > 0) {
      const cpc = (lowRange + highRange) / 2;
      totalCPC += cpc;
      count++;

      if (competition === 'high') {
        highCPC += cpc;
        highCount++;
      } else if (competition === 'medium') {
        mediumCPC += cpc;
        mediumCount++;
      } else if (competition === 'low') {
        lowCPC += cpc;
        lowCount++;
      }
    }
  });

  data.overall = count > 0 ? totalCPC / count : 0;
  data.high = highCount > 0 ? highCPC / highCount : 0;
  data.medium = mediumCount > 0 ? mediumCPC / mediumCount : 0;
  data.low = lowCount > 0 ? lowCPC / lowCount : 0;
  data.counts = { high: highCount, medium: mediumCount, low: lowCount };

  return data;
};

// Calculate all metrics
const calculateMetrics = (inputs: FormInputs) => {
  const clicks = inputs.monthlyBudget / inputs.avgCPC;
  const leads = clicks * (inputs.landingPageConvRate / 100);
  const qualLeads = leads * (inputs.leadQualRate / 100);
  const appointments = qualLeads * (inputs.qualLeadToApptRate / 100);
  const sales = appointments * (inputs.apptToSaleRate / 100);
  const revenue = sales * inputs.avgRevenuePerSale;
  const profitFromSales = revenue * (inputs.profitMargin / 100);
  const profitAfterSpend = profitFromSales - inputs.monthlyBudget;
  const roi = inputs.monthlyBudget > 0 ? (profitAfterSpend / inputs.monthlyBudget) * 100 : 0;
  const profitMarginRatio = revenue > 0 ? (profitAfterSpend / revenue) * 100 : 0;

  return {
    clicks: Math.round(clicks),
    leads: Math.round(leads),
    qualLeads: Math.round(qualLeads),
    appointments: Math.round(appointments),
    sales: Math.round(sales),
    revenue: Math.round(revenue),
    costPerLead: leads > 0 ? inputs.monthlyBudget / leads : 0,
    costPerQualLead: qualLeads > 0 ? inputs.monthlyBudget / qualLeads : 0,
    costPerAppt: appointments > 0 ? inputs.monthlyBudget / appointments : 0,
    costPerSale: sales > 0 ? inputs.monthlyBudget / sales : 0,
    profitFromSales: Math.round(profitFromSales),
    profitAfterSpend: Math.round(profitAfterSpend),
    roi,
    profitMarginRatio,
  };
};

// Hero Section
const HeroSection = ({ onScroll }: { onScroll: () => void }) => (
  <section className="w-full bg-gradient-to-b from-indigo-50 to-white py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          📋 Media Planning Engine
        </div>
        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
          Predictable growth starts with the{' '}
          <span className="text-indigo-600">right math</span>.
        </h1>
        <p className="text-lg text-secondary mb-8 font-paragraph">
          Input your budget, CPC, and conversion rates to instantly forecast your clicks, leads, appointments, sales, and total revenue.
        </p>
        <Button
          onClick={onScroll}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg"
        >
          Start Planning Now →
        </Button>
      </motion.div>
    </div>
  </section>
);

// CSV Import Section
const CSVImportSection = ({ onCPCUpdate }: { onCPCUpdate: (cpc: number) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cpcData, setCPCData] = useState<CPCData | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseKeywordCSV(text);
        setCPCData(parsed);
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="w-full py-16 px-4 bg-light-gray">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Import Keyword Data</h2>
        
        <div className="mb-8">
          <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-foreground">Upload Google Ads Keyword Planner CSV</span>
              <span className="text-xs text-secondary mt-1">Tab-separated, UTF-16 or UTF-8</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {cpcData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Overall Avg CPC', value: cpcData.overall, count: cpcData.counts.high + cpcData.counts.medium + cpcData.counts.low },
              { label: 'High Competition', value: cpcData.high, count: cpcData.counts.high },
              { label: 'Medium Competition', value: cpcData.medium, count: cpcData.counts.medium },
              { label: 'Low Competition', value: cpcData.low, count: cpcData.counts.low },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-lg transition bg-white"
                  onClick={() => item.value > 0 && onCPCUpdate(item.value)}
                >
                  <p className="text-sm text-secondary font-paragraph">{item.label}</p>
                  <p className="text-2xl font-heading font-bold text-indigo-600 mt-2">{formatINR(item.value)}</p>
                  <p className="text-xs text-secondary mt-1">{item.count} keywords</p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Form Section
const FormSection = ({ inputs, setInputs, formRef }: { inputs: FormInputs; setInputs: (inputs: FormInputs) => void; formRef: React.RefObject<HTMLDivElement> }) => {
  const handleChange = (field: keyof FormInputs, value: number) => {
    setInputs({ ...inputs, [field]: value });
  };

  return (
    <section ref={formRef} className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Define Your Budget & Conversions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Monthly Budget', field: 'monthlyBudget', suffix: '₹' },
            { label: 'Avg. Cost Per Click (CPC)', field: 'avgCPC', suffix: '₹' },
            { label: 'Landing Page Conv. Rate', field: 'landingPageConvRate', suffix: '%' },
            { label: 'Lead Qualification Rate', field: 'leadQualRate', suffix: '%' },
            { label: 'Qual. Lead to Appt Rate', field: 'qualLeadToApptRate', suffix: '%' },
            { label: 'Appt to Sale / Close Rate', field: 'apptToSaleRate', suffix: '%' },
            { label: 'Avg. Revenue Per Sale (AOV)', field: 'avgRevenuePerSale', suffix: '₹' },
            { label: 'Profit Margin from AOV', field: 'profitMargin', suffix: '%', helper: 'The profit percentage you make from each sale' },
          ].map((item) => (
            <div key={item.field}>
              <label className="block text-sm font-medium text-foreground mb-2 font-paragraph">
                {item.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-secondary font-paragraph">{item.suffix}</span>
                <Input
                  type="number"
                  value={inputs[item.field as keyof FormInputs]}
                  onChange={(e) => handleChange(item.field as keyof FormInputs, parseFloat(e.target.value) || 0)}
                  className="pl-8 border-gray-300 rounded-lg"
                />
              </div>
              {item.helper && <p className="text-xs text-secondary mt-1 font-paragraph">{item.helper}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projected Outcomes Section
const ProjectedOutcomesSection = ({ metrics }: { metrics: ReturnType<typeof calculateMetrics> }) => {
  const funnelData = [
    { stage: 'Clicks', value: metrics.clicks, color: '#4F46E5' },
    { stage: 'Leads', value: metrics.leads, color: '#9333EA' },
    { stage: 'Qual. Leads', value: metrics.qualLeads, color: '#EC4899' },
    { stage: 'Appointments', value: metrics.appointments, color: '#EF4444' },
    { stage: 'Sales', value: metrics.sales, color: '#22C55E' },
  ];

  return (
    <section className="w-full py-16 px-4 bg-light-gray">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Projected Outcomes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Expected Clicks', value: metrics.clicks },
            { label: 'Expected Leads', value: metrics.leads },
            { label: 'Qualified Leads', value: metrics.qualLeads },
            { label: 'Expected Appointments', value: metrics.appointments },
            { label: 'Expected Sales', value: metrics.sales },
            { label: 'Projected Revenue', value: metrics.revenue, isCurrency: true },
            { label: 'Cost Per Lead', value: metrics.costPerLead, isCurrency: true },
            { label: 'Cost Per Qual. Lead', value: metrics.costPerQualLead, isCurrency: true },
            { label: 'Cost Per Appt', value: metrics.costPerAppt, isCurrency: true },
            { label: 'Cost Per Sale', value: metrics.costPerSale, isCurrency: true },
            { label: 'Projected Profit', value: metrics.profitFromSales, isCurrency: true },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 bg-white">
                <p className="text-sm text-secondary font-paragraph">{item.label}</p>
                <p className="text-2xl font-heading font-bold text-indigo-600 mt-2">
                  {item.isCurrency ? formatINR(item.value) : item.value.toLocaleString('en-IN')}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Funnel Visualization */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((item, idx) => {
              const maxValue = funnelData[0].value;
              const percentage = (item.value / maxValue) * 100;
              const dropoff = idx > 0 ? ((funnelData[idx - 1].value - item.value) / funnelData[idx - 1].value) * 100 : 0;

              return (
                <div key={item.stage}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground font-paragraph">{item.stage}</span>
                    <span className="text-sm font-medium text-foreground font-paragraph">
                      {item.value.toLocaleString('en-IN')} {idx > 0 && `(-${dropoff.toFixed(1)}%)`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ backgroundColor: item.color }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};

// Impact Simulator Section
const ImpactSimulatorSection = ({ formInputs, setFormInputs, metrics }: { formInputs: FormInputs; setFormInputs: (inputs: FormInputs) => void; metrics: ReturnType<typeof calculateMetrics> }) => {
  const [simulatorState, setSimulatorState] = useState<SimulatorState>({
    ...formInputs,
    isActive: false,
  });

  const simulatorMetrics = calculateMetrics(simulatorState);

  const handleSliderChange = (field: keyof FormInputs, value: number[]) => {
    setSimulatorState({ ...simulatorState, [field]: value[0], isActive: true });
  };

  const handleReset = () => {
    setSimulatorState({ ...formInputs, isActive: false });
  };

  const getImpactColor = (field: string, current: number, projected: number) => {
    if (field.includes('Cost')) {
      return projected < current ? 'text-green-600' : projected > current ? 'text-red-600' : 'text-gray-600';
    }
    return projected > current ? 'text-green-600' : projected < current ? 'text-red-600' : 'text-gray-600';
  };

  const getDelta = (field: string, current: number, projected: number) => {
    if (field.includes('Cost')) {
      const delta = current - projected;
      return delta === 0 ? '—' : `${delta > 0 ? '−' : '+'}${formatINR(Math.abs(delta))}`;
    }
    const delta = projected - current;
    return delta === 0 ? '—' : `${delta > 0 ? '+' : '−'}${Math.abs(delta).toLocaleString('en-IN')}`;
  };

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Impact Simulator</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Sliders */}
          <div className="space-y-6">
            {[
              { label: 'Monthly Budget', field: 'monthlyBudget', min: 1000, max: 500000, step: 1000 },
              { label: 'Average CPC', field: 'avgCPC', min: 1, max: 500, step: 1 },
              { label: 'Landing Page Conv. Rate (%)', field: 'landingPageConvRate', min: 1, max: 100, step: 1 },
              { label: 'Lead Qual. Rate (%)', field: 'leadQualRate', min: 1, max: 100, step: 1 },
              { label: 'Appt Booking Rate (%)', field: 'qualLeadToApptRate', min: 1, max: 100, step: 1 },
              { label: 'Sales Close Rate (%)', field: 'apptToSaleRate', min: 1, max: 100, step: 1 },
              { label: 'Revenue Per Sale', field: 'avgRevenuePerSale', min: 100, max: 100000, step: 100 },
            ].map((item) => (
              <div key={item.field}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-foreground font-paragraph">{item.label}</label>
                  <span className="text-sm font-medium text-indigo-600 font-paragraph">
                    {item.field.includes('Rate') ? `${simulatorState[item.field as keyof FormInputs]}%` : formatINR(simulatorState[item.field as keyof FormInputs])}
                  </span>
                </div>
                <Slider
                  value={[simulatorState[item.field as keyof FormInputs]]}
                  onValueChange={(value) => handleSliderChange(item.field as keyof FormInputs, value)}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  className="w-full"
                />
              </div>
            ))}
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full mt-4"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Simulator
            </Button>
          </div>

          {/* Right: Impact Analysis Table */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Impact Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 px-2 font-heading font-bold text-foreground">Metric</th>
                    <th className="text-right py-2 px-2 font-heading font-bold text-foreground">Current</th>
                    <th className="text-right py-2 px-2 font-heading font-bold text-foreground">Projected</th>
                    <th className="text-right py-2 px-2 font-heading font-bold text-foreground">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Expected Clicks', current: metrics.clicks, projected: simulatorMetrics.clicks },
                    { label: 'Leads', current: metrics.leads, projected: simulatorMetrics.leads },
                    { label: 'Appointments', current: metrics.appointments, projected: simulatorMetrics.appointments },
                    { label: 'Sales', current: metrics.sales, projected: simulatorMetrics.sales },
                    { label: 'Projected Revenue', current: metrics.revenue, projected: simulatorMetrics.revenue, isCurrency: true },
                    { label: 'Cost Per Lead', current: metrics.costPerLead, projected: simulatorMetrics.costPerLead, isCurrency: true },
                    { label: 'Cost Per Qual. Lead', current: metrics.costPerQualLead, projected: simulatorMetrics.costPerQualLead, isCurrency: true },
                    { label: 'Cost Per Sale', current: metrics.costPerSale, projected: simulatorMetrics.costPerSale, isCurrency: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-2 font-paragraph text-foreground">{row.label}</td>
                      <td className="text-right py-3 px-2 font-paragraph text-foreground">
                        {row.isCurrency ? formatINR(row.current) : row.current.toLocaleString('en-IN')}
                      </td>
                      <td className="text-right py-3 px-2 font-paragraph text-foreground">
                        {row.isCurrency ? formatINR(row.projected) : row.projected.toLocaleString('en-IN')}
                      </td>
                      <td className={`text-right py-3 px-2 font-paragraph font-bold ${getImpactColor(row.label, row.current, row.projected)}`}>
                        {getDelta(row.label, row.current, row.projected)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Profitability Analysis Section
const ProfitabilityAnalysisSection = ({ metrics }: { metrics: ReturnType<typeof calculateMetrics> }) => {
  const profitPerHundred = metrics.roi / 100;

  return (
    <section className="w-full py-16 px-4 bg-light-gray">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Profitability Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Monthly Revenue', value: metrics.revenue, isCurrency: true },
            { label: 'Total Profit from Sales', value: metrics.profitFromSales, isCurrency: true },
            { label: 'Monthly Ad Spend', value: 0, isCurrency: true }, // Will be set from inputs
            { label: 'Profit After Ad Spend', value: metrics.profitAfterSpend, isCurrency: true },
            { label: 'ROI %', value: metrics.roi, isPercent: true },
            { label: 'Profit Margin Ratio %', value: metrics.profitMarginRatio, isPercent: true },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 bg-white">
                <p className="text-sm text-secondary font-paragraph">{item.label}</p>
                <p className={`text-2xl font-heading font-bold mt-2 ${metrics.profitAfterSpend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.isPercent ? formatPercent(item.value) : item.isCurrency ? formatINR(item.value) : item.value}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <Card className={`p-6 ${metrics.profitAfterSpend >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-2`}>
          <p className={`text-lg font-heading font-bold ${metrics.profitAfterSpend >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            You make {formatINR(profitPerHundred)} profit for every ₹100 spent on ads
          </p>
        </Card>
      </div>
    </section>
  );
};

// Visual Analytics Section
const VisualAnalyticsSection = ({ metrics }: { metrics: ReturnType<typeof calculateMetrics> }) => {
  const conversionFunnelData = [
    { name: 'Clicks', value: metrics.clicks },
    { name: 'Leads', value: metrics.leads },
    { name: 'Qual. Leads', value: metrics.qualLeads },
    { name: 'Appointments', value: metrics.appointments },
    { name: 'Sales', value: metrics.sales },
  ];

  const costBreakdownData = [
    { name: 'CPC', value: Math.round(metrics.costPerLead * 0.5) }, // Approximate
    { name: 'Cost/Lead', value: Math.round(metrics.costPerLead) },
    { name: 'Cost/Qual', value: Math.round(metrics.costPerQualLead) },
    { name: 'Cost/Appt', value: Math.round(metrics.costPerAppt) },
    { name: 'Cost/Sale', value: Math.round(metrics.costPerSale) },
  ];

  const conversionRateData = [
    { name: 'Landing Page', value: 50 },
    { name: 'Lead Qual', value: 80 },
    { name: 'Appt Booking', value: 50 },
    { name: 'Close Rate', value: 25 },
  ];

  const spendVsRevenueData = [
    { name: 'Ad Spend', value: 50000 },
    { name: 'Revenue', value: metrics.revenue },
  ];

  const colors = ['#4F46E5', '#9333EA', '#EC4899', '#EF4444', '#22C55E'];

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-8 text-foreground">Visual Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <Card className="p-6 bg-light-gray">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5">
                  {conversionFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Cost Per Stage */}
          <Card className="p-6 bg-light-gray">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Cost Per Stage Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9333EA" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Rate by Stage */}
          <Card className="p-6 bg-light-gray">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Conversion Rate by Stage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Spend vs Revenue */}
          <Card className="p-6 bg-light-gray">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">
              Spend vs Revenue
              <span className="text-sm text-secondary ml-2">Gross ROI: +{formatPercent(metrics.roi)}</span>
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendVsRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Main Component
export default function MarketingFunnelROICalculatorPage() {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    monthlyBudget: 50000,
    avgCPC: 25,
    landingPageConvRate: 50,
    leadQualRate: 80,
    qualLeadToApptRate: 50,
    apptToSaleRate: 25,
    avgRevenuePerSale: 8200,
    profitMargin: 40,
  });

  const formRef = useRef<HTMLDivElement>(null);
  const metrics = calculateMetrics(formInputs);

  const handleScroll = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCPCUpdate = (cpc: number) => {
    setFormInputs({ ...formInputs, avgCPC: cpc });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection onScroll={handleScroll} />
      <CSVImportSection onCPCUpdate={handleCPCUpdate} />
      <FormSection inputs={formInputs} setInputs={setFormInputs} formRef={formRef} />
      <ProjectedOutcomesSection metrics={metrics} />
      <ImpactSimulatorSection formInputs={formInputs} setFormInputs={setFormInputs} metrics={metrics} />
      <ProfitabilityAnalysisSection metrics={metrics} />
      <VisualAnalyticsSection metrics={metrics} />
      <Footer />
    </div>
  );
}
