var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

const rotear = function(pathname){
    if (pathname !== "/"){
        const filename = path.join(__dirname, `${pathname}.html`);
        console.log(`nome do arquivo ${filename} . fim`);
        const existe = fs.existsSync(filename);

        if(existe){
            console.log(`deu certo ${filename}`);
            return filename;
        }
        return path.join(__dirname, "erro.html");
    }
    return path.join(__dirname, "artigos.html");
}

var server = http.createServer(function(request, response){
    const result = url.parse(request.url,true).pathname;
    const pagina = rotear(result);

    fs.readFile(pagina, function(err, html){
        response.writeHeader(200, {'Content-Type': 'text/html'});
        response.write(html);
        response.end();
    });
});

server.listen(3000, function(){
    console.log('Executando Site Pessoal');
});