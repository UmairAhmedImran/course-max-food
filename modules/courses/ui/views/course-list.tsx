'use client';

import { useState } from 'react';
import { useTRPC } from '@/trpc/client';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { CourseForm } from '../components/course-form';
import { toast } from 'sonner';
import type { CourseGetOne } from '../../types';
import { getColumns, type CourseWithOwnerFlag } from './columns';
import { DataTable } from './data-table';

export const CourseList = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.courses.getAll.queryOptions({ limit, page }),
  );

  const courses = (data?.items ?? []) as CourseWithOwnerFlag[];
  const pageCount = data?.pageCount ?? 1;

  const [editingCourse, setEditingCourse] =
    useState<CourseGetOne | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [deletingCourse, setDeletingCourse] =
    useState<CourseWithOwnerFlag | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteCourse = useMutation(
    trpc.courses.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.courses.getAll.queryOptions(),
        );
        setIsDeleteOpen(false);
        setDeletingCourse(null);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const handleEdit = (course: CourseWithOwnerFlag) => {
    const { isOwner: _, ...rest } = course;
    setEditingCourse(rest);
    setIsEditOpen(true);
  };

  const handleDelete = (course: CourseWithOwnerFlag) => {
    setDeletingCourse(course);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <DataTable
        columns={getColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={courses}
        pageCount={pageCount}
        page={page}
        onPageChange={setPage}
      />

      {editingCourse && (
        <ResponsiveDialog
          title='Edit course'
          description='Update the course details.'
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) {
              setEditingCourse(null);
            }
          }}
        >
          <CourseForm
            initialValues={editingCourse}
            onSucess={() => {
              setIsEditOpen(false);
              setEditingCourse(null);
            }}
            onCancel={() => {
              setIsEditOpen(false);
              setEditingCourse(null);
            }}
          />
        </ResponsiveDialog>
      )}

      {deletingCourse && (
        <ResponsiveDialog
          title='Delete course'
          description='Are you sure you want to delete this course? This action cannot be undone.'
          open={isDeleteOpen}
          onOpenChange={(open) => {
            setIsDeleteOpen(open);
            if (!open) {
              setDeletingCourse(null);
            }
          }}
        >
          <div className='space-y-4'>
            <p>
              This will permanently remove{' '}
              <span className='font-semibold'>
                {deletingCourse.title}
              </span>
              .
            </p>
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeletingCourse(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type='button'
                variant='destructive'
                disabled={deleteCourse.isPending}
                onClick={() => {
                  if (!deletingCourse?.id) return;
                  deleteCourse.mutate({
                    id: deletingCourse.id,
                  });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </ResponsiveDialog>
      )}
    </>
  );
};
