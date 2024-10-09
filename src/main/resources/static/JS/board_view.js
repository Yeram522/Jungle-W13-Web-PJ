import { API_ENDPOINTS } from './config.js';

function renderBoardContent(response) {
    /*if (!data.successful || !data.posts || data.posts.length === 0) {
        console.error("게시물을 불러오는데 실패하였습니다.");
        document.querySelector('.content-group').innerHTML = '<p>게시물을 불러오는데 실패했습니다.</p>';
        return;
    }*/

    const post = response.data.posts[0]; // 첫 번째 게시물 사용

    const title = document.querySelector('.post-title');
    const author = document.querySelector('.author');
    const date = document.querySelector('.date');
    const content = document.querySelector('.post-content');

    if (title) title.textContent = post.postTitle;
    if (author) author.textContent = '익명';
    if (date) date.textContent = post.postDate;
    if (content) content.innerHTML = `<p>${escapeHTML(post.postContent)}</p>`;
}

// HTML 이스케이프 함수
function escapeHTML(unsafeText) {
    return unsafeText
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

async function getPostDataFromServer(id) {
    try {
        const response = await fetch(`${API_ENDPOINTS.POSTS}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('게시물 요청 오류:', error);
        return { successful: false, error: error.message };
    }
}

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function loadPostContent() {
    const id = getIdFromUrl();
    if (!id) {
        console.error('URL에서 게시물 ID를 찾을 수 없습니다.');
        return;
    }

    try {
        const postData = await getPostDataFromServer(id);
        /*const dummyResponse = `{
        "successful": true,
        "posts": [
            {
                "id": 1,
                "postTitle": "title",
                "postContent": "contentcontentcontent",
                "postDate": "2024-10-09 09:23:04"
            }
        ]
    }`;*/
        //const data = JSON.parse(dummyResponse);
        renderBoardContent(postData);
    } catch (error) {
        console.error('게시물 로딩 중 오류 발생:', error);
        document.querySelector('.post-content').innerHTML = '<p>게시물을 불러오는 중 오류가 발생했습니다.</p>';
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', loadPostContent);