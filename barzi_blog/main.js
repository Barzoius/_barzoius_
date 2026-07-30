fetch("posts.json")
.then(response => response.json())
.then(posts => {


    // newest first
    posts.sort((a,b)=>{
        return new Date(b.date) - new Date(a.date);
    });


    const postList = document.querySelector(".post-list");


    // only show 5 newest
    posts.slice(0,5).forEach(post => {


        const article = document.createElement("article");

        article.className = "post";


        article.innerHTML = `

            <div class="post-date">
                ${post.date}
            </div>


            <div class="post-content">

                <h2>
                    <a href="${post.url}">
                        ${post.title}
                    </a>
                </h2>


                <p>
                    ${post.description}
                </p>

            </div>

        `;


        postList.appendChild(article);


    });


});