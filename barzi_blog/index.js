const frame = document.getElementById("post-frame");



function loadPost(url){

    frame.src = url;

}





function toggleSection(section){


    const posts = section.nextElementSibling;

    const icon = section.querySelector(".icon");



    if(posts.style.display === "none"){

        posts.style.display="block";

        icon.textContent="-";

    }

    else{

        posts.style.display="none";

        icon.textContent="+";

    }


}





// automatically open first post

window.onload = function(){


    const firstPost = document.querySelector(".post-link");


    if(firstPost){

        firstPost.click();

    }


};