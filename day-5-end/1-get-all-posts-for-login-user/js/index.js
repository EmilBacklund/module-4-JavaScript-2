import '../style.css'
import {clearStorage} from "./utils/storage";

import createHeaderBar from "./components/createHeaderBar";

createHeaderBar();
const logOutBtn = document.querySelector("#log-out-btn");

function logOutUser() {
    clearStorage();
    // Simulate an HTTP redirect:
    window.location.replace("/login.html");
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", logOutUser);
}
