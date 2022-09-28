function saveToken(token) {
    localStorage.setItem("token", token);
}

function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getUserName() {
    const user = localStorage.getItem("user");
    console.log("user", user);
    if (user) {
        return JSON.parse(user);
    } else {
        return []
    }
}


export {saveToken, saveUser, getUserName}