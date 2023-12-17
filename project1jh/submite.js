let allTask = JSON.parse(localStorage.getItem("allTaskData")) || []

displayLocalTask()


function displayLocalTask(){
    const taskDesktop = document.getElementById("taskContainer")
    if(allTask){
        let html = ""
        for (let tasks in allTask) {
            const taskId = allTask[tasks].id
            html += `
                <div class="taskItem" data-id="${taskId}"> 
                    <span class="deleteButton" onclick="deleteDiv(this)">x</span>
                    <div class="taskText">${allTask[tasks].someTask}</div>
                    <div class="taskDate">${allTask[tasks].someDate}</div>
                    <div class="taskTime">${allTask[tasks].someTime}</div>
                    <input type="checkbox">
                </div>
            `;
        } 
        taskDesktop.innerHTML = html;
    }else{
        null
    }

}

function deleteDiv(button) {
    const taskDiv = button.parentNode; // Get the parent element of the button
    const taskDivId = taskDiv.getAttribute("data-id")

    // confirm the supression
    const confirmDelete = window.confirm("Did you finish this task ?")

    if(confirmDelete){     
        taskDiv.remove()

        // update local storage by remove the selected task using a filter 
        allTask  = allTask.filter((task)=>{return task.id !== taskDivId})
        localStorage.setItem("allTaskData", JSON.stringify(allTask))
    }

}


function generateId(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

function addTask(){

    const date = document.getElementById("date")
    const time = document.getElementById("time")
    const myTask = document.getElementById("task")
    const myTaskValue = myTask.value
    const myDate = date.value
    const myTime = time.value

    if(myTaskValue && myDate && myTime){

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
        resetForm()
        // myTask.value = ""
        // date.value = ""
        // time.value = ""

    }else{
        let missingFields = [];

        if (!myTaskValue) {
            missingFields.push("Task")
            myTask.focus() 
        }
        if (!myDate) {
            missingFields.push("Date")
            date.focus() 
        }
        if (!myTime) {
            missingFields.push("Time")
            time.focus() 
        }
        if (missingFields.length > 0) {
            alert(`The following fields are missing: ${missingFields.join(", ")}`)
        }
    }


}

function resetForm(){
    const date = document.getElementById("date")
    const time = document.getElementById("time")
    const myTask = document.getElementById("task")

    myTask.value = ""
    date.value = ""
    time.value = ""

}