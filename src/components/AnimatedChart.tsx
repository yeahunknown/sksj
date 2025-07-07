import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Coins, BarChart3 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AnimatedChartProps {
  className?: string;
}

const AnimatedChart = ({ className = "" }: AnimatedChartProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full max-w-[500px] aspect-square ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[80%] h-[80%] rounded-2xl bg-gray-900 border border-blue-500/20 shadow-xl shadow-blue-900/10 p-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-4"
              >
                {step === 0 && (
                  <>
                    <motion.div
                      className="w-full h-12 rounded-lg bg-gray-800 border border-blue-500/10 flex items-center px-4"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <span className="text-sm font-medium text-gray-300">MOON ROCKET</span>
                    </motion.div>
                    <motion.div
                      className="w-full h-12 rounded-lg bg-gray-800 border border-blue-500/10 flex items-center px-4"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="text-sm font-medium text-gray-300">100,000,000</span>
                    </motion.div>
                    <motion.div
                      className="w-full h-12 rounded-lg bg-gray-800 border border-blue-500/10 flex items-center px-4"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <span className="text-sm font-medium text-gray-300">$MOON</span>
                    </motion.div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-32 h-32 rounded-full bg-blue-900/30 border border-blue-500/20 flex items-center justify-center"
                      >
                        <Coins className="h-16 w-16 text-blue-400" />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-2 w-full bg-gray-800 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="text-center text-sm text-gray-400"
                    >
                      Adding liquidity...
                    </motion.div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-lg font-bold text-white">$MOON</span>
                        <span className="text-green-400 font-bold">+3482%</span>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-40 h-24"
                      >
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                          <motion.path
                            d="M0,50 Q10,40 20,38 T40,32 T60,20 T80,10 T100,0"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                          />
                        </svg>
                        <motion.div
                          className="absolute top-0 right-0 w-3 h-3 rounded-full bg-blue-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.8 }}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 1 }}
                        className="text-center text-sm text-gray-400"
                      >
                        To the moon!
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2">
              <motion.div
                className={`w-12 h-12 rounded-lg ${step === 0 ? "bg-blue-600" : "bg-blue-900/30 border border-blue-500/20"} flex items-center justify-center cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(0)}
              >
                <Rocket className={`h-6 w-6 ${step === 0 ? "text-white" : "text-blue-400"}`} />
              </motion.div>
              <motion.div
                className={`w-12 h-12 rounded-lg ${step === 1 ? "bg-cyan-600" : "bg-cyan-900/30 border border-cyan-500/20"} flex items-center justify-center cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
              >
                <Coins className={`h-6 w-6 ${step === 1 ? "text-white" : "text-cyan-400"}`} />
              </motion.div>
              <motion.div
                className={`w-12 h-12 rounded-lg ${step === 2 ? "bg-pink-600" : "bg-pink-900/30 border border-pink-500/20"} flex items-center justify-center cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
              >
                <BarChart3 className={`h-6 w-6 ${step === 2 ? "text-white" : "text-pink-400"}`} />
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {step === 2 ? (
              <Link to="/create" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                  Create Token
                </Button>
              </Link>
            ) : (
              <Button 
                className="w-full bg-gray-700 text-gray-300 cursor-not-allowed font-semibold py-3 rounded-xl"
                disabled
              >
                {step === 1 ? 'Adding liquidity...' : 'Creating token...'}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedChart;