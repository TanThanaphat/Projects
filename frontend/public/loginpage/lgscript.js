import { getid,getid02 } from '../fetch_api/api.js'

const submit = document.getElementById("login-submit");
const nextsubmit = document.getElementById("login01");
nextsubmit.addEventListener('click', abcde);

function abcde(){
  console.log("hello word");
  getid02();
}
