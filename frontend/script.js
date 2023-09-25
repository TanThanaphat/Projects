let Table = document.querySelector("table")
let TableBody = document.querySelector("tbody")
let monthHeading = document.querySelector("#month-heading")
let leftArrow = document.querySelector("#left-arrow")
let rightArrow = document.querySelector("#right-arrow")

let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]
let m = -1;
let year = 2566;

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
function verified() {
    var sucess = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function RefreshCalendar(days, FirstDay, realmonth, christyear){
    const length = TableBody.children.length
    for (let i = 0; i < length; i++)
        TableBody.children[0].remove()
    for (let i = 0; i < 6; i++){
        let newTableRow = document.createElement("tr")
        newTableRow.className = "table-row"
        for (let j = 0; j < 7; j++){
            let newTableCell = document.createElement("td")
            newTableRow.appendChild(newTableCell)
        }
        Table.children[1].appendChild(newTableRow);
    }
    /* background-color: rgb(217, 217, 217);  grey-color */
    let n = 0;
    let daycount = 0;
    let isstart = false;
    let currentDayOrder
    for (let i = 0; i < 6; i++){
        let TableRow = TableBody.children[i]
        for (let j = 0; j < 7; j++){
            
            currentDayOrder = j;
            currentDayOrder++;
            if (currentDayOrder == 7) currentDayOrder = 0;
            
            if (currentDayOrder == FirstDay) isstart = true;
            if (daycount < days && isstart == true){
                TableRow.children[j].style.backgroundColor = "rgb(217, 217, 217)"
                TableRow.children[j].innerText = ++n;
                daycount++;
            } else {
                if (isstart == true){
                    if (++n > days) n = 1;
                    TableRow.children[j].innerText = n;
                }
            }
        }
    }
    /* add day number for before and next month */
    currentDayOrder = FirstDay
    if (currentDayOrder == 0) currentDayOrder = 7;
    currentDayOrder--;
    let mbefore = realmonth - 1;
    if (mbefore < 1) mbefore = 12; 
    let mbefore_days = getDaysAmount(mbefore, christyear)
    for (let i = mbefore_days - currentDayOrder; i < mbefore_days; i++){
        TableBody.children[0].children[i - (mbefore_days - currentDayOrder)].innerText = i + 1;
    }
}

function getDaysAmount(realmonth, christyear){
    let days;
    if (realmonth == 4 || realmonth == 6 || realmonth == 9 || realmonth == 11){
        days = 30
    } else if (realmonth == 2){
        if ((christyear % 4 == 0 && christyear % 100 != 0) || christyear % 400 == 0){
            days = 29
        } else days = 28
    } else {
        days = 31
    }
    return days;
}

function ChangeMonth(status){
    m += status
    if (m < 0){
        m = 11;
        year--;
    }
    if (m > 11){
        m = 0;
        year++;
    }

    monthHeading.innerHTML = months[m] + " " + year

    let realmonth = m + 1;
    let christyear = year - 543;
    let days = getDaysAmount(realmonth, christyear);

    let stringMonth = "0" + realmonth
    stringMonth = stringMonth.substring(stringMonth.length - 2)

    let date = new Date(christyear + "-" + stringMonth + "-01T00:00:00");
    let getDay = date.getDay();

    console.log(getDay)

    RefreshCalendar(days, getDay, realmonth, christyear)
}

leftArrow.addEventListener("click", () => {
    ChangeMonth(-1)
})
rightArrow.addEventListener("click", () => {
    ChangeMonth(1)
})

ChangeMonth(1)