





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





    document.getElementById("complain").addEventListener('submit' , submitform);

    function submitform(e){
        console.log(1);
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const text = document.querySelector("#complain").value;
        const recaptcha = document.querySelector("#g-recaptcha-response").value;



        console.log(1);
        fetch('/call' , {
           method:"POST",
           enctype:"multipart/form-data",
           headers:{
            'Accept':'application/json , text/plain , */*',
            'Content-type':'application/json'
           },
           body:JSON.stringify({name:name,email:email,recaptcha:recaptcha,text:text})

        }).then(res=> {
            console.log(res);
            return res.json()
        }).then( data =>{
            console.log(data);
            console.log(data.success);

            if( data.success==true ){
                window.alert("succesfully submitted");
                document.getElementById("box1").style.display="block";
                document.getElementById("box1").innerHTML="Try To Resolve the issue ASAP ";
            }

            else{
                window.alert("something went wrong");
                document.getElementById("box2").style.display="block";
                document.getElementById("box2").innerHTML=data.msg;

            }

        })


 }
