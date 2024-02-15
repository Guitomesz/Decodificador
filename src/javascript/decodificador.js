var emptyFieldMessage = document.querySelector('.emptyFieldMessage');
var textToTransform = document.querySelector('.texto');
var showUncryptedArea = document.querySelector('.uncryptedArea');
var showEncryptedArea = document.querySelector('.encryptedArea');
var showCopyBtnEncrypt = document.querySelector('.copyBtnEncrypt');
var showCopyBtnUncrypt = document.querySelector('.copyBtnUncrypt');
var uncryptedTextArea = document.querySelector('.UncryptedText');
var encryptedTextArea = document.querySelector('.EncryptedText');
var originalText = '';

// Função para exibir a animação de aviso de campo vazio
function emptyFieldWarning() {
    emptyFieldMessage.style.animation = 'pulsarAviso 1.5s';
    setTimeout(function () {
        emptyFieldMessage.style.animation = 'none';
    }, 1500);
}

// Função para criptografar a área
function EncryptArea() {
    var texto = textToTransform.value.trim();
    if (texto !== '') {
        originalText = texto;

        EncryptText();
    } else {
        emptyFieldWarning();
    }
}

// Função para criptografar o texto
function EncryptText() {
    var textoAtual = originalText.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");
    var novoTexto = textoAtual.replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    emptyFieldMessage.style.display = 'none';
    showEncryptedArea.style.display = 'block';
    showUncryptedArea.style.display = 'none';
    showCopyBtnEncrypt.style.display = 'block';
    showCopyBtnUncrypt.style.display = 'none';

    encryptedTextArea.innerHTML = novoTexto;
}

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

// Função para descriptografar a área
function UncryptArea() {
    var texto = textToTransform.value.trim();
    if (texto !== '') {
        UncryptText();
    } else {
        emptyFieldWarning();
    }
}

// Função para descriptografar o texto
function UncryptText() {
    var textoAtual = textToTransform.value.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");
    var novoTexto = textoAtual.replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');

    emptyFieldMessage.style.display = 'none';
    showEncryptedArea.style.display = 'none';
    showUncryptedArea.style.display = 'block';
    showCopyBtnUncrypt.style.display = 'block';
    showCopyBtnEncrypt.style.display = 'none';

    uncryptedTextArea.innerHTML = novoTexto;
}

// Adicionar evento ao pressionar Enter
textToTransform.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        EncryptText();
        UncryptText();
    }
});

// Adicionar normalizer e condição de animação
textToTransform.addEventListener('input', function () {
    var textoAtual = textToTransform.value;
    textToTransform.value = textoAtual.toLowerCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "");

    if (textToTransform.value != '') {
        emptyFieldMessage.style.animation = 'none';
    }
});

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
