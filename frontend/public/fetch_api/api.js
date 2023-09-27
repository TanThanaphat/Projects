 export async function Login(Username, Password) {
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
    return s.json();
 }

 export async function creatitem() {
    const body = {
    "day": 21,
    "month":7,
    "year":2566,
    "id_user":"64fe94545920f7fa3f9fdbe6",
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

 export async function creatitem() {
    const body = {
    "day": 21,
    "month":7,
    "year":2566,
    "id_user":"64fe94545920f7fa3f9fdbe6",
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

 export async function getid02(id_user, month) {
    let Username = document.querySelector("#Username").value
    let Password = document.querySelector("#Password").value
    console.log(Username, Password)
}

