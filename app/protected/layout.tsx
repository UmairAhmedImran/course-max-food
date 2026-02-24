import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Suspense } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <AuthButton />
      </Suspense>

      <ThemeSwitcher />
      <div className='flex-1 flex flex-col gap-20 max-w-5xl p-5'>
        {children}
      </div>
    </>
  );
}
