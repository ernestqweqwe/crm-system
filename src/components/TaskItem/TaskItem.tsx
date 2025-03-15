import { DeleteOutlined, EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons'
import { NoticeType } from 'antd/es/message/interface'
import { deleteTask, updateTask } from 'api/taskService'
import * as React from 'react'
import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from 'src/constants'
import { useState } from 'react'
import { Button, Checkbox, Form, Input, message as AntMessage, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './TaskItem.scss'
import { Todo } from 'types/Itodo'

interface ITaskItemProps {
    taskObject: Todo
    updateData: () => void
}

interface values {
    title: string
    isDone: boolean
}

const TaskItem = ({ taskObject, updateData }: ITaskItemProps) => {
    const { isDone, title, id } = taskObject
    const [isEdit, setIsEdit] = useState(false)
    const [checkBoxPressed, setCheckboxPressed] = useState(isDone)
    const [form] = useForm()
    const [messageApi, contextHolder] = AntMessage.useMessage()

    const message = (type: NoticeType, content: React.ReactNode) => {
        messageApi.open({
            type,
            content,
        })
    }

    const onToggle = async () => {
        try {
            setCheckboxPressed(!checkBoxPressed)
            await updateTask(id, title, !checkBoxPressed)
            updateData()
        } catch {
            message('error', 'error on checkbox')
        }
    }

    const onSubmit = async () => {
        try {
            message('loading', 'Loading')
            setIsEdit(false)
            const values: values = form.getFieldsValue()
            if (values.title !== title) {
                await updateTask(id, values.title, checkBoxPressed)
                updateData()
            }
            messageApi.destroy()
            message('success', 'task successfully saved ')
        } catch {
            messageApi.destroy()
            message('error', 'task save error')
        }
    }

    const onCancel = () => {
        setIsEdit(false)
        form.resetFields(['title'])
    }

    const onDelete = async (taskId: number) => {
        try {
            message('loading', 'Loading')
            await deleteTask(taskId)
            updateData()
            messageApi.destroy()
            message('success', 'task successfully deleted ')
        } catch {
            messageApi.destroy()
            message('error', 'task delete error')
        }
    }

    const onChange = () => {
        setIsEdit(true)
    }

    return (
        <Form layout="inline" className="task-item" form={form} initialValues={{ title, isDone }}>
            <Form.Item name="isDone" valuePropName="checked">
                <Checkbox onClick={onToggle} />
            </Form.Item>
            <Form.Item
                name="title"
                rules={[{ min: MIN_TASK_LENGTH }, { max: MAX_TASK_LENGTH }, { required: true }]}
                style={{ flexGrow: 1 }}
            >
                <Input
                    disabled={!isEdit}
                    className={checkBoxPressed ? 'task-input through' : 'task-input'}
                />
            </Form.Item>
            <Form.Item>
                <Space>
                    {isEdit ? (
                        <>
                            <Button size="middle" type="primary" onClick={onSubmit}>
                                <SaveOutlined />
                            </Button>

                            <Button size="middle" type="primary" onClick={onCancel}>
                                <RollbackOutlined />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="middle" type="primary" onClick={onChange}>
                                <EditOutlined />
                            </Button>
                            <Button
                                size="middle"
                                type="primary"
                                danger
                                onClick={() => onDelete(id)}
                            >
                                <DeleteOutlined />
                            </Button>
                        </>
                    )}{' '}
                </Space>
            </Form.Item>
            {contextHolder}
        </Form>
    )
}

export default TaskItem
