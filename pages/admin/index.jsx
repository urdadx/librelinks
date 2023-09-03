import LinksEditor from '../../components/core/admin-panel/links-editor';
import Layout from '@/components/layout/Layout';
import useMediaQuery from '@/hooks/use-media-query';
import Head from 'next/head';

const Admin = () => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Head>
        <title>Librelinks | Admin</title>
      </Head>
      <Layout>
        <div className="w-full lg:basis-3/5 pl-4 pr-4 border-r overflow-scroll">
          <LinksEditor />
          {isMobile && <div className="h-[40px] mb-24" />}
        </div>
      </Layout>
    </>
  );
};

export default Admin;
