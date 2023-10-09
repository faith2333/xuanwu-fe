import { listORGs, listORGsAndFormatResponse } from "@/services/organization/api";
import { ORG } from "@/services/organization/typing";
import { AndroidFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Space, message } from "antd";
import { values } from "lodash";
import React, { useEffect, useState } from "react";

export type AddAppFormProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const AddAppForm: React.FC<AddAppFormProps> = (props) => {
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [labels, setLabels] = useState<string[]>([])
    const [categoryOptions, setCategoryOptions] = useState<ORG.OrganizationItem[]>([])

    const [form] = Form.useForm();

    const onCancel = () => {
        props.setVisible(false)
        form.resetFields()
    }

    const onSubmit = () => {
        setButtonLoading(true)
        setTimeout(() => {
            setButtonLoading(false)
            props.setVisible(false)
        }, 1000)
    }

    const { Option } = Select;

    useEffect(()=>{
        listORGs({current:0,pageSize:20}).then((res)=> {
            if (res.success) {
                setCategoryOptions(res.data.data)
            } else {
                message.error("get application category failed: ",res.message)
            }
        })
    },[])


    return (
        <div>
            <Drawer
                open={props.visible}
                title='Add Application'
                size="large"
                bodyStyle={{ paddingBottom: 80 }}
                onClose={onCancel}
                extra={
                <Space>
                        <Button danger onClick={onCancel} loading={buttonLoading}>Cancel</Button>
                        <Button type="primary" onClick={onSubmit} loading={buttonLoading}>Save</Button>
                </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter application name' }]}
                            >
                                <Input placeholder= "Please enter application name"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="code"
                                label="Code"
                                tooltip='Global unique code for application'
                                rules={[{ required: true, message: 'Please enter application code' }]}
                            >
                                <Input placeholder="Please enter application code" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name='type'
                                label="Type"
                                rules={[{ required: true, message: 'Please select application type' }]}
                            >
                                <Select
                                    onChange={(value) => {
                                        form.setFieldValue('type', value)
                                    }}
                                >
                                    <Option value="ANDROID">Android</Option>
                                    <Option value="IOS">IOS</Option>
                                    <Option value="WEB">Web</Option>
                                    <Option value="BACKEND">Backend</Option>
                                    <Option value='LLM'>LLM</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name='category'
                                label="Category"
                                rules={[{ required: true, message: 'Please select application category' }]}
                            >
                                <Select
                                    onChange={(value) => {
                                        form.setFieldValue('category', value)
                                    }}
                                    options={categoryOptions.map((item)=>({label: item.name, value: item.code}))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='labels'
                                label="Labels"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Select labels"
                                    onChange={(value) => {
                                      form.setFieldValue('labels',value)
                                    }}
                                >
                                    {labels.map((label) => (
                                    <Select.Option key={label} value={label}>
                                        {label}
                                    </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}

export default AddAppForm