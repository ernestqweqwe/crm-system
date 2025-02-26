import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { createTask } from '../../api/todoService.ts'
import './TaskForm.scss'

interface TaskFormProps {
    updateData: () => void
}

const TaskForm: FC<TaskFormProps> = ({ updateData }) => {
    const handleSubmit = async (task: string) => {
        await createTask(task).then(() => {
            updateData()
            form.resetFields()
        })
    }

    const [form] = Form.useForm()

    return (
        <Form
            form={form}
            className="form"
            labelCol={{ span: 4 }}
            style={{ width: 600 }}
            initialValues={{ remember: true }}
            onFinish={(values) => handleSubmit(values.task)}
            validateMessages={{
                required: 'Task field is required',
                string: {
                    min: 'The field must contain at least 2 characters',
                    max: 'Maximum length 64 characters',
                },
            }}
        >
            <Form.Item
                rules={[{ min: 2 }, { max: 64 }, { required: true }]}
                label="Task"
                name="task"
            >
                <Input autoFocus />
            </Form.Item>
            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                    ADD TASK
                </Button>
            </Form.Item>
        </Form>
    )
}

export default TaskForm
