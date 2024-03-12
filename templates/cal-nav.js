// making date dynamic
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".day-date");

// getting new date, current year and month
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July",
                "August","September","October","November","December"];

const renderCalendar = () => {
    let lastDateOfMonth = new Date(currYear, currMonth+1,0).getDate(); //getting last date of month
    let dayDate = "";
    for (let i = 1; i <= lastDateOfMonth; i++){
        console.log(i);
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
}
renderCalendar();
