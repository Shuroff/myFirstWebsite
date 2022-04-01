import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth'

import { postPage } from '../pages/addpost'
export function myProfile() {
  const mainBody = document.querySelector('.main__body')
  const auth = getAuth()
  const user = auth.currentUser
  let { email, displayName } = user
  let HTML = `
	<div class="profile__wrapper">
      <div class="profile-container">
        <div class="user-settings">
          <div class="profile-user-item">
            <div class="toggle-target">
              Email:  ${email}
              <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="text"
                  class="form-control"
                  id="old-pass"
                  placeholder="Введите новый email"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
                  id="btn-change"
                  disabled
                >
                  Изменить Email
                </button>
              </form>
            </div>
          </div>
          <div class="profile-user-item">
            <div class="toggle-target">
              Имя пользователя: ${displayName || 'не задано'}
              <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="text"
                  class="form-control"
                  id="old-pass"
                  placeholder="Введите новое имя пользователя"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
                  id="btn-change"
                  disabled
                >
                  Изменить Имя
                </button>
              </form>
            </div>
          </div>
          <div class="profile-user-item pass">
            <div class="toggle-target">
              Поменять пароль: <i class="fas fa-chevron-down" id="arrow"></i>
            </div>
            <div class="change-pass hidden" id="change-pass-toggle">
              <form>
                <input
                  type="password"
                  class="form-control"
                  id="old-pass"
                  placeholder="Введите старый пароль"
                  required
                />
                <input
                  type="password"
                  class="form-control"
                  id="new-pass"
                  placeholder="Введите новый пароль"
                  required
                />
                <input
                  type="password"
                  class="form-control"
                  id="retype-new-pass"
                  placeholder="Повторите новый пароль"
                  required
                />
                <button
                  type="submit"
                  class="btn btn-create-post"
                  id="btn-change"
                  disabled
                >
                  Изменить пароль
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="user-posts">
          <button
            type="button"
            class="btn btn-addpost"
            data-action="create"
            id="create"
          >
            Создать пост
          </button>
        </div>
      </div>
    </div>
	`
  mainBody.innerHTML = HTML

  const toggleTargets = document.querySelectorAll('.toggle-target')

  const oldPass = document.getElementById('old-pass')

  const newPass = document.getElementById('new-pass')

  const retypeNewPass = document.getElementById('retype-new-pass')

  const btnChange = document.getElementById('btn-change')

  const toggleHandler = event => {
    const arrow = event.target.querySelector('#arrow')
    const toggled = event.target.nextElementSibling
    toggled.classList.toggle('hidden')
    if (arrow.classList.contains('fa-chevron-down')) {
      arrow.classList.remove('fa-chevron-down')
      arrow.classList.add('fa-chevron-up')
    } else {
      arrow.classList.add('fa-chevron-down')
      arrow.classList.remove('fa-chevron-up')
    }
  }
  toggleTargets.forEach(TT => {
    TT.addEventListener('click', toggleHandler)
  })

  const changeInputHandler = () => {
    if (
      newPass.value.trim().length < 6 ||
      newPass.value !== retypeNewPass.value
    ) {
      btnChange.disabled = true
    } else {
      btnChange.disabled = false
    }
  }
  const clearInputs = (...args) => {
    args.forEach(arg => {
      arg.value = ''
    })
  }
  const btnChangeHandler = event => {
    event.preventDefault()
    const pass = oldPass.value.trim()
    signInWithEmailAndPassword(auth, email, pass)
      .then(data => {
        updatePassword(user, newPass.value.trim())
          .then(() => {
            console.log('Пароль успешно изменён')
            clearInputs(oldPass, newPass, retypeNewPass)
          })
          .catch(() => {
            console.log('Что то пошло не так')
            clearInputs(oldPass, newPass, retypeNewPass)
          })
      })
      .catch(error => {
        console.log('Неверный пароль!')
        clearInputs(oldPass, newPass, retypeNewPass)
      })
  }

  newPass.addEventListener('input', changeInputHandler)
  retypeNewPass.addEventListener('input', changeInputHandler)
  btnChange.addEventListener('click', btnChangeHandler)

  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', postPage)
}
