//如果用到第三方模块，需要提前在服务端安装
//主要是提供接口的   /book?id=1  get post delete put

let http = require('http');
let fs = require('fs');
let url = require('url');
//我们对书的增删改查  异步操作的都是 books.json
function readBooks(callback) {
  fs.readFile('./books.json', 'utf8', function (err, data) {//文件不存在可能出现err
    if (err || data.length === 0) data = '[]';
    callback(JSON.parse(data));

  })
}
/*readBooks(function (data) {});*/
function writeBooks(data, callback) {
  fs.writeFile('./books.json', JSON.stringify(data), callback);
}
/*writeBooks([{},{},{}],function () {});*/
http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/book') {
    let id = query.id;
    switch (req.method) {
      case 'GET':
        if (id) {
          readBooks(function (data) {
            var book = data.find(item => item.id == id);
            res.end(JSON.stringify(book))
          });
        } else {
            readBooks(function (data) {//data 代表所有图书
              res.end(JSON.stringify(data));//传给客户端
            })
        }
        break;
      case 'POST':
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          readBooks(function (books) {
            book.id = books.length ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            writeBooks(books, function () {
              //一般情况添加成功后  返回添加的那一项
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
      case 'DELETE':
        readBooks(function (books) {
          books = books.filter(item=>item.id!=id);
          writeBooks(books,function () {
            //删除成功返回空对象
            res.end(JSON.stringify({}));
          })
        });
        break;
      case 'PUT':
        var str = '';
        req.on('data',function (data) {
          str += data;
        });
        req.on('end',function () {
          //book代表前台要我们改成这个结果
          var  book = JSON.parse(str);
          readBooks(function (books) {
            books = books.map(item=>{
              if(item.id == id){
                return book;
              }
              return item;
            });
            writeBooks(books,function(){
              console.log(1);
              //修改成功后，返回修改的那一项
              res.end(JSON.stringify(book))
            })
        });

        });
        break;
    }
  } else {
    res.statusCode = 404;
    res.end('not found');
  }
}).listen(3333, function () {
  console.log('listen port 3333 success');
});

