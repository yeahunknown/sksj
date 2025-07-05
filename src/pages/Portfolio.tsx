
import Layout from '@/components/Layout';

const Portfolio = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-gray-300">Track your token holdings and performance</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📊</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Coming Soon</h3>
              <p className="text-gray-400">
                Portfolio tracking features are currently in development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
