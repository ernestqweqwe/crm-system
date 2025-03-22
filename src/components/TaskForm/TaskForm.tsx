import { FC, useEffect, useRef } from 'react'
import { Form, FormInstance, Input, InputRef } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { todoApi } from 'src/store/services/taskListService.ts'
import './TaskForm.scss'
import { MAX_TASK_LENGTH, MIN_TASK_LENGTH } from 'src/helpers/constants.ts'

interface TaskFormProps {
    formRef: React.RefObject<FormInstance | null>
    onClose: () => void
}

const TaskForm: FC<TaskFormProps> = ({ onClose, formRef }) => {
    const [createTodo] = todoApi.useCreateTodoMutation()
    const [form] = Form.useForm()
    const { Item } = Form
    const inputRef = useRef<InputRef | null>(null)

    if (formRef) formRef.current = form

    const handleSubmit = async ({ task }: { task: string }) => {
        await createTodo(task)
        form.resetFields()
        onClose()
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [formRef])

    return (
        <Form
            form={form}
            className="form"
            onFinish={(values) => handleSubmit(values)}
            validateMessages={{
                required: 'Field is required',
                string: {
                    min: 'The field must contain at least 2 characters',
                    max: 'Maximum length 64 characters',
                },
            }}
        >
            <Item
                rules={[
                    { min: MIN_TASK_LENGTH },
                    { max: MAX_TASK_LENGTH },
                    { required: true },
                ]}
                label="Task"
                name="task"
            >
                <Input ref={inputRef} />
            </Item>
        </Form>
    )
}

export default TaskForm
