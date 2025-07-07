import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface AnimatedChartProps {
  className?: string;
}

const AnimatedChart = ({ className = "" }: AnimatedChartProps) => {
  const [points, setPoints] = useState<string>('');

  useEffect(() => {
    const generatePath = () => {
      const width = 300;
      const height = 150;
      const steps = 20;
      
      let path = `M 0 ${height}`;
      
      for (let i = 1; i <= steps; i++) {
        const x = (width / steps) * i;
        const baseY = height - (i * 4); // Rising trend
        const variance = Math.sin(i * 0.8) * 15 + Math.random() * 10;
        const y = Math.max(10, Math.min(height - 10, baseY + variance));
        
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

    const updatePath = () => {
      setPoints(generatePath());
    };

    updatePath();
    const interval = setInterval(updatePath, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-green-400 font-mono text-lg">+1337%</div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-white mb-1">$OMNI</div>
          <div className="text-sm text-gray-400">To the moon! 🚀</div>
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

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
          gm to the moon
        </Button>
      </div>
    </div>
  );
};

export default AnimatedChart;