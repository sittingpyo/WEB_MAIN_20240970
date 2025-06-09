// crypto.js - AES256 암호화 / 복호화
function encodeByAES256(key, data) {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString();
}

function decodeByAES256(key, data) {
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password) {
  const key = "key"; // 암호화 키
  const rk = key.padEnd(32, " "); // AES256은 키 길이 32
  const eb = encodeByAES256(rk, password); // 암호화 수행
  return eb;
}

function decrypt_text() {
  const key = "key"; // 복호화 키
  const rk = key.padEnd(32, " ");
  const eb = session_get(); // 암호문 가져오기
  const b = decodeByAES256(rk, eb); // 복호화 수행
  console.log("복호화된 패스워드:", b);
}
