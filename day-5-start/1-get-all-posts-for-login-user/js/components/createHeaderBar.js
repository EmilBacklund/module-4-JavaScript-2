import {getUserName} from "../utils/storage";

function createHeaderBar() {
    const {pathname} = document.location;
    const navBar = document.querySelector("#nav-bar");
    if (navBar) {
        const userName = getUserName();
        let navLinks = `
            <li class="p-8"><a href="/signup.html" class="${pathname === "/signup.html" ? "text-blue-600" : ""}">SignUp</a></li>
            <li class="p-8"><a href="/login.html" class="${pathname === "/login.html" ? "text-blue-600" : ""}">LogIn</a></li>
            `;
        if (userName) {
            navLinks = `
            <li class="p-8">
                <a href="/create-post.html" class="${pathname === "/create-post.html" ? "text-blue-600" : ""}">Create Post</a>
            </li>
            <li class="p-8"><span>Hello 👋  ${userName}</span></li>
`
        }
        navBar.innerHTML = `
        <ul class="flex">
           ${navLinks}
        </ul>`
    }
}

export default createHeaderBar;
