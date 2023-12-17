let allTask = JSON.parse(localStorage.getItem("allTaskData")) || []
displayLocalTask()


function displayLocalTask(){
    const taskDesktop = document.getElementById("taskContainer");
    // const json = localStorage.getItem("allTaskData");
    // let getMyTask = JSON.parse(json) || null;
    if(allTask){
        let html = ""
        // let firstChildId = taskDesktop.firstChild.id ? taskDesktop.firstChild.id : 0
        // let taskId = parseInt(firstChildId) +1
        
        for (let tasks in allTask) {
            const taskId = allTask[tasks].id
            html += `
                <div class="taskItem" id="${taskId}"> 
                    <p>${allTask[tasks].someTask}</p>
                    <p>${allTask[tasks].someDate}</p>
                    <button onclick="deleteDiv(this)">Reset</button>
                </div>
            `;
        // console.log("task object ",allTask[tasks])
        } 
        taskDesktop.innerHTML = html;
    }else{
        null
    }

    console.log("from the display",allTask)
}

function addTask(){

    displayLocalTask()
    const date = document.getElementById("date")
    const myTask = document.getElementById("task")
    const taskDesktop = document.getElementById("taskContainer") || null
    const myTaskValue = myTask.value
    const myDate = date.value
    
    if(myTaskValue && myDate){
        console.log("task desktoop ",taskDesktop)
        let firstChildId = taskDesktop.firstChild.id ? taskDesktop.firstChild.id : 0 //Cannot read properties of null (reading 'id')
        let taskId = parseInt(firstChildId)
        let idTask = taskId +1
        console.log(taskId)
        // const taskId = generateId()
        const task = {
            id: idTask,
            someTask: myTaskValue,
            someDate: myDate
        }

        allTask.unshift(task)

        // add to the local storage
        localStorage.setItem("allTaskData", JSON.stringify(allTask))

        // show the task at the bottom
        displayLocalTask()

        // reset the field
        myTask.value = ""
        idTask = taskId + 1
    }else{
        alert("anything to do :p")
    }
    // allTask.setItem(task)
    console.log("from the click ",allTask)
}

function deleteDiv(button) {
    const taskDiv = button.parentNode; // Get the parent element of the button
    const taskDivId = taskDiv.id
    console.log("taskdiv ", taskDiv)
    console.log(" taskdiv id ",taskDivId)
    // confirm the supression
    const confirmDelete = window.confirm("did you finish this task ?")
    // console.log(taskDivId)
    if(confirmDelete){     
        taskDiv.remove()

        // update local storage 
        allTask  = allTask.filter((task)=>{return task.id !== taskDivId})
        // console.log("task id in all atsk " , allTask.map(task => task.id))
        localStorage.setItem("allTaskData", JSON.stringify(allTask))
        console.log("all task after delete",allTask)
    }

}

// function generateId(){
//     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
// }