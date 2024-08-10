function typeWriter(element, text, index = 0) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 50);
    } else {
        element.innerHTML += ' <span id="cursor"></span>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const powerButton = document.querySelector('.power-button');
    const terminal = document.querySelector('.terminal');
    const closeButton = document.querySelector('.close-button');
    const categories = document.querySelectorAll('.category');

    powerButton.addEventListener('click', () => {
        terminal.classList.remove('hidden');
        typeCategories();
    });

    closeButton.addEventListener('click', () => {
        terminal.classList.add('hidden');
        resetTerminal();
    });

    function typeCategories() {
        categories.forEach((category, index) => {
            setTimeout(() => {
                const command = category.querySelector('.command');
                const output = category.querySelector('.output');
                const commandText = command.textContent;
                const outputText = output.textContent;

                command.textContent = '';
                output.textContent = '';

                typeWriter(command, commandText);
                setTimeout(() => typeWriter(output, outputText), commandText.length * 50 + 500);
            }, index * 2000);
        });
    }

    function resetTerminal() {
        categories.forEach(category => {
            const command = category.querySelector('.command');
            const output = category.querySelector('.output');
            command.textContent = command.getAttribute('data-original-text') || command.textContent;
            output.textContent = output.getAttribute('data-original-text') || output.textContent;
        });
    }
});
