function openSignUpPopup() {
    // 팝업창의 크기와 위치 설정
    const width = 400;
    const height = 400;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    // 팝업창 열기
    window.open("./pages/form_join_member.html", 'SignUpPopup', 
        `width=${width},height=${height},left=${left},top=${top}`);
}

// 버튼 클릭 이벤트에만 함수 연결
document.getElementById('btnSignup').addEventListener('click', openSignUpPopup);