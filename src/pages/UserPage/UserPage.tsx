import { Link, useParams } from 'react-router-dom'
import { usersApi } from 'src/store/services/usersService.ts'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import './UserPage.scss'
import { useForm } from 'antd/es/form/Form'
import { NoticeType } from 'antd/es/message/interface'

export const UserPage = () => {
    const { id } = useParams<string>()
    const { data } = usersApi.useGetUserQuery(id ?? '')
    const [updateUser, { error, isSuccess }] = usersApi.useUpdateUserMutation()

    const [form] = useForm()
    const [isEdit, setEdit] = useState<boolean>(false)

    const [messageApi, contextHolder] = message.useMessage()

    const onSave = () => {
        const values = form.getFieldsValue()
        updateUser({ ...values, id })
        setEdit((prev) => !prev)
    }

    const notificationMessage = (type: NoticeType, message: string) => {
        messageApi.open({
            type,
            content: message,
        })
    }

    useEffect(() => {
        if (error)
            notificationMessage('error', error.message ?? 'Unknown error')
        if (isSuccess) notificationMessage('success', 'User updated')
    }, [error, isSuccess])

    return (
        <>
            {data && (
                <div className="user-page">
                    <Form
                        className="userPage-form"
                        form={form}
                        style={{ maxWidth: 600 }}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            username: data?.username,
                            email: data?.email,
                            phoneNumber: data?.phoneNumber,
                        }}
                    >
                        <Form.Item name="username" label="User name">
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        <Form.Item name="email" label="Email">
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Phone number">
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        <Form.Item>
                            {!isEdit ? (
                                <Button
                                    onClick={() => setEdit((prev) => !prev)}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <Button onClick={onSave}>Save</Button>
                            )}
                        </Form.Item>
                    </Form>
                    <Link to="/users">Back</Link>
                    {contextHolder}
                </div>
            )}
        </>
    )
}
