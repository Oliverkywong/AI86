const navigation = document.querySelector(".navigation");
const menuToggle = document.querySelector(".menu-toggle");
const listItems = document.querySelectorAll(".list-item");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

listItems.forEach((item) => {
  item.onmouseover = () => {
    listItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
  };
  // listItems.forEach(item => item.classList.remove('active'));
});

document.querySelector(".list-item").classList.remove("active");

// document.querySelector('.navigation').addEventListener('mouseover', (event) => {});
