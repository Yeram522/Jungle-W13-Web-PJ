import { API_ENDPOINTS } from './config.js';
// static variable
// 중복확인 체크를 했는지 확인. 중복확인을 누른상태에서 input란이 없데이트 되면 갱신되어야한다.
var duplename = false;
var dupleemail = false;

async function dupleCheck(input, type) {
    const url = API_ENDPOINTS.USERS + `/${input}/${type ? "duplicate" : "username-duplicate"}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);

        return data;
    } catch(error) {
        console.error('Duplicate check error:', error);
        return { successful: false, error: error.message };
    }
}

function showDuplicateResult(type){
    var formgroup = document.querySelector('#signupForm').children[type];

    // 이미 중복 메세지가 떠있다면 뜨지 않는다.
    if(formgroup.querySelector('.duplicateCheckMsg') != null)
        return;

    const name = (type == 0 ? "닉네임" : "이메일");
    var text = `‼️ 중복된 ${name} 입니다.‼️`
    const newDiv = document.createElement('p');
    const textNode = document.createTextNode(text);
    
    newDiv.appendChild(textNode);

    // 클래스 추가
    newDiv.className = 'duplicateCheckMsg';

    // 생성한 요소를 문서에 추가
    document.body.appendChild(newDiv);

    formgroup.appendChild(newDiv);
}

function removeDuplicateResult(type){
    // 중복이 아닌데 중복메세지가 떠있다면 지워준다.
    var formgroup = document.querySelector('#signupForm').children[type];
    var msg = formgroup.querySelector('.duplicateCheckMsg');
    if(msg != null){
      formgroup.removeChild(msg)
    }
}

// duplicate check EventListener
document.getElementById('nameDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('name').value;
    if(username == "") return;

    const result = await dupleCheck(username);
    if (result.data) {
      console.log('name ok');
      duplename = true;
      removeDuplicateResult(0);
    } else {
      console.log('name duplicate');
      duplename = false;
      showDuplicateResult(0);
    } 

});

document.getElementById('name').addEventListener('input', function(event) {
    if (this.value.trim() === '') {
        duplename = false;
        return;
    }
    console.log("입력이 감지되어서 중복체크 불 변경");
    duplename = false; // 중복 확인 후 입력이 수정되면 다시 검사해야 함
});

document.getElementById('email').addEventListener('input', function(event) {
    if (this.value.trim() === '') {
        dupleemail = false;
        return;
    }
    console.log("입력이 감지되어서 중복체크 불 변경");
    dupleemail = false; // 중복 확인 후 입력이 수정되면 다시 검사해야 함
});

document.getElementById('emailDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    if(email == "") return;

    const result = await dupleCheck(email);
    if (result.data) {
      console.log('email ok');
      dupleemail = true;
      removeDuplicateResult(1);
    } else {
      console.log('email duplicate');
      dupleemail = false;
      showDuplicateResult(1);
    } 
});

// Sign Up button EventListener
document.getElementById('signUp').addEventListener('click', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // 1. Check if inputs are not blank
    if (!checkInputBlank()) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 2. Check if username and email are not duplicates
    if (!duplename) {
        alert('이름 중복 확인을 해주세요');
        return;
    }

    if (!dupleemail) {
        alert('이메일 중복 확인을 해주세요.');
        return;
    }

    // 3. Additional validations (예: 이메일 형식, 비밀번호 강도)
    if (!isValidEmail(emailInput.value)) {
        alert('유효한 이메일 주소를 입력해주세요.');
        emailInput.focus();
        return;
    }

    if (!isStrongPassword(passwordInput.value)) {
        alert('비밀번호는 최소 8자 이상이며, 숫자와 특수문자를 포함해야 합니다.');
        passwordInput.focus();
        return;
    }



    // 4. If all checks pass, send user info to server
    try {
        const response = await sendUserInfoToServer({
            email: emailInput.value,
            username: nameInput.value,
            password: passwordInput.value
        });
        console.log('서버로부터 응답', response.data);
        if (response.data) {
            alert('회원가입이 완료되었습니다!');
            // 추가 작업 (예: 로그인 페이지로 리다이렉트)
            window.close();

        } else {
            alert('회원가입 중 오류가 발생했습니다: ');
        }
    } catch (error) {
        console.error('회원가입 요청 중 오류 발생:', error);
        return { data: false, message: error.message };
    }
});

// 모달 창 닫기 함수
function closeModal() {
    if (window.opener) {
        // 부모 창이 존재하는 경우 (window.open으로 열린 경우)
        try {
            window.opener.onSignUpSuccess(); // 부모 창의 함수 호출 (선택적)
        } catch (e) {
            console.error('부모 창과의 통신 오류:', e);
        }
        window.close(); // 현재 창 닫기
    } else {
        // 부모 창이 없는 경우 (일반 모달인 경우)
        // 여기에 일반 모달을 닫는 로직을 구현
        console.warn('부모 창을 찾을 수 없습니다. 일반 모달 닫기 로직이 필요합니다.');
    }
}

function checkInputBlank() {
    return ['name', 'email', 'password'].every(id => 
        document.getElementById(id).value.trim() !== ''
    );
}

function isValidEmail(email) {
    // 간단한 이메일 유효성 검사
    return /\S+@\S+\.\S+/.test(email);
}

function isStrongPassword(password) {
    // 비밀번호 강도 검사 (예시)
    return password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);
}

async function sendUserInfoToServer(userInfo) {
    try {
        const response = await fetch(API_ENDPOINTS.SIGUP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);


        return data;

    } catch (error) {
        console.error('Error sending user info:', error);
        throw error; // 호출자에게 에러를 전파
    }
}