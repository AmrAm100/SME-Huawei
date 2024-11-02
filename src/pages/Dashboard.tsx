import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { FaShoppingCart, FaUsers, FaBoxes, FaTruck } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';

function generateRandomSalesData(
  days: number,
): { name: string; value: number }[] {
  const data = [];
  for (let i = 1; i <= days; i++) {
    const randomValue = Math.floor(Math.random() * (35000 - 15000 + 1)) + 15000;
    data.push({ name: `Day ${i}`, value: randomValue });
  }
  return data;
}

type Timeframe = '7' | '30' | '90';
type ViewOption = 'daily' | 'weekly' | 'monthly';

const salesData: Record<
  ViewOption,
  Record<Timeframe, { name: string; value: number }[]>
> = {
  daily: {
    '7': generateRandomSalesData(7), // Daily data for 7 days
    '30': generateRandomSalesData(30), // Daily data for 30 days
    '90': generateRandomSalesData(90), // Daily data for 90 days
  },
  weekly: {
    '7': [], // Disable weekly for 7 days
    '30': [
      { name: 'Week 1', value: 15000 },
      { name: 'Week 2', value: 18000 },
      { name: 'Week 3', value: 22000 },
      { name: 'Week 4', value: 19000 },
    ], // Weekly data for 30 days
    '90': [
      { name: 'Week 1', value: 15000 },
      { name: 'Week 2', value: 18000 },
      { name: 'Week 3', value: 22000 },
      { name: 'Week 4', value: 19000 },
      { name: 'Week 5', value: 21000 },
      { name: 'Week 6', value: 20000 },
      { name: 'Week 7', value: 23000 },
      { name: 'Week 8', value: 24000 },
      { name: 'Week 9', value: 25000 },
      { name: 'Week 10', value: 26000 },
      { name: 'Week 11', value: 27000 },
      { name: 'Week 12', value: 28000 },
    ], // Weekly data for 90 days
  },
  monthly: {
    '7': [], // Disable monthly for 7 days
    '30': [], // Disable monthly for 30 days
    '90': [
      { name: 'Month 1', value: 50000 },
      { name: 'Month 2', value: 60000 },
      { name: 'Month 3', value: 70000 },
    ], // Monthly data for 90 days
  },
};

const categoryBreakdown: Record<
  Timeframe,
  { type: string; percentage: number; value: number }[]
> = {
  '7': [
    { type: 'Electronics', percentage: 35, value: 158000 },
    { type: 'Fashion', percentage: 28, value: 126000 },
    { type: 'Home & Living', percentage: 22, value: 99000 },
    { type: 'Beauty', percentage: 15, value: 67000 },
  ],
  '30': [
    { type: 'Electronics', percentage: 40, value: 200000 },
    { type: 'Fashion', percentage: 30, value: 150000 },
    { type: 'Home & Living', percentage: 20, value: 80000 },
    { type: 'Beauty', percentage: 10, value: 50000 },
  ],
  '90': [
    { type: 'Electronics', percentage: 30, value: 180000 },
    { type: 'Fashion', percentage: 30, value: 150000 },
    { type: 'Home & Living', percentage: 25, value: 120000 },
    { type: 'Beauty', percentage: 15, value: 70000 },
  ],
};

const orderStatus = [
  { status: 'Completed', percentage: 65, color: '#4CAF50' },
  { status: 'Processing', percentage: 25, color: '#FFC107' },
  { status: 'Cancelled', percentage: 10, color: '#F44336' },
];

function formatNumberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

type DashboardStatProps = {
  title: string;
  value: string;
  change: number;
  icon: IconType;
};

