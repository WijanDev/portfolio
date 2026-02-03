import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/readme')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/readme"!</div>
}
