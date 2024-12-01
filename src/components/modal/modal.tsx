import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useAddContract as userCreate } from "../../Pages/Home/service/mutation/useAddContract";
import { useFayl } from "../../Pages/Home/service/mutation/usePostFile";
import { queryClient } from "../../config/query-client";

interface dataType {
  data: {
    path: string;
    fileName: string;
    size: number;
  }[];
}

interface formDataType {
  title?: string;
  courseId?: number;
  attachment?: {
    size?: number;
    url?: string;
    origName?: string;
  };
}

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
}) => {
  const { mutate } = userCreate();
  const { mutate: mutateFayl } = useFayl();
  const [rensData, setResponsData] = useState<dataType>();

  const submit = (data: formDataType) => {
    console.log(rensData?.data[0]);

    mutate(
      {
        title: data.title,
        courseId: 0,
        attachment: {
          url: rensData?.data[0].path,
          origName: rensData?.data[0].fileName,
          size: rensData?.data[0].size,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res);
          queryClient.invalidateQueries({ queryKey: ["contract"] });
          message.success("Success");
          onClose();
        },
        onError: (err) => {
          console.log(err);
          message.error("Error occurred while saving user");
        },
      }
    );
  };

  const handleFileUpload = (file: any) => {
    const formData = new FormData();

    formData.append("files", file.file);

    mutateFayl(formData, {
      onSuccess: (res) => {
        setResponsData(res as dataType);
        message.success("File uploaded successfully!");
        file.onSuccess?.();
      },
      onError: (err) => {
        message.error("File upload failed.");
        file.onError?.(err);
      },
    });
  };

  return (
    <Modal
      width={480}
      style={{ padding: "24px" }}
      title="Yangi Foydalanuvchi Qo'shish"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={submit}>
        <div style={{ marginBottom: "32px" }}>
          <Form.Item
            name={"title"}
            label={"Kurs"}
            rules={[{ required: true, message: "Kursni tanlang" }]}
          >
            <Input style={{ padding: "10px 16px" }} />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name={"courseId"}
            label="Nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input style={{ padding: "10px 16px" }} />
          </Form.Item>
        </div>
        <Form.Item name="attachment">
          <Upload
            customRequest={handleFileUpload}
            showUploadList={true}
            maxCount={1}
            accept=".jpg,.png,.doc,.docx"
            listType="text"
          >
            <Button
              style={{
                color: "#0eb182",
                border: "1px dashed #ddd",
                padding: "20px 138px",
                marginTop: "15px",
              }}
              icon={<PaperClipOutlined style={{ color: "#0eb182" }} />}
            >
              Fayl biriktiring
            </Button>
          </Upload>
        </Form.Item>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
