let body = document.body;
let href = document.location.href;

let preloader = document.getElementById('preloader');
setTimeout(() => {
  preloader.classList.add('pre');
}, 5000);

let request = (href) => {
  let userName = href.split('=');
  if (userName[1]) {
    username = userName[1];
  } else {
    username = 'EvelinaEfimova'
  }
  return username;
}

let url = `https://api.github.com/users/${request(href)}`;
let date = new Date();
let getDate = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(date) : reject('Errow date'), 1500)
});
let getUrl = new Promise((resolve, reject) => {
  setTimeout(() => url ? resolve(url) : reject('Errow Url'), 1500)
});

Promise.all([getDate, getUrl])
  .then(([url, date]) => fetch(`https://api.github.com/users/${request(href)}`))
  .then(rep => rep.json())
  .then(json => {
    let name = document.createElement('a');
    if (json.name != null) {
      name.innerHTML = json.name;
      name.href = json.html_url;
    } else {
      name.innerHTML = 'Information about name is not available'
    }
    body.append(name);
    name.classList.add('nameC');

    let img = document.createElement('img');
    if (json.avatar_url != null) {
      img.src = json.avatar_url;
    } else {
      img.src = 'Information about avatar is not available'
    }
    body.append(img);
    img.classList.add('imgC');

    let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Information about bio in not available'
    }
    body.append(bio);
    bio.classList.add('bioC');

    body.append(date);
  })
.catch(err => console.log(err));