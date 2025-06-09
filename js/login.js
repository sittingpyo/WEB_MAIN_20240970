// login.js - 로그인 기능 전체 구현
import { session_set } from "./session.js";
import { encrypt_text } from "./crypto.js";
import { generateJWT } from "./jwt_token.js";

// 로그인 입력 검증 및 토큰/세션 처리
function check_input() {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("typeEmailX");
  const passwordInput = document.getElementById("typePasswordX");
  const idsave_check = document.getElementById("idSaveCheck");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("이메일과 비밀번호를 모두 입력해주세요.");
    return false;
  }

  // 로그인 실패 제한 (3회 초과 시 로그인 차단)
  if (!login_failed_count()) return false;

  // ID 저장 체크 → 쿠키 저장 or 삭제
  if (idsave_check.checked) {
    alert("쿠키를 저장합니다.");
    setCookie("id", email, 1);
  } else {
    setCookie("id", "", 0);
  }

  // 패스워드 암호화 → 세션 저장
  const encryptedPass = encrypt_text(password);
  sessionStorage.setItem("Session_Storage_id", email);
  sessionStorage.setItem("Session_Storage_pass", encryptedPass);

  // JWT 생성 → 로컬 스토리지 저장
  const payload = {
    id: email,
    exp: Math.floor(Date.now() / 1000) + 3600 // 1시간
  };
  const jwtToken = generateJWT(payload);
  localStorage.setItem("jwt_token", jwtToken);

  alert("로그인 성공!");
  loginForm.action = "../login/index_login.html";
  loginForm.method = "get";
  loginForm.submit();
}

// 로그인 실패 횟수 쿠키 처리
function login_failed_count() {
  let count = parseInt(getCookie("login_fail") || "0");
  count += 1;
  setCookie("login_fail", count, 1);

  if (count >= 3) {
    alert("로그인 3회 실패로 제한됩니다.");
    return false;
  }
  return true;
}

// 쿠키 설정
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

export { check_input };
