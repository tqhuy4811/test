import React, {useEffect, useState}from 'react';
import ToDoList from '../components/toDoList/ToDoList'
import AddNewTask from '../components/addNewTask/AddNewTask';

function ToDoListPage(props) {
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('taskList'))
        if(data) {
            setTaskList([...data])
        }
    }, [])

    return (
        <div id='page-container'>
            <AddNewTask taskList={taskList} setTaskList={setTaskList}></AddNewTask>
            <ToDoList taskList={taskList} setTaskList={setTaskList}></ToDoList>
        </div>
    );
}

export default ToDoListPage;