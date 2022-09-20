const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu ul');

menuBtn.addEventListener("click", (e) => {
    if(e.target.innerText === "MENU"){
        e.target.innerText = "CLOSE";
        menu.style.right = "0rem";
    } else {
        e.target.innerText = "MENU";
        menu.style.right = "-15rem";
    }
});

window.addEventListener("scroll", () => {
    menuBtn.innerText = "MENU";
    menu.style.right = "-15rem";
});


let items = [];

/* optionsI.addEventListener('change', (e) => {
    let value = e.target.value;
    if(value === 'All'){
        Display(items);
    } else{
        const filtered = items.filter(item => item.name.includes(value));
        Display(filtered)
    }

    
})

input.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    const filtered = items.filter( item =>
        item.name.toLowerCase().includes(value)
        
    )
    Display(filtered);
}); */

/* const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819bbdfbemsh728d704970277e1p165420jsn747a79b95703',
		'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
	}
};

async function Start(){
    try{
        const response = await fetch('https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=Los%20Angeles&page=1&sort=relevant&type=single-family%2Cmulti-family', options)
        const data = await response.json();
         items = data.results;
        DisplayForSale(data.properties) 
        console.log(data.properties)
    } catch(e){
        console.log(e)
    }
} 


Start();*/


const DisplayForSale = (data) => {
     const products = data.map( (item) => 
                  `<div class="item" key="${item.id}">
                    <div class="image">
                        <img src="${item}" />
                    </div>
                    <div class="details">
                        <h5>${item.brandName}</h5>
                        <button onclick="details(this)">More</button>
                    </div>
                   </div>`
            
     )
     
    
    section.innerHTML = products;
}

const details = (btn) => {
    let myEl = btn.closest('.item').getAttribute('key');
    console.log(myEl);
}


let copyright = document.querySelector('.footer');
let today = new Date;
copyright.innerHTML = `<h3>Copyright &COPY; ${today.getFullYear()}</h3>`; 