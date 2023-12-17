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
                    <span class="deleteButton" onclick="deleteDiv(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </span>
                    <span class="detailButton" onclick="showDetails(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                    <div class="taskText">${allTask[tasks].someTask}</div>
                    <div class="taskDate">${allTask[tasks].someDate}</div>
                    <div class="taskTime">${allTask[tasks].someTime}</div>
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

function showDetails(button) {
    const taskId = button.parentNode.getAttribute("data-id");
    const task = allTask.find((item) => item.id === taskId);

    if (task) {
        const taskTextValue = task.someTask;
        const taskDateValue = task.someDate;
        const taskTimeValue = task.someTime;

        const detailsDiv = document.getElementById("detailsDiv");

        //display the selected task bigger
        detailsDiv.innerHTML = `
            <p id="textDetail">${taskTextValue}</p>
            <div id="timeDateDiv">
                <p >${taskDateValue}</p>
                <p >${taskTimeValue}</p>
            </div>
            <span id="closeButton" onclick="closeDetails()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
        `;

        // update his style
        detailsDiv.style.display = "block";
    }
}

function closeDetails() {
    const detailsDiv = document.getElementById("detailsDiv");

    // update his style
    detailsDiv.style.display = "none";
}


function darkMode(){
    const body = document.body
    const stylePage = document.getElementById("stylePage")

    if(body.classList.contains("darkPageMode")){
        body.classList.remove("darkPageMode")
        stylePage.href = "./style.css"
    }else{
        body.classList.add("darkPageMode")
        stylePage.href = "./darkStyle.css"
    }
}