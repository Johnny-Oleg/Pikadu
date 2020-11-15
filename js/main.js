let $menuToggle = document.querySelector('#menu-toggle');
let $menu = document.querySelector('.sidebar');

const validEmail = /^\w+@\w+\.\w{2,}$/;

const $login = document.querySelector('.login');
const $loginForm = document.querySelector('.login-form');
const $emailInput = document.querySelector('.login-email');
const $passwordInput = document.querySelector('.login-password');
const $loginSignup = document.querySelector('.login-signup');
const $user = document.querySelector('.user');
const $userName = document.querySelector('.user-name');
const $exit = document.querySelector('.exit');
const $edit = document.querySelector('.edit');
const $container = document.querySelector('.edit-container');
const $editUserName = document.querySelector('.edit-username');
const $editPhotoUrl = document.querySelector('.edit-photo');
const $avatar = document.querySelector('.user-avatar');
const $posts = document.querySelector('.posts');

const listUsers = [
  {
    id: '01',
    email: 'fssdf@q.q',
    password: '12345',
    displayName: 'assdfg',
  },
  {
    id: '02',
    email: 'ccvbn@q.q',
    password: '12133345',
    displayName: 'llikhnff',
  },
];

const setUsers = {
  user: null,
  
  logIn(email, password, handler) {
    if (!validEmail.test(email)) return;

    const _user = this.getUser(email);

    if (_user && _user.password === password) {
      this.authorizedUser(_user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден!');
    }
  },

  logOut(handler) {
    this.user = null;

    handler();
  },

  signUp(email, password, handler) {
    if (!validEmail.test(email)) return;

    if (!email.trim() || !password.trim()) {
      alert('Введите данные!');

      return;
    }

    if (!this.getUser(email)) {
      const _user = {
        email, 
        password, 
        displayName: email.substring(0, email.indexOf('@')),
      };

      listUsers.push(_user);

      this.authorizedUser(_user);
      handler();
    } else {
      alert('Пользователь с таким email уже существует!');
    }
  },

  editUser(userName, userPhoto = '', handler) {
    userName && (this.user.displayName = userName);
    userPhoto && (this.user.photo = userPhoto);

    handler();
  },

  getUser(email) {return listUsers.find(item => item.email === email)},

  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio a molestiae rem iusto deserunt architecto non veritatis quibusdam voluptatibus?',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'fssdf@q',
      date: '11.11.2020, 15:34:00',
      likes: 75,
      comments: 28,
    }
  ],
};

const toggleAuthDom = () => {
  const user = setUsers.user;
console.log('user:', user);
  if (user) {
    $login.style.display = 'none';
    $user.style.display = '';
    $userName.textContent = user.displayName;
    $avatar.src = user.photo || $avatar.src;
  } else {
    $login.style.display = '';
    $user.style.display = 'none';
  }
};

const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(post => {
    console.log(post);const { title, text, tags, author, date, likes, comments } = post;
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            <a href="#" class="tag">#${tags[0]}</a>
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${likes}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });

  $posts.innerHTML = postsHTML;
};

const init = () => {
  $loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = $emailInput.value;
    const passwordValue = $passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    $loginForm.reset();
  });

  $loginSignup.addEventListener('click', e => {
    e.preventDefault();

    const emailValue = $emailInput.value;
    const passwordValue = $passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    $loginForm.reset();
  });

  $exit.addEventListener('click', e => {
    e.preventDefault();

    setUsers.logOut(toggleAuthDom);
  });

  $edit.addEventListener('click', e => {
    e.preventDefault();

    $container.classList.toggle('visible');
    $editUserName.value = setUsers.user.displayName;
  });

  $container.addEventListener('submit', e => {
    e.preventDefault();

    const userName = $editUserName.value;
    const userPhoto = $editPhotoUrl.value;

    setUsers.editUser(userName, userPhoto, toggleAuthDom);
    $container.classList.remove('visible');
  });

    $menuToggle.addEventListener('click', e => {
    e.preventDefault();

    $menu.classList.toggle('visible');
  });


  //showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);