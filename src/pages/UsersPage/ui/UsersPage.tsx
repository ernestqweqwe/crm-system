import {
    Button,
    GetProp,
    Popconfirm,
    Table,
    TablePaginationConfig,
    TableProps,
    Tag,
} from 'antd'
import { Roles, User } from 'src/types/usersTypes.ts'
import Column from 'antd/es/table/Column'
import './UsersPage.scss'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { usersApi } from 'src/store/services/usersService.ts'
import { Link } from 'react-router'
import { SorterResult } from 'antd/es/table/interface'
import { Key, useState } from 'react'
import Search from 'antd/es/input/Search'

export interface TableParams<T> {
    pagination?: TablePaginationConfig
    sortField?: SorterResult<T>['field']
    sortOrder?: SorterResult<T>['order']
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
    isBlocked?: Key | boolean
    search?: string
}

enum RolesColors {
    ADMIN = 'pink',
    MODERATOR = 'cyan',
    USER = 'green',
}

export const UsersPage = () => {
    // todo вытянуть конкретную дате через select from result, пример в tasklist
    // todo debounce для поиска
    const [deleteUser] = usersApi.useDeleteUserMutation()
    const [blockUser] = usersApi.useBlockUserMutation()
    const [unblockUser] = usersApi.useUnBlockUserMutation()
    const [updateRights] = usersApi.useUpdateRightsMutation()

    const [tableParams, setTableParams] = useState<TableParams<User>>({})

    const handleTableChange: TableProps<User>['onChange'] = (
        _,
        filters,
        sorter
    ) => {
        const isBlocked = filters['isBlocked'] ? filters['isBlocked'][0] : ''
        const sortOrder = (sorter as SorterResult<User>).order
        const sortField = (sorter as SorterResult<User>).field

        setTableParams({
            isBlocked,
            sortOrder,
            sortField,
        })
    }
    const { data, isFetching } = usersApi.useGetUsersQuery(tableParams)

    return (
        <div className="users-page">
            <Search
                style={{ marginTop: '30px', width: '300px' }}
                placeholder="input search text"
                size="large"
                value={tableParams.search}
                onChange={(e) => {
                    const value = e.currentTarget.value
                    setTableParams((prev) => ({
                        ...prev,
                        search: value,
                    }))
                }}
            />
            {data && (
                <Table<User>
                    size="small"
                    bordered
                    dataSource={
                        data.data ??
                        [].map((user: User) => {
                            return { ...user, key: user.id }
                        })
                    }
                    style={{ padding: '10px' }}
                    loading={isFetching}
                    onChange={handleTableChange}
                >
                    <Column
                        title="Name"
                        dataIndex="username"
                        key="username"
                        sorter={true}
                    />
                    <Column
                        title="Email"
                        dataIndex="email"
                        key="email"
                        sorter={true}
                    />
                    <Column
                        title="Date registration"
                        dataIndex="date"
                        key="date"
                        render={(value) => {
                            return new Date(value).toLocaleDateString()
                        }}
                        width={90}
                    />
                    <Column
                        title="Bloking status"
                        dataIndex="isBlocked"
                        width={100}
                        render={(value) => {
                            return value ? (
                                <Tag color="red">Blocked</Tag>
                            ) : (
                                <Tag color="green">Not Blocked</Tag>
                            )
                        }}
                        key="isBlocked"
                        filters={[
                            {
                                text: 'All users',
                                value: '',
                            },
                            {
                                text: 'Blocked users',
                                value: true,
                            },
                            {
                                text: 'Active users',
                                value: false,
                            },
                        ]}
                        filterMultiple={false}
                        defaultFilteredValue={['']}
                    />
                    <Column
                        title="Roles"
                        dataIndex="roles"
                        key="roles"
                        width={150}
                        align="center"
                        render={(value) => {
                            return (
                                <>
                                    {value?.map(
                                        (role: Roles, index: number) => {
                                            return (
                                                <Tag
                                                    style={{ margin: '5px' }}
                                                    color={RolesColors[role]}
                                                    key={index}
                                                >
                                                    {role}
                                                </Tag>
                                            )
                                        }
                                    )}
                                </>
                            )
                        }}
                    />

                    <Column
                        title="Phone"
                        dataIndex="phoneNumber"
                        key="phoneNumber"
                        width={120}
                        render={(value) => {
                            return value ? value : 'Not specified'
                        }}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record: User) => {
                            return (
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <Link
                                        className="action-icon"
                                        to={`/users/${record.id}`}
                                    >
                                        <UserOutlined />
                                    </Link>
                                    <Popconfirm
                                        className="action-icon"
                                        title="Delete User"
                                        description="Are you sure to delete this user?"
                                        onConfirm={() => deleteUser(record.id)}
                                    >
                                        <DeleteOutlined />
                                    </Popconfirm>

                                    <Popconfirm
                                        title="Change user rights"
                                        description="Are you sure to change user rights?"
                                        onConfirm={() =>
                                            record.roles?.includes(Roles.ADMIN)
                                                ? updateRights({
                                                      id: record.id,
                                                      roles: record.roles.filter(
                                                          (el) =>
                                                              el !== Roles.ADMIN
                                                      ),
                                                  })
                                                : updateRights({
                                                      id: record.id,
                                                      roles: [
                                                          ...(record.roles ??
                                                              []),
                                                          Roles.ADMIN,
                                                      ],
                                                  })
                                        }
                                    >
                                        <Button>
                                            {record.roles?.includes(Roles.ADMIN)
                                                ? 'remove Admin'
                                                : 'give Admin'}
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="Block User"
                                        description="Are you sure to block user?"
                                        onConfirm={
                                            record.isBlocked
                                                ? () => unblockUser(record.id)
                                                : () => blockUser(record.id)
                                        }
                                    >
                                        <Button>
                                            {record.isBlocked
                                                ? 'Unblock'
                                                : 'Block'}
                                        </Button>
                                    </Popconfirm>
                                </div>
                            )
                        }}
                    />
                </Table>
            )}
        </div>
    )
}
