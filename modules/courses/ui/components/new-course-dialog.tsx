import { ResponsiveDialog } from '@/components/responsive-dialog';
import { CourseForm } from './course-form';

interface NewCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewCourseDialog = ({
  open,
  onOpenChange,
}: NewCourseDialogProps) => {
  return (
    <ResponsiveDialog
      title='New Course'
      description='Create a new course'
      open={open}
      onOpenChange={onOpenChange}
    >
      <CourseForm
        onSucess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
