



$(document).ready(function(){
    $("#email1").click(function(){
    console.log(1);
    $("body").css("overflow-y","hidden");

    $(".form1").css("display","block");

 anime({
   targets: '.form1',
   opacity: 1,
   duration: 5000
 });

 anime({
   targets: '#collagephotos',
   opacity: 0.5,
   duration: 5000
 });

 anime({
   targets: '.collection',
   opacity: 0.5,
   duration: 5000
 });



               $(".container1").css("filter","grayscale(100%)");
               $(".intro").css("filter","grayscale(100%)");
               $(".cartoon").css("filter","grayscale(100%)");
               $(".collage").css("filter","grayscale(100%)");
               $(".detail2").css("filter","grayscale(100%)");
               $(".collection").css("filter","grayscale(100%)");
             anime({
   targets: '#det1',
   opacity: 0.2,
   duration: 1
 });

                     anime({
   targets: '#det2',
   opacity: 0.2,
   duration: 1
 });
               $(".form1").css("filter","grayscale(0%)");



            })


 $("#name").click(function(){

      $("#n").css("color","#007BFF");
      anime({
       targets: '.line1',
       backgroundColor:'#007BFF',
       duration: 5000
      });

      anime({
       targets: '#n',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#n',
       fontSize:'1em',
       duration: 500
      });

      anime({
       targets: '#n',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#n',
       fontSize:'1.4em',
       duration: 500
      });

 })

     $("#email").click(function(){
     $("#e").css("color","#007BFF");
      anime({
       targets: '.line2',
       backgroundColor:'#007BFF',
       duration: 5000
      });

      anime({
       targets: '#e',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#e',
       fontSize:'1em',
       duration: 500
      });

      anime({
       targets: '#e',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#e',
       fontSize:'1.4em',
       duration: 500
      });

    })

     $("#contact").click(function(){
     $("#c").css("color","#007BFF");
      anime({
       targets: '.line3',
       backgroundColor:'#007BFF',
       duration: 5000
      });

      anime({
       targets: '#c',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#c',
       fontSize:'1em',
       duration: 500
      });

      anime({
       targets: '#c',
       translateY:'-5px',
       duration: 50
      });

      anime({
       targets: '#c',
       fontSize:'1.4em',
       duration: 500
      });

    })


     $("#line").click(function(){
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
         }

         else{
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
         $("#line").css("display","block");
          anime({
   targets: '#expand',
   right: -190,
   duration: 1000
 });

          $("#expand").css("display","none");

})





    })



    document.getElementById("subscribe").addEventListener('submit' , submitform);

    function submitform(e){
        console.log(1);
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const contact = document.querySelector("#contact").value;
        const recaptcha = document.querySelector("#g-recaptcha-response").value;



        console.log(1);
        fetch('/sign' , {
           method:"POST",
           enctype:"multipart/form-data",
           headers:{
            'Accept':'application/json , text/plain , */*',
            'Content-type':'application/json'
           },
           body:JSON.stringify({name:name,email:email,recaptcha:recaptcha,contact:contact})

        }).then(res=> {
            console.log(res);
            return res.json()
        }).then( data =>{
            console.log(data);
            console.log(data.success);

            if( data.success==true ){
                window.alert("succesfully submitted");
                document.getElementById("box").style.display='none';
                document.getElementById("tick").style.display="flex";
            }

            else{
                window.alert("something went wrong");
                document.getElementById("box").style.display="block";
                document.getElementById("box").innerHTML=data.msg;
            }

        })


 }
