const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const filePath = path.join(__dirname, "user_data.json");

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = req.method;

    if (method === "POST" && pathname === "/bmi") {
        const weight = query.weight;
        const height = query.height;

        if (!weight || !height) {
            res.end("error");
            return;
        }

        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("error");
                return;
            }

            const userData = data ? JSON.parse(data) : {};

            // checking if there is a name & surname
            userData.name ? userData.weight = weight : userData.weight = 0;
            userData.surname ? userData.height = height : userData.height = 0;
            userData.bmi = bmi;

            fs.writeFile(filePath, JSON.stringify(userData), (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("error");
                    return;
                }
                res.end(bmi);
            });
        });
    } else if (method === "POST" && pathname === "/user") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("error");
                return;
            }

            const userData = data ? JSON.parse(data) : {};
            userData.name = query.name;
            userData.surname = query.surname;

            fs.writeFile(filePath, JSON.stringify(userData), (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("error");
                    return;
                }
                res.end("ok");
            });
        });
    } else if (method === "GET" && pathname === "/bmi") {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("error");
                return;
            }
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end("Not found");
    }
});

server.listen(3000, () => {
    console.log("Server is running");
});
