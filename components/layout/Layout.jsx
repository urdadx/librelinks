import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/utils/loading-spinner';
import useCurrentUser from '@/hooks/useCurrentUser';
import Preview from '../shared/profile-preview/preview';
import PreviewBtn from '../shared/profile-preview/preview-btn';
import Navbar from './navbar/navbar';

const ADMIN_PATHS = ['/admin', '/admin/customize', '/admin/analytics', '/admin/settings'];

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrentUser();

  const requiresOnboarding = !isLoading && currentUser && !currentUser.handle;

  useEffect(() => {
    if (!requiresOnboarding) {
      return;
    }

    if (ADMIN_PATHS.includes(router.pathname)) {
      router.replace('/onboarding');
    }
  }, [requiresOnboarding, router]);

  if (isLoading || requiresOnboarding) {
    return <Loader message={'Loading...'} bgColor="black" textColor="black" />;
  }

  return (
    <>
      <section className="fixed overflow-hidden">
        <Navbar showName={false} isHomePage={false} />
        <main className="bg-[#F9FAFB] flex flex-row h-screen z-0 ">
          {children}
          {router.pathname !== '/admin/analytics' && (
            <div className="hidden lg:my-auto lg:block lg:basis-2/5 pl-4">
              <Preview />
            </div>
          )}

          <PreviewBtn />
        </main>
      </section>
    </>
  );
};

export default Layout;
