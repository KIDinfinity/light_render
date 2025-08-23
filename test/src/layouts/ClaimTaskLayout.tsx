import React, { lazy, Suspense } from 'react';
// import AuthTaskLayout from '../auth/Layout/AuthTaskLayout';

const AuthTaskLayout = lazy(() => import('../auth/Layout/AuthTaskLayout'));

export default (props: any) => (
  <Suspense fallback={null}>
    <AuthTaskLayout {...props} />
  </Suspense>
);
