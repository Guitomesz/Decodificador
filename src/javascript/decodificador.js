var emptyFieldMessage = document.querySelector('.emptyFieldMessage');
var textToTransform = document.querySelector('.texto');
var showUncryptedArea = document.querySelector('.uncryptedArea');
var showEncryptedArea = document.querySelector('.encryptedArea');
// var showCopyBtns = document.querySelector('.copyBtns');
var showCopyBtnEncrypt = document.querySelector('.copyBtnEncrypt');
var showCopyBtnUncrypt = document.querySelector('.copyBtnUncrypt');
var uncryptedTextArea = document.querySelector('.UncryptedText');
var encryptedTextArea = document.querySelector('.EncryptedText');
var originalText = '';

function EncryptArea() {
    var texto = textToTransform.value.trim();
    if (texto !== '') {
        // Armazenar o texto original
        originalText = texto;

        EncryptText();
        emptyFieldMessage.style.display = 'none';
        showEncryptedArea.style.display = 'block';
        showUncryptedArea.style.display = 'none';
        showCopyBtnEncrypt.style.display = 'block';

    } else {
        emptyFieldMessage.style.display = 'block';
        emptyFieldWarning(emptyFieldMessage);
    }
}

function UncryptArea() {
    var texto = textToTransform.value.trim();
    if (texto !== '') {
        UncryptText();
        emptyFieldMessage.style.display = 'none';
        showEncryptedArea.style.display = 'none';
        showUncryptedArea.style.display = 'block';
        showCopyBtnUncrypt.style.display = 'block';
    } else {
        emptyFieldMessage.style.display = 'block';
        emptyFieldWarning(emptyFieldMessage);
    }
}

function EncryptText() {
    var textoAtual = originalText.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");
    var novoTexto = textoAtual.replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

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

    uncryptedTextArea.innerHTML = novoTexto;
}

function emptyFieldWarning(e) {
    e.classList.add('pulsarAviso');
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

function writeToClipboardEncrypt() {
    var encryptedText = '';
    if (showEncryptedArea.style.display === 'block') {
        encryptedText = encryptedTextArea.textContent;
    } else if (showUncryptedArea.style.display === 'block') {
        encryptedText = textToTransform.value.trim();
    }

    if (encryptedText !== '') {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(encryptedText)
                    .then(() => {
                        console.log('Texto copiado para a área de transferência:', encryptedText);
                    })
                    .catch((error) => {
                        console.error('Erro ao copiar o texto para a área de transferência:', error);
                    });
            }
        });
    }
}

function writeToClipboardUncrypt() {
    var uncryptedText = '';
    if (showUncryptedArea.style.display === 'block') {
        uncryptedText = uncryptedTextArea.textContent;
    } else if (showEncryptedArea.style.display === 'block') {
        uncryptedText = textToTransform.value.trim();
    }

    if (uncryptedText !== '') {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(uncryptedText)
                    .then(() => {
                        console.log('Texto copiado para a área de transferência:', uncryptedText);
                    })
                    .catch((error) => {
                        console.error('Erro ao copiar o texto para a área de transferência:', error);
                    });
            }
        });
    }
}


