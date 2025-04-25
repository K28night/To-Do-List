$(document).ready(function() {
      
    $('#task_name').focus();//set focus to search box

    let now = new Date();//creating new object

    // Format as YYYY-MM-DDTHH:MM
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');//months are starting with zero index
    let day = String(now.getDate()).padStart(2, '0');//single digits are padded with 0 (4 to 04) 
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');

    let minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    if(sessionStorage.getItem('assign')){
        var assign=sessionStorage.getItem("assign");
        var employee_task = JSON.parse(assign);
        admin_user=JSON.parse(localStorage.getItem('users'))
                user=admin_user.find((task) => {
                    return (task.admin == employee_task.admin && task.email == employee_task.email);
                });
        
        $('#em_name').val(user.name);;
        $('#email').val(employee_task.email)
    }
    $('#shedule').attr('min', minDateTime);
});

    $('#submit').click(function() {
        event.preventDefault();
        if(!sessionStorage.getItem('edit')){
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            let name = $('#task_name').val();
            let dis = $('#task_dis').val();
            let pri = $('#priority').val();
            let dateTime = $('#shedule').val();
            if(name==""|| dis=="" || pri=="" || dateTime==""){
                $('#message').addClass('danger');
                $('#message').text('Make sure all columns are filled..!');
            }
            else{
                let time=""
                let date=""
                if(dateTime){
                    date=dateTime.split('T')[0];
                    time=dateTime.split('T')[1];//from the local-datetime date format is YYYY-mm-ddTHH:MM
                }
                var assign=sessionStorage.getItem("assign");
                var employee_task = JSON.parse(assign);
               admin_user=JSON.parse(localStorage.getItem('users'))
                user=admin_user.filter((task) => {
                    return (task.admin == employee_task.admin && task.email == employee_task.email);
                });
                if (assign) {
                    var taskData = {
                        admin:employee_task.admin,
                        employee_name:user.name,
                        email:employee_task.email,
                        name: name,
                        discription: dis,
                        priority: pri,
                        date:date,
                        time:time,
                        status:'Pending'
                };
                tasks.push(taskData);
                localStorage.setItem("tasks", JSON.stringify(tasks)); 
                $('#message').addClass('success');
                $('#message').text('Task Registration Success');
                sessionStorage.removeItem("assign");
                setTimeout(function () {
                    window.location.href = './admin_dash.html';
                    }, 1000);
                }
            }
        }
        else{
            let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let storedUser = sessionStorage.getItem("user");
            let user = JSON.parse(storedUser);
            let edit = JSON.parse(sessionStorage.getItem("edit"));
            let index = edit.index;
        
            let name = $('#task_name').val();
            let dis = $('#task_dis').val();
            let pri = $('#priority').val();
            let dateTime = $('#shedule').val();
            if(name==""|| dis=="" || pri=="" || dateTime==""){
                $('#message').addClass('danger');
                $('#message').text('Make sure all columns are filled..!');
            }
            else{
                let time=""
                let date=""
                if(dateTime){
                    date=dateTime.split('T')[0];
                    time=dateTime.split('T')[1];//from the local-datetime date format is YYYY-mm-ddTHH:MM
                }
                let updatedTask = {
                name: name,
                discription:dis,
                date: date,
                time: time,
                priority: pri,
                email: user.email,
                status: "Pending"
                };

                // Find the index of the actual task in allTasks (not just userTasks)
                let userTasks = allTasks.filter(task => task.email === user.email);
                let originalTask = userTasks[index];

                let taskIndexInAllTasks = allTasks.findIndex(t => t.email === originalTask.email && t.name === originalTask.name && t.date === originalTask.date);//to get actual index

                if (taskIndexInAllTasks !== -1) {
                    allTasks[taskIndexInAllTasks] = updatedTask;
                    localStorage.setItem("tasks", JSON.stringify(allTasks));
       
                    $('#message').addClass('success');
                    $('#message').text('Task Updation Success');
                    sessionStorage.removeItem("edit");
                    setTimeout(function () {
                        window.location.href = './welcome.html';
                        }, 1000);
                }
            }
        }
    });


if(sessionStorage.getItem('edit')){
    var storedUser = sessionStorage.getItem("user");
    var user = JSON.parse(storedUser);

    var edit=sessionStorage.getItem("edit");
    var edit=JSON.parse(edit);

    var usertasks = localStorage.getItem("tasks");
    tasks = JSON.parse(usertasks) || []; 
    var userTasks = [];

tasks.forEach(function(task) {
    if (task.email == user.email) {
        userTasks.push(task);
    }
});

$('#task_name').val(userTasks[edit.index].name);
$('#task_dis').val(userTasks[edit.index].discription);
$('#priority').val(userTasks[edit.index].priority);
$('#shedule').val(userTasks[edit.index].date+'T'+userTasks[edit.index].time); 


}
$('#dashboard').click(function(){
    sessionStorage.removeItem("assign");
    location.href="../templates/admin_dash.html"
});

function sessionclear(){
        sessionStorage.clear();
        location.href='./index.html'
    }
    // document.getElementById("submit").addEventListener("click",()=>{
    //    let name=(document.getElementById('task_name'))?document.getElementById('task_name').value:'';
    //    let discription=(document.getElementById('task_dis'))?document.getElementById('task_dis').value:'';
    //    let datetime=(document.getElementById('shedule'))?document.getElementById('shedule').value:'';
    //    const currentdate=new Date()
    //    let current=currentdate.toISOString().slice(0,16);//to convert the datetime to ISO 8601 format(YYYY-MM-DDTHH:mm:ss.sssZ)year-month-day-hours:minits:seconds.3-digit milliseconds.time is in UTC
    //    //  example  2025-04-01T10:30:45.123Z
    //    if(current>datetime){
    //     let msg=document.getElementById('message')
    //     msg.text('Date not to be in past');
    //     msg.css('color','red');
    //    }
    // });