import { Login,getid02 } from '../fetch_api/api.js'


const nextsubmit = document.getElementById("login01");
nextsubmit.addEventListener('click', signin);

async function signin(){
  let Username = document.querySelector("#Username").value
  let Password = document.querySelector("#Password").value
  
  let idbox = await Login(Username,Password);
  console.log(idbox);
}
