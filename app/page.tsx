import { AuthButton } from '@/modules/auth/ui/components/auth-button';
import { ThemeSwitcher } from '@/modules/auth/ui/components/theme-switcher';
import Image from 'next/image';

import { Suspense } from 'react';

export function Page() {
  return (
    <>
      <div className='flex p-4 bg-[#E7E7E7]'>
        <div className='flex flex-1 gap-x-2 items-center'>
          <Image
            src='logo.svg'
            alt='logo'
            width={30}
            height={30}
          />
          <p className='font-semibold text-xl dark:text-black'>
            LMS
          </p>
        </div>
        <div className='flex flex-1 gap-x-2 justify-end'>
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
      <div className='flex items-center justify-center bg-[#fdf3e8]'>
        <Image
          src='/student-lesson.jpg'
          alt='Hero section image'
          width={1000}
          height={900}
        />
      </div>
    </>
  );
}

export default Page;
