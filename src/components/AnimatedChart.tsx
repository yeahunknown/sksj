import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface AnimatedChartProps {
  className?: string;
}

type ChartState = 'loading' | 'adding-liquidity' | 'mooning';

const AnimatedChart = ({ className = "" }: AnimatedChartProps) => {
  const [points, setPoints] = useState<string>('');
  const [chartState, setChartState] = useState<ChartState>('loading');

  useEffect(() => {
    const generatePath = (state: ChartState) => {
      const width = 300;
      const height = 150;
      const steps = 20;
      
      let path = `M 0 ${height}`;
      
      for (let i = 1; i <= steps; i++) {
        const x = (width / steps) * i;
        let y = height - 20; // Default flat line
        
        if (state === 'adding-liquidity') {
          const baseY = height - 40 - (i * 2); // Slight upward trend
          const variance = Math.sin(i * 0.5) * 8;
          y = Math.max(20, Math.min(height - 20, baseY + variance));
        } else if (state === 'mooning') {
          const baseY = height - (i * 6); // Sharp upward trend
          const variance = Math.sin(i * 0.8) * 10 + Math.random() * 8;
          y = Math.max(10, Math.min(height - 10, baseY + variance));
        }
        
        if (i === 1) {
          path += ` L ${x} ${y}`;
        } else {
          const prevX = (width / steps) * (i - 1);
          const controlX1 = prevX + (x - prevX) / 3;
          const controlX2 = prevX + (2 * (x - prevX)) / 3;
          path += ` C ${controlX1} ${points.split(' ').slice(-1)[0] || y} ${controlX2} ${y} ${x} ${y}`;
        }
      }
      
      return path;
    };

    const updateChart = () => {
      setPoints(generatePath(chartState));
    };

    updateChart();
    
    // State progression
    const stateTimer = setTimeout(() => {
      if (chartState === 'loading') {
        setChartState('adding-liquidity');
      } else if (chartState === 'adding-liquidity') {
        setChartState('mooning');
      }
    }, 3000);

    const pathTimer = setInterval(updateChart, 1500);

    return () => {
      clearTimeout(stateTimer);
      clearInterval(pathTimer);
    };
  }, [chartState]);

  const getStateText = () => {
    switch (chartState) {
      case 'loading':
        return 'Loading...';
      case 'adding-liquidity':
        return 'Adding liquidity...';
      case 'mooning':
        return 'To the moon! 🚀';
    }
  };

  const getPercentage = () => {
    switch (chartState) {
      case 'loading':
        return '';
      case 'adding-liquidity':
        return '+42%';
      case 'mooning':
        return '+1337%';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className={`font-mono text-lg transition-all duration-500 ${
            chartState === 'mooning' ? 'text-green-400' : 
            chartState === 'adding-liquidity' ? 'text-blue-400' : 'text-gray-400'
          }`}>
            {getPercentage()}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-white mb-1">$OMNI</div>
          <div className="text-sm text-gray-400 transition-all duration-500">
            {getStateText()}
          </div>
        </div>

        <div className="relative h-32 mb-4">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 150"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <path
              d={points}
              stroke="#8B5CF6"
              strokeWidth="3"
              fill="none"
              className="transition-all duration-1000 ease-in-out"
            />
            
            <circle
              cx="285"
              cy="30"
              r="6"
              fill="#8B5CF6"
              className="animate-pulse"
            />
          </svg>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🚀</span>
          </div>
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">💧</span>
          </div>
          <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📊</span>
          </div>
        </div>

        <Button 
          className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
            chartState === 'mooning' 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-gray-700 text-gray-300 cursor-not-allowed'
          }`}
          disabled={chartState !== 'mooning'}
        >
          {chartState === 'mooning' ? 'gm to the moon' : getStateText()}
        </Button>
      </div>
    </div>
  );
};

export default AnimatedChart;