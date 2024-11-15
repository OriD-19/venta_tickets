const usersTab = document.getElementById("usersTab");
if (user.role !== "admin") {
    usersTab.style.display = "none";

    const tab = new bootstrap.Tab(document.getElementById("conciertos-tab"));
    tab.show();


    document.getElementById('usuarios').classList.remove('active');
    document.getElementById('conciertos').classList.add('active');
}

