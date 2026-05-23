import { Topic } from '../../types/content';

export const numpyTopics: Topic[] = [
  {
    id: 'np-intro',
    slug: 'intro',
    title: 'The NumPy Array (ndarray)',
    description: 'Why NumPy is the backbone of scientific computing and ML.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    tags: ['numpy', 'ndarray', 'vectorization', 'performance'],
    sections: {
      what: {
        text: `NumPy (Numerical Python) provides the ndarray — a multi-dimensional array that is the universal data structure of scientific Python. Every major library (Pandas, Scikit-Learn, TensorFlow, PyTorch) uses NumPy arrays as their underlying data format.

Standard Python lists are arrays of pointers to objects scattered randomly in memory. When you compute 1000 additions on a Python list, Python dereferences 1000 pointers, checks the type of each object, and invokes Python's addition method for each — thousands of interpreter operations. NumPy stores data in a contiguous block of typed memory (C-style arrays). Operations are dispatched directly to optimized C/Fortran code, bypassing the Python interpreter entirely. This is why NumPy is routinely 10-100× faster than pure Python for numerical operations.

The key NumPy concept is **vectorization**: applying operations to entire arrays at once without explicit Python loops. Instead of "for each element, multiply by 2," you write array * 2 and NumPy applies this using highly optimized SIMD (Single Instruction, Multiple Data) CPU instructions. Modern CPUs can multiply 8+ numbers simultaneously — vectorization exploits this.

NumPy also implements **broadcasting** — a powerful mechanism that allows operations between arrays of different shapes by automatically expanding the smaller array to match the larger one. This enables concise mathematical expressions that would require nested loops in other languages.`,
        eli5: "Python lists are like a messy drawer — items everywhere, different types. NumPy arrays are like a perfectly organized binder with identical slots, all the same type. This organization lets a computer process everything in one lightning-fast sweep.",
        points: ['ndarray: typed, contiguous memory — 10-100x faster than Python lists', 'Vectorization: operations on entire arrays, no Python loops', 'Broadcasting: operations between different-shaped arrays', 'Foundation of Pandas, Scikit-Learn, TensorFlow, PyTorch']
      },
      code: {
        code: `import numpy as np
import time

# ── Creating arrays ─────────────────────────────────
a = np.array([1, 2, 3, 4, 5])           # From Python list
b = np.zeros((3, 4))                     # 3x4 matrix of zeros
c = np.ones((2, 3))                      # 2x3 matrix of ones
d = np.arange(0, 10, 2)                 # [0, 2, 4, 6, 8]
e = np.linspace(0, 1, 5)                # [0, 0.25, 0.5, 0.75, 1.0]
f = np.random.randn(3, 3)               # 3x3 standard normal
g = np.eye(4)                            # 4x4 identity matrix

print("Shape:", a.shape)       # (5,)
print("Dtype:", a.dtype)       # int64
print("ndim:", f.ndim)         # 2 dimensions

# ── Vectorization vs Python loops ─────────────────────
n = 1_000_000
py_list = list(range(n))
np_array = np.arange(n, dtype=np.float64)

# Python loop: slow
t0 = time.perf_counter()
result_py = [x * 2.0 for x in py_list]
print(f"Python loop: {time.perf_counter()-t0:.3f}s")

# NumPy vectorized: fast
t0 = time.perf_counter()
result_np = np_array * 2.0
print(f"NumPy vectorized: {time.perf_counter()-t0:.4f}s")

# ── Vectorized math ─────────────────────────────────
x = np.array([1, 4, 9, 16, 25])
print(np.sqrt(x))    # [1, 2, 3, 4, 5] — element-wise
print(np.log(x))     # element-wise natural log
print(np.sum(x))     # 55 — sum all elements
print(np.mean(x))    # 11.0
print(np.std(x))     # Standard deviation`,
        breakdown: [
          { line: "np.linspace(0, 1, 5)", explanation: 'Creates 5 evenly spaced values from 0 to 1 INCLUSIVE. Extremely common for creating axis values for plotting.' },
          { line: 'np_array * 2.0', explanation: 'Vectorized operation: multiplies EVERY element by 2 using optimized C code. No Python loop at all.' },
          { line: 'np.sqrt(x)', explanation: 'Universal function (ufunc): element-wise operation dispatched to C. Much faster than [math.sqrt(xi) for xi in x].' }
        ]
      },
      examNotes: {
        examNotes: [
        'ndarray: fixed type, contiguous memory, n-dimensional',
        'dtype: int32, int64, float32, float64, bool, complex128',
        'shape: tuple of dimensions e.g., (100, 50) for 100x50 matrix',
        'Vectorization: avoid Python loops, use NumPy operations',
        'np.zeros, np.ones, np.eye, np.arange, np.linspace, np.random',
        'NumPy ufuncs: sqrt, exp, log, sin, cos operate element-wise'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Why is NumPy faster than Python lists for numerical operations?', options: ['NumPy uses more RAM', 'NumPy stores data in typed contiguous memory and dispatches to optimized C code', 'NumPy operations are always cached', 'NumPy uses multiple CPUs by default'], correctIndex: 1, explanation: 'NumPy stores typed data in contiguous memory blocks and operations are implemented in C/Fortran, bypassing Python interpreter overhead entirely.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is vectorization and why is it important?', answer: 'Vectorization means applying operations to entire arrays at once rather than iterating element-by-element in Python. It is important because: (1) it eliminates Python interpreter overhead, (2) it enables CPU SIMD instructions (process multiple values simultaneously), (3) it results in 10-100x speedups. Most NumPy operations and all Pandas/sklearn operations are vectorized.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'np-indexing',
    slug: 'indexing-slicing',
    title: 'Indexing, Slicing & Boolean Masking',
    description: 'Access any part of your array efficiently — the NumPy data access toolkit.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    tags: ['indexing', 'slicing', 'boolean masking', 'fancy indexing'],
    sections: {
      what: {
        text: `NumPy provides four powerful ways to access array elements: basic indexing (single elements), slicing (sub-arrays), boolean masking (filter by condition), and fancy indexing (accessing multiple non-contiguous elements using arrays of indices).

**Slicing** in NumPy extends Python's list slicing to multiple dimensions simultaneously. For a 2D array, arr[1:3, 0:2] selects rows 1-2 AND columns 0-1 in one operation. This is impossible without loops in Python lists.

**Boolean masking** is the most powerful NumPy indexing technique and directly powers Pandas filtering. You create a boolean array (True/False for each element) by applying a condition, then use that array as an index to select only the True elements. This eliminates virtually all "for row in data: if condition: process" loops.

**Fancy indexing** lets you select elements using arrays of indices — selecting multiple non-contiguous rows or columns. Combined with np.argsort(), this enables efficient top-K selection, reordering operations, and dataset sampling.

An important distinction: slices return **views** (references to the original data — modifying the view modifies the original). Fancy indexing and boolean masking return **copies** (independent arrays). Understanding this prevents subtle bugs.`,
        eli5: "Indexing is like pointing at specific items in a tray. Slicing is like scooping out a rectangular section. Boolean masking is like having X-ray glasses that only show you items matching a condition.",
        points: ['Slicing extends to N dimensions: arr[r1:r2, c1:c2]', 'Boolean mask: condition → True/False array → filter', 'Fancy indexing: use arrays of indices to select', 'Slices = views (shared memory); fancy = copies']
      },
      code: {
        code: `import numpy as np

arr_1d = np.array([10, 20, 30, 40, 50])
arr_2d = np.arange(1, 13).reshape(3, 4)  # 3x4 matrix
print(arr_2d)
# [[ 1  2  3  4]
#  [ 5  6  7  8]
#  [ 9 10 11 12]]

# ── Basic indexing ─────────────────────────────────
print(arr_1d[0])       # 10 (first element)
print(arr_1d[-1])      # 50 (last element)
print(arr_2d[1, 2])    # 7 (row 1, col 2)
print(arr_2d[1])       # [5 6 7 8] (entire row 1)

# ── Slicing ───────────────────────────────────────
print(arr_1d[1:4])         # [20 30 40]
print(arr_1d[::2])         # [10 30 50] (every other element)
print(arr_2d[:2, 1:3])     # rows 0-1, cols 1-2

# ── Boolean masking (most important!) ─────────────
data = np.array([15, 43, 8, 67, 22, 91, 5, 38])

mask = data > 30
print("Mask:", mask)        # [F T F T F T F T]
print("Filtered:", data[mask])  # [43 67 91 38]

# Compound conditions
outliers = data[(data > 60) | (data < 10)]
print("Outliers:", outliers)  # [67 91 5]

# Modify selected elements
data[data < 10] = 0    # Zero out small values
print("After zeroing:", data)

# ── Fancy indexing ─────────────────────────────────
indices = np.array([0, 3, 4])    # Select specific indices
print(arr_1d[indices])           # [10 40 50]

# Argsort: indices that would sort the array
scores = np.array([78, 95, 61, 88, 72])
rank_order = np.argsort(scores)[::-1]  # Descending order
print("Rank order:", rank_order)         # [1 3 0 4 2] (95, 88, 78, 72, 61)
print("Top 3 scores:", scores[rank_order[:3]])  # [95 88 78]`,
        breakdown: [
          { line: 'arr_2d[:2, 1:3]', explanation: 'Multi-dimensional slice: select rows 0 and 1 ([:2]), and columns 1 and 2 ([1:3]).' },
          { line: 'data[data > 30]', explanation: 'Boolean masking: data > 30 creates [F,T,F,T,...], then use as index to select only True positions.' },
          { line: 'data[data < 10] = 0', explanation: 'Boolean mask assignment: set all elements less than 10 to zero in-place. Very powerful!' },
          { line: 'np.argsort(scores)[::-1]', explanation: 'argsort returns indices that would sort the array ascending. [::-1] reverses to get descending order.' }
        ]
      },
      examNotes: {
        examNotes: [
        'arr[i, j]: row i, column j (comma-separated for multi-dim)',
        'arr[1:4, ::2]: rows 1-3, every other column',
        'Boolean mask: arr[arr > 5] selects elements > 5',
        'Slices return VIEWS (modifying changes original)',
        'Boolean/fancy indexing returns COPIES',
        'np.where(condition, x, y): element-wise if-else',
        'np.argsort(): returns indices that sort the array'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What is the difference between a view and a copy in NumPy?', options: ['No difference', 'Views share memory with the original; modifying a view modifies the original', 'Copies share memory; views are independent', 'Only applies to 2D arrays'], correctIndex: 1, explanation: 'Slices return views — they share the same memory as the original array. Modifying a view modifies the original. Boolean and fancy indexing return independent copies.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'How do you select rows from a NumPy array where a column value exceeds a threshold?', answer: "arr[arr[:, 2] > 100] — first select column 2 with arr[:, 2], create a boolean mask with > 100, then use that mask to filter rows. This is the vectorized equivalent of 'for row in arr: if row[2] > 100: keep row.'", difficulty: 'Mid', category: 'Coding' }
    ]
  },

  {
    id: 'np-broadcasting',
    slug: 'broadcasting',
    title: 'Broadcasting & Vectorized Operations',
    description: 'Perform operations on arrays of different shapes — NumPy\'s superpower.',
    difficulty: 'Intermediate',
    estimatedMinutes: 30,
    tags: ['broadcasting', 'vectorization', 'reshape', 'linear algebra'],
    sections: {
      what: {
        text: `Broadcasting is NumPy's mechanism for performing arithmetic operations between arrays of different shapes. Instead of requiring arrays to be the same size, NumPy "broadcasts" the smaller array across the larger one according to specific rules.

The broadcasting rules: (1) If arrays have different numbers of dimensions, prepend 1s to the shape of the smaller array. (2) Arrays with size 1 in a dimension are "stretched" to match the other array's size in that dimension. (3) If arrays have incompatible sizes in any dimension (not 1 and not equal), raise an error.

This enables elegant, loop-free mathematical expressions. Subtracting the mean of each column from a matrix: X - X.mean(axis=0) — the mean vector (shape (n_cols,)) is broadcast across all rows. Normalizing each row: X / X.max(axis=1, keepdims=True) — keepdims preserves the shape for proper broadcasting.

Broadcasting is used extensively in ML preprocessing (StandardScaler normalizes each feature), loss computation (prediction_error = y_pred - y_true, where shapes align), and implementing mathematical formulas from papers.`,
        eli5: "Broadcasting is like automatic size adjustment. If you add a 3×3 matrix and a 1×3 row vector, NumPy automatically 'copies' the row vector for each row of the matrix. No manual tiling needed.",
        points: ['Smaller arrays are "stretched" to match larger shapes', 'Trailing dimensions are aligned right', 'Size-1 dimensions are broadcast; incompatible sizes error', 'Eliminates nested loops for array operations']
      },
      code: {
        code: `import numpy as np

# ── Basic broadcasting ──────────────────────────────
# Scalar broadcast to array
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr + 10)    # Add 10 to EVERY element
print(arr * 2)     # Multiply EVERY element by 2

# Row vector broadcast to 2D array
row = np.array([1, 2, 3])
print("arr + row:")
print(arr + row)   # [1,2,3] added to EACH row of arr

# Column vector broadcast to 2D array
col = np.array([[10], [20]])  # Shape (2,1)
print("arr + col:")
print(arr + col)   # 10 added to row 0, 20 added to row 1

# ── Real-world: feature normalization ─────────────────
# Dataset: 5 samples, 3 features
X = np.array([
    [100, 2.5, 0.8],
    [200, 3.1, 1.2],
    [150, 2.8, 0.9],
    [180, 3.5, 1.0],
    [120, 2.2, 0.7]
])

# Compute mean and std of each COLUMN (feature)
col_mean = X.mean(axis=0)  # Shape: (3,)
col_std  = X.std(axis=0)   # Shape: (3,)
print("Feature means:", col_mean)
print("Feature stds:", col_std)

# Normalize: subtract column mean, divide by column std (z-score)
X_normalized = (X - col_mean) / col_std  # Broadcasting!
print("Normalized first row:", X_normalized[0])
print("Verify mean ≈ 0:", X_normalized.mean(axis=0).round(10))
print("Verify std = 1:", X_normalized.std(axis=0).round(10))

# ── Outer products via broadcasting ───────────────────
a = np.array([1, 2, 3])      # Shape (3,)
b = np.array([10, 20, 30])   # Shape (3,)

outer = a[:, np.newaxis] * b[np.newaxis, :]  # Shape (3,3)
print("Outer product:")
print(outer)`,
        breakdown: [
          { line: 'arr + row', explanation: "row has shape (3,), arr has shape (2,3). NumPy broadcasts row to shape (2,3) by repeating it for each row. Equivalent to np.vstack([row, row]) but without creating a copy." },
          { line: '(X - col_mean) / col_std', explanation: 'col_mean has shape (3,). X has shape (5,3). Broadcasting subtracts each feature mean from all 5 rows, then divides by each feature std. This is StandardScaler!' },
          { line: 'a[:, np.newaxis] * b[np.newaxis, :]', explanation: 'a[:, np.newaxis] reshapes a to (3,1). Broadcasting with b of shape (3,) creates an outer product matrix of shape (3,3).' }
        ]
      },
      examNotes: {
        examNotes: [
        'Broadcasting rules: align shapes right, prepend 1s, stretch size-1 dims',
        'keepdims=True: preserves dimension for proper broadcasting after aggregation',
        'np.newaxis = None: adds a new axis (shape 1) for broadcasting',
        'Outer product: a[:,np.newaxis] * b[np.newaxis,:] creates (n,m) matrix',
        'Standardization = (X - mean) / std — classic broadcasting example'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What shape does numpy produce for arr (5,3) + vec (3,)?', options: ['Error — incompatible shapes', '(5,3)', '(3,)', '(5,)'], correctIndex: 1, explanation: 'Broadcasting aligns from the right: (5,3) and (3,) → (5,3) and (1,3) → (5,3). The vector is broadcast (repeated) across all 5 rows.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'How would you normalize all rows of a matrix to unit length using NumPy?', answer: "norms = np.linalg.norm(X, axis=1, keepdims=True) — computes L2 norm of each row. X_normalized = X / norms — divides each row by its norm using broadcasting. keepdims=True keeps shape (n,1) instead of (n,) so broadcasting works correctly.", difficulty: 'Mid', category: 'Coding' }
    ]
  }
,
{
    "id": "array-creation-init",
    "slug": "numpy-array-creation-routines",
    "title": "Array Creation & Initialization Routines",
    "description": "Explore NumPy's extensive functions for efficiently creating and initializing arrays with specific values, ranges, or random data.",
    "difficulty": "Beginner",
    "estimatedMinutes": 45,
    "tags": [
      "numpy",
      "array creation",
      "initialization",
      "zeros",
      "ones",
      "arange",
      "linspace",
      "random"
    ],
    "sections": {
      "what": {
        "text": "Beyond simply converting Python lists, NumPy provides a rich set of functions to create arrays directly and efficiently. These routines are optimized for performance and are fundamental for setting up data structures in scientific computing and data analysis. Common methods include `np.zeros` and `np.ones` for creating arrays filled with zeros or ones, respectively, which are useful for initializing data containers or masks. `np.empty` creates an array without initializing its entries, making it faster for cases where elements will be immediately overwritten.\n\nFor creating sequences, `np.arange` is similar to Python's `range` but returns a NumPy array, while `np.linspace` generates evenly spaced numbers over a specified interval, which is crucial for plotting or sampling functions. `np.logspace` does the same but with logarithmically spaced numbers. The `numpy.random` module offers a powerful suite of functions to generate arrays filled with random numbers drawn from various statistical distributions, essential for simulations, statistical modeling, and machine learning initialization. Understanding these creation routines is key to writing concise, efficient, and readable NumPy code.",
        "eli5": "It's like having magic buttons to quickly make specific kinds of number lists (arrays) – like a list full of only zeros, or ones, or numbers counting up, or numbers spread out evenly, or even totally random numbers – without having to type out every single number yourself!",
        "points": [
          "`np.zeros()`, `np.ones()`, `np.empty()`: For arrays filled with 0s, 1s, or uninitialized data.",
          "`np.full()`: For arrays filled with any specified constant value.",
          "`np.arange()`: For generating sequences with a step value (like Python's `range`).",
          "`np.linspace()`, `np.logspace()`: For generating evenly or logarithmically spaced numbers over an interval.",
          "`numpy.random` module: For creating arrays with random numbers from various distributions."
        ]
      },
      "code": {
        "code": "# Create an array of zeros with shape (2, 3)\nimport numpy as np\nzeros_array = np.zeros((2, 3))\nprint(f\"Zeros Array:\\n{zeros_array}\\n\")\n\n# Create an array of ones with shape (3, 2) and a specific dtype\nones_array = np.ones((3, 2), dtype=np.int32)\nprint(f\"Ones Array (int32):\\n{ones_array}\\n\")\n\n# Create an array with a range of numbers\nrange_array = np.arange(0, 10, 2) # Start, Stop (exclusive), Step\nprint(f\"Arange Array:\\n{range_array}\\n\")\n\n# Create an array with 5 evenly spaced numbers between 0 and 1\nlinspace_array = np.linspace(0, 1, 5)\nprint(f\"Linspace Array:\\n{linspace_array}\\n\")\n\n# Create a 2x2 array of random floats between 0 and 1\nrandom_array = np.random.rand(2, 2)\nprint(f\"Random Array:\\n{random_array}\\n\")\n\n# Create a 2x3 array filled with the number 7\nfull_array = np.full((2, 3), 7)\nprint(f\"Full Array:\\n{full_array}\\n\")",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library, aliasing it as 'np'."
          },
          {
            "line": "zeros_array = np.zeros((2, 3))",
            "explanation": "Creates a 2x3 array with all elements initialized to 0.0 (float by default)."
          },
          {
            "line": "ones_array = np.ones((3, 2), dtype=np.int32)",
            "explanation": "Creates a 3x2 array with all elements initialized to 1, explicitly setting the data type to 32-bit integer."
          },
          {
            "line": "range_array = np.arange(0, 10, 2)",
            "explanation": "Creates a 1D array starting from 0, up to (but not including) 10, with a step of 2 (i.e., [0, 2, 4, 6, 8])."
          },
          {
            "line": "linspace_array = np.linspace(0, 1, 5)",
            "explanation": "Creates a 1D array with 5 equally spaced numbers between 0 and 1 (inclusive) (i.e., [0.0, 0.25, 0.5, 0.75, 1.0])."
          },
          {
            "line": "random_array = np.random.rand(2, 2)",
            "explanation": "Creates a 2x2 array of random floats uniformly distributed between 0 and 1."
          },
          {
            "line": "full_array = np.full((2, 3), 7)",
            "explanation": "Creates a 2x3 array where all elements are initialized to the value 7."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`np.empty()` is fastest for creating arrays but contains arbitrary memory remnants.",
          "`np.arange()`'s stop value is exclusive; `np.linspace()`'s stop value is inclusive by default.",
          "The `dtype` argument is common across many creation functions to control data type.",
          "Random number generation should typically use `np.random.default_rng()` for modern, robust methods."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which NumPy function creates an array of a specified shape filled with a single constant value?",
            "options": [
              "np.zeros()",
              "np.ones()",
              "np.full()",
              "np.empty()"
            ],
            "correctIndex": 2,
            "explanation": "`np.full(shape, fill_value)` is designed to create an array with all elements set to `fill_value`."
          },
          {
            "question": "What is a key difference between `np.arange(0, 5, 1)` and `np.linspace(0, 4, 5)`?",
            "options": [
              "One includes the stop value, the other doesn't.",
              "They produce identical arrays.",
              "`arange` only works with integers, `linspace` with floats.",
              "`linspace` is always faster."
            ],
            "correctIndex": 0,
            "explanation": "`np.arange` excludes the stop value (5), producing `[0, 1, 2, 3, 4]`. `np.linspace` includes both start (0) and stop (4), producing `[0.0, 1.0, 2.0, 3.0, 4.0]` when 5 elements are requested."
          },
          {
            "question": "When would you prefer using `np.empty()` over `np.zeros()` or `np.ones()`?",
            "options": [
              "When you need an array with all elements set to zero.",
              "When you need to initialize an array with random values.",
              "When performance is critical and you immediately plan to overwrite all array elements.",
              "When you want an array filled with floating-point numbers."
            ],
            "correctIndex": 2,
            "explanation": "`np.empty()` avoids the overhead of initializing elements, making it faster, but it leaves uninitialized (garbage) values. It's suitable when you're sure you'll overwrite every element."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `np.arange()` and `np.linspace()`. When would you use one over the other?",
        "answer": "`np.arange(start, stop, step)` generates a sequence of numbers with a specified `step` size. The `stop` value is exclusive. It's best when you need a sequence with a fixed increment, often for integers or clearly defined floating-point steps. `np.linspace(start, stop, num)` generates a specified `num` of evenly spaced numbers over a given interval, including both `start` and `stop` values. It's ideal when you need a specific number of samples between two points, regardless of the precise step size, commonly used in plotting or function evaluation. For example, `arange(0, 10, 2)` gives `[0, 2, 4, 6, 8]`, while `linspace(0, 8, 5)` gives `[0.0, 2.0, 4.0, 6.0, 8.0]`.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You need to create a large array that will eventually hold computed values, but you don't want to waste time initializing it. Which NumPy function would you use and why?",
        "answer": "I would use `np.empty(shape, dtype)`. The `np.empty()` function allocates memory for the array but does not initialize its elements. This makes it the fastest way to create a new array because it avoids the overhead of writing zeros or ones to memory. Since the values will be immediately overwritten by computed results, the initial garbage values are not an issue, making `np.empty()` the most efficient choice for this scenario.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "array-manipulation",
    "slug": "numpy-array-manipulation",
    "title": "Array Manipulation: Reshaping, Stacking, Splitting & Transposing",
    "description": "Learn to change the shape, dimensions, and arrangement of NumPy arrays using powerful functions like reshape, stack, split, and transpose.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "numpy",
      "reshape",
      "stack",
      "split",
      "transpose",
      "array manipulation"
    ],
    "sections": {
      "what": {
        "text": "NumPy arrays are highly flexible, and a crucial aspect of working with them involves manipulating their structure. This includes changing their shape (`reshape`), combining them (`stack`, `concatenate`), breaking them apart (`split`), and reorienting their axes (`transpose`). Reshaping an array allows you to interpret the same data with a different dimensional structure, which is vital for preparing data for various algorithms or matching expected input formats. For instance, a 1D array can be reshaped into a 2D matrix.\n\nStacking and concatenating operations are used to join multiple arrays into a single, larger array along different axes. `np.concatenate` is a general-purpose function for joining arrays along an existing axis, while `np.stack` creates a new axis when joining arrays. `np.vstack`, `np.hstack`, and `np.dstack` are convenient wrappers for common stacking operations along specific axes. Conversely, `np.split` (and its specialized versions like `np.hsplit`, `np.vsplit`) allows you to divide an array into multiple smaller arrays. Transposing an array (`.T` attribute or `np.transpose()`) flips its axes, which is fundamental in linear algebra (e.g., converting row vectors to column vectors or vice versa) and data preparation, changing rows to columns and columns to rows. These manipulation techniques are indispensable for data preprocessing, feature engineering, and efficiently solving complex numerical problems.",
        "eli5": "Imagine you have a box of Lego bricks, but you've built them into a long line. Array manipulation is like taking that line and turning it into a flat wall, or joining it with another wall to make a bigger wall, or even splitting a big wall into smaller pieces. It's all about changing how your Lego bricks are arranged without changing what the individual bricks are.",
        "points": [
          "`reshape()`: Changes the dimensions of an array without changing its data.",
          "`transpose()`/`.T`: Swaps the axes of an array (rows become columns, etc.).",
          "`concatenate()`: Joins arrays along an existing axis.",
          "`stack()`: Joins arrays along a *new* axis.",
          "`vstack()`, `hstack()`, `dstack()`: Convenience functions for stacking along specific axes.",
          "`split()`, `hsplit()`, `vsplit()`: Divides an array into multiple sub-arrays."
        ]
      },
      "code": {
        "code": "import numpy as np\n\n# Create a 1D array\narr_1d = np.arange(12)\nprint(f\"Original 1D array:\\n{arr_1d}\\n\")\n\n# Reshape to a 3x4 2D array\narr_2d_reshaped = arr_1d.reshape(3, 4)\nprint(f\"Reshaped to 3x4:\\n{arr_2d_reshaped}\\n\")\n\n# Transpose the 2D array\narr_2d_transposed = arr_2d_reshaped.T\nprint(f\"Transposed 2D array:\\n{arr_2d_transposed}\\n\")\n\n# Create two 2x3 arrays for stacking\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([[7, 8, 9], [10, 11, 12]])\nprint(f\"\\nArray A:\\n{a}\")\nprint(f\"Array B:\\n{b}\\n\")\n\n# Stack vertically (row-wise)\nv_stacked = np.vstack((a, b))\nprint(f\"Vertically Stacked:\\n{v_stacked}\\n\")\n\n# Stack horizontally (column-wise)\nh_stacked = np.hstack((a, b))\nprint(f\"Horizontally Stacked:\\n{h_stacked}\\n\")\n\n# Split the h_stacked array back into two arrays horizontally\nsplit_arrays = np.hsplit(h_stacked, 2)\nprint(f\"Split Arrays (first part):\\n{split_arrays[0]}\\n\")\nprint(f\"Split Arrays (second part):\\n{split_arrays[1]}\\n\")",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "arr_1d = np.arange(12)",
            "explanation": "Creates a 1D array containing numbers from 0 to 11."
          },
          {
            "line": "arr_2d_reshaped = arr_1d.reshape(3, 4)",
            "explanation": "Transforms the 1D array into a 2D array with 3 rows and 4 columns. This creates a view."
          },
          {
            "line": "arr_2d_transposed = arr_2d_reshaped.T",
            "explanation": "Swaps the rows and columns of `arr_2d_reshaped`. This is a view."
          },
          {
            "line": "a = np.array([[1, 2, 3], [4, 5, 6]])",
            "explanation": "Creates a 2x3 array 'a'."
          },
          {
            "line": "b = np.array([[7, 8, 9], [10, 11, 12]])",
            "explanation": "Creates another 2x3 array 'b'."
          },
          {
            "line": "v_stacked = np.vstack((a, b))",
            "explanation": "Stacks arrays 'a' and 'b' vertically (row-wise), resulting in a 4x3 array."
          },
          {
            "line": "h_stacked = np.hstack((a, b))",
            "explanation": "Stacks arrays 'a' and 'b' horizontally (column-wise), resulting in a 2x6 array."
          },
          {
            "line": "split_arrays = np.hsplit(h_stacked, 2)",
            "explanation": "Splits `h_stacked` into 2 arrays horizontally (along the columns). Returns a list of arrays."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`reshape()` creates a view if possible, otherwise a copy. `flatten()` always returns a copy, while `ravel()` returns a view if possible.",
          "The `transpose()` method (`.T`) always returns a view.",
          "`np.concatenate()` requires arrays to have the same shape along all axes *except* the concatenation axis.",
          "`np.stack()` requires arrays to have the exact same shape, but creates a new axis."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "If `arr = np.arange(6).reshape(2, 3)`, what is the shape of `arr.T`?",
            "options": [
              "(2, 3)",
              "(3, 2)",
              "(6,)",
              "(1, 6)"
            ],
            "correctIndex": 1,
            "explanation": "Transposing an array swaps its dimensions. A (2, 3) array becomes a (3, 2) array."
          },
          {
            "question": "Which function would you use to combine two 1D arrays `[1,2,3]` and `[4,5,6]` into a single 2D array `[[1,2,3], [4,5,6]]`?",
            "options": [
              "np.hstack()",
              "np.concatenate()",
              "np.vstack()",
              "np.dstack()"
            ],
            "correctIndex": 2,
            "explanation": "`np.vstack()` (vertical stack) is designed for this, turning 1D arrays into rows of a 2D array. `np.concatenate([a, b], axis=0)` would also work."
          },
          {
            "question": "What is a key difference between `arr.reshape()` and `arr.resize()`?",
            "options": [
              "`reshape()` modifies the array in-place, `resize()` returns a new array.",
              "`resize()` can change the total number of elements, `reshape()` cannot.",
              "`reshape()` is only for 1D arrays, `resize()` for multi-dimensional.",
              "There is no difference; they are aliases."
            ],
            "correctIndex": 1,
            "explanation": "`reshape()` returns a new array (or a view) with the new shape but the same total number of elements. `resize()` can change the total number of elements, potentially truncating or padding with zeros, and modifies the array in-place (or returns None)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "You have a list of images, each represented as a 2D NumPy array. How would you combine them into a single 3D array where the first dimension represents the image index?",
        "answer": "If all image arrays have the same shape (e.g., `(height, width)`), I would use `np.stack()`. For example, if `image_list` contains `[img1, img2, img3]`, I'd use `np.stack(image_list, axis=0)`. This would create a new axis at the beginning, resulting in an array of shape `(num_images, height, width)`. `np.concatenate()` would not work directly for this purpose as it joins along *existing* axes, requiring images to already have a 'depth' dimension.",
        "difficulty": "Mid",
        "category": "Coding"
      },
      {
        "question": "Explain the concept of 'view' vs. 'copy' in NumPy array manipulation, particularly in the context of `reshape` and slicing.",
        "answer": "In NumPy, operations can return either a 'view' or a 'copy' of an array. A 'view' is a new array object that refers to the same data in memory as the original array. Changes to the view *will* affect the original array, and vice-versa. Slicing an array (e.g., `arr[1:5]`) typically returns a view. `reshape()` often returns a view if the new shape can be represented by the same data layout without reordering. A 'copy', on the other hand, is a completely new array with its own independent data in memory. Changes to a copy will *not* affect the original array. Functions like `arr.copy()` or `arr.flatten()` explicitly create copies. Understanding this distinction is crucial to avoid unintended side effects and manage memory efficiently.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "ufuncs-deep-dive",
    "slug": "numpy-ufuncs-deep-dive",
    "title": "Universal Functions (ufuncs) Deep Dive",
    "description": "Go beyond basic vectorized operations by exploring the full capabilities of NumPy's Universal Functions (ufuncs), including their special methods like reduce, accumulate, and outer.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "numpy",
      "ufuncs",
      "vectorization",
      "reduce",
      "accumulate",
      "outer",
      "performance"
    ],
    "sections": {
      "what": {
        "text": "Universal Functions (ufuncs) are the core mechanism behind NumPy's speed and power for element-wise operations. While you might be familiar with using `np.add`, `np.sqrt`, or simple arithmetic operators like `+` and `*` on arrays, ufuncs are more than just these basic functions. They are Python functions written in C (or other compiled languages) that operate on `ndarray` objects element-by-element, supporting array broadcasting, type casting, and offering specific methods.\n\nEach ufunc has properties like `nin` (number of input arguments) and `nout` (number of output arguments). Beyond simple element-wise application, ufuncs provide powerful methods: `reduce()` applies the ufunc cumulatively along an axis (e.g., `np.add.reduce()` calculates a sum). `accumulate()` also applies cumulatively but returns an array of all intermediate results (e.g., a running sum). `outer()` computes the ufunc for all pairs of elements from two input arrays, useful for outer products or building distance matrices. `at()` performs an unbuffered, in-place operation on specific elements, which is useful for 'scatter' operations where multiple indices might point to the same location. Mastering these methods elevates your NumPy skills beyond basic array arithmetic, enabling highly optimized and expressive code for complex data transformations.",
        "eli5": "Think of ufuncs as super-smart calculators in NumPy. Instead of just adding two numbers, they can add two whole lists of numbers at once, super fast. But they have extra special tricks: `reduce` is like telling the calculator, 'Add up ALL these numbers in this list!' `accumulate` is like saying, 'Add them up, but show me the running total after each step.' And `outer` is like asking, 'What happens if I combine every number from this list with every number from that other list using this calculation?' They do these complex jobs much faster than you could with regular Python loops.",
        "points": [
          "Ufuncs are vectorized wrappers around C functions, optimized for element-wise operations.",
          "They support broadcasting, type casting, and operate on `ndarray` elements.",
          "`ufunc.reduce()`: Applies the ufunc cumulatively along an axis (e.g., summation, product).",
          "`ufunc.accumulate()`: Returns an array of the intermediate results of the cumulative application.",
          "`ufunc.outer()`: Computes the ufunc for all pairs of elements from two input arrays.",
          "`ufunc.at()`: Performs unbuffered in-place operations at specified indices."
        ]
      },
      "code": {
        "code": "import numpy as np\n\n# Example of a basic ufunc (np.add)\narr1 = np.array([1, 2, 3])\narr2 = np.array([4, 5, 6])\nresult_add = np.add(arr1, arr2)\nprint(f\"Element-wise add: {result_add}\\n\")\n\n# Using ufunc.reduce() for summation\n# Equivalent to np.sum(data)\ndata = np.array([1, 2, 3, 4, 5])\nsum_reduced = np.add.reduce(data)\nprint(f\"Add.reduce (sum): {sum_reduced}\\n\")\n\n# Using ufunc.accumulate() for running sum\nrunning_sum = np.add.accumulate(data)\nprint(f\"Add.accumulate (running sum): {running_sum}\\n\")\n\n# Using ufunc.outer() for outer product (multiplication)\nvec1 = np.array([1, 2, 3])\nvec2 = np.array([10, 20])\nouter_prod = np.multiply.outer(vec1, vec2)\nprint(f\"Multiply.outer (outer product):\\n{outer_prod}\\n\")\n\n# Using ufunc.at() for 'scatter' operation\n# Increment specific positions in an array\ninitial_array = np.zeros(5)\nindices = np.array([0, 0, 2, 4, 2])\nvalues = np.array([1, 2, 3, 4, 5])\n\nnp.add.at(initial_array, indices, values)\nprint(f\"Array after add.at: {initial_array}\\n\")",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "result_add = np.add(arr1, arr2)",
            "explanation": "Demonstrates a basic ufunc (`np.add`) performing element-wise addition."
          },
          {
            "line": "sum_reduced = np.add.reduce(data)",
            "explanation": "Applies the `add` ufunc cumulatively to all elements in `data`, effectively summing them up. Result: 1+2+3+4+5 = 15."
          },
          {
            "line": "running_sum = np.add.accumulate(data)",
            "explanation": "Applies `add` cumulatively, returning an array of all intermediate sums. Result: `[1, 1+2, 1+2+3, ...]` -> `[1, 3, 6, 10, 15]`."
          },
          {
            "line": "outer_prod = np.multiply.outer(vec1, vec2)",
            "explanation": "Computes the outer product: `vec1[i] * vec2[j]` for all `i, j`. Result: `[[10, 20], [20, 40], [30, 60]]`."
          },
          {
            "line": "initial_array = np.zeros(5)",
            "explanation": "Initializes an array of five zeros."
          },
          {
            "line": "indices = np.array([0, 0, 2, 4, 2])",
            "explanation": "Defines indices where operations will occur."
          },
          {
            "line": "values = np.array([1, 2, 3, 4, 5])",
            "explanation": "Defines values to add at the specified indices."
          },
          {
            "line": "np.add.at(initial_array, indices, values)",
            "explanation": "Adds `values` to `initial_array` at `indices`. Note that index 0 receives `1+2=3` and index 2 receives `3+5=8` because `at` handles multiple identical indices correctly by performing all operations. Result: `[3., 0., 8., 0., 4.]`."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Ufuncs are the underlying mechanism for most vectorized operations in NumPy.",
          "`reduce()` is generally equivalent to methods like `np.sum()`, `np.prod()`, `np.max()`, etc., but offers more general applicability.",
          "`accumulate()` provides a running total/product/etc. and maintains the original array's dimension.",
          "`outer()` is very powerful for creating combination matrices (e.g., distance matrices, pairwise operations).",
          "`at()` is unique for its unbuffered, in-place, 'scatter' type of operation, especially useful for histogramming or aggregation where indices might repeat."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which `ufunc` method would you use to calculate the cumulative sum of an array?",
            "options": [
              "reduce()",
              "outer()",
              "accumulate()",
              "at()"
            ],
            "correctIndex": 2,
            "explanation": "`accumulate()` calculates and returns an array of all intermediate results of the ufunc's operation, like a running total."
          },
          {
            "question": "Given `a = np.array([1, 2])` and `b = np.array([3, 4])`, what would `np.add.outer(a, b)` produce?",
            "options": [
              "[4, 5, 5, 6]",
              "[[4, 5], [5, 6]]",
              "[[3, 4], [6, 8]]",
              "[1, 2, 3, 4, 3, 4]"
            ],
            "correctIndex": 1,
            "explanation": "`outer()` applies the ufunc to every pair of elements. `add.outer(a, b)` means `[[a[0]+b[0], a[0]+b[1]], [a[1]+b[0], a[1]+b[1]]]` which is `[[1+3, 1+4], [2+3, 2+4]]` or `[[4, 5], [5, 6]]`."
          },
          {
            "question": "What is a primary advantage of using `ufuncs` over explicit Python loops for array operations?",
            "options": [
              "They provide better error handling.",
              "They are easier to read and write.",
              "They are implemented in C, offering significant performance improvements.",
              "They automatically handle missing data."
            ],
            "correctIndex": 2,
            "explanation": "Ufuncs are highly optimized functions typically implemented in C, allowing them to process large arrays much faster than Python's interpreted loops."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `ufunc.reduce()` and `ufunc.accumulate()`. Provide an example for each.",
        "answer": "`ufunc.reduce(array, axis=None)` applies the ufunc cumulatively along a specified axis, returning a single reduced value or array. For example, `np.add.reduce(np.array([1, 2, 3]))` would result in `6`. It's equivalent to `np.sum()`, `np.prod()`, etc.\n\n`ufunc.accumulate(array, axis=None)` also applies the ufunc cumulatively along an axis but returns an array of the same shape, containing all intermediate results. For example, `np.add.accumulate(np.array([1, 2, 3]))` would result in `[1, 3, 6]`. It provides a running total, product, etc.\n\nIn essence, `reduce` gives you the final aggregate, while `accumulate` gives you the journey to that aggregate.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You are building a histogram where you need to increment specific bins based on a list of values and their corresponding bin indices. Some indices might appear multiple times. How would you efficiently implement this using NumPy, specifically mentioning a ufunc method?",
        "answer": "I would use `np.add.at()`. This method allows for 'unbuffered' or 'scatter' operations. It performs in-place addition at specified indices without buffering, meaning if multiple indices point to the same location, all corresponding additions will be performed. For example:\n\n```python\nbins = np.zeros(10)\nindices = np.array([1, 3, 1, 5, 3])\nvalues = np.array([10, 20, 5, 30, 15])\n\nnp.add.at(bins, indices, values)\nprint(bins) # Output: [ 0. 15.  0. 35.  0. 30.  0.  0.  0.  0.]\n```\nHere, `bins[1]` correctly gets `10 + 5 = 15`, and `bins[3]` gets `20 + 15 = 35`. This is significantly more efficient than a Python loop for large arrays and handles concurrent updates to the same index correctly.",
        "difficulty": "Senior",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "linear-algebra-linalg",
    "slug": "numpy-linear-algebra-linalg",
    "title": "Linear Algebra with numpy.linalg",
    "description": "Master essential linear algebra operations using NumPy's linalg module, including matrix multiplication, determinants, inverses, and eigenvalue problems.",
    "difficulty": "Advanced",
    "estimatedMinutes": 75,
    "tags": [
      "numpy",
      "linear algebra",
      "matrix",
      "linalg",
      "dot product",
      "determinant",
      "inverse",
      "eigenvalue"
    ],
    "sections": {
      "what": {
        "text": "NumPy's `numpy.linalg` module is a powerful collection of functions for performing linear algebra operations, a cornerstone of many scientific and data-intensive fields like machine learning, statistics, and physics. While basic element-wise arithmetic is handled by ufuncs, `linalg` focuses on operations specific to vectors and matrices.\n\nKey operations include matrix multiplication, which can be done using `np.dot()`, `np.matmul()`, or the `@` operator. It's crucial to understand the subtle differences between these, especially for higher-dimensional arrays. The module also provides functions for calculating the determinant (`np.linalg.det()`), finding the inverse of a matrix (`np.linalg.inv()`), and solving systems of linear equations (`np.linalg.solve()`). These are fundamental for tasks such as regression, optimization, and signal processing.\n\nMore advanced topics involve decomposition methods like eigenvalues and eigenvectors (`np.linalg.eig` for general matrices, `np.linalg.eigh` for Hermitian/symmetric matrices) and singular value decomposition (SVD - `np.linalg.svd`). These decompositions are vital for dimensionality reduction (e.g., PCA), understanding system stability, and numerical analysis. Proficiency in `numpy.linalg` is a prerequisite for understanding and implementing many advanced data science algorithms.",
        "eli5": "If you think of lists of numbers arranged in grids (called matrices), linear algebra is the special math for these grids. `numpy.linalg` is like a super-calculator built just for this 'grid math'. It helps you do things like multiplying grids together, finding special numbers that describe a grid (determinants), finding the 'opposite' of a grid (inverse), or even finding hidden 'directions' and 'strengths' within a grid (eigenvalues and eigenvectors). This is the secret sauce behind many smart computer programs that recognize patterns or make predictions.",
        "points": [
          "`np.dot()`, `np.matmul()`, `@` operator: For various forms of matrix multiplication.",
          "`np.linalg.det()`: Calculates the determinant of a square matrix.",
          "`np.linalg.inv()`: Computes the (multiplicative) inverse of a matrix.",
          "`np.linalg.solve()`: Solves a linear matrix equation (Ax = B).",
          "`np.linalg.eig()` / `np.linalg.eigh()`: Computes eigenvalues and right eigenvectors.",
          "`np.linalg.svd()`: Computes the Singular Value Decomposition (SVD)."
        ]
      },
      "code": {
        "code": "import numpy as np\n\n# Define two matrices\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint(f\"Matrix A:\\n{A}\\n\")\nprint(f\"Matrix B:\\n{B}\\n\")\n\n# Matrix Multiplication (using @ operator)\nC = A @ B\nprint(f\"Matrix A @ B:\\n{C}\\n\")\n\n# Determinant of A\ndet_A = np.linalg.det(A)\nprint(f\"Determinant of A: {det_A:.2f}\\n\")\n\n# Inverse of A\ninv_A = np.linalg.inv(A)\nprint(f\"Inverse of A:\\n{inv_A}\\n\")\n\n# Verify A @ inv(A) is identity matrix\nidentity_check = A @ inv_A\nprint(f\"A @ inv(A) (should be Identity):\\n{np.round(identity_check, 5)}\\n\")\n\n# Solving a linear system: Ax = b\n# Let A = [[3, 1], [1, 2]], b = [9, 8]\ncoeffs = np.array([[3, 1], [1, 2]])\nordinates = np.array([9, 8])\nx = np.linalg.solve(coeffs, ordinates)\nprint(f\"Solution to Ax = b: x = {x}\\n\")\nprint(f\"Verification (coeffs @ x): {coeffs @ x}\\n\")\n\n# Eigenvalues and Eigenvectors of A\neigenvalues, eigenvectors = np.linalg.eig(A)\nprint(f\"Eigenvalues of A: {eigenvalues}\\n\")\nprint(f\"Eigenvectors of A:\\n{eigenvectors}\\n\")",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "A = np.array([[1, 2], [3, 4]])",
            "explanation": "Defines a 2x2 matrix A."
          },
          {
            "line": "B = np.array([[5, 6], [7, 8]])",
            "explanation": "Defines a 2x2 matrix B."
          },
          {
            "line": "C = A @ B",
            "explanation": "Performs matrix multiplication of A and B using the `@` operator (preferred in Python 3.5+)."
          },
          {
            "line": "det_A = np.linalg.det(A)",
            "explanation": "Calculates the determinant of matrix A."
          },
          {
            "line": "inv_A = np.linalg.inv(A)",
            "explanation": "Calculates the inverse of matrix A. This function raises an error if the matrix is singular (determinant is zero)."
          },
          {
            "line": "identity_check = A @ inv_A",
            "explanation": "Multiplies A by its inverse, which should result in an identity matrix. `np.round` is used to handle floating-point inaccuracies."
          },
          {
            "line": "coeffs = np.array([[3, 1], [1, 2]])",
            "explanation": "Defines the coefficient matrix A for the system Ax = b."
          },
          {
            "line": "ordinates = np.array([9, 8])",
            "explanation": "Defines the result vector b for the system Ax = b."
          },
          {
            "line": "x = np.linalg.solve(coeffs, ordinates)",
            "explanation": "Solves the linear system `coeffs @ x = ordinates` for `x`."
          },
          {
            "line": "eigenvalues, eigenvectors = np.linalg.eig(A)",
            "explanation": "Computes the eigenvalues and corresponding right eigenvectors of matrix A. `eigenvalues` is a 1D array, `eigenvectors` is a 2D array where columns are eigenvectors."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`np.dot()` handles both dot products of vectors and matrix multiplication, while `np.matmul()` (`@`) is specifically for matrix products.",
          "A matrix must be square and non-singular (determinant != 0) to have an inverse.",
          "`np.linalg.solve()` is generally more numerically stable and efficient than computing the inverse and multiplying for solving Ax=B.",
          "Eigenvalues/vectors are crucial for PCA, stability analysis, and quantum mechanics.",
          "Pay attention to output shapes: `np.linalg.eig` returns a tuple of (eigenvalues, eigenvectors) where eigenvectors are columns."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which operator is the most straightforward way to perform matrix multiplication in NumPy (Python 3.5+)?",
            "options": [
              "*",
              "/",
              "@",
              "**"
            ],
            "correctIndex": 2,
            "explanation": "The `@` operator (introduced in Python 3.5) is the dedicated operator for matrix multiplication in NumPy, equivalent to `np.matmul()`."
          },
          {
            "question": "If you want to solve a linear system `Ax = b`, what is the most numerically stable and efficient `numpy.linalg` function to use?",
            "options": [
              "np.linalg.inv(A) @ b",
              "np.linalg.solve(A, b)",
              "np.dot(np.linalg.inv(A), b)",
              "np.linalg.det(A)"
            ],
            "correctIndex": 1,
            "explanation": "`np.linalg.solve(A, b)` is specifically designed for solving linear systems and is generally more numerically stable and efficient than explicitly calculating the inverse and multiplying."
          },
          {
            "question": "What is a prerequisite for a matrix to have a valid inverse using `np.linalg.inv()`?",
            "options": [
              "It must be a 1D array.",
              "Its determinant must be zero.",
              "It must be a square matrix with a non-zero determinant.",
              "It must contain only integer values."
            ],
            "correctIndex": 2,
            "explanation": "Only square matrices (same number of rows and columns) that are non-singular (i.e., their determinant is not zero) have an inverse."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `np.dot()` and `np.matmul()` (`@` operator) in NumPy for matrix multiplication.",
        "answer": "`np.dot()` is a general-purpose dot product function. For 2D arrays, it performs matrix multiplication. For 1D arrays, it performs the inner product. For arrays of higher dimensions, `dot` treats them as collections of matrices. \n\n`np.matmul()` (and the `@` operator) is specifically designed for matrix products. It strictly follows matrix multiplication rules, so for 1D arrays, it promotes them to 2D row/column vectors before multiplying. For higher dimensions, `matmul` performs matrix multiplication on the last two dimensions and broadcasts across the others. Generally, `@` or `np.matmul()` is preferred for clear matrix multiplication, especially with N-dimensional arrays.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You have a dataset where each row represents an observation, and each column represents a feature. You want to compute the covariance matrix of these features. How would you approach this using NumPy's linear algebra capabilities?",
        "answer": "NumPy has a dedicated function for this: `np.cov()`. Given a 2D array `X` where rows are variables (features) and columns are observations, `np.cov(X)` calculates the covariance matrix. If, as stated in the question, rows are observations and columns are features, then I'd need to transpose the matrix first or specify `rowvar=False`. So, if `data` is `(num_observations, num_features)`, then `np.cov(data, rowvar=False)` would compute the covariance matrix between features. Alternatively, you can manually calculate it using the formula: `(X - X.mean(axis=0)).T @ (X - X.mean(axis=0)) / (N - 1)`, where `N` is the number of observations. However, `np.cov` is the most direct and numerically stable approach.",
        "difficulty": "Senior",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "numpy-io",
    "slug": "numpy-saving-loading-arrays",
    "title": "Saving and Loading NumPy Arrays (I/O)",
    "description": "Learn how to efficiently save and load NumPy arrays to and from disk using binary (npy, npz) and text formats, ensuring data persistence.",
    "difficulty": "Beginner",
    "estimatedMinutes": 40,
    "tags": [
      "numpy",
      "i/o",
      "save",
      "load",
      "npy",
      "npz",
      "text file",
      "data persistence"
    ],
    "sections": {
      "what": {
        "text": "Data persistence is a crucial aspect of any data science workflow, allowing you to save the results of computations or large datasets for later use without re-processing. NumPy provides several functions specifically designed for efficient input/output (I/O) of `ndarray` objects.\n\nThe most common and recommended way to save a single NumPy array is using `np.save()`, which stores the array in a binary file with the `.npy` extension. This format is highly efficient, preserves array metadata (like dtype and shape), and is platform-agnostic, ensuring accurate reconstruction of the array when loaded with `np.load()`. For saving multiple arrays, `np.savez()` allows you to store several arrays in a single, uncompressed `.npz` file, while `np.savez_compressed()` does the same but compresses the archive, saving disk space.\n\nFor scenarios where you need to share data with other software or want human-readable files, `np.savetxt()` and `np.loadtxt()` are available for saving and loading arrays as plain text files (e.g., CSV). While less efficient and potentially losing dtype information compared to `.npy` format, text files offer maximum interoperability. Understanding when to use each method ensures your data is stored and retrieved effectively and reliably.",
        "eli5": "It's like taking a picture of your number list (NumPy array) and putting it in a special box (`.npy` or `.npz` files) so you can open it later exactly as it was, super fast. Or, you can write the numbers down on a piece of paper (a text file like CSV) for anyone to easily read, even if it takes a little longer to write and read.",
        "points": [
          "`np.save()`: Saves a single array to a binary `.npy` file (recommended for efficiency).",
          "`np.load()`: Loads array(s) from `.npy` or `.npz` files.",
          "`np.savez()`: Saves multiple arrays into a single, uncompressed `.npz` archive.",
          "`np.savez_compressed()`: Saves multiple arrays into a single, *compressed* `.npz` archive.",
          "`np.savetxt()`: Saves a 1D or 2D array to a plain text file (e.g., CSV).",
          "`np.loadtxt()`: Loads data from a plain text file into a NumPy array."
        ]
      },
      "code": {
        "code": "import numpy as np\nimport os\n\n# Create a sample array\narr = np.arange(10).reshape(2, 5)\nprint(f\"Original Array:\\n{arr}\\n\")\n\n# --- Saving and Loading a single array (.npy) ---\nfilename_npy = 'my_array.npy'\nnp.save(filename_npy, arr)\nprint(f\"Saved array to {filename_npy}\")\n\nloaded_arr = np.load(filename_npy)\nprint(f\"Loaded .npy Array:\\n{loaded_arr}\\n\")\n\n# --- Saving and Loading multiple arrays (.npz) ---\narr_b = np.random.rand(3, 3)\nfilename_npz = 'my_arrays.npz'\nnp.savez(filename_npz, array_a=arr, array_b=arr_b)\nprint(f\"Saved multiple arrays to {filename_npz}\")\n\nloaded_npz = np.load(filename_npz)\nprint(f\"Loaded .npz contents (keys): {list(loaded_npz.keys())}\")\nprint(f\"Array A from .npz:\\n{loaded_npz['array_a']}\\n\")\nprint(f\"Array B from .npz:\\n{loaded_npz['array_b']}\\n\")\nloaded_npz.close() # Important to close .npz files\n\n# --- Saving and Loading to/from text files (.txt, .csv) ---\nfilename_txt = 'my_data.txt'\nnp.savetxt(filename_txt, arr, delimiter=',', fmt='%.2f', header='Col1,Col2,Col3,Col4,Col5')\nprint(f\"Saved array to {filename_txt} as text\\n\")\n\nloaded_txt = np.loadtxt(filename_txt, delimiter=',')\nprint(f\"Loaded .txt Array:\\n{loaded_txt}\\n\")\n\n# Clean up created files\nos.remove(filename_npy)\nos.remove(filename_npz)\nos.remove(filename_txt)\nprint(\"Cleaned up temporary files.\")",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "import os",
            "explanation": "Imports the os module for file system operations (like cleanup)."
          },
          {
            "line": "arr = np.arange(10).reshape(2, 5)",
            "explanation": "Creates a 2x5 sample array."
          },
          {
            "line": "np.save(filename_npy, arr)",
            "explanation": "Saves the `arr` array to 'my_array.npy' in NumPy's binary format."
          },
          {
            "line": "loaded_arr = np.load(filename_npy)",
            "explanation": "Loads the array from 'my_array.npy' back into a NumPy array."
          },
          {
            "line": "arr_b = np.random.rand(3, 3)",
            "explanation": "Creates another sample array for multiple saving."
          },
          {
            "line": "np.savez(filename_npz, array_a=arr, array_b=arr_b)",
            "explanation": "Saves both `arr` and `arr_b` into 'my_arrays.npz'. The arrays are stored with the keys 'array_a' and 'array_b'."
          },
          {
            "line": "loaded_npz = np.load(filename_npz)",
            "explanation": "Loads the `.npz` archive. It returns a dictionary-like object."
          },
          {
            "line": "print(f\"Loaded .npz contents (keys): {list(loaded_npz.keys())}\")",
            "explanation": "Prints the keys available in the loaded `.npz` archive."
          },
          {
            "line": "print(f\"Array A from .npz:\\n{loaded_npz['array_a']}\\n\")",
            "explanation": "Accesses and prints 'array_a' from the loaded `.npz` archive."
          },
          {
            "line": "loaded_npz.close()",
            "explanation": "It's good practice to close the `.npz` file handle when done."
          },
          {
            "line": "np.savetxt(filename_txt, arr, delimiter=',', fmt='%.2f', header='...')",
            "explanation": "Saves `arr` to 'my_data.txt' as a comma-separated text file, formatting floats to 2 decimal places and adding a header."
          },
          {
            "line": "loaded_txt = np.loadtxt(filename_txt, delimiter=',')",
            "explanation": "Loads data from 'my_data.txt', assuming comma-separated values."
          },
          {
            "line": "os.remove(filename_npy)",
            "explanation": "Deletes the 'my_array.npy' file."
          },
          {
            "line": "os.remove(filename_npz)",
            "explanation": "Deletes the 'my_arrays.npz' file."
          },
          {
            "line": "os.remove(filename_txt)",
            "explanation": "Deletes the 'my_data.txt' file."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`.npy` files are the most efficient for single NumPy arrays, preserving `dtype` and `shape`.",
          "`.npz` files (from `np.savez` or `np.savez_compressed`) are for saving multiple arrays in one archive.",
          "When loading from `.npz` with `np.load()`, it returns a dictionary-like object; arrays are accessed by their keys (`loaded_npz['key_name']`). Remember to close the `NpzFile` object.",
          "`np.savetxt()` and `np.loadtxt()` are for human-readable text formats but are less efficient and may require specifying `delimiter` and `dtype`.",
          "The `header`, `footer`, and `comments` arguments in `np.savetxt()` are useful for adding metadata to text files."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which NumPy function is best suited for saving a single `ndarray` to disk in a binary format that preserves its data type and shape?",
            "options": [
              "np.savetxt()",
              "np.savez()",
              "np.save()",
              "np.tofile()"
            ],
            "correctIndex": 2,
            "explanation": "`np.save()` saves a single array in the `.npy` format, which is NumPy's native binary format and preserves metadata."
          },
          {
            "question": "You have three different NumPy arrays (`arr1`, `arr2`, `arr3`) that you want to save into a single file. Which function should you use?",
            "options": [
              "np.save()",
              "np.savetxt()",
              "np.savez_compressed()",
              "np.stack()"
            ],
            "correctIndex": 2,
            "explanation": "`np.savez()` and `np.savez_compressed()` are designed for saving multiple NumPy arrays into a single `.npz` archive. `_compressed` is usually preferred for space saving."
          },
          {
            "question": "What is a main disadvantage of using `np.savetxt()` compared to `np.save()` for storing large NumPy arrays?",
            "options": [
              "It cannot save 2D arrays.",
              "It is less compatible with other software.",
              "It is significantly slower and generates larger files.",
              "It does not allow specifying a delimiter."
            ],
            "correctIndex": 2,
            "explanation": "Text files (like those created by `np.savetxt()`) are human-readable but are less efficient in terms of disk space and I/O speed compared to NumPy's native binary formats (`.npy`, `.npz`)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you choose to save NumPy arrays using `np.save()` (to `.npy` files) versus `np.savetxt()` (to text files)? What are the trade-offs?",
        "answer": "I would choose `np.save()` for `.npy` files when:\n1.  **Efficiency and Performance:** Storing and loading are significantly faster as it's a binary format.\n2.  **Fidelity:** It perfectly preserves the `dtype`, `shape`, and other metadata of the array.\n3.  **Large Datasets:** Ideal for large arrays where performance and disk space (over text files) are critical.\n4.  **NumPy-specific Workflows:** When the data will primarily be used within NumPy or other Python libraries that can read `.npy` files.\n\nI would choose `np.savetxt()` for text files when:\n1.  **Interoperability:** The data needs to be easily read by other software or programming languages (e.g., R, Excel, custom C++ programs) that don't have NumPy installed.\n2.  **Human Readability:** The data needs to be inspected or edited manually with a text editor.\n3.  **Small Datasets:** For small arrays where the overhead is negligible and human readability is prioritized.\n\nThe trade-offs are primarily performance and fidelity versus interoperability and human readability. `.npy` files are fast and faithful but less universally readable, while text files are slow and may lose `dtype` info but are widely compatible.",
        "difficulty": "Mid",
        "category": "Coding"
      },
      {
        "question": "You have several NumPy arrays that represent different features of a dataset, and you want to save them together in a single file for easy loading later. How would you do this, and how would you retrieve them?",
        "answer": "I would use `np.savez()` or `np.savez_compressed()`. Both functions allow saving multiple arrays into a single `.npz` archive. `np.savez_compressed()` is usually preferred for large datasets to save disk space.\n\nTo save, I would pass the arrays as keyword arguments:\n```python\nimport numpy as np\narr1 = np.array([1, 2, 3])\narr2 = np.array([[4, 5], [6, 7]])\nnp.savez('my_data.npz', feature_a=arr1, feature_b=arr2)\n```\nTo load, I would use `np.load()`:\n```python\nloaded_data = np.load('my_data.npz')\n```\n`loaded_data` will be a dictionary-like object. I can then retrieve the individual arrays using their keyword names:\n```python\narray_a = loaded_data['feature_a']\narray_b = loaded_data['feature_b']\nprint(loaded_data.files) # To see the keys/names of saved arrays\nloaded_data.close() # Important to close the file handle\n```\nThis approach keeps related data organized in a single file and ensures that all array metadata is preserved.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "structured-arrays",
    "slug": "structured-arrays-record-arrays",
    "title": "Structured Arrays and Record Arrays",
    "description": "Learn to create and manipulate NumPy arrays with heterogeneous data types, mimicking tabular data or C structs using structured dtypes. This module covers defining custom dtypes and accessing fields.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "ndarray",
      "data types",
      "tabular data",
      "heterogeneous data",
      "dtype"
    ],
    "sections": {
      "what": {
        "text": "NumPy's `ndarray` is typically homogeneous, meaning all elements must be of the same data type. However, for certain use cases, such as handling tabular data with mixed types (like a database row) or interfacing with C structures, NumPy provides structured arrays. These arrays allow you to define a composite data type (a `dtype`) where each element is a 'record' composed of multiple named fields, each with its own data type. This enables storing diverse information, like a person's 'name' (string), 'age' (integer), and 'height' (float), within a single array element. You can define these structured dtypes using a list of tuples (name, type) or a dictionary. Accessing fields is done using dictionary-like key access (e.g., `arr['field_name']`). Record arrays (`np.recarray`) provide an alternative syntax for accessing fields using dot notation (e.g., `arr.field_name`), which can be more convenient but might incur a slight performance overhead.",
        "eli5": "Imagine you have a list of students, and for each student, you want to store their name (text) and their age (a number). A regular NumPy array would only let you store all names OR all ages. A structured array is like having a special 'student' box, where inside each box you have a small space for 'name' and another small space for 'age'. You can then have many 'student' boxes lined up, all in one big NumPy array.",
        "points": [
          "Structured arrays allow heterogeneous data types within a single array element (record).",
          "Dtypes for structured arrays are defined using lists of tuples or dictionaries mapping field names to types.",
          "Fields can be accessed using string keys (e.g., `my_array['field_name']`) or, for `np.recarray`, with dot notation (`my_recarray.field_name`).",
          "Useful for representing tabular data, fixed-format data, or for interoperability with C/Fortran structures.",
          "Individual fields can be treated as regular NumPy arrays, allowing vectorized operations on specific columns of data."
        ]
      },
      "code": {
        "code": "import numpy as np\n\n# Define a structured dtype for a 'person'\nperson_dtype = np.dtype([('name', 'S10'), ('age', 'i4'), ('height', 'f4')])\n\n# Create a structured array\ndata = np.array([\n    ('Alice', 30, 1.65),\n    ('Bob', 24, 1.80),\n    ('Charlie', 35, 1.75)\n], dtype=person_dtype)\n\nprint(\"Original Structured Array:\\n\", data)\nprint(\"\\nAccessing 'name' field:\\n\", data['name'])\nprint(\"\\nAccessing 'age' field for the second person:\\n\", data[1]['age'])\n\n# Performing an operation on a field (e.g., finding average height)\nprint(\"\\nAverage height:\", data['height'].mean())\n\n# Create a Record Array for dot notation access\nrec_data = data.view(np.recarray)\nprint(\"\\nRecord Array (view of original):\\n\", rec_data)\nprint(\"\\nAccessing 'name' field via dot notation:\\n\", rec_data.name)\nprint(\"\\nIs 'rec_data' a view of 'data'?\", rec_data.base is data)\n",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "person_dtype = np.dtype([('name', 'S10'), ('age', 'i4'), ('height', 'f4')])",
            "explanation": "Defines a custom data type (dtype) named 'person_dtype'. It has three fields: 'name' (string of max 10 chars), 'age' (4-byte integer), and 'height' (4-byte float)."
          },
          {
            "line": "data = np.array([...], dtype=person_dtype)",
            "explanation": "Creates a NumPy array using the defined 'person_dtype'. Each element in the array is a 'record' that matches this structure."
          },
          {
            "line": "print(\"\\nAccessing 'name' field:\\n\", data['name'])",
            "explanation": "Shows how to access all values in the 'name' field using dictionary-like key access. This returns a regular NumPy array of names."
          },
          {
            "line": "print(\"\\nAccessing 'age' field for the second person:\\n\", data[1]['age'])",
            "explanation": "Accesses the 'age' field of the second record (index 1) in the array."
          },
          {
            "line": "print(\"\\nAverage height:\", data['height'].mean())",
            "explanation": "Demonstrates performing a vectorized operation (mean) directly on the 'height' field, which behaves like a regular NumPy array."
          },
          {
            "line": "rec_data = data.view(np.recarray)",
            "explanation": "Creates a 'record array' view of the original structured array. A view shares memory with the original array, so changes to `rec_data` would affect `data` and vice-versa (for non-object dtypes)."
          },
          {
            "line": "print(\"\\nAccessing 'name' field via dot notation:\\n\", rec_data.name)",
            "explanation": "Accesses the 'name' field using convenient dot notation, which is specific to `np.recarray` objects."
          },
          {
            "line": "print(\"\\nIs 'rec_data' a view of 'data'?\", rec_data.base is data)",
            "explanation": "Confirms that `rec_data` is a view of `data` by checking its `base` attribute."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Structured dtypes are defined using `np.dtype()` with a list of (name, type) tuples or a dictionary.",
          "Access fields using bracket notation: `array['field_name']`.",
          "`np.recarray` provides dot notation access (`array.field_name`) but is typically a view on a structured array.",
          "Operations on a specific field (`array['field_name'].mean()`) are vectorized and efficient.",
          "Structured arrays are distinct from Pandas DataFrames but serve a similar purpose for heterogeneous data in a NumPy-native way."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following `dtype` definitions correctly creates a structured array field for 'price' (float) and 'quantity' (integer)?",
            "options": [
              "A) `[('price', 'f8'), ('quantity', 'i8')]`",
              "B) `{'price': float, 'quantity': int}`",
              "C) `np.dtype(price='f8', quantity='i8')`",
              "D) `('price', float), ('quantity', int)`"
            ],
            "correctIndex": 0,
            "explanation": "Option A uses the correct list of tuples format for defining fields in a structured dtype. Options B and D are not valid `dtype` formats, and Option C's syntax is incorrect for this purpose."
          },
          {
            "question": "Given a structured array `inventory = np.array([('apple', 1.5, 100)], dtype=[('item', 'U10'), ('price', 'f4'), ('stock', 'i4')])`, how would you access the 'stock' value of the first item?",
            "options": [
              "A) `inventory.stock[0]`",
              "B) `inventory[0].stock`",
              "C) `inventory['stock'][0]`",
              "D) `inventory[0, 'stock']`"
            ],
            "correctIndex": 2,
            "explanation": "While `inventory.stock` might work if it's a `recarray`, the most general and reliable way to access a field and then an element is `inventory['stock'][0]`. `inventory[0]['stock']` also works but extracts the record first, then the field. `inventory['stock'][0]` is more efficient as it extracts the entire 'stock' column as a 1D array first, then the first element."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "When would you choose to use a NumPy structured array instead of a regular homogeneous NumPy array or a Pandas DataFrame?",
        "answer": "You would use a structured array when you need to store heterogeneous data (like different data types for different columns in a table) within a single NumPy array, but you don't need the full feature set and overhead of a Pandas DataFrame. It's particularly useful for fixed-format data (e.g., CSV, binary files), memory-efficient storage, or when interfacing with C/Fortran code that uses structs. For very large datasets where Pandas might consume too much memory or for direct integration into low-level numerical algorithms, structured arrays can be more efficient than DataFrames, especially if column-wise operations are frequent.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Explain the difference between a structured array created with `np.array(..., dtype=...)` and a `np.recarray`. When might you prefer one over the other?",
        "answer": "A structured array (e.g., `data = np.array(..., dtype=custom_dtype)`) allows field access using dictionary-like string indexing (`data['field_name']`). A `np.recarray` is a specialized subclass of `ndarray` that provides the convenience of dot-notation access (`rec_data.field_name`). Typically, a `np.recarray` is created as a view of an existing structured array (e.g., `data.view(np.recarray)`). You might prefer a regular structured array when memory efficiency and strict NumPy-native behavior are paramount, or if you prefer explicit string indexing. `np.recarray` is preferred for convenience and readability due to dot-notation, especially for interactive use, though it might introduce a slight performance overhead for very high-frequency access due to the underlying object access mechanisms.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "numpy-views-copies",
    "slug": "memory-management-views-vs-copies",
    "title": "Memory Management: Understanding Views vs. Copies",
    "description": "Dive into how NumPy manages memory with array operations, distinguishing between views (references to original data) and copies (new data allocations) to optimize performance and prevent unintended side effects.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "memory management",
      "performance",
      "ndarray",
      "slicing",
      "deep copy",
      "shallow copy"
    ],
    "sections": {
      "what": {
        "text": "Understanding how NumPy handles memory is crucial for both performance optimization and avoiding subtle bugs. When you perform operations on NumPy arrays, the result can either be a 'view' or a 'copy' of the original data. A 'view' is essentially a new array object that refers to the *same data buffer* as the original array. This means modifications to the view will directly affect the original array, and vice versa. Views are highly efficient as they avoid data duplication. Operations like basic slicing (`arr[1:5]`) typically return views. \n\nConversely, a 'copy' creates an entirely new array object with its own independent data buffer. Modifications to a copy will *not* affect the original array. Operations like fancy indexing (`arr[[1, 3, 5]]`), explicit calls to `arr.copy()`, or some vectorized operations with complex intermediate results will return copies. The `base` attribute of an `ndarray` can tell you if an array is a view (its `base` will refer to the original array) or a copy (its `base` will be `None`). Being aware of when views versus copies are returned is critical to prevent unintended data corruption or unexpected memory usage.",
        "eli5": "Imagine you have a big LEGO spaceship. A 'view' is like pointing to a specific part of the spaceship (like the wing) and calling it 'Wing A'. If you add a new brick to 'Wing A', you're actually adding it to the original spaceship. A 'copy' is like building an entirely new, identical wing. If you add a brick to this new copy, the original spaceship's wing doesn't change.",
        "points": [
          "A 'view' is a new array object that shares the same underlying data buffer with the original array.",
          "Modifying a view *will* modify the original array.",
          "Basic slicing (`arr[start:end]`) usually returns a view for efficiency.",
          "A 'copy' is an entirely new array object with its own independent data buffer.",
          "Modifying a copy *will not* modify the original array.",
          "Fancy indexing (`arr[[indices]]`) and explicit `arr.copy()` calls create copies.",
          "The `arr.base` attribute can be used to check if an array is a view (`arr.base` is not `None`) or a copy (`arr.base` is `None`)."
        ]
      },
      "code": {
        "code": "import numpy as np\n\n# --- Example 1: Slicing (View) ---\noriginal_array = np.arange(10)\nprint(\"Original Array:\\n\", original_array)\n\n# Create a slice (often a view)\nview_array = original_array[2:6]\nprint(\"View Array (slice):\\n\", view_array)\n\n# Check if it's a view using .base\nprint(\"Is view_array a view of original_array?\", view_array.base is original_array)\n\n# Modify the view\nview_array[0] = 99\nprint(\"\\nView Array after modification:\\n\", view_array)\nprint(\"Original Array after view modification:\\n\", original_array) # Original is changed!\n\n# --- Example 2: Explicit Copy ---\ncopy_array = original_array.copy()\nprint(\"\\nOriginal Array before copy modification:\\n\", original_array)\nprint(\"Copy Array (explicit copy):\\n\", copy_array)\n\n# Check if it's a view (should be None)\nprint(\"Is copy_array a view?\", copy_array.base is None)\n\n# Modify the copy\ncopy_array[0] = 1000\nprint(\"\\nCopy Array after modification:\\n\", copy_array)\nprint(\"Original Array after copy modification:\\n\", original_array) # Original is NOT changed!\n\n# --- Example 3: Fancy Indexing (Copy) ---\noriginal_fancy = np.arange(100, 110)\nprint(\"\\nOriginal Array for Fancy Indexing:\\n\", original_fancy)\n\nfancy_indexed_array = original_fancy[[0, 2, 4]]\nprint(\"Fancy Indexed Array:\\n\", fancy_indexed_array)\n\n# Check if it's a view (should be None)\nprint(\"Is fancy_indexed_array a view?\", fancy_indexed_array.base is None)\n\n# Modify the fancy indexed array\nfancy_indexed_array[0] = 500\nprint(\"\\nFancy Indexed Array after modification:\\n\", fancy_indexed_array)\nprint(\"Original Array after fancy indexed modification:\\n\", original_fancy) # Original is NOT changed!\n",
        "breakdown": [
          {
            "line": "import numpy as np",
            "explanation": "Imports the NumPy library."
          },
          {
            "line": "original_array = np.arange(10)",
            "explanation": "Creates a 1D NumPy array for demonstration."
          },
          {
            "line": "view_array = original_array[2:6]",
            "explanation": "Creates `view_array` by slicing `original_array`. Basic slicing typically returns a view."
          },
          {
            "line": "print(\"Is view_array a view of original_array?\", view_array.base is original_array)",
            "explanation": "Checks if `view_array` shares memory with `original_array` by comparing its `base` attribute. `True` confirms it's a view."
          },
          {
            "line": "view_array[0] = 99",
            "explanation": "Modifies an element in `view_array`. Since it's a view, this will also change `original_array`."
          },
          {
            "line": "print(\"Original Array after view modification:\\n\", original_array)",
            "explanation": "Prints the `original_array` to show that its value at index 2 (which corresponds to `view_array[0]`) has been modified."
          },
          {
            "line": "copy_array = original_array.copy()",
            "explanation": "Creates `copy_array` as an explicit, independent copy of `original_array` using the `.copy()` method."
          },
          {
            "line": "print(\"Is copy_array a view?\", copy_array.base is None)",
            "explanation": "Checks `copy_array.base`. `None` confirms it is an independent copy, not a view."
          },
          {
            "line": "copy_array[0] = 1000",
            "explanation": "Modifies an element in `copy_array`."
          },
          {
            "line": "print(\"Original Array after copy modification:\\n\", original_array)",
            "explanation": "Prints `original_array` to show that it remains unchanged, confirming `copy_array` is an independent copy."
          },
          {
            "line": "fancy_indexed_array = original_fancy[[0, 2, 4]]",
            "explanation": "Creates `fancy_indexed_array` using fancy indexing (passing a list of integer indices). Fancy indexing always returns a copy."
          },
          {
            "line": "print(\"Is fancy_indexed_array a view?\", fancy_indexed_array.base is None)",
            "explanation": "Checks `fancy_indexed_array.base`. `None` confirms it is an independent copy."
          },
          {
            "line": "fancy_indexed_array[0] = 500",
            "explanation": "Modifies an element in `fancy_indexed_array`."
          },
          {
            "line": "print(\"Original Array after fancy indexed modification:\\n\", original_fancy)",
            "explanation": "Prints `original_fancy` to show it remains unchanged, confirming fancy indexing produced a copy."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Basic slicing (`arr[a:b]`) generally creates a view, sharing memory with the original array.",
          "Fancy indexing (`arr[[idx1, idx2]]` or boolean masking) always creates a copy of the data.",
          "Use `arr.copy()` to explicitly force a copy and ensure independence from the original array.",
          "The `arr.base` attribute is `None` for arrays that own their data (copies) and points to the original array for views.",
          "Modifying a view will change the original array; modifying a copy will not.",
          "Always be mindful of views vs. copies to prevent unexpected side effects and optimize memory usage."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Given `a = np.array([1, 2, 3, 4])` and `b = a[1:3]`, what will be the value of `a` if you execute `b[0] = 99`?",
            "options": [
              "A) `[1, 2, 3, 4]`",
              "B) `[1, 99, 3, 4]`",
              "C) `[99, 2, 3, 4]`",
              "D) `[1, 99, 99, 4]`"
            ],
            "correctIndex": 1,
            "explanation": "Slicing (`a[1:3]`) typically creates a view. Modifying `b[0]` (which corresponds to `a[1]`) will therefore modify the original array `a` at index 1."
          },
          {
            "question": "Which of the following operations is guaranteed to return a *copy* of the original NumPy array?",
            "options": [
              "A) `arr[::2]`",
              "B) `arr.reshape(new_shape)`",
              "C) `arr.view()`",
              "D) `arr[[0, 1, 3]]`"
            ],
            "correctIndex": 3,
            "explanation": "Fancy indexing (`arr[[0, 1, 3]]`) always creates a copy. `arr[::2]` is a slice (view). `reshape` often returns a view if possible, otherwise a copy. `arr.view()` explicitly creates a view."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between a 'view' and a 'copy' in NumPy array operations. Provide an example where misunderstanding this distinction could lead to a bug.",
        "answer": "A 'view' is a new array object that refers to the same underlying data buffer as the original array. Changes made to a view will directly modify the original array. Basic slicing (`arr[start:end]`) commonly produces views. A 'copy' is an independent array object with its own separate data buffer. Changes to a copy do not affect the original array. Fancy indexing (`arr[[indices]]`) and explicit `.copy()` calls produce copies.\n\n**Example of a bug:** Suppose you have a dataset `data` and you want to normalize a subset of it without affecting the original. If you write `subset = data[some_condition]` (which creates a view if `some_condition` is a boolean mask or slice) and then `subset -= subset.mean()`, you've inadvertently modified the original `data` array. To prevent this, you should explicitly create a copy: `subset = data[some_condition].copy()`.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How can you programmatically check if a NumPy array is a view or a copy of another array? What is the significance of `ndarray.base`?",
        "answer": "You can check if a NumPy array is a view or a copy by examining its `ndarray.base` attribute. If `array.base` is `None`, the array owns its data (it's a copy). If `array.base` is a reference to another `ndarray` object, then `array` is a view of that `base` array. The significance of `ndarray.base` is that it allows NumPy to manage memory efficiently by avoiding unnecessary data duplication. When a view is created, `base` points to the original array, indicating that the data is shared. This helps in understanding data ownership and preventing unintended side effects when modifying arrays that might be views.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  }
];
