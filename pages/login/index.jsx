import Link from 'next/link';
import Form from '@/components/shared/form/form';
import { Wand } from 'lucide-react';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Librelinks | Login</title>
      </Head>
      <div className="absolute inset-0 bg-[url(../public/grid.svg)] bg-center [mask-image:linear-gradient(180deg,rgba(255,255,255,0))]" />{' '}
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <Link href="/">
              <Wand color="black" size={30} />
            </Link>
            <h3 className="text-xl font-semibold">Sign in to your account</h3>
            <p className="text-sm text-gray-500">
              Start transforming your online presence✨
            </p>
          </div>
          <Form type="login" />
        </div>
      </div>
    </>
  );
}
