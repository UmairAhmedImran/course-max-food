'use client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const CourseList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.courses.getAll.queryOptions(),
  );

  return (
    <>
      <div>{JSON.stringify(data, null, 2)}</div>
    </>
  );
};
