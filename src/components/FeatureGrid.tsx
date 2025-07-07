import { motion } from "framer-motion";
import { Rocket, Coins, BarChart3, Zap, Flame, Sparkles, TrendingUp, Shield, Gauge, Target } from "lucide-react";

export function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center space-y-3 rounded-2xl border border-blue-500/20 bg-gray-900 p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/10"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="rounded-full bg-blue-900/30 border border-blue-500/20 p-3">
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-white text-center">{feature.title}</h3>
          <p className="text-sm text-gray-400 text-center leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const features = [
  {
    title: "Lightning Fast Deploy",
    description: "Create and deploy your SPL token to Solana mainnet in seconds. Zero coding, maximum speed.",
    icon: <Gauge className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Instant Liquidity",
    description: "One-click liquidity pools on major DEXes. Get your token trading immediately after launch.",
    icon: <Coins className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "Professional Charts",
    description: "Automatic integration with Dexscreener, Photon, and Jupiter. Your token appears where it matters.",
    icon: <BarChart3 className="h-6 w-6 text-pink-400" />,
  },
  {
    title: "Launch Toolkit",
    description: "Everything you need for a successful launch: metadata, socials, and marketing tools in one place.",
    icon: <Rocket className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Moon Machine",
    description: "Built-in tools to help your token gain traction and climb the trending charts across platforms.",
    icon: <Target className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Fire Features",
    description: "Burn mechanics, staking rewards, and community tools to keep your holders engaged and hyped.",
    icon: <Flame className="h-6 w-6 text-red-400" />,
  },
  {
    title: "Mass Distribution",
    description: "Powerful airdrop system to distribute tokens to thousands of wallets with a single click.",
    icon: <Sparkles className="h-6 w-6 text-yellow-400" />,
  },
  {
    title: "Solana Native",
    description: "Purpose-built for Solana's ecosystem. Fast, cheap, and perfectly optimized for maximum performance.",
    icon: <Shield className="h-6 w-6 text-blue-400" />,
  },
];