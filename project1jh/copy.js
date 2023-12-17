let allTask = JSON.parse(localStorage.getItem("allTaskData")) || []
displayLocalTask()


function displayLocalTask(){
    const taskDesktop = document.getElementById("taskContainer");
    if(allTask){
        let html = ""
        for (let tasks in allTask) {
            const taskId = allTask[tasks].id
            html += `
                <div class="taskItem" data-id="${taskId}"> 
                    <div class="deleteButton" onclick="deleteDiv(this)">x</div>
                    <p>${allTask[tasks].someTask}</p>
                    <p>${allTask[tasks].someDate}</p>
                    <p>${allTask[tasks].someTime}</p>
                </div>
            `;
        } 
        taskDesktop.innerHTML = html;
    }else{
        null
    }

    console.log("from the display",allTask)
}

function addTask(){

    // displayLocalTask()
    const date = document.getElementById("date")
    const time = document.getElementById("time")
    const myTask = document.getElementById("task")
    // const taskDesktop = document.getElementById("taskContainer") || null
    const myTaskValue = myTask.value
    const myDate = date.value
    const myTime = time.value
    console.log("time ",time)
    console.log("my time ", myTime)
    if(myTaskValue && myDate && myTime){

        // console.log("task desktoop ",taskDesktop)
        const taskId = generateId()
        const task = {
            id: taskId,
            someTask: myTaskValue,
            someDate: myDate,
            someTime: myTime
        }

        allTask.unshift(task)

        // add to the local storage
        localStorage.setItem("allTaskData", JSON.stringify(allTask))

        // show the task at the bottom
        displayLocalTask()

        // reset the field
        myTask.value = ""
        date.value = ""
        time.value = ""

    }else{
        alert("anything to do :p")
    }
}

function deleteDiv(button) {
    const taskDiv = button.parentNode; // Get the parent element of the button
    const taskDivId = taskDiv.getAttribute("data-id")
    console.log("taskdiv ", taskDiv)
    console.log(" taskdiv id ",taskDivId)
    // confirm the supression
    const confirmDelete = window.confirm("did you finish this task ?")

    if(confirmDelete){     
        taskDiv.remove()

        // update local storage 
        allTask  = allTask.filter((task)=>{return task.id !== taskDivId})

        localStorage.setItem("allTaskData", JSON.stringify(allTask))
        console.log("all task after delete",allTask)
    }

}

function generateId(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}