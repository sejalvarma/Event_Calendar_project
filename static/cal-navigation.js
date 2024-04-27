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


//default events array
// const eventsArr = [
// {
//     day: 13,
//     month: 4,
//     year: 2024,
//     events: [
//         {
//             title: "wedding ",
//             note: "Reception at Marigold",
//         },
//         {
//             title: "Birthday",
//             note: "Rishis party at Verandah"
//         },
//     ],
// },
// {
//     day: 18,
//     month: 4,
//     year: 2024,
//     events: [
//         {
//             title: "wedding ",
//             note: "Reception at Marigold",
//         },
//         {
//             title: "Bday",
//             note: "Rishis party at Verandah"
//         },
//     ],
// },

// ];

let dom_uid = "u" + document.querySelector(".user-id").innerHTML;
var allUsers = {
    u2: ["this is super user account"],
};
console.log(allUsers); 


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
            updateEvents(i);
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
    // getEvents(dom_uid);
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
            console.log("active day in addlistenr: ",activeDay);
            updateEvents(Number(e.target.innerHTML));
            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });
            e.target.classList.add("active");
            // dateInputinForm = document.querySelector(".edate");
            // yr = year;
            // mth = month;
            // dy = activeDay;
            // dateInputinForm.value = dy + "-" + mth + "-" + yr;
            // console.log(dateInputinForm);

        });
    });
}

// ///------------------------------------------------------------------------------------------------------
// function saveEvents(dom_uid) {
//     localStorage.setItem((dom_uid + "_events"), JSON.stringify(allUsers[dom_uid]));
//     // console.log("allUsers object:",allUsers);
// }
// function getEvents(dom_uid) {
//     if (localStorage.getItem(dom_uid + "_events") === null) {
//         return;
//     }
//     // console.log("hello local storage");
//     console.log("all users object:",allUsers);
//     allUsers[dom_uid].push(...JSON.parse(localStorage.getItem(dom_uid + "_events")));
// }


//show active day events 
function updateEvents(date) {
    let events = "";
    allUsers[dom_uid]?.forEach((event) => {
        //get events of active day only
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            //show event on document
            event.events.forEach((i) => {
                console.log(i);
                events += `
                <div class="event">
                    <div class="lhs">
                        <div class="title">
                            <h3 class="event__title">${i.title}</h3>
                        </div>
                        <div class="note">
                            <p class="event__note">${i.note}</p>
                        </div>
                     </div>
                    <div class="rhs">
                        <i class="ri-delete-bin-line delete"></i>
                    </div>
                </div>
                `;
            });
        }
    });

    //if no events found
    if ((events === "")) {
        events = `<p>No events found</p>`
    }
    eventsContainer.innerHTML = events;
    // saveEvents(dom_uid);
}
console.log(dom_uid);


//function to add events
addEventSubmitBtn = document.querySelector(".add-event-submit");
addEventTitle = document.querySelector(".addEventTitle");
addEventNote = document.querySelector(".addEventNote");
addEventDate = document.querySelector(".edate");
addEventSubmitBtn.addEventListener("click", () => {

    if (addEventTitle.value === "") {
        alert("Please enter event title!");
    } else {
        const eTitle = addEventTitle.value;
        const eNote = addEventNote.value;
        const newEvent = {
            title: eTitle,
            note: eNote
        };
        for (var key in allUsers) {
            if (key === dom_uid) {
                
                let eventAdded = false;
                if(allUsers[key].length > 0){
                    allUsers[key].forEach((item) => {
                        if (
                            item.day === activeDay &&
                            item.month === month + 1 &&
                            item.year === year
                        ) {
                            item.events.push(newEvent);
                            eventAdded = true;
                        }
                    });
                }
                if(!eventAdded){
                    allUsers[key].push({
                    day: activeDay,
                    month: month + 1,
                    year: year,
                    events: [newEvent],
                    });
                }
                updateEvents(activeDay);
                const activeDayElement = document.querySelector(".day.active");
                if (!activeDayElement.classList.contains("event")) {
                    activeDayElement.classList.add("event");
                }
            } else {
                allUsers[dom_uid] = [];
                allUsers[dom_uid].push({
                    day: activeDay,
                    month: month + 1,
                    year: year,
                    events: [newEvent],
                });
                // saveEvents(dom_uid);
                updateEvents(activeDay);
                const activeDayElement = document.querySelector(".day.active");
                if (!activeDayElement.classList.contains("event")) {
                    activeDayElement.classList.add("event");
                }
            }
            saveEvents(dom_uid);    
        }
    }
});


// function to delete event
 const delBtn = document.querySelector(".event.rhs.delete");
 delBtn.addEventListener("click", (e) => {
     if (e.target.classList.contains("event")) {
         const eventTitle = e.target.children[0].children[0].children[0].innerHTML;
         //getting title of event and then search in array
         allUsers[dom_uid].forEach((event) => {
             if (
                 event.day === activeDay &&
                 event.month === month + 1 &&
                 event.year === year
             ) {
                 event.events.forEach((item, index) => {
                     if (item.title === eventTitle) {
                         event.events.splice(index, 1);
                     }
                 });
                 // if no events remaining on that day, we remove day from eventsarr array
                 if (event.events.length === 0) {
                     allUsers[dom_uid].splice(allUsers[dom_uid].indexOf(event), 1);
                     //remove active class
                     const activeDayElem = document.querySelector(".day.active");
                     if (activeDayElem.classList.contains("event")) {
                         activeDayElem.classList.remove("event");
                     }
                 }
             }
         });
         //after removing from array update event
         updateEvents(activeDay);
     }
 });



//-------------------To set date in popup to the active day selected
// dateEl_PopupForm = document.querySelector("#eventDate");
// dateEl_PopupForm.value = new Date(year, month + 1, activeDay)



// =============================================USER-SPECIFIC DATA========================================================
// local storage
function saveEvents(dom_uid) {
    localStorage.setItem((dom_uid + "_events"), JSON.stringify(allUsers[dom_uid]));
    // console.log("allUsers object:",allUsers);
}
function getEvents(dom_uid) {
    if (localStorage.getItem(dom_uid + "_events") === null) {
        return;
    }
    // console.log("hello local storage");
    console.log("all users object:",allUsers);
    allUsers[dom_uid].push(...JSON.parse(localStorage.getItem(dom_uid + "_events")));
}

getEvents(dom_uid);



function openPopup(){
    popup.classList.add("open-popup");
    formDateInput = document.querySelector("#eventDate");
    year_val = year;
    month_val = month+1;
    day_val = activeDay;   
    console.log("aciveat: ",    activeDay)
    var date_Val = year_val + '-' + month_val + '-' + day_val;
    // formDateInput.setAttribute("value",date_Val);
    console.log("hello k123",date_Val);
    console.log(day_val);
    console.log(formDateInput);
    formDateInput.value = date_Val;
    // console.log(formDateInput.value);
    
}