var type = "";
function home(){
    if((document.getElementById("dataframe").src).indexOf(type)==-1){
    document.getElementById("dataframe").src=type;
    }
}

function check(){
    if((document.getElementById("dataframe").src).indexOf("https://heartok.shinyapps.io/Heart/")==-1){
    document.getElementById("dataframe").src="https://heartok.shinyapps.io/Heart/";
    }
}

function medicine(){
  if((document.getElementById("dataframe").src).indexOf("http://0.0.0.0:4444")==-1){
    document.getElementById("dataframe").src="http://0.0.0.0:4444";
    }
}

function onLoad(){
    Parse.initialize("heartokgoku");
    Parse.serverURL="https://testgovind.herokuapp.com/parse";
    var currentUser = Parse.User.current();
  if (currentUser.get("Type")){
    type="record.html";
  }else{
    type="Doctor.html";
  }
  document.getElementById("frame").innerHTML="<iframe src="+type+" id=\"dataframe\" frameborder=\"0\" height=\"100%\" width=\"100%\"></iframe>"    

}

function logout(){
    Parse.User.logOut();
    location.href= "index.html";
  }