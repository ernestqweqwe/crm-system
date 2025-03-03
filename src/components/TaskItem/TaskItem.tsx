import { Button, Checkbox, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './TaskItem.scss'
import { todoApi } from 'store/services/todosService'
import { Data } from 'types/responseTypes'
import { FC, useState } from 'react'

interface formValues {
    title: string
    isChecked: boolean
}

interface TaskItemProps {
    task: Data
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
    console.log('render item')

    const { title, id, isDone } = task

    const [deleteTodo] = todoApi.useDeleteTodoMutation()
    const [updateTodo] = todoApi.useUpdateTodoMutation()

    const [changeButtonPressed, setChangeButtonPressed] = useState(false)
    const [form] = useForm()

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
            layout="inline"
            className="task-item"
            form={form}
            initialValues={{ title, isChecked: isDone }}
        >
            <Form.Item name="isChecked" valuePropName="checked">
                <Checkbox onClick={() => onToggle()} />
            </Form.Item>
            <Form.Item name="title" rules={[{ min: 2 }, { max: 64 }, { required: true }]}>
                <Input
                    className={isDone ? 'task-input through' : 'task-input'}
                    disabled={!changeButtonPressed}
                />
            </Form.Item>
            <Form.Item>
                {changeButtonPressed ? (
                    <>
                        <Button size="middle" type="primary" onClick={onSave}>
                            Save
                        </Button>

                        <Button
                            size="middle"
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size="middle" type="primary" onClick={onChange}>
                            Change
                        </Button>

                        <Button
                            size="middle"
                            type="primary"
                            danger
                            onClick={() => onDelete()}
                            style={{ marginLeft: 10 }}
                        >
                            Delete
                        </Button>
                    </>
                )}{' '}
            </Form.Item>
        </Form>
    )
}

//todo фокус при нажатии change
//todo возможно сохранить item с <2 символов
export default TaskItem
