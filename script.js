const menuBtn = document.getElementById('menu_btn_id');
const menu = document.querySelector('.menu ul');

const homeChoiceSale = document.getElementById('sale_id');
const homeChoiceRent = document.getElementById('rent_id');

//Copyright and Date
let today = new Date;
copy_footer_id.innerText += today.getFullYear();

//Menu function open and close
menuBtn.addEventListener("click", (e) => {
    if(e.target.innerText === "MENU"){
        e.target.innerText = "CLOSE";
        menu.style.right = "0rem";
    } else {
        e.target.innerText = "MENU";
        menu.style.right = "-15rem";
    }
});

//Close menu when scrolling
window.addEventListener("scroll", () => {
    menuBtn.innerText = "MENU";
    menu.style.right = "-15rem";
});

//Add event listeners for the home choices
homeChoiceRent?.addEventListener("click", () => {
    window.location.href = "rent.html";
});

homeChoiceSale?.addEventListener("click", () => {
    window.location.href = "sale.html";
})


