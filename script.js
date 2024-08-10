document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const terminalContent = document.getElementById('terminalContent');

    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        terminalContent.classList.remove('hidden');
        typeContent();
    });

    function typeContent() {
        const elements = terminalContent.children;
        let delay = 0;

        for (let element of elements) {
            setTimeout(() => {
                typeWriter(element, element.textContent);
            }, delay);
            delay += 1000; // Adjust this value to change the delay between sections
        }
    }

    function typeWriter(element, text, index = 0) {
        if (index < text.length) {
            element.innerHTML = text.substring(0, index + 1);
            setTimeout(() => typeWriter(element, text, index + 1), 50);
        }
    }
});
