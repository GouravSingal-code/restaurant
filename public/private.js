AOS.init({
   duration:3000,
})



        $(document).ready(function(){

         $("#line").click(function(){
         anime({
           targets: '#information',
           opacity: 0.2,
           duration: 100
          })
         $("#expand").css("display","block");
         $(this).css("display","none");
         $("#cross").css("display","block");
         console.log(window.outerWidth);
         if( window.outerWidth > 414 ){
          anime({
           targets: '#expand',
           right: 120,
           duration: 1000
          });
         }else{
          console.log(414);
          anime({
           targets: '#expand',
           right: -20,
           duration: 1000
          });
         }
     })

      $("#cross").click(function(){

         $(this).css("display","none");
          anime({
           targets: '#information',
           opacity: 1,
           duration: 100
          })
         $("#line").css("display","block");
          anime({
           targets: '#expand',
           right: -190,
           duration: 1000
          });
         $("#expand").css("display","none");
      })
})



function name1(){
var letters = /^[A-Za-z]+$/
if( document.getElementById("name").value.match(letters) ){
    document.getElementById("n1").style.backgroundColor="green";
}

if( document.getElementById("name").value=='' ){
    document.getElementById("n1").style.backgroundColor="red";

}
}


function email1(){
 if( document.getElementById("email").value!='' ){
   document.getElementById("e1").style.backgroundColor="green";

 }

 else{
   document.getElementById("e1").style.backgroundColor="red";

 }
}

function contact1(){
var phoneno = /^\d{10}$/;
if( document.getElementById("contact").value.match(phoneno)  ){
    document.getElementById("c1").style.backgroundColor = "green";

}

if( document.getElementById("contact").value=='' ){
    document.getElementById("c1").style.backgroundColor = "red";

}
}

function guest1(){

if(  document.getElementById("guest").value !='' &&   document.getElementById("guest").value !='e'  ){
    document.getElementById("g1").style.backgroundColor = "green";

}

if( document.getElementById("guest").value=='' ){
    document.getElementById("g1").style.backgroundColor = "red";

}
}


function theme1(){
 if( document.getElementById("theme").value!='' ){
   document.getElementById("t1").style.backgroundColor="green";

 }

 else{
   document.getElementById("t1").style.backgroundColor="red";

 }
}

function date1(){
 if( document.getElementById("date").value!='' ){
   document.getElementById("d1").style.backgroundColor="green";

 }

 else{
   document.getElementById("d1").style.backgroundColor="red";
 }
}



document.getElementById("private").addEventListener("submit" , submitform );

function submitform(e){
    e.preventDefault();




    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const date = document.getElementById("date").value;
    const theme = document.getElementById("theme").value;
    const stime = document.getElementById("stime").value;
    const etime = document.getElementById("etime").value;
    const guest = document.getElementById("guest").value;
    const recaptcha = document.querySelector("#g-recaptcha-response").value;

    fetch('/meeting'  , {
        method:'POST',
        enctype:'multipart/form-data',
        headers:{
            'Accept':'application/json , text/plain , text/html */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({name:name,email:email,contact:contact,date:date,theme:theme,stime:stime,etime:etime,guest:guest,recaptcha:recaptcha})
    })
    .then(res =>{
        return res.json();
    })
    .then( data=>{

            if( data.success==true ){
               window.alert("Your request is succesfully submitted! You will Notified further via mobile or email");
               document.getElementById("first").style.display="none";
               document.getElementById("second").style.display="block";
               document.getElementById("board").style.backgroundImage="linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)";
               window.scrollTo(0,document.body.scrollHeight);
            }

            else{
                window.alert(data.msg);
            }

    })
}
