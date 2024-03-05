const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //  console.log(phones);

    displayPhones(phones);

}

const displayPhones = phones => {
    // 1.get elementby id
    const phoneContainer = document.getElementById('phone-container');
    // clear before new search card
    phoneContainer.textContent = '';
    // condition to show the button
    const showAllButton = document.getElementById('show-all')
    if(phones.length > 12){
        showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
    // some of all item
    phones = phones.slice(0, 12);
    phones.forEach(phone => {
        console.log(phone);
        // 2.create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-3 bg-base-100 shadow-xl`;
        // 3.set innerHtml
        phoneCard.innerHTML = `
       <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
       
       `;
        // 4.append child
        phoneContainer.appendChild(phoneCard);
    });
    toggleSpinner(false);
}

const handleSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
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
// loadPhone();