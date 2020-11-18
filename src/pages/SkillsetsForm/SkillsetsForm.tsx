import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  addSkill,
  getSkill,
  getConfigFormData,
  IConfigFormDate,
  updateSkill,
} from "../../services/skillsSvc";

import { ISkillsDTO } from "../../models/ISkills";

import { useParams, useHistory } from "react-router-dom";

const SkillsetsForm = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  const { Option } = Select;

  const [newCategory, setNewCategory] = useState<string>("");
  const [configForm, setConfigForm] = useState<IConfigFormDate>({
    categories: [],
    weights: [],
  });

  const onWeightChange = () => {};

  const addCategory = () => {
    const newCategories = Array.from(
      new Set([...configForm.categories, newCategory])
    );
    setConfigForm({ ...configForm, categories: newCategories });
  };

  interface ParamTypes {
    id: string;
  }
  let { id } = useParams<ParamTypes>();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      const config = await getConfigFormData();
      if (config) {
        setConfigForm(config);
      }
      if (id) {
        const skill = await getSkill(id);
        form.setFieldsValue(skill);
      }
    })();
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const openNotificationFailed = () =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (name: string): void => {
    if (id) {
      notification.success({
        message: "Success!",
        description: `You have successfully edit skill ${name}!`,
      });
    } else {
      notification.success({
        message: "Success!",
        description: `You have successfully added skill ${name}!`,
      });
    }
  };

  const onFinish = async (values: ISkillsDTO) => {
    let isSuccess = false;

    if (id) {
      const response = await updateSkill(id, values);
      if (response) {
        openNotificationSuccess(values.name);
        isSuccess = true;
      } else {
        openNotificationFailed();
      }
    } else {
      const response = await addSkill(values);
      if (response) {
        openNotificationSuccess(values.name);
        isSuccess = true;
      } else {
        openNotificationFailed();
      }
    }
    if (isSuccess) {
      history.push("/skills");
    }
  };
  return (
    <>
      <Form
        onFinish={(values) => {
          onFinish(values);
        }}
        validateTrigger={["onSubmit"]}
        form={form}
        validateMessages={validateMessages}
        name="skillForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 5 }}
        layout="horizontal"
      >
        <Form.Item name="name" label="Skill name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
          <Select
            placeholder="Select weight"
            onChange={onWeightChange}
            allowClear
          >
            {configForm.weights.map((item, index) => (
              <Option value={item} key={`${item}${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: 240 }}
            placeholder="Select category"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                >
                  <Input
                    style={{ flex: "auto" }}
                    value={newCategory}
                    onChange={(event) => {
                      setNewCategory(event.target.value);
                    }}
                  />
                  <Button
                    style={{ marginLeft: 5 }}
                    onClick={addCategory}
                    icon={<PlusOutlined />}
                  />
                </div>
              </div>
            )}
          >
            {configForm.categories.map((item, index) => (
              <Option key={`${index}${item}`} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SkillsetsForm;
