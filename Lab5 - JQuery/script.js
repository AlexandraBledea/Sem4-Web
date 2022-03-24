$(document).ready(function (){

    var pictureWidth = 240;
    var position = 0;
    var popUpDiv = document.getElementById("popUpDiv");
    var popUpImg = document.getElementById("popUpImg");

    // Here we set the position for each image from the list
    $("li").each(function(){
        position += pictureWidth;
        $(this).css("left", position);
    });


    // When we click on an image
    $("img").click(function(){
        // We take the value of the attribute src of the clicked image
        var img = $(this).attr('src');
        // We display the div as a block, so we make it visible
        popUpDiv.style.display = 'block';
        // We set the source of the pop up image
        popUpImg.src = img;
        // We stop the animation
        $("li").stop(true);
    });

    popUpImg.onclick = function(){
        popUpDiv.style.display = 'none';
        slide();
    }

    function slide(){
        // Here we animate each list item to move to the right with 10px (because we add sth to the "left")
        // in 100 miliseconds and when the animation is done, it calls the function again
        $("li").animate({"left":"+=10px"}, 100, again);
    }

    function again(){
        var left = $(this).parent().offset().left + $(this).offset().left;
        if (left >= 1920) {
            $(this).css("left",left - 1920);
        }
        slide();
    }
    
    slide();


});



    // function notClicked(){


    //     // $("li").click(function(){
    //     //     console.log("baanane");
    //     //     $("li").stop();
    //     // });
        

    // $("li").on('click',function(){ 
    //  if(!$(this).data('clickedPreviously')) { 
    //      $(this).data('clickedPreviously', true)  
    //      $("ul").animate('resume');
    //      console.log("banane");
    //   }  
    //    else { 
    //      $("ul").animate('pause');
    //      console.log("capsuni"); 
    //     }  
    // }); 

    // }

    // notClicked();