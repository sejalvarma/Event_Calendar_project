let popup = document.getElementById('add-event-popup');

// function openPopup(){
//     popup.classList.add("open-popup");
//     formDateInput = document.getElementById("eventDate");
//     year_val = year;
//     month_val = month+1;
//     day_val = activeDay;   
//     var date_Val = year_val + '-' + month_val + '-' + day_val;
//     formDateInput.setAttribute("value",date_Val);
//     // document.getElementById("eventDate").value = date_Val;
//     // console.log(formDateInput.value);
    
// }
function closePopup(){
    popup.classList.remove("open-popup")
}

function clearForm(){
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventNote").value = "";
    document.getElementById("eventDate").value = "";
}


const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('#prev'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input'),
    eventsContainer = document.querySelector('.events'),
    next = document.querySelector('#next');

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January", "February",
    "March", "April",
    "May", "June",
    "July", "August",
    "September", "October",
    "November", "December"
];


function initCalendar() {
    //to get prev month days and current month all days amd rem next month days 
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0)
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    //update date heading of calendar
    date.innerHTML = months[month] + " " + year;
    //adding days
    let days = "";
    // prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date" > ${prevDays - x + 1}</div>`;
    }
    //current month days
    for (let i = 1; i <= lastDate; i++) {
        //checking if any events on current day
        let event = false;
        // if(allUsers[dom_uid].length > 0){
        allUsers[dom_uid]?.forEach((eventObj) => {
            if (eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                //if found event
                event = true;
            }
        });
        // }
        //if day is today then add today class
        if (i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            //if event is found also add event class
            //add active class at startup
            if (event) {
                days += `<div class="day today active event" > ${i}</div>`;
            } else {
                days += `<div class="day today active" > ${i}</div>`;

            }
        }
        // add remaining days as it is
        else {
            if (event) {
                days += `<div class="day event" > ${i}</div>`;
            } else {
                days += `<div class="day" > ${i}</div>`;
            }
        }
    }
    // next months days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    //add listener after calendar initialized
    addListener();
}
initCalendar();


//prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}


//next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}


//cal nav buttons
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //allowing only number and not any other key
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date");
}

// Showing todays date and top left bar
const dateBlock = document.querySelector(".todaysDate-display");
todaysDate = new Date();
tyear = todaysDate.getFullYear();
tmon = todaysDate.getMonth();
tdate = todaysDate.getDate();
dateBlock.innerHTML = tdate + " " + months[tmon] + " " + tyear;

//---------------------------------------

var activeDay;
//function to add listener on days
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //setting current day as active day
            activeDay = Number(e.target.innerHTML);
            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });
            e.target.classList.add("active");
        })})}
