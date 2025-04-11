 //search
 $('.taskname').on('input', function () {
    let keyword = $(this).val().toLowerCase();

    $('.task-list .tasks').each(function () {//select each task in list
      let taskText = $(this).find('.task').text().toLowerCase();

      if (taskText.includes(keyword)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }); 

     var storedUser = sessionStorage.getItem("user");
var user = JSON.parse(storedUser);

if (user) {
    $('#Login_name').text('Hello ' + user.name);
} else {
    $('#Login_name').text('Hello Guest');
}

var usertasks = localStorage.getItem("tasks");
tasks = JSON.parse(usertasks) || []; 
var userTasks = [];
let comtask=0;
let pentask=0;

tasks.forEach(function(task) {
    if (task.email == user.email) {
        userTasks.push(task);
    }
});
userTasks.forEach(function(task){
    if(task.status=='completed'){
        comtask=comtask+1;
     
    }
    if(task.status=='pending'){
        pentask=pentask+1;
       
    }
})
//set numbers of  tasks
$('#completed').text(comtask);
$('#pending').text(pentask);

var taskListHTML = '';
$('#ttask').text(userTasks.length)

if (userTasks.length > 0) {
    userTasks.forEach(function(task, index) {
    taskListHTML += '<div class="tasks"><span id="name">';
    taskListHTML += '<p id="task" class="task">';
    taskListHTML += task.name + '</span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="time">' + task.priority + '</span>';
    
    const checkedClass = task.status === 'completed' ? 'checked' : '';
    taskListHTML += `<div id="status" class="status ${checkedClass}" data-index="${index}"></div></p>`;
    taskListHTML += '</div>';
    
});

    $('.task-list').html(taskListHTML); 
} else {

    $('.task-list').html('<h2 id="tasks">You have no tasks added</h2><button onclick="window.location.href=\'./add_task.html\'">Add Your Task</button>');
    $('#add_task').css('display','none')
   
}
$('.status').click(function () {
    $(this).toggleClass('checked');//toggle buttons

  
    const index = $(this).data('index');

   
    if ($(this).hasClass('checked')) {
        userTasks[index].status = 'completed';
        comtask=comtask+1;
        pentask=pentask-1;
    } else {
        userTasks[index].status = 'pending';
        pentask=pentask+1;
        comtask=comtask-1;
    }

    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];//fetch all tasks 
    allTasks = allTasks.map(task => {
        if (task.email === user.email && task.name === userTasks[index].name) {//filters usertasks with main tasks
            return userTasks[index]; // Replace with updated task
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    //set task numbers after click
    $('#completed').text(comtask);
    $('#pending').text(pentask)
});

//logout
function sessionclear(){
    sessionStorage.clear();
    location.href='./index.html'
    }