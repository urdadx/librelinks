import React from 'react';
import Preview from '../../components/shared/profile-preview/preview';
import PreviewBtn from '../../components/shared/profile-preview/preview-btn';
import Layout from '@/components/layout/_layout';
import Footer from '@/components/layout/footer/footer';
import ButtonSelector from '@/components/core/custom-buttons/buttons-selector';
import ThemesPicker from '@/components/core/custom-page-themes/themes-picker';

const Customize = () => {

  return (
    <>
      <Layout>  
      <div className="w-full lg:w-3/5 pl-4 pr-4 border-r overflow-auto">
        <div>
          <ThemesPicker />
          <ButtonSelector />
        </div>
          
          <Footer />
          <div className="h-[60px]"></div>
      </div>


        <div className="hidden lg:block lg:my-auto lg:w-2/5 pl-4 overflow-hidden">
          <Preview />
        </div>

        <PreviewBtn />
      </Layout>
    </>
  );
};

export default Customize;
