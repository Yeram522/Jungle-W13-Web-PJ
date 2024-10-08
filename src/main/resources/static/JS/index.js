import { API_ENDPOINTS } from './config.js';
async function login(username, password) {

  const loginData = { "email" : username,  "password" :password };

  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server response:', data);

    return data;  // Spring 서버의 응답을 그대로 반환

  } catch (error) {
    console.error('Login error:', error);
    return { data: false, message: error.message };
  }
}

// 로그인 버튼 이벤트 리스너
document.getElementById('btnLogin').addEventListener('click', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const result = await login(username, password);
  if (result.data) {
    console.log('Login successful');
    window.location.href = "pages/board_list.html";
  } else {
    console.log('Login failed:', result.message);
    // 로그인 실패 처리 (예: 에러 메시지 표시)
    alert("로그인 실패!");
  }
 
});

function openSignUpPopup() {
    const width = 500;
    const height = 500;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open("./pages/signup.html", 'SignUpPopup', 
        `width=${width},height=${height},left=${left},top=${top}`);
}

document.getElementById('btnSignup').addEventListener('click', openSignUpPopup);