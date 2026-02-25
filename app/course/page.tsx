import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { CourseListHeader } from '@/modules/courses/ui/components/course-list-header';
import { CourseList } from '@/modules/courses/ui/views/course-list';

export default function ProtectedPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.courses.getAll.queryOptions(),
  );
  return (
    <>
      <CourseListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading</p>}>
          <ErrorBoundary fallback={<p>Error</p>}>
            <CourseList />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
