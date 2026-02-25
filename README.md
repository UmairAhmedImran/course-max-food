# Real Course App

This project is a modern, full-stack web application designed for managing and displaying courses. It focuses on a rich aesthetic experience while maintaining robust internal state management and high-performance server-side data fetching.

## Code Structure

The project follows a modular, feature-based architecture (similar to Feature-Sliced Design):

- **`/app`**: Contains the Next.js App Router setup. The entries for pages (e.g., `(protected)/course/page.tsx`) handle server-side rendering, layout, and prefetching of data before hydrating the client.
- **`/modules`**: Encapsulates specific feature domains (e.g., `courses`). Inside `modules/courses`, the code is split into `server` (backend TRPC procedures, schemas) and `ui` (React components, views, forms).
- **`/components`**: Reusable generic UI components (Shadcn UI), custom responsive dialogs, and providers.
- **`/trpc`**: The setup for the tRPC client and server, utilizing React Query.
- **`/db`**: Database schema definitions and ORM connection setup using Drizzle.

## Key Libraries Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **API and Data Fetching**: 
  - [tRPC](https://trpc.io/) for end-to-end typesafe APIs
  - [@tanstack/react-query](https://tanstack.com/query) for client and server data fetching states
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication/Storage**: [Supabase](https://supabase.com/)
- **User Interface**:
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Radix UI](https://www.radix-ui.com/) and Shadcn UI primitives
  - [Lucide React](https://lucide.dev/) for icons
  - [@tanstack/react-table](https://tanstack.com/table) for highly powerful and customizable data tables
- **Validation**: [Zod](https://zod.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## tRPC Implementation

The integration of tRPC with Next.js App Router (React Server Components) and React Query Hydration is implemented following the official documentation pattern:
[tRPC TanStack React Query Server Components Docs](https://trpc.io/docs/client/tanstack-react-query/server-components)

## TODO
- Add styling, dark theme
- Build Home page
- Add Sidebar
- Individual Course page

