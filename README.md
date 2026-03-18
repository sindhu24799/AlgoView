
HEAD
# AlgoView — Algorithm Visualizer

->An interactive browser-based tool to visualize sorting algorithms 
->in real time, built with vanilla JavaScript and the Canvas API.

![Preview](assets/preview.png)

 **Live Demo:** https://sindhu24799.github.io/algoview


## Features

- Visualizes **Bubble Sort**, **Selection Sort**, and **Merge Sort**
- Step-by-step execution — move forward one comparison at a time
- Play / Pause with adjustable animation speed
- Configurable array size from 8 to 60 elements
- Color-coded states: comparing, swapping, pivot, and sorted
- Live counters for comparisons and swaps
- Zero dependencies — pure HTML, CSS, and JavaScript

## How to Run Locally
```bash
git clone https://github.com/sindhu24799/algoview.git
cd algoview
# Just open index.html in your browser — no build step needed
open index.html
```

## Algorithms Covered

| Algorithm      | Time Complexity | Space Complexity | Stable |
|----------------|----------------|-----------------|--------|
| Bubble Sort    | O(n²)          | O(1)            | Yes    |
| Selection Sort | O(n²)          | O(1)            | No     |
| Merge Sort     | O(n log n)     | O(n)            | Yes    |

## Tech Stack

- **Language:** JavaScript (ES6+)
- **Rendering:** HTML5 Canvas API
- **Styling:** CSS3 with custom properties
- **Deployment:** GitHub Pages

## What I Learned

Building this taught me how to architect a step-generator system that 
pre-computes every algorithm state before animation begins — which is 
what enables the manual step-through feature. I also learned how to 
manage rendering performance on Canvas and handle responsive sizing 
with devicePixelRatio for crisp displays.



Made by [chevella sindhu](https://github.com/sindhu24799)
```

**LICENSE** — Go to **choosealicense.com**, pick MIT license, copy the text, paste it into a file called `LICENSE`. This signals professionalism.

**.gitignore** — create this file with just:
```
.DS_Store
Thumbs.db
*.log

# AlgoView
An interactive browser-based tool to visualize Bubble Sort, Selection Sort, and Merge Sort with real-time color coded feedback and step-by-step execution.
 d00ffa063b5d92ac3f5bee2766c497a5c80405a9
