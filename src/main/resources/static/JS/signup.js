async function dupleCheck(input) {
    const url = `http://localhost:3000/users/${input}/duplicate`;

    const username = document.getElementById('name').value; // 닉네임

    try {
        const response = await fetch(url,{
            method: 'GET',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(username)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);

        return data;  // Spring 서버의 응답을 그대로 반환
    } catch(error){
        console.error('Login error:', error);
        return { success: false, error: error.message};
    }
}

// 중복 버튼 이벤트 리스너
document.getElementById('nameDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('name').value;
  
    const result = await dupleCheck(username);
    if (result.successful) {
      console.log('name ok');
    } else {
      console.log('name duplicate', result.message);
      // 입력 필드 초기화
      document.getElementById('name').value = '';
      // 중복이라고 뜨게하기.
    } 
});

document.getElementById('emailDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('email').value;
  
    const result = await dupleCheck(username);
    if (result.successful) {
      console.log('email ok');
    } else {
      console.log('email duplicate:', result.message);
      // 입력 필드 초기화
      document.getElementById('email').value = '';
      // 중복이라고 뜨게하기.
    } 
});