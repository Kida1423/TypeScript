import { log } from 'console';
import { ftruncate } from 'fs';
import { stdin, stdout } from 'process';
import { unescape } from 'querystring';
import * as readline from 'readline';
 type Raitings = {
    [username: string]: number
 } 
 type Movie = {
    name: string,
    ratings: Raitings,
 }
 let movies: Movie[] = [
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
function addMovie(name: string): void {
    if(movies.some(movie => movie.name === name)){
        console.log('Фильм с таким названием уже существует.');
        return;
    }
    movies.push({name ,ratings: {}})
    console.log("Фильм добален");
    console.log("=======================================");
       
}
function deleteMovie(name: string): void {
    let idx: number = movies.findIndex(movie => movie.name === name)
    if(idx === -1){
        console.log("Фильм с таким названием не найден");
        return 
    }
    movies.splice(idx, 1);
    console.log("Фильм удален");
    console.log("=======================================");
}

function listAllMovie(): void{
    console.log("Все фильмы");
    movies.forEach(movie => {
        let raitings = Object.values(movie.ratings)
        let avgRating;
        if (raitings.length > 0) {
            avgRating = raitings.reduce((sum, rating) => sum + rating, 0) / raitings.length;
        } else {
            avgRating = "Не оценивался";
        }
        console.log(`Название фильма: ${movie.name}\n Рейтинг фильма: ${avgRating}\n`);
    })
    console.log("=======================================");
}

function rateMovie(name: string,username: string, rating: number): void {
    if(rating < 0 || rating >10){
        console.log("Оценка должна быть в диапазоне от 0 до 10");
        return
    }
    let movie = movies.find(movie => movie.name === name);
    if(!movie){
        console.log("Фильм с таким названием не найдеу");
        return 
    }
    movie.ratings[username] = rating;
    console.log("Оценка добавлена");
    console.log("=======================================");
}

function findMovie(name: string): void{
    let movie = movies.find(movie => movie.name === name);
    if(!movie){
        console.log("Фильм с таким названием не найде");
        return 
    }
    const ratingsEntries = Object.entries(movie.ratings);
    const averageRating = ratingsEntries.length > 0
    ? ratingsEntries.reduce((sum, [, rating]) => sum + rating, 0) / ratingsEntries.length
    : 'не оценивался';

    let raitings = Object.values(movie.ratings)
    let avgRating = movie ? raitings.reduce((sum, raiting) => sum + raiting, 0) : console.log("Не оценивался");
    console.log(`Название: ${movie.name}`);
    if (ratingsEntries.length === 0) {
      console.log('Оценки: фильм не оценивался');
    } else {
      console.log('Оценки:');
      ratingsEntries.forEach(([username, rating]) => {
        console.log(`Имя пользователя: ${username}, Оценка: ${rating}`);
      });
    }
    console.log(`Средняя оценка: ${averageRating}`);
    console.log("=======================================");
}
let rl = readline.createInterface({
    input: stdin,
    output: stdout
})

function handleCommand(command: string) {
    let [cmd, ...args] = command.split(' ')
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
          const [name, username, ratingStr] = args;
          const rating = parseFloat(ratingStr);
          rateMovie(name, username, rating);
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

function start(): void {
    rl.question('Введите команду: ', (answer) => {
      handleCommand(answer);
      start(); 
    });
  }
  
  start();