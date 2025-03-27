const token = localStorage.getItem("JWT");

if (token != null) {
    location.href = "/pages/tasks.html";
}
