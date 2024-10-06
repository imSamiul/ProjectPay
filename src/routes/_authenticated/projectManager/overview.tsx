import { createFileRoute } from "@tanstack/react-router";
import AllProject from "../../../components/overview/AllProject";

export const Route = createFileRoute("/_authenticated/projectManager/overview")(
  {
    component: Overview,
  },
);

function Overview() {
  return (
    <div>
      <div className="container mx-auto my-5 flex flex-col px-10">
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="divider"></div>
        {/* <AllProject /> */}
      </div>
    </div>
  );
}
