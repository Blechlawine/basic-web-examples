async function loadNav() {
    const navbar = await fetch("./navbar.html");
    const navbarContent = await navbar.text();
    document.getElementById("navbar").innerHTML = navbarContent;
}

loadNav();