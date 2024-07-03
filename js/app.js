//Valores de reemplazo
const replaces = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

function crypting() {
  let texto = document.getElementById('entrada').value;

  /**
   * Convierto el texto (string) en un array, y si es una vocal ejecuta el cambio,
   * finalmente con el método join retorno nuevamente el texto con los reemplazos
   * */
  let newText = texto
    .split('')
    .map((letra) => (replaces[letra] ? replaces[letra] : letra))
    .join('');

  //Cambio los elementos mostrados:
  //Primero: muestro el resultado obtenido
  let newData = document.getElementById('conResultado');
  newData.style.display = 'block';
  asignarTextoElemento('#resultado', newText);
  //Segundo oculto los elementos anteriores
  let hideDiv = document.getElementById('sinResultado');
  hideDiv.style.display = 'none';
}

function decodeString() {
  let texto = document.getElementById('entrada').value;
  let inversedReplaces = Object.entries(replaces).reduce((nuevoObjeto, [clave, valor]) => {
    nuevoObjeto[valor] = clave;
    return nuevoObjeto;
  }, {});
  let one = texto.replace(/enter|imes|ai|ober|ufat/g, (conjunto) => {
    // Reemplazamos cada conjunto por la vocal correspondiente
    return inversedReplaces[conjunto];
  });
  //Cambio los elementos mostrados:
  //Primero: muestro el resultado obtenido
  let newData = document.getElementById('conResultado');
  newData.style.display = 'flex';
  newData.style.flexDirection = 'column';
  asignarTextoElemento('#resultado', one);
  //Segundo oculto los elementos anteriores
  let hideDiv = document.getElementById('sinResultado');
  hideDiv.style.display = 'none';
}

/**
 * Esta función es creada con el objeto que valide los datos que
 * está ingresando el usuario
 */
function validateStrings() {
  //Selecciona el input en el cual se está escribiendo
  let elementoHTML = document.getElementById('entrada');
  let texto = elementoHTML.value;

  //Selecciona el elemento HTML que mostrará el error
  const errorMessage = document.getElementById('errorMessage');

  // La expresión regular nos indica que selecciona solo letras minusculas
  /**
   * ^ este simbolo nos indica el comienzo
   */
  const regex1 = /^[a-z\s]*$/;

  if (regex1.test(texto)) {
    errorMessage.style.display = 'none';
    document.getElementById('wordchecker').style.display = '';
    elementoHTML.style.border = '';
  } else {
    errorMessage.style.display = 'block';
    document.getElementById('wordchecker').style.display = 'none';
    elementoHTML.style.border = '3px solid red';
  }
}

function asignarTextoElemento(elemento, texto) {
  let elementHTML = document.querySelector(elemento);
  elementHTML.innerHTML = texto;
}
