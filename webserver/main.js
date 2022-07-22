const http = require('http')
const fs = require('fs')

const port =  3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write("<html><body>")
    
    if(req.url === '/'){
        res.write('<h1>Home</h1>')
        res.write('<a href="/student">Student</a><br>')
        res.write('<a href="/staff">Staff</a>')
    }else if(req.url === '/student'){
        res.write('<h1>Student</h1>')
        let data = fs.readFileSync('data.txt','utf8')
        data = data.split('\n')
        res.write('<ul>')
        for(let x of data){
            res.write(`<li>${x}</li>`)
        }
        res.write('</ul>')
        res.write('<a href="/">Home</a><br>')
        res.write('<a href="/staff">Staff</a>')
    }else{
        res.write('<h1>Not found</h1>')
    }
    res.write("</body></html>")
    res.end()
})

server.listen(port, () => {
  console.log('Server running' + port)
})