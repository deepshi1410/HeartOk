function init(){
    Parse.initialize("heartokgoku");
    Parse.serverURL="https://testgovind.herokuapp.com/parse";
 //   Parse.User.logOut();
}

function fetch(){
    var q = new Parse.Query("Data");
  q.equalTo("UserId", Parse.User.current().get("username"));
  q.descending("createdAt");
  q.limit(10000);
  q.find({
    success: function(result) {
        document.getElementById("post").innerHTML="";
        var post="";
        for(var i=0;i<result.length;i++){
            var object = result[i];
            var date=object.get("updatedAt");
            var record=object.get("Records").url();
            var uploadBy=object.get("UploadBy");
            var title=object.get("Title");
            if(record.indexOf("jpg")!=-1 || record.indexOf("png")!=-1){
                post+="<div class=\"container\"><div id=\"title\">"+title+"</div><div id=\"upload-container\">Upload By: "+uploadBy+"</div><div id=\"Date\"> Upload on: "+date+"</div><div><img src="+record+" id=\"imgRecord\" height=\"500\"/></div><div id=\"div-btn\"><input type=\"button\" id=\"view\" onclick=window.open(\""+record+"\") value = \"View Report\"/></div></div>";
            }else{
            post+="<div class=\"container\"><div id=\"title\">"+title+"</div><div id=\"upload-container\">Upload By: "+uploadBy+"</div><div id=\"Date\"> Upload on: "+date+"</div><div style=\"clear:both\"><iframe id=\"record\" src="+record+" scrolling=\"no\" frameborder=\"0\" width=\"100%\" height=\"500\" style=\"overflow:hidden;\"></iframe></div><div id=\"div-btn\"><input type=\"button\" id=\"view\" onclick=window.open(\""+record+"\") value = \"View Report\"/></div></div>";
   
        }
        }
       // document.getElementById("record").scrolling="no";
        document.getElementById("post").innerHTML=post;
    }
});
}

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

function hidepopup() {
    document.querySelector('.bg-upload').style.display = 'none';
}

function showpopup() {
    document.querySelector('.bg-upload').style.display = 'flex';
    var d = new Date();
    document.getElementById("date").value=d;
}
function pre() {
    if (document.getElementById("save").files.length > 0){
    pdffile=document.getElementById("save").files[0];
    pdffile_url=URL.createObjectURL(pdffile);
    $('#viewer').attr('src',pdffile_url);
    }
}

function popup(){
    if(document.getElementById("uploadBy").value==""){
        toastr.warning("Enter Name");
        return;
    }
    if(document.getElementById("uploadReason").value==""){
        toastr.warning("Enter Name");
        return;
    }
    if (document.getElementById("save").files.length > 0) {
        var file = document.getElementById("save").files[0];
        var name = "photo";
        var parseFile = new Parse.File(name, file);
        var user = Parse.Object.extend("Data");
        var active = new user();
        active.set("UserId",Parse.User.current().get("username"));
        active.set("Records",parseFile);
        active.set("UploadBy",document.getElementById("uploadBy").value);
        active.set("Title",document.getElementById("uploadReason").value);
        active.save().then(function() {
            console.log("Success upload");
            toastr.success("Successfully upload");

            hidepopup();
            fetch();
        }, function(error) {
            toastr.warning(error);
            console.log(error);
          });
      }
}



