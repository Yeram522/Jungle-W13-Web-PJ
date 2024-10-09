async function dupleCheck(input) {
    const url = `http://localhost:3000/users/${input}/duplicate`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            // GET 요청에는 body가 필요 없으므로 제거합니다
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Server response:', data);

        return data;
    } catch(error) {
        console.error('Duplicate check error:', error);
        return { success: false, error: error.message };
    }
}

function showDuplicateResult(type){
    var formgroup = document.querySelector('#signupForm').children[type];

    // 이미 중복 메세지가 떠있다면 뜨지 않는다.
    if(formgroup.querySelector('.' + className) != null)
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
    var msg = formgroup.querySelector('.' + className);
    if(msg != null){
      formgroup.removeChild(msg)
    }
}

// 중복 버튼 이벤트 리스너
document.getElementById('nameDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('name').value;
  
    const result = await dupleCheck(username);
    if (result.successful) {
      console.log('name ok');
      //removeDuplicateResult(0);
    } else {
      console.log('name duplicate', result.message);

      // 중복이라고 뜨게하기. 이미 있으면 만들지 X
      showDuplicateResult(0);
    } 

});

document.getElementById('emailDuplecheck').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('email').value;
  
    const result = await dupleCheck(username);
    if (result.successful) {
      console.log('email ok');
      //removeDuplicateResult(1);
    } else {
      console.log('email duplicate:', result.message);
      showDuplicateResult(1);
    } 
});