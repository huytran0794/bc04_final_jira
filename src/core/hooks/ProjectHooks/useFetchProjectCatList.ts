import { useEffect } from "react";
import { projectCategoryActions } from "../../redux/slice/projectCategorySlice";
import { AppDispatch } from "../../redux/store/store";
import PROJECT_SERVICE from "../../services/projectServ";

export const useFetchProjectCatList = (dispatch: AppDispatch) => {
  useEffect(() => {
    PROJECT_SERVICE.getAllProjectCategory()
      .then((res) => {
        dispatch(projectCategoryActions.getAllProjectCategory(res.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};
