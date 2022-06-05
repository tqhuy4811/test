import React, {useCallback, useState, useRef} from 'react';
import './TaskDetail.css'

function TaskDetail(props) {
    const selectBoxRef = useRef(null)
    const taskList = props.taskList
    const setTaskList = props.setTaskList
    const oldTask = props.task
    const setSelectDetailTask = props.setSelectDetailTask

    const [task, setTask] = useState(oldTask)

    const textInputOnchange = useCallback(
        ({target:{name,value}}) => setTask(state => ({ ...state, [name]:value }), [])
    )

    const handleSelectOption = (value) => {
        setTask({...task, taskPriority: value})
        if(selectBoxRef.current.classList.contains('active')){
            selectBoxRef.current.classList.remove('active')
        }else {
            selectBoxRef.current.classList.add('active')
        }
    }

    const disablePastDate = () => {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, "0")
        const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
        const yyyy = today.getFullYear()
        return yyyy + "-" + mm + "-" + dd
    }

    const handleSelectBoxOnclick = () => {
        if(selectBoxRef.current.classList.contains('active')){
            selectBoxRef.current.classList.remove('active')
        }else {
            selectBoxRef.current.classList.add('active')
        }
    }

    const handleSubmitButton = () => {
        var data = taskList
        const index =  data.findIndex(obj => obj.taskID == task.taskID)
        data[index] = task
        setTaskList([...data])
        localStorage.setItem('taskList', JSON.stringify([...data])) 
        setSelectDetailTask('')
    }

    return (
        <div id='detail-task-container'>
            
            <div className='task-description'>
                <span className='input-title'> Description </span>
                <textarea
                    id='task-description-input'
                    name='taskDescription'
                    key='taskDescription'
                    value={task.taskDescription}
                    onChange={(e) => {textInputOnchange(e)}}
                ></textarea>
            </div>
            <div className='task-extra-info'>
                <div className='task-due-date'>
                    <span className='input-title'> Due Date </span>
                    <input
                        id='task-due-date-input'
                        type='date'
                        name='taskDueDate'
                        key='taskDueDate'
                        min={disablePastDate()}
                        value={task.taskDueDate}
                        onChange={(e) => {textInputOnchange(e)}}
                    ></input>
                </div>
                <div className='task-priority'>
                    <span className='input-title'> Priority </span>
                    <div className='popup-select-box' ref={selectBoxRef}>
                        <div className='select-box-value' onClick={() => handleSelectBoxOnclick()}>
                            <span>
                                {task.taskPriority}
                            </span>
                            <i className='bx bx-up-arrow-alt'></i>
                        </div>
                        <ul>
                            <li onClick={() => {handleSelectOption('Low')}}> 
                                low
                            </li>
                            <li onClick={() => {handleSelectOption('Normal')}}> 
                                normal
                            </li>
                            <li onClick={() => {handleSelectOption('High')}}> 
                                high
                            </li>
                        </ul>
                    </div>
                </div>
            </div>  
            <div className='add-button'>
                <button onClick={(e) => handleSubmitButton(e)}>
                    Update
                </button>
            </div>
        </div>
    );
}

export default TaskDetail;

