import React, { useState } from "react";
import { Form, Input, notification } from "antd";
import "../../../assets/user-page/main.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FigureAPI from "../../../Service/FigureAPI.js";

const CommentFigure = ({ id }) => {
  const [form] = Form.useForm();
  const [comment_mes, setComment_mes] = useState("");

  const onFinish = async (data) => {
    try {
      const { name_com, email,parentID} = data;
      const figure_id = id;
      const name_com_value = name_com || "Người dùng ẩn danh";
      const parentID_value = parentID || 0;
      await FigureAPI.addComment(
        name_com_value,
        email,
        comment_mes, // Dữ liệu của trình soạn thảo CKEditor được lấy từ comment_mes
        figure_id,
        parentID_value
      );

      notification.open({
        message: "Thêm bình luận thành công!!",
        duration: 1,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      notification.error({
        message: "Lỗi khi thêm bình luận! Hãy thử lại",
      });
      console.error("Lỗi thêm bình luận:", error);
    }
  };

  return (
    <div style={{ marginTop: "8px" }}>
      <Form form={form} name="comment" onFinish={onFinish}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Tên hiển thị"
            name="name_com"
            style={{ flex: "1", margin: " 10px" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Hãy nhập email!" }]}
            style={{ flex: "1", margin: " 10px" }}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label="Bình luận"
          name="comment_mes"
          rules={[{ required: true, message: "Hãy nhập bình luận!" }]}
          style={{ margin: " 10px" }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={comment_mes}
            onBlur={(event, editor) => {
              const data = editor.getData();
              setComment_mes(data);
              form.setFieldsValue({ "comment_mes": data }); // Cập nhật giá trị của trường `comment_mes` trong Form
            }}
          />
        </Form.Item>
        <Form.Item>
          <button
            className="btn-add-form__admin"
            type="primary"
            htmltype="submit"
            style={{ margin: " 10px" }}
          >
            Thêm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentFigure;