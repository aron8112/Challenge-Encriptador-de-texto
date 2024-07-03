//Replace values for each vowel
const replaces = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

/**
 * ENCRYPTION FUNCTIONS
 * ------------------
 *
 */

function crypting() {
  let text = document.getElementById('entrada').value;

  //Replacing the vowels with the values in replaces object
  let newText = text
    .split('')
    .map((letter) => (replaces[letter] ? replaces[letter] : letter))
    .join('');

  //Changing the HTML elements
  //Showing the results and the new buttons (#copyButton and #cleanButton)
  showAndHide('conResultado', 'sinResultado');
  asignTextElement('#resultado', newText);
}

/**
 * DECRYPTION FUNCTIONS
 * --------------------
 *
 */

function decodeString() {
  let text = document.getElementById('entrada').value;

  //In order to decode the words, first the object is reversed
  let inversedReplaces = reverseReplaceObject();

  //After it is done, the words grouped are replaces by their corresponding vowel
  let one = text.replace(/enter|imes|ai|ober|ufat/g, (group) => {
    return inversedReplaces[group];
  });

  //Then, the same process of showing/hiding HTML elements
  showAndHide('conResultado', 'sinResultado');
  asignTextElement('#resultado', one);
}

/**
 * VALIDATION FUNCTIONS
 * --------------------
 */

//The purpose of this function is to validate only lower case letters and showing errors
function validateStrings() {
  let elemHTML = document.getElementById('entrada');
  let text = elemHTML.value;
  const regex1 = /^[a-z\s]*$/;

  if (regex1.test(text)) {
    //This block returns to normal view
    showAndHide('wordchecker', 'errorMessage');
    elemHTML.style.border = '';
  } else {
    //showing errors
    showAndHide('errorMessage', 'wordchecker');
    elemHTML.style.border = '3px solid red';
    document.querySelector('.encrypt').setAttribute('disabled', '');
    document.querySelector('.undo-encrypt').setAttribute('disabled', '');
  }
}

/**
 * EXTRA FUNCTION
 * --------------
 */

async function copyResult() {
  try {
    let result = await navigator.permissions.query({ name: 'clipboard-write' });
    if (result.state === 'granted' || result.state === 'prompt') {
      let text = document.getElementById('resultado').innerText;
      navigator.clipboard.writeText(text);
    }
  } catch (error) {
    alert('No se puede ejecutar el comando sin permisos');
  }
}

/**
 * COMPLEMENTARY FUNCTIONS
 * -----------------------
 */
function cleanPage() {
  showAndHide('sinResultado', 'conResultado');

  let elementHTML = document.getElementById('entrada');
  elementHTML.value = '';
}

function showAndHide(objId1, objId2) {
  let object1 = document.getElementById(objId1);
  let object2 = document.getElementById(objId2);

  object1.style.display = 'flex';
  object2.style.display = 'none';
}

function reverseReplaceObject() {
  return Object.entries(replaces).reduce((newObject, [key, value]) => {
    newObject[value] = key;
    return newObject;
  }, {});
}

function asignTextElement(element, text) {
  let elementHTML = document.querySelector(element);
  elementHTML.innerHTML = text;
}
