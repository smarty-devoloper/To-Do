
const getDate = String(new Date());
var today = getDate.split(" ");
var date = document.querySelector("#date");
date.textContent = `${today[0]} , ${today[2]} ${today[1]}  ${today[3]}`


// collect variables 
const form = document.querySelector("form")
const addBtn = document.querySelector(".add_tasks");
const taskList = document.querySelector(".collection");
const clearAllTasks = document.querySelector(".delete-all");
const taskinput = document.querySelector('.task_input');

// load events 
loadEvents();
function loadEvents() {
    document.addEventListener("DOMContentLoaded",fetchTasks)
    addBtn.addEventListener('click',addTask);
    clearAllTasks.addEventListener('click',deletAll)
    taskList.addEventListener('click',removeSingle)
    form.addEventListener('submit',addTask)
  }




function addTask(e) {
    let tasks;
    let backup;
 if(taskinput.value === ''){
      alert("please enter the task")
    }
    else{
    const li = document.createElement("li")
    const a = document.createElement("a")
    li.className = 'list-item';
    li.innerHTML = taskinput.value
    a.className = 'delete-item';
    a.innerHTML = 'x';
    a.setAttribute('href','#')
    li.appendChild(a);
    taskList.appendChild(li)
    backup = taskinput.value;
    taskinput.value = '';
    console.log("item added")
    e.preventDefault();

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(backup);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  function fetchTasks(e){
      let tasks;
      
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(tasks){
    const li = document.createElement("li")
    const a = document.createElement("a")
    li.className = 'list-item';
    li.innerHTML = tasks
    a.className = 'delete-item';
    a.innerHTML = 'x';
    a.setAttribute('href','#')
    li.appendChild(a);
    taskList.appendChild(li)
    })

  }


  function removeSingle(e){
       let del
       if(e.target.classList.contains('delete-item')){
           if(confirm(" task will be delete")){
            del = e.target.parentElement;
               e.target.parentElement.remove();
               console.log("Item removed")
        
            
        let tasks ;
        if(localStorage.getItem('tasks')===null){
           tasks = [];
       } else {
           tasks = JSON.parse(localStorage.getItem('tasks'))
       }
        console.log(del.textContent)
        tasks.forEach(function (task,index) {
            if(del.textContent === `${task}x`){
              tasks.splice(index,1);
            }
          });
          localStorage.setItem('tasks',JSON.stringify(tasks))
        
   }
  }
 }

  
function deletAll(e) {
    if(confirm("are you sure"))
    while(taskList.firstChild){
        taskList.firstChild.remove();
        console.log("all item deleted")
        localStorage.clear();
    }
  }