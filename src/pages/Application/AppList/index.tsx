import { deleteApp, listApps } from "@/services/application/app/api";
import { AndroidFilled, AndroidOutlined, AppleFilled, CodeFilled, Html5Filled } from "@ant-design/icons";
import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";
import { render } from "@testing-library/react";
import { Button, Space, Tag, message } from "antd";
import { set } from "lodash";
import React from "react";


export type ApplicationListProps = {

}

const ApplicationList: React.FC<ApplicationListProps> = (props) => {
    const [loading, setLoading] = React.useState<boolean>(false)

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
        },
        {
            title: 'Create Time',
            dataIndex: 'gmtCreate',
            key: 'gmtCreate',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'description',
        },
        {
            title: 'Operation',
            render: (_, record) => {
                return (
                    <Space>
                        <a onClick={()=>{
                            message.error('Not implemented yet!')
                        }}>DETAIL</a>
                        <a onClick={()=>{
                            message.error('Not implemented yet!')
                        }}>EDIT</a>
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
            <PageContainer 
                title={false}
            >
                <ProTable
                    loading={loading}
                    columns={columns}
                    request={listApps}
                />
            </PageContainer>
        </>
    )
}

export default ApplicationList;