const key = 'rpcf7uOhn2g6D-o-SNzviEfDQjm9IDqjuANpG5eu9Zk';

const app = {
    urls: [`https://api.unsplash.com/photos/random?query=dogs&client_id=${key}`, 'http://api.icndb.com/jokes/random/'],
    imgs: [],
    jokes: [],
    init: () => {
        app.getData();
    },
    getData: async () => {
        let [imgUrl, ...other] = app.urls;
        await fetch(imgUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
               app.imgs = data.urls['regular'];
               app.insertImage();
            })
        .catch(err => {
            console.log(err)
        }) 
         app.funnyTxt(other);
    },
    insertImage: () => {
        let div = document.querySelector('#output');
        let img = document.createElement('img');
        img.src = app.imgs;
        img.classList.add('responsive-img');
        div.append(img);
    },
    funnyTxt: (url) => {
       fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
           app.jokes = data.value['joke'];
                if (app.jokes.search('&quot')){
                    app.jokes.replace('&quot', '"');
                }
           let p = document.createElement('p');
           let div = document.querySelector('#output');
           p.classList.add('flow-text');
            p.textContent = app.jokes;
            div.append(p);
    })
    },
}

document.addEventListener('DOMContentLoaded', app.init);