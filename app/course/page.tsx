import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { CourseListHeader } from '@/modules/courses/ui/components/course-list-header';
import { CourseList } from '@/modules/courses/ui/views/course-list';
import { createClient } from '@/lib/supabase/server';

export default async function ProtectedPage() {
  const queryClient = getQueryClient();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    void queryClient.prefetchQuery(
      trpc.courses.getAll.queryOptions({ limit: 5, page: 1 }),
    );
  }
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
