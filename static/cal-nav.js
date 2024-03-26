const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".arrow-icons i");

// getting new date, current year and month
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();
console.log(date, currMonth, currYear);

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); //getting first day of month
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of month
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); //getting last day of month
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month
//    console.log(lastDateOfMonth);
    let dayDate = "";

    for (let i = firstDayOfMonth; i > 0; i--){
        dayDate += `<div class="day inactive"> <h3> ${lastDateOfLastMonth - i + 1} </h3> </div>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                            && currYear === new Date().getFullYear() ? "active" : "";
        dayDate += `<div class="day ${isToday}"> <h3> <span
        > ${i} </span> </h3> </div>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++){
        dayDate += `<div class="day inactive"> <h3> ${i - lastDayOfMonth + 1} </h3> </div>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = dayDate;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { //add click event to both icons  
        //if prev icon is clicked then decrement current month by 1 , or else increment by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth >11){
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }else{
            date = new Date();
        }

        renderCalendar();
    })
});