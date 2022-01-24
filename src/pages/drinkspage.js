import { Post } from '../essenses/post'
import { PostPage } from './addpost'
import { loadPostContent } from '../additional/loadfiles'
import { setActiveNavLink } from '../additional/setActiveLink'
export function drinksPageHandler(event) {
  let clientheight = window.innerHeight
  const drinkPosts = ''
  let HTML = `
	<div class="drinks__posts__wrapper">
		<div class="drinks-container" id="post-container">
		</div>
		<aside class="right-sidebar" style="height: ${clientheight}px">
		<div class="add-post">
			<span>Здесь вы можете добавить новый пост</span>
		<button
		type="button"
		class="btn btn-success"
		data-action="create"
		id="create"
	>
		Добавить пост
	</button>
		</div>
		
		</aside>
	`
  const mainBody = document.querySelector('.main__body')
  mainBody.innerHTML = HTML
  const createBtn = mainBody.querySelector('#create')
  createBtn.addEventListener('click', PostPage)
  if (event.target.id) {
    setActiveNavLink(event.target.id)
  } else {
    setActiveNavLink(event.target.parentNode.id)
  }
  function showContent(selector) {
    const container = document.getElementById(`${selector}`)

    const newPost = document.createElement('div')
    newPost.classList.add('post')

    newPost.innerHTML = `
		<div class="post-header>${newPostFiles[0]}</div>
		<img src="${newPostFiles[1]}">
		<div class="post-text">
			${newPostFiles[2]}
		</div>
		<div class="about-author">

		</div>
		`
    container.appendChild(newPost)
  }

  const postContainer = mainBody.querySelector('#post-container')
  loadPostContent('drinkPosts', postContainer)
}
