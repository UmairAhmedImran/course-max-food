'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { NewCourseDialog } from './new-course-dialog';

export const CourseListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewCourseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className='w-full py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='font-medium text-xl'>
            All Courses
          </h5>
          <div className='flex justify-end flex-1'>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusIcon />
              New Course
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
