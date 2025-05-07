$('#view_task').click(function(){
    window.location.href="../templates/view_each_employee.html"
});
$('#register').click(function(){
    window.location.href="../templates/register.html"
})

    var storedUser = sessionStorage.getItem("admin");
var admin = JSON.parse(storedUser);

if (admin) {
    $('#Login_name').text( admin.username+"'s Dashboard");
} else {
    $('#Login_name').text('Admin Dashboard');
}

var alladmintasks = localStorage.getItem("users");
tasks = JSON.parse(alladmintasks) || []; 
var adminTasks = [];
// let comtask=0;
// let pentask=0;

tasks.forEach(function(task) {
    if (task.admin == admin.username) {
        adminTasks.push(task);
    }
});

let taskListHTML = ""; 
    if (adminTasks.length > 0) {
        adminTasks.forEach(function(task, index) {
            var dindex=index+1;
        taskListHTML += '<tr>';
        taskListHTML += '<p id="task" class="task">';
        taskListHTML += `<td>${dindex}</td> `;
        taskListHTML += '<td>'+task.name + '</td><td>' + task.email + '</td><td>' + task.position + '</td>' ;
        
           taskListHTML += `<td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="assign-btn" data-index="${index}" title="Assign Task">Assign Task</button>
         <button class="delete-btn" data-index="${index}">Delete</button></td>
          
          
          </tr>`;
    });
    
        $('tbody').html(taskListHTML); 
    } else {
    
        $('tbody').html('<h3 id="notasks">You have no employees added</h3>');
       
       
    }
//delete
$('.delete-btn').click(function(){
let confirmed=confirm('Are you sure that delete the seleted user');
if(confirmed){
    let index = $(this).data('index');
    let updatedTasks = adminTasks.filter((task) => {
            return !(task.admin === admin.username && task.email === adminTasks[index].email);
        });
    localStorage.setItem("users", JSON.stringify(updatedTasks));
    location.reload();
    }
        
});
//edit employee
$(document).on('click', '.edit-btn', function () {
    let confirmed=confirm('Are you sure that edit the seleted user');
if(confirmed){
    let index = $(this).data('index');
    var sessionedit = {
        admin:admin.username,
        index: index,
        tname: adminTasks[index].email,
        adminTasks:adminTasks
        };
        sessionStorage.setItem("edit_employee", JSON.stringify(sessionedit));
        
        window.location.href="../templates/register.html";
    }
});
//assign Task

$('.assign-btn').click(function(){
    let index = $(this).data('index');
    var sessionedit = {
        admin:admin.username,
        index: index,
        email: adminTasks[index].email,
        adminTasks:adminTasks
        };
        sessionStorage.setItem("assign", JSON.stringify(sessionedit));
        window.location.href="../templates/add_task.html";
});

//search
function filterEmployees() {
    const input = document.getElementById("employeeSearch");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("employeeTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const row = tr[i];
        const tdName = row.cells[1]?.textContent.toLowerCase();
        const tdEmail = row.cells[2]?.textContent.toLowerCase();
        const tdRole = row.cells[3]?.textContent.toLowerCase();

        if (
            tdName.includes(filter) ||
            tdEmail.includes(filter) ||
            tdRole.includes(filter)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function sessionclear(){
    sessionStorage.removeItem("admin");
    window.location.href='./index.html'
    }