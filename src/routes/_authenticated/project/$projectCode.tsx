import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/project/$projectCode")({
  component: ProjectDetails,
});

function ProjectDetails() {
  const projectCode = useParams({
    from: "/_authenticated/project/$projectCode",
  });
  console.log(projectCode);

  return <div>Project Details</div>;
}
