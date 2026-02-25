'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import type { CourseGetOne } from '../../types';

export type CourseWithOwnerFlag = CourseGetOne & {
    isOwner?: boolean;
};

interface ColumnsProps {
    onEdit: (course: CourseWithOwnerFlag) => void;
    onDelete: (course: CourseWithOwnerFlag) => void;
}

export const getColumns = ({
    onEdit,
    onDelete,
}: ColumnsProps): ColumnDef<CourseWithOwnerFlag>[] => [
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => {
                return (
                    <div className="max-w-md truncate">
                        {row.getValue('description')}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const course = row.original;

                if (!course.isOwner) {
                    return (
                        <div className="text-right">
                            <span className="text-muted-foreground text-xs">—</span>
                        </div>
                    );
                }

                return (
                    <div className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEdit(course)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => onDelete(course)}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];
