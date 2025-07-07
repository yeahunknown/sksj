import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Flame, Skull } from "lucide-react";

export function TokensSection() {
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
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Tokens Made by Our Customers</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real tokens created with Omnipad. From moon shots to rug pulls, we've seen it all.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {memeCoins.map((coin, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden bg-gray-900 border-blue-500/20 hover:border-blue-500/40 transition-all">
                <CardContent className="p-0">
                  <div className="p-4 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-blue-500/20 bg-gray-800 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {coin.symbol.slice(0, 2)}
                      </span>
                      {coin.hot && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                          <Flame className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-1">
                          {coin.name}
                          {coin.rugged && <Skull className="h-3.5 w-3.5 text-red-400" />}
                        </h3>
                        <Badge
                          variant={coin.change >= 0 ? "default" : "destructive"}
                          className={`flex items-center gap-1 ${
                            coin.change >= 0 
                              ? "bg-green-900 hover:bg-green-900 text-green-400 border-green-500/20" 
                              : "bg-red-900 hover:bg-red-900 text-red-400 border-red-500/20"
                          }`}
                        >
                          {coin.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(coin.change)}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>${coin.symbol}</span>
                        <span>${coin.price.toFixed(8)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-800">
                    <motion.div
                      className={`h-full ${coin.change >= 0 ? "bg-green-500" : "bg-red-500"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(Math.abs(coin.change) * 2, 100)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                    <span>Vol: ${coin.volume.toLocaleString()}</span>
                    <span>MCap: ${coin.marketCap.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const memeCoins = [
  {
    name: "Diamond Hands",
    symbol: "HODL",
    price: 0.00000892,
    change: 156.7,
    volume: 2350000,
    marketCap: 18500000,
    hot: true,
    rugged: false,
  },
  {
    name: "Rocket Fuel",
    symbol: "BLAST",
    price: 0.00000345,
    change: 89.2,
    volume: 4670000,
    marketCap: 34500000,
    hot: true,
    rugged: false,
  },
  {
    name: "Degen Ape",
    symbol: "APE",
    price: 0.00000156,
    change: -12.4,
    volume: 1230000,
    marketCap: 9800000,
    hot: false,
    rugged: false,
  },
  {
    name: "Galaxy Token",
    symbol: "GALAXY",
    price: 0.00000678,
    change: 234.8,
    volume: 8900000,
    marketCap: 67800000,
    hot: true,
    rugged: false,
  },
  {
    name: "Shiba Sol",
    symbol: "SHIB",
    price: 0.00000023,
    change: -8.6,
    volume: 890000,
    marketCap: 2300000,
    hot: false,
    rugged: false,
  },
  {
    name: "Exit Scam",
    symbol: "REKT",
    price: 0.00000001,
    change: -98.7,
    volume: 5000,
    marketCap: 50,
    hot: false,
    rugged: true,
  },
];