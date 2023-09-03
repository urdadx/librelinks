import { AnalyticsDashboard } from '@/components/core/profile-analytics/dashboard';
import Layout from '@/components/layout/Layout';
import Footer from '@/components/layout/footer/footer';
import Head from 'next/head';

const Analytics = () => {
  return (
    <>
      <Head>
        <title>Librelinks | Analytics</title>
      </Head>
      <Layout>
        <div className="w-full lg:w-[100vw] pl-4 pr-4 overflow-auto">
          <div className="max-w-[700px] mx-auto my-10">
            <AnalyticsDashboard />
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Analytics;
