import React from "react";
import { useGetProjectOverview } from "../../services/projectQueries";
import AllProject from "./AllProject";

function OverView() {
  return (
    <div className="container mx-auto my-5 flex flex-col px-10">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="divider"></div>
      <AllProject />
    </div>
  );
}

export default OverView;
