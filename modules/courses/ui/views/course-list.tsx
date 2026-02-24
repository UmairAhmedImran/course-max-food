'use client';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const CourseList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.hello.queryOptions({ text: 'Umair' }),
  );

  return (
    <div>{JSON.stringify(data.greeting, null, 2)}</div>
  );
};
