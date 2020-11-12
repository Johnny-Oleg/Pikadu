// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
});

const $login = document.querySelector('.login');
const $loginForm = document.querySelector('.login-form');
const $emailInput = document.querySelector('.login-email');
const $passwordInput = document.querySelector('.login-password');
const $loginSignup = document.querySelector('.login-signup');
const $user = document.querySelector('.user');
const $userName = document.querySelector('.user-name');

const listUsers = [
  {
    id: '01',
    email: 'fssdf@',
    password: '121345',
    displayName: 'assdfg',
  },
  {
    id: '02',
    email: 'ccvbn@',
    password: '12133345',
    displayName: 'llikhnff',
  },
];

const setUsers = {
  user: null,
  
  logIn = (email, password, handler) => {
    const _user = this.getUser(email);

    if (_user && _user.password === password) {
      this.authorizedUser(_user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден!');
    }
  },

  logOut = () => {
    console.log('выход');
  },

  signUp = (email, password, handler) => {
    if (!this.getUser(email)) {
      const _user = {email, password, displayName: email};

      listUsers.push(_user);
      this.authorizedUser(_user);
      handler();
    } else {
      alert('Пользователь с таким email уже существует!');
    }
  },

  getUser = email => listUsers.find(item => item.email === email),

  authorizedUser = user => {
    this.user = user;
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
console.log('user:', user);
  if (user) {
    $login.style.display = 'none';
    $user.style.display = '';
    $userName.textContent = user.displayName;
  } else {
    $login.style.display = '';
    $user.style.display = 'none';
  }

};

$loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const emailValue = $emailInput.value;
  const passwordValue = $passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
});

$loginSignup.addEventListener('click', e => {
  e.preventDefault();

  const emailValue = $emailInput.value;
  const passwordValue = $passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
});

toggleAuthDom();