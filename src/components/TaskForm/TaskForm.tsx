import { createTask } from 'api/taskService'
import * as React from 'react'
import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from 'src/constants'
import { FC } from 'react'
import { Button, Form, Input } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import './TaskForm.scss'

interface TaskFormProps {
    updateData: () => void
}

const TaskForm: FC<TaskFormProps> = React.memo(({ updateData }) => {
    const handleSubmit = async (task: string) => {
        await createTask(task)
        updateData()
        form.resetFields()
    }

    const [form] = Form.useForm()
    const { Item } = Form

    return (
        <Form
            form={form}
            className="task-form"
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
            <Item
                rules={[{ min: MIN_TASK_LENGTH }, { max: MAX_TASK_LENGTH }, { required: true }]}
                label="Task"
                name="task"
                style={{ flexGrow: 1 }}
            >
                <Input autoFocus />
            </Item>
            <Item>
                <Button size="middle                " type="primary" htmlType="submit">
                    ADD TASK
                </Button>
            </Item>
        </Form>
    )
})
export default TaskForm
