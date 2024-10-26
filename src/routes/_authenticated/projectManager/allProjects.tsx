import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/projectManager/allProjects',
)({
  component: () => <div>Hello /_authenticated/projectManager/allProjects!</div>,
})
