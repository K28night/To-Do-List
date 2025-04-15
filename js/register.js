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
  var regex = /^[A-Za-z]+$/;
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
 $('#pass').on('input',()=>{
  let pass=$('#pass').val();
  let pass1=$('#pass1');
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
  var regex = /\d/
  if(pass.length<8){
     pass1.removeClass('success').addClass('danger');
     pass1.text('Password must contain 8 characters');
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
$('#submit').click(function() {
let users = JSON.parse(localStorage.getItem('users')) || [];
let name = $('#name').val();
let email = $('#username').val();
let pass = $('#pass').val();

var userData = {
  name: name,
  email: email,
  password: pass
};

users.push(userData);
localStorage.setItem("users", JSON.stringify(users)); 
window.location.href='login.html'
$('#registered').addClass('success');
$('#registered').text('Registration Success');


});