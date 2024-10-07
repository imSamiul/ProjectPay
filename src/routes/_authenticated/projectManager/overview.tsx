import { createFileRoute } from "@tanstack/react-router";
import AllProject from "../../../components/overview/AllProject";
import { useGetAllProjects } from "../../../services/queries/projectQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const Route = createFileRoute("/_authenticated/projectManager/overview")(
  {
    loader: async ({ context }) => {
      const { queryClient } = context;
      const data =
        queryClient.getQueryData(["project"]) ??
        (await queryClient.fetchInfiniteQuery(useGetAllProjects));
      return data;
    },
    component: Overview,
    pendingComponent: () => <div>Loading...</div>,
  },
);

function Overview() {
  const {
    data,
    fetchNextPage,

    hasNextPage,
  } = useSuspenseInfiniteQuery(useGetAllProjects);
  console.log(data.pages);

  const toDos = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <div>
      <div className="container mx-auto my-5 flex flex-col px-10">
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="divider"></div>
        <AllProject
          projects={toDos}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
