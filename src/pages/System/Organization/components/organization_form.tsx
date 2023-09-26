import { createORG, updateORG } from "@/services/organization/api"
import { ORG } from "@/services/organization/typing"
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from "antd"
import { Item } from "rc-menu"
import React, { useEffect } from "react"

export type OrganizationFormProps = {
    visible: boolean
    setVisible: (visible: boolean) => void
    edit?: boolean
    item?: ORG.OrganizationItem
}

const OrganizationForm: React.FC<OrganizationFormProps> = (props) => {
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const [form] = Form.useForm()

    useEffect(() => {
        if (props.edit && props.item) {
            form.setFieldsValue({
                name: props.item.name,
                code: props.item.code,
                desc: props.item.desc,
                status: props.item.status,
            })
        } else {
            form.resetFields()
        }
    }, [props.edit, props.item])

    const onCancel = () => {
        props.setVisible(false)
        if (!props.edit) {
            form.resetFields()
        }
    }

    const onSave = () => {
        setButtonLoading(true)
        form.validateFields()
            .then(values => {
                if (props.edit) {
                    updateORG({
                        name: values.name,
                        code: values.code,
                        desc: values.desc,
                        status: values.status,
                    }).then((res)=>{
                        if (res.success) {
                            message.success('Organization Update successfully')
                            window.location.reload()
                        } else {
                            message.error("Update failed: ",res.message)
                        }
                    })
                } else {
                    createORG({
                        name: values.name,
                        code: values.code,
                        desc: values.desc,
                        enabled: values.enabled,
                   }).then((res) => {
                        if (res.success) {
                            message.success('Organization created successfully')
                            window.location.reload()
                        } else {
                            message.error("Creae failed: ",res.message)
                        }
                        
                   })
                }
            })
            .catch(errorInfo => {
                message.error('Please enter required fields: ', errorInfo.errorFields)
               
            }).finally(() => {
                setButtonLoading(false)
            })
    }

    return (
        <div>
            <Drawer
                open={props.visible}
                title={props.edit ? 'Edit Organization' : 'Add Organization'}
                size="large"
                bodyStyle={{ paddingBottom: 80 }}
                onClose={onCancel}
                extra={
                    <Space>
                        <Button danger onClick={onCancel} loading={buttonLoading}>Cancel</Button>
                        <Button type="primary" onClick={onSave} loading={buttonLoading}>Save</Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={10}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter organization name' }]}
                            >
                                <Input disabled={props.edit} placeholder= "Please enter organization name"/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name="code"
                                label="Code"
                                rules={[{ required: true, message: 'Please enter organization code' }]}
                            >
                                <Input disabled={props.edit} placeholder= "Please enter organization code"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please enabled or disabled organization' }]}
                            >
                                <Select
                                    onChange={(value) => {
                                        form.setFieldsValue({
                                            status: value
                                        })
                                    }}
                                >
                                    <Select.Option value='enable'>Enabled</Select.Option>
                                    <Select.Option value='disable'>Disabled</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="desc"
                                label="Description"
                            >
                                <Input placeholder= "Please enter organization description"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}

export default OrganizationForm;