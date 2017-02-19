/*Select all editable elements, and refresh the content from the database*/
//console.log("making edits");

function userExecute(myfunction)
{
    jQuery.ajax({
        type: "GET",
        url: './php/getUser.php',
        success: function (data) {
            if(data == 1 )
            {
                myfunction()
            }else
            {
                return;
            }
        },error: function(e){
            return 0;
        }
    });
}
function loadUserFunctions(){
  //  var css='<link href="./css/editable.css" type="text/css" rel="stylesheet" media="screen,projection"/>';
    $.getScript("./js/editContent.js");
 //   $("head").append(css);
}
loadUserFunctions();





var editables = $("ul.editable,ol.editable,h1.editable,h2.editable,h3.editable,h4.editable,h5.editable,h6.editable,p.editable,div.editable");
editables.each(function(){
    getContent($(this));
});
function getContent(elem)
{
    //console.log("getContent: "+elem[0].innerHTML);
    $.ajax({
        url: './php/getContent.php',
        type: 'GET',
        data: {
            "id": '"'+elem[0].id+'"',
            "content": '"'+elem[0].innerHTML+'"'
        },
        success: function(data) {
            var out = data;
            elem[0].innerHTML = out;
            elem.find('.submitButton').remove();
            userExecute(function(){addEditButton(elem)} );
        },
        error: function(e) {
            alert("oops");
        }
    });
}
