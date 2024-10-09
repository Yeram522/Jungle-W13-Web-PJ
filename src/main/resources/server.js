const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// 요청 바디를 파싱하기 위한 미들웨어 추가
server.use(jsonServer.bodyParser)

// 커스텀 라우트 추가
server.post('/users/login', (req, res) => {
  // 클라이언트로부터 받은 정보를 콘솔에 출력
  console.log('Received login request:')
  console.log(JSON.stringify(req.body, null, 2))

  // 항상 성공 응답 보내기
  res.jsonp({ successful: true, message: "Login successful" })
})


// Check duplicate : username
server.get('/users/:input/username-duplicate', (req, res) => {
    const input = req.params.input;
    console.log('Received duplicate check request for:', input);
  
    let isDuplicate = input === 'test'; // 'test'인 경우에만 중복으로 처리

    res.jsonp({ 
        successful: !isDuplicate, // 중복이 아닐 때 successful: true
    });
});

// Check duplicate : email
server.get('/users/:input/duplicate', (req, res) => {
    const input = req.params.input;
    console.log('Received duplicate check request for:', input);
  
    let isDuplicate = input === 'test'; // 'test'인 경우에만 중복으로 처리

    res.jsonp({ 
        successful: !isDuplicate, // 중복이 아닐 때 successful: true
    });
});


//Sign up
server.post('/users/signup', (req, res) => {
    // 클라이언트로부터 받은 정보를 콘솔에 출력
    console.log('Received signup request:')
    console.log(JSON.stringify(req.body, null, 2))
  
    // 항상 성공 응답 보내기
    res.json({ successful: true});
})


server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})