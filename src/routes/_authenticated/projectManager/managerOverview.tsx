import { createFileRoute } from "@tanstack/react-router";
import { useGetManagerProjects } from "../../../services/queries/managerQueries";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import SearchBox from "../../../components/overview/SearchBox";
import AllProject from "../../../components/overview/AllProject";
import { useSearchProject } from "../../../services/queries/projectQueries";

export const Route = createFileRoute(
  "/_authenticated/projectManager/managerOverview",
)({
  loader: async ({ context }) => {
    const { queryClient } = context;
    const data =
      queryClient.getQueryData(["project"]) ??
      (await queryClient.fetchInfiniteQuery(useGetManagerProjects));
    return data;
  },
  component: ManagerOverview,
  pendingComponent: () => <div>Loading...</div>,
});

function ManagerOverview() {
  const [searchText, setSearchText] = useState("");
  const {
    data: allProjectsData,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(useGetManagerProjects);

  // Fetch searched projects if search text exists
  const { data: searchResults } = useSearchProject(searchText);

  // Memoize the projects to display
  const projects = useMemo(() => {
    if (searchText) {
      return searchResults || []; // If searching, return search results
    } else {
      return allProjectsData?.pages.reduce(
        (acc, page) => [...acc, ...page],
        [],
      ); // Otherwise, return all projects
    }
  }, [searchText, searchResults, allProjectsData]);

  const isSearching = !!searchText;

  return (
    <div>
      <div className="container mx-auto my-5 flex flex-col px-10">
        <h1 className="text-xl md:text-3xl font-bold">Overview</h1>
        <div className="divider"></div>
        <div className="flex flex-col gap-4">
          <SearchBox onSearchTextChange={setSearchText} />
          <AllProject
            projects={projects}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  );
}
