

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


const json = localStorage.getItem("allTaskData")
let getMyTask = JSON.parse(json) || null;
let allTask = getMyTask ? getMyTask : []


displayLocalTask()

function addTask(){
    
    const date = document.getElementById("date")
    const myTask = document.getElementById("task")
    const taskDesktop = document.getElementById("taskContainer")
    const myTaskValue = myTask.value
    const myDate = date.value

    if(myTaskValue && myDate){
        console.log("task desktoop before ",taskDesktop)
        const firstChildId = taskDesktop.firstChild.id ? taskDesktop.firstChild.id : 0
        const taskId = parseInt(firstChildId) + 1
        console.log(taskDesktop)
        console.log(taskId)
        const task = {
            id: taskId,
            someTask: myTaskValue,
            someDate: myDate
        }
        allTask.unshift(task)

        // add the task at the bottom
        let newTaskDiv = document.createElement("div")
        newTaskDiv.setAttribute("id",taskId)
        newTaskDiv.innerHTML = `
                <p>${myTaskValue}</p>
                <p>${myDate}</p>
                <button onclick="deleteDiv(this)">Reset</button>
             `
        taskDesktop.insertBefore(newTaskDiv, taskDesktop.firstChild)
        
        // add to the local storage
        localStorage.setItem("allTaskData", JSON.stringify(allTask))

        // reset the field
        myTask.value = ""

        // console.log(myDate)

        // console.log(allTask)
    }else{
        alert("anything to do :p")
    }
}

function deleteDiv(button) {
    // const json = localStorage.getItem("allTaskData");
    // let getMyTask = JSON.parse(json) || null;
    // console.log(allTask)
    const taskDiv = button.parentNode; // Get the parent element of the button
    const taskDivId = taskDiv.id
    console.log("taskdiv ", taskDiv)
    console.log(" taskdiv id ",taskDivId)
    // console.log(taskDivId)
    taskDiv.remove()
    // update local storage 
    allTask  = allTask.filter((e,i)=>{
        console.log(e,i)
        return e.id !== parseInt(taskDivId)
    })
    localStorage.setItem("allTaskData", JSON.stringify(allTask))
    console.log(getMyTask)


    

}



function displayLocalTask(){
    // const json = localStorage.getItem("allTaskData");
    // let getMyTask = JSON.parse(json) || null;
    const taskDesktop = document.getElementById("taskContainer");
    if(getMyTask){
        let html = "";
        // let obejctKeys = Object.values(getMyTask)
        for (let tasks in getMyTask) {
            html += `
            <div id="${getMyTask[tasks].id}">
                <p>${getMyTask[tasks].someTask}</p>
                <p>${getMyTask[tasks].someDate}</p>
                <button onclick="deleteDiv(this)">Reset</button>
            </div>
        `;
        } 
        taskDesktop.innerHTML = html;
        console.log(getMyTask)
    }else{
        console.log("hey nothing")
    }

}


// const today = new Date()

// const year = today.getFullYear()
// const month = today.getMonth()+1
// const day = today.getDate()

// const todayDay =  (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year 

// // console.log(todayDay)

// // console.log(today)

// const date = document.getElementById("date")






