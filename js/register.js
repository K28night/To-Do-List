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
 let pass;
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
    
let users = JSON.parse(localStorage.getItem('users')) || [];
let name = $('#name').val();
let email = $('#username').val();
let pass = $('#pass').val();
let confirm_password = $('#confirm_password').val();
let position = $('#position').val();
let department = $('#department').val();
if(name=="" && email=="" || pass=="" || position=="" || department=="" ||confirm_password==""){
    $('#registered').addClass('danger')
    $('#registered').text('First you fill out the form..!'); 
}
else{
var userData = {
    admin:admin,
    name: name,
    email: email,
    password: pass
};

users.push(userData);

localStorage.setItem("users", JSON.stringify(users)); 

$('#registered').addClass('success');
$('#registered').text('Registration Success');
}
});