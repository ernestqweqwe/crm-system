import { Link, useParams } from 'react-router-dom'
import { usersApi } from 'src/store/services/usersService.ts'
import { Button, Form, Input, message, Space } from 'antd'
import { useEffect, useState } from 'react'
import './UserPage.scss'
import { useForm } from 'antd/es/form/Form'
import { NoticeType } from 'antd/es/message/interface'
import {
    MAX_PHONE_NUMBER_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_PHONE_NUMBER_LENGTH,
    MIN_USERNAME_LENGTH,
} from 'src/helpers/constants.ts'
import { Roles, User } from 'src/types/usersTypes.ts'
import { objectDiff } from 'src/helpers/utils.ts'
import { useAppSelector } from 'src/store/hooks/redux.ts'

type UserProfileFields = Pick<User, 'username' | 'email' | 'phoneNumber'>

export const UserPage = () => {
    const { id } = useParams<string>()

    const [updateUser, { error, isSuccess }] = usersApi.useUpdateUserMutation()
    const isAdmin = useAppSelector((state) =>
        state.user.profile?.roles.includes(Roles.ADMIN)
    )
    const [form] = useForm()
    const [isEdit, setEdit] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (error)
            notificationMessage('error', error.message ?? 'Unknown error')
        if (isSuccess) notificationMessage('success', 'User updated')
    }, [error, isSuccess])

    if (!id) return <div>User Not Found</div>

    const { data } = usersApi.useGetUserQuery(id, {
        selectFromResult: ({ data }: { data?: UserProfileFields }) => ({
            data: data
                ? {
                      username: data.username,
                      email: data.email,
                      phoneNumber: data.phoneNumber,
                  }
                : undefined,
        }),
    })

    const onFinish = () => {
        const currentValues = form.getFieldsValue()
        if (!data) return
        const userChangedFields = objectDiff(data, currentValues)

        if (Object.keys(userChangedFields).length > 0) {
            updateUser({
                id: id,
                values: userChangedFields,
            })
        } else {
            notificationMessage('info', 'Нет изменений для сохранения')
        }

        setEdit(false)
    }

    const onCancel = () => {
        setEdit(false)
        form.resetFields()
    }

    const onEdit = () => {
        setEdit(true)
    }

    const notificationMessage = (type: NoticeType, message: string) => {
        messageApi.open({
            type,
            content: message,
        })
    }

    return (
        <>
            {data && (
                <div className="user-page">
                    <Form
                        className="userPage-form"
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            username: data?.username,
                            email: data?.email,
                            phoneNumber: data?.phoneNumber,
                        }}
                    >
                        <Form.Item
                            name="username"
                            label="User name"
                            rules={[
                                {
                                    required: true,
                                    message: 'User name field is required',
                                },
                                {
                                    min: MIN_USERNAME_LENGTH,
                                    message: `Min ${MIN_USERNAME_LENGTH} symbols`,
                                },
                                {
                                    max: MAX_USERNAME_LENGTH,
                                    message: `Max ${MAX_USERNAME_LENGTH} symbols`,
                                },
                                {
                                    pattern: /[а-яА-Яa-zA-Z]/,
                                    message:
                                        'Symbols must be of the russian or latin alphabet',
                                },
                            ]}
                        >
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required field',
                                },
                                {
                                    type: 'email',
                                    message: 'Incorrect email',
                                },
                            ]}
                        >
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone number"
                            rules={[
                                {
                                    whitespace: true,
                                },
                                {
                                    validator: (_, value) => {
                                        if (
                                            !/^\+[1-9]/.test(value) &&
                                            value.length >= 1
                                        ) {
                                            return Promise.reject(
                                                'Incorrect phone format, must be +123123123'
                                            )
                                        }
                                        if (
                                            value.length <
                                                MIN_PHONE_NUMBER_LENGTH &&
                                            value.length >= 1
                                        ) {
                                            return Promise.reject(
                                                `Min ${MIN_PHONE_NUMBER_LENGTH} symbols`
                                            )
                                        }
                                        if (value.length > 15) {
                                            return Promise.reject(
                                                `Max ${MAX_PHONE_NUMBER_LENGTH} symbols`
                                            )
                                        }
                                        return Promise.resolve()
                                    },
                                },
                            ]}
                        >
                            <Input disabled={!isEdit} />
                        </Form.Item>
                        {isAdmin && (
                            <Form.Item>
                                {!isEdit ? (
                                    <Button type="primary" onClick={onEdit}>
                                        Edit
                                    </Button>
                                ) : (
                                    <Space>
                                        <Button htmlType="submit">Save</Button>
                                        <Button danger onClick={onCancel}>
                                            Cancel
                                        </Button>
                                    </Space>
                                )}
                            </Form.Item>
                        )}
                    </Form>
                    <Link to="/users">Back</Link>
                    {contextHolder}
                </div>
            )}
        </>
    )
}
