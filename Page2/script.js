let timer = 0;
const timerElement = document.getElementById('timer');

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// Confetti
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 150 }, () => createConfettiPiece());

    function createConfettiPiece() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 10
        };
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    }

    function updateConfetti() {
        confettiPieces.forEach((p) => {
            p.y += p.d / 2;
            p.x += Math.sin(p.tilt) * 2;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
    }

    function loop() {
        drawConfetti();
        updateConfetti();
        requestAnimationFrame(loop);
    }

    loop();
}

//main algoritma javascript
let remainingCandidates = [];
let currentQuestionIndex = 0;
let askedQuestions = [];
let questionCount = 0;

const questions = [
    { column: "legs", text: "Does the animal have 4 legs?" },
    { column: "fur", text: "Does the animal have fur?" },
    { column: "tail", text: "Does the animal have a tail?" }
];

async function fetchAnimals() {
    try {
        const response = await fetch("fetchAnimals.php");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        remainingCandidates = data;
        askQuestion();
    } catch (error) {
        document.getElementById("question").textContent = "Error loading data: " + error.message;
    }
}

function askQuestion() {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    if (remainingCandidates.length === 1) {
        document.getElementById("question").textContent = `Is it a ${remainingCandidates[0].name}?`;
        yesBtn.onclick = () => finalizeAnswer(true);
        noBtn.onclick = () => finalizeAnswer(false);
    } 
    else if (remainingCandidates.length === 0 || currentQuestionIndex >= questions.length) {
        finalizeAnswer(false);
    } 
    else {
        const question = questions[currentQuestionIndex];
        askedQuestions.push(question);
        document.getElementById("question").textContent = question.text;
        questionCount++;
        yesBtn.onclick = () => processAnswer(true);
        noBtn.onclick = () => processAnswer(false);
    }
}        

function processAnswer(isYes) {
    const question = questions[currentQuestionIndex];
    remainingCandidates = remainingCandidates.filter(animal => 
        (isYes && animal[question.column]) || (!isYes && !animal[question.column])
    );
    currentQuestionIndex++;
    askQuestion();
}

function finalizeAnswer(isCorrect) {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const resultcontainerElement = document.getElementById("result-container")

    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';

    if (isCorrect) {
        document.getElementById("question").textContent = "Yay! I guessed it right!";
        document.getElementById("total-question").innerHTML = `It took ${questionCount} questions to guess!`;
        startConfetti();
    } else {
        document.getElementById("question").textContent = "Oops! I couldn't guess it! What was the animal?";
        resultcontainerElement.style.display = 'block';
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `<input type='text' id='newAnimal' placeholder='Masukkan nama hewan'> <button onclick='submitNewAnimal()'>Kirim</button>`;
        document.getElementById("total-question").innerHTML += ` It took ${questionCount} questions before I gave up.`;
    }
}        

async function submitNewAnimal() {
    const newAnimalName = document.getElementById("newAnimal").value.trim();

    // Validasi nama hewan
    if (!newAnimalName) {
        alert("Nama hewan tidak boleh kosong.");
        return;
    }
    if (newAnimalName.length < 2) {
        alert("Nama hewan terlalu pendek. Masukkan minimal 2 karakter.");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(newAnimalName)) {
        alert("Nama hewan hanya boleh mengandung huruf dan spasi.");
        return;
    }

    // Buat objek hewan baru
    const newAnimal = { name: newAnimalName };
    askedQuestions.forEach(q => {
        newAnimal[q.column] = remainingCandidates.some(a => a[q.column]);
    });

    try {
        const response = await fetch("addAnimal.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAnimal),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.error) throw new Error(result.error);
        
        document.getElementById("question").textContent = "Terima kasih! Saya telah mempelajari sesuatu yang baru!";
        document.getElementById("result").innerHTML = "";
    } catch (error) {
        alert("Terjadi kesalahan saat menyimpan hewan baru: " + error.message);
    }
}

fetchAnimals(); 
startTimer();
