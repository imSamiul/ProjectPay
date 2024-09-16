import React from "react";
import { useGetProjectOverview } from "../services/projectQueries";

function OverView() {
  const { data } = useGetProjectOverview();
  console.log(data);

  return <div>OverView</div>;
}

export default OverView;
