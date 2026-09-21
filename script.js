document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('intro-screen');
    const bgMusic = document.getElementById('bg-music');
    const themeCheckbox = document.getElementById('checkbox');
    const messageCard = document.getElementById('message-card');
    const particlesContainer = document.getElementById('particles');
    const bouquetContainer = document.getElementById('bouquet-container');

    // Parse URL params for personalized name
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    if (nombre) {
        document.getElementById('nombre-receptor').textContent = nombre;
    }

    // Generate Particles
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            if (Math.random() > 0.5) {
                particle.style.borderRadius = '50% 0 50% 0';
                particle.style.width = '15px';
                particle.style.height = '15px';
            }
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // Generate Field of 250 Flowers
    function generateField() {
        // Clear just in case
        bouquetContainer.innerHTML = '';
        
        for (let j = 0; j < 250; j++) {
            const flowerWrapper = document.createElement('div');
            flowerWrapper.classList.add('flower');
            
            // Random edge selection (0: top, 1: right, 2: bottom, 3: left)
            const edge = Math.floor(Math.random() * 4);
            const offset = Math.random() * 100 + '%';
            
            let rotation = 0;
            if (edge === 0) { // Top edge, points down
                flowerWrapper.style.top = '0';
                flowerWrapper.style.left = offset;
                rotation = 180;
            } else if (edge === 1) { // Right edge, points left
                flowerWrapper.style.right = '0';
                flowerWrapper.style.top = offset;
                rotation = -90;
            } else if (edge === 2) { // Bottom edge, points up
                flowerWrapper.style.bottom = '0';
                flowerWrapper.style.left = offset;
                rotation = 0;
            } else { // Left edge, points right
                flowerWrapper.style.left = '0';
                flowerWrapper.style.top = offset;
                rotation = 90;
            }

            const height = (Math.random() * 170 + 80) + 'px'; 
            const scale = Math.random() * 0.5 + 0.3; 
            const delay = Math.random() * 4000;
            const zIndex = Math.floor(Math.random() * 250);

            flowerWrapper.style.zIndex = zIndex;
            flowerWrapper.dataset.scale = scale;
            flowerWrapper.dataset.rotation = rotation;
            flowerWrapper.dataset.delay = delay;
            
            flowerWrapper.style.transform = `rotate(${rotation}deg) scale(0)`;

            flowerWrapper.innerHTML = `
                <div class="stem" style="height: ${height}"></div>
                <div class="leaf leaf-left"></div>
                <div class="leaf leaf-right"></div>
                <div class="flower-head" style="top: -${height}">
                    <div class="center"></div>
                </div>
            `;

            const flowerHead = flowerWrapper.querySelector('.flower-head');
            const numPetals = 8; // Back to the classic 8 petal shape
            
            for (let i = 0; i < numPetals; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                const angle = (360 / numPetals) * i;
                // Move petal outward from the 50x50 center
                petal.style.transform = `rotate(${angle}deg) translateY(-25px)`;
                flowerHead.appendChild(petal);
            }

            bouquetContainer.appendChild(flowerWrapper);
        }
    }

    generateField();

    // Theme Switch Logic
    themeCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    // Start Interaction
    startBtn.addEventListener('click', () => {
        // Fade out intro
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000);

        // Play music
        bgMusic.play().catch(error => {
            console.log("Audio autoplay was prevented:", error);
        });

        // Trigger animations for each flower based on their configured delay
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            setTimeout(() => {
                const finalScale = flower.dataset.scale;
                const rotation = flower.dataset.rotation || 0;
                flower.style.transform = `rotate(${rotation}deg) scale(${finalScale})`;
                flower.classList.add('bloom');
            }, 500 + parseInt(flower.dataset.delay));
        });

        // Show message card after a longer delay since we have 250 flowers to bloom
        setTimeout(() => {
            messageCard.classList.add('show');
        }, 5500);
    });
});
