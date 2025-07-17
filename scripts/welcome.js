// Welcome page functionality for Nepali Calendar Extension

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to buttons
    const ctaButton = document.querySelector('.cta-button');
    const settingsLink = document.querySelector('.footer a');

    if (ctaButton) {
        ctaButton.addEventListener('click', closeWelcome);
    }

    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openSettings();
        });
    }

    // Auto-close after 10 seconds
    setTimeout(() => {
        closeWelcome();
    }, 10000);
});

function closeWelcome() {
    window.close();
}

function openSettings() {
    // This would typically open the extension's settings
    console.log('Opening settings...');
} 