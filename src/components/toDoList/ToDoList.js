import React, {useCallback, useEffect, useState} from 'react';
import TaskItem from '../taskItem/TaskItem';
import './ToDoList.css'

function ToDoList(props) {
    const taskList = props.taskList
    const setTaskList = props.setTaskList
    const [searchKey, setSearchKey] = useState('')
    const [selectTask, setSelectTask] = useState([])
    const [taskSearch, setTaskSearch] = useState([])
    const [selectDetailTask, setSelectDetailTask] = useState('')

    const handleSearchOnchange = useCallback(
        ({target:{value}}) => setSearchKey(value)
    );

    useEffect(() => {
        setTaskSearch([... taskList.filter((item, index) => {
            return item.taskTitle.toLowerCase().includes(searchKey)
        })])
    }, [searchKey, taskList])

    const handleBulkRemoveOnClick = () => {
        var data = taskList
        selectTask.map((taskID, index) => {
            data = [...data.filter(state => state.taskID !== taskID)]
        })
        setTaskList([...data])
        localStorage.setItem('taskList', JSON.stringify([...data]))
        setSelectTask([])
    }

    return (
        <div id='to-do-list-container'>
            <div>
                <div className='to-do-list-title'>
                    <span>To Do List</span>
                </div>
                <div className='search'>
                    <input
                        id='search-task-input'
                        type='text'
                        name='search'
                        key='search'
                        placeholder='Search...'
                        value={searchKey}
                        onChange={handleSearchOnchange}
                    ></input>
                </div>
            </div>
            <div className='item-container'>
                {taskSearch ? taskSearch.map((task, index) => {
                    return(
                        <div key={index}>
                            <TaskItem 
                                task={task} 
                                searchKey={searchKey} 
                                selectTask={selectTask} 
                                setSelectTask={setSelectTask}
                                taskList={taskList}
                                setTaskList={setTaskList}
                                selectDetailTask={selectDetailTask}
                                setSelectDetailTask={setSelectDetailTask}
                                taskSearch={taskSearch}
                            ></TaskItem>
                        </div>
                    )
                }) : null
                }
            </div>
            {selectTask.length ? 
                <div className='bulk-action'>
                    <div>
                        <span>
                            Bulk Action
                        </span>
                    </div>
                    <div>
                        <button className='bulk-done'>
                            done
                        </button>
                        <button className='bulk-remove' onClick={(e) => handleBulkRemoveOnClick(e)}>
                            remove
                        </button>
                    </div>
                </div>
                : null
            }
        </div>
    );
}

export default ToDoList;    