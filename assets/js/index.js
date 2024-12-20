const words = ["Prazer", "Luiz Gabriel"];
let wordIndex = 0;
const changingText = document.getElementById('changing-text');

function typeAndDelete() {
    let charIndex = 0;
    let isDeleting = false;

    function updateText() {
        const word = words[wordIndex];

        // Atualizar o texto conforme digita ou apaga
        changingText.textContent = isDeleting
            ? word.substring(0, charIndex--)  // Apagar caractere por caractere
            : word.substring(0, charIndex++); // Digitar caractere por caractere

        // Quando a palavra está completamente digitada
        if (!isDeleting && charIndex === word.length) {
            setTimeout(() => isDeleting = true, 1000);  // Pausa antes de apagar
        }
        // Quando a palavra está completamente apagada
        else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;  // Mudar para a próxima palavra
            charIndex = 0;  // Reiniciar o índice de caracteres para a nova palavra
        }

        // Controle da velocidade de digitação e apagamento
        setTimeout(updateText, isDeleting ? 100 : 150);
    }

    updateText();
}

typeAndDelete();