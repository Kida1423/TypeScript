"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = require("process");
var readline = require("readline");
var movies = [
    {
        name: 'Interstellar',
        ratings: {
            'John': 10,
            'Jack': 3
        }
    },
    {
        name: 'Avengers: Infinity War',
        ratings: {
            'Jack': 9,
            'Jane': 10
        }
    }
];
function addMovie(name) {
    if (movies.some(function (movie) { return movie.name === name; })) {
        console.log('Фильм с таким названием уже существует.');
        return;
    }
    movies.push({ name: name, ratings: {} });
    console.log("Фильм добален");
    console.log("=======================================");
}
function deleteMovie(name) {
    var idx = movies.findIndex(function (movie) { return movie.name === name; });
    if (idx === -1) {
        console.log("Фильма с таким названием не сущетсвует");
        return;
    }
    movies.splice(idx, 1);
    console.log("Фильм удален");
    console.log("=======================================");
}
function listAllMovie() {
    console.log("Все фильмы");
    movies.forEach(function (movie) {
        var raitings = Object.values(movie.ratings);
        var avgRating;
        if (raitings.length > 0) {
            avgRating = raitings.reduce(function (sum, rating) { return sum + rating; }, 0) / raitings.length;
        }
        else {
            avgRating = "Не оценивался";
        }
        console.log("\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u043C\u0430: ".concat(movie.name, "\n \u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0444\u0438\u043B\u044C\u043C\u0430: ").concat(avgRating, "\n"));
    });
    console.log("=======================================");
}
function rateMovie(name, username, rating) {
    if (rating < 0 || rating > 10) {
        console.log("Оценивать можно от 0 до 10");
        return;
    }
    console.log("Существующие фильмы:");
    movies.forEach(function (movie) { return console.log(movie.name); });
    var movie = movies.find(function (movie) { return movie.name === name; });
    if (!movie) {
        console.log("Такого фильма нету");
        return;
    }
    movie.ratings[username] = rating;
    console.log("Оценка добавлена");
    console.log("=======================================");
}
function findMovie(name) {
    var movie = movies.find(function (movie) { return movie.name === name; });
    if (!movie) {
        console.log("Такого фильма нету");
        return;
    }
    var ratingsEntries = Object.entries(movie.ratings);
    var averageRating = ratingsEntries.length > 0
        ? ratingsEntries.reduce(function (sum, _a) {
            var rating = _a[1];
            return sum + rating;
        }, 0) / ratingsEntries.length
        : 'не оценивался';
    var raitings = Object.values(movie.ratings);
    var avgRating = movie ? raitings.reduce(function (sum, raiting) { return sum + raiting; }, 0) : console.log("Не оценивался");
    console.log("\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435: ".concat(movie.name));
    if (ratingsEntries.length === 0) {
        console.log('Оценки: фильм "не оценивался"');
    }
    else {
        console.log('Оценки:');
        ratingsEntries.forEach(function (_a) {
            var username = _a[0], rating = _a[1];
            console.log("\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ".concat(username, ", \u041E\u0446\u0435\u043D\u043A\u0430: ").concat(rating));
        });
    }
    console.log("\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430: ".concat(averageRating));
    console.log("=======================================");
}
var rl = readline.createInterface({
    input: process_1.stdin,
    output: process_1.stdout
});
function handleCommand(command) {
    var _a = command.split(' '), cmd = _a[0], args = _a.slice(1);
    switch (cmd) {
        case 'add':
            addMovie(args.join(' '));
            break;
        case 'delete':
            deleteMovie(args.join(' '));
            break;
        case 'rate':
            if (args.length < 3) {
                console.log('Использование: rate <название> <имя пользователя> <оценка>');
                return;
            }
            var name_1 = args[0], username = args[1], ratingStr = args[2];
            var rating = parseFloat(ratingStr);
            rateMovie(name_1, username, rating);
            break;
        case 'list':
            listAllMovie();
            break;
        case 'find':
            findMovie(args.join(' '));
            break;
        case 'exit':
            console.log('Выход из программы...');
            rl.close();
            return;
        default:
            console.log('Неизвестная команда.');
    }
}
function start() {
    rl.question('Введите команду: ', function (answer) {
        handleCommand(answer);
        start();
    });
}
start();
