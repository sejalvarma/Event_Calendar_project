let popup = document.getElementById('add-event-popup');

function openPopup(){
    popup.classList.add("open-popup");
}
function closePopup(){
    popup.classList.remove("open-popup")
}

function clearForm(){
    document.getElementById('new-event-form').reset();
}