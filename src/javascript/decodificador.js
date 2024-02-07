var emptyFieldMessage = document.querySelector('.emptyFieldMessage');
var textToTransform = document.querySelector('.texto');
var showUncryptedArea = document.querySelector('.uncryptedArea');
var showEncryptedArea = document.querySelector('.encryptedArea');
var uncryptedTextArea = document.querySelector('.UncryptedText');
var encryptedTextArea = document.querySelector('.EncryptedText');


function EncryptArea() {
    var texto = document.querySelector('.texto').value.trim();
    if (texto !== '') {
        EncryptText();
        emptyFieldMessage.style.display = 'none';
        showEncryptedArea.style.display = 'block';
        showUncryptedArea.style.display = 'none';
    } else {
        emptyFieldMessage.style.display = 'block';
        emptyFieldWarning(emptyFieldMessage);
    }
}

function UncryptArea() {
    var texto = document.querySelector('.texto').value.trim();
    if (texto !== '') {
        UncryptText();
        emptyFieldMessage.style.display = 'none';
        showEncryptedArea.style.display = 'none';
        showUncryptedArea.style.display = 'block';
    } else {
        emptyFieldMessage.style.display = 'block';
        emptyFieldWarning(emptyFieldMessage);
    }
}

function emptyFieldWarning(e) {
    e.classList.add('pulsarAviso');
}

function EncryptText() {
    var textoAtual = textToTransform.value.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");
    var novoTexto = textoAtual.replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    textToTransform.value = novoTexto;
    encryptedTextArea.innerHTML = novoTexto;
}

function UncryptText() {
    var textoAtual = textToTransform.value.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");
    var novoTexto = textoAtual.replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    textToTransform.value = novoTexto;
    encryptedTextArea.innerHTML = novoTexto;
}

textToTransform.addEventListener('enter', function () {
    EncryptText();

});

textToTransform.addEventListener('input', function () {
    var textoAtual = textToTransform.value;
    textToTransform.value = textoAtual.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");

        if (textToTransform.value != '') {
            emptyFieldMessage.classList.remove('pulsarAviso');
        }
});

navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
        /* write to the clipboard now */
    }
});
