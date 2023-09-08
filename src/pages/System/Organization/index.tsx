import { ORG } from "@/services/organization/typing";
import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import { useState } from "react";
import OrganizationForm from "./components/organization_form";
import { Button, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { listORGs } from "@/services/organization/api";

export type OrganizationProps = {}

const Organization: React.FC<OrganizationProps> = (props) => {
    const [loading,setLoading] = useState<boolean>(false)
    const [addORG,setAddORG] = useState<boolean>(false)
    const [curORG, setCuroRG] = useState<ORG.OrganizationItem>({} as ORG.OrganizationItem)
    const [edit, setEdit] = useState<boolean>(false)

    const columns : ProColumns<ORG.OrganizationItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            search: false,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            copyable: true,
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            render: (_, record) => {
                if (record.enabled) {
                    return (
                        <Tag color="green">Enabled</Tag>
                    )
                } else {
                    return (
                        <Tag color="red">Disabled</Tag>
                    )
                }
            }
        },
        {
            title: 'Create User',
            dataIndex: 'createUser',
            key: 'createUser',
        },
        {
            title: 'Create Time',
            dataIndex: 'gmtCreate',
            key: 'gmtCreate',
            search: false,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            search: false,
        },
        {
            title: 'Operation',
            valueType: 'option',
            render: (_, record) => {
                return (
                    <Space>
                        <Button type="primary" onClick={()=>{
                            onEdit(record)
                        }}>EDIT</Button>
                        {record.enabled ? <Button danger type='primary'>DISABLE</Button> : <Button type='primary'>ENABLE</Button>}
                        <Button danger type='primary'>DELETE</Button>
                    </Space>
                )
            }
        }
    ]

    const onEdit = (item: ORG.OrganizationItem) => {
        setEdit(true)
        setCuroRG(item)
        setAddORG(true)
    }

    return (
        <div>
            <OrganizationForm
                visible={addORG}
                setVisible={setAddORG}
                item={curORG}
                edit={edit}
            />
            <PageContainer
                title={false}
            >
               <ProTable
                    loading={loading}
                    columns={columns}
                    request={listORGs}
                    toolBarRender={() => [
                        <Button onClick={() => {
                            setAddORG(true)
                            setEdit(false)
                            setCuroRG({} as ORG.OrganizationItem)
                        }} type="primary"><PlusOutlined/>Add</Button>,
                    ]}
               >

               </ProTable>
            </PageContainer>
        </div>
    )
}

export default Organization;