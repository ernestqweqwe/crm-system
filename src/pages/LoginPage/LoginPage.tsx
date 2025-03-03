import { Button, Checkbox, Form, Input, Layout, message, Row, Space, Typography } from 'antd'
import './LoginPage.scss'
import { useForm } from 'antd/es/form/Form'
import { NoticeType } from 'antd/es/message/interface'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'store/hooks/redux'
import { fetchLogin } from 'store/reducers/slices/authSlice/asyncThunks'
import { Link as RouterLink } from 'react-router'

export const LoginPage = () => {
    const [form] = useForm()
    const { Item } = Form
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()

    const { Link } = Typography

    const dispatch = useAppDispatch()

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
            await dispatch(fetchLogin(value)).unwrap()
            navigate('/')
        } catch (err) {
            messageApi.destroy()
            if (err === 400) notification('error', 'Invalid input')
            if (err === 401) notification('error', 'Invalid login or password')
            if (err === 500) notification('error', 'Server error')
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Row style={{ height: '100vh', flexWrap: 'nowrap', padding: 10, overflow: 'hidden' }}>
                <div className="img-container">
                    <img src="/assets/login_page_img.png" alt="skeleton" />
                </div>
                <div className="form-container">
                    <div className="form-content">
                        <div className="description">
                            <h1>Login to your Account</h1>
                            <p>See what is going on with your business</p>
                        </div>

                        <img src="/assets/login_page_icon.png" alt="icon" />
                        <Form layout={'vertical'} form={form} onFinish={handleSubmit}>
                            <Item
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
                            </Item>
                            <Item
                                name="password"
                                label="Password"
                                style={{ marginBottom: 8 }}
                                rules={[
                                    { required: true, message: 'Password field is required' },
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
                                <Input type="password" />
                            </Item>

                            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Checkbox className="remember-btn">Remember me</Checkbox>
                                <Link className="link">Forgot Password?</Link>
                            </Space>
                            <Button className="login-btn" htmlType="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                    <Space className="register">
                        <span>Not Registered Yet?</span>
                        <RouterLink to="/registration" className="link">
                            Create an account
                        </RouterLink>
                    </Space>
                </div>
            </Row>
            {contextHolder}
        </Layout>
    )
}
