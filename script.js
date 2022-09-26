let menuBtn = document.getElementById('menu_btn_id');
let menu = document.querySelector('.menu ul');

let sectionForSale = document.getElementById('sale_section_id');
let detailsSection = document.getElementById('details_section_id');


let input = document.getElementById('input_search_id');
let optionsForSale = document.getElementById('options_id');
let items = [];


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


//Fetching Data
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819bbdfbemsh728d704970277e1p165420jsn747a79b95703',
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
	}
};

async function fetchData(){
    try{
        const response = await fetch('https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=NY&city=New%20York%20City&offset=0&limit=200&sort=relevance', options)
        const data = await response.json();
        items = data.listings; 
        DisplayForSale(data.listings);   
        console.log(data.listings);
    } catch(e){
        console.log('There was a problem: ', e)
    }
} 


//Search with input by City name
input.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();

    const filtered = items.filter( item =>
        item.address_new.city.toLowerCase().includes(value)   
    );

    DisplayForSale(filtered);
});


//Sorting options by criteria
optionsForSale.addEventListener('change', (e) => {
    let value = e.target.value;

    switch(value) {
        case 'All':
            DisplayForSale(items);
            break;
        case 'lower_price':
            let filteredByLower = items.sort((a,b) => 
            a.price_raw - b.price_raw);
            DisplayForSale(filteredByLower);
            break;
        case 'higher_price':
            let filteredByHigher = items.sort((a,b) => 
            b.price_raw - a.price_raw);
            DisplayForSale(filteredByHigher);
            break;  
        case 'newly_built':
            let filteredByBuilt = items.filter( item =>
            item.is_new_construction);
            DisplayForSale(filteredByBuilt);
            break; 
        case 'condo':
            let filteredByCondo = items.filter( item =>
            item.prop_type === 'condo');
            DisplayForSale(filteredByCondo);
            break;
        case 'multi_family':
            let filteredBySinFem = items.filter( item =>
            item.prop_type === 'multi_family');
            DisplayForSale(filteredBySinFem);
            break;
        case 'single_family':
            let filteredByMulFem = items.filter( item =>
            item.prop_type === 'single_family');
            DisplayForSale(filteredByMulFem);
            break;      
    } 
});


//Type of property for each item
const propType = (type) => {
    switch(type) {
        case 'condo':
            type = 'Condo';
            break;
        case 'multi_family':
            type = 'Multifamily';
            break;
        case 'single_family':
            type = 'Single Family';
            break;
    }
    return type;
};


//Replace data in correct place
const DisplayForSale = (data) => {
     let products = data?.map((item) => { 

                 template_sale_data = template_sale_data_id.innerHTML;

                 template_sale_data = template_sale_data.replaceAll('${property_id}', item['property_id']);
                 template_sale_data = template_sale_data.replaceAll('${primary_photo}', item?.['photo'] ? item['photo'] : 'https://image.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg');
                 template_sale_data = template_sale_data.replaceAll('${branding}', item['office_name']);
                 template_sale_data = template_sale_data.replaceAll('${status}', item['prop_status'] === 'for_sale' ? 'For Sale' : '');
                 template_sale_data = template_sale_data.replaceAll('${state}', item['address_new']['state']);
                 template_sale_data = template_sale_data.replaceAll('${city}', item['address_new']['city']);
                 template_sale_data = template_sale_data.replaceAll('${address}', item['address_new']['line']);
                 template_sale_data = template_sale_data.replaceAll('${postal_code}', item['address_new']['postal_code']);
                 template_sale_data = template_sale_data.replaceAll('${is_new_construction}', !item['is_new_construction'] ? 'No' : 'Yes');
                 template_sale_data = template_sale_data.replaceAll('${prop_type}', propType(item['prop_type']));
                 template_sale_data = template_sale_data.replaceAll('${baths}', item['baths']);
                 template_sale_data = template_sale_data.replaceAll('${beds}', item['beds']);
                 template_sale_data = template_sale_data.replaceAll('${price}', item['price']); 
                
                return template_sale_data;
                
     }).join('');

     //Insert template into sale section
     sectionForSale.innerHTML = products;
} 


//Fetching data details
const itemDetails = async (btn) => {
    
    let itemId = btn.parentElement.parentElement.getAttribute('data-id');
     
    try{
        const response = await fetch(`https://realty-in-us.p.rapidapi.com/properties/detail?listing_id=608763437&prop_status=for_sale&property_id=${itemId}`, options)
        const data = await response.json(); 
        let item = data.listing; 
        displayDetails(item); 
        console.log(item);
        
    } catch(e){
        console.log('There was a problem: ', e)
    }   
};


//Show details and open modal
const displayDetails = (item) => {
    template_details = template_details_data_id.innerHTML;

    template_details = template_details.replaceAll('${branding}', item['broker']['name']);
    template_details = template_details.replaceAll('${photo}', item['photo_count'] > 0 ? item['photo']['href'] : 'https://image.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg');
    template_details = template_details.replaceAll('${status}', item['prop_status'] === 'for_sale' ? 'For Sale' : '');
    template_details = template_details.replaceAll('${price}', item['price']);
    template_details = template_details.replaceAll('${prop_type}', propType(item['prop_type']));
    template_details = template_details.replaceAll('${price}', item['price']);
    template_details = template_details.replaceAll('${state}', item['address']['state']);
    template_details = template_details.replaceAll('${city}', item['address']['city']);
    template_details = template_details.replaceAll('${address}', item['address']['line']);
    template_details = template_details.replaceAll('${postal_code}', item['address']['postal_code']);
    template_details = template_details.replaceAll('${neighborhood}', item['neighborhood']);
    template_details = template_details.replaceAll('${baths}', item['baths']);
    template_details = template_details.replaceAll('${beds}', item['beds']);
    template_details = template_details.replaceAll('${garage}', item?.['garage'] ? item['garage'] : ' No');
    template_details = template_details.replaceAll('${year_built}', item['year_built']);
    template_details = template_details.replaceAll('${agent_name}', item['agent']['name']);
    template_details = template_details.replaceAll('${agent_office_name}', item['agent']['office_name']);
    template_details = template_details.replaceAll('${agent_email}', item['agent']['email']);
    template_details = template_details.replaceAll('${agent_number}', item['agent']['phone1']['number']);
    template_details = template_details.replaceAll('${description}', item['description']);
    template_details = template_details.replaceAll('${description_substr}', item['description']);


     
                            
                             

    detailsSection.innerHTML = template_details; 
    detailsSection.style.display = 'block';
}


//initalization
fetchData();






