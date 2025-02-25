import { Button, Form, Input, message } from 'antd'
import './LoginPage.scss'
import { useForm } from 'antd/es/form/Form'
import { userLogin } from '../../api/AuthService.ts'
import { AxiosError } from 'axios'
import { NoticeType } from 'antd/es/message/interface'
import { useNavigate } from 'react-router'

export const LoginPage = () => {
    const [form] = useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()

    const notification = (type: NoticeType, content: string) => {
        messageApi.open({
            content,
            type,
        })
    }

    const handleSubmit = async () => {
        try {
            notification('loading', 'Loading')
            const value = form.getFieldsValue()
            await userLogin(value)
                .then((res) => {
                    localStorage.setItem('token', JSON.stringify(res))
                    navigate('/')
                })
                .finally(() => messageApi.destroy())
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError && err) {
                if (err.status === 400) notification('error', 'Invalid input')
                if (err.status === 401) notification('error', 'Invalid login or password')
                if (err.status === 500) notification('error', 'Server error')
            }
        }
    }

    return (
        <div className="login-page">
            <h1 className="login">Login</h1>
            <Form layout={'vertical'} form={form} style={{ width: 600 }} onFinish={handleSubmit}>
                <Form.Item
                    name="login"
                    label="Login"
                    rules={[
                        { required: true, message: 'Login field is required' },
                        { min: 2, message: 'Min 2 symbols' },
                        { max: 64, message: 'Max 64 symbols' },

                        {
                            pattern: /[a-zA-Z]+$/,
                            message: 'Symbols must be of the latin alphabet',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Input field is required' },
                        {
                            min: 6,
                            message: 'Min 6 symbols',
                        },
                        {
                            max: 60,
                            message: 'Max 60 symbols',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {contextHolder}
        </div>
    )
}
