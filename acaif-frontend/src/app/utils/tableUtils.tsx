import { useState } from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export const DeletePopper: React.FC<{
  action: (key: React.Key | null | undefined) => Promise<string>;
  id: React.Key | null | undefined;
}> = ({ action, id }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  return (
    <Popconfirm
      title="Sure to delete?"
      open={open}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={() => {
        setConfirmLoading(false)
        setOpen(false)
      }}
      onConfirm={() => {
        setConfirmLoading(true);
        action(id).then(
          () => {
            setConfirmLoading(false);
            setOpen(false);
          },
          () => {
            setConfirmLoading(false);
            setOpen(false);
          },
        );
      }}
    >
      <DeleteOutlined onClick={() => setOpen(true)} />
    </Popconfirm>
  );
};