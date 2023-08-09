import React, { useRef } from "react";

// import redux
import { useAppDispatch } from "../../../../core/hooks/redux/useRedux";
import { projectActions } from "../../../../core/redux/slice/projectSlice";

// import local Service
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import ANTD Component
import { message } from "antd";

export default function ProjectMobileSearch() {
  let searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useAppDispatch();

  const getFilteredProjectList = (searchKey: string) => {
    if (searchKey) {
      PROJECT_SERVICE.getAllByName(searchKey)
        .then((res) => {
          //   console.log(res);
          dispatch(projectActions.updateProjectList(res.content));
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
        });
    } else {
      dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
    }
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search Projects"
        className="block my-4 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-orange-500 focus-visible:outline-none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            // console.log(e.target.value);
            getFilteredProjectList(e.target.value);
          }, 300);
        }}
      />
    </div>
  );
}
