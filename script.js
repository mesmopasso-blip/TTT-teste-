document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // ELEMENTOS HTML
    // ----------------------------------------------------
    const spinnerWheel = document.getElementById('spinnerWheel');
    const spinButton = document.getElementById('spinButton');
    const counterDisplay = document.getElementById('counterDisplay');
    const increaseButton = document.getElementById('increaseButton');
    const decreaseButton = document.getElementById('decreaseButton');
    const phraseOverlay = document.getElementById('phraseOverlay');
    const overlayPhrase = document.getElementById('overlayPhrase');
    const volumeSlider = document.getElementById('volumeSlider');
    const startMusicButton = document.getElementById('startMusicButton'); 

    // ----------------------------------------------------
    // ÁUDIO E MÚSICA DE FUNDO
    // ----------------------------------------------------
    const backgroundMusic = document.getElementById('backgroundMusic');
    const spinSound = document.getElementById('spinSound');
    const countUpSound = document.getElementById('countUpSound');
    const countDownSound = document.getElementById('countDownSound');

    const musicFiles = [
        "Musica 1.mp3", "musica 2.mp3", "musica 3.mp3", "musica 4.mp3", 
        "musica 5.mp3", "musica 6.mp3", "musica 7.mp3", "musica 8.mp3", 
        "musica 9.mp3", "musica 10.mp3"
    ];

    function loadRandomMusic() {
        const randomIndex = Math.floor(Math.random() * musicFiles.length);
        backgroundMusic.src = musicFiles[randomIndex];
    }
    
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                startMusicButton.textContent = "⏸️ Parar Música";
            }).catch(e => {
                console.error("Erro ao iniciar música. Necessário interação do usuário.", e);
                startMusicButton.textContent = "🎶 Iniciar Música"; 
            });
        } else {
            backgroundMusic.pause();
            startMusicButton.textContent = "🎶 Parar Música";
        }
    }

    startMusicButton.addEventListener('click', toggleMusic);

    backgroundMusic.addEventListener('ended', () => {
        loadRandomMusic();
        startMusicButton.textContent = "🎶 Iniciar Música";
    });

    volumeSlider.addEventListener('input', (e) => {
        backgroundMusic.volume = e.target.value;
    });

    backgroundMusic.volume = volumeSlider.value;
    loadRandomMusic(); 
    

    // ----------------------------------------------------
    // ROLETA - LÓGICA (12 SEGMENTOS)
    // ----------------------------------------------------
    const segments = [
        { phrase: "O dia foi<br>incrível", type: "lilac" }, 
        { phrase: "O dia foi<br>péssimo", type: "red" },
        { phrase: "A comida<br>estava ótima", type: "lilac" },
        { phrase: "A comida<br>estava estranha", type: "red" },
        { phrase: "Vários sorrisos", type: "lilac" },
        { phrase: "Cara feia", type: "red" },
        { phrase: "Dia ensolarado", type: "lilac" },
        { phrase: "Choveu", type: "red" },
        { phrase: "Curtiram uma<br>música legal", type: "lilac" }, 
        { phrase: "Música ruim<br>no ambiente", type: "red" },
        { phrase: "Dedada na<br>bochecha", type: "lilac" }, 
        { phrase: "A brincadeira<br>machucou", type: "red" },
    ];
    const segmentAngle = 360 / segments.length; // Será 30
    
    spinButton.addEventListener('click', () => {
        if (spinButton.disabled) return;
        
        spinButton.disabled = true;
        spinSound.currentTime = 0; 
        spinSound.play().catch(e => console.log("Erro ao tocar roleta.mp3."));
        
        const selectedSegmentIndex = Math.floor(Math.random() * segments.length);
        const segmentCenter = (selectedSegmentIndex * segmentAngle) + (segmentAngle / 2);
        
        // CÁLCULO DE ROTAÇÃO PARA SENTIDO HORÁRIO (POSITIVO)
        const baseRotation = 360 - segmentCenter; 
        const extraSpins = Math.floor(Math.random() * 6 + 5); 
        const totalRotation = baseRotation + (extraSpins * 360);

        spinnerWheel.style.transform = `rotate(${totalRotation}deg)`;

        setTimeout(() => {
            showPhraseOverlay(segments[selectedSegmentIndex].phrase, segments[selectedSegmentIndex].type);
            spinButton.disabled = false;
        }, 5000); 
    });

    function showPhraseOverlay(phrase, type) {
        // Usamos innerHTML para renderizar a tag <br> corretamente no pop-up
        overlayPhrase.innerHTML = phrase; 
        overlayPhrase.style.color = type === 'lilac' ? 'var(--lilac)' : 'var(--red)';
        phraseOverlay.classList.add('active'); 
    }

    phraseOverlay.addEventListener('click', () => {
        phraseOverlay.classList.remove('active');
    });

    // ----------------------------------------------------
    // CONTADOR
    // ----------------------------------------------------
    let counterValue = 0;

    function updateCounterDisplay() {
        counterDisplay.textContent = counterValue.toString().padStart(3, '0');
    }

    increaseButton.addEventListener('click', () => {
        if (counterValue < 999) {
            counterValue++;
            countUpSound.currentTime = 0; 
            countUpSound.play().catch(e => console.log("Erro ao tocar aumentar contador.mp3."));
            updateCounterDisplay();
        }
    });

    decreaseButton.addEventListener('click', () => {
        if (counterValue > 0) {
            counterValue--;
            countDownSound.currentTime = 0; 
            countDownSound.play().catch(e => console.log("Erro ao tocar diminuir contador.mp3."));
            updateCounterDisplay();
        }
    });

    updateCounterDisplay(); 
});