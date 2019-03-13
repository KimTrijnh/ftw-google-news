let news = document.getElementById('news');
let title = document.getElementById('title');
let totalNews = document.getElementById('totalNews');
let readMoreBtn = document.getElementById('readMore');
let checkboxs = document.getElementById('checkboxs');
let sourcesArray = [];
let country;
let size = 5;
let category = 'general';
let newsData = [];
let checkedSources = [];


// async function

    async function fetchNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${size}&category=${category}&apiKey=30d561c7b2db4deebf5dceab4175cda9`;
        // await response of fetch call
        let response = await fetch(url);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
       newsData = data.articles;
       sourcesArray = newsData.map( article => article.source.name);
       checkedSources = [];
       render();
    }




function render() {

    totalNews.innerHTML = `<span class="badge badge-primary">${newsData.length} articles</span>`;

    checkboxs.innerHTML = sourcesArray.map( source => 
        `<div class="form-check form-check-inline"><input type="checkbox" class="form-check-input" id="${source}" onchange="toggleChecked(this)"> 
        <label class="form-check-label" for="${source}">${source}</label></div>`).join('');
    
      news.innerHTML =  newsData.map( article => 
        `<div class="article">
        <h2 class="title" id="title">${article.title}</h2>
        <p class="time">${moment(article.publishedAt).fromNow()}</p>
        <p class="source">${article.source.name}</p>
        <img src=${article.urlToImage} alt="">
        <a href="" class="link" >${article.url}</a>
    </div>`).join('');
    


}



readMoreBtn.addEventListener('click', readMore);

function readMore() {
    size += 5;
    fetchNews();
}
fetchNews();



function changeCategory(e) {
category = e.innerText;
fetchNews();
} 



function toggleChecked(e) {
let checkedNews =[];
if(e.checked) { checkedSources.push(e.id)}
if(e.checked === false) { removeItem(checkedSources, e.id)}
console.log(e.checked);
console.log(checkedSources);
for(let i = 0; i <checkedSources.length; i++) {
 checkedNews = checkedNews.concat(newsData.filter( article => article.source.name === checkedSources[i]));
 }

 if(checkedSources.length >0) {
    news.innerHTML =  checkedNews.map( article => 
        `<div class="article">
        <h2 class="title" id="title">${article.title}</h2>
        <p class="time">${moment(article.publishedAt).fromNow()}</p>
        <p class="source">${article.source.name}</p>
        <img src=${article.urlToImage} alt="">
        <a href="" class="link" >${article.url}</a>
    </div>`).join('');
 } else if( checkedSources.length == 0) {
     render();
 }
 }



function removeItem(arr, value) {
    arr.splice(arr.indexOf(value), 1);
}
 
