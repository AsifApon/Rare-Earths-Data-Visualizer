
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart } from 'recharts';
import {
  DOMESTIC_PRODUCTION_USE_TEXT,
  RECYCLING_TEXT,
  SALIENT_PRODUCTION_MINERAL_CONCENTRATES,
  SALIENT_PRODUCTION_COMPOUNDS_METALS,
  SALIENT_IMPORTS_DATA,
  SALIENT_PRICES_DATA,
  IMPORT_SOURCES_DATA,
  TARIFF_DATA,
  WORLD_MINE_PRODUCTION_DATA,
  WORLD_RESERVES_DATA,
} from '../data';
import type { SalientProductionItem, SalientImportItem, SalientPriceItem, NameValuePercentage, TariffItem, WorldMineProductionItem, WorldReserveItem } from '../types';
import GeminiFeature from './GeminiFeature';

const cardClasses = "bg-white rounded-xl shadow-lg p-4 md:p-6";
const chartTitleClasses = "text-xl font-semibold text-slate-700 mb-4";

const ProductionLineChart: React.FC<{ data: SalientProductionItem, lineColor: string }> = ({ data, lineColor }) => (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>{data.name}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="year" stroke="#64748b" />
        <YAxis stroke="#64748b" domain={['auto', 'auto']} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} activeDot={{ r: 6 }} name={data.name.split('(')[0].trim()} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const ImportsBarChart: React.FC<{ data: SalientImportItem[] }> = ({ data }) => (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>U.S. Imports: Compounds and Metals (tons REO)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="year" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
        <Legend />
        <Bar dataKey="Compounds" stackId="a" fill="#8884d8" name="Compounds" />
        <Bar dataKey="Metals" stackId="a" fill="#82ca9d" name="Metals (Total)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const PricesLineChart: React.FC<{ data: SalientPriceItem[] }> = ({ data }) => {
  const priceKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'year') : [];
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
  return (
    <div className={cardClasses}>
      <h3 className={chartTitleClasses}>Average Prices (USD per Kilogram)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="year" stroke="#64748b" />
          <YAxis stroke="#64748b" domain={['auto', 'auto']}/>
          <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
          <Legend />
          {priceKeys.map((key, index) => (
            <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} strokeWidth={2} name={key} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
const ImportSourcesPieChart: React.FC<{ data: NameValuePercentage[] }> = ({ data }) => (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>U.S. Import Sources (2020-23, % of total value)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}
             label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x  = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy  + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const TariffTable: React.FC<{ data: TariffItem[] }> = ({ data }) => (
  <div className={`${cardClasses} overflow-x-auto`}>
    <h3 className={chartTitleClasses}>U.S. Tariff Information (as of 12-31-24)</h3>
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Number</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Normal Trade Relations</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-slate-50">
            <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-700">{item.item}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{item.number}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{item.relation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const WorldMineProductionChart: React.FC<{ data: WorldMineProductionItem[] }> = ({ data }) => (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>World Mine Production (Selected Countries, tons REO)</h3>
    <ResponsiveContainer width="100%" height={400}>
       <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 70 }}> {/* Increased bottom margin for rotated labels */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="country" stroke="#64748b" angle={-45} textAnchor="end" interval={0} height={80} />
        <YAxis stroke="#64748b" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
        <Legend verticalAlign="top" />
        <Bar dataKey="2023" fill="#8884d8" name="2023 Production" />
        <Bar dataKey="2024" fill="#82ca9d" name="2024 Production (est.)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const WorldReservesChart: React.FC<{ data: WorldReserveItem[] }> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => (b.reserves || 0) - (a.reserves || 0)).slice(0, 10); // Top 10
  return (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>World Reserves (Top 10 Countries, tons REO)</h3>
    <ResponsiveContainer width="100%" height={400}>
       <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis type="number" stroke="#64748b" />
        <YAxis dataKey="country" type="category" stroke="#64748b" width={100} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.5rem', borderColor: '#cbd5e1' }} />
        <Legend verticalAlign="top" />
        <Bar dataKey="reserves" fill="#ffc658" name="Reserves (est.)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  );
};


const TextBlock: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className={cardClasses}>
    <h3 className={chartTitleClasses}>{title}</h3>
    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{text}</p>
  </div>
);


const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <TextBlock title="Domestic Production and Use (Summary 2024)" text={DOMESTIC_PRODUCTION_USE_TEXT} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionLineChart data={SALIENT_PRODUCTION_MINERAL_CONCENTRATES} lineColor="#0ea5e9" />
        <ProductionLineChart data={SALIENT_PRODUCTION_COMPOUNDS_METALS} lineColor="#f97316" />
        <ImportsBarChart data={SALIENT_IMPORTS_DATA} />
        <PricesLineChart data={SALIENT_PRICES_DATA} />
        <ImportSourcesPieChart data={IMPORT_SOURCES_DATA} />
        <TariffTable data={TARIFF_DATA} />
      </div>
       <WorldMineProductionChart data={WORLD_MINE_PRODUCTION_DATA} />
       <WorldReservesChart data={WORLD_RESERVES_DATA} />
       <TextBlock title="Recycling" text={RECYCLING_TEXT} />

      <div className={cardClasses}>
        <h3 className={chartTitleClasses}>Ask Gemini About Rare Earths Data</h3>
        <GeminiFeature />
      </div>
    </div>
  );
};

export default DashboardContent;
