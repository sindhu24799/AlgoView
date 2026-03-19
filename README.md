# 🔍 AlgoView — Professional Algorithm Visualizer

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](https://sindhu24799.github.io/algoview/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=for-the-badge)](.)

> **An advanced, production-ready sorting algorithm visualizer built with vanilla JavaScript.** Features 6 sorting algorithms with real-time step-by-step explanations, dual visualization (canvas + array), sound effects, and performance metrics.

![AlgoView Preview](assets/preview.png)

**🎯 Perfect for:** Learning algorithms, interview preparation, teaching data structures

---

## ✨ Quick Start

```bash
# No installation needed! Just open in browser:
open index.html

# Or visit live demo:
https://sindhu24799.github.io/algoview/
```

---

## 🎯 Key Features

### 📊 Visualization
- **Dual View System** - Canvas bar chart + Array value boxes
- **6 Sorting Algorithms** - Bubble, Selection, Insertion, Merge, Quick, Heap
- **Real-time Explanations** - Step-by-step description of every operation
- **Color-coded States** - Comparing, swapping, pivot, sorted
- **Particle Effects** - Visual feedback on swaps
- **Neon Glow Theme** - Modern dark UI

### ⌨️ Controls
- **Keyboard Shortcuts** - Space (Play/Pause), R (Reset), S (Step), 1-6 (Select Algo)
- **Adjustable Speed** - 50ms to 2000ms per step
- **Fast Forward** - 10x speed boost
- **Sound Effects** - Audio feedback for operations
- **Array Patterns** - Random, sorted, reverse, nearly sorted, few unique

### 📈 Metrics
- **Live Counters** - Comparisons, swaps, elapsed time, step progress
- **Complexity Display** - Best/avg/worst case, space complexity
- **Algorithm Comparison** - Side-by-side complexity table

---

## 📚 Algorithms Covered

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `R` | Generate New Array |
| `S` | Step Forward |
| `F` | Toggle Fast Forward |
| `1` | Bubble Sort |
| `2` | Selection Sort |
| `3` | Insertion Sort |
| `4` | Merge Sort |
| `5` | Quick Sort |
| `6` | Heap Sort |

---

## 🛠️ Tech Stack

- **Language:** JavaScript (ES6+)
- **Rendering:** HTML5 Canvas API
- **Styling:** CSS3 with Custom Properties
- **Audio:** Web Audio API
- **Architecture:** Object-Oriented Programming
- **Dependencies:** ZERO (Pure Vanilla JS)

---

## 💼 Technical Highlights

### Code Quality
✅ Clean, modular OOP architecture  
✅ Well-documented with JSDoc-style comments  
✅ Consistent naming conventions  
✅ ES6+ modern JavaScript features  
✅ No external dependencies  

### Problem Solving
✅ Implemented 6 different sorting algorithms  
✅ Created step-generator pattern for visualization  
✅ Managed complex state for animations  
✅ Optimized rendering with Canvas API  
✅ Dual visualization system  

### User Experience
✅ Real-time feedback with detailed explanations  
✅ Multiple input patterns for testing edge cases  
✅ Full keyboard accessibility  
✅ Responsive design (mobile/tablet/desktop)  
✅ Sound effects for engagement  

---

## 📦 Project Structure

```
algoview/
├── index.html              # Main HTML structure
├── assets/
│   ├── style.css           # Complete styling (900+ lines)
│   ├── script.js           # Visualizer logic (1200+ lines)
│   └── preview.png         # Project screenshot
├── README.md               # This file
├── LICENSE                 # MIT License
├── .gitignore              # Git ignore rules
└── DEPLOYMENT_GUIDE.md     # Deployment instructions
```

---

## 🎓 What I Learned

Building AlgoView taught me:

1. **Canvas API Mastery** - High-performance graphics with HiDPI support
2. **Algorithm Deep Dive** - Intimate understanding of sorting internals
3. **State Management** - Step-generator system for pre-computing states
4. **Audio Integration** - Web Audio API for procedural sound generation
5. **Performance Optimization** - Animation frames and particle systems
6. **Responsive Design** - Fluid UI across all device sizes
7. **Accessibility** - Keyboard shortcuts for enhanced usability
8. **Clean Code** - Modular, well-documented code with zero dependencies

---

## 🚀 Deployment

### GitHub Pages (Live)
```bash
# Deploy to GitHub Pages
git init
git add .
git commit -m "Initial commit: AlgoView"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/algoview.git
git push -u origin main

# Then enable GitHub Pages in Settings
```

### Local Testing
```bash
# Just open in any browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## 🔮 Future Enhancements

- [ ] Add search algorithms (Binary Search, BFS, DFS)
- [ ] Add graph algorithms (Dijkstra, A*, MST)
- [ ] Export animation as GIF/MP4
- [ ] Custom theme creator
- [ ] Multi-language support
- [ ] Performance benchmarking mode
- [ ] Side-by-side algorithm comparison

---

## 📊 Performance

Tested on Chrome 120+ with 15 elements:

| Algorithm | Avg. Comparisons | Avg. Swaps | Avg. Time |
|-----------|-----------------|------------|-----------|
| Bubble Sort | ~105 | ~50 | ~15s |
| Selection Sort | ~105 | ~14 | ~12s |
| Insertion Sort | ~55 | ~25 | ~10s |
| Merge Sort | ~45 | ~30 | ~8s |
| Quick Sort | ~45 | ~25 | ~7s |
| Heap Sort | ~50 | ~30 | ~9s |

*Note: Times vary based on initial array configuration and speed setting*

---

## 🤝 Contributing

Contributions are welcome! This is a learning project showcasing vanilla JavaScript skills.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sindhu Chevella**

- 🔗 GitHub: [@sindhu24799](https://github.com/sindhu24799)
- 💼 LinkedIn: [linkedin.com/in/sindhu-chevella](https://linkedin.com/in/sindhu-chevella)
- 📧 Email: [Your Email]

---

## 🙏 Acknowledgments

- Inspired by algorithm visualization tools used in education
- Built with passion for teaching and open source
- Thanks to the JavaScript community for continuous inspiration

---

<div align="center">

**Made with ❤️ and lots of ☕ by [Sindhu Chevella](https://github.com/sindhu24799)**

⭐ Star this repo if you find it helpful!

[Live Demo](https://sindhu24799.github.io/algoview/) • [Report Issue](https://github.com/sindhu24799/algoview/issues) • [Request Feature](https://github.com/sindhu24799/algoview/issues)

</div>
