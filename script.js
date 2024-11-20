function copyWallet() {
    const walletAddress = document.getElementById('wallet-address').innerText;
    const feedbackElement = document.getElementById('copy-feedback');
    
    navigator.clipboard.writeText(walletAddress)
        .then(() => {
            // Show feedback
            feedbackElement.classList.remove('opacity-0');
            feedbackElement.classList.add('opacity-100');
            
            // Hide feedback after 2 seconds
            setTimeout(() => {
                feedbackElement.classList.remove('opacity-100');
                feedbackElement.classList.add('opacity-0');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy wallet address:', err);
            alert('Failed to copy wallet address. Please try again.');
        });
}

// Add fade-in animation on scroll
document.addEventListener('DOMContentLoaded', () => {
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
