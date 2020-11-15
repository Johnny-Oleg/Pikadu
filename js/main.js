// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARlqBmxJxF8XXsqX1zjn4s6lPUNbUuTxY",
  authDomain: "pikadu-pikabu-clone.firebaseapp.com",
  databaseURL: "https://pikadu-pikabu-clone.firebaseio.com",
  projectId: "pikadu-pikabu-clone",
  storageBucket: "pikadu-pikabu-clone.appspot.com",
  messagingSenderId: "166714013150",
  appId: "1:166714013150:web:7ae313ac6377b8d268194f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const IS_VALID_EMAIL = /^\w+@\w+\.\w{2,}$/;

const $menuToggle = document.querySelector('#menu-toggle');
const $menu = document.querySelector('.sidebar');
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
const $newPost = document.querySelector('.button-new-post');
const $addPost = document.querySelector('.add-post');

const listUsers = [
  {
    id: '01',
    email: 'fssdf@q.ru',
    password: '12345',
    displayName: 'Tolsty Kotik',
    photo: '../img/kot.jpg',
  },
  {
    id: '02',
    email: 'ccvbn@q.com',
    password: '12133345',
    displayName: 'lolWhut',
    photo: '../img/kot.jpg',
  },
];

const setUsers = {
  user: null,
  
  logIn(email, password, handler) {
    if (!IS_VALID_EMAIL.test(email)) return;

    const _user = this.getUser(email);

    if (_user && _user.password === password) {
      this.authorizedUser(_user);
      handler && handler();
    } else {
      alert('Пользователь с такими данными не найден!');
    }
  },

  logOut(handler) {
    this.user = null;

    handler && handler();
  },

  signUp(email, password, handler) {
    if (!IS_VALID_EMAIL.test(email)) return;

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
      handler && handler();
    } else {
      alert('Пользователь с таким email уже существует!');
    }
  },

  editUser(userName, userPhoto = '', handler) {
    userName && (this.user.displayName = userName);
    userPhoto && (this.user.photo = userPhoto);

    handler && handler();
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
      author: {displayName: 'Tolsty Kotik', photo: '../img/kot.jpg'},
      date: '11.11.2020, 15:34:00',
      likes: 75,
      comments: 28,
    }
  ],

  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title, text, 
      tags: tags.split(', ').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    });

    handler && handler();
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
console.log('user:', user);
  if (user) {
    $login.style.display = 'none';
    $user.style.display = '';
    $userName.textContent = user.displayName;
    $avatar.src = user.photo || $avatar.src;
    $newPost.classList.add('visible');
  } else {
    $login.style.display = '';
    $user.style.display = 'none';
    $newPost.classList.remove('visible');
    $addPost.classList.remove('visible');
    $posts.classList.add('visible');
  }
};

const showAddedPosts = () => {
  $addPost.classList.add('visible');
  $posts.classList.remove('visible');
};

const showAllPosts = () => {
  $addPost.classList.remove('visible');
  $posts.classList.add('visible');

  let postsHTML = '';

  setPosts.allPosts.forEach(post => {
    console.log(post);const { title, text, tags, author, date, likes, comments } = post;
    
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
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
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
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

  $newPost.addEventListener('click', e => {
    e.preventDefault();

    showAddedPosts();
  });

  $addPost.addEventListener('submit', e => {
    e.preventDefault();

    const { title, text, tags } = $addPost.elements;

    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');

      return;
    }

    if (text.value.length < 30) {
      alert('Слишком короткий пост');

      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

    $addPost.classList.remove('visible');
    $addPost.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', init);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});