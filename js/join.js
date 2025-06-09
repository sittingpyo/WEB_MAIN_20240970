// join.js - 회원가입 기능 + 입력 필터링 + XSS 방지 + 객체 저장

class SignUp {
  constructor(name, email, password, re_password) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._re_password = re_password;
  }

  setUserInfo(name, email, password, re_password) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._re_password = re_password;
  }

  getUserInfo() {
    return {
      name: this._name,
      email: this._email,
      password: this._password,
      re_password: this._re_password
    };
  }
}

function sanitizeInput(input) {
  const temp = document.createElement('div');
  temp.innerText = input;
  return temp.innerHTML;
}

function join() {
  let form = document.querySelector("#join_form");
  let nameInput = document.querySelector("#form3Example1c");
  let emailInput = document.querySelector("#form3Example3c");
  let passwordInput = document.querySelector("#form3Example4c");
  let re_passwordInput = document.querySelector("#form3Example4cd");
  let agree = document.querySelector("#form2Example3c");

  const name = sanitizeInput(nameInput.value.trim());
  const email = sanitizeInput(emailInput.value.trim());
  const password = sanitizeInput(passwordInput.value.trim());
  const re_password = sanitizeInput(re_passwordInput.value.trim());

  const nameRegex = /^[가-힣]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!name || !email || !password || !re_password) {
    alert("모든 입력 항목을 작성해 주세요.");
    return;
  }
  if (!nameRegex.test(name)) {
    alert("이름은 한글만 입력 가능합니다.");
    nameInput.focus();
    return;
  }
  if (!emailRegex.test(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    emailInput.focus();
    return;
  }
  if (!pwRegex.test(password)) {
    alert("비밀번호는 8자 이상, 대소문자+숫자+특수문자를 포함해야 합니다.");
    passwordInput.focus();
    return;
  }
  if (password !== re_password) {
    alert("비밀번호가 일치하지 않습니다.");
    re_passwordInput.focus();
    return;
  }
  if (!agree.checked) {
    alert("약관에 동의하셔야 가입이 가능합니다.");
    return;
  }

  const newUser = new SignUp(name, email, password, re_password);
  sessionStorage.setItem("signUpUser", JSON.stringify(newUser.getUserInfo()));

  alert("회원가입 완료!");
  form.action = "../index.html";
  form.method = "get";
  form.submit();
}

document.addEventListener('DOMContentLoaded', () => {
  const joinBtn = document.getElementById("join_btn");
  if (joinBtn) {
    joinBtn.addEventListener("click", join);
  }
});
