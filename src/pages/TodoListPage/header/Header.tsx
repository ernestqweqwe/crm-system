import { Header as AntHeader } from 'antd/es/layout/layout'
import './Header.scss'
import { Button, FormInstance, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TaskForm from '../../../components/TaskForm/TaskForm'
import { useRef, useState } from 'react'

export const Header = () => {
    const [open, setOpen] = useState(false)
    const formRef = useRef<FormInstance | null>(null)

    const showModal = () => setOpen(true)
    const handelOk = () => formRef.current?.submit()
    const handleCancel = () => setOpen(false)

    return (
        <AntHeader className="header">
            <Button onClick={showModal}>
                <PlusOutlined />
                Add Task
            </Button>
            <Modal
                title="Create a New Task"
                open={open}
                okText={'Create'}
                onOk={handelOk}
                onCancel={handleCancel}
            >
                <TaskForm formRef={formRef} onClose={handleCancel} />
            </Modal>
        </AntHeader>
    )
}
