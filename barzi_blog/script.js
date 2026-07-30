const root = document.documentElement;


/*
    GET GRID SIZE
*/

function getGridSize(){

    return parseInt(
        getComputedStyle(root)
        .getPropertyValue("--cell")
    );

}



/*
    SNAP VALUE TO GRID
*/

function snap(value){

    const grid = getGridSize();

    return Math.round(value / grid) * grid;

}




/*
    SNAP ELEMENT HEIGHTS
*/


function snapElements(){


    const blocks =
    document.querySelectorAll(
        ".card"
    );


    blocks.forEach(block=>{


        const height =
        block.getBoundingClientRect()
        .height;


        const snapped =
        snap(height);


        block.style.height =
        snapped + "px";


    });


}





/*
    DRAG SYSTEM

    Drag blocks around and they
    lock onto the graph paper.
*/


let selected = null;

let offsetX = 0;

let offsetY = 0;



document
.querySelectorAll(".card")
.forEach(card=>{


    card.style.cursor="grab";


    card.addEventListener(
    "mousedown",
    e=>{


        selected=card;


        const rect =
        card.getBoundingClientRect();



        offsetX =
        e.clientX - rect.left;


        offsetY =
        e.clientY - rect.top;



        card.style.cursor="grabbing";



        card.style.position=
        "absolute";


        card.style.zIndex=100;



    });



});




document.addEventListener(
"mousemove",
e=>{


    if(!selected)
        return;



    const paper =
    document
    .querySelector(".grid-paper")
    .getBoundingClientRect();



    let x =
    e.clientX -
    paper.left -
    offsetX;



    let y =
    e.clientY -
    paper.top -
    offsetY;



    selected.style.left =
    snap(x)+"px";



    selected.style.top =
    snap(y)+"px";



});





document.addEventListener(
"mouseup",
()=>{


    if(selected){

        selected.style.cursor=
        "grab";

    }


    selected=null;


});






/*
    IMAGE RESIZE SNAP

    Keeps images on grid
*/


document
.querySelectorAll(".photo")
.forEach(photo=>{


    photo.style.resize="both";

    photo.style.overflow="auto";


});







/*
    ADD GRID COORDINATES

    Useful for designing layouts
*/


function showGridCoordinates(){


    const paper =
    document.querySelector(
    ".grid-paper"
    );


    const marker =
    document.createElement(
    "div"
    );


    marker.className=
    "coordinates";


    marker.innerHTML=
    "Grid: 0,0";


    paper.appendChild(marker);



    paper.addEventListener(
    "mousemove",
    e=>{


        const rect =
        paper.getBoundingClientRect();



        const grid =
        getGridSize();



        const x =
        Math.floor(
        (e.clientX-rect.left)
        /
        grid
        );



        const y =
        Math.floor(
        (e.clientY-rect.top)
        /
        grid
        );



        marker.innerHTML =
        `Grid: ${x}, ${y}`;



    });


}


showGridCoordinates();







/*
    DARK MODE

    Press D
*/


let dark=false;


document.addEventListener(
"keydown",
e=>{


    if(e.key.toLowerCase()==="d"){


        dark=!dark;


        if(dark){


            root.style.setProperty(
            "--paper",
            "#202020"
            );


            root.style.setProperty(
            "--text",
            "#eeeeee"
            );


        }

        else{


            root.style.setProperty(
            "--paper",
            "#fbfaf3"
            );


            root.style.setProperty(
            "--text",
            "#222"
            );


        }


    }


});






/*
    INITIALIZE
*/


window.addEventListener(
"load",
()=>{

    snapElements();

});



window.addEventListener(
"resize",
()=>{

    snapElements();

});