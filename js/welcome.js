$(document).ready(function(){
    $('#taskname').focus();//set focus to search box
    }); 
 
 //search
 let found=false;
 $('.noresult').css('display','none');
    $('.taskname').on('input', function () {
    let keyword = $(this).val().toLowerCase();
    
    $('.task-list .tasks').each(function () {//select each task in list
      let taskText = $(this).find('.task').text().toLowerCase();

      if (taskText.includes(keyword)) {
        $(this).show();
        found=true;
      } else {
        found=false;
        $(this).hide();
      }
      noresult();
    });
  }); 
  //search by date
$('.taskdate').on("input",function(){
    let date=$(this).val();
    $('.task-list .tasks').each(function(){
        let taskdate=$(this).find('.task').text()
        if(taskdate.includes(date)){
            $(this).show();
            found=true;
        }
        else{
            found=false;
            $(this).hide();
        }
        noresult();
    });
});
//search with priority
$('.task_pri').on('input', function () {
    let keyword = $(this).val().toLowerCase();
    
    $('.task-list .tasks').each(function () {//select each task in list
      let taskText = $(this).find('.task').text().toLowerCase();

      if (taskText.includes(keyword)) {
        $(this).show();
        found=true;
      } else {
        found=false;
        $(this).hide();
      }
      noresult();
    });
  }); 
  function noresult(){
    if(found){
        $('.noresult').css('display','none');
    }
    else{
        $('.noresult').css('display','flex');
    }
}
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
    var dindex=index+1;
    taskListHTML += '<div class="tasks"><span id="name">';
    taskListHTML += '<p id="task" class="task">';
    taskListHTML += `<span class="task-number">#${dindex}</span> `;
    taskListHTML += '<span id="task_name">'+task.name + '</span></span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
    
    const checkedClass = task.status === 'completed' ? 'checked' : '';
    taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass}" data-index="${index}"></div>`;
   
      // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
      taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
      taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span></p>`; 
      taskListHTML += '</div>';
});

    $('.task-list').html(taskListHTML); 
} else {

    $('.task-list').html('<h2 id="notasks">You have no tasks added</h2><button id="notask" onclick="window.location.href=\'./add_task.html\'">Add Your Task</button>');
    $('#add_task').css('display','none')
   
}
//status updation
$('#task-list').on('click', '.status', function() {
    $(this).toggleClass('checked'); 

    const index = $(this).data('index');

    if ($(this).hasClass('checked')) {
        userTasks[index].status = 'completed';
        comtask = comtask + 1;
        pentask = pentask - 1;
    } else {
        userTasks[index].status = 'pending';
        pentask = pentask + 1;
        comtask = comtask - 1;
    }

    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks = allTasks.map(task => {
        if (task.email === user.email && task.name === userTasks[index].name) {
            return userTasks[index]; // update main list
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
   
    if($('.status').hasClass('pen')) {
        $('#completed').text("comtask");
        $('#pend').trigger('click');
    } else if($('.status').hasClass('comp')) {
        $('#comp').trigger('click');
    } else if($('.status').hasClass('total')) {
        $('#total').trigger('click');
    }
    
    // Update task counters
    $('#completed').text(comtask);
    $('#pending').text(pentask);
});

//delete task
$('#task-list').on('click', '.delete', function() {
    let confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        let index = $(this).data('index');
        let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let user = JSON.parse(sessionStorage.getItem("user")) || {};

        // Filter user-specific tasks to access the correct one by index
        let userTasks = allTasks.filter(task => task.email === user.email);

        // Filter out the task to be deleted
        let updatedTasks = allTasks.filter((task) => {
            return !(task.email === user.email && task.name === userTasks[index].name);
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        location.reload();
    }
});

//edit task
$('#task-list').on('click', '.edit', function() {
    let index = $(this).data('index');
    var sessionedit = {
        index: index,
        tname: userTasks.name,
        userTasks:userTasks
        };
        sessionStorage.setItem("edit", JSON.stringify(sessionedit));
        window.location.href="../templates/add_task.html"
});
 
//filter completed tasks
$('#comp').click(function(){
    var completed=[];
    userTasks.forEach(function(task) {
        if (task.status == 'completed') {
            completed.push(task);
        }
    });
  
    let taskListHTML = ""; 
    if(completed.length>0){
        completed.forEach(function(task, index) {
            const dindex = index + 1; //
            taskListHTML += '<div class="tasks"><span id="name">';
            taskListHTML += '<p id="task" class="task">';
            taskListHTML += `<span class="task-number">#${dindex}</span> `;
            taskListHTML += '<span id="task_name">'+task.name + '</span></span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
            
            const checkedClass = task.status === 'completed' ? 'checked' : '';
            taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} comp" data-index="${index}"></div>`;
       
              // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
              taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
              taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span></p>`; 
              taskListHTML += '</div>';
        });
    
        $('#task-list').html(taskListHTML); 
    }else {
    
        $('.task-list').html('<h2 id="notasks">You have no completed tasks</h2>');
      
        }
});


//filter pending task
$('#pend').click(function(){
    var pendingTasks = [];
    userTasks.forEach(function(task) {
        if (task.status == 'pending') {
            pendingTasks.push(task);
        }
    });
   

    let taskListHTML = ""; 
    if(pendingTasks.length>0){
        pendingTasks.forEach(function(task, index) {
            var dindex=index+1;
            taskListHTML += '<div class="tasks"><span id="name">';
            taskListHTML += '<p id="task" class="task">';
            taskListHTML += `<span class="task-number">#${dindex}</span> `;
            taskListHTML += '<span id="task_name">'+task.name + '</span></span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
            
            const checkedClass = task.status === 'completed' ? 'checked' : '';
            taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} pen" data-index="${index}"></div>`;
       
              // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
              taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
              taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span></p>`; 
              taskListHTML += '</div>';
        });
    
        $('#task-list').html(taskListHTML); 
    }else {
    
        $('.task-list').html('<h2 id="notasks">You have no pending tasks</h2>');
       
        }
});

//filter total tasks
$('#total').click(function(){
   
    let taskListHTML = ""; 
    if (userTasks.length > 0) {
        userTasks.forEach(function(task, index) {
            var dindex=index+1;
        taskListHTML += '<div class="tasks"><span id="name">';
        taskListHTML += '<p id="task" class="task">';
        taskListHTML += `<span class="task-number">#${dindex}</span> `;
        taskListHTML += '<span id="task_name">'+task.name + '</span></span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
        
        const checkedClass = task.status === 'completed' ? 'checked' : '';
        taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} total" data-index="${index}"></div>`;
       
          // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
          taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
          taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span></p>`; 
          taskListHTML += '</div>';
    });
    
        $('.task-list').html(taskListHTML); 
    } else {
    
        $('.task-list').html('<h2 id="notasks">You have no tasks added</h2><button id="notask" onclick="window.location.href=\'./add_task.html\'">Add Your Task</button>');
        $('#add_task').css('display','none');
       
    }
});
//     localStorage.setItem("tasks", JSON.stringify(allTasks));
//    //delete one indexed element
//     $('#Login_name').text('Hello ' + allTasks);
//     localStorage.setItem("tasks", JSON.stringify(allTasks));
//     // location.reload();
// });
//logout
function sessionclear(){
    sessionStorage.clear();
    location.href='./index.html'
    }