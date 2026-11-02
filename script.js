/**
 * ============================================================================
 * PROTYPE ENTERPRISE & CERTIFICATE ENGINE
 * Founder: Mr.Climax_438
 * ============================================================================
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.profile = "clicky";
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playKey(isError = false) {
        if (this.profile === "off") return;
        this.init();
        if (this.ctx.state === "suspended") this.ctx.resume();

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        if (isError) {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);
            gain.gain.setValueAtTime(0.16, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            osc.start(now);
            osc.stop(now + 0.09);
            return;
        }

        switch (this.profile) {
            case "clicky":
                osc.type = "triangle";
                osc.frequency.setValueAtTime(1150, now);
                osc.frequency.exponentialRampToValueAtTime(220, now + 0.035);
                gain.gain.setValueAtTime(0.14, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
                osc.start(now);
                osc.stop(now + 0.035);
                break;
            case "tactile":
                osc.type = "sine";
                osc.frequency.setValueAtTime(420, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);
                gain.gain.setValueAtTime(0.14, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
                break;
            case "linear":
                osc.type = "sine";
                osc.frequency.setValueAtTime(240, now);
                osc.frequency.exponentialRampToValueAtTime(75, now + 0.045);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
                osc.start(now);
                osc.stop(now + 0.045);
                break;
            case "typewriter":
                osc.type = "square";
                osc.frequency.setValueAtTime(780, now);
                osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
        }
    }
}

const CORE_WORDS = [
    "system", "program", "network", "database", "function", "variable", "element", "compile",
    "quantum", "velocity", "gravity", "momentum", "current", "voltage", "magnetic", "circuit",
    "interface", "protocol", "latency", "bandwidth", "browser", "server", "client", "deploy",
    "algorithm", "structure", "dynamic", "parallel", "logical", "compute", "storage", "virtual",
    "framework", "package", "library", "module", "version", "control", "branch", "release",
    "keyboard", "monitor", "process", "thread", "memory", "pointer", "integer", "boolean",
    "string", "object", "method", "inherit", "abstract", "promise", "async", "await",
    "render", "layout", "vector", "matrix", "shader", "buffer", "stream", "socket",
    "encrypt", "cipher", "token", "session", "request", "response", "header", "payload",
    "cluster", "replica", "balance", "gateway", "router", "switch", "packet", "signal",
    "energy", "particle", "photon", "theorem", "calculus", "equation", "constant", "spectrum",
    "frequency", "harmonic", "impulse", "reaction", "friction", "kinetic", "thermal", "nuclear",
    "orbital", "eclipse", "galaxy", "horizon", "zenith", "compass", "archive", "journal",
    "academy", "scholar", "lecture", "concept", "insight", "analyze", "measure", "precise",
    "accurate", "optimal", "minimal", "robust", "scalable", "resilient", "fluent", "rapid",
    "intense", "focus", "rhythm", "pattern", "sequence", "chapter", "summary", "context",
    "project", "venture", "strategy", "mission", "vision", "outcome", "metric", "progress"
];

const PUNCTUATION_MARKS = [",", ".", ";", "!", "?", ":"];

const CODE_SNIPPETS = [
    "const fetchUserData = async (id) => { const res = await fetch(`/api/users/${id}`); return res.json(); };",
    "function calculateKineticEnergy(mass, velocity) { return 0.5 * mass * Math.pow(velocity, 2); }",
    "for (let i = 0; i < matrix.length; i++) { totalSum += matrix[i].reduce((a, b) => a + b, 0); }",
    "class ClimaxEngine { constructor(speed, accuracy) { this.rating = speed * (accuracy / 100); } }",
    "const activeTypists = users.filter(u => u.wpm >= 80).map(u => u.username.toUpperCase());"
];

const ORIGINAL_PASSAGES = [
    "Consistent deliberate practice builds strong neural pathways between visual perception and finger movement, allowing elite typists to execute complex words effortlessly.",
    "Clean software architecture separates core business logic from user interface components, making modern web applications much easier to test, maintain, and scale.",
    "High speed typing is not about moving your fingers frantically; it is about eliminating hesitation between characters and maintaining a steady, accurate rhythm."
];

class ProTypeApp {
    constructor() {
        this.sound = new SoundEngine();
        this.username = "Typist";

        this.mode = "time";
        this.subValue = 60;
        this.usePunctuation = false;
        this.useNumbers = false;
        this.suddenDeath = false;
        this.pacemakerWPM = 0;

        this.wordsList = [];
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isRunning = false;
        this.isFinished = false;
        this.startTime = null;
        this.timerInterval = null;
        this.ghostInterval = null;
        this.timeElapsed = 0;
        this.timeRemaining = 60;

        this.lastResult = {
            wpm: 75,
            raw: 80,
            acc: 98,
            consistency: 95,
            mode: "TIME 60S",
            date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            certId: "MC438-" + Math.floor(100000 + Math.random() * 900000)
        };

        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.totalKeystrokes = 0;
        this.wpmHistory = [];
        this.rawHistory = [];
        this.errorHistory = [];
        this.secondErrors = 0;
        this.keyErrorMap = {};

        this.setupModalFlow();
    }

    setupModalFlow() {
        const modal = document.getElementById("name-modal");
        const nameInput = document.getElementById("user-name-input");
        const startBtn = document.getElementById("btn-start-session");

        nameInput.addEventListener("input", (e) => {
            const val = e.target.value.trim();
            if (val.length > 0) {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        });

        startBtn.addEventListener("click", () => {
            const val = nameInput.value.trim();
            if (val) {
                this.username = val;
                document.getElementById("display-username").textContent = this.username;
                modal.style.display = "none";
                this.cacheDOM();
                this.bindEvents();
                this.loadSavedData();
                this.initTest();
            }
        });

        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !startBtn.disabled) {
                startBtn.click();
            }
        });
    }

    cacheDOM() {
        this.appWrapper = document.getElementById("app-wrapper");
        this.wordsStream = document.getElementById("words-stream");
        this.hiddenInput = document.getElementById("hidden-input");
        this.userCaret = document.getElementById("user-caret");
        this.ghostCaret = document.getElementById("ghost-caret");
        this.typingViewport = document.getElementById("typing-viewport");
        this.resultsDashboard = document.getElementById("results-dashboard");

        this.hudProgress = document.getElementById("hud-progress");
        this.hudWpm = document.getElementById("hud-wpm");
        this.hudRaw = document.getElementById("hud-raw");
        this.hudAcc = document.getElementById("hud-acc");
        this.hudBurst = document.getElementById("hud-burst");
    }

    bindEvents() {
        document.querySelectorAll(".nav-tab").forEach(btn => {
            btn.addEventListener("click", () => this.switchTab(btn.dataset.target));
        });

        document.getElementById("nav-home").addEventListener("click", () => this.switchTab("view-arena"));

        document.getElementById("theme-selector").addEventListener("change", (e) => {
            document.documentElement.setAttribute("data-theme", e.target.value);
            localStorage.setItem("protype_theme", e.target.value);
        });

        document.getElementById("mod-punctuation").addEventListener("click", (e) => {
            this.usePunctuation = !this.usePunctuation;
            e.currentTarget.classList.toggle("active", this.usePunctuation);
            this.initTest();
        });

        document.getElementById("mod-numbers").addEventListener("click", (e) => {
            this.useNumbers = !this.useNumbers;
            e.currentTarget.classList.toggle("active", this.useNumbers);
            this.initTest();
        });

        document.getElementById("mod-suddendeath").addEventListener("click", (e) => {
            this.suddenDeath = !this.suddenDeath;
            e.currentTarget.classList.toggle("active", this.suddenDeath);
            this.initTest();
        });

        document.querySelectorAll(".mode-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
                e.currentTarget.classList.add("active");
                this.mode = e.currentTarget.dataset.mode;
                this.updateSubmodeButtons();
                this.initTest();
            });
        });

        document.getElementById("submode-container").addEventListener("click", (e) => {
            if (e.target.classList.contains("sub-btn")) {
                document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                this.subValue = parseInt(e.target.dataset.val, 10);
                this.initTest();
            }
        });

        this.typingViewport.addEventListener("click", () => this.focusInput());
        this.hiddenInput.addEventListener("focus", () => this.typingViewport.classList.remove("blurred"));
        this.hiddenInput.addEventListener("blur", () => {
            if (!this.isFinished) this.typingViewport.classList.add("blurred");
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                this.initTest();
                return;
            }
            if (document.getElementById("view-arena").classList.contains("active") && !this.isFinished) {
                if (document.activeElement !== this.hiddenInput && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                    this.focusInput();
                }
            }
        });

        window.addEventListener("resize", () => this.updateCaretPosition());
        this.hiddenInput.addEventListener("input", (e) => this.handleInput(e));

        document.getElementById("btn-restart").addEventListener("click", () => this.initTest());
        document.getElementById("btn-next-test").addEventListener("click", () => this.initTest());
        document.getElementById("btn-replay-words").addEventListener("click", () => this.initTest(true));
        document.getElementById("btn-download-cert").addEventListener("click", () => this.downloadCertificate());

        document.getElementById("btn-apply-custom").addEventListener("click", () => {
            const raw = document.getElementById("custom-textarea").value.trim();
            if (!raw) return;
            this.customWords = raw.split(/\s+/);
            this.mode = "custom";
            this.switchTab("view-arena");
            this.initTest();
        });

        document.getElementById("setting-sound").addEventListener("change", (e) => {
            this.sound.profile = e.target.value;
        });

        document.getElementById("setting-pacemaker").addEventListener("change", (e) => {
            this.pacemakerWPM = parseInt(e.target.value, 10) || 0;
            this.initTest();
        });

        document.getElementById("setting-caret").addEventListener("change", (e) => {
            this.userCaret.className = `caret ${e.target.value}`;
        });

        document.getElementById("setting-fontsize").addEventListener("change", (e) => {
            document.getElementById("words-wrapper").style.fontSize = e.target.value;
            this.updateCaretPosition();
        });

        document.getElementById("btn-clear-history").addEventListener("click", () => {
            localStorage.removeItem("protype_history");
            this.loadSavedData();
        });
    }

    switchTab(targetId) {
        document.querySelectorAll(".nav-tab").forEach(b => {
            b.classList.toggle("active", b.dataset.target === targetId);
        });
        document.querySelectorAll(".view-section").forEach(v => {
            v.classList.toggle("active", v.id === targetId);
        });
        if (targetId === "view-arena") this.focusInput();
        if (targetId === "results-dashboard" && !this.resultsDashboard.classList.contains("hidden")) {
            this.drawLightCertificate();
        }
    }

    updateSubmodeButtons() {
        const container = document.getElementById("submode-container");
        if (this.mode === "time") {
            this.subValue = 60;
            container.innerHTML = `
                <button class="ribbon-btn sub-btn" data-val="15">15</button>
                <button class="ribbon-btn sub-btn" data-val="30">30</button>
                <button class="ribbon-btn sub-btn active" data-val="60">60</button>
                <button class="ribbon-btn sub-btn" data-val="120">120</button>
            `;
        } else if (this.mode === "words") {
            this.subValue = 25;
            container.innerHTML = `
                <button class="ribbon-btn sub-btn" data-val="10">10</button>
                <button class="ribbon-btn sub-btn active" data-val="25">25</button>
                <button class="ribbon-btn sub-btn" data-val="50">50</button>
                <button class="ribbon-btn sub-btn" data-val="100">100</button>
            `;
        } else {
            container.innerHTML = `<span class="ribbon-btn active">Standard</span>`;
        }
    }

    buildWordList() {
        if (this.mode === "custom" && this.customWords && this.customWords.length > 0) {
            return [...this.customWords];
        }
        if (this.mode === "code") {
            const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
            return snippet.split(" ");
        }
        if (this.mode === "passage") {
            const passage = ORIGINAL_PASSAGES[Math.floor(Math.random() * ORIGINAL_PASSAGES.length)];
            return passage.split(" ");
        }

        const count = this.mode === "words" ? this.subValue : 140;
        const generated = [];

        for (let i = 0; i < count; i++) {
            let word = CORE_WORDS[Math.floor(Math.random() * CORE_WORDS.length)];
            if (this.usePunctuation && Math.random() < 0.22) {
                if (Math.random() < 0.35) word = word.charAt(0).toUpperCase() + word.slice(1);
                word += PUNCTUATION_MARKS[Math.floor(Math.random() * PUNCTUATION_MARKS.length)];
            }
            if (this.useNumbers && Math.random() < 0.15) {
                word = String(Math.floor(Math.random() * 999));
            }
            generated.push(word);
        }
        return generated;
    }

    initTest(repeatSameWords = false) {
        clearInterval(this.timerInterval);
        clearInterval(this.ghostInterval);

        if (!repeatSameWords || this.wordsList.length === 0) {
            this.wordsList = this.buildWordList();
        }

        this.wordIndex = 0;
        this.charIndex = 0;
        this.isRunning = false;
        this.isFinished = false;
        this.timeElapsed = 0;
        this.timeRemaining = this.mode === "time" ? this.subValue : 0;

        this.correctChars = 0;
        this.incorrectChars = 0;
        this.extraChars = 0;
        this.missedChars = 0;
        this.totalKeystrokes = 0;
        this.wpmHistory = [];
        this.rawHistory = [];
        this.errorHistory = [];
        this.secondErrors = 0;
        this.keyErrorMap = {};

        this.appWrapper.classList.remove("focus-active");
        this.resultsDashboard.classList.add("hidden");
        this.typingViewport.classList.remove("hidden");
        this.userCaret.classList.remove("hidden");

        this.renderWordsDOM();
        this.updateHUD();
        this.hiddenInput.value = "";
        this.focusInput();
        requestAnimationFrame(() => this.updateCaretPosition());
    }

    renderWordsDOM() {
        this.wordsStream.querySelectorAll(".word").forEach(el => el.remove());
        this.wordsStream.style.top = "0px";

        const fragment = document.createDocumentFragment();
        this.wordsList.forEach((wordStr) => {
            const wordDiv = document.createElement("div");
            wordDiv.className = "word";
            for (let i = 0; i < wordStr.length; i++) {
                const span = document.createElement("span");
                span.className = "char";
                span.textContent = wordStr[i];
                wordDiv.appendChild(span);
            }
            fragment.appendChild(wordDiv);
        });
        this.wordsStream.appendChild(fragment);
    }

    getWordElements() {
        return this.wordsStream.querySelectorAll(".word");
    }

    startEngine() {
        this.isRunning = true;
        this.startTime = performance.now();
        this.appWrapper.classList.add("focus-active");

        if (this.pacemakerWPM > 0) {
            this.startPacemakerGhost();
        }

        this.timerInterval = setInterval(() => {
            this.timeElapsed++;
            if (this.mode === "time") this.timeRemaining--;

            const mins = this.timeElapsed / 60;
            const currentNetWpm = Math.round((this.correctChars / 5) / mins);
            const currentRawWpm = Math.round((this.totalKeystrokes / 5) / mins);

            this.wpmHistory.push(currentNetWpm);
            this.rawHistory.push(currentRawWpm);
            this.errorHistory.push(this.secondErrors);
            this.secondErrors = 0;

            this.updateHUD();

            if (this.mode === "time" && this.timeRemaining <= 0) {
                this.finishTest();
            }
        }, 1000);
    }

    startPacemakerGhost() {
        this.ghostCaret.classList.remove("hidden");
        const charsPerSec = (this.pacemakerWPM * 5) / 60;
        let ghostWordIdx = 0;
        let ghostCharIdx = 0;

        this.ghostInterval = setInterval(() => {
            const wordEls = this.getWordElements();
            const wordEl = wordEls[ghostWordIdx];
            if (!wordEl) return;
            const chars = wordEl.children;
            if (ghostCharIdx < chars.length) {
                const target = chars[ghostCharIdx];
                this.ghostCaret.style.left = `${wordEl.offsetLeft + target.offsetLeft}px`;
                this.ghostCaret.style.top = `${wordEl.offsetTop}px`;
                ghostCharIdx++;
            } else {
                ghostWordIdx++;
                ghostCharIdx = 0;
            }
        }, 1000 / charsPerSec);
    }

    handleInput(e) {
        if (this.isFinished) return;
        if (!this.isRunning) this.startEngine();

        const wordEls = this.getWordElements();
        const currentWordEl = wordEls[this.wordIndex];
        if (!currentWordEl) return;

        const expectedWord = this.wordsList[this.wordIndex];
        const inputType = e.inputType;
        const val = this.hiddenInput.value;
        const lastChar = val[val.length - 1];

        if (inputType === "deleteContentBackward") {
            this.sound.playKey(false);
            if (this.charIndex > 0) {
                this.charIndex--;
                const charSpan = currentWordEl.children[this.charIndex];
                if (charSpan.classList.contains("extra")) {
                    charSpan.remove();
                } else {
                    charSpan.classList.remove("correct", "incorrect");
                }
            }
            this.updateCaretPosition();
            return;
        }

        if (lastChar === " ") {
            if (this.charIndex === 0) {
                this.hiddenInput.value = "";
                return;
            }
            this.sound.playKey(false);
            this.totalKeystrokes++;

            if (this.charIndex < expectedWord.length) {
                this.missedChars += (expectedWord.length - this.charIndex);
                currentWordEl.classList.add("has-error");
                if (this.suddenDeath) {
                    this.finishTest();
                    return;
                }
            } else {
                this.correctChars++;
            }

            this.wordIndex++;
            this.charIndex = 0;
            this.hiddenInput.value = "";

            if (this.mode === "time" && this.wordIndex > this.wordsList.length - 30) {
                const moreWords = this.buildWordList().slice(0, 40);
                moreWords.forEach(w => {
                    this.wordsList.push(w);
                    const wordDiv = document.createElement("div");
                    wordDiv.className = "word";
                    w.split("").forEach(c => {
                        const s = document.createElement("span");
                        s.className = "char";
                        s.textContent = c;
                        wordDiv.appendChild(s);
                    });
                    this.wordsStream.appendChild(wordDiv);
                });
            }

            if (this.wordIndex >= this.wordsList.length) {
                this.finishTest();
                return;
            }

            this.updateCaretPosition();
            this.updateHUD();
            return;
        }

        this.totalKeystrokes++;

        if (this.charIndex < expectedWord.length) {
            const expectedChar = expectedWord[this.charIndex];
            const charSpan = currentWordEl.children[this.charIndex];

            if (lastChar === expectedChar) {
                charSpan.classList.add("correct");
                this.correctChars++;
                this.sound.playKey(false);
            } else {
                charSpan.classList.add("incorrect");
                currentWordEl.classList.add("has-error");
                this.incorrectChars++;
                this.secondErrors++;
                this.sound.playKey(true);
                if (this.suddenDeath) {
                    this.finishTest();
                    return;
                }
            }
            this.charIndex++;
        } else if (this.charIndex < expectedWord.length + 8) {
            const extraSpan = document.createElement("span");
            extraSpan.className = "char extra";
            extraSpan.textContent = lastChar;
            currentWordEl.appendChild(extraSpan);
            this.extraChars++;
            this.secondErrors++;
            this.charIndex++;
            this.sound.playKey(true);
            if (this.suddenDeath) {
                this.finishTest();
                return;
            }
        }

        if (this.mode !== "time" &&
            this.wordIndex === this.wordsList.length - 1 &&
            this.charIndex === expectedWord.length) {
            this.finishTest();
            return;
        }

        this.updateCaretPosition();
        this.updateHUD();
    }

    updateCaretPosition() {
        const wordEls = this.getWordElements();
        const currentWordEl = wordEls[this.wordIndex];
        if (!currentWordEl) return;

        const chars = currentWordEl.children;
        let left = currentWordEl.offsetLeft;
        const top = currentWordEl.offsetTop;

        if (this.charIndex < chars.length) {
            left += chars[this.charIndex].offsetLeft;
        } else if (chars.length > 0) {
            const last = chars[chars.length - 1];
            left += last.offsetLeft + last.offsetWidth;
        }

        this.userCaret.style.left = `${left}px`;
        this.userCaret.style.top = `${top}px`;

        const singleLineHeight = currentWordEl.offsetHeight || 46;
        if (top > singleLineHeight * 1.4) {
            const scrollOffset = top - singleLineHeight;
            this.wordsStream.style.top = `-${scrollOffset}px`;
        } else {
            this.wordsStream.style.top = `0px`;
        }
    }

    updateHUD() {
        if (this.mode === "time") {
            this.hudProgress.textContent = `${this.timeRemaining}s`;
        } else {
            this.hudProgress.textContent = `${this.wordIndex}/${this.wordsList.length}`;
        }

        const elapsedMins = Math.max((performance.now() - (this.startTime || performance.now())) / 60000, 1 / 60);
        const netWpm = this.isRunning ? Math.round((this.correctChars / 5) / elapsedMins) : 0;
        const rawWpm = this.isRunning ? Math.round((this.totalKeystrokes / 5) / elapsedMins) : 0;
        const acc = this.totalKeystrokes > 0 ? Math.round((this.correctChars / this.totalKeystrokes) * 100) : 100;

        this.hudWpm.textContent = netWpm;
        this.hudRaw.textContent = rawWpm;
        this.hudAcc.textContent = `${Math.max(0, Math.min(100, acc))}%`;
        this.hudBurst.textContent = this.wpmHistory.length > 0 ? this.wpmHistory[this.wpmHistory.length - 1] : netWpm;
    }

    finishTest() {
        clearInterval(this.timerInterval);
        clearInterval(this.ghostInterval);
        this.isRunning = false;
        this.isFinished = true;
        this.appWrapper.classList.remove("focus-active");
        this.ghostCaret.classList.add("hidden");
        this.userCaret.classList.add("hidden");

        const totalDurationSec = Math.max(1, Math.round((performance.now() - this.startTime) / 1000));
        const mins = totalDurationSec / 60;

        const netWpm = Math.round((this.correctChars / 5) / mins);
        const rawWpm = Math.round((this.totalKeystrokes / 5) / mins);
        const accuracy = this.totalKeystrokes > 0 ? Math.round((this.correctChars / this.totalKeystrokes) * 100) : 100;

        let consistency = 100;
        if (this.wpmHistory.length > 1) {
            const mean = this.wpmHistory.reduce((a, b) => a + b, 0) / this.wpmHistory.length;
            const variance = this.wpmHistory.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.wpmHistory.length;
            const stdDev = Math.sqrt(variance);
            consistency = mean > 0 ? Math.max(0, Math.round(100 - (stdDev / mean) * 100)) : 0;
        }

        const modeLabel = `${this.mode.toUpperCase()} (${this.subValue})`;
        document.getElementById("res-mode-tag").textContent = modeLabel;
        document.getElementById("res-wpm").textContent = netWpm;
        document.getElementById("res-acc").textContent = `${accuracy}%`;
        document.getElementById("res-raw").textContent = `${rawWpm} WPM`;
        document.getElementById("res-consistency").textContent = `${consistency}%`;
        document.getElementById("res-chars").textContent = `${this.correctChars}/${this.incorrectChars}/${this.extraChars}/${this.missedChars}`;
        document.getElementById("res-time").textContent = `${totalDurationSec}s`;

        this.lastResult = {
            wpm: netWpm,
            raw: rawWpm,
            acc: accuracy,
            consistency: consistency,
            mode: modeLabel,
            date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
            certId: "MC438-" + Math.floor(100000 + Math.random() * 900000)
        };

        this.resultsDashboard.classList.remove("hidden");
        this.renderPerformanceGraph();
        this.drawLightCertificate();

        this.saveTestResult({
            date: new Date().toLocaleString(),
            mode: `${this.mode} ${this.subValue}`,
            timeVal: this.mode === "time" ? this.subValue : null,
            wpm: netWpm,
            raw: rawWpm,
            acc: accuracy,
            consistency: consistency
        });
    }

    renderPerformanceGraph() {
        const canvas = document.getElementById("performance-canvas");
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const styles = getComputedStyle(document.documentElement);
        const accentColor = styles.getPropertyValue("--accent").trim() || "#e2b714";
        const subColor = styles.getPropertyValue("--text-sub").trim() || "#646669";

        const dataWpm = this.wpmHistory.length > 0 ? this.wpmHistory : [0, 0];
        const dataRaw = this.rawHistory.length > 0 ? this.rawHistory : [0, 0];
        const maxVal = Math.max(...dataRaw, ...dataWpm, 60) * 1.15;

        const padLeft = 40, padRight = 20, padTop = 20, padBottom = 30;
        const plotW = width - padLeft - padRight;
        const plotH = height - padTop - padBottom;

        ctx.strokeStyle = "rgba(128, 128, 128, 0.18)";
        ctx.lineWidth = 1;
        ctx.font = "11px JetBrains Mono";
        ctx.fillStyle = subColor;

        for (let i = 0; i <= 4; i++) {
            const y = padTop + (plotH / 4) * i;
            const labelVal = Math.round(maxVal - (maxVal / 4) * i);
            ctx.beginPath();
            ctx.moveTo(padLeft, y);
            ctx.lineTo(width - padRight, y);
            ctx.stroke();
            ctx.fillText(labelVal, 6, y + 4);
        }

        const drawCurve = (dataset, color, dashed = false) => {
            if (dataset.length < 2) return;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.5;
            if (dashed) ctx.setLineDash([5, 5]);

            dataset.forEach((val, idx) => {
                const x = padLeft + (idx / (dataset.length - 1)) * plotW;
                const y = padTop + plotH - (val / maxVal) * plotH;
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.restore();
        };

        drawCurve(dataRaw, subColor, true);
        drawCurve(dataWpm, accentColor, false);
    }

    getSkillRank(wpm) {
        if (wpm >= 100) return "GRANDMASTER TYPIST";
        if (wpm >= 80) return "ELITE SPEED SPECIALIST";
        if (wpm >= 60) return "PROFESSIONAL TYPIST";
        if (wpm >= 40) return "CERTIFIED INTERMEDIATE";
        return "RISING KEYBOARD PRACTITIONER";
    }

    /* ----------------------------------------------------------------------
       NEW LIGHT THEME CERTIFICATE ENGINE WITH USER NAME & MR.CLIMAX_438 FOUNDER
       ---------------------------------------------------------------------- */
    drawLightCertificate() {
        const canvas = document.getElementById("certificate-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        const holderName = this.username;
        const res = this.lastResult;
        const rankTitle = this.getSkillRank(res.wpm);

        // Light Theme Palette (Ivory & Gold Elegant)
        const bgStart = "#ffffff";
        const bgEnd = "#fbf8f0";
        const primary = "#9a7217";
        const textMain = "#1e293b";
        const textSub = "#64748b";
        const cardBg = "rgba(154,114,23,0.05)";

        // 1. Clean Light Background
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, bgStart);
        grad.addColorStop(1, bgEnd);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // 2. Double Borders
        ctx.strokeStyle = primary;
        ctx.lineWidth = 6;
        ctx.strokeRect(32, 32, W - 64, H - 64);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(46, 46, W - 92, H - 92);

        // Corner Ornaments
        const corners = [
            [32, 32, 1, 1],
            [W - 32, 32, -1, 1],
            [32, H - 32, 1, -1],
            [W - 32, H - 32, -1, -1]
        ];
        ctx.fillStyle = primary;
        corners.forEach(([cx, cy, dx, dy]) => {
            ctx.fillRect(cx, cy, 28 * dx, 8 * dy);
            ctx.fillRect(cx, cy, 8 * dx, 28 * dy);
        });

        // 3. Header
        ctx.textAlign = "center";
        ctx.fillStyle = primary;
        ctx.font = "700 20px 'JetBrains Mono', monospace";
        ctx.fillText("★ CERTIFICATE OF MERIT & PROFICIENCY ★", W / 2, 108);

        ctx.fillStyle = textMain;
        ctx.font = "800 44px 'Cinzel', serif";
        ctx.fillText("OFFICIAL TYPING AWARD", W / 2, 168);

        ctx.fillStyle = textSub;
        ctx.font = "500 18px 'Inter', sans-serif";
        ctx.fillText("PROUDLY PRESENTED TO", W / 2, 218);

        // 4. User Name
        ctx.fillStyle = primary;
        ctx.font = "700 52px 'Cinzel', serif";
        ctx.fillText(holderName.toUpperCase(), W / 2, 290);

        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 240, 312);
        ctx.lineTo(W / 2 + 240, 312);
        ctx.stroke();

        // 5. Achievement text
        ctx.fillStyle = textMain;
        ctx.font = "400 20px 'Inter', sans-serif";
        ctx.fillText("For demonstrating exceptional keyboard precision and qualifying as a", W / 2, 358);

        ctx.fillStyle = primary;
        ctx.font = "700 24px 'JetBrains Mono', monospace";
        ctx.fillText(`[ ${rankTitle} ]`, W / 2, 396);

        // 6. Metrics Grid
        const metrics = [
            { label: "NET SPEED", value: `${res.wpm} WPM` },
            { label: "ACCURACY", value: `${res.acc}%` },
            { label: "RAW SPEED", value: `${res.raw} WPM` },
            { label: "CONSISTENCY", value: `${res.consistency}%` }
        ];

        const boxW = 215, boxH = 115, gap = 25;
        const totalGridW = metrics.length * boxW + (metrics.length - 1) * gap;
        let startX = (W - totalGridW) / 2;
        const boxY = 435;

        metrics.forEach((m) => {
            ctx.fillStyle = cardBg;
            ctx.fillRect(startX, boxY, boxW, boxH);
            ctx.strokeStyle = primary;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(startX, boxY, boxW, boxH);

            ctx.fillStyle = textSub;
            ctx.font = "700 14px 'JetBrains Mono', monospace";
            ctx.fillText(m.label, startX + boxW / 2, boxY + 38);

            ctx.fillStyle = textMain;
            ctx.font = "700 32px 'JetBrains Mono', monospace";
            ctx.fillText(m.value, startX + boxW / 2, boxY + 84);

            startX += boxW + gap;
        });

        // 7. Verification Seal
        const sealX = W / 2, sealY = 675, sealR = 64;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
        ctx.fillStyle = primary;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sealX, sealY, sealR - 7, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "800 13px 'JetBrains Mono', monospace";
        ctx.fillText("VERIFIED", sealX, sealY - 12);
        ctx.font = "800 15px 'Cinzel', serif";
        ctx.fillText("MR.CLIMAX", sealX, sealY + 10);
        ctx.font = "700 12px 'JetBrains Mono', monospace";
        ctx.fillText("_438 SEAL", sealX, sealY + 28);
        ctx.restore();

        // 8. Left Metadata
        ctx.textAlign = "left";
        ctx.fillStyle = textMain;
        ctx.font = "600 16px 'JetBrains Mono', monospace";
        ctx.fillText(`DATE OF ISSUE : ${res.date}`, 110, 655);
        ctx.fillText(`TEST MODE     : ${res.mode}`, 110, 685);
        ctx.fillText(`CERTIFICATE ID: ${res.certId}`, 110, 715);

        // 9. Right Signature Block (Mr.Climax_438)
        const sigX = W - 250;
        ctx.textAlign = "center";
        ctx.fillStyle = primary;
        ctx.font = "400 44px 'Great Vibes', cursive";
        ctx.fillText("Mr.Climax_438", sigX, 668);

        ctx.strokeStyle = textSub;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sigX - 130, 685);
        ctx.lineTo(sigX + 130, 685);
        ctx.stroke();

        ctx.fillStyle = textMain;
        ctx.font = "700 16px 'Inter', sans-serif";
        ctx.fillText("MR.CLIMAX_438", sigX, 712);

        ctx.fillStyle = textSub;
        ctx.font = "500 13px 'JetBrains Mono', monospace";
        ctx.fillText("FOUNDER & PLATFORM ARCHITECT", sigX, 734);
    }

    downloadCertificate() {
        this.drawLightCertificate();
        const canvas = document.getElementById("certificate-canvas");
        const safeName = this.username.trim().replace(/\s+/g, "_");
        const link = document.createElement("a");
        link.download = `${safeName}_Certificate_MrClimax438.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    saveTestResult(record) {
        const history = JSON.parse(localStorage.getItem("protype_history") || "[]");
        history.unshift(record);
        if (history.length > 50) history.pop();
        localStorage.setItem("protype_history", JSON.stringify(history));
        this.loadSavedData();
    }

    loadSavedData() {
        const savedTheme = localStorage.getItem("protype_theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
            document.getElementById("theme-selector").value = savedTheme;
        }

        const history = JSON.parse(localStorage.getItem("protype_history") || "[]");
        const pb15 = Math.max(0, ...history.filter(h => h.timeVal === 15).map(h => h.wpm));
        const pb30 = Math.max(0, ...history.filter(h => h.timeVal === 30).map(h => h.wpm));
        const pb60 = Math.max(0, ...history.filter(h => h.timeVal === 60).map(h => h.wpm));
        const avg = history.length > 0 ? Math.round(history.reduce((acc, cur) => acc + cur.wpm, 0) / history.length) : 0;

        document.getElementById("pb-15").innerHTML = `${pb15} <small>WPM</small>`;
        document.getElementById("pb-30").innerHTML = `${pb30} <small>WPM</small>`;
        document.getElementById("pb-60").innerHTML = `${pb60} <small>WPM</small>`;
        document.getElementById("career-avg").innerHTML = `${avg} <small>WPM</small>`;

        const tbody = document.getElementById("history-tbody");
        if (history.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6">No tests recorded yet. Complete a test in the Arena!</td></tr>`;
            return;
        }

        tbody.innerHTML = history.slice(0, 15).map(item => `
            <tr>
                <td>${item.date}</td>
                <td>${item.mode}</td>
                <td><strong>${item.wpm} WPM</strong></td>
                <td>${item.raw} WPM</td>
                <td>${item.acc}%</td>
                <td>${item.consistency}%</td>
            </tr>
        `).join("");
    }

    focusInput() {
        this.hiddenInput.focus();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.proTypeApp = new ProTypeApp();
});