const CLIENT_ID = 'f3458ae48e1dd8666835';
const CLIENT_SECRET = '86f1dc2cd633c86227010412c5c6c4285fda9570';
async function fetchuser(name) {
    let response = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    let profile = await response.json();
    return profile;
}
async function getrepos(repourl) {
     console.log(repourl)
    let response = await fetch(`${repourl}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=10`);
    let repos = await response.json();
    return repos;
}
document.querySelector('#search').addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('.user-details').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';
    const name = document.querySelector('#findByUsername').value
    if (name.length > 0) {
        let p = await fetchuser(name);
       if (p.message) {
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.notFound').style.display = 'block';
        }
        else {
            let r = await getrepos(p.repos_url);
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.notFound').style.display = 'none';
            document.querySelector('.user-details').style.display = 'flex';
            console.log(p);
            showProfile(p);
            showrepos(r)
        }
        document.querySelector('#findByUsername').value = ``;
    }
})
function showProfile(p) {
    document.querySelector('.profile').innerHTML = `
    <img src="${p.avatar_url}"  alt="${p.name}"
            />
            <p class="name">${p.name}</p>
            <p class="username login">${p.login}</p>
            <p class="bio">
                ${p.bio}
            </p>

            <div class="followers-stars">
                <p>
                <ion-icon name="people-outline"></ion-icon>
                <span class="followers"> ${p.followers} </span> followers
                </p>
                <span class="dot">·</span>
                <p><span class="following"> ${p.following}</span> following</p>
            </div>

            <p class="company">
                <ion-icon name="business-outline"></ion-icon>
                ${p.company}
            </p>
            <p class="location">
                <ion-icon name="location-outline"></ion-icon>${p.location}
            </p>
        `
}

function showrepos(r) {
    let html = ``;
    for (let repos of r) {
        html = html +`
        <div class="repo">
            <div class="repo_name">
                <a href="${repos.html_url}">${repos.name}</a>
            </div>
            <p>
                <span class="circle"></span> ${repos.language}
                <ion-icon name="star-outline"></ion-icon> ${repos.watchers}
                <ion-icon name="git-branch-outline"></ion-icon> ${repos.forks_count}
            </p>
        </div>`
        
    }
    document.querySelector('.repos').innerHTML = html;
}