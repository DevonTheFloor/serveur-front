const http = require('http');
const routeur = require(process.env.ROUTEUR_PROXY);
const https = require('https');
const fs = require('fs');

//SERVEUR 80
app.set('port', process.env.HTTP_FRONT_PORT);
const server = http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});
server.listen(process.env.HTTP_FRONT_PORT);

//SERVEUR SSL
app.set('port', process.env.HTTPS_FRONT_PORT);
const options = {
    key: fs.readFileSync(process.env.KEY_SSL),
    cert: fs.readFileSync(process.env.CERT_SSL)
  };
const secu_serve = https.createServer(options, routeur);
console.log(`Connecté au port SSL: ${process.env.HTTPS_FRONT_PORT}`);

secu_serve.listen(process.env.HTTPS_FRONT_PORT);