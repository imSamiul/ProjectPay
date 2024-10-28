import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import SearchBox from "../../../components/overview/SearchBox";
import AllProject from "../../../components/overview/AllProject";
import {
  useGetManagerProjects,
  useSearchProject,
} from "../../../services/queries/projectQueries";
import { useDebounce } from "@uidotdev/usehooks";
import { ProjectType } from "../../../types/projectType";

export const Route = createFileRoute(
  "/_authenticated/projectManager/managerOverview",
)({
  component: ManagerOverview,
});

function ManagerOverview() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1000); // 1 second debounce

  const {
    data: allProjectsData,
    fetchNextPage,
    hasNextPage,
    isError: isInfiniteScrollError,
    error: infiniteScrollError,
    isFetching: isInfiniteScrollFetching,

    isLoading: isInfiniteScrollLoading,
  } = useGetManagerProjects();

  // Fetch searched projects if search text exists
  const {
    data: searchResults,
    isLoading: isSearchResultsLoading,
    isError: isSearchResultsError,
    error: searchResultsError,
  } = useSearchProject(debouncedSearchText);

  // Memoize the projects to display
  const projects = useMemo(() => {
    if (debouncedSearchText) {
      return searchResults || []; // If searching, return search results
    } else {
      return allProjectsData?.pages.reduce(
        (acc, page) => [...acc, ...page],
        [],
      ); // Otherwise, return all projects
    }
  }, [debouncedSearchText, searchResults, allProjectsData]);

  const isSearching = !!debouncedSearchText;
  const sortedProjects = isSearching
    ? projects // If searching, do not sort
    : projects?.sort((a: ProjectType, b: ProjectType) => {
        if (a.status === false && b.status === true) {
          return -1;
        } else if (a.status === true && b.status === false) {
          return 1;
        } else {
          return 0;
        }
      });

  return (
    <div>
      <div className="container mx-auto my-5 flex flex-col px-10">
        <h1 className="text-xl md:text-3xl font-bold">Overview</h1>
        <div className="divider"></div>
        <div className="flex flex-col gap-4">
          <SearchBox onSearchTextChange={setSearchText} />
          <AllProject
            projects={sortedProjects || []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isSearching={isSearching}
            isInfiniteScrollError={isInfiniteScrollError}
            infiniteScrollError={infiniteScrollError}
            isInfiniteScrollFetching={isInfiniteScrollFetching}
            isInfiniteScrollLoading={isInfiniteScrollLoading}
            isSearchResultsLoading={isSearchResultsLoading}
            isSearchResultsError={isSearchResultsError}
            searchResultsError={searchResultsError}
          />
        </div>
      </div>
    </div>
  );
}
