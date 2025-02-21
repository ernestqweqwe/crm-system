import { FC, memo } from 'react'
import './TaskForm.scss'
import { Button, Form, Input } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { useTodos } from '../../hooks/useTodos'

const TaskForm: FC = memo(() => {
    const { handleCreate } = useTodos()

    const handleSubmit = async (values: { task: string }) => {
        await handleCreate(values.task)
        form.resetFields()
    }

    const [form] = Form.useForm()

    return (
        <Form
            form={form}
            className="form"
            labelCol={{ span: 4 }}
            style={{ width: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={(values) => handleSubmit(values)}
        >
            <Form.Item
                rules={[{ min: 2 }, { max: 64 }, { required: true }]}
                label="Task"
                name="task"
            >
                <Input autoFocus />
            </Form.Item>
            <Form.Item name="creator" label="Creator">
                <Input />
            </Form.Item>
            <Form.Item name={'descritption'} label="Description    ">
                <Input />
            </Form.Item>

            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                    ADD TASK
                </Button>
            </Form.Item>
        </Form>
    )
})

export default TaskForm
