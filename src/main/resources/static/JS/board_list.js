import { API_ENDPOINTS } from './config.js';

// 서버에 게시물 리스트를 요청하는 함수
async function requestBoardList() {
    try {
        const response = await fetch(`${API_ENDPOINTS.POSTS}-list`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('게시물 목록 요청 오류:', error);
        return { successful: false, error: error.message };
    }
}

// 게시물 목록을 테이블에 추가하는 함수
function renderBoardList(response) {
    const tbody = document.querySelector('.board-list');
    if (!tbody) {
        console.error('content-group 요소를 찾을 수 없습니다.');
        return;
    }

    logPosts(response.data);
    tbody.innerHTML = ''; // 기존 내용 초기화

    if (response.data.successful && response.data.posts && response.data.posts.length > 0) {
        const fragment = document.createDocumentFragment();
        response.data.posts.forEach(post => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${post.id}</td>
                <td><a href="board_view.html?id=${post.id}">${escapeHtml(post.postTitle)}</a></td>
                <td>익명</td>
                <td><span class="status waiting">의뢰 대기</span></td>
                <td>${post.postDate}</td>
            `;
            fragment.appendChild(tr);
        });
        tbody.appendChild(fragment);
    } else {
        tbody.innerHTML = '<tr><td colspan="5">게시물을 불러오는데 실패했습니다.</td></tr>';
    }
}

// HTML 이스케이프 함수 (XSS 방지)
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// 디버깅용 함수
function logPosts(data) {
    if (data.successful && data.posts) {
        console.log('게시물 목록:');
        data.posts.forEach((post, index) => {
            console.log(`게시물 ${index + 1}:`);
            console.log(`  ID: ${post.id}`);
            console.log(`  제목: ${post.postTitle}`);
            console.log(`  내용: ${post.postContent}`);
            console.log(`  날짜: ${post.postDate}`);
            console.log('------------------------');
        });
    } else {
        console.log('게시물을 불러오는데 실패했습니다.');
        console.log('메시지:', data.message);
    }
}

// 페이지 로드 시 실행되는 메인 함수
async function loadBoardList() {
    try {
        // 실제 서버 요청 사용 시:
        const response = await requestBoardList();

        // 테스트용 더미 데이터
        //const dummyResponse = `{"successful":true,"posts":[{"id":1,"postTitle":"title","postContent":"contentcontentcontent","postDate":"2024-10-09 09:23:04"},{"id":2,"postTitle":"제목입니다앗","postContent":"이건 내용임","postDate":"2024-10-09 09:23:26"}],"message":"성공"}`;
        //const data = JSON.parse(dummyResponse);

        //logPosts(data); // 디버깅용 로그
        renderBoardList(response);
    } catch (error) {
        console.error('게시판 로딩 중 오류 발생:', error);
        document.querySelector('.content-group').innerHTML = '<tr><td colspan="5">게시물을 불러오는 중 오류가 발생했습니다.</td></tr>';
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', loadBoardList);