const DashboardStat = ({
  title,
  value,
  change,
  icon: Icon,
}: DashboardStatProps) => {
  const isPositive = change >= 0;
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-white p-6 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="translate-y-5 rounded-full bg-blue-100 p-3">
          <Icon className="text-2xl text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p
            className={`mt-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(change)}% than last week
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function Dashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>('7');
  const [viewOption, setViewOption] = useState<ViewOption>('daily');

  const currentSalesData = salesData[viewOption][timeframe];
  const currentCategoryData = categoryBreakdown[timeframe];

  useEffect(
    function () {
      setViewOption('daily');
    },
    [timeframe],
  );

  const dashboardStats = {
    '7': {
      totalOrders: { value: '1,284', change: 12.5 },
      activeCustomers: { value: '892', change: 8.2 },
      inventoryItems: { value: '1,567', change: -2.4 },
      orderFulfillmentRate: { value: '95.8%', change: 1.1 },
    },
    '30': {
      totalOrders: { value: '3,000', change: 15.0 },
      activeCustomers: { value: '1,200', change: 5.0 },
      inventoryItems: { value: '1,800', change: 0.0 },
      orderFulfillmentRate: { value: '97.5%', change: 2.0 },
    },
    '90': {
      totalOrders: { value: '8,500', change: 10.0 },
      activeCustomers: { value: '1,500', change: 4.0 },
      inventoryItems: { value: '2,200', change: -1.0 },
      orderFulfillmentRate: { value: '96.0%', change: 3.5 },
    },
  };
  const RevenueOverView = {
    '7': 185005.24,
    '30': 229034.21,
    '90': 403192.13,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {' '}
              MAY-X Dashboard
            </h1>
          </div>
          <div className="inline-flex rounded-lg bg-white shadow-sm">
            {['7', '30', '90'].map((days) => (
              <button
                key={days}
                onClick={() => setTimeframe(days as Timeframe)}
                className={`px-4 py-2 text-sm font-medium ${
                  timeframe === days
                    ? 'bg-blue-600 text-white ring-2 ring-white ring-offset-2'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${days === '7' ? 'rounded-l-lg' : ''} ${days === '90' ? 'rounded-r-lg' : ''}`}
              >
                {days} Days
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            title="TOTAL ORDERS"
            value={dashboardStats[timeframe].totalOrders.value}
            change={dashboardStats[timeframe].totalOrders.change}
            icon={FaShoppingCart}
          />
          <DashboardStat
            title="ACTIVE CUSTOMERS"
            value={dashboardStats[timeframe].activeCustomers.value}
            change={dashboardStats[timeframe].activeCustomers.change}
            icon={FaUsers}
          />
          <DashboardStat
            title="INVENTORY ITEMS"
            value={dashboardStats[timeframe].inventoryItems.value}
            change={dashboardStats[timeframe].inventoryItems.change}
            icon={FaBoxes}
          />
          <DashboardStat
            title="ORDER FULFILLMENT RATE"
            value={dashboardStats[timeframe].orderFulfillmentRate.value}
            change={dashboardStats[timeframe].orderFulfillmentRate.change}
            icon={FaTruck}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Revenue Overview
              </h2>
              <p className="text-gray-600">
                Total revenue:{' '}
                {formatNumberWithCommas(RevenueOverView[timeframe])}
              </p>
            </div>
            <select
              value={viewOption}
              onChange={(e) => setViewOption(e.target.value as ViewOption)}
              className="cursor-pointer appearance-none rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-700 transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option className="bg-white text-gray-700" value="daily">
                Daily
              </option>
              <option
                value="weekly"
                disabled={timeframe === '7'}
                className="bg-white text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
              >
                Weekly
              </option>
              <option
                className="bg-white text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                value="monthly"
                disabled={timeframe === '7' || timeframe === '30'}
              >
                Monthly
              </option>
            </select>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={currentSalesData}
                margin={{ top: 10, right: 30, left: 20, bottom: 0 }} // Adjust margins
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={
                    viewOption === 'weekly' || viewOption == 'monthly'
                      ? 0
                      : currentSalesData.length === 7
                        ? 0
                        : 4
                  }
                />
                <YAxis />
                <Tooltip />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              Sales by Category
            </h3>
            <div className="grid grid-cols-3 gap-4 font-medium text-gray-600">
              <div className="border-b">Category</div>
              <div className="border-b">Share</div>
              <div className="border-b text-right">Revenue</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {currentCategoryData.map(
                (item: { type: string; percentage: number; value: number }) => (
                  <>
                    <div className="py-3">{item.type}</div>
                    <div className="flex items-center py-3">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${item.percentage + 15}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm">{item.percentage}%</span>
                    </div>
                    <div className="py-3 text-right">
                      ${item.value.toLocaleString()}
                    </div>
                  </>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <h3 className="mb-6 text-xl font-bold text-gray-900">
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
