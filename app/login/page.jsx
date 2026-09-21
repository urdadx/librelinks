import Login from '@/views/login';
import { Suspense } from 'react';

export const metadata = { title: 'Login' };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
