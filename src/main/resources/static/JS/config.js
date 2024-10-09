// config.js 파일

// 기본 URL 설정
const BASE_URL = 'http://localhost:8080';

// API 버전
const API_VERSION = 'v1';

// API 엔드포인트 생성 함수
function createApiEndpoint(path) {
    return `${BASE_URL}/api/${API_VERSION}${path}`;
}

// 사용 예시를 위한 객체
const API_ENDPOINTS = {
    SIGNUP: createApiEndpoint('/users/signup'),
    LOGIN: createApiEndpoint('/users/login'),
    USERS : createApiEndpoint('/users'),
    POSTS : createApiEndpoint('/posts')
    // 다른 엔드포인트들...
};

// 다른 파일에서 사용할 수 있도록 내보내기
export { BASE_URL, API_VERSION, createApiEndpoint, API_ENDPOINTS };

// 사용 예시 (다른 파일에서)
// import { API_ENDPOINTS } from './config.js';
// const signupUrl = API_ENDPOINTS.SIGNUP;