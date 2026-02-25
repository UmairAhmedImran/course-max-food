import { useTRPC } from '@/trpc/client';
import { CourseGetOne } from '../../types';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { courseInsertSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CourseFormProps {
  onSucess?: () => void;
  onCancel?: () => void;
  initialValues?: CourseGetOne;
}

export const CourseForm = ({
  onSucess,
  onCancel,
  initialValues,
}: CourseFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createCourse = useMutation(
    trpc.courses.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.courses.getAll.queryOptions(),
        );
        onSucess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  //   const updateCourse = useMutation(
  //     trpc.agents.update.mutationOptions({
  //       onSuccess: async () => {
  //         await queryClient.invalidateQueries(
  //           trpc.agents.getMany.queryOptions({}),
  //         );
  //         if (initialValues?.id) {
  //           await queryClient.invalidateQueries(
  //             trpc.agents.getOne.queryOptions({
  //               id: initialValues.id,
  //             }),
  //           );
  //         }
  //         onSucess?.();
  //       },
  //       onError: (error) => {
  //         toast.error(error.message);
  //       },
  //     }),
  //   );

  const form = useForm<z.infer<typeof courseInsertSchema>>({
    resolver: zodResolver(courseInsertSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createCourse.isPending;

  const onSubmit = (values: z.infer<typeof courseInsertSchema>) => {
    createCourse.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='e.g. Math Course'
                  className='px-4 py-3'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='e.g. This course is going to go deep in matrix calculations'
                  className='px-4 py-3'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between gap-x-2'>
          {onCancel && (
            <Button
              variant='ghost'
              disabled={isPending}
              type='button'
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type='submit'>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
