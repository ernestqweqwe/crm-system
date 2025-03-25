import { Link, useParams } from 'react-router'
import { usersApi } from 'src/store/services/usersService.ts'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import './UserPage.scss'
import { useForm } from 'antd/es/form/Form'

export const UserPage = () => {
    const { id } = useParams<string>()

    const { data } = usersApi.useGetUserQuery(id ?? '')
    const [updateUser] = usersApi.useUpdateUserMutation()

    const [form] = useForm()
    const [isEdit, setEdit] = useState<boolean>(false)

    const onSave = () => {
        const values = form.getFieldsValue()
        setEdit((prev) => !prev)
        updateUser({ ...values, id })
    }

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
                </div>
            )}
        </>
    )
}

// Todo добавить поиск
//Todo использовать уже созданный api для запросов юзер даты чтобы норм рефрешил токен
//Todo
//Todo
//Todo
