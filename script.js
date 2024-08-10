document.addEventListener('DOMContentLoaded', () => {
    // Matrix background
    const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const dhivehi = 'ހށނރބޅކއވމފދތލގޏސޑޒޓޔޕޖޗޘޙޚޛޜޝޞޟޠޡޢޣޤޥަީުޫެޭޮޯްޱ';
const nums = '0123456789';
const alphabet = dhivehi + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00';  // Matrix green color
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 30);

    // Terminal functionality
    const output = document.getElementById('output');
    const input = document.getElementById('user-input');

    const commands = {
        help: 'Available commands: about, skills, projects, contact, clear',
        about: 'I am a passionate full stack developer with expertise in various technologies.',
        skills: 'Frontend: HTML, CSS, JavaScript, React\nBackend: Node.js, Python, Java\nDatabase: MongoDB, MySQL, PostgreSQL\nDevOps: Docker, Kubernetes, AWS',
        projects: '1. E-commerce Platform (MERN Stack)\n2. Task Management App (Vue.js + Django)\n3. Real-time Chat Application (Socket.io + Express)\n4. Personal Blog (Gatsby + GraphQL)',
        contact: 'Email: shahyr08@gmail.com\nGitHub: github.com/shahyru\nLinkedIn: linkedin.com/in/shahyru',
        clear: 'clear',
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            addToOutput(`user@linux:~$ ${command}`);
            
            if (commands.hasOwnProperty(command)) {
                if (command === 'clear') {
                    output.innerHTML = '';
                } else {
                    addToOutput(commands[command]);
                }
            } else {
                addToOutput('Command not found. Type "help" for available commands.');
            }

            input.value = '';
        }
    });

    function addToOutput(text) {
        const div = document.createElement('div');
        div.textContent = text;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    addToOutput('Welcome to the Terminal. Type "help" for available commands.');
    addToOutput('user@linux:~$ help');
});
