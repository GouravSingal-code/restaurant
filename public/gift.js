
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
           right: 60,
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
     

function cost0(){
    if( document.getElementById("cost").value==''){
        document.getElementById("cost1").style.display="block";
    }
    
    if( document.getElementById("cost").value < 5 || document.getElementById("cost").value > 100){
        document.getElementById("cost2").style.display="block";   
    }
    
 if( document.getElementById("cost").value >= 5 && document.getElementById("cost").value <= 100){
        document.getElementById("cost2").style.display="none";   
    }    

    
    if(document.getElementById("cost").value!=''){
        document.getElementById("cost1").style.display="none";   
    }
} 

function to0(){
    if( document.getElementById("to").value==''){
        document.getElementById("to1").style.display="block";
    }
    else{
        document.getElementById("to1").style.display="none";   
    }   
}

function from0(){
    if( document.getElementById("from").value==''){
        document.getElementById("from1").style.display="block";
    }
    else{
        document.getElementById("from1").style.display="none";   
    }   
}

function msg0(){
    if( document.getElementById("msg").value==''){
        document.getElementById("msg1").style.display="block";
    }
    else{
        document.getElementById("msg1").style.display="none";   
    }   
}

function to0(){
    if( document.getElementById("to").value==''){
        document.getElementById("to1").style.display="block";
    }
    else{
        document.getElementById("to1").style.display="none";   
    }   
}

function email0(){
    if( document.getElementById("email").value=='' && document.getElementById("num").value==''  ){
        document.getElementById("email1").style.display="block";
    }
    else{
        document.getElementById("email1").style.display="none";   
    }   
}


function display(){
console.log(document.getElementById("parcel").value);
if( document.getElementById("parcel").value == "Now" ){
    document.getElementById("time").style.display="none";
    document.getElementById("cal").style.display="none";
}

else{
    document.getElementById("time").style.display="inline-block";
    document.getElementById("cal").style.display="inline-block";    
}
      
}


$(document).ready(function(){
            
        $("#e").click(function(){
            $("#a").css("border-color","blue");
            $("#a0").css("border-color","#D3D3D3");
            $("#email").css("display","block");
            $("#num").css("display","none");
        })
        
        $("#p").click(function(){
            $("#a").css("border-color","#D3D3D3");
            $("#a0").css("border-color","blue");
            $("#email").css("display","none");
            $("#num").css("display","block");
        })
        
        
        $("#date").click(function(){
            $("#cal").css("display","inline-block");
            $("#time").css("display","inline-block");
        })
        
        $("#now").click(function(){
            $("#cal").css("display","none");
            $("#time").css("display","none");   
        })
        

        
})

        
     
       
       
    document.getElementById("subscribe").addEventListener('submit' , submitform);
    
    function submitform(e){
     
        e.preventDefault();
        
        const cost = document.querySelector("#cost").value;
        const to = document.querySelector("#to").value;
        const from = document.querySelector("#from").value;
        const msg = document.querySelector("#msg").value;
        const email = document.querySelector("#email").value;
        const num = document.querySelector("#num").value;
        const parcel = document.querySelector("#parcel").value;
        const cal = document.querySelector("#cal").value;
        const time = document.querySelector("#time").value;
        const recaptcha = document.querySelector("#g-recaptcha-response").value;
        
        fetch('/card' , {
            method:"POST",
            enctype:"multipart/form-data",
            headers:{
           'Accept':'application/json , text/plain , */* ',
            'Content-type':'application/json'
           },
            body:JSON.stringify({ cost:cost , to:to , from:from , msg:msg , email:email , num:num  , parcel:parcel , cal:cal , time:time , recaptcha:recaptcha })
        })
        .then(res=> res.json())
        .then( (data) =>{
             if( data.success ){
                 window.alert(data.msg);      
             }
            
            else{
                window.alert(data.msg);
            }
        })
        
     }
    