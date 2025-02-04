document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".menu-sidebar");
    const closeMenu = document.querySelector(".close-menu");

    menuToggle.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Fecha o menu se clicar fora dele
    window.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove("open");
        }
    });
});