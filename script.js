document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = document.getElementById('funding-counter');
    const accreditedCheckbox = document.getElementById('accredited');
    const walletSection = document.getElementById('wallet-section');
    const copyStatus = document.getElementById('copy-status');

    const formatCurrency = amount => amount.toFixed(2);

    const animateFundingCounter = () => {
        if (!counter) {
            return;
        }

        if (prefersReducedMotion) {
            counter.textContent = formatCurrency(34.20);
            return;
        }

        const targetAmount = 34.20;
        const duration = 2000;
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
            counter.textContent = formatCurrency(currentAmount);
        }, 1000 / fps);
    };

    const setWalletVisibility = isVisible => {
        if (!walletSection) {
            return;
        }

        walletSection.classList.toggle('hidden', !isVisible);
        walletSection.setAttribute('aria-hidden', String(!isVisible));
    };

    const setupRevealAnimations = () => {
        const sections = document.querySelectorAll('.reveal-section');

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            sections.forEach(section => section.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        sections.forEach(section => observer.observe(section));
    };

    const writeToClipboard = async text => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    };

    const handleCopyClick = async event => {
        const button = event.target.closest('[data-copy-wallet]');
        if (!button) {
            return;
        }

        const walletCard = button.closest('.wallet-card');
        const address = walletCard?.querySelector('.wallet-address')?.textContent?.trim();
        const buttonText = button.querySelector('.button-text');

        if (!address || !buttonText) {
            return;
        }

        const originalText = buttonText.textContent;

        try {
            await writeToClipboard(address);
            button.classList.add('is-copied');
            buttonText.textContent = 'Copied';
            if (copyStatus) {
                copyStatus.textContent = 'Wallet address copied to clipboard.';
            }

            window.setTimeout(() => {
                button.classList.remove('is-copied');
                buttonText.textContent = originalText;
            }, 2000);
        } catch (error) {
            buttonText.textContent = 'Copy failed';
            if (copyStatus) {
                copyStatus.textContent = 'Wallet address could not be copied.';
            }

            window.setTimeout(() => {
                buttonText.textContent = originalText;
            }, 2000);
        }
    };

    animateFundingCounter();
    setupRevealAnimations();

    if (accreditedCheckbox) {
        setWalletVisibility(accreditedCheckbox.checked);
        accreditedCheckbox.addEventListener('change', event => {
            setWalletVisibility(event.target.checked);
        });
    }

    document.addEventListener('click', handleCopyClick);
});
