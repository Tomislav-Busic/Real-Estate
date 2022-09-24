let sectionForSale = document.getElementById('sale_section_id');

let input = document.getElementById('input_search_id');
let optionsForSale = document.getElementById('options_id');
let items = [];



optionsForSale.addEventListener('change', (e) => {
    let value = e.target.value;
    if(value === 'All'){
        DisplayForSale(items);
    } else if(value === 'lower_price'){
        const filteredByLower = items.sort((a,b) => 
        a.list_price - b.list_price);
        DisplayForSale(filteredByLower)
    } else if(value === 'higher_price'){
        const filteredByHigher = items.sort((a,b) => 
        b.list_price - a.list_price);
        DisplayForSale(filteredByHigher)
    }  
})

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819bbdfbemsh728d704970277e1p165420jsn747a79b95703',
		'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
	}
};

async function fetchData(){
    try{
        const response = await fetch('https://real-estate12.p.rapidapi.com/listings/sale?state=CA&city=Los%20Angeles&page=1&sort=relevant&type=single-family%2Cmulti-family', options)
        const data = await response.json();
        items = data.properties; 
        DisplayForSale(data.properties)  
        console.log(data.properties)
    } catch(e){
        console.log(e)
    }
} 

input.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    const filtered = items.filter( item =>
        item.location.address.line.toLowerCase().includes(value)   
    );

    DisplayForSale(filtered);
});


const DisplayForSale = (data) => {
     let products = data?.map((item) => { 
                 template_sale_data = template_sale_data_id.innerHTML;

                 template_sale_data = template_sale_data.replaceAll('${primary_photo}', item['primary_photo']['href']);
                 template_sale_data = template_sale_data.replaceAll('${branding}', item['branding'][0]['name']);
                 template_sale_data = template_sale_data.replaceAll('${status}', item['status'] === 'for_sale' ? 'For Sale' : '');
                 template_sale_data = template_sale_data.replaceAll('${address}', item['location']['address']['line']);
                 template_sale_data = template_sale_data.replaceAll('${postal_code}', item['location']['address']['postal_code']);
                 template_sale_data = template_sale_data.replaceAll('${state}', item['location']['address']['state']);
                 template_sale_data = template_sale_data.replaceAll('${year_built}', item['description']['year_built']);
                 template_sale_data = template_sale_data.replaceAll('${baths}', item['description']['baths']);
                 template_sale_data = template_sale_data.replaceAll('${beds}', item['description']['beds']);
                 template_sale_data = template_sale_data.replaceAll('${garage}', item['description']['garage']);
                 template_sale_data = template_sale_data.replaceAll('${list_price}', item['list_price']);
                
                return template_sale_data;
                
     }).join('');

     //Insert template into sale section
     sectionForSale.innerHTML = products;
}


//initalization
fetchData();