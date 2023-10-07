let Table = document.querySelector("table")
let TableBody = document.querySelector("tbody")
let monthHeading = document.querySelector("#month-heading")
let leftArrow = document.querySelector("#left-arrow")
let rightArrow = document.querySelector("#right-arrow")

let months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]
let m = -1;
let year = 2566;

let CurrentMonth;
let CurrentMonthtdElements = [];

let LoginPopup = document.querySelector("#myPopup")

const LoginButton = document.querySelector(".submit");

let id_user = null;
let currentMonth_UserData;

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
function verified() {
    var sucess = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function RefreshCalendar(days, FirstDay, realmonth, christyear){
    CurrentMonthtdElements = []

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
                TableRow.children[j].className = "Month_TableData"
                TableRow.children[j].innerText = ++n;
                CurrentMonthtdElements[CurrentMonthtdElements.length] = TableRow.children[j]
                daycount++;
            } else {
                if (isstart == true){
                    if (++n > days) n = 1;
                    TableRow.children[j].innerText = n;
                }
            }
        }
    }
    console.log(CurrentMonthtdElements)
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

    LoadCurrentMonth_UserData()
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
    CurrentMonth = realmonth;
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

let Task_AddingDebounce = false
let TodoList_Div = document.querySelector(".List")
let TodoListAdd_Button = document.querySelector("#todo-listAddButton")

TodoListAdd_Button.addEventListener("click", () => {
    if (Task_AddingDebounce == false){
        Task_AddingDebounce = true;

        TodoListAdd_Button.style = "display: none"

        let AddButton = document.createElement("button")
        AddButton.innerText = "Add"
        document.querySelector("#todo-listAddButton").parentElement.appendChild(AddButton)

        let TaskName_Input = document.createElement("input")
        
        TaskName_Input.placeholder = "Enter your task"
        TaskName_Input.id = "#TaskName-Input"
        TodoList_Div.appendChild(TaskName_Input)

        let CancelButton = document.createElement("button")
        CancelButton.innerText = "Cancel"
        CancelButton.style = "margin-left: 2%"
        document.querySelector("#todo-listAddButton").parentElement.appendChild(CancelButton)
        
        function reset(){
            AddButton.remove()
            CancelButton.remove()
            TaskName_Input.remove()
            TodoListAdd_Button.style.display = null;
            Task_AddingDebounce = false
        }
        CancelButton.addEventListener("click", () => {
            reset()
        })

        AddButton.addEventListener("click", () => {
            let newLabel = document.createElement("label")
            newLabel.className = "container"
            newLabel.innerText = TaskName_Input.value

            let InputCheckBox = document.createElement("input")
            InputCheckBox.type = "checkbox"
            let InputSpan = document.createElement("span")
            InputSpan.className = "checkmark"

            newLabel.appendChild(InputCheckBox)
            newLabel.appendChild(InputSpan)

            TodoList_Div.appendChild(newLabel)
            reset()
        })
    }
})

function LoadCurrentMonth_UserData(){
    console.log(id_user)
    if (id_user != null){
        gettodolist(CurrentMonth)
            .then(function(result){
                currentMonth_UserData = result.itemformIDsort
                console.log(currentMonth_UserData, currentMonth_UserData.length);
                if (currentMonth_UserData.length != 0){
                    for (let i = 0; i < currentMonth_UserData.length; i++){
                        const todo_Array = currentMonth_UserData[i].todo
                        for (let j = 0; j < todo_Array.length; j++){
                            console.log(todo_Array[j])
                            let newText = document.createElement("p")
                            newText.innerText = todo_Array[j]
                            CurrentMonthtdElements[currentMonth_UserData[i].day - 1].appendChild(newText)
                        }
                        console.log("----------")
                    }
                }
            })
    }
}

LoginButton.addEventListener('click', () => {
    let Username = document.querySelector(".username > input").value
    let Password = document.querySelector(".password > input").value
    data = {userName: Username, password: Password}
    console.log(Username, Password);
    id_user = Login(Username, Password)
    .then(function(result){
        for (var key in result) {
            if (key != "error"){
                id_user = result[key]
                console.log(id_user)
                LoginPopup.className = "popuptext" /* change to class that is toggle off the login Popup or remove login page (This is after login) */
                LoadCurrentMonth_UserData()
            } else {
                /* Incorrect Username/Password */
            }
            break;
        }
    })
});

async function Login(Username, Password) {
    const body = {
        "userName":Username,
        "password":Password
    };
    let s = await fetch('http://localhost:5000/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    return await s.json();
}

async function createitem() {
    const body = {
    "day": 21,
    "month":7,
    "year":2566,
    "id_user":id_user,
    "todo":["กินมาม่า",
            "ทำการบ้าน",
            "อ่านหนังสือ"]
    };
    await fetch('http://localhost:5000/api/items/creact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    return ;
 }

async function createuser() {
    const body = {
    "name": "nameadwa",
    "userName": "saysar",
    "password": "1234"
    };
    await fetch('http://localhost:5000/api/users/creact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    return ;
 }

 async function update_item() {
    const body = {
        "todo":["หาไรกัน",
        "ทำไรกัน",
        "ไม่อ่านหนังสือหรอ",
        "546546"
        ]
    };
    await fetch(`http://localhost:5000/api/items/put/${id_user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    return ;
 }

 async function delete_item() {
    await fetch(`http://localhost:5000/api/items/put/${idbox}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    return ;
 }

 async function gettodolist(month) {
    let a = 10;
    console.log(id_user, month, a)
    let todolist = await fetch(`http://localhost:5000/api/items/get/${id_user}/${month}/${year}/${a}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
    return todolist.json();
 }

 async function getmounthbox(month) {
    let todolist = await fetch(`http://localhost:5000/api/items/get/${id_user}/${month}/${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
    return monthitembox.json();
 }