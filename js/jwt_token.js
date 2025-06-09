// jwt_token.js - JWT 생성 및 검증
const JWT_SECRET = "your_secret_key_here";

function generateJWT(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));

  const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
  const encodedSignature = CryptoJS.enc.Base64.stringify(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;

    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
    const calculatedSignature = CryptoJS.enc.Base64.stringify(signature);

    if (calculatedSignature !== encodedSignature) return null;

    const payload = JSON.parse(atob(encodedPayload));
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      console.log("보안 토큰이 만료되었습니다.");
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

function isAuthenticated() {
  const token = localStorage.getItem("jwt_token");
  if (!token) return false;

  const payload = verifyJWT(token);
  console.log("토큰 내용:", payload);
  return !!payload;
}

function checkAuth() {
  const authenticated = isAuthenticated();
  if (authenticated) {
    alert("정상적으로 토큰이 검증되었습니다.");
  } else {
    alert("토큰 검증 실패! 인증되지 않은 접근입니다.");
    window.location.href = "../login/login.html";
  }
}
window.checkAuth = checkAuth;