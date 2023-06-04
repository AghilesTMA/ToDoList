
function isDigit(char){
    return !isNaN(parseInt(char));
}
function GenId(){
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let Id = "";
    let char = '';
    do{
        Id = '';
        for(let i=0;i<10;i++){
            char = Math.floor(Math.random()*characters.length);
            Id += characters.charAt(char);
        }
    }while(isDigit(Id.charAt(0)));
    return Id;
}
let tasksArr = [];
let input = document.getElementById("task");
let taskBar = document.querySelector(".taskbar");
let addButton = document.querySelector(".Add")
let deleteButton = document.querySelector(".delAll");

if(window.localStorage.getItem("tasks")){
    restoreFromStorage();
    addTaskToPage();
}


function addTastToTaskBar(){
    if(input.value != ""){
        addTaskToArr(input.value);
        addTaskToPage();
        addTaskToStorage(tasksArr);
    }
}
function addTaskToPage(){
    taskBar.innerHTML = "";
    tasksArr.forEach((task)=>{
        let div = document.createElement("div");
        div.classList.add("taskcard");
        div.setAttribute("id",task.id);
        div.textContent = task.title;
        let button = document.createElement("button");
        button.classList.add("del");
        button.textContent = "delete";
        div.appendChild(button);
        taskBar.appendChild(div);
    });
}
function addTaskToArr(taskValue){
    let task = {
        id: GenId(),
        title: input.value,
    }
    tasksArr.push(task);
}
function addTaskToStorage(task){
    let sTask = JSON.stringify(task);
    window.localStorage.setItem("tasks",sTask);
}
function restoreFromStorage(){
    tasksArr = JSON.parse(window.localStorage.getItem("tasks"));
}
function deleteTask(e){
    let parent = e.target.parentNode;
    parent.remove();
}
function removeFromStorage(e){
    let ID = e.target.parentNode.getAttribute("id");
    tasksArr = tasksArr.filter((task)=> task.id != ID);
    addTaskToStorage(tasksArr);
}

addButton.addEventListener("click",()=>{
    addTastToTaskBar();
});

taskBar.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        deleteTask(e);
        removeFromStorage(e);
    }
});

deleteButton.addEventListener("click",()=>{
    taskBar.innerHTML = "";
    tasksArr = [];
    window.localStorage.clear();
});