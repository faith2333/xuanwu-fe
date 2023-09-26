import { deleteApp, listAppsAndFormatResponse } from "@/services/application/app/api";
import { AndroidOutlined, AppleFilled, CodeFilled, Html5Filled, PlusOutlined } from "@ant-design/icons";
import {  ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Space, Tag, message } from "antd";
import React from "react";
import AddAppForm from "./components/add_application_form";


export type ApplicationListProps = {

}

const ApplicationList: React.FC<ApplicationListProps> = (props) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [addVisiable, setAddVisiable] = React.useState<boolean>(false)

    const columns : ProColumns<APP.AppItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            render: (_, record) => {
                return (
                    <a onClick={()=>{
                        message.error('Not implemented yet!')
                    }}>{record.name}</a>
                )
            }
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            copyable: true,
        },
        {
            title: 'Type',
            dataIndex: 'appType',
            key: 'appType',
            render: (_, record) => {
                if (record.appType.toUpperCase() === 'ANDROID') {
                    return <Tag icon={<AndroidOutlined/>} color="green">Android</Tag>
                } else if (record.appType.toUpperCase() === 'WEB') {
                    return <Tag icon={<Html5Filled />} color='cyan'>Web</Tag>
                } else if (record.appType.toUpperCase() === 'IOS') {
                    return <Tag icon={<AppleFilled />} color='geekblue'>IOS</Tag>
                } else {
                    return <Tag icon={<CodeFilled />} >Backend</Tag>
                }
            }
        },
        {
            title: 'Category',
            render: (_, record) => {
                return (
                    <Tag color='blue'>{record.category}</Tag>
                )
            }
        },
        {
            title: 'Labels',
            dataIndex: 'labels',
            key: 'labels',
            render: (_, record) => {
                return record.labels?.map((label, index) => {
                    return <Tag color='purple'>{label}</Tag>
                })
            }
        },
        {
            title: 'Create User',
            dataIndex: 'createUser',
            key: 'createUser',
            search: false,
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
            key: 'description',
            search: false,
        },
        {
            title: 'Operation',
            render: (_, record) => {
                return (
                    <Space>
                        <a onClick={()=>{
                            message.error('Not implemented yet!')
                        }}>DETAIL</a>
                        <a style={{color: 'red'}} onClick={()=>{
                            onDeleteApp(record.code)
                        }}>DELETE</a>
                    </Space>                        
                )
            }
        }
    ]

    const onDeleteApp = (code: string) => {
        setLoading(true)
        deleteApp({code: code}).then(() => {
            window.location.reload()
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <AddAppForm
                visible={addVisiable}
                setVisible={setAddVisiable}
            />
            <ProTable
                loading={loading}
                columns={columns}
                request={listAppsAndFormatResponse}
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={()=>{
                        setAddVisiable(true)
                    }}>
                        <PlusOutlined/>ADD
                    </Button>,
                ]}
            />
        </>
    )
}

export default ApplicationList;