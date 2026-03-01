//my-info.html
//chay 1 lan thoi ? cho chay lai thi sao
let tagline = document.getElementById("tagline");
const text = "Front-end Developer ";
let i = 0;
function typing() {
  if (i < text.length) {
    tagline.style.color = "#34B0EA";
    tagline.style.textDecorationLine = "underline ";
    tagline.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 100);
  }
  else {
    setTimeout(resetTyping, 2000);
  }
}

function resetTyping() {
  i = 0;
  tagline.innerHTML = "";
  typing();
}
typing();

//form validation
document.getElementById("info-contactForm").addEventListener("submit",function(event){
  event.preventDefault();
  let email = document.getElementById("email");
  let name = document.getElementById("name").value.trim();

  let emailError = document.getElementById("emailError");
  let nameError = document.getElementById("nameError");

  emailError.textContent = "";
  nameError.textContent = "";

  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  let isValid = true;

  if(!regexEmail.test(email)) {
    emailError.textContent = "Email không hợp lệ!";
    emailError.style.color = "red"; 
    isValid = false;
  }else {
    emailError.textContent = "Email hợp lệ!";
    emailError.style.color = "green";
    isValid = true;
  }

  // Regex: chỉ cho phép chữ cái và khoảng trắng 
  let regexName = /^[A-Za-zÀ-ỹ\s]+$/; 
  if (name === "") { 
    nameError.textContent = "Tên không được để trống!"; 
    nameError.style.color = "red"; 
    isValid = false;
  } else if (!regexName.test(name)) { 
    nameError.textContent = "Tên chỉ được chứa chữ cái và khoảng trắng!";
    nameError.style.color = "red"; 
    isValid = false;
   } else if (name.length < 2) { 
    nameError.textContent = "Tên phải có ít nhất 2 ký tự!"; 
    isValid = false;
  } else { 
    nameError.textContent = "Tên hợp lệ!"; 
    nameError.style.color = "green"; 
    isValid = true;
  }
  
  if(isValid) {
    alert("Gửi thành công");
    emailError.textContent = "";
    nameError.textContent = "";
  }
});