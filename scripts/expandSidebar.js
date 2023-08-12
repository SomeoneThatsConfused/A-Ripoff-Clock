const hamburgerMenu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const menuItems = document.querySelectorAll(".selectorContainer");
const title = document.querySelector(".title");
hamburgerMenu.addEventListener("click", expandSidebar);
function expandSidebar() {
  sidebar.classList.toggle("expanded");
  menuItems.forEach((item) => {
    if (sidebar.classList.contains("expanded")) {
      sidebar.classList.add("bg-zinc-900");
      item.classList.add("flex");
      item.classList.remove("hidden");
      title.classList.remove("right-offset-150px");
      title.style.marginLeft = "20px";
    } else {
      title.classList.add("right-offset-150px");
      item.classList.add("hidden");
      sidebar.classList.remove("bg-zinc-900");
    }
  });
}
