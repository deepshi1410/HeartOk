function init(){
    Parse.initialize("heartokgoku");
    Parse.serverURL="https://testgovind.herokuapp.com/parse";
    var currentUser = Parse.User.current();
  if (currentUser){
    location.href = "Data.html";
  }
 //   Parse.User.logOut();
}
async function signUp(){
  var username = document.getElementById("username").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var type = document.querySelector('input[name="type"]:checked').value;

  if(document.getElementById("btn").innerHTML=="Sign Up"){
  var repassword = document.getElementById("repassword").value;
  if(password!=repassword){
    toastr.warning("Password don't match");
    document.getElementById("wrongpass").innerHTML="Enter Correct Username and Password";

    return;
  }
  if(username.trim()==""){
    toastr.warning("Enter Username");
    document.getElementById("wrongpass").innerHTML="Enter Correct Username and Password";
  return;
  }

  if(name.trim()==""){
    toastr.warning("Enter Username");
    document.getElementById("wrongpass").innerHTML="Enter Correct Username and Password";
  return;
  }
  var accountType =true;
  if(type != "Patient"){
    accountType = false;
  }

var user = new Parse.User();
user.set("username",  username);
user.set("password", password);
user.set("Name",name);
user.set("Type",accountType);
try {
  await user.signUp();
  console.log("Success");
  location.href = "Data.html";
toastr.success("Sign up Successfully");
} catch (error) {
  // Show the error message somewhere and let the user try again.
  alert("Error: " + error.code + " " + error.message);
}
}else{
  Parse.User.logIn(username, password, {
    success: function(user) {
    
        location.href = "Data.html";
      
      console.log("Login Success");
    },
    error: function(user, error) {
      console.log(error.message);
      document.getElementById("wrongpass").innerHTML="Enter Correct Username and Password";
    }
    });
}
}

function loginSetup(){
  document.getElementById("wrongpass").innerHTML="";
  if(document.getElementById("btn").innerHTML=="Sign Up"){
    document.getElementById("heading").innerHTML="Login";
  document.getElementById("divrepassword").style.display = "none";
  document.getElementById("divname").style.display = "none";
  document.getElementById("accountType").style.display = "none";
  document.getElementById("btn").innerHTML="Login";
  document.getElementById("setup").style.display = "none";
  /*document.getElementById("setup").innerHTML = "New User? Sign Up";*/
  }else{
    document.getElementById("heading").innerHTML="Sign Up";
    document.getElementById("divrepassword").style.display = "block";
  document.getElementById("btn").innerHTML="Sign Up";
  }
}
