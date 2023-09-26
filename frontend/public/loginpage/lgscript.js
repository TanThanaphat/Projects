import { getid,getid02 } from '../fetch_api/api.js'


const nextsubmit = document.getElementById("login01");
nextsubmit.addEventListener('click', signin);

function signin(){
  console.log("hello word01");
  getid02();
}
