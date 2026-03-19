/**
 * AlgoView - Interactive Sorting Algorithm Visualizer
 * Professional Edition with Step-by-Step Explanations
 * 
 * Features:
 * - 6 Sorting Algorithms with detailed explanations
 * - Real-time array visualization with values
 * - Step-by-step explanation panel
 * - Sound effects and keyboard shortcuts
 * - Performance metrics
 * 
 * Author: Sindhu Chevella
 * GitHub: https://github.com/sindhu24799
 */

class AlgoVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualizer');
        this.ctx = this.canvas.getContext('2d');

        // State
        this.array = [];
        this.arraySize = 15;
        this.speed = 500;
        this.isRunning = false;
        this.isPaused = false;
        this.isFastForward = false;
        this.currentStep = 0;
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.timerInterval = null;
        this.soundEnabled = true;

        // Audio context
        this.audioContext = null;

        // Colors
        this.colors = {
            default: { top: '#00f3ff', bottom: '#0066ff', glow: 'rgba(0, 243, 255, 0.8)' },
            comparing: { top: '#ffea00', bottom: '#ff8800', glow: 'rgba(255, 234, 0, 0.8)' },
            swapping: { top: '#ff00ff', bottom: '#ff0066', glow: 'rgba(255, 0, 255, 0.8)' },
            pivot: { top: '#bd00ff', bottom: '#6600ff', glow: 'rgba(189, 0, 255, 0.8)' },
            sorted: { top: '#00ff88', bottom: '#00aa44', glow: 'rgba(0, 255, 136, 0.8)' }
        };

        // Algorithm complexity
        this.algorithmComplexity = {
            bubble: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
            selection: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false },
            insertion: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true },
            merge: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true },
            quick: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false },
            heap: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false }
        };

        // Particles
        this.particles = [];

        // Algorithm info with explanations
        this.algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. The largest elements "bubble" to the end with each pass.'
            },
            selection: {
                name: 'Selection Sort',
                description: 'Selection Sort divides the array into sorted and unsorted regions. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region.'
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'Insertion Sort builds the final sorted array one item at a time. It takes each element from the input and finds its correct position in the sorted portion.'
            },
            merge: {
                name: 'Merge Sort',
                description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together.'
            },
            quick: {
                name: 'Quick Sort',
                description: 'Quick Sort picks a pivot element and partitions the array around it, placing smaller elements before and larger elements after. It then recursively sorts the sub-arrays.'
            },
            heap: {
                name: 'Heap Sort',
                description: 'Heap Sort uses a binary heap data structure. It first builds a max heap, then repeatedly extracts the maximum element and rebuilds the heap.'
            }
        };

        this.init();
        this.animateParticles();
    }

    init() {
        this.setupEventListeners();
        this.resizeCanvas();
        this.generateArray();
        this.draw();
        this.updateArrayVisual();
        this.updateComplexityDisplay();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        document.getElementById('algorithm').addEventListener('change', (e) => {
            this.updateAlgorithmInfo(e.target.value);
            this.updateComplexityDisplay(e.target.value);
            this.reset();
        });

        document.getElementById('pattern').addEventListener('change', () => {
            this.reset();
        });

        document.getElementById('arraySize').addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            document.getElementById('sizeValue').textContent = this.arraySize;
            this.reset();
        });

        document.getElementById('speed').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.speed + 'ms';
        });

        document.getElementById('soundToggle').addEventListener('click', () => {
            this.toggleSound();
        });

        document.getElementById('generateBtn').addEventListener('click', () => this.reset());
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('fastForwardBtn').addEventListener('click', () => this.toggleFastForward());
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (this.isRunning) this.pause();
                    else this.play();
                    break;
                case 'KeyR':
                    this.reset();
                    break;
                case 'KeyS':
                    this.step();
                    break;
                case 'KeyF':
                    this.toggleFastForward();
                    break;
                case 'Digit1':
                case 'Numpad1':
                    document.getElementById('algorithm').value = 'bubble';
                    this.updateAlgorithmInfo('bubble');
                    this.updateComplexityDisplay('bubble');
                    this.reset();
                    break;
                case 'Digit2':
                case 'Numpad2':
                    document.getElementById('algorithm').value = 'selection';
                    this.updateAlgorithmInfo('selection');
                    this.updateComplexityDisplay('selection');
                    this.reset();
                    break;
                case 'Digit3':
                case 'Numpad3':
                    document.getElementById('algorithm').value = 'insertion';
                    this.updateAlgorithmInfo('insertion');
                    this.updateComplexityDisplay('insertion');
                    this.reset();
                    break;
                case 'Digit4':
                case 'Numpad4':
                    document.getElementById('algorithm').value = 'merge';
                    this.updateAlgorithmInfo('merge');
                    this.updateComplexityDisplay('merge');
                    this.reset();
                    break;
                case 'Digit5':
                case 'Numpad5':
                    document.getElementById('algorithm').value = 'quick';
                    this.updateAlgorithmInfo('quick');
                    this.updateComplexityDisplay('quick');
                    this.reset();
                    break;
                case 'Digit6':
                case 'Numpad6':
                    document.getElementById('algorithm').value = 'heap';
                    this.updateAlgorithmInfo('heap');
                    this.updateComplexityDisplay('heap');
                    this.reset();
                    break;
            }
        });
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('soundToggle');
        if (this.soundEnabled) {
            btn.classList.add('active');
            btn.textContent = '🔊 ON';
        } else {
            btn.classList.remove('active');
            btn.textContent = '🔇 OFF';
        }
    }

    toggleFastForward() {
        this.isFastForward = !this.isFastForward;
        const btn = document.getElementById('fastForwardBtn');
        if (this.isFastForward) {
            btn.textContent = '⏪ Normal';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-warning');
        } else {
            btn.textContent = '⏩ Fast';
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-primary');
        }
    }

    initAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playSound(frequency, duration, type = 'sine') {
        if (!this.soundEnabled) return;

        this.initAudio();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playCompareSound() { this.playSound(440, 0.05, 'sine'); }
    playSwapSound() { this.playSound(587, 0.08, 'triangle'); }
    playCompleteSound() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            setTimeout(() => this.playSound(freq, 0.15, 'sine'), i * 100);
        });
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.parentElement.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = 400 * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = '400px';

        this.ctx.scale(dpr, dpr);
        this.draw();
    }

    generateArray() {
        const pattern = document.getElementById('pattern').value;
        this.array = [];

        switch (pattern) {
            case 'sorted':
                for (let i = 0; i < this.arraySize; i++) {
                    this.array.push((i + 1) * 10);
                }
                break;
            case 'reverse':
                for (let i = this.arraySize; i > 0; i--) {
                    this.array.push(i * 10);
                }
                break;
            case 'nearly':
                for (let i = 0; i < this.arraySize; i++) {
                    this.array.push((i + 1) * 10 + Math.floor(Math.random() * 20 - 10));
                }
                break;
            case 'fewunique':
                const values = [20, 40, 60, 80, 100, 120];
                for (let i = 0; i < this.arraySize; i++) {
                    this.array.push(values[Math.floor(Math.random() * values.length)]);
                }
                break;
            default:
                for (let i = 0; i < this.arraySize; i++) {
                    this.array.push(Math.floor(Math.random() * 150) + 10);
                }
        }

        this.steps = [];
        this.currentStep = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.particles = [];
        this.updateStats();
        this.updateTime('0.0s');
        this.updateArrayVisual();
        this.updateExplanation('Ready', 'Click "Play" to start the visualization, or "Step" to advance one step at a time.');
    }

    updateArrayVisual(highlightIndices = [], state = 'default') {
        const visualContainer = document.getElementById('arrayVisual');
        const indicesContainer = document.getElementById('arrayIndices');

        visualContainer.innerHTML = '';
        indicesContainer.innerHTML = '';

        this.array.forEach((value, index) => {
            // Create array element
            const element = document.createElement('div');
            element.className = 'array-element';

            // Add state class
            if (highlightIndices.includes(index)) {
                element.classList.add(state);
            }

            element.innerHTML = `
                <span class="array-element-value">${value}</span>
                <span class="array-element-index">[${index}]</span>
            `;
            visualContainer.appendChild(element);

            // Create index marker
            const indexMarker = document.createElement('div');
            indexMarker.className = 'index-marker';
            indexMarker.textContent = index;
            indicesContainer.appendChild(indexMarker);
        });
    }

    updateExplanation(title, detail) {
        document.getElementById('explanationDetail').innerHTML = detail;
        document.querySelector('.explanation-text').textContent = title;
    }

    updateStats() {
        document.getElementById('comparisons').textContent = this.comparisons;
        document.getElementById('swaps').textContent = this.swaps;
        document.getElementById('stepCount').textContent = `${this.currentStep}/${this.steps.length}`;
    }

    updateTime(timeStr) {
        document.getElementById('time').textContent = timeStr;
    }

    startTimer() {
        this.startTime = Date.now();
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            this.updateTime(elapsed.toFixed(1) + 's');
        }, 100);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateStatus(status) {
        document.getElementById('status').textContent = status;
        const statsContainer = document.querySelector('.stats');
        if (status === 'Running') {
            statsContainer.classList.add('running');
        } else {
            statsContainer.classList.remove('running');
        }
    }

    updateAlgorithmInfo(algorithm) {
        const info = this.algorithmInfo[algorithm];
        const complexity = this.algorithmComplexity[algorithm];
        const infoDiv = document.getElementById('algorithmInfo');
        infoDiv.innerHTML = `
            <h3>${info.name}</h3>
            <p><strong>Time Complexity:</strong> Best: ${complexity.best} | Average: ${complexity.avg} | Worst: ${complexity.worst}</p>
            <p><strong>Space Complexity:</strong> ${complexity.space} | <strong>Stable:</strong> ${complexity.stable ? '✅ Yes' : '❌ No'}</p>
            <p>${info.description}</p>
        `;

        document.querySelectorAll('.complexity-comparison tr').forEach(tr => {
            tr.classList.remove('highlight');
        });
        const row = document.querySelector(`.complexity-comparison tr[data-algo="${algorithm}"]`);
        if (row) row.classList.add('highlight');
    }

    updateComplexityDisplay(algorithm = 'bubble') {
        const complexity = this.algorithmComplexity[algorithm];
        document.getElementById('bestCase').textContent = complexity.best;
        document.getElementById('avgCase').textContent = complexity.avg;
        document.getElementById('worstCase').textContent = complexity.worst;
        document.getElementById('spaceComplexity').textContent = complexity.space;
    }

    createParticles(x, y, color, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
                life: 1,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }

    animateParticles() {
        const animate = () => {
            this.particles = this.particles.filter(p => p.life > 0);
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2;
                p.life -= 0.02;
                p.size *= 0.98;
            });
            requestAnimationFrame(animate);
        };
        animate();
    }

    draw(highlightIndices = [], state = 'default') {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const barWidth = (width - 60) / this.array.length;
        const maxVal = Math.max(...this.array, 150);

        this.ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < this.array.length; i++) {
            const barHeight = (this.array[i] / maxVal) * (height - 60);
            const x = 30 + i * barWidth;
            const y = height - barHeight - 30;

            let color = this.colors.default;
            if (highlightIndices.includes(i)) {
                if (state === 'comparing') color = this.colors.comparing;
                else if (state === 'swapping') color = this.colors.swapping;
                else if (state === 'pivot') color = this.colors.pivot;
                else if (state === 'sorted') color = this.colors.sorted;
            }

            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = color.glow;

            const barGradient = this.ctx.createLinearGradient(x, y, x, y + barHeight);
            barGradient.addColorStop(0, color.top);
            barGradient.addColorStop(1, color.bottom);

            this.ctx.fillStyle = barGradient;
            this.ctx.beginPath();
            this.ctx.roundRect(x + 2, y, barWidth - 4, barHeight, [6, 6, 0, 0]);
            this.ctx.fill();

            // Draw value on bar
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
            this.ctx.fillText(this.array[i], x + barWidth / 2, y - 8);

            // Draw index
            this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
            this.ctx.font = '9px Arial';
            this.ctx.fillText(i, x + barWidth / 2, height - 15);

            this.ctx.shadowBlur = 0;

            if (state === 'swapping' && highlightIndices.includes(i)) {
                this.createParticles(x + barWidth / 2, y, color.glow, 3);
            }
        }

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;

        // Draw baseline
        this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.moveTo(20, height - 30);
        this.ctx.lineTo(width - 20, height - 30);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, this.isFastForward ? ms / 10 : ms));
    }

    async play() {
        if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            return;
        }

        if (this.isRunning) return;

        const algorithm = document.getElementById('algorithm').value;
        this.isRunning = true;
        this.isPaused = false;
        this.updateStatus('Running');
        this.startTimer();

        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;

        switch (algorithm) {
            case 'bubble': this.bubbleSortSteps(); break;
            case 'selection': this.selectionSortSteps(); break;
            case 'insertion': this.insertionSortSteps(); break;
            case 'merge': this.mergeSortSteps(); break;
            case 'quick': this.quickSortSteps(); break;
            case 'heap': this.heapSortSteps(); break;
        }

        for (let i = this.currentStep; i < this.steps.length; i++) {
            if (!this.isRunning) break;

            while (this.isPaused) await this.sleep(100);

            const step = this.steps[i];
            this.comparisons = step.comparisons;
            this.swaps = step.swaps;

            if (step.array) this.array = [...step.array];

            this.draw(step.indices, step.state);
            this.updateArrayVisual(step.indices, step.state);
            this.updateStats();
            this.updateExplanation(step.title, step.explanation);
            this.currentStep = i + 1;

            if (step.state === 'comparing') this.playCompareSound();
            if (step.state === 'swapping') this.playSwapSound();

            await this.sleep(this.speed);
        }

        if (this.isRunning) {
            const sortedIndices = Array.from({ length: this.array.length }, (_, i) => i);
            this.draw(sortedIndices, 'sorted');
            this.updateArrayVisual(sortedIndices, 'sorted');
            this.updateStatus('Completed');
            this.stopTimer();
            this.isRunning = false;
            this.currentStep = 0;
            this.playCompleteSound();
            this.updateExplanation('✅ Sorting Complete!', 'The array is now fully sorted. All elements are in ascending order.');

            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = 50 + Math.random() * (this.canvas.clientWidth - 100);
                    const y = 100 + Math.random() * 200;
                    this.createParticles(x, y, this.colors.sorted.glow, 10);
                }, i * 200);
            }
        }
    }

    pause() {
        if (this.isRunning) {
            this.isPaused = true;
            this.updateStatus('Paused');
            this.updateExplanation('⏸ Paused', 'Click "Play" to resume or "Step" to advance one step at a time.');
        }
    }

    step() {
        if (this.steps.length === 0) {
            const algorithm = document.getElementById('algorithm').value;
            this.steps = [];
            this.comparisons = 0;
            this.swaps = 0;

            switch (algorithm) {
                case 'bubble': this.bubbleSortSteps(); break;
                case 'selection': this.selectionSortSteps(); break;
                case 'insertion': this.insertionSortSteps(); break;
                case 'merge': this.mergeSortSteps(); break;
                case 'quick': this.quickSortSteps(); break;
                case 'heap': this.heapSortSteps(); break;
            }
        }

        if (this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];
            this.comparisons = step.comparisons;
            this.swaps = step.swaps;

            if (step.array) this.array = [...step.array];

            this.draw(step.indices, step.state);
            this.updateArrayVisual(step.indices, step.state);
            this.updateStats();
            this.updateExplanation(step.title, step.explanation);
            this.currentStep++;
            this.updateStatus('Stepping');
        } else if (this.currentStep >= this.steps.length && this.steps.length > 0) {
            const sortedIndices = Array.from({ length: this.array.length }, (_, i) => i);
            this.draw(sortedIndices, 'sorted');
            this.updateArrayVisual(sortedIndices, 'sorted');
            this.updateStatus('Completed');
            this.updateExplanation('✅ Sorting Complete!', 'The array is now fully sorted in ascending order.');
        }
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.steps = [];
        this.particles = [];
        this.stopTimer();
        this.updateTime('0.0s');
        this.generateArray();
        this.draw();
        this.updateStatus('Ready');
        this.updateExplanation('Ready', 'Click "Play" to start the visualization, or "Step" to advance one step at a time.');
    }

    // ==================== BUBBLE SORT ====================
    bubbleSortSteps() {
        const arr = [...this.array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.steps.push({
                    indices: [j, j + 1],
                    state: 'comparing',
                    comparisons: this.comparisons + 1,
                    swaps: this.swaps,
                    title: `Comparing elements at positions ${j} and ${j + 1}`,
                    explanation: `Comparing arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? 'Since ' + arr[j] + ' > ' + arr[j + 1] + ', they need to be swapped.' : 'Since ' + arr[j] + ' ≤ ' + arr[j + 1] + ', no swap needed.'}`
                });
                this.comparisons++;

                if (arr[j] > arr[j + 1]) {
                    this.steps.push({
                        indices: [j, j + 1],
                        state: 'swapping',
                        comparisons: this.comparisons,
                        swaps: this.swaps + 1,
                        title: `Swapping elements at positions ${j} and ${j + 1}`,
                        explanation: `Swapping ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}. The larger element moves toward the end.`
                    });
                    this.swaps++;

                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                    this.steps.push({
                        indices: [j, j + 1],
                        state: 'default',
                        comparisons: this.comparisons,
                        swaps: this.swaps,
                        array: [...arr],
                        title: `Swap complete`,
                        explanation: `After swap: arr[${j}] = ${arr[j]}, arr[${j + 1}] = ${arr[j + 1]}. The larger element (${arr[j + 1]}) has moved one position closer to its final sorted position.`
                    });
                }
            }

            this.steps.push({
                indices: [n - i - 1],
                state: 'sorted',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Element at position ${n - i - 1} is now in final position`,
                explanation: `After pass ${i + 1}, the largest unsorted element (${arr[n - i - 1]}) has "bubbled up" to its correct sorted position at index ${n - i - 1}.`
            });
        }

        this.steps.push({
            indices: [0],
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: 'Array is fully sorted!',
            explanation: 'All elements are now in ascending order. Bubble Sort completed successfully.'
        });

        this.array = arr;
    }

    // ==================== SELECTION SORT ====================
    selectionSortSteps() {
        const arr = [...this.array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            this.steps.push({
                indices: [i],
                state: 'pivot',
                comparisons: this.comparisons,
                swaps: this.swaps,
                title: `Starting selection for position ${i}`,
                explanation: `Assuming arr[${i}] = ${arr[i]} is the minimum. Now searching through the remaining unsorted portion to find the actual minimum.`
            });

            for (let j = i + 1; j < n; j++) {
                this.steps.push({
                    indices: [minIdx, j],
                    state: 'comparing',
                    comparisons: this.comparisons + 1,
                    swaps: this.swaps,
                    title: `Comparing current minimum with arr[${j}]`,
                    explanation: `Current minimum is arr[${minIdx}] = ${arr[minIdx]}. Comparing with arr[${j}] = ${arr[j]}. ${arr[j] < arr[minIdx] ? arr[j] + ' is smaller, so this becomes the new minimum.' : arr[j] + ' is not smaller, keeping current minimum.'}`
                });
                this.comparisons++;

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    this.steps.push({
                        indices: [minIdx],
                        state: 'pivot',
                        comparisons: this.comparisons,
                        swaps: this.swaps,
                        title: `New minimum found at position ${minIdx}`,
                        explanation: `Found a new minimum: arr[${minIdx}] = ${arr[minIdx]}. Continue searching for smaller elements.`
                    });
                }
            }

            if (minIdx !== i) {
                this.steps.push({
                    indices: [i, minIdx],
                    state: 'swapping',
                    comparisons: this.comparisons,
                    swaps: this.swaps + 1,
                    title: `Swapping minimum to position ${i}`,
                    explanation: `The minimum element ${arr[minIdx]} at position ${minIdx} will be swapped with arr[${i}] = ${arr[i]} to place it in its correct sorted position.`
                });
                this.swaps++;

                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

                this.steps.push({
                    indices: [i, minIdx],
                    state: 'default',
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    array: [...arr],
                    title: `Swap complete`,
                    explanation: `After swap: arr[${i}] = ${arr[i]} (the minimum) is now in its correct sorted position. Position ${i} is now part of the sorted portion.`
                });
            }

            this.steps.push({
                indices: [i],
                state: 'sorted',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Position ${i} is now sorted`,
                explanation: `The sorted portion now includes indices 0 to ${i}. The element arr[${i}] = ${arr[i]} is in its final sorted position.`
            });
        }

        this.steps.push({
            indices: [n - 1],
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: 'Array is fully sorted!',
            explanation: 'All elements are now in ascending order. Selection Sort completed successfully.'
        });

        this.array = arr;
    }

    // ==================== INSERTION SORT ====================
    insertionSortSteps() {
        const arr = [...this.array];
        const n = arr.length;

        this.steps.push({
            indices: [0],
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            title: 'First element is trivially sorted',
            explanation: `A single element arr[${0}] = ${arr[0]} is always considered sorted. We'll now insert remaining elements into their correct positions.`
        });

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            this.steps.push({
                indices: [i],
                state: 'comparing',
                comparisons: this.comparisons + 1,
                swaps: this.swaps,
                title: `Picking element at position ${i}`,
                explanation: `Current element (key) = arr[${i}] = ${key}. We need to insert this into the correct position in the already sorted portion (indices 0 to ${i - 1}).`
            });
            this.comparisons++;

            while (j >= 0 && arr[j] > key) {
                this.steps.push({
                    indices: [j, j + 1],
                    state: 'swapping',
                    comparisons: this.comparisons,
                    swaps: this.swaps + 1,
                    title: `Shifting arr[${j}] to the right`,
                    explanation: `Since arr[${j}] = ${arr[j]} > key (${key}), we shift arr[${j}] one position to the right to make space for the key.`
                });
                this.swaps++;

                arr[j + 1] = arr[j];

                this.steps.push({
                    indices: [j, j + 1],
                    state: 'default',
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    array: [...arr],
                    title: `Element shifted`,
                    explanation: `arr[${j + 1}] is now ${arr[j + 1]}. Continue comparing key with elements to its left.`
                });

                j--;
                if (j >= 0) {
                    this.steps.push({
                        indices: [j, i],
                        state: 'comparing',
                        comparisons: this.comparisons + 1,
                        swaps: this.swaps,
                        title: `Comparing key with arr[${j}]`,
                        explanation: `Key = ${key}. Comparing with arr[${j}] = ${arr[j]}. ${arr[j] > key ? arr[j] + ' > ' + key + ', so we need to shift again.' : arr[j] + ' ≤ ' + key + ', found the correct position!'}`
                    });
                    this.comparisons++;
                }
            }

            arr[j + 1] = key;

            this.steps.push({
                indices: Array.from({ length: i + 1 }, (_, k) => k),
                state: 'sorted',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Key inserted at position ${j + 1}`,
                explanation: `Key (${key}) inserted at arr[${j + 1}]. The sorted portion now includes indices 0 to ${i}.`
            });
        }

        this.steps.push({
            indices: Array.from({ length: n }, (_, i) => i),
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: 'Array is fully sorted!',
            explanation: 'All elements are now in ascending order. Insertion Sort completed successfully.'
        });

        this.array = arr;
    }

    // ==================== MERGE SORT ====================
    mergeSortSteps() {
        const arr = [...this.array];
        this.mergeSortHelper(arr, 0, arr.length - 1, 0);
        this.array = arr;
    }

    mergeSortHelper(arr, left, right, depth) {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        const indent = '  '.repeat(depth);

        this.steps.push({
            indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            state: 'comparing',
            comparisons: this.comparisons,
            swaps: this.swaps,
            title: `${indent}Dividing array[${left}...${right}]`,
            explanation: `${indent}Splitting the subarray from index ${left} to ${right} into two halves at midpoint ${mid}. Left half: [${left}...${mid}], Right half: [${mid + 1}...${right}].`
        });

        this.mergeSortHelper(arr, left, mid, depth + 1);
        this.mergeSortHelper(arr, mid + 1, right, depth + 1);
        this.merge(arr, left, mid, right, depth);
    }

    merge(arr, left, mid, right, depth) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;
        const indent = '  '.repeat(depth);

        while (i < leftArr.length && j < rightArr.length) {
            this.steps.push({
                indices: [left + i, mid + 1 + j],
                state: 'comparing',
                comparisons: this.comparisons + 1,
                swaps: this.swaps,
                title: `${indent}Comparing for merge`,
                explanation: `${indent}Comparing left[${i}] = ${leftArr[i]} with right[${j}] = ${rightArr[j]}. ${leftArr[i] <= rightArr[j] ? leftArr[i] + ' ≤ ' + rightArr[j] + ', take from left.' : leftArr[i] + ' > ' + rightArr[j] + ', take from right.'}`
            });
            this.comparisons++;

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
                this.swaps++;
            }

            this.steps.push({
                indices: [k],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `${indent}Placing element at position ${k}`,
                explanation: `${indent}Placed ${arr[k]} at arr[${k}]. Merging continues...`
            });
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            this.steps.push({
                indices: [k],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `${indent}Copying remaining from left`,
                explanation: `${indent}Copying ${leftArr[i]} from left subarray to arr[${k}].`
            });
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            this.steps.push({
                indices: [k],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `${indent}Copying remaining from right`,
                explanation: `${indent}Copying ${rightArr[j]} from right subarray to arr[${k}].`
            });
            j++;
            k++;
        }

        this.steps.push({
            indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: `${indent}Merge complete for [${left}...${right}]`,
            explanation: `${indent}Subarray from index ${left} to ${right} is now sorted and merged: [${arr.slice(left, right + 1).join(', ')}].`
        });
    }

    // ==================== QUICK SORT ====================
    quickSortSteps() {
        const arr = [...this.array];
        this.quickSortHelper(arr, 0, arr.length - 1, 0);
        this.array = arr;
    }

    quickSortHelper(arr, low, high, depth) {
        if (low < high) {
            const pi = this.partition(arr, low, high, depth);
            this.quickSortHelper(arr, low, pi - 1, depth + 1);
            this.quickSortHelper(arr, pi + 1, high, depth + 1);
        }
    }

    partition(arr, low, high, depth) {
        const pivot = arr[high];
        const indent = '  '.repeat(depth);

        this.steps.push({
            indices: [high],
            state: 'pivot',
            comparisons: this.comparisons,
            swaps: this.swaps,
            title: `${indent}Choosing pivot: arr[${high}] = ${pivot}`,
            explanation: `${indent}Selected the rightmost element as pivot. Pivot = ${pivot}. Now partitioning: elements < ${pivot} go left, elements > ${pivot} go right.`
        });

        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.steps.push({
                indices: [j, high],
                state: 'comparing',
                comparisons: this.comparisons + 1,
                swaps: this.swaps,
                title: `${indent}Comparing arr[${j}] = ${arr[j]} with pivot`,
                explanation: `${indent}Is ${arr[j]} < ${pivot}? ${arr[j] < pivot ? 'Yes, so this element goes to the left partition.' : 'No, stays on the right.'}`
            });
            this.comparisons++;

            if (arr[j] < pivot) {
                i++;

                if (i !== j) {
                    this.steps.push({
                        indices: [i, j],
                        state: 'swapping',
                        comparisons: this.comparisons,
                        swaps: this.swaps + 1,
                        title: `${indent}Swapping to partition`,
                        explanation: `${indent}Swapping arr[${i}] = ${arr[i]} with arr[${j}] = ${arr[j]} to move smaller element to the left partition.`
                    });
                    this.swaps++;

                    [arr[i], arr[j]] = [arr[j], arr[i]];

                    this.steps.push({
                        indices: [i, j],
                        state: 'default',
                        comparisons: this.comparisons,
                        swaps: this.swaps,
                        array: [...arr],
                        title: `${indent}Swap complete`,
                        explanation: `${indent}After swap: arr[${i}] = ${arr[i]}, arr[${j}] = ${arr[j]}. Element ${arr[i]} is now in the left partition.`
                    });
                }
            }
        }

        if (i + 1 !== high) {
            this.steps.push({
                indices: [i + 1, high],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps + 1,
                title: `${indent}Placing pivot in correct position`,
                explanation: `${indent}Swapping pivot ${arr[high]} with arr[${i + 1}] = ${arr[i + 1]} to place pivot in its final sorted position.`
            });
            this.swaps++;

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

            this.steps.push({
                indices: [i + 1, high],
                state: 'default',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `${indent}Pivot placed at position ${i + 1}`,
                explanation: `${indent}Pivot ${arr[i + 1]} is now at index ${i + 1}. All elements to the left are smaller, all elements to the right are larger.`
            });
        }

        this.steps.push({
            indices: [i + 1],
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: `${indent}Pivot ${arr[i + 1]} is in final position`,
            explanation: `${indent}Pivot at index ${i + 1} is now in its correct sorted position. Now recursively sort the left and right partitions.`
        });

        return i + 1;
    }

    // ==================== HEAP SORT ====================
    heapSortSteps() {
        const arr = [...this.array];
        const n = arr.length;

        this.steps.push({
            indices: Array.from({ length: n }, (_, i) => i),
            state: 'comparing',
            comparisons: this.comparisons,
            swaps: this.swaps,
            title: 'Building Max Heap',
            explanation: 'First, we build a max heap from the array. A max heap is a complete binary tree where each parent node is greater than or equal to its children.'
        });

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }

        this.steps.push({
            indices: Array.from({ length: n }, (_, i) => i),
            state: 'pivot',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: 'Max Heap Built',
            explanation: 'Max heap is complete. The largest element is now at the root (index 0). We will now repeatedly extract the maximum and rebuild the heap.'
        });

        for (let i = n - 1; i > 0; i--) {
            this.steps.push({
                indices: [0, i],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps + 1,
                title: `Swapping root with arr[${i}]`,
                explanation: `Swapping the maximum element (root) arr[0] = ${arr[0]} with arr[${i}] = ${arr[i]}. This places the largest remaining element at its final sorted position.`
            });
            this.swaps++;

            [arr[0], arr[i]] = [arr[i], arr[0]];

            this.steps.push({
                indices: [0, i],
                state: 'default',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Element ${arr[i]} placed at position ${i}`,
                explanation: `After swap: arr[${i}] = ${arr[i]} is now in its final sorted position. Now we need to restore the heap property for the remaining elements.`
            });

            this.steps.push({
                indices: [i],
                state: 'sorted',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Position ${i} is sorted`,
                explanation: `Element at index ${i} is now in its final sorted position. Heap size reduced to ${i}.`
            });

            this.heapify(arr, i, 0);
        }

        this.steps.push({
            indices: [0],
            state: 'sorted',
            comparisons: this.comparisons,
            swaps: this.swaps,
            array: [...arr],
            title: 'Array is fully sorted!',
            explanation: 'All elements are now in ascending order. Heap Sort completed successfully.'
        });

        this.array = arr;
    }

    heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            this.steps.push({
                indices: [largest, left],
                state: 'comparing',
                comparisons: this.comparisons + 1,
                swaps: this.swaps,
                title: `Comparing with left child`,
                explanation: `Comparing parent arr[${largest}] = ${arr[largest]} with left child arr[${left}] = ${arr[left]}.`
            });
            this.comparisons++;

            if (arr[left] > arr[largest]) {
                largest = left;
                this.steps.push({
                    indices: [largest],
                    state: 'pivot',
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    title: `Left child is larger`,
                    explanation: `Left child ${arr[left]} is larger than parent. Marking as potential new root.`
                });
            }
        }

        if (right < n) {
            this.steps.push({
                indices: [largest, right],
                state: 'comparing',
                comparisons: this.comparisons + 1,
                swaps: this.swaps,
                title: `Comparing with right child`,
                explanation: `Comparing current largest arr[${largest}] = ${arr[largest]} with right child arr[${right}] = ${arr[right]}.`
            });
            this.comparisons++;

            if (arr[right] > arr[largest]) {
                largest = right;
                this.steps.push({
                    indices: [largest],
                    state: 'pivot',
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    title: `Right child is larger`,
                    explanation: `Right child ${arr[right]} is the largest. This will become the new parent.`
                });
            }
        }

        if (largest !== i) {
            this.steps.push({
                indices: [i, largest],
                state: 'swapping',
                comparisons: this.comparisons,
                swaps: this.swaps + 1,
                title: `Swapping to maintain heap`,
                explanation: `Swapping arr[${i}] = ${arr[i]} with arr[${largest}] = ${arr[largest]} to maintain the max heap property.`
            });
            this.swaps++;

            [arr[i], arr[largest]] = [arr[largest], arr[i]];

            this.steps.push({
                indices: [i, largest],
                state: 'default',
                comparisons: this.comparisons,
                swaps: this.swaps,
                array: [...arr],
                title: `Heapify swap complete`,
                explanation: `After swap: arr[${i}] = ${arr[i]}, arr[${largest}] = ${arr[largest]}. Now recursively heapify the affected subtree.`
            });

            this.heapify(arr, n, largest);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AlgoVisualizer();
});
