var allDivs = document.querySelectorAll(".container *")
var dragged = undefined;



allDivs.forEach(function (element){
    element.dragged = true;

    let element1 = document.getElementsByClassName("dropZone");
    let numberOfChildren1 = element1[0].getElementsByTagName('*').length;

    if(numberOfChildren1 == 0){
        var p = document.createElement('p');
        p.innerHTML = 'I am Empty :(';
        element1[0].appendChild(p);
    }


    let element2 = document.getElementsByClassName("dragZone");
    let numberOfChildren2 = element2[0].getElementsByTagName('*').length;

    if(numberOfChildren2 == 0){
        var p = document.createElement('p');
        p.innerHTML = 'I am Empty :(';
        element2[0].appendChild(p);
    }


    element.addEventListener("drag", function(event){
        let element1 = document.getElementsByClassName("dropZone");
        let numberOfChildren1 = element1[0].getElementsByTagName('*').length;

        if(numberOfChildren1 != 0)
        {
            let paragraphs1 = element1[0].getElementsByTagName("p");
            if(paragraphs1.length != 0){
                element1[0].removeChild(paragraphs1[0]);
            }
        }
        
        let element2 = document.getElementsByClassName("dragZone");
        let numberOfChildren2 = element2[0].getElementsByTagName('*').length;

        if(numberOfChildren2 != 0)
        {
            let paragraphs2 = element2[0].getElementsByTagName("p");
            if(paragraphs2.length != 0){
                element2[0].removeChild(paragraphs2[0]);
            }
        }

    });

    // Events fired on the draggable targer
    element.addEventListener("dragstart", function(event)
    {
        // We store a reference on the dragged element
        dragged = event.target;
        
        // We make the dragged element half transparent
        event.target.style.opacity = .5;    

        let element1 = document.getElementsByClassName("dropZone");
        let numberOfChildren1 = element1[0].getElementsByTagName('*').length;


    });

    element.addEventListener("dragend", function(event){
        // We reset the transparency of the dragged element
        event.target.style.opacity = "";


    });


    // Events fired on the drop targets
    element.addEventListener("dragover", function(event){
        //Prevent default to allow drop
        event.preventDefault();
        
    });

    element.addEventListener("dragenter", function(event){
        if(event.target.className == "dropZone"  || event.target.className == "dragZone")
        {
            event.target.style.background = "yellow";
        }
    });

    element.addEventListener("dragleave", function(event){
        // We reset the background of the potential drop target when
        // the draggable element leaves it
        if(event.target.className == "dropZone" || event.target.className == "dragZone"){
            event.target.style.background = "";
        }
    });

    element.addEventListener("drop", function(event){
        if(event.target.className == "dropZone"){
            event.target.style.background = "";
            event.target.appendChild(dragged);
            dragged = undefined;

            let element = document.getElementsByClassName("dragZone");
            let numberOfChildren = element[0].getElementsByTagName('*').length;

            if(numberOfChildren == 0){
                var p = document.createElement('p');
                p.innerHTML = 'I am Empty :(';
                element[0].appendChild(p);
            }

        }

        if(event.target.className == "dragZone"){
            event.target.style.background = "";
            event.target.appendChild(dragged);
            dragged = undefined;

            let element = document.getElementsByClassName("dropZone");
            let numberOfChildren = element[0].getElementsByTagName('*').length;

            if(numberOfChildren == 0){
                var p = document.createElement('p');
                p.innerHTML = 'I am Empty :(';
                element[0].appendChild(p);
            }


        }
    });

});