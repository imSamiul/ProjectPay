import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/projectManager/addProject',
)({
  component: () => <div>Hello /authenticated/test!</div>,
})
