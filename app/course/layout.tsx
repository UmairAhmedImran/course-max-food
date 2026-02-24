import { AuthButton } from '@/modules/auth/ui/components/auth-button';
import { ThemeSwitcher } from '@/modules/auth/ui/components/theme-switcher';
import { Suspense } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex flex-1 justify-end gap-x-2 p-2'>
        <ThemeSwitcher />
        <Suspense>
          <AuthButton />
        </Suspense>
      </div>
      <div className='flex-1 flex flex-col gap-20 max-w-5xl p-5'>
        {children}
      </div>
    </>
  );
}
