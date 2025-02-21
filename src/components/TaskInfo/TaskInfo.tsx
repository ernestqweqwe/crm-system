import { FC } from 'react'
import './TaskInfo.scss'
import { Button } from 'antd'
import { Info } from '../../api/responseTypes'

interface TaskInfoProps {
    info: Info
    chosenTodos: (chosenTemplate: string) => void
    activeFilter: string
}

const TaskInfo: FC<TaskInfoProps> = ({ info, chosenTodos, activeFilter }) => {
    const { all, completed, inWork } = info
    return (
        <div className="tasks-info">
            <Button
                disabled={activeFilter === 'all'}
                type="primary"
                size="large"
                onClick={() => chosenTodos('all')}
            >
                All ({all})
            </Button>
            <Button
                disabled={activeFilter === 'completed'}
                type="primary"
                size="large"
                onClick={() => chosenTodos('completed')}
            >
                Completed ({completed})
            </Button>
            <Button
                disabled={activeFilter === 'inWork'}
                type="primary"
                size="large"
                onClick={() => chosenTodos('inWork')}
            >
                In work ({inWork})
            </Button>
        </div>
    )
}

export default TaskInfo
