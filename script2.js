 const inputName = document.getElementById('input-name')
const buttonSend = document.getElementById('button-send')
const showComment = document.getElementById('show-comment')
const inputComment = document.getElementById('input-comment')

const loadComment = () => {
  const personJSON = localStorage.getItem('comment')
  const person = JSON.parse(personJSON)

  if (!person) {
    showComment.innerHTML = '<p>There are no comments</p>'

    return
  }

  let finalComment = ''

  for (let i = 0; i < person.length; i++) {
    const name = person[i].name
    const comment = person[i].comment

    finalComment =
      finalComment +
      `
        <div class="comment">
            <h2>${name}</h2>
            <p>${comment}</p>
        </div>
    `
  }

  showComment.innerHTML = finalComment
}

buttonSend.addEventListener('click', () => {
  const currentComment = localStorage.getItem('comment')
  const currentCommentList = JSON.parse(currentComment)

  const inputNameValue = inputName.value
  const inputCommentValue = inputComment.value

  const person = {
    name: inputNameValue,
    comment: inputCommentValue,
  }

  let listPerson = []

  if (currentCommentList) {
    listPerson = currentCommentList.concat(person)
  } else {
    listPerson.push(person)
  }

  const personJSON = JSON.stringify(listPerson)

  localStorage.setItem('comment', personJSON)

  inputComment.value = ''
  inputName.value = ''

  loadComment()
})

document.addEventListener('DOMContentLoaded', () => {
  loadComment()
})
