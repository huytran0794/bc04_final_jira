import { SearchOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import SimpleMemberAvatar from "../../../core/Components/Avatar/SimpleMemberAvatar";
import ButtonLocal from "../../../core/Components/Utils/ButtonLocal";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/redux/useRedux";
import { IProjectDetail } from "../../../core/models/Project/Project.interface";
import { ITask } from "../../../core/models/Task/Task.Interface";
import { modalActions } from "../../../core/redux/slice/modalSlice";
import CreateTask from "./Task/CreateTask";
const DetailHeader = ({ project }: IProjectDetail) => {
    // const renderMember = () => {
    //     if (members) {
    //         return members?.map((member, idx) => (
    //             <Avatar src={member.avatar} key={member.userId!.toString() + idx} />
    //         ))
    //     }
    //     return null;
    // }
    let dispatch = useAppDispatch();
    let modalProps = useAppSelector(state => state.modalReducer.modalProps);
    const handleModalCreateTask = () => {
        let modalHeader = (<div className="header-text capitalize font-semibold text-lg">Create Issue</div>);
        dispatch(modalActions.setUpModal({ ...modalProps, width: "auto", headerContent: modalHeader }));
        dispatch(modalActions.openModal(<CreateTask project={project} />));
    };
    const projectBoardFilter = (
        <div className="project__board-filter mb-4 flex items-center justify-between">
            <div className="col--left flex items-center gap-4">
                <div className="search-bar relative">
                    <input className="search-input border border-black pl-5 py-2" type='text' name='filter-task-search' id="filter-task-search" />
                    <SearchOutlined className="absolute top-1/2 left-2 z-[1px] -translate-y-1/2" />
                </div>
                <div className="member">
                    <Avatar.Group size={30}>
                        <SimpleMemberAvatar members={project?.members} />
                    </Avatar.Group>
                </div>
            </div>
            <div className="col--right">
                <ButtonLocal
                    handleOnClick={handleModalCreateTask}
                    className="text-base border-none rounded-md font-semibold px-5 py-2.5"
                    baseColor="orange"
                >
                    Create Task
                </ButtonLocal>
            </div>
        </div>
    );
    return (
        <>{projectBoardFilter}</>
    )
}

export default DetailHeader