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
if (changingText) {
  typeAndDelete();
}
// Seleciona o botão
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Mostra o botão
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.addEventListener('click', function() {
    let scrollInterval = setInterval(function() {
      if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        window.scrollBy(0, -50); // Move 50px a cada intervalo
      } else {
        clearInterval(scrollInterval); // Para o intervalo quando chegar no topo
      }
    }, 10); // A cada 10ms a rolagem diminui, criando um efeito mais suave
  });

  document.addEventListener('DOMContentLoaded', function () {
    const toggleClearBtn = document.getElementById('toggleClearBtn');
    const body = document.body;
  
    if (toggleClearBtn) {
      toggleClearBtn.addEventListener('click', function() {
        body.classList.toggle('clear-mode');
      });
    } else {
      console.error("Elemento 'toggleClearBtn' não encontrado.");
    }
  });

  //Download do currículo
  document.getElementById("downloadCV").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "assets/cv/Curriculo.pdf"; 
    link.download = "Curriculo_Luiz_Gabriel.pdf";
    document.body.appendChild(link);
    window.open(link.href, "_blank");
    document.body.removeChild(link);
});
