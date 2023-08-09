import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FormLayout } from "antd/lib/form/Form";
// import local interface
import { InterfaceProject, IProjectDetail } from "../Project/Project.interface";
import { ITask } from "../Task/Task.Interface";
import { User } from "../User/User.interface";

export interface FormProps {
  layout?: FormLayout;
  size?: SizeType;
}

export interface InterfaceProjectFormComponent extends FormProps {
  project?: InterfaceProject;
  confirmText: string;
  handleOnFinish: (value: any) => void;
}

export interface ITaskForm extends FormProps {
  project?: InterfaceProject;
  task?: ITask;
  buttonText?: string;
  handleOnFinish?: (value: any) => void;
}

export interface InterfaceProfileFormComponent extends FormProps {
  user: User;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
