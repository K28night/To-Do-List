$('document').ready(function(){
    $('#username').focus();
    });
    var admin=[
            {username:'admin',password:'123'},
            {username:'admin123',password:'1234'}
        ];
    $('#submit').click(function(event) {
        event.preventDefault();
       
        var email = $('#username').val();
        var pass = $('#password').val();
        let isValid = admin.find(a => a.username === email && a.password === pass);
        if(email==""||pass==""){
            $("#login").text("Enter username and password..!").css("color", "red");
        }
        else{
        if(isValid)
        {
            $("#login").text("Welcome Admin ").css("color", "green");
            var sessionadmin = {
                username: email,
                };
                sessionStorage.setItem("admin", JSON.stringify(sessionadmin));

                // Optional delay before redirecting
                setTimeout(function () {
                window.location.href = '../templates/admin_dash.html';
                }, 1000); // 1 second delay
        
        }
        else{
        // Retrieve stored user data from localStorage
        var storedUser = localStorage.getItem("users");
    
            if (storedUser) {
                var users = JSON.parse(storedUser); // Parse array of users
    
                // Check if any user matches the credentials
                var foundUser = null;
    
                for (var i = 0; i < users.length; i++) {
                    if (users[i].email == email && users[i].password == pass) {
                        foundUser = users[i];
                        break; // stop loop once found
                    }
                }
    
                if (foundUser) {
                    $("#login").text("Login successful! ").css("color", "green");
    
                    var sessionUser = {
                    admin:foundUser.admin,
                    name: foundUser.name,
                    email: foundUser.email
                    };
                    sessionStorage.setItem("user", JSON.stringify(sessionUser));
    
                    // Optional delay before redirecting
                    setTimeout(function () {
                    window.location.href = './welcome.html';
                    }, 1000); // 1 second delay
                } else {
                $("#login").text("Invalid email or password.").css("color", "red");
            }
        } else {
            $("#login").text("No user found. Please register first.").css("color", "red");
        }
    }
}
    });