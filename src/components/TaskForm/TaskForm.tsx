import { NoticeType } from 'antd/es/message/interface'
import { createTask } from 'api/taskService'
import * as React from 'react'
import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from 'src/constants'
import { FC } from 'react'
import { Button, Form, Input, message as AntMessage } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import './TaskForm.scss'

interface TaskFormProps {
    updateData: () => void
}

const TaskForm: FC<TaskFormProps> = React.memo(({ updateData }) => {
    const [form] = Form.useForm()
    const { Item } = Form
    const [messageApi, contextHolder] = AntMessage.useMessage()

    const message = (type: NoticeType, content: React.ReactNode) => {
        messageApi.open({
            type,
            content,
        })
    }

    const handleSubmit = async (task: string) => {
        try {
            message('loading', 'Loading')
            await createTask(task)
            updateData()
            form.resetFields()
            messageApi.destroy()
            message('success', 'task successfully created ')
        } catch {
            messageApi.destroy()
            message('error', 'task create error')
        }
    }

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
                <Button size="middle" type="primary" htmlType="submit">
                    ADD TASK
                </Button>
            </Item>
            {contextHolder}
        </Form>
    )
})
export default TaskForm
