import { API_ENDPOINTS } from './config.js';

async function sendSubmitDataToServer(submit) {
    try {
        const response = await fetch(API_ENDPOINTS.POSTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submit)
        })

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

document.getElementById('submit').addEventListener('click', async(event) => {
    event.preventDefault();

    // get title
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        const response = await sendSubmitDataToServer({
            "post-title" : title,
            "post-content" : content
        })

        if(response.data)
        {
            alert("게시글이 정상적으로 등록 되었습니다.")
            window.location.href = "../pages/board_list.html"; //게시물 리스트로 돌아가기.
        }
        else{
            alert("게시글 등록 중 오류가 발생했습니다.")
        }
        
    } catch (error) {
        console.errer("게시글 등록 요청 중 오류 발생 :", error);
        return { data: false, message: error.message };
    }
})