$('document').ready(function(){
$('#name').focus();

});
let users =localStorage.getItem('users')

$('#username').on('input',()=>{
  let email=$('#username').val();
  let email_error=$('#email_error');
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if(!gmailRegex.test(email)){
      email_error.removeClass('success').addClass('danger');
      email_error.text('Enter valide Gmail');
      $('#submit').prop("disabled", true);
  }
  else if(email==""){
      email_error.removeClass('success').addClass('danger');
      email_error.text('Name is cannot be null');
      $('#submit').prop("disabled", true);
  }
  else{
      email_error.removeClass('danger').addClass('success')
      email_error.text('Gmail Validation Success')
      $('#submit').prop("disabled", false);
  }
});

 $('#name').on('input',()=>{
  let name=$('#name').val();
  let name_error=$('#name_err');
  var regex = /^[A-Za-z _]+$/;
  if(!regex.test(name)){
      name_error.removeClass('success').addClass('danger');
      name_error.text('Name contains only alphabet');
      $('#submit').prop("disabled", true);
  }
  else if(name==""){
      name_error.removeClass('success').addClass('danger');
      name_error.text('Name is cannot be null');
      $('#submit').prop("disabled", true);
  }
  else{
      name_error.addClass('success');
      name_error.text('Valid Name validation success');
      $('#submit').prop("disabled", false);
  }
 });
 let pass="";
 $('#pass').on('input',()=>{
   pass=$('#pass').val();
  let pass1=$('#password_err');
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
  var regex = /\d/
  if(pass.length<8){
     pass1.removeClass('success').addClass('danger');
     pass1.text('Password must be 8 characters');
     $('#submit').prop("disabled", true);
  }
  else if(!passwordRegex.test(pass)){
      pass1.removeClass('success').addClass('danger');
      pass1.text('have one capital and small letters');
      $('#submit').prop("disabled",true);
  }
  else if(!regex.test(pass)){
     pass1.removeClass('success').addClass('danger');
     pass1.text('password must contain numbers')
     $('#submit').prop("disabled", true);
  }
  else{
      pass1.removeClass('danger').addClass('success');
      pass1.text('Password Validation Success');
      $('#submit').prop("disabled", false);
  }
});
$('#confirm_password').on('input',()=>{
    confirm_password=$('#confirm_password').val();
   let pass1=$('#confirm_password_err');
   if(pass==confirm_password){
      pass1.removeClass('danger').addClass('success');
      pass1.text('Password Validation Success');
      $('#submit').prop("disabled", false);
   }
   else{
       pass1.removeClass('success').addClass('danger');
       pass1.text('Password must be same');
       $('#submit').prop("disabled", true);
   }
 });
$('#submit').click(function() {
    var storedUser = sessionStorage.getItem("admin");
    var admin = JSON.parse(storedUser);
    if(!sessionStorage.getItem('edit_employee')){
        event.preventDefault();
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let name = $('#name').val();
        let email = $('#username').val();
        let pass = $('#pass').val();
        let confirm_password = $('#confirm_password').val();
        let position = $('#position').val();
        let department = $('#department').val();
        if(name=="" && email=="" || pass=="" || position=="" || department=="" || confirm_password==""){
            $('#registered').addClass('danger')
            $('#registered').text('First you fill out the form..!'); 
        }
        else{
            var userData = {
                admin:admin.username,
                name: name,
                position:position,
                department:department,
                email: email,
                password: pass
            };

            users.push(userData);

            localStorage.setItem("users", JSON.stringify(users)); 

            $('#registered').addClass('success');
            $('#registered').text('Registration Success');
        }
        sessionStorage.removeItem("edit_employee");
    }
    else{
        event.preventDefault();
        let allTasks = JSON.parse(localStorage.getItem("users")) || [];
        // let storedUser = sessionStorage.getItem("user");
        // let user = JSON.parse(storedUser);
        let edit = JSON.parse(sessionStorage.getItem("edit_employee"));
        let index = edit.index;
    
        let name = $('#name').val();
        let email = $('#username').val();
        let pass = $('#pass').val();
        let confirm_password = $('#confirm_password').val();
        let position = $('#position').val();
        let department = $('#department').val();
        if(name=="" && email=="" || pass=="" || position=="" || department=="" || confirm_password==""){
            $('#message').addClass('danger');
            $('#message').text('Make sure all columns are filled..!');
        }
        else{
          
            let updatedTask = {
                admin:admin.username,
                name: name,
                position:position,
                department:department,
                email: email,
                password: pass
            };

            // Find the index of the actual task in allTasks (not just userTasks)
            let originalTask = allTasks.find(task => task.admin == edit.admin && task.email === edit.tname);

            //to get actual index
            let taskIndexInAllTasks = allTasks.findIndex(t => t.admin == originalTask.admin && t.email == originalTask.email);

            if (taskIndexInAllTasks !== -1) {
                allTasks[taskIndexInAllTasks] = updatedTask;
                localStorage.setItem("users", JSON.stringify(allTasks));
   
                $('#message').addClass('success');
                $('#message').text('User Updation Success');
                sessionStorage.removeItem("edit_employee");
                setTimeout(function () {
                    window.location.href = '../templates/admin_dash.html';
                    }, 1000);
            }
        }
    }
});
$('#login').click(function(){
    sessionStorage.removeItem("edit_employee");
    window.location.href="../templates/admin_dash.html"
    
});
//edit employee
if (sessionStorage.getItem('edit_employee')) {
    var storedUser = sessionStorage.getItem("admin");
    var user = JSON.parse(storedUser);

    var edit = sessionStorage.getItem("edit_employee");
    var editEmployee = JSON.parse(edit);

    var usertasks = localStorage.getItem("users");
    var tasks = JSON.parse(usertasks) || []; 
    var adminuser = [];

    tasks.forEach(function(task) {
        if (editEmployee.admin == user.username && task.email == editEmployee.tname) {
            adminuser.push(task);
        }
    });

    // Fill form with editEmployee data
    $('#name').val(adminuser[editEmployee.index].name);
    $('#username').val(adminuser[editEmployee.index].email);
    $('#pass').val(adminuser[editEmployee.index].password);
    pass=adminuser[editEmployee.index].password;
    $('#position').val(adminuser[editEmployee.index].position);
    $('#department').val(adminuser[editEmployee.index].department);
}
