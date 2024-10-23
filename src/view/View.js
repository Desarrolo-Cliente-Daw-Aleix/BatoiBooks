export default class View {
  constructor() {
      this.booksList = document.getElementById('list');
      this.form = document.getElementById('form');
      this.about = document.getElementById('about');
      this.messages = document.getElementById('messages');
      this.bookForm = document.getElementById('bookForm');
      this.remove = document.getElementById('remove');
  }

  renderModules(modules) {
      const select = document.getElementById('id-module');
      select.innerHTML = modules.map(module => `<option value="${module.code}">${module.cliteral}</option>`).join('');
  }

  renderBook(book) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <img src="${book.photo || 'default.jpg'}" alt="Libro: ${book.id}">
          <div>
              <h3>${book.moduleCode} (${book.id})</h3>
              <h4>${book.publisher}</h4>
              <p>${book.pages} páginas</p>
              <p>Estado: ${book.status}</p>
              <p>${book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'}</p>
              <p>${book.comments}</p>
              <h4>${book.price} €</h4>
          </div>
      `;
      this.booksList.appendChild(card);
  }

  removeBookFromView(bookId) {
      const cards = this.booksList.querySelectorAll('.card');
      cards.forEach(card => {
          if (card.querySelector('img').alt.includes(`Libro: ${bookId}`)) {
              card.remove();
          }
      });
  }

  showMessage(type, message) {
      const alertDiv = document.createElement('div');
      alertDiv.classList.add(type, 'alert', `alert-${type === 'error' ? 'danger' : 'info'}`, 'alert-dismissible');
      alertDiv.setAttribute('role', 'alert');
      alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" aria-label="Close" onclick="this.parentElement.remove()">x</button>
      `;
      this.messages.appendChild(alertDiv);
      
      if (type !== 'error') {
          setTimeout(() => alertDiv.remove(), 3000);
      }
  }

  setBookSubmitHandler(callback) {
      this.bookForm.addEventListener('submit', event => {
          event.preventDefault();
          const payload = {
              moduleCode: document.getElementById('id-module').value,
              publisher: document.getElementById('publisher').value,
              price: parseFloat(document.getElementById('price').value),
              pages: parseInt(document.getElementById('pages').value),
              status: document.querySelector('input[name="status"]:checked').value,
              comments: document.getElementById('comments').value,
          };
          callback(payload);
      });
  }

  setBookRemoveHandler(callback) {
      this.remove.addEventListener('click', () => {
          const bookId = document.getElementById('id-remove').value;
          callback(bookId);
      });
  }
}
