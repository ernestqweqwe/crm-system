import { Button, Form, Input, Layout, message, Row, Space } from 'antd'
import './RegistrationPage.scss'
import authService from 'api/services/AuthService'
import { AxiosError } from 'axios'
import { NoticeType } from 'antd/es/message/interface'
import { Link as RouterLink } from 'react-router'

export const RegistrationPage = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const { Item } = Form

    // TODO разобраться с валидацией номера телефона
    // TODO Когда использовать try catch а когда than
    // TODO Когда указывать content type

    const notification = (type: NoticeType, content: string) => {
        messageApi.open({
            content,
            type,
        })
    }
    const handleSubmit = async () => {
        try {
            notification('loading', 'Loading')
            const values = form.getFieldsValue()
            await authService.registration(values)
            messageApi.destroy()
            notification('success', 'Registration successful')
        } catch (err) {
            if (err instanceof AxiosError && err) {
                messageApi.destroy()
                if (err.status === 409) notification('error', 'User already exists')
                if (err.status === 400) notification('error', 'Invalid input.')
                if (err.status === 500) notification('error', 'Server error.')
            }
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Row style={{ height: '100vh', flexWrap: 'nowrap', padding: 10, overflow: 'hidden' }}>
                <div className="img-container">
                    <img src="/assets/login_page_img.png" alt="skeleton" />
                </div>
                <div className="form-container__registration">
                    <div className="form-content">
                        <div className="description">
                            <h1>Кegister a new account</h1>
                            <p>See what is going on with your business</p>
                        </div>

                        <img src="/assets/login_page_icon.png" alt="icon" />
                        <Form layout={'vertical'} form={form} onFinish={() => handleSubmit()}>
                            <Item
                                name={'username'}
                                label={'User name'}
                                rules={[
                                    { required: true, message: 'User name field is required' },
                                    { min: 1, message: 'Min 2 symbols' },
                                    { max: 64, message: 'Max 64 symbols' },
                                    {
                                        pattern: /[а-яА-Яa-zA-Z]/,
                                        message: 'Symbols must be of the russian or latin alphabet',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input size="large" placeholder="User name"></Input>
                            </Item>
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
                                <Input size="large" placeholder="Login"></Input>
                            </Item>
                            <Item
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
                                <Input.Password
                                    size="large"
                                    placeholder="Password"
                                ></Input.Password>
                            </Item>
                            <Item
                                dependencies={['password']}
                                hasFeedback
                                name={confirm}
                                label="Confirm Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'The new password that you entered do not match!'
                                                )
                                            )
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    placeholder="Repeat password"
                                ></Input.Password>
                            </Item>
                            <Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Email is required field' },
                                    {
                                        type: 'email',
                                        message: 'Incorrect email',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input size="large" placeholder="Email"></Input>
                            </Item>
                            <Item
                                name="phoneNumber"
                                label="Phone"
                                required={false}
                                rules={[
                                    {
                                        whitespace: true,
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!/^\+[1-9]/.test(value)) {
                                                return Promise.reject(
                                                    'Incorrect phone format, must be +123123123'
                                                )
                                            }
                                            if (value.length < 8) {
                                                return Promise.reject('Min 8 symbols')
                                            }
                                            if (value.length > 15) {
                                                return Promise.reject('Max 15 symbols')
                                            }
                                            return Promise.resolve()
                                        },
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input size="large" placeholder="Telephone number"></Input>
                            </Item>
                            <Button className="registration-btn" htmlType="submit">
                                Registration
                            </Button>
                            {contextHolder}
                        </Form>
                    </div>
                    <Space className="register">
                        <span>Have account?</span>
                        <RouterLink to="/login" className="link">
                            Login
                        </RouterLink>
                    </Space>
                </div>
            </Row>
            {contextHolder}
        </Layout>
    )
}
//Todo submit активен только когда все поля заполнены

// todo общие стили для формы регистрации и авторизации через роутер

// TODO поля ввода телефона должны быть не обязательным
