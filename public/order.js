
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
