import React, { useState, useEffect } from "react";
import { Upload, Form } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

interface IImage {
  initialImage?: string;
}

export const CAvatarUpload: React.FC<IImage> = ({ initialImage }) => {
  const [photo, setPhoto] = useState<any>(initialImage);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPhoto(initialImage);
  }, [initialImage]);

  const handleChange = async (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const image = await uploadImage(info.file.originFileObj);

      setPhoto(image);
      setLoading(false);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Form.Item
      // valuePropName="fileList"
      getValueFromEvent={(e) => e && e.fileList}
      name="photo"
      label="Avatar"
      rules={[{ required: true }]}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {photo ? (
          <img src={photo} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Form.Item>
  );
};

export const uploadImage = (img: any) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(img);
  });

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    console.log("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
