const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelector(".arrow-icons i");

// getting new date, current year and month
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();
console.log(date, currMonth, currYear);

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

const renderCalendar = () => {
    let lastDateOfMonth = new Date(currYear, currMonth+1, 0).getDate(); //getting last date of month
//    console.log(lastDateOfMonth);
    let dayDate = "";
    for (let i = 1; i <= lastDateOfMonth; i++){
        console.log(i);
        dayDate += `<div class="day"> <h3> ${i} </h3> </div>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = dayDate;
}
renderCalendar();

prevNextIcon.forEach(element => {
    
});