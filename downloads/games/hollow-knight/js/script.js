let startX;
let currentIndex = 0;

const carouselContainer = document.querySelector('.carousel-container');
const totalSlides = carouselContainer.children.length;

carouselContainer.addEventListener('touchstart', handleTouchStart, false);
carouselContainer.addEventListener('touchmove', handleTouchMove, false);
carouselContainer.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    const touch = event.touches[0];
    const moveX = touch.clientX - startX;

    carouselContainer.style.transition = 'none';
    carouselContainer.style.transform = `translateX(${moveX - currentIndex * carouselContainer.clientWidth}px)`;
}

function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX > 50) {
        slidePrev();
    } else if (diffX < -50) {
        slideNext();
    } else {
        resetPosition();
    }
}

function slideNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function slidePrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function jumpToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function updateCarousel() {
    carouselContainer.style.transition = 'transform 0.4s ease-in-out';
    carouselContainer.style.transform = `translateX(-${currentIndex * carouselContainer.clientWidth}px)`;
}

function resetPosition() {
    carouselContainer.style.transition = 'transform 0.4s ease-in-out';
    carouselContainer.style.transform = `translateX(-${currentIndex * carouselContainer.clientWidth}px)`;
}


//Botão de compartilhamento//
document.getElementById('shareBtn').addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Store Dark',
                text: 'Download Hollow Knight!',
                url: window.location.href, // ou um link específico que você quer compartilhar
            });
            console.log('Conteúdo compartilhado com sucesso');
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    } else {
        alert('Web Share API não é suportada no seu navegador');
    }
});

//para relatar os erros//

// Seleciona os elementos
const reportLink = document.getElementById('reportLink');
const errorReportBox = document.getElementById('errorReportBox');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.closeBtn');

// Função para mostrar a caixinha de suporte
reportLink.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link
    errorReportBox.style.display = 'block';
    overlay.style.display = 'block';
});

// Função para fechar a caixinha de suporte
closeBtn.addEventListener('click', () => {
    errorReportBox.style.display = 'none';
    overlay.style.display = 'none';
});

// Função para fechar ao clicar no overlay
overlay.addEventListener('click', () => {
    errorReportBox.style.display = 'none';
    overlay.style.display = 'none';
});

// Função para enviar o formulário
document.getElementById('errorReportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const userEmail = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Configura o conteúdo do email
    const subject = 'Relato de Erro do Usuário';
    const body = `Email do usuário: ${userEmail}\n\nDescrição do Erro:\n${message}`;
    
    // Cria o link mailto
    const mailtoLink = `mailto:storedarkofc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abre o cliente de email com o link mailto
    window.location.href = mailtoLink;

    // Fecha a caixinha após o envio
    errorReportBox.style.display = 'none';
    overlay.style.display = 'none';
});
