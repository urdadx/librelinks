import Link from 'next/link';
import Form from '@/components/shared/form/form';
import { Wand } from 'lucide-react';
import { GridOverlay } from '@/components/utils/grid-overlay';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Register() {
  const { route } = useRouter();

  return (
    <>
      <Head>
        <title>Librelinks | Register</title>
      </Head>
      <GridOverlay />

      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <Link href="/">
              <Wand color="black" size={30} />
            </Link>
            <h3 className="text-xl font-semibold">
              {route === '/register' ? 'Create your account' : 'Welcome back'}
            </h3>
            <p className="text-sm text-gray-500">
              Get started for free. No credit card required
            </p>
          </div>
          <Form type="register" />
        </div>
      </div>
    </>
  );
}
