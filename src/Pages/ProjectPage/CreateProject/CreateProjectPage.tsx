import { useNavigate } from "react-router-dom";

// import redux
import { useAppDispatch } from "../../../core/hooks/redux/useRedux";
import { projectActions } from "../../../core/redux/slice/projectSlice";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

// import local Interface
import { InterfaceProject } from "../../../core/models/Project/Project.interface";

// import local component
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import ProjectForm from "../../../core/Components/Forms/ProjectForm";

// import local Services
import PROJECT_SERVICE from "../../../core/services/projectServ";

// import utils
import toastify from "../../../core/utils/toastify/toastifyUtils";

const CreateProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnFinish = (values: InterfaceProject) => {
    dispatch(spinnerActions.setLoadingOn());
    const newProject = { ...values };
    if (!values.description) {
      newProject.description = "";
    }
    PROJECT_SERVICE.createProject(newProject)
      .then((res) => {
        dispatch(projectActions.putProjectDetail(res.content));
        setTimeout(() => {
          navigate("/", { replace: true });
          dispatch(spinnerActions.setLoadingOff());
          toastify("success", "Create project successfully !");
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.content);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  const pageContent = (
    <div className="form-wrapper">
      <div className="form-body">
        <ProjectForm
          layout="vertical"
          size="large"
          confirmText="Create Project"
          handleOnFinish={handleOnFinish}
        />
      </div>
    </div>
  );
  return (
    <div className="create-project-page h-full">
      <SectionWrapper
        title="Add project-details"
        subTitle="You can change these details anytime in your project settings."
        content={pageContent}
        sectionClass="create-project-section"
      />
    </div>
  );
};

export default CreateProjectPage;
