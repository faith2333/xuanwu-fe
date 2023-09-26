import { ORG } from "@/services/organization/typing";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useState } from "react";
import OrganizationForm from "./components/organization_form";
import { Button, Space, Tag, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { listORGsAndFormatResponse, updateORG, deleteORG } from "@/services/organization/api";

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
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status === 'enable') {
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
                        {record.status === 'enable' ? <Button danger type='primary' onClick={()=>{
                            onDisable(record.code)
                        }}>DISABLE</Button> : <Button type='primary' onClick={()=>{
                            onEnable(record.code)
                        }}>ENABLE</Button>}
                        <Button danger type='primary' onClick={()=>{
                            onDeleteORG(record.id)
                        }}>DELETE</Button>
                    </Space>
                )
            }
        }
    ]

    const onEnable = (code: string) => {
        setLoading(true)
        updateORG({code: code, status: "enable"}).then((res)=>{
            if (res.success) {
                window.location.reload()
            } else {
                message.error(res.message)
            }
            setLoading(false)
        })
    }

    const onDisable = (code: string) => {
        setLoading(true)
        updateORG({code: code, status: "disable"}).then((res)=>{
            if (res.success) {
                message.info("disable success!")
                window.location.reload()
            } else {
                message.error(res.message)
            }
            setLoading(false)
        })
    }

    const onDeleteORG = (id: number) => {
        setLoading(true)
        deleteORG({id: id}).then((res)=>{
            if (res.success) {
                message.info("delete organization success")
                window.location.reload()
            } else {
                message.error("delete failed: ",res.message)
            }
            setLoading(false)
        })
    }

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
            <ProTable
                    loading={loading}
                    columns={columns}
                    request={listORGsAndFormatResponse}
                    toolBarRender={() => [
                        <Button onClick={() => {
                            setAddORG(true)
                            setEdit(false)
                            setCuroRG({} as ORG.OrganizationItem)
                        }} type="primary"><PlusOutlined/>Add</Button>,
                    ]}
               />
        </div>
    )
}

export default Organization;