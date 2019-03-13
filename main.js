let news = document.getElementById('news');
let title = document.getElementById('title');
let totalNews = document.getElementById('totalNews');
let readMoreBtn = document.getElementById('readMore');
let checkboxs = document.getElementById('checkboxs');
let sourcesArray = [];
let country;
let size = 5;
let newsData = [];


// async function

    async function fetchNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${size}&apiKey=30d561c7b2db4deebf5dceab4175cda9`;
        // await response of fetch call
        let response = await fetch(url);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
       newsData = data.articles;
       render();
    }




function render() {
    totalNews.innerHTML = `<span class="badge badge-primary">${newsData.length} articles</span>`;

      news.innerHTML =  newsData.map( article => 
    
        `<div class="article">
        <h2 class="title" id="title">${article.title}</h2>
        <p class="time">${moment(article.publishedAt).fromNow()}</p>
        <p class="source">${article.source.name}</p>
        <img src=${article.urlToImage} alt="">
        
        <a href="" class="link" >${article.url}</a>
    </div>`);
 

}



readMoreBtn.addEventListener('click', readMore);

function readMore() {
    size += 5;
   // url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${size}&apiKey=30d561c7b2db4deebf5dceab4175cda9`;
    fetchNews();
}
fetchNews();

// sourcesArray.push(i.source.name);
//         html += `<input type="checkbox" class="form-check-input" name="${i.source.name}" id="${i.source.id}"><label class="form-check-label" for="${i.source.id}">${i.source.name}</label>`;