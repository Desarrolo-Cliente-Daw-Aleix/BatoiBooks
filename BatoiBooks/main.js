import './style.css'
import batoiLogo from './public/logoBatoi.png'
import * as funciones from './src/functions.js';
import data from './src/services/datos.js';


document.querySelector('#app').innerHTML = `
  <div>
      <img src="${batoiLogo}" class="logo" alt="Batoi logo" />
    </a>
    <p class="read-the-docs">
      Abre la consola
    </p>
  </div>
`
console.log("Libros del usuario 4:", funciones.booksFromUser(data.books, 4));

console.log("Libros del módulo 5021 en buen estado:", funciones.booksFromModule(funciones.booksWithStatus(data.books ,"good"), 5021));

console.log("Libros con precios incrementados en un 10%:", funciones.incrementPriceOfbooks(data.books, 0.1));

