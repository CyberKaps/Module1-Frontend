# 🧠 Time & Space Complexity Estimator


---

## ✨ Features

✅ Accepts raw Python code input via API or UI  
✅ Parses code into AST using Tree-sitter  
✅ Traverses AST to detect:
- Loops (for/while)
- Recursion (self-calls)
- Divide operations (`n // 2`)
  
✅ Calculates Time Complexity using rule-based logic:
- O(1), O(n), O(n²), O(2ⁿ), O(log n), O(n log n), O(n·2ⁿ)

✅ Calculates Space Complexity:
- Based on recursion stack

✅ Generates a human-readable explanation

✅ Stores analysis results in PostgreSQL using Prisma

✅ Frontend UI:
- Monaco Editor for writing code
- Language selector (Python only)
- Analyze button + result display

✅ Fullstack Integration:
- React + Vite frontend
- Node.js + Express backend
- PostgreSQL DB

---

## 🧪 Sample Analysis

Input Code:
```python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

Response:
  {
    "timeComplexity": "O(2^n)",
    "spaceComplexity": "O(n)",
    "explanation": "Detected 0 loop(s), 2 recursive call(s), and 0 divide operation(s). Time estimated as O(2^n)."
  }
