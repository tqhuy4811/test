import React, {useCallback, useState, useRef} from 'react';
import './AddNewTask.css'

function AddNewTask(props) {
    const selectBoxRef = useRef(null)
    const errorLog = useRef(null)
    const taskList = props.taskList
    const setTaskList = props.setTaskList

    const [task, setTask] = useState({
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        taskPriority: 'Normal'
    })

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
        if(!task.taskTitle) {
            errorLog.current.classList.add('active')
        }else {

            const newTaskID = taskList.length ? taskList[taskList.length -1].taskID + 1 : 1

            const newTask = {
                taskTitle: task.taskTitle,
                taskDescription: task.taskDescription,
                taskDueDate: task.taskDueDate,
                taskPriority: task.taskPriority,
                taskID: newTaskID
            }
            setTaskList(state => [...state, newTask])
            localStorage.setItem('taskList', JSON.stringify([...taskList, newTask]))
            setTask({
                taskTitle: '',
                taskDescription: '',
                taskDueDate: '',
                taskPriority: 'Normal',
            }) 
            if(errorLog.current.classList.contains('active')) {
                errorLog.current.classList.remove('active')
            }
        }   
    }

    return (
        <div id='add-new-task-container'>
            <span className='form-title'>
                New Task
            </span>
            <div className='task-title'>
                <input
                    id='task-title-input' 
                    type='text'
                    name='taskTitle'
                    key='taskTitle'
                    value={task.taskTitle}
                    onChange={(e) => {textInputOnchange(e)}}
                    placeholder='Add new task...'
                ></input>
                <div className='error-log' ref={errorLog}>
                    <span>
                        This field is require
                    </span>
                </div>
            </div>
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
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddNewTask;

