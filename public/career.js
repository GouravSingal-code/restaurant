
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

 if( window.outerWidth > 414 ){
  anime({
   targets: '#expand',
   right: 120,
   duration: 1000
  });
 }else{
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
    document.getElementById("n2").style.display="inline-block";
}

if( document.getElementById("name").value=='' ){
    document.getElementById("n1").style.backgroundColor="red";
    document.getElementById("n2").style.display="none";
}
}


function email1(){
 if( document.getElementById("email").value!='' ){
   document.getElementById("e1").style.backgroundColor="green";
   document.getElementById("e2").style.display="inline-block";
 }

 else{
   document.getElementById("e1").style.backgroundColor="red";
   document.getElementById("e2").style.display="none";
 }
}

function contact1(){
var phoneno = /^\d{10}$/;
if( document.getElementById("contact").value.match(phoneno)  ){
    document.getElementById("c1").style.backgroundColor = "green";
    document.getElementById("c2").style.display="inline-block";
}

if( document.getElementById("contact").value=='' ){
    document.getElementById("c1").style.backgroundColor = "red";
    document.getElementById("c2").style.display="none";
}
}

function address1(){
if( document.getElementById("address").value!=''){
    document.getElementById("a1").style.backgroundColor = "green";
    document.getElementById("a2").style.display="inline-block";
}
 else{
    document.getElementById("a1").style.backgroundColor = "red";
    document.getElementById("a2").style.display="none";
 }
}

function city1(){
if( document.getElementById("city").value!=''){
    document.getElementById("ci1").style.backgroundColor = "green";
    document.getElementById("ci2").style.display="inline-block";
}
else{
    document.getElementById("ci1").style.backgroundColor = "red";
    document.getElementById("ci2").style.display="none";
}
}

function state1(){
 if( document.getElementById("state").value!=''){
    document.getElementById("s1").style.backgroundColor = "green";
    document.getElementById("s2").style.display="inline-block";
 }
 else{
    document.getElementById("s1").style.backgroundColor = "red";
    document.getElementById("s2").style.display="none";
 }
}

function code1(){
if( document.getElementById("code").value!=''){
    document.getElementById("pc1").style.backgroundColor = "green";
    document.getElementById("pc2").style.display="inline-block";
}
    else{
    document.getElementById("pc1").style.backgroundColor = "red";
    document.getElementById("pc2").style.display="none";
    }
}

function country1(){
if( document.getElementById("country").value!=''){
    document.getElementById("co1").style.backgroundColor = "green";
    document.getElementById("co2").style.display="inline-block";
}
else{
    document.getElementById("co1").style.backgroundColor = "red";
    document.getElementById("co2").style.display="none";
}
}






function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#show')
                    .attr('src',e.target.result)
                    .width(190)
                    .height(190);
            };
            document.getElementById("show").style.display="block";
            reader.readAsDataURL(input.files[0]);
   }
}
