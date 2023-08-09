import { useEffect } from "react";

// import redux
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useRedux";

// import custom Hooks
import { useFetchProjectCatList } from "../../hooks/ProjectHooks/useFetchProjectCatList";

/* import local interface */
import { InterfaceProjectFormComponent } from "../../models/common/FormProps.interface";

// import local component
import Label from "./Label/Label";

/* import antd components */
import { Button, Form, Input, Select } from "antd";

// import other component
import CustomEditor from "../tinyEditor/CustomEditor";

const ProjectForm = ({
  layout = "horizontal",
  size = "large",
  project,
  confirmText,
  handleOnFinish,
}: InterfaceProjectFormComponent) => {
  const dispatch = useAppDispatch();
  const projectCategoryList = useAppSelector(
    (state) => state.projectCategoryReducer.projectCategoryArr
  );

  const [form] = Form.useForm();
  const { Option } = Select;

  const getInitialValue = () => {
    if (project) {
      const categoryId = project.categoryId
        ? project.categoryId
        : project.projectCategory.id;
      return {
        categoryId,
        projectName: project.projectName,
        description: project.description,
      };
    }
    return { categoryId: projectCategoryList[0]?.id || 1 };
  };
  const initialValues = getInitialValue();

  useFetchProjectCatList(dispatch);
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const onFinish = (values: any) => {
    handleOnFinish(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const formProps = { form, onFinish, layout, size };
  const labelItem = (labelText: string) => (
    <Label className="text-lg font-medium text-pickled-bluewood-400 capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form name="project_form" className="myform projectForm" {...formProps}>
      <Form.Item
        name="projectName"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          { max: 80, message: "Project name can't extend 80 characters." },
        ]}
        label={labelItem("name")}
      >
        <Input
          placeholder="My project..."
          className="py-2 px-5 rounded-md"
          name="projectName"
        />
      </Form.Item>
      <Form.Item name="description" label={labelItem("description")}>
        <CustomEditor formInstance={form} />
      </Form.Item>
      <Form.Item
        name="categoryId"
        rules={[
          { required: true, message: "Please do not leave Category empty" },
        ]}
        label={labelItem("Project Category")}
      >
        <Select className="select-category">
          {/* map project category list */}
          {projectCategoryList.map((cat, idx) => {
            return (
              <Option key={cat.id.toString() + idx} value={cat.id}>
                {cat.projectCategoryName}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item className="form-btn-group">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-login bg-orange-500 text-white border-none rounded-[4px] hover:bg-orange-400 font-semibold text-lg transition-all duration-[400ms] order-2"
        >
          {confirmText}
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="btn-reset btn-txt--underlined border-none text-[#6B778C] text-lg order-1"
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
