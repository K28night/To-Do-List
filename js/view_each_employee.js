$('#dashboard').click(function(){
       
    window.location.href="../templates/admin_dash.html"

});


let currentEmp = "";
let editingTaskId = "";
let editingTaskname = "";
let allTasks = JSON.parse(localStorage.getItem("users")) || [];
var storedUser = sessionStorage.getItem("admin");
var admin = JSON.parse(storedUser);
ad_user=allTasks.filter((task) => {
            return (task.admin == admin.username);
        });

function loadTasks(email) {
let list = [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

list = tasks.filter(task => task.email === email);

$("#taskList").empty();

if (list.length > 0) {
$.each(list, function (i, task) {
    $("#taskList").append(`
        <tr data-id="${email}" data-name="${task.name}">
            <td>${i+1}</td>
            <td>${task.name}</td>
            <td>${task.discription}</td>
            <td>${task.date}</td>
            <td>${task.status}</td>
            <td>
                <button class="btn btn-edit edit-btn">Edit</button>
                <button class="btn btn-delete delete-btn">Delete</button>
            </td>
        </tr>
    `);
});
}
//  else {
//     $("#taskList").append(`<tr><td colspan="6">No tasks found.</td></tr>`);
// }
}


$(document).ready(function () {
$('#employee').focus();
// Handle employee change
let select = document.getElementById("employee");


select.innerHTML = '<option value="">-- Choose an employee --</option>';

// Loop and add users as options
ad_user.forEach(user => {
    let option = document.createElement("option");
    option.value = user.email; 
    option.textContent = user.name;
    select.appendChild(option);
});
$("#employee").on("change", function () {
currentEmp = $(this).val();
loadTasks(currentEmp);
});

// Edit task
$(document).on("click", ".edit-btn", function () {
const row = $(this).closest("tr");
editingTaskId = row.data("id");
editingTaskname = row.data("name");
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];


let task = allTasks.find(task => task.email== editingTaskId && task.name==editingTaskname);

if (task) {
    // Format as YYYY-MM-DDTHH:MM
    let now = new Date();
    minDateTime = now.toISOString().slice(0, 16); // "2025-04-23T09:30"

    $("#editTitle").val(task.name);
    $("#editDesc").val(task.discription);
    $("#editDeadline").val(task.date+'T'+task.time);
    $('#editDeadline').prop('min',minDateTime)
    $("#editStatus").val(task.status);
    $("#editModal").fadeIn();//it shows a hidden element by increasing it's opasity
}

});

// Save edited task
$("#saveEditBtn").on("click", function () {
const title = $("#editTitle").val();
const desc = $("#editDesc").val();
let deadline = $("#editDeadline").val();
const status = $("#editStatus").val();
if(title=="" || desc=="" || deadline=="" || status==""){
    $('#message').addClass('danger');
    $('#message').text('Make sure all columns are filled..!');
}
else{
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    adminuser=JSON.parse(localStorage.getItem('users'))
    let time=""
        let date=""
        if(deadline){
            date=deadline.split('T')[0];
            time=deadline.split('T')[1];//from the local-datetime date format is YYYY-mm-ddTHH:MM
        }
    let usertask = allTasks.find(task => task.email== editingTaskId && task.name==editingTaskname);
    let user=adminuser.find(user => user.email== editingTaskId);
    let updatedTask = {
        admin:usertask.admin,
        employee_name:user.name,
        email:usertask.email,
        name: title,
        discription: desc,
        priority: usertask.priority,
        date:date,
        time:time,
        status:status
    
    };

    // Find the index of the actual task in allTasks (not just userTasks)
    let originalTask = allTasks.find(task => task.email === usertask.email && task.name==editingTaskname);

    //to get actual index
    let taskIndexInAllTasks = allTasks.findIndex(t => t.name==editingTaskname && t.email == originalTask.email);

    if (taskIndexInAllTasks !== -1) {
        allTasks[taskIndexInAllTasks] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(allTasks));

        $("#editModal").fadeOut();
        loadTasks(currentEmp);
}
}
});

// Delete task
// Delete task
$(document).on("click", ".delete-btn", function () {
if (!confirm("Are you sure you want to delete this task?")) return;

const row = $(this).closest("tr");
const taskId = row.data("id");
const task_name=row.data("name")
// Get all tasks
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Filter out the task to be deleted
let updatedList = allTasks.filter(task => !(task.email === taskId && task.name === task_name));

// Save updated list
localStorage.setItem("tasks", JSON.stringify(updatedList));

// Reload tasks for the current employee
loadTasks(currentEmp);
});


// Close modal
$(".close-btn").on("click", function () {
$("#editModal").fadeOut();
});
});

function sessionclear(){
sessionStorage.removeItem("admin");
window.location.href='./index.html'
}