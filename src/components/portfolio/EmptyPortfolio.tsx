
import { Search } from 'lucide-react';

const EmptyPortfolio = () => {
  return (
    <div className="min-h-screen py-8 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-300">No tokens created</h3>
          <p className="text-gray-400">
            Create your first token to get started with liquidity management
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyPortfolio;
