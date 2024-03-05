const loadPhone = async (searchText , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //  console.log(phones);

    displayPhones(phones , isShowAll);

}

const displayPhones = (phones , isShowAll) => {
    // 1.get elementby id
    const phoneContainer = document.getElementById('phone-container');
    // clear before new search card
    phoneContainer.textContent = '';
    // condition to show the button
    const showAllButton = document.getElementById('show-all')
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
    // some of all item
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    
    phones.forEach(phone => {
        // console.log(phone);
        // 2.create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-3 bg-base-100 shadow-xl`;
        // 3.set innerHtml
        phoneCard.innerHTML = `
       <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>With an increment of sales in mobile phones, the competition within the mobile brands is also increasing. </p>
        <div class="card-actions justify-center">
        <button onclick="showDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
       
       `;
        // 4.append child
        phoneContainer.appendChild(phoneCard);
    });
    toggleSpinner(false);
}

const showDetail = async(id) =>{
console.log('clicked' ,id)
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
console.log(data);
showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class=" text-2xl font-bold">chipSet-</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class=" text-2xl font-bold">displaySize-</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class=" text-2xl font-bold">memory-</span>${phone?.mainFeatures?.memory}</p>
    <p><span class=" text-2xl font-bold">sensors-</span>${phone?.mainFeatures?.sensors}</p>
    <p><span class=" text-2xl font-bold">Bluetooth-</span>${phone?.others?.Bluetooth}</p>
    <p><span class=" text-2xl font-bold">GPS-</span>${phone?.others?.GPS}</p>
    <p><span class=" text-2xl font-bold">NFC-</span>${phone?.others?.NFC}</p>
    <p><span class=" text-2xl font-bold">Radio-</span>${phone?.others?.Radio}</p>
    <p><span class=" text-2xl font-bold">USB-</span>${phone?.others?.USB}</p>
    <p><span class=" text-2xl font-bold">WLAN-</span>${phone?.others?.WLAN}</p>
    <p><span class=" text-2xl font-bold">WLAN-</span>${phone?.others?.releaseDate}</p>
    
    
    
    `
    show_details_modal.showModal();

// console.log(phone)
}

const handleSearch = (isShowAll) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText , isShowAll);
}

const toggleSpinner = (isLoading) =>{
    const loadingData = document.getElementById('spinner')
    if(isLoading){
        loadingData.classList.remove('hidden')
    }
    else{
        loadingData.classList.add('hidden');
    }
}

const handleShowAll = () =>{
handleSearch(true);
}

// loadPhone();