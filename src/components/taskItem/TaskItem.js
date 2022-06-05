import React from 'react';
import TaskDetail from '../taskDetail/TaskDetail';
import './TaskItem.css'

function TaskItem(props) {
    const task = props.task
    const selectTask = props.selectTask
    const setSelectTask = props.setSelectTask
    const taskList = props.taskList
    const setTaskList = props.setTaskList
    const selectDetailTask = props.selectDetailTask
    const setSelectDetailTask = props.setSelectDetailTask
    const taskSearch = props.taskSearch

    const handleCheckBoxOnchange = (e, taskID) => {
        if(e.target.checked) {
            setSelectTask(state => [...state, taskID])
        }else {
            setSelectTask(selectTask.filter((other) => other !== taskID))
        }
    }

    const handleRemoveTaskOnclick = (e) => {
        var data = taskList
        data = [...data.filter(state => state.taskID !== task.taskID)]
        setTaskList([...data])
        localStorage.setItem('taskList', JSON.stringify([...data]))
    }

    const handleDetailTaskOnclick = (e) => {
        setSelectDetailTask(task.taskID)
    }

    return (
        <div id='task-item'>
            <div className='task-item-brief'>
                <div className='task-item-title'>
                    <input 
                        type='checkbox' 
                        checked={selectTask.includes(task.taskID)} 
                        name={'check-box' + task.taskID} 
                        value={task.taskID} onChange={(e) => {handleCheckBoxOnchange(e, task.taskID)}}
                    ></input>
                    <span>{task.taskTitle}</span>
                </div>
                <div>
                    <div>
                        <button className='detail-button' onClick={(e) => handleDetailTaskOnclick(e)}>
                            Detail
                        </button>   
                    </div>
                    <div >
                        <button className='remove-button' onClick={(e) => handleRemoveTaskOnclick(e)}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div >
                {selectDetailTask === task.taskID ? 
                    <TaskDetail 
                        task={task} 
                        taskList={taskList} 
                        setTaskList={setTaskList}
                        setSelectDetailTask={setSelectDetailTask}
                        taskSearch={taskSearch}
                    ></TaskDetail>
                    :null
                }
            </div>
        </div>
    );
}

export default TaskItem;