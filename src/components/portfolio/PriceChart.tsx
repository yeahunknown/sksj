
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Token } from '@/types/token';

interface PriceChartProps {
  token: Token;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass rounded-lg p-3 border border-white/20">
        <p className="text-white font-semibold">
          {new Date(data.timestamp).toLocaleString()}
        </p>
        <p className="text-blue-400">
          Price: ${payload[0].value.toFixed(8)}
        </p>
      </div>
    );
  }
  return null;
};

const PriceChart = ({ token }: PriceChartProps) => {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={token.chartData}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          {!token.isDead && (
            <Tooltip 
              content={<CustomTooltip />}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={token.isDead ? "#EF4444" : (token.hasLiquidity ? "#10B981" : "#6B7280")}
            strokeWidth={2}
            dot={false}
            animationDuration={token.isDead ? 0 : 1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
