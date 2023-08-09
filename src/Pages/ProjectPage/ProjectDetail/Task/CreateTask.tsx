/* import router dom */
import { useNavigate, useParams } from "react-router-dom";

/* import local components */
import CreateTaskForm from "../../../../core/Components/Forms/Task/CreateTaskForm";

/* import local hooks for redux */
import { useAppDispatch } from "../../../../core/hooks/redux/useRedux";
import { IProjectDetail } from "../../../../core/models/Project/Project.interface";

/* import local interfaces */
import { ITask } from "../../../../core/models/Task/Task.Interface";
import { modalActions } from "../../../../core/redux/slice/modalSlice";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";
import PROJECT_SERVICE from "../../../../core/services/projectServ";

/* import local service */
import TASK_SERVICE from "../../../../core/services/taskServ";
import toastify from "../../../../core/utils/toastify/toastifyUtils";

const CreateTask = ({ project }: IProjectDetail) => {
    const dispatch = useAppDispatch();
    const handleOnFinish = (values: ITask) => {
        dispatch(modalActions.closeModal());
        dispatch(spinnerActions.setLoadingOn());
        TASK_SERVICE.createTask(values)
            .then((res) => {
                toastify("success", res.message);
                dispatch(PROJECT_SERVICE.getDetailsThunk(project.id));
            })
            .catch((error) => {
                setTimeout(() => {
                    toastify("error", error.response.data.message);
                    dispatch(spinnerActions.setLoadingOff());
                }, 2500);
            });
    };
    return (
        <div className="form-wrapper min-w-full">
            <div className="form-body">
                <CreateTaskForm
                    layout="vertical"
                    size="large"
                    project={project}
                    buttonText="create task"
                    handleOnFinish={handleOnFinish}
                />
            </div>
        </div>
    );
};

export default CreateTask;
