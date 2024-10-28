import { useInView } from "react-intersection-observer";
import { ProjectType } from "../../types/projectType";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import Loader from "../Loader";
import { toast } from "react-toastify";

import ErrorComponent from "../ErrorComponent";

type AllProjectPropsType = {
  projects: ProjectType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;

  isSearching: boolean;
  isInfiniteScrollError: boolean;
  infiniteScrollError: Error | null;
  isInfiniteScrollFetching: boolean;

  isInfiniteScrollLoading: boolean;

  isSearchResultsLoading: boolean;
  isSearchResultsError: boolean;
  searchResultsError: Error | null;
  refetchInfiniteProjects: () => void;
};

// true => Done
// false => Not Done

function AllProject({
  projects,
  hasNextPage,
  fetchNextPage,
  isSearching,
  isInfiniteScrollError,
  infiniteScrollError,
  isInfiniteScrollFetching,

  isInfiniteScrollLoading,

  isSearchResultsLoading,
  isSearchResultsError,
  searchResultsError,
  refetchInfiniteProjects,
}: AllProjectPropsType) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    if (isInfiniteScrollError) {
      toast.error(infiniteScrollError?.message);
    }
  }, [inView, fetchNextPage, isInfiniteScrollError, infiniteScrollError]);

  if (searchResultsError) {
    return <div>Search Results Error</div>;
  }

  if (isSearchResultsLoading) {
    return <div>Search Results Loading...</div>;
  }
  if (isSearchResultsError) {
    return <div>Search Results Error</div>;
  }

  if (isInfiniteScrollError) {
    return (
      <ErrorComponent
        errorMessage={
          infiniteScrollError
            ? infiniteScrollError.message
            : "An error occurred"
        }
        onRetry={refetchInfiniteProjects}
      />
    );
  }
  if (isInfiniteScrollLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (projects.length === 0) {
    return <div>No Projects Found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-notoSans">
      {projects.map((project: ProjectType) => {
        return (
          <Link
            key={project._id}
            className={`${
              project.status === false ? "bg-base-200" : "bg-accent"
            } min-h-60   p-5 shadow-md rounded-md`}
            to={`/project/$projectCode`}
            params={{
              projectCode: project.projectCode ? project.projectCode : "",
            }}
          >
            <div className="flex  justify-between text-lg md:text-xl mb-0">
              <h3 className="font-lexend font-bold ">{project.name}</h3>
              <div
                className={
                  project.status === true
                    ? "bg-success text-success-content  py-1 px-2 rounded"
                    : ""
                }
              >
                {project.status === true ? "Done" : ""}
              </div>
            </div>

            <div className="divider my-0"></div>
            <p className="text-lg ">
              <span className="font-bold text-base-content">
                Project Code:{" "}
              </span>
              {project.projectCode}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Client Name: </span>
              {project.clientName}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">
                Client Phone:{" "}
              </span>
              {project.clientPhone}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Budget: </span>
              {project.budget}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Advance: </span>
              {project.advance}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Due: </span>
              {project.due}
            </p>
            <p className="text-lg ">
              <span className="font-bold text-base-content">Deadline: </span>
              {project.endDate}
            </p>
          </Link>
        );
      })}
      {hasNextPage && isInfiniteScrollFetching && (
        <div className="skeleton"></div>
      )}
      {!hasNextPage && (
        <div className="md:col-span-3 text-center">No more data</div>
      )}

      {hasNextPage && !isSearching && (
        <div className="md:col-span-3 text-center" ref={ref}>
          <span className="loading loading-dots loading-sm md:loading-lg"></span>
        </div>
      )}
    </div>
  );
}

export default AllProject;
