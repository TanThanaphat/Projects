 export async function Login(Username, Password) {
    console.log(Username)
    console.log(Password)
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
    
    console.log(s);
    return s;
 }

 export async function getid02(id_user, month) {
    let Username = document.querySelector("#Username").value
    let Password = document.querySelector("#Password").value
    console.log(Username, Password)
}

