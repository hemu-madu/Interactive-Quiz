function submitForm(e) {
    e.preventDefault();
    let name = document.forms["welcome_form"]["name"].value;

    if (name == "") {
        alert("Please enter your name");
        return;
    }

    sessionStorage.setItem("name", name);
    location.href = "quiz.html";
}
