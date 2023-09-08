import { createORG } from "@/services/organization/api"
import { ORG } from "@/services/organization/typing"
import { Button, Col, Drawer, Form, Input, Row, Select, Space, message } from "antd"
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
                enabled: props.item.enabled,
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

                } else {
                    createORG({
                        name: values.name,
                        code: values.code,
                        desc: values.desc,
                        enabled: values.enabled,
                   }).then(res => {
                        message.success('Organization created successfully')
                        window.location.reload()
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
                                name="enabled"
                                label="enabled"
                                rules={[{ required: true, message: 'Please enabled or disabled organization' }]}
                            >
                                <Select
                                    onChange={(value) => {
                                        form.setFieldsValue({
                                            enabled: value
                                        })
                                    }}
                                >
                                    <Select.Option value={true}>Enabled</Select.Option>
                                    <Select.Option value={false}>Disabled</Select.Option>
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