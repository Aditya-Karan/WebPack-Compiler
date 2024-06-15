
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType{
    fullCode:{
        html:string,
        css:string,
        javascript:string,
    }
    
    currentLanguage:"html"|"css"|"javascript",
}

const initialState:CompilerSliceStateType={
    fullCode:{
        html:`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>To-Do List</h1>
        <form id="toDoForm">
            <input type="text" id="taskInput" placeholder="Enter a new task">
            <button type="submit">Add Task</button>
        </form>
        <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>
        `,
        css:`
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    width: 80%;
    margin: auto;
    overflow: hidden;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

input[type="text"] {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
}

button:hover {
    background-color: #0056b3;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
}

li.completed {
    text-decoration: line-through;
    color: #888;
}

.delete-btn {
    background-color: #FF0000;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.delete-btn:hover {
    background-color: #cc0000;
}
        
        `,
        javascript:`
document.addEventListener('DOMContentLoaded', () => {
    const toDoForm = document.getElementById('toDoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    toDoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') {
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        taskItem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
    });
});
        
        `,
    },
    currentLanguage:"html",

};

const compilerSlice=createSlice({
    name:"compilerSlice",
    initialState,
    reducers:{
        updateCurrentlanguage:(state,action:PayloadAction<CompilerSliceStateType["currentLanguage"]>)=>{
            state.currentLanguage=action.payload;
        },
        updateCodeValue:(state,action:PayloadAction<string>)=>{
            state.fullCode[state.currentLanguage]=action.payload;

        },
        updateFullCode:(state,action:PayloadAction<CompilerSliceStateType["fullCode"]>)=>{
            state.fullCode=action.payload;
        }
    }

});

export default compilerSlice.reducer;
export const {updateCurrentlanguage,updateCodeValue,updateFullCode}=compilerSlice.actions;