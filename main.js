let news = document.getElementById('news');
let title = document.getElementById('title');
let totalNews = document.getElementById('totalNews');
let readMoreBtn = document.getElementById('readMore');
let checkboxs = document.getElementById('checkboxs');
let categoryMenu = document.getElementById('dropdownMenuLink');
let sourcesArray = [];
let repeatedSources = [];
let country;
let size = 10;
let category = 'general';
let newsData = [];
let checkedSources = [];
let newArr = [];

function removeItem(arr, value) {
    arr.splice(arr.indexOf(value), 1);
}

function getrepeatedSources(arr) {
   //to turn long sourcesArray into an repeatedSourceArray with checking duplicated and number of repeated source
    for( var i=0; i< arr.length; i++) {
      let count = 1;
      if(newArr.indexOf(arr[i]) !== -1 ) { i = i; }
      if(newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
        for(var j = i+1; j<arr.length; j++) {
          if(arr[i] === arr[j]) { 
            //newArr.push(arr[i]);
          count ++;
          }
        }
        newArr.push(count);
      }
    }
    
  return newArr;  
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

    //setting data here
    newsData = data.articles;
    sourcesArray = newsData.map(article => article.source.name);
    newArr = [];
    repeatedSources = getrepeatedSources(sourcesArray);
    checkedSources = [];
    render();
}


function render() {

    totalNews.innerHTML = `<span class="badge badge-primary">${newsData.length} articles</span>`;

    dropdownMenuLink.innerHTML = category;

    for(let i = 0; i<repeatedSources.length; i +=2 ) {
        checkboxs.innerHTML += `<div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="${repeatedSources[i]}" onchange="toggleChecked(this)"> 
        <label class="form-check-label" for="${repeatedSources[i]}">${repeatedSources[i]}</label>
             <span class="badge badge-info">${repeatedSources[i+1]}</span>
        </div>`
    }

    // checkboxs.innerHTML = sourcesArray.map(source =>
    //     `<div class="form-check form-check-inline"><input type="checkbox" class="form-check-input" id="${source}" onchange="toggleChecked(this)"> 
    //     <label class="form-check-label" for="${source}">${source}</label></div>`).join('');

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
//dd


// const names = ['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Nancy', 'Carl']

// const count = names =>
//     names.reduce((a, b) => ({
//         ...a,
//         [b]: (a[b] || 0) + 1
//     }));

