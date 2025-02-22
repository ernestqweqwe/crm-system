import { FC } from 'react'
import './TaskInfo.scss'
import { Button } from 'antd'
import { Info } from '../../types/responseTypes.ts'

interface TaskInfoProps {
    info: Info
    activeFilter: string
    setActiveFilter: (filter: string) => void
}

const TaskInfo: FC<TaskInfoProps> = ({ info, activeFilter, setActiveFilter }) => {
    const { all, completed, inWork } = info
    return (
        <div className="tasks-info">
            <Button
                disabled={activeFilter === 'all'}
                type="primary"
                size="large"
                onClick={() => setActiveFilter('all')}
            >
                All ({all})
            </Button>
            <Button
                disabled={activeFilter === 'completed'}
                type="primary"
                size="large"
                onClick={() => setActiveFilter('completed')}
            >
                Completed ({completed})
            </Button>
            <Button
                disabled={activeFilter === 'inWork'}
                type="primary"
                size="large"
                onClick={() => setActiveFilter('inWork')}
            >
                In work ({inWork})
            </Button>
        </div>
    )
}

export default TaskInfo
