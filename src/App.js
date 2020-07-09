import React, {Component} from 'react';
import './App.css';

import Auth from './components/authorization';
import Main from './components/main';

class App extends Component {

  state = {
    isEntered: false,
    showPswd: false,
    login: '',
    password: '',
    search: ''
  };

  // В задании не указана форма регистрации, поэтому componentDidMount добавляет одного
  // пользователя с логинои admin и паролем admin для примера
  // используется sessionStorage, чтобы не засорять память браузера code ревьюера
 
  componentDidMount () {
    sessionStorage.clear();
    sessionStorage.setItem('user', 'adminadmin');
  };

//////////////////////////////////////////////////////////////////////////////////////

// Функции для отображения пароля и иконки глаза

  pswdFocused = () => {
    document.getElementById('eye').classList.add('password__view--active');
    
    // при фокусировке на интпуте пароля, добавляем эвентлистенер на нажатие клавиши enter 
    document.onkeydown = (event) => {
      if (event.keyCode === 13) {
        this.enter();
      }
    }
  };

  pswdUnfocused = () => {
    document.getElementById('eye').classList.remove('password__view--active');
    document.getElementById('eye').classList.remove('password__view--show');
    document.getElementById('password').classList.remove('auth__input--active');
    document.getElementById('password').type = 'password';
  };

  showPswd = () => {
    if (!this.state.showPswd) {
      document.getElementById('password').classList.add('auth__input--active');
      document.getElementById('eye').classList.add('password__view--show', 'password__view--active');
      document.getElementById('password').type = 'text';
      this.setState({
        showPswd: true
      });
      return;
    }; 
    document.getElementById('eye').classList.remove('password__view--show');
    document.getElementById('password').classList.add('auth__input--active');
    document.getElementById('password').type = 'password';
    this.setState({
      showPswd: false
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Функция для отслеживания вводимых значений в поля логина, пароля и посика, 
  // а так же записи этих значений в state

  changeInput = (e) => {
    if (e.target.name === 'login') {
      this.setState({
        login: e.target.value
      });
    } else if (e.target.name === 'password') {
      this.setState({
        password: e.target.value
      });
    } else if (e.target.name === 'search') {
      this.setState({
        search: e.target.value
      });
    }
  };

  // проверяем наличие пользователя. Когда пользователей будет больше, я бы использовал
  // JSON.parse() и JSON.stringify()

  check = () => {
    console.log(sessionStorage.getItem('user'));
    let user = String(this.state.login + this.state.password);
    let users = sessionStorage.getItem('user');
      if (user === users)
      return true;
     else return false;       
  };

  // и если пользователь найден, убираем страницу авторизации и показываем 
  // основную страницу приложения

  enter = () => {
    if (this.check()) {
      this.setState ({
        isEntered: true
      })
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.isEntered ?
          <Main changeInput={this.changeInput}/> : 
          <Auth pswdFocused={this.pswdFocused}
                onBlur={this.pswdUnfocused}
                showPswd={this.showPswd}
                changeInput={this.changeInput}
                enter={this.enter}/>
                }
      </div>
    );
  }  
}

export default App;
