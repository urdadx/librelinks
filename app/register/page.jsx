import Register from '@/views/register';
import { Suspense } from 'react';

export const metadata = { title: 'Register' };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Register />
    </Suspense>
  );
}
