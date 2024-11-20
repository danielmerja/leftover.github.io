function copyWallet() {
    const walletAddress = document.getElementById('wallet-address').innerText;
    navigator.clipboard.writeText(walletAddress)
        .then(() => {
            alert('Wallet address copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy wallet address:', err);
        });
}

// Add fade-in animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
