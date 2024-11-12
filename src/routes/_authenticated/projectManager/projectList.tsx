import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/projectManager/projectList',
)({
  component: () => <div>Hello /_authenticated/projectManager/projectList!</div>,
})
