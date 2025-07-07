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
        return 'To the moon!';
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
          <div className="text-sm text-gray-400 transition-all duration-500 flex items-center gap-2">
            {chartState === 'adding-liquidity' && (
              <svg className="w-4 h-4 text-blue-400 animate-spin" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeWidth="2" d="M10 3v4m0 10v-4m7-7h-4M4 10h4"/>
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            )}
            {chartState === 'mooning' && (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            {getStateText()}
          </div>
        </div>

        <div className="relative h-32 mb-4">
          {chartState === 'loading' ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          ) : chartState === 'adding-liquidity' ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 w-full">
                <div className="text-white text-lg font-semibold">DRINKS</div>
              </div>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 w-full">
                <div className="text-white text-lg">1,000,000,000</div>
              </div>
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 w-full">
                <div className="text-white text-lg font-semibold">$DRNKS</div>
              </div>
            </div>
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 300 150"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              <path
                d={points}
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
                className="transition-all duration-1000 ease-in-out"
              />
              
              <circle
                cx="285"
                cy="30"
                r="6"
                fill="#3B82F6"
                className="animate-pulse"
              />
            </svg>
          )}
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
        </div>

        <Button 
          className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
            chartState === 'mooning' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
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