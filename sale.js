var sectionForSale = document.getElementById('sale_section_id');




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

const options = {
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
        /* items = data.results;*/ 
        DisplayForSale(data.properties)  
        console.log(data.properties)
    } catch(e){
        console.log(e)
    }
} 


const DisplayForSale = (data) => {
     let products = data?.map((item) => { 
                 template_sale_data = template_sale_data_id.innerHTML;

                 let replaceData = [
                 template_sale_data = template_sale_data.replaceAll('${primary_photo}', item['primary_photo']['href']),
                 template_sale_data = template_sale_data.replaceAll('${status}', item['status']),
                ];

                return replaceData;
     });
     
     //Insert template into sale section
     sectionForSale.innerHTML = products;
}

Start();