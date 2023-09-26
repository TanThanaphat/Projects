import { getid,getid02 } from '../fetch_api/api.js'


const nextsubmit = document.getElementById("login01");
nextsubmit.addEventListener('click', singin);

function singin(){
  console.log("hello word01");
  getid02();
}
