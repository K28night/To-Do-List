$(document).ready(function(){
    $('#taskname').focus();//set focus to search box
    }); 
 
 //search
 let found;
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
    });
     noresult();
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
        
    });
    noresult();
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
      
    });
    noresult();
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
    if (task.email == user.email && task.admin==user.admin) {
        userTasks.push(task);
    }
});
userTasks.forEach(function(task){
    if(task.status.toLowerCase()=='completed'){
        comtask=comtask+1;
    }
    if(task.status.toLowerCase()=='pending'){
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
    taskListHTML += `<div class="tasks priority-${task.priority}"><span id="name" class="">`;
    taskListHTML += '<p id="task" class="task">';
    taskListHTML += `<span class="task-number">${dindex}</span> `;
    taskListHTML += '<span id="task_name">'+task.name + '</span></span><span class="task-description">'+task.discription+'</span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
    
    const checkedClass = task.status === 'Completed' ? 'checked' : '';
    taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass}" data-index="${index}"></div>`;

    //   taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
    //   taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span>`; 
      taskListHTML += '</p></div>';
});

    $('.task-list').html(taskListHTML); 
} else {

    $('.task-list').html('<h2 id="notasks">You have no tasks added by admin</h2>');
    $('#add_task').css('display','none')
   
}
//status updation
let updatestatus=true;
$('#task-list').on('click', '.status', function() {
   
    if (!($(this).hasClass('checked'))) {
    let confirmed = confirm("Are you sure you want to update the task status? This action cannot be undone.");
    if (confirmed) {
        
            $(this).toggleClass('checked');
    const index = $(this).data('index');

        userTasks[index].status = 'Completed';
        
   
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    allTasks = allTasks.map(task => {
        if (task.email === user.email && task.name === userTasks[index].name) {
            return userTasks[index]; // update main list
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    updatestatus=false;
    if($('.status').hasClass('pen')) {
        $('#pend').trigger('click');
    } else if($('.status').hasClass('comp')) {
        $('#comp').trigger('click');
    } else if($('.status').hasClass('total')) {
        $('#total').trigger('click');
    }
    pentask = pentask - 1;
        comtask = comtask + 1;
    // Update task counters
    $('#completed').text(comtask);
    $('#pending').text(pentask);
}

} 
else{
    alert('Ones you completed,changes not allowed')
}
});

//filter completed tasks
$('#comp').click(function(){
    var completed=[];
    userTasks.forEach(function(task) {
        if (task.status == 'Completed') {
            completed.push(task);
        }
    });
  
    let taskListHTML = ""; 
    if(completed.length>0){
        completed.forEach(function(task, index) {
            const dindex = index + 1; //
            taskListHTML += '<div class="tasks"><span id="name">';
            taskListHTML += '<p id="task" class="task">';
            taskListHTML += `<span class="task-number">${dindex}</span> `;
            taskListHTML += '<span id="task_name">'+task.name + '</span></span><span class="task-description" >'+task.discription+'</span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
            
            const checkedClass = task.status === 'Completed' ? 'checked' : '';
            taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} comp" data-index="${index}"></div>`;
       
              // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
            //   taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
            //   taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span>`; 
              taskListHTML += '</p></div>';
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
        if (task.status.toLowerCase() == 'pending') {
            pendingTasks.push(task);
        }
    });
   

    let taskListHTML = ""; 
    if(pendingTasks.length>0){
        pendingTasks.forEach(function(task, index) {
            var dindex = userTasks.findIndex(t => t.name === task.name && t.date === task.date && t.time === task.time);
            taskListHTML += '<div class="tasks"><span id="name">';
            taskListHTML += '<p id="task" class="task">';
            taskListHTML += `<span class="task-number">${dindex}</span> `;
            taskListHTML += '<span id="task_name">'+task.name + '</span></span><span class="task-description" >'+task.discription+'</span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
            
            const checkedClass = task.status === 'Completed' ? 'checked' : '';
            taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} pen" data-index="${dindex}"></div>`;
       
              // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
            //   taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
            //   taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span>`; 
              taskListHTML += '</p></div>';
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
        taskListHTML += `<span class="task-number">${dindex}</span> `;
        taskListHTML += '<span id="task_name">'+task.name + '</span></span><span class="task-description" >'+task.discription+'</span><span id="date">' + task.date + '</span><span id="time">' + task.time + '</span><span id="priority">' + task.priority + '</span>';
        
        const checkedClass = task.status === 'Completed' ? 'checked' : '';
        taskListHTML += `<div id="status" title="Complete the task" class="status ${checkedClass} total" data-index="${index}"></div>`;
       
          // ✏️ Edit Icon and ❌ Delete Icon (with custom classes and data-index for event handling)
        //   taskListHTML += `<span class="edit" data-index="${index}" title="Edit"><i class="fa-solid fa-pen"></i></span>`;
        //   taskListHTML += `<span class="delete" data-index="${index}" title="Delete"><i id='delete' class="fas fa-times danger"></i></span>`; 
          taskListHTML += '</p></div>';
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
    sessionStorage.removeItem("user");
    location.href='./index.html'
    }