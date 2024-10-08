async function login(username, password) {
    const url = 'http://localhost:3000/login';
    
    try {
      const response = await fetch(url);
      const users = await response.json();
  
      const user = users.find(u => u.username === username && u.password === password);
      console.log('Login response data:', JSON.stringify(users, null, 2));
      if (user) {
        console.log('Login successful:', user);
        return { success: true, user };
      } else {
        console.log('Login failed: Invalid username or password');
        return { success: false };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }
  
// 버튼 클릭 이벤트 핸들러
document.getElementById('btnLogin').addEventListener('click', async (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    const result = await login(username, password);
    if (result.success) {
        console.log('Login successful');
      // 여기에 로그인 성공 후 처리 로직 추가
      // 입력 필드 내용 지우기
        usernameInput.value = '';
        passwordInput.value = '';
  
      // 선택적: 사용자 이름 입력 필드에 포커스 주기
        usernameInput.focus();
    } else {
      console.log('Login failed');
      // 여기에 로그인 실패 처리 로직 추가
    }
  
    
  });

function openSignUpPopup() {
    const width = 500;
    const height = 500;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open("./pages/form_join_member.html", 'SignUpPopup', 
        `width=${width},height=${height},left=${left},top=${top}`);
}

document.getElementById('btnSignup').addEventListener('click', openSignUpPopup);