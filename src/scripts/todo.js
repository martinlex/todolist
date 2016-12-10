/*****
 * Todo-list
 * Martin Lexelius, 2016
 */

/*
1. Define DOM-elems
2. Check if list is empty
   If list is empty => show message for empty state
   Else => hide
3. Receive input on click event
4. Separate todo from tag(s)
5. Check if tag exists in saved tags
   If tag exists => get related tag color
   Else => generate random color and save tag with the new color
6. Print todo
7. Print tag/s
8. Delete todo and tag on click event
   => from DOM, and from saved tags
*/

/* ----- ----- ----- ----- ----- */

const todoInput  = document.querySelector('.js-todo-input'),
      todoBtn    = document.querySelector('.js-todo-btn'),
      todoList   = document.querySelector('.js-todo-list'),
      todoState  = document.querySelector('.js-todo-state'),
      emptyState = document.querySelector('.js-empty-state');

var newTodoElem;

var colors = usedTagsColors = [];
var renderedTagColor = {};

var newTodoWithoutTags = '';
var tag = tagColor = newTagsList = '';

var path = 'dist/images/';

/* ----- ----- ----- ----- ----- */

window.onload = function() {
  todoInput.addEventListener('keyup', enableBtn);
  todoBtn.addEventListener('click', getTodoItem);

  checkEmptyState();
  setFocus();
}

/* ----- ----- ----- ----- ----- */

function enableBtn() {
  if (todoInput.value) {
    todoBtn.classList.remove('is-disabled');
  } else {
    todoBtn.classList.add('is-disabled');
  }
}


function checkEmptyState() {
  if (todoList.hasChildNodes()) {
    hideEmptyState();
  } else {
    showEmptyState();

    usedTagsColors = [];
  }
}


function hideEmptyState() {
  emptyState.classList.add('is-hidden');
  todoState.classList.remove('is-hidden');
}


function showEmptyState() {
  emptyState.classList.remove('is-hidden');
  todoState.classList.add('is-hidden');
}


function setFocus() {
  todoInput.focus();
}


function getTodoItem() {
  var entry = todoInput.value;
  entry = entry.toLowerCase();

  if (entry) {
    console.log('[Entry]:', entry);
    addTodoToList(entry);

    enableBtn();
    checkEmptyState();
  } 
  else {
    return false;
  }
}


function addTodoToList(entry) {
  var newTagsList = findTags(entry, newTagsList);
  var newTodoWithoutTags = entry;

  for (i = 0; i < newTagsList.length; i++) {
    newTodoWithoutTags = newTodoWithoutTags.replace(newTagsList[i], '');
  }

  console.log('[Extracted todo]:', newTodoWithoutTags)
  console.log('[Extracted tags]:', newTagsList)

  if (newTodoWithoutTags != '') {
    checkStoreUsedTagsColors(newTagsList, newTodoWithoutTags);
  } else {
    flickerErrorMsg('Looks like you forgot something?');
    return false;
  }
}


function flickerErrorMsg(message) {
  const error = document.querySelector('.error-message');

  error.innerHTML = message;
  error.classList.remove('is-hidden');

  setTimeout(function(){ 
    error.classList.add('is-hidden');
  }, 2000);
}


function findTags(entry, newTagsList) {
  var regexp = /\S*#(?:\[[^\]]+\]|\S+)/g;
  var newTagsList = entry.match(regexp);

  if (newTagsList) {
    return newTagsList;
  } else {
    return false;
  }
  console.log(entry, newTagsList);
}


function checkStoreUsedTagsColors(newTagsList, newTodoWithoutTags) {
  // To check against array with object prop values
  Array.prototype.containsByProp = function(propName, value) {
    for (var i = this.length - 1; i > -1; i--) {
      var propObj = this[i];
      if (propObj[propName] === value) {
        return true;
      }
    }
    return false;
  }

  if (usedTagsColors.length > 0) {
    for (var j = 0; j < newTagsList.length; j++) {
      console.log(newTagsList, newTagsList.length)

      var eachTag = newTagsList[j];
      console.log('Input tag:', j, eachTag)

      if (usedTagsColors.containsByProp('tag', eachTag) == true) {
        console.log('Exists:', eachTag);
      } else {
        console.log('Push:', eachTag);
        tagColor = createRandomColor(tagColor);
        usedTagsColors.push({'tag':eachTag, 'tagColor':tagColor});
      }

    }
  } else if (usedTagsColors.length == 0) {
    for (var k = 0; k < newTagsList.length; k++) {
      console.log('Initial push:', newTagsList[k])
      tagColor = createRandomColor(tagColor);
      usedTagsColors.push({'tag':newTagsList[k], 'tagColor':tagColor});
    }
  }

  createLiElem(newTodoWithoutTags, newTagsList);
}


function createRandomColor(tagColor) {
  // Prefix
  var tagColor = '#';
  // Only bright colors, please
  var hexValues = '9BDF'; 
  // Three characters to enhance color contrast
  var numberCharHex = 3;

  for (var i = 0; i < numberCharHex; i++ ) {
    tagColor += hexValues[Math.floor(Math.random() * hexValues.length)];
  }

  console.log('[Builds random color]:', tagColor);

  renderedTagColor.color = tagColor;
  return tagColor;
}


function createLiElem(newTodoWithoutTags, newTagsList) {
  var newTodoElem = document.createElement('li');
  newTodoElem.classList.add('todo-list__list-item');
  var todo = document.createTextNode(newTodoWithoutTags);
  newTodoElem.appendChild(todo);

  createDeleteElem(todo, newTagsList, newTodoElem);
}


function createDeleteElem(todo, newTagsList, newTodoElem) {
  var newDeleteElem = document.createElement('img');
  newDeleteElem.classList.add('delete-icon');
  newDeleteElem.setAttribute('src', path + 'times.svg');
  newTodoElem.appendChild(newDeleteElem);

  createSpacerElem(newTagsList, newTodoElem);
}


function createSpacerElem(newTagsList, newTodoElem) {
  var newSpacerElem = document.createElement('span');
  newSpacerElem.classList.add('spacer');
  newTodoElem.appendChild(newSpacerElem);

  createTagElem(newTagsList, newTodoElem);
}


function createTagElem(newTagsList, newTodoElem) {
  for (var j = 0; j < newTagsList.length; j++) {
    if (newTagsList) {
      var newTagElem = document.createElement('span');
      newTagElem.classList.add('tag');
      var unhashedTag = newTagsList[j].replace('#', '');
      var tag = document.createTextNode(unhashedTag);

      newTagElem.appendChild(tag);
      newTodoElem.appendChild(newTagElem);
    }
  }

  renderListItem(newTagsList, newTagElem, newTodoElem);
}


function renderListItem(newTagsList, newTagElem, newTodoElem) {
  // Finally, render todo, delete icon and tag onto list
  todoList.appendChild(newTodoElem);

  updateDeleteIcons();

  clearInput();
  setFocus();
}


function updateDeleteIcons() {
  var deleteIcons = document.querySelectorAll('.delete-icon');

  for(i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener('click', deleteTodo);
  }

  repaintTags();
}


function deleteTodo() {
  this.classList.add('check-icon');
  this.setAttribute('src', path + 'check.svg');
  var that = this;

  shrinkIt(that);
}


function shrinkIt(that) {
  var reasonableDeleteWaitingTime = 300;

  setTimeout(function() { 
    that.parentNode.classList.add('is-deleted');

    deleteIt(that, reasonableDeleteWaitingTime);
  }, reasonableDeleteWaitingTime);
}


function deleteIt(that, reasonableDeleteWaitingTime) {
  setTimeout(function() { 
    that.parentNode.parentNode.removeChild(that.parentNode);

    checkEmptyState();
    setFocus();
  }, reasonableDeleteWaitingTime);
}


function clearInput() {
  todoInput.value = '';
}


function repaintTags() {
  var allTags = document.querySelectorAll('.tag');

  for (var j = 0; j < allTags.length; j++) {
    var eachTag = allTags[j];

    for (var i = 0; i < usedTagsColors.length; i++) {
      var cleanTag = usedTagsColors[i].tag.replace('#', '');

      if (eachTag.innerHTML == cleanTag) {
        eachTag.style.backgroundColor = usedTagsColors[i].tagColor;
      }
    }
  }
}
