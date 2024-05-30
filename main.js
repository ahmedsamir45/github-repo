// variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data")

getButton.onclick = function() {
    getRepos();
};

function getRepos()  {
    if(theInput.value == ""){
        reposData.innerHTML = "<span>Please Write Github Username</span>"
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=>{
            return response.json();
        }).then((repositories) => {
        // empty the container
        reposData.innerHTML = "";
        // loop through the repos
        repositories.forEach((repo) => {
            // create main div element
            let mainDiv = document.createElement("div")
            // create repo name
            let repoName = document.createTextNode(repo.name)
            // append the text to main div
            mainDiv.appendChild(repoName)
            //create repo URL Anchor
            let theURl = document.createElement("a")
            // create repo URL text
            let theUrlText = document.createTextNode("visit")
            // append the repo url text to anchor tag
            theURl.appendChild(theUrlText)
            // and the hyper text refrense
            theURl.href = `https://github.com/${theInput.value}/${repo.name}`
            // set Attribute Blank
            theURl.setAttribute("target", "_blank")
            // append the anchor tag to main div
            mainDiv.appendChild(theURl)
            // create stars count span
            let starsSpan = document.createElement("span")
            // create the stars count text
            let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`)
            // add stars count text to stars span
            starsSpan.appendChild(starsText)
            // append stars count span to main div
            mainDiv.appendChild(starsSpan)
            // add class on main div
            mainDiv.className = "repo-box"
            // Append the main div to container
            reposData.appendChild(mainDiv);
        })
        })
    }
}