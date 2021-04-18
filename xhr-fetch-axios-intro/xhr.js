const getBtn = document.getElementById('get-btn');
const container = document.querySelector(".container");

const sendHttpRequest = async(url) => {
    const response = await fetch(url);
    const jsondata = await response.json();
    return jsondata;
}

const getData = () => {
    const query = document.getElementById('searchQuery').value;
    console.log(query);
    var url = 'http://www.reddit.com/search.json?q='+encodeURIComponent(query)+'&sort=new';

    sendHttpRequest(url).then(responseData => {

        const postsArr = responseData.data.children; //Gives array that contains our posts
        let markup = ``;

        for (let i = 0; i < postsArr.length; i++) {
            currPost = postsArr[i].data; // a single post object

            var content = ``;
            if (currPost.url_overridden_by_dest != undefined) {
                content += `<img src="${currPost.url_overridden_by_dest}" class="img-fluid">`
            }
            content += currPost.selftext;

            markup += `<div class="card mt-5 mb-5">
                        <div class="card-body"> 
                            <div class="card-title"> <h2>${currPost.title}</h2> </div>
                            <div class="card-text" style="display: block; text-align: center;">
                                ${content} 
                            </div>
                            <p>
                                <i> Posted by ${currPost.author} </i> 
                            </p>
                            <a class="post card-link" target="_blank" href="https://www.reddit.com/${currPost.permalink}">Click here to get to this post</a>
                        </div>
                        </div>
                    `;
        }
        container.innerHTML = markup;
    });
};

getBtn.addEventListener('click', getData);