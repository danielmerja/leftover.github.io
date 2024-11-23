document.getElementById('accredited').addEventListener('change', function() {
    document.getElementById('wallet-section').classList.toggle('hidden', !this.checked);
});

function copyWallet(event) {
    const button = event.target.closest('button');
    const address = button.closest('.flex').querySelector('.wallet-address').textContent;
    
    navigator.clipboard.writeText(address).then(() => {
        const buttonText = button.querySelector('.button-text');
        const originalText = buttonText.textContent;
        buttonText.textContent = 'Copied!';
        setTimeout(() => {
            buttonText.textContent = originalText;
        }, 2000);
    });
}

// Add fade-in animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animate funding counter
    const counter = document.getElementById('funding-counter');
    const targetAmount = 34.20;
    const duration = 2000; // 2 seconds
    const fps = 30;
    const steps = duration / (1000 / fps);
    const increment = targetAmount / steps;
    let currentAmount = 0;

    const timer = setInterval(() => {
        currentAmount += increment;
        if (currentAmount >= targetAmount) {
            currentAmount = targetAmount;
            clearInterval(timer);
        }
        counter.textContent = currentAmount.toFixed(2);
    }, 1000 / fps);

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    });

    sections.forEach(section => {
        section.classList.add('transform', 'transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
        observer.observe(section);
    });

    // Add accredited investor checkbox handler
    const accreditedCheckbox = document.getElementById('accredited');
    const walletSection = document.getElementById('wallet-section');
    
    accreditedCheckbox.addEventListener('change', function() {
        if (this.checked) {
            walletSection.classList.remove('hidden');
            walletSection.classList.add('block');
        } else {
            walletSection.classList.add('hidden');
            walletSection.classList.remove('block');
        }
    });
});
