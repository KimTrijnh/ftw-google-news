let news = document.getElementById('news');
let title = document.getElementById('title');
let totalNews = document.getElementById('totalNews');
let readMoreBtn = document.getElementById('readMore');
let checkboxs = document.getElementById('checkboxs');
let categoryMenu = document.getElementById('dropdownMenuLink');
let sourcesArray = [];
let country;
let size = 10;
let category = 'general';
let newsData = [];
let checkedSources = [];

function removeItem(arr, value) {
    arr.splice(arr.indexOf(value), 1);
}

fetchNews();
// async function

async function fetchNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${size}&category=${category}&apiKey=30d561c7b2db4deebf5dceab4175cda9`;
    // await response of fetch call
    let response = await fetch(url);
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    newsData = data.articles;
    sourcesArray = newsData.map(article => article.source.name);
    checkedSources = [];
    render();
}


function render() {

    totalNews.innerHTML = `<span class="badge badge-primary">${newsData.length} articles</span>`;
    dropdownMenuLink.innerHTML = category;

    checkboxs.innerHTML = sourcesArray.map(source =>
        `<div class="form-check form-check-inline"><input type="checkbox" class="form-check-input" id="${source}" onchange="toggleChecked(this)"> 
        <label class="form-check-label" for="${source}">${source}</label></div>`).join('');

    news.innerHTML = newsData.map(article =>
        `<div class="article">
        <div>
        <h4 class="title" id="title">${article.title}</h4>
        <p class="time lead"><span class="source">${article.source.name}</span> 
        <i class="far fa-clock"></i> ${moment(article.publishedAt).fromNow()}</p>
        <a href="${article.url}" class="link" >Read more...</a>
        </div>
        <img src=${article.urlToImage} alt="" class="w-25">
        </div>`).join('');
}

readMoreBtn.addEventListener('click', readMore);

function readMore() {
    size += 10;
    fetchNews();
}

function changeCategory(e) {
    category = e.innerText;
    fetchNews();

}


function toggleChecked(e) {
    let checkedNews = [];
    if (e.checked) {
        checkedSources.push(e.id)
    }
    if (e.checked === false) {
        removeItem(checkedSources, e.id)
    }
    console.log(e.checked);
    console.log(checkedSources);
    for (let i = 0; i < checkedSources.length; i++) {
        checkedNews = checkedNews.concat(newsData.filter(article => article.source.name === checkedSources[i]));
    }
    

    if (checkedSources.length > 0) {
        totalNews.innerHTML = `<span class="badge badge-primary">${checkedNews.length} articles</span>`;
        news.innerHTML = checkedNews.map(article =>
            `<div class="article">
            <div>
            <h4 class="title" id="title">${article.title}</h4>
            <p class="time lead"><span class="source">${article.source.name}</span> 
            <i class="far fa-clock"></i> ${moment(article.publishedAt).fromNow()}</p>
            <a href="${article.url}" class="link" >Read more...</a>
            </div>
            <img src=${article.urlToImage} alt="">
            </div>`).join('');
    
    } else if (checkedSources.length == 0) {
        render();
    }
}

