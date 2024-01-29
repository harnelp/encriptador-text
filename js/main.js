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
    const imageAside = document.getElementById('aside_section');
    const copyButton = document.getElementById('btn-tres');
    const hasText = encryptedText.trim() !== ''; // Verifica si realmente hay texto
    if (hasText) {
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
    const encryptedText = outputSection.innerText; // O de inputText.value si quieres desencriptar lo que está en el textarea
    const decryptedText = decryptText(encryptedText);
    outputSection.innerText = decryptedText; // Actualiza el texto en el 'aside' con el texto desencriptado
    inputText.value = decryptedText; // Opcional, si también quieres mostrar el texto desencriptado en el textarea
    updateUIAfterEncryption(decryptedText); // Ahora pasamos el texto desencriptado para mantener el botón de copiar visible
});


    // Event listener para el botón de copiar
    copyButton.addEventListener('click', function() {
        // Crea un elemento de texto temporal
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
        } catch (err) {
            console.error('Falló la copia', err);
        }
        document.body.removeChild(textArea);
    });
});
