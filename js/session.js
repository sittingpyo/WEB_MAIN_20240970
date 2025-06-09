// session.js - 세션 관리 + 쿠키 + 로그인 실패 카운트

// 쿠키 설정 함수
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 쿠키 가져오기
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 로그인 세션 저장
function session_set() {
  const session_id = document.querySelector("#typeEmailX");
  const session_pass = document.querySelector("#typePasswordX");

  if (sessionStorage) {
    sessionStorage.setItem("Session_Storage_id", session_id.value);
    sessionStorage.setItem("Session_Storage_pass", session_pass.value);
  } else {
    alert("세션 스토리지를 지원하지 않습니다.");
  }
}

// 세션 가져오기
function session_get() {
  if (sessionStorage) {
    return sessionStorage.getItem("Session_Storage_pass");
  } else {
    alert("세션 스토리지를 지원하지 않습니다.");
  }
}

// 세션 삭제
function session_del() {
  if (sessionStorage) {
    sessionStorage.removeItem("Session_Storage_id");
    sessionStorage.removeItem("Session_Storage_pass");
    alert("로그아웃: 세션 삭제됨");
  }
}

// 로그인 상태 확인
function session_check() {
  if (sessionStorage.getItem("Session_Storage_id")) {
    alert("이미 로그인된 상태입니다.");
    location.href = "../login/index_login.html";
  }
}

// 자동 아이디 입력 + 세션 검사
function init() {
  const emailInput = document.getElementById("typeEmailX");
  const idsave_check = document.getElementById("idSaveCheck");
  const savedId = getCookie("id");

  if (savedId) {
    emailInput.value = savedId;
    idsave_check.checked = true;
  }

  session_check(); // 세션 유지 검사
}

// 로그인 실패 횟수 제한
function login_failed_count() {
  let count = parseInt(getCookie("login_fail") || "0");
  count += 1;
  setCookie("login_fail", count, 1);

  if (count >= 3) {
    alert("로그인 3회 실패. 잠시 후 다시 시도해 주세요.");
    return false;
  }
  return true;
}

// 로그아웃 시 세션 제거 + 메인 이동
function logout() {
  session_del();
  location.href = "../index.html";
}
