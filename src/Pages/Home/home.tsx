import { Button, Table, Dropdown, Form, Input } from "antd";
import { useGetContract } from "./service/query/useGetContracts";
import { useToggle } from "../../hooks/useToggle";
import { AddUserModal } from "../../components/modal/modal";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useSearch } from "./service/query/useSearch";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";
import { usePagination } from "./service/query/usePagination";

interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, record: any) => React.ReactNode;
}

interface ContractType {
  id: number;
  attachment: {
    origName: string;
  };
  title: string;
}

const Home = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: paginationData } = usePagination({ page, size: pageSize });
  const { data } = useGetContract();
  const [isModalOpen, toggleModal] = useToggle();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: searchData } = useSearch({
    page,
    size: pageSize,
    search: debouncedSearch,
  });

  const dataSource = (searchData || paginationData || data)?.data.contracts.map(
    (item: ContractType, index: number) => ({
      key: index + 1,
      id: item.id,
      nomi: item.attachment ? item.attachment.origName : "No Attachment",
      name: item.title,
    })
  );

  const columns: ColumnType[] = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nomi",
      dataIndex: "nomi",
      key: "nomi",
    },
    {
      title: "Kurs",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "change",
      key: "change",
      render: (_) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Tahrirlash",
                icon: <EditOutlined />,
              },
            ],
          }}
        >
          <Button
            style={{ border: "2px solid #D9D9D9" }}
            icon={<MoreOutlined />}
          />
        </Dropdown>
      ),
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div style={{ padding: "24px" }} className="table-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form>
          <Form.Item>
            <Input
              style={{ width: "100%" }}
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={toggleModal}>
          Create
        </Button>
      </div>
      <AddUserModal visible={isModalOpen} onClose={toggleModal} />
      <div style={{ marginTop: "20px" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: (searchData || paginationData || data)?.data.total,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};
export default Home;
