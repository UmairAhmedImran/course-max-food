import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';
import { getQueryClient, trpc } from '@/trpc/server';
import { CourseList } from '@/modules/courses/ui/views/course-list';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect('/auth/login');
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.hello.queryOptions({ text: 'Umair' }),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading</p>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <CourseList />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
