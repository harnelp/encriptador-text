// Funciones para encriptar y desencriptar el texto
function encryptText(text) {
    return text.replace(/e/g, 'enter')
               .replace(/i/g, 'imes')
               .replace(/a/g, 'ai')
               .replace(/o/g, 'ober')
               .replace(/u/g, 'ufat');
}

function decryptText(encryptedText) {
    return encryptedText.replace(/ufat/g, 'u')
                        .replace(/ober/g, 'o')
                        .replace(/ai/g, 'a')
                        .replace(/imes/g, 'i')
                        .replace(/enter/g, 'e');
}

// Esta función actualiza la UI según si hay texto para mostrar o no
function updateUIAfterEncryption(encryptedText) {
    const imageAside = document.getElementById('image-aside');
    const copyButton = document.getElementById('btn-tres');
    if (encryptedText) {
        imageAside.classList.add('hidden');
        copyButton.classList.remove('hidden');
    } else {
        imageAside.classList.remove('hidden');
        copyButton.classList.add('hidden');
    }
}

function updateUIAfterDecryption(decryptedText) {
    const imageAside = document.getElementById('image-aside');
    const copyButton = document.getElementById('btn-tres');
    if (decryptedText) {
        imageAside.classList.add('hidden');
        copyButton.classList.remove('hidden');
    } else {
        imageAside.classList.remove('hidden');
        copyButton.classList.add('hidden');
    }
}

// Espera a que el DOM esté completamente cargado antes de añadir event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Obtén los elementos necesarios
    const inputText = document.getElementById('camp_text');
    const outputSection = document.getElementById('aside_section');
    const encryptButton = document.getElementById('btn-uno');
    const decryptButton = document.getElementById('btn-dos');
    const copyButton = document.getElementById('btn-tres');

    // Event listener para el botón de encriptar
    encryptButton.addEventListener('click', function() {
        const text = inputText.value.toLowerCase();
        const encryptedText = encryptText(text);
        outputSection.innerText = encryptedText;
        updateUIAfterEncryption(encryptedText);
    });
    
    // Event listener para el botón de desencriptar
    decryptButton.addEventListener('click', function() {
        const encryptedText = outputSection.value; // Usa value para textarea
        const decryptedText = decryptText(encryptedText);
        outputSection.value = decryptedText; // Usa value para actualizar textarea
        inputText.value = decryptedText; // Actualiza también el textarea de entrada si es necesario
        updateUIAfterDecryption(decryptedText); // Cambio a la función correcta
    });


    // Event listener para el botón de copiar
    copyButton.addEventListener('click', function() {
        const textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.value = outputSection.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'Copiar texto fue exitoso' : 'Copiar texto no fue exitoso';
            console.log(msg);
            if (successful) {
                // Limpia el textarea después de copiar
                inputText.value = '';
                // Actualiza la UI para reflejar que no hay texto pendiente de acciones
                updateUIAfterEncryption('');
            }
        } catch (err) {
            console.error('Falló la copia', err);
        }
        document.body.removeChild(textArea);
    });

});
