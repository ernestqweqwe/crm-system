import { Button, Checkbox, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './TaskItem.scss'
import { todoApi } from 'src/store/services/taskListService.ts'
import { Data } from 'types/responseTypes'
import { FC, useState } from 'react'
import {
    DeleteOutlined,
    EditOutlined,
    RollbackOutlined,
    SaveOutlined,
} from '@ant-design/icons'

interface formValues {
    title: string
    isChecked: boolean
}

interface TaskItemProps {
    task: Data
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
    const { title, id, isDone } = task

    const [deleteTodo] = todoApi.useDeleteTodoMutation()
    const [updateTodo] = todoApi.useUpdateTodoMutation()

    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [form] = useForm()
    const { Item } = Form

    const onToggle = async () => {
        await updateTodo({ id: id, title: title, isDone: !isDone })
    }

    const onSave = async () => {
        setChangeButtonPressed(false)
        const values: formValues = form.getFieldsValue()
        if (values.title !== title) {
            updateTodo({ id: id, title: values.title, isDone: isDone })
        }
    }

    const onCancel = () => {
        setChangeButtonPressed(false)
        form.setFieldValue('title', title)
    }

    const onDelete = async () => {
        await deleteTodo(id)
    }

    const onChange = () => {
        setChangeButtonPressed(true)
    }

    return (
        <Form
            layout="horizontal"
            className="task-item"
            form={form}
            initialValues={{ title, isChecked: isDone }}
        >
            <Item name="isChecked" valuePropName="checked">
                <Checkbox onClick={() => onToggle()} />
            </Item>
            <Item
                style={{ flexGrow: 1 }}
                name="title"
                rules={[{ min: 2 }, { max: 64 }, { required: true }]}
            >
                <Input
                    style={{
                        height: 50,
                        textOverflow: 'ellipsis',
                        background: `${changeButtonPressed ? 'var(--background-primary)' : '#efeded'}`,
                    }}
                    className={isDone ? 'task-input through' : 'task-input'}
                    disabled={!changeButtonPressed}
                />
            </Item>
            <div className="task-item__btns">
                <Space>
                    {changeButtonPressed ? (
                        <>
                            <Button
                                size="middle"
                                type="primary"
                                onClick={onSave}
                            >
                                <SaveOutlined />
                            </Button>

                            <Button
                                size="middle"
                                type="primary"
                                style={{ marginLeft: 10 }}
                                onClick={onCancel}
                            >
                                <RollbackOutlined />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="middle"
                                type="primary"
                                onClick={onChange}
                            >
                                <EditOutlined />
                            </Button>

                            <Button
                                size="middle"
                                type="primary"
                                danger
                                onClick={() => onDelete()}
                                style={{ marginLeft: 10 }}
                            >
                                <DeleteOutlined />
                            </Button>
                        </>
                    )}
                </Space>
            </div>
        </Form>
    )
}

export default TaskItem
