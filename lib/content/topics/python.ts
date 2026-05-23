import { Topic } from '../../types/content';

export const pythonTopics: Topic[] = [
  {
    id: 'py-intro',
    slug: 'intro',
    title: 'Python for Data Science',
    description: 'Why Python dominates data science and how to set up your environment.',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['python', 'introduction', 'ecosystem'],
    sections: {
      what: {
        text: `Python is a high-level, interpreted, dynamically-typed programming language created by Guido van Rossum in 1991. It has become the undisputed king of data science, machine learning, and AI due to a unique combination of readability, versatility, and an extraordinary ecosystem of libraries.

Unlike languages like C++ or Java, Python code reads almost like English. There are no type declarations, no semicolons, no complex memory management — you focus entirely on logic. This philosophy ("batteries included") means Python comes with everything needed for most tasks out of the box, and its pip package manager connects you to over 400,000 additional libraries.

For data science specifically, the ecosystem is unmatched: **NumPy** for fast numerical computing, **Pandas** for data manipulation, **Matplotlib/Seaborn** for visualization, **Scikit-Learn** for machine learning, **TensorFlow/PyTorch** for deep learning, and **LangChain** for AI applications. These libraries are written in highly optimized C/Fortran code but wrapped in clean Python APIs.

Python is **interpreted** (no compilation step — you can run code line-by-line in Jupyter Notebooks), **dynamically typed** (variables don't need type declarations), and **garbage-collected** (memory is managed automatically). These features make it perfect for the exploratory, iterative nature of data science work.`,
        eli5: "Python is like a Swiss Army knife that speaks English. It's easy to learn, works for everything from data analysis to building AI, and has a giant community that's written tools for every task you'll ever need.",
        points: ['Interpreted: run code line-by-line in Jupyter', 'Dynamically typed: no type declarations needed', '400K+ packages on PyPI via pip', 'Used by Google, Netflix, NASA, every major ML lab']
      },
      why: {
        text: 'Python dominates data science because it balances ease-of-use with performance (via C-backed libraries), has the largest ML/AI library ecosystem, and has massive community support. Every major AI framework (TensorFlow, PyTorch, Hugging Face) has Python as its primary interface.',
        tip: 'Learn Python idioms (list comprehensions, generators, context managers) — writing "Pythonic" code signals seniority in interviews.'
      },
      diagram: {
        chart: `graph LR
  P[Python Code] --> I[Interpreter]
  I --> O[Output / Result]
  
  subgraph "Data Science Ecosystem"
    N[NumPy] --> M[Pandas]
    M --> V[Matplotlib/Seaborn]
    V --> SK[Scikit-Learn]
    SK --> TF[TensorFlow/PyTorch]
    TF --> LC[LangChain/AI]
  end`
      },
      breakdown: {
        components: [
          { title: 'Interpreted', description: 'Code executes line-by-line without a compilation step — perfect for exploratory analysis in Jupyter Notebooks.' },
          { title: 'Dynamically Typed', description: "x = 5 is valid. Then x = 'hello' is also valid. The type is inferred at runtime, not declared." },
          { title: 'Garbage Collected', description: "Python manages memory automatically — you don't need to manually allocate or free memory." },
          { title: 'The Global Interpreter Lock (GIL)', description: 'Python threads cannot run in true parallel due to the GIL. Use multiprocessing or async for CPU-bound parallel tasks.' }
        ]
      },
      code: {
        code: `# Python is readable — code looks like pseudocode
name = "Data Science"
version = 3.12

# f-strings: modern string formatting
print(f"Welcome to {name} with Python {version}!")

# Type checking (Python is dynamically typed)
x = 42
print(type(x))  # <class 'int'>

x = "hello"  # Same variable, different type!
print(type(x))  # <class 'str'>

# One-liner magic: list comprehension
squares = [n**2 for n in range(1, 6)]
print("Squares:", squares)  # [1, 4, 9, 16, 25]`,
        breakdown: [
          { line: 'name = "Data Science"', explanation: "No 'var', 'let', or 'string' keyword needed. Python infers the type automatically." },
          { line: 'print(f"Welcome to {name}...")', explanation: "f-strings embed variables directly in strings — the modern Python way. Always use f-strings over .format() or % formatting." },
          { line: '[n**2 for n in range(1, 6)]', explanation: "List comprehension — a Pythonic one-liner equivalent to a for loop that builds a list. Very common in data science code." }
        ]
      },
      examNotes: {
        examNotes: [
        'Python is interpreted, dynamically typed, garbage collected',
        'pip = Python package installer (pip install pandas)',
        'Virtual environments: venv or conda — isolate project dependencies',
        'PEP 8 = Python style guide (snake_case variables, 4-space indents)',
        'Jupyter Notebook = interactive environment perfect for data science',
        'Python 2 is dead — always use Python 3.9+'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What does "dynamically typed" mean in Python?', options: ['Python runs faster than other languages', 'Variable types are determined at runtime, not declared in advance', 'Python uses dynamic memory allocation', 'Python can run on any platform'], correctIndex: 1, explanation: 'Dynamically typed means you can write x = 5 and then x = "hello" without declaring types — Python figures out the type when the code runs.' },
        { question: 'Which Python feature allows you to run code line by line interactively?', options: ['Compilation', 'Interpretation', 'Transpilation', 'Linking'], correctIndex: 1, explanation: "Python is interpreted — you can run it line-by-line in a REPL or Jupyter Notebook without a full compilation step." }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the GIL (Global Interpreter Lock) in Python?', answer: 'The GIL is a mutex that prevents multiple native threads from executing Python bytecode at once. This means Python threads cannot achieve true CPU-level parallelism. For CPU-bound parallel tasks, use multiprocessing. For I/O-bound concurrency (web requests, file I/O), async/await or threads still work well because I/O operations release the GIL.', difficulty: 'Senior', category: 'Conceptual' },
      { question: 'Is Python pass-by-value or pass-by-reference?', answer: 'Neither exactly — Python uses "pass-by-object-reference" (also called pass-by-assignment). Immutable objects (int, str, tuple) behave like pass-by-value. Mutable objects (list, dict, set) behave like pass-by-reference — changes inside a function affect the original object.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'py-vars',
    slug: 'variables',
    title: 'Variables, Data Types & Operators',
    description: 'Python\'s type system, built-in types, and operations on them.',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    tags: ['variables', 'types', 'int', 'str', 'float', 'bool'],
    sections: {
      what: {
        text: `Variables in Python are labels pointing to objects in memory. When you write x = 5, Python creates an integer object with value 5 in memory and makes x point to it. If you then write x = "hello", x now points to a new string object — the integer object remains until garbage collected.

Python has several built-in primitive types: **int** (whole numbers with unlimited precision), **float** (decimal numbers, 64-bit IEEE 754), **str** (immutable Unicode text), **bool** (True or False — actually a subclass of int!), and **NoneType** (representing the absence of a value).

**Type coercion** (implicit conversion) is limited in Python compared to JavaScript. Python will NOT silently convert "5" + 5 — it raises a TypeError. You must explicitly cast: int("5") + 5. This strictness prevents subtle bugs.

Understanding **mutability** is crucial for data science. Immutable types (int, str, tuple, frozenset) cannot be changed after creation. Mutable types (list, dict, set) can be modified in-place. When you pass a mutable object to a function, the function can modify it, affecting the original — a common source of bugs.`,
        eli5: "Think of a variable as a label you stick on a box. The box holds a value. You can peel the label off and stick it on a different box anytime — that's reassignment.",
        points: ['Python variables are labels (references), not boxes', 'int has unlimited precision (no overflow)', 'NoneType represents absence of value', 'Immutable: int, str, tuple | Mutable: list, dict, set']
      },
      code: {
        code: `# Core data types
age = 25              # int (unlimited precision)
pi = 3.14159          # float (64-bit IEEE 754)
name = "Alice"        # str (immutable Unicode)
is_active = True      # bool (True/False, subclass of int)
nothing = None        # NoneType

# Type checking
print(type(age))       # <class 'int'>
print(isinstance(age, int))   # True

# Type casting
x = int("42")          # str → int
y = float("3.14")      # str → float  
z = str(100)           # int → str

# Arithmetic operators
print(10 / 3)          # 3.333...  (true division)
print(10 // 3)         # 3         (floor division)
print(10 % 3)          # 1         (modulo)
print(2 ** 10)         # 1024      (exponentiation)

# String operations
greeting = "Hello" + " " + "World"  # Concatenation
repeated = "Ha" * 3                  # "HaHaHa"
upper = name.upper()                 # "ALICE"

# Multiple assignment
a, b, c = 1, 2, 3      # Unpacking
a, b = b, a            # Swap (Pythonic!)`,
        breakdown: [
          { line: 'age = 25', explanation: "Python automatically infers this is an int. No 'int age = 25' needed." },
          { line: '10 / 3 → 3.333', explanation: 'In Python 3, / always gives a float. Use // for integer division.' },
          { line: 'a, b = b, a', explanation: 'Pythonic swap — no temporary variable needed. This is a tuple packing/unpacking trick.' }
        ]
      },
      examNotes: {
        examNotes: [
        'bool is a subclass of int: True == 1, False == 0',
        '/ = true division (always float), // = floor division (int), % = modulo',
        'None is NOT the same as 0, False, or empty string',
        'int() truncates (int(3.9) = 3), not rounds',
        'Strings are immutable — "hello"[0] = "H" raises TypeError'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What is the result of 10 / 3 in Python 3?', options: ['3', '3.0', '3.333...', 'Error'], correctIndex: 2, explanation: 'In Python 3, the / operator always performs true division and returns a float, even if dividing two integers.' },
        { question: 'What does None represent in Python?', options: ['Zero', 'False', 'An empty string', 'The absence of a value'], correctIndex: 3, explanation: 'None is the Python equivalent of null/nil. It represents the intentional absence of any value.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between == and is in Python?', answer: '== checks value equality (do they have the same value?). is checks identity equality (do they point to the same object in memory?). Small integers (-5 to 256) are cached in Python, so is may return True unexpectedly. Always use == for value comparisons.', difficulty: 'Mid', category: 'Trap' }
    ]
  },

  {
    id: 'py-collections',
    slug: 'data-structures',
    title: 'Lists, Tuples, Sets & Dictionaries',
    description: 'Master Python\'s four core collection types and when to use each.',
    difficulty: 'Beginner',
    estimatedMinutes: 30,
    tags: ['list', 'tuple', 'set', 'dict', 'collections'],
    sections: {
      what: {
        text: `Python provides four built-in collection types, each designed for different use cases: **List** (ordered, mutable sequence), **Tuple** (ordered, immutable sequence), **Set** (unordered, unique elements), and **Dictionary** (key-value mapping).

**Lists** are the workhorses of Python data science. They maintain order, allow duplicates, and can be modified freely. Indexing, slicing, appending, and sorting are all O(1) or O(n) operations. Lists are used for everything from storing dataset rows to accumulating results in loops.

**Dictionaries** (dicts) are Python's most powerful built-in structure for data science. They store key-value pairs with O(1) average-time lookups. A dict is essentially JSON — and JSON APIs return data as dicts. Most Pandas DataFrames start as dicts, machine learning model hyperparameters are dicts, and API responses are parsed as dicts.

**Sets** are unordered collections of unique items. They excel at membership testing (is X in this large collection?) with O(1) speed, and set operations like intersection, union, and difference — perfect for finding common or distinct elements between two datasets.

**Tuples** are immutable lists. Use them for data that shouldn't change (coordinates, database rows, function return values). Their immutability makes them hashable (usable as dict keys and in sets).`,
        eli5: "List = ordered shopping list (can add/remove). Tuple = engraved stone tablet (can't change). Set = bag of unique coins (no duplicates, no order). Dict = phone book (look up name → get number).",
        points: ['List: ordered, mutable, allows duplicates', 'Tuple: ordered, immutable, hashable', 'Set: unordered, unique elements, O(1) lookup', 'Dict: key-value pairs, O(1) lookups, preserves insertion order (Python 3.7+)']
      },
      code: {
        code: `# LIST: ordered, mutable
scores = [95, 87, 92, 78, 95]
scores.append(100)          # Add to end
scores.insert(0, 99)        # Insert at index
scores.sort(reverse=True)   # Sort descending
top3 = scores[:3]           # Slicing: first 3
print("Top 3:", top3)

# Comprehension: square even numbers
evens_squared = [x**2 for x in range(10) if x % 2 == 0]
print(evens_squared)  # [0, 4, 16, 36, 64]

# DICT: key-value pairs
student = {
    "name": "Alice",
    "age": 22,
    "grades": [90, 85, 92]
}
print(student["name"])           # Direct access
print(student.get("gpa", 0.0))  # Safe access with default
student["email"] = "alice@uni.edu"  # Add/update

# Dict comprehension
word_lengths = {word: len(word) for word in ["data", "science", "python"]}

# SET: unique elements
tags = {"python", "data", "ml", "python"}  # Duplicate removed
print(tags)  # {'python', 'data', 'ml'}

set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}
print(set_a & set_b)  # Intersection: {3, 4}
print(set_a | set_b)  # Union: {1, 2, 3, 4, 5, 6}
print(set_a - set_b)  # Difference: {1, 2}

# TUPLE: immutable
coordinates = (40.7128, -74.0060)  # NYC coordinates
lat, lon = coordinates  # Unpacking`,
        breakdown: [
          { line: 'scores[:3]', explanation: "Slicing: [start:stop:step]. scores[:3] means from beginning up to (not including) index 3 — the first 3 elements." },
          { line: "student.get('gpa', 0.0)", explanation: "Safe dict access — returns 0.0 if 'gpa' key doesn't exist. student['gpa'] would raise a KeyError." },
          { line: '{word: len(word) for word in [...]}', explanation: "Dict comprehension — creates a dict in one line. Key = word, Value = length of word." },
          { line: 'set_a & set_b', explanation: "Set intersection — elements present in BOTH sets. Operations: & (intersection), | (union), - (difference), ^ (symmetric difference)" }
        ]
      },
      examNotes: {
        examNotes: [
        'List vs Tuple: List is mutable, Tuple is immutable and hashable',
        'Dict keys must be hashable (immutable types: str, int, tuple)',
        'Set uses hash table — O(1) membership test (vs O(n) for list)',
        'dict.get(key, default) — safe access without KeyError',
        'List slicing: [start:stop:step], negative indices count from end',
        'dict.keys(), dict.values(), dict.items() return view objects'
      ]
      },
      quiz: {
        quiz: [
        { question: 'Which collection type automatically removes duplicates?', options: ['List', 'Tuple', 'Set', 'Dictionary'], correctIndex: 2, explanation: 'Sets store only unique elements — adding a duplicate simply does nothing. This makes sets perfect for deduplication.' },
        { question: 'What is the time complexity of checking if an element is in a dict or set?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctIndex: 2, explanation: 'Both dict and set use hash tables for O(1) average-time lookups. List membership check (in) is O(n) — it scans every element.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'When would you use a tuple instead of a list?', answer: 'Use tuples when: (1) data should not be modified (coordinates, RGB values, database records), (2) you need a hashable object (dict key or set member — tuples are hashable, lists are not), (3) returning multiple values from a function, (4) performance-critical code (tuples are slightly faster to create and iterate than lists).', difficulty: 'Fresher', category: 'Conceptual' }
    ]
  },

  {
    id: 'py-loops',
    slug: 'loops',
    title: 'Loops, Iteration & Comprehensions',
    description: 'for loops, while loops, and Pythonic comprehensions for data processing.',
    difficulty: 'Beginner',
    estimatedMinutes: 25,
    tags: ['loops', 'for', 'while', 'comprehension', 'enumerate', 'zip'],
    sections: {
      what: {
        text: `Loops are how you process collections of data — iterating over every row in a dataset, every word in a document, or every epoch in model training. Python's for loop is special: it's an iterator-based loop that works with any iterable object, not just numeric ranges.

**For loops** in Python iterate directly over items in a collection — no index variables needed. This is fundamentally different from C-style loops. You can loop over lists, strings, tuples, dictionaries, files, and any custom object that implements the iterator protocol.

**Comprehensions** are Python's most distinctive feature for data scientists. List comprehensions '[expr for x in iterable if condition]' replace for loops that build lists, making code 2-3x more readable and often faster. Dict and set comprehensions work the same way.

The built-in functions **enumerate()** (adds index tracking), **zip()** (iterates multiple iterables in parallel), and **map()/filter()** (functional transformations) are essential tools for data processing without verbose loops.

**While loops** continue as long as a condition is True. They're used when you don't know the iteration count in advance — polling a service until it responds, gradient descent until convergence, or a game loop.`,
        eli5: "A for loop is like saying 'for each apple in the basket, weigh it.' A while loop is 'keep stirring until the soup is ready.' Comprehensions are like saying 'give me a list of every apple's weight, in one sentence.'",
        points: ['for loop iterates over any iterable', 'enumerate() gives index + value', 'zip() iterates multiple lists in parallel', 'Comprehensions > for loops for building collections']
      },
      code: {
        code: `# Basic for loop: iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

# enumerate: get index AND value
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")  # 1. apple, 2. banana...

# zip: iterate two lists together
names = ["Alice", "Bob", "Carol"]
scores = [92, 85, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# While loop: convergence check
error = 100
iterations = 0
while error > 0.001:
    error *= 0.5
    iterations += 1
print(f"Converged in {iterations} iterations")

# List comprehension (replaces for loops that build lists)
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# Dict comprehension  
word_count = {word: len(word) for word in fruits}

# Nested comprehension: flatten 2D list
matrix = [[1,2,3], [4,5,6], [7,8,9]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Generator expression (memory efficient!)
total = sum(x**2 for x in range(1_000_000))  # No list created in memory`,
        breakdown: [
          { line: 'for i, fruit in enumerate(fruits, start=1)', explanation: 'enumerate() wraps an iterable and yields (index, item) pairs. start=1 makes it 1-indexed instead of 0-indexed.' },
          { line: 'for name, score in zip(names, scores)', explanation: 'zip() pairs up elements from multiple iterables — stops at the shortest.' },
          { line: '[x**2 for x in range(10)]', explanation: 'List comprehension: apply expression to each element. Equivalent to a for loop appending to a list, but more readable and faster.' },
          { line: 'sum(x**2 for x in range(1_000_000))', explanation: 'Generator expression (no []) — evaluates lazily, one item at a time. Perfect for huge datasets that would exhaust memory as a list.' }
        ]
      },
      examNotes: {
        examNotes: [
        'break = exit loop immediately; continue = skip to next iteration',
        'for...else: else block runs if loop completes without break',
        'range(start, stop, step) — stop is exclusive',
        'enumerate(iterable, start=0) returns (index, value) pairs',
        'zip() stops at shortest iterable; use itertools.zip_longest for longest',
        'List comprehension: [expr for x in iterable if condition]',
        'Generator: (expr for x in iterable) — lazy, memory efficient'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What does enumerate() return?', options: ['Just the index', 'Just the value', 'Tuples of (index, value)', 'A dictionary of indices'], correctIndex: 2, explanation: 'enumerate() yields (index, value) tuples, allowing you to track the current position while iterating.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between a list comprehension and a generator expression?', answer: 'A list comprehension [x for x in range(n)] evaluates immediately and stores all values in memory as a list. A generator expression (x for x in range(n)) evaluates lazily — values are produced one at a time, using O(1) memory regardless of n. Generators are essential for processing large datasets.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'py-funcs',
    slug: 'functions',
    title: 'Functions, *args, **kwargs & Lambda',
    description: 'Build reusable, flexible functions — the foundation of clean Python code.',
    difficulty: 'Beginner',
    estimatedMinutes: 30,
    tags: ['functions', 'def', 'args', 'kwargs', 'lambda', 'return'],
    sections: {
      what: {
        text: `Functions are the primary unit of code reuse in Python. They encapsulate logic into named blocks that can be called with different inputs (parameters) to produce different outputs. Well-written functions do one thing well, have descriptive names, and include a docstring explaining their purpose.

Python functions are **first-class objects** — they can be passed as arguments to other functions, stored in variables, returned from functions, and put in lists. This enables powerful patterns like callbacks, decorators, and functional programming.

The '*args' parameter captures any number of positional arguments as a tuple. The '**kwargs' parameter captures any number of keyword arguments as a dictionary. Together they enable functions that accept flexible numbers of arguments — the same pattern used by pandas 'DataFrame()', sklearn 'fit()', and most ML APIs.

**Lambda functions** are anonymous single-expression functions. They're syntactically compact and used heavily with pandas (df.apply(lambda x: x*2)), sorting (sorted(data, key=lambda x: x['score'])), and functional programming patterns.

**Default arguments** make functions flexible. **Type hints** (Python 3.5+) document expected types without enforcing them. **Docstrings** are the professional way to document functions.`,
        eli5: "A function is like a recipe. You write it once, and you can 'cook' it (call it) as many times as you want with different ingredients (arguments). *args is 'as many vegetables as you want', **kwargs is 'any seasonings by name.'",
        points: ['Functions are first-class objects in Python', '*args captures variable positional arguments as tuple', '**kwargs captures variable keyword arguments as dict', 'Lambda: anonymous one-line function']
      },
      code: {
        code: `# Basic function with docstring and type hints
def calculate_bmi(weight_kg: float, height_m: float) -> float:
    """Calculate BMI from weight and height.
    
    Args:
        weight_kg: Weight in kilograms
        height_m: Height in meters
    Returns:
        BMI value (weight / height²)
    """
    return weight_kg / (height_m ** 2)

print(calculate_bmi(70, 1.75))  # 22.86

# Default arguments
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Welcome")) # Welcome, Bob!

# *args: variable positional arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs: variable keyword arguments
def create_profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=25, role="Data Scientist")

# Lambda: anonymous function
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with sorted and pandas-like apply
data = [{"name": "Alice", "score": 92}, {"name": "Bob", "score": 78}]
sorted_data = sorted(data, key=lambda x: x["score"], reverse=True)
print(sorted_data[0]["name"])  # Alice (highest score)

# Returning multiple values (returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(f"Min: {lo}, Max: {hi}")`,
        breakdown: [
          { line: 'def calculate_bmi(weight_kg: float, height_m: float) -> float:', explanation: 'Type hints (float, -> float) document expected types but are not enforced. Use mypy for static type checking.' },
          { line: 'def sum_all(*numbers):', explanation: '*numbers collects any number of positional arguments into a tuple named numbers.' },
          { line: 'def create_profile(**info):', explanation: '**info collects any keyword arguments into a dictionary. e.g., create_profile(name="Alice") → info = {"name": "Alice"}' },
          { line: 'lambda x: x["score"]', explanation: 'Anonymous function used as a sort key — extracts the score value from each dict for comparison.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Functions are first-class objects (can be passed, returned, stored)',
        'Default arguments must come after required arguments',
        'Mutable default arguments (list, dict) are a common bug — use None as default',
        '*args = tuple of positional args; **kwargs = dict of keyword args',
        'Lambda = anonymous function, single expression, implicit return',
        'Functions without return statement return None implicitly',
        'Docstring: first string literal in function body, accessed via func.__doc__'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What does *args capture?', options: ['Exactly one argument', 'A list of keyword arguments', 'Any number of positional arguments as a tuple', 'Named arguments only'], correctIndex: 2, explanation: '*args captures any number of positional arguments passed to the function as a tuple.' }
      ]
      }
    },
    interviewQuestions: [
      { question: "Why is def func(items=[]) a bug in Python?", answer: "Default argument values are evaluated ONCE when the function is defined, not each time it's called. A mutable default like [] is shared across all calls. If you modify it (items.append(x)), the list persists between calls. Fix: use def func(items=None): if items is None: items = []", difficulty: 'Mid', category: 'Trap' }
    ]
  },

  {
    id: 'py-oop',
    slug: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Classes, inheritance, encapsulation, and Python\'s data model.',
    difficulty: 'Intermediate',
    estimatedMinutes: 40,
    tags: ['oop', 'class', 'inheritance', '__init__', 'self', 'polymorphism'],
    sections: {
      what: {
        text: `Object-Oriented Programming (OOP) is a paradigm that organizes code around objects — instances of classes that combine data (attributes) and behavior (methods). In Python, everything is an object — integers, strings, functions, and modules are all objects.

A **class** is a blueprint for creating objects. An **instance** is a specific object created from a class. The '__init__' method is the constructor — it runs automatically when an object is created, initializing its attributes. The 'self' parameter refers to the specific instance being acted on.

Python supports four OOP pillars: **Encapsulation** (hiding internal state, exposing controlled access), **Inheritance** (child classes extend parent class functionality), **Polymorphism** (objects of different types sharing the same interface), and **Abstraction** (hiding complexity behind simple interfaces).

In data science, OOP is everywhere. Every sklearn model is a class with 'fit()' and 'predict()' methods. PyTorch neural networks inherit from 'nn.Module'. Custom transformers in sklearn inherit from 'BaseEstimator'. Understanding OOP lets you extend these frameworks and write production-ready code.

Python's **magic methods** (dunder methods like '__repr__', '__len__', '__add__') let you customize how objects behave with built-in operations — making your classes integrate seamlessly with the language.`,
        eli5: "A class is like a cookie cutter. You define the shape once (class), and you can stamp out as many cookies (objects) as you want, each with slightly different decorations (attribute values).",
        points: ['Class = blueprint, Instance = specific object', '__init__ = constructor, self = current instance', 'Inheritance: child class extends parent', 'Dunder methods customize Python behavior']
      },
      code: {
        code: `# Basic class definition
class DatasetSplitter:
    """Splits datasets into train/validation/test sets."""
    
    def __init__(self, train_ratio: float = 0.7, val_ratio: float = 0.15):
        """Initialize with split ratios."""
        if train_ratio + val_ratio >= 1.0:
            raise ValueError("Train + val ratios must be < 1.0")
        self.train_ratio = train_ratio
        self.val_ratio = val_ratio
        self.test_ratio = 1.0 - train_ratio - val_ratio
    
    def split(self, data: list) -> tuple:
        """Split data into train, val, test sets."""
        n = len(data)
        train_end = int(n * self.train_ratio)
        val_end = train_end + int(n * self.val_ratio)
        
        return data[:train_end], data[train_end:val_end], data[val_end:]
    
    def __repr__(self) -> str:
        return f"DatasetSplitter(train={self.train_ratio}, val={self.val_ratio}, test={self.test_ratio})"

# Usage
splitter = DatasetSplitter(train_ratio=0.8, val_ratio=0.1)
data = list(range(100))
train, val, test = splitter.split(data)
print(f"Train: {len(train)}, Val: {len(val)}, Test: {len(test)}")
print(splitter)  # DatasetSplitter(train=0.8, val=0.1, test=0.1)

# Inheritance: extend base class
class MLModel:
    def __init__(self, name):
        self.name = name
        self.is_trained = False
    
    def fit(self, X, y):
        raise NotImplementedError("Subclasses must implement fit()")
    
    def predict(self, X):
        if not self.is_trained:
            raise RuntimeError("Model must be trained before predicting")

class LinearModel(MLModel):
    def __init__(self):
        super().__init__("LinearModel")  # Call parent __init__
        self.weights = None
    
    def fit(self, X, y):
        print(f"Training {self.name}...")
        self.weights = [0.5] * len(X[0])
        self.is_trained = True
        return self  # Enable method chaining

model = LinearModel()
model.fit([[1,2], [3,4]], [0, 1])`,
        breakdown: [
          { line: 'def __init__(self, train_ratio: float = 0.7):', explanation: 'Constructor: runs when you create DatasetSplitter(). self refers to the new instance being created.' },
          { line: 'def __repr__(self) -> str:', explanation: 'Dunder method: controls what print(obj) shows. Essential for debugging.' },
          { line: 'super().__init__("LinearModel")', explanation: "Call the parent class's __init__ — ensures parent's initialization runs before child's." },
          { line: 'return self', explanation: "Returning self from a method enables method chaining: model.fit(X,y).predict(X_test)" }
        ]
      },
      examNotes: {
        examNotes: [
        '__init__: constructor, called on object creation',
        'self: reference to the current instance (always first parameter)',
        'super(): access parent class methods',
        '__repr__: string representation (for developers)',
        '__str__: human-readable string (for print())',
        'Class variables (outside __init__) are shared by all instances',
        'Instance variables (self.x) are unique to each instance',
        '@classmethod: first arg is cls (class), @staticmethod: no self/cls'
      ]
      },
      quiz: {
        quiz: [
        { question: "What is the purpose of __init__ in a Python class?", options: ['To destroy objects', 'To initialize object attributes when created', 'To import modules', 'To define class variables'], correctIndex: 1, explanation: '__init__ is the constructor — it runs automatically when an object is instantiated and sets up the initial state (attributes).' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'What is the difference between @classmethod and @staticmethod?', answer: '@classmethod receives the class (cls) as its first argument and can access/modify class-level state. It can be called on the class or an instance. @staticmethod receives no implicit first argument — it has no access to class or instance state. It is essentially a regular function that lives in the class namespace for organizational purposes.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  },

  {
    id: 'py-decorators',
    slug: 'decorators-generators',
    title: 'Decorators & Generators',
    description: 'Advanced Python patterns: function wrapping and lazy evaluation.',
    difficulty: 'Intermediate',
    estimatedMinutes: 35,
    tags: ['decorators', 'generators', 'yield', 'functools', 'wrapper'],
    sections: {
      what: {
        text: `Decorators are one of Python's most elegant features. A decorator is a function that takes another function as input, adds some behavior, and returns a modified version. The @decorator syntax is "syntactic sugar" for func = decorator(func).

Decorators are used everywhere in production Python: @staticmethod and @classmethod modify class methods, @property creates managed attributes, @functools.lru_cache adds memoization, and Flask/FastAPI use @app.route() decorators to map URLs to functions. Writing custom decorators lets you apply cross-cutting concerns (logging, timing, authentication) without modifying function code.

Generators are functions that use **yield** instead of return. When you call a generator function, it returns a generator object — a lazy iterator. The function body pauses at each yield, resuming where it left off on the next call. This makes generators incredibly memory-efficient: a generator that yields 1 billion numbers uses the same O(1) memory as one that yields 10.

In data science, generators power batch processing of datasets too large to fit in memory. Reading a 100GB CSV line-by-line with a generator uses constant memory. PyTorch's DataLoader is built on generators. Understanding this pattern is crucial for production ML systems.`,
        eli5: "A decorator is like a coffee order modifier: you have a basic 'make coffee' function, and the '@add_milk' decorator wraps it to add milk without changing the original recipe. A generator is like a newspaper subscription — you don't get all newspapers at once, just one each morning.",
        points: ['Decorator wraps a function to add behavior', '@syntax is sugar for func = decorator(func)', 'Generator uses yield instead of return', 'Generators are lazy — produce values on demand']
      },
      code: {
        code: `import time
import functools

# Basic decorator: timing function execution
def timer(func):
    @functools.wraps(func)  # Preserves func's metadata
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f} seconds")
        return result
    return wrapper

@timer  # Equivalent to: train_model = timer(train_model)
def train_model(epochs):
    total = sum(range(epochs * 1000))
    return total

result = train_model(100)

# Parameterized decorator (decorator factory)
def retry(max_attempts=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def fetch_data(url):
    # Retry up to 3 times on failure
    pass

# GENERATOR: lazy evaluation
def fibonacci():
    """Infinite Fibonacci sequence generator."""
    a, b = 0, 1
    while True:
        yield a          # Pause here, return a
        a, b = b, a + b  # Resume here on next()

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator for processing large files
def read_large_csv(filepath):
    """Read CSV line by line — constant memory regardless of file size."""
    with open(filepath) as f:
        next(f)  # Skip header
        for line in f:
            yield line.strip().split(',')

# Process without loading entire file into memory
# for row in read_large_csv("huge_dataset.csv"):
#     process(row)`,
        breakdown: [
          { line: '@functools.wraps(func)', explanation: 'Preserves the wrapped function name, docstring, and signature. Without this, timer(train_model).__name__ would return "wrapper" instead of "train_model".' },
          { line: 'yield a', explanation: 'The function pauses here, sends `a` to the caller, and resumes from this point on the next next() call.' },
          { line: 'while True: yield a', explanation: 'An infinite generator — it only produces values when requested. You can iterate it forever without memory issues.' }
        ]
      },
      examNotes: {
        examNotes: [
        'Decorator pattern: func = decorator(func), @syntax is sugar',
        '@functools.wraps preserves wrapped function metadata',
        'Generator function: contains yield keyword',
        'Generator object: lazy iterator, O(1) memory',
        'yield pauses function; next() resumes it',
        'yield from: delegate to another generator/iterable',
        '@functools.lru_cache(maxsize=128): memoization decorator'
      ]
      },
      quiz: {
        quiz: [
        { question: 'What is the key advantage of generators over lists?', options: ['Generators are faster to create', 'Generators use O(1) memory regardless of size', 'Generators can be indexed', 'Generators are easier to debug'], correctIndex: 1, explanation: 'Generators produce values lazily (one at a time), using constant memory regardless of how many values they generate. A list stores all values at once.' }
      ]
      }
    },
    interviewQuestions: [
      { question: 'How does the @property decorator work?', answer: '@property converts a method into an attribute-like accessor. @property def radius(self): return self._radius allows you to write obj.radius (like an attribute) instead of obj.radius() (like a method). You can also define @radius.setter and @radius.deleter for controlled attribute access — this is Python\'s way of implementing getters and setters without changing the API.', difficulty: 'Mid', category: 'Conceptual' }
    ]
  }
,
{
    "id": "python-error-exceptions",
    "slug": "error-handling-exceptions",
    "title": "Error Handling and Exceptions",
    "description": "Learn how to anticipate, catch, and handle errors gracefully in Python using `try`, `except`, `else`, and `finally` blocks, ensuring robust and resilient applications.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 45,
    "tags": [
      "error handling",
      "exceptions",
      "robustness",
      "debugging"
    ],
    "sections": {
      "what": {
        "text": "In Python, errors that occur during the execution of a program are called exceptions. Instead of letting a program crash, Python provides a powerful mechanism to 'handle' these exceptions, allowing the program to continue running or to fail gracefully. This is achieved primarily through the `try`, `except`, `else`, and `finally` blocks.\n\nThe `try` block contains the code that might raise an exception. If an exception occurs within the `try` block, Python immediately stops executing the rest of the `try` block and looks for a matching `except` block. An `except` block specifies the type of exception it can handle. You can have multiple `except` blocks to handle different types of exceptions, or a generic `except Exception as e:` to catch any type of exception.\n\nThe `else` block (optional) is executed only if the code in the `try` block runs without raising any exceptions. It's useful for placing code that should only run if the 'try' part was successful. The `finally` block (also optional) is always executed, regardless of whether an exception occurred or was handled. This makes it ideal for cleanup actions, such as closing files or releasing resources, ensuring these critical operations always happen.\n\nUnderstanding and implementing proper exception handling is crucial for writing reliable data science code. It prevents unexpected crashes in scripts that process large datasets, interact with external systems, or perform complex computations, allowing for better debugging, logging, and user experience.",
        "eli5": "Imagine you're trying to build a tower with LEGOs. The 'try' part is when you try to put a piece on. If it falls over (an 'except'ion!), you have a 'plan B' (the 'except' part) to pick it up and try again, or maybe just stop nicely. If it doesn't fall (no 'except'ion), you can do a 'next step' (the 'else' part). And no matter what happens, even if it falls or not, you always put all your LEGOs back in the box at the end (the 'finally' part).",
        "points": [
          "`try` block: Code that might raise an exception.",
          "`except` block: Handles specific exceptions caught in the `try` block.",
          "`else` block: Executes if no exception occurred in the `try` block.",
          "`finally` block: Always executes, regardless of exceptions, for cleanup.",
          "Python has many built-in exception types (e.g., `ValueError`, `TypeError`, `FileNotFoundError`).",
          "The `raise` keyword can be used to explicitly trigger an exception."
        ]
      },
      "code": {
        "code": "def divide_numbers(numerator, denominator):\n    try:\n        result = numerator / denominator\n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero!\")\n        return None\n    except TypeError as e:\n        print(f\"Error: Invalid input types - {e}\")\n        return None\n    else:\n        print(f\"Division successful! Result: {result}\")\n        return result\n    finally:\n        print(\"Division attempt finished.\")\n\n# Test cases\ndivide_numbers(10, 2)  # Successful division\ndivide_numbers(10, 0)  # ZeroDivisionError\ndivide_numbers(10, 'a') # TypeError\nprint(\"\\n--- File Handling Example ---\")\ndef read_file_safely(filepath):\n    try:\n        with open(filepath, 'r') as f:\n            content = f.read()\n            print(f\"File content:\\n{content[:50]}...\")\n    except FileNotFoundError:\n        print(f\"Error: File not found at '{filepath}'.\")\n    except IOError as e:\n        print(f\"Error reading file: {e}\")\n    else:\n        print(\"File read operation completed successfully.\")\n    finally:\n        print(\"Attempted file reading.\")\n\nread_file_safely(\"non_existent_file.txt\")\n# Create a dummy file for successful read\nwith open(\"test_file.txt\", \"w\") as f:\n    f.write(\"This is a test file for demonstrating safe file I/O.\")\nread_file_safely(\"test_file.txt\")\nimport os\nos.remove(\"test_file.txt\") # Clean up",
        "breakdown": [
          {
            "line": "def divide_numbers(numerator, denominator):",
            "explanation": "Defines a function to demonstrate division with error handling."
          },
          {
            "line": "    try:",
            "explanation": "Starts a `try` block where potentially error-prone code resides."
          },
          {
            "line": "        result = numerator / denominator",
            "explanation": "The division operation, which can raise `ZeroDivisionError` or `TypeError`."
          },
          {
            "line": "    except ZeroDivisionError:",
            "explanation": "Catches a `ZeroDivisionError` if the denominator is zero."
          },
          {
            "line": "        print(\"Error: Cannot divide by zero!\")",
            "explanation": "Prints an error message specific to division by zero."
          },
          {
            "line": "        return None",
            "explanation": "Returns `None` to indicate failure."
          },
          {
            "line": "    except TypeError as e:",
            "explanation": "Catches a `TypeError` if inputs are not compatible for division, storing the error message in `e`."
          },
          {
            "line": "        print(f\"Error: Invalid input types - {e}\")",
            "explanation": "Prints a generic error message for `TypeError` including the original error."
          },
          {
            "line": "        return None",
            "explanation": "Returns `None` for failure."
          },
          {
            "line": "    else:",
            "explanation": "This block executes if no exceptions were raised in the `try` block."
          },
          {
            "line": "        print(f\"Division successful! Result: {result}\")",
            "explanation": "Prints success message and the result."
          },
          {
            "line": "        return result",
            "explanation": "Returns the successful result."
          },
          {
            "line": "    finally:",
            "explanation": "This block always executes, regardless of whether an exception occurred or not."
          },
          {
            "line": "        print(\"Division attempt finished.\")",
            "explanation": "Prints a final message."
          },
          {
            "line": "def read_file_safely(filepath):",
            "explanation": "Another function demonstrating safe file handling."
          },
          {
            "line": "    try:",
            "explanation": "Attempts to open and read a file."
          },
          {
            "line": "        with open(filepath, 'r') as f:",
            "explanation": "Opens the file in read mode. `with` ensures it's closed automatically."
          },
          {
            "line": "            content = f.read()",
            "explanation": "Reads the entire file content."
          },
          {
            "line": "    except FileNotFoundError:",
            "explanation": "Handles the case where the specified file does not exist."
          },
          {
            "line": "    except IOError as e:",
            "explanation": "Catches more general I/O errors (e.g., permissions issues)."
          },
          {
            "line": "    else:",
            "explanation": "Executes if the file was opened and read without errors."
          },
          {
            "line": "    finally:",
            "explanation": "Always executes, indicating the file reading attempt is done."
          },
          {
            "line": "import os; os.remove(\"test_file.txt\")",
            "explanation": "Cleans up the dummy file created for the example."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "The order of `except` blocks matters; specific exceptions should be caught before more general ones.",
          "`finally` is guaranteed to execute, making it suitable for resource cleanup (e.g., closing files, releasing locks).",
          "The `raise` statement can be used to manually trigger an exception or re-raise a caught exception.",
          "Custom exceptions can be created by inheriting from the `Exception` class or a specific built-in exception.",
          "It's generally bad practice to use a bare `except:` as it catches all exceptions, including `SystemExit` and `KeyboardInterrupt`, making debugging difficult."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which block in Python's exception handling structure is guaranteed to execute, regardless of whether an exception occurred or was handled?",
            "options": [
              "A. `try`",
              "B. `except`",
              "C. `else`",
              "D. `finally`"
            ],
            "correctIndex": 3,
            "explanation": "The `finally` block is designed for cleanup operations and is guaranteed to execute after the `try` block, and after any `except` or `else` blocks, even if an unhandled exception occurs."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between `except` and `finally` in Python's exception handling.",
        "answer": "`except` blocks are used to catch and handle specific types of exceptions that might occur within the `try` block. Code inside an `except` block only executes if an exception of its specified type is raised. `finally` blocks, on the other hand, are guaranteed to execute regardless of whether an exception occurred, was caught, or propagated. They are primarily used for cleanup operations that must happen regardless of the program's success or failure within the `try` block (e.g., closing files, releasing network connections).",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "When would you use the `raise` keyword in Python?",
        "answer": "The `raise` keyword is used to explicitly trigger an exception. This is useful when you detect an error condition that your function cannot handle, or when you want to signal that a specific event has occurred that needs to be handled by a higher-level part of the program. You can raise built-in exceptions (e.g., `raise ValueError('Invalid input')`) or custom exceptions that you've defined.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "python-modules-packages",
    "slug": "modules-packages-import",
    "title": "Modules, Packages, and Import Mechanics",
    "description": "Understand how to organize your Python code into reusable modules and packages, and master the various ways to import functionality into your projects for better structure and collaboration.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "modules",
      "packages",
      "import",
      "code organization",
      "reusability",
      "project structure"
    ],
    "sections": {
      "what": {
        "text": "As Python programs grow in size and complexity, it becomes essential to organize code into smaller, manageable, and reusable units. This is where modules and packages come into play.\n\nA **module** in Python is simply a file containing Python code (variables, functions, classes). The file name (without the `.py` extension) becomes the module name. Modules help in logically organizing code, preventing name collisions (by providing their own namespace), and promoting reusability. For instance, `math.py` would be a module providing mathematical functions.\n\nA **package** is a way of organizing related modules into a directory hierarchy. A directory is considered a Python package if it contains an `__init__.py` file (which can be empty, but often contains package-level initialization code). This allows for a structured namespace, e.g., `my_package.sub_module`. Packages are fundamental for larger projects and for distributing libraries.\n\nThe `import` statement is how you bring functionality from modules and packages into your current script. There are several ways to import:\n1.  `import module_name`: Imports the entire module. You access its contents using `module_name.function_name`.\n2.  `import module_name as alias`: Imports the module and gives it a shorter alias.\n3.  `from module_name import function_name`: Imports only specific items (functions, classes, variables) from a module directly into the current namespace. You can then use `function_name` directly.\n4.  `from module_name import *`: Imports all public items from a module. This is generally discouraged in production code as it can lead to name collisions and make it harder to tell where functions originated.\n\nPython locates modules and packages by searching directories listed in `sys.path`. This list includes the current directory, directories specified in the `PYTHONPATH` environment variable, and standard library directories.",
        "eli5": "Imagine your code is a big Lego castle. A 'module' is like a single instruction booklet for building a specific part, like 'how to build a drawbridge'. A 'package' is like a whole box of instruction booklets related to 'castle defense' (with an 'intro page' at the front). When you `import` something, you're just taking out the instruction booklet you need to build that part for your castle. You can take the whole booklet, or just copy one specific instruction from it.",
        "points": [
          "A **module** is a single Python file (`.py`) containing code.",
          "A **package** is a directory containing modules and an `__init__.py` file (can be empty), organizing related modules.",
          "The `import` statement is used to bring modules/packages or their contents into the current scope.",
          "`import module_name` provides access via `module_name.item`.",
          "`from module_name import item_name` imports `item_name` directly.",
          "Python searches for modules in directories listed in `sys.path`."
        ]
      },
      "code": {
        "code": "# my_module.py (This would be in a separate file)\n# def greet(name):\n#     return f\"Hello, {name}!\"\n# PI = 3.14159\n\n# my_package/__init__.py (This would be in a package directory)\n# __all__ = ['data_processor'] # Optionally control what 'from my_package import *' imports\n\n# my_package/data_processor.py\n# def clean_text(text):\n#     return text.strip().lower()\n# def process_numbers(numbers):\n#     return [n * 2 for n in numbers]\n\n# Main script (e.g., main.py) demonstrating imports:\n\n# 1. Importing a module\nimport math\nprint(f\"Value of PI from math module: {math.pi}\")\n\n# 2. Importing a module with an alias\nimport numpy as np\narr = np.array([1, 2, 3])\nprint(f\"Numpy array created: {arr}\")\n\n# 3. Importing specific items from a module\nfrom datetime import datetime\ncurrent_time = datetime.now()\nprint(f\"Current time from datetime: {current_time}\")\n\n# 4. Example of a custom module (assuming my_module.py exists in the same directory)\n# To run this, you'd need to create my_module.py first.\n# def greet(name):\n#     return f\"Hello, {name}!\"\n# PI = 3.14159\n\n# import my_module\n# print(my_module.greet(\"Alice\"))\n# print(f\"My custom PI: {my_module.PI}\")\n\n# 5. Example of a custom package (assuming my_package/data_processor.py exists)\n# To run this, you'd need to create the directory and files first.\n# my_package/\n# |-- __init__.py\n# `-- data_processor.py\n#     def clean_text(text):\n#         return text.strip().lower()\n\n# from my_package.data_processor import clean_text\n# cleaned = clean_text(\"  HELLO WORLD \")\n# print(f\"Cleaned text from package: {cleaned}\")\n\n# Illustrating __name__ == '__main__'\n# In my_module.py:\n# if __name__ == '__main__':\n#     print(\"my_module.py is being run directly!\")\n# else:\n#     print(\"my_module.py is being imported.\")\n\n# When you run main.py, my_module.py will print 'being imported'.\n# If you run my_module.py directly, it will print 'being run directly!'\n",
        "breakdown": [
          {
            "line": "import math",
            "explanation": "Imports the standard `math` module, making its contents accessible via `math.` prefix."
          },
          {
            "line": "print(f\"Value of PI from math module: {math.pi}\")",
            "explanation": "Accesses the `pi` constant from the imported `math` module."
          },
          {
            "line": "import numpy as np",
            "explanation": "Imports the `numpy` module and assigns it the alias `np` for convenience."
          },
          {
            "line": "arr = np.array([1, 2, 3])",
            "explanation": "Uses the `np` alias to call the `array` function from `numpy`."
          },
          {
            "line": "from datetime import datetime",
            "explanation": "Imports only the `datetime` class directly from the `datetime` module."
          },
          {
            "line": "current_time = datetime.now()",
            "explanation": "Uses `datetime` directly, without a `datetime.` prefix, because it was imported specifically."
          },
          {
            "line": "# from my_package.data_processor import clean_text",
            "explanation": "This commented-out line shows how to import a specific function from a module located within a custom package hierarchy. `my_package` is the package, `data_processor` is the module inside it."
          },
          {
            "line": "# if __name__ == '__main__':",
            "explanation": "This common Python idiom checks if the current script is being run directly (`__name__` is '__main__') or being imported as a module (`__name__` is the module's name). It's used to put code that should only run when the script is executed as the main program."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "A module's name is the filename without `.py`.",
          "A package is a directory with an `__init__.py` file (even if empty).",
          "`import module` vs. `from module import item`: `import` brings the module into its own namespace, `from` brings items into the current namespace.",
          "`sys.path` is a list of directories Python searches for modules/packages. You can modify it, but typically use environment variables or virtual environments.",
          "Relative imports (`.module` or `..package`) are used within a package structure to refer to sibling or parent modules.",
          "The `__name__` special variable is '`__main__`' when a script is run directly, and the module's name when imported."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following statements about Python packages is true?",
            "options": [
              "A. A package is always a single `.py` file.",
              "B. A package must contain a file named `main.py`.",
              "C. A package is a directory that contains an `__init__.py` file.",
              "D. Packages are only used for standard library modules."
            ],
            "correctIndex": 2,
            "explanation": "A package is a directory that acts as a container for related modules and other sub-packages, and is identified by the presence of an `__init__.py` file (which can be empty)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is the difference between a Python module and a Python package?",
        "answer": "A Python module is a single `.py` file containing Python code (functions, classes, variables). A Python package is a collection of related modules organized in a directory hierarchy. A directory becomes a package if it contains an `__init__.py` file, which helps Python recognize it as a package and allows for structured importing. Packages provide a way to namespace modules and prevent name collisions across larger projects.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Explain the purpose of the `__init__.py` file in a Python package.",
        "answer": "The `__init__.py` file signifies to Python that the directory it resides in should be treated as a package. It can be an empty file, but it's often used for package-level initialization code, such as defining `__all__` to specify what gets imported when `from package import *` is used, or to automatically import certain sub-modules or set up package-wide configurations. It's executed automatically when the package or any of its modules are imported.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "python-file-io-context-managers",
    "slug": "file-io-context-managers",
    "title": "File I/O and Context Managers",
    "description": "Explore how to read from and write to various file types, and leverage Python's `with` statement for safe and efficient resource management using context managers.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 50,
    "tags": [
      "file i/o",
      "context managers",
      "with statement",
      "data loading",
      "resource management",
      "data persistence"
    ],
    "sections": {
      "what": {
        "text": "File Input/Output (I/O) is a fundamental operation in data science, allowing programs to interact with external data sources like CSVs, text files, JSON, or databases. Python provides built-in functions to handle file operations easily.\n\nThe primary function for file operations is `open()`. It takes the file path and a mode (e.g., `'r'` for read, `'w'` for write, `'a'` for append, `'x'` for exclusive creation, `'b'` for binary mode, `'t'` for text mode). When you open a file, you get a file object that you can use to read from or write to the file. Crucially, after performing file operations, it's vital to `close()` the file to release system resources and ensure data is saved.\n\nFailing to close files properly can lead to resource leaks, data corruption, or locking issues. This is where **context managers** and the `with` statement become invaluable. A context manager is an object that defines the `__enter__()` and `__exit__()` methods. The `with` statement ensures that `__enter__()` is called upon entry to the block and `__exit__()` is called upon exit (even if exceptions occur), thus guaranteeing proper resource cleanup. The file object returned by `open()` is a perfect example of a built-in context manager.\n\nUsing `with open(...) as file_object:` is the Pythonic way to handle file I/O because it automatically manages the closing of the file, even if errors occur during reading or writing. This pattern extends beyond files to other resources like network connections, database sessions, or locks, ensuring they are always properly acquired and released.",
        "eli5": "Imagine you want to read a book from a library. The `open()` command is like checking out the book. You can then `read()` it or `write()` notes in it. But it's very important to `close()` the book and return it when you're done, or the library gets mad! The `with` magic is like having a super-responsible friend who makes sure the book is ALWAYS returned, even if you accidentally spill juice on it or fall asleep mid-story. You just focus on reading, and your friend handles the returning part.",
        "points": [
          "The `open()` function is used to open files, specifying file path and mode (e.g., `'r'`, `'w'`, `'a'`).",
          "Always `close()` files after operations to release resources, or use `with` statement.",
          "The `with` statement (context manager) ensures resources are properly acquired and released, even on errors.",
          "File objects returned by `open()` are built-in context managers.",
          "Common file modes: `'r'` (read), `'w'` (write, overwrites), `'a'` (append), `'x'` (create new file, error if exists).",
          "Binary mode (`'rb'`, `'wb'`) is used for non-text files like images or serialized objects."
        ]
      },
      "code": {
        "code": "import os\n\n# 1. Basic file writing (without 'with' - requires manual close)\nfile_path_basic = \"my_data_basic.txt\"\nf = open(file_path_basic, 'w')\ntry:\n    f.write(\"Line 1: Hello from Python\\n\")\n    f.write(\"Line 2: Data for analysis\\n\")\nfinally:\n    f.close() # Important to close manually\nprint(f\"Content written to {file_path_basic}. File closed manually.\\n\")\n\n# 2. Basic file reading (without 'with' - requires manual close)\nf = open(file_path_basic, 'r')\ntry:\n    content = f.read()\n    print(f\"Content from {file_path_basic}:\\n{content}\")\nfinally:\n    f.close()\nprint(f\"File {file_path_basic} read and closed manually.\\n\")\n\n# 3. File writing using 'with' statement (Pythonic way)\nfile_path_with = \"my_data_with.txt\"\nwith open(file_path_with, 'w') as f_with:\n    f_with.write(\"Line A: This is safer\\n\")\n    f_with.write(\"Line B: Context manager handles closing\\n\")\nprint(f\"Content written to {file_path_with}. File closed automatically by 'with'.\\n\")\n\n# 4. File reading using 'with' statement\nwith open(file_path_with, 'r') as f_with:\n    lines = f_with.readlines() # Read all lines into a list\n    print(f\"Lines from {file_path_with}:\")\n    for line in lines:\n        print(line.strip())\nprint(f\"File {file_path_with} read and closed automatically by 'with'.\\n\")\n\n# 5. Appending to a file\nwith open(file_path_with, 'a') as f_append:\n    f_append.write(\"Line C: Appended new content.\\n\")\nprint(f\"Content appended to {file_path_with}.\\n\")\n\nwith open(file_path_with, 'r') as f_check:\n    print(f\"Updated content of {file_path_with}:\\n{f_check.read()}\\n\")\n\n# Clean up the created files\nos.remove(file_path_basic)\nos.remove(file_path_with)\nprint(\"Cleaned up temporary files.\")",
        "breakdown": [
          {
            "line": "file_path_basic = \"my_data_basic.txt\"",
            "explanation": "Defines a string variable for the file path."
          },
          {
            "line": "f = open(file_path_basic, 'w')",
            "explanation": "Opens a file named 'my_data_basic.txt' in write mode ('w'). If it exists, it's truncated; if not, it's created."
          },
          {
            "line": "f.write(\"Line 1: Hello from Python\\n\")",
            "explanation": "Writes the specified string to the file. `\\n` adds a newline character."
          },
          {
            "line": "finally:",
            "explanation": "Ensures the following block is executed, regardless of errors."
          },
          {
            "line": "    f.close()",
            "explanation": "Manually closes the file handle, releasing system resources."
          },
          {
            "line": "f = open(file_path_basic, 'r')",
            "explanation": "Opens the file in read mode ('r')."
          },
          {
            "line": "    content = f.read()",
            "explanation": "Reads the entire content of the file as a single string."
          },
          {
            "line": "with open(file_path_with, 'w') as f_with:",
            "explanation": "Opens a file in write mode using the `with` statement. `f_with` is the file object, which is automatically closed when the `with` block exits."
          },
          {
            "line": "    lines = f_with.readlines()",
            "explanation": "Reads all lines from the file into a list of strings, where each string ends with a newline character."
          },
          {
            "line": "    for line in lines:",
            "explanation": "Iterates through the list of lines."
          },
          {
            "line": "        print(line.strip())",
            "explanation": "Prints each line, using `.strip()` to remove leading/trailing whitespace, including the newline character."
          },
          {
            "line": "with open(file_path_with, 'a') as f_append:",
            "explanation": "Opens the file in append mode ('a'). Content will be added to the end of the file."
          },
          {
            "line": "os.remove(file_path_basic)",
            "explanation": "Uses the `os` module to delete the specified file, cleaning up temporary files."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always use the `with` statement for file I/O to ensure files are properly closed, even if errors occur.",
          "File modes: `'r'` (read), `'w'` (write, overwrites), `'a'` (append), `'x'` (create new). Add `'b'` for binary (e.g., `'rb'`, `'wb'`).",
          "`read()` reads entire content, `readline()` reads one line, `readlines()` reads all lines into a list.",
          "`write()` writes a string, `writelines()` writes a list of strings.",
          "Context managers can be implemented for custom resources by defining `__enter__` and `__exit__` methods in a class.",
          "Text files handle encoding (usually UTF-8 by default), while binary files handle raw bytes."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following is the primary benefit of using the `with` statement for file operations in Python?",
            "options": [
              "A. It makes file reading faster.",
              "B. It automatically handles the closing of the file, even if errors occur.",
              "C. It allows writing to binary files directly.",
              "D. It encrypts the file content for security."
            ],
            "correctIndex": 1,
            "explanation": "The `with` statement (using context managers) guarantees that the file's `__exit__` method is called, which ensures the file is closed automatically and correctly, regardless of how the block is exited (normal completion or an exception)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Why is it recommended to use the `with` statement when working with files in Python?",
        "answer": "Using the `with` statement ensures proper resource management. When a file is opened, it consumes system resources. If the program crashes or an error occurs before `file.close()` is explicitly called, these resources might not be released, leading to resource leaks, file corruption, or locked files. The `with` statement guarantees that the `__exit__` method of the file object (which handles closing) is called automatically, even if exceptions occur, thus ensuring the file is always closed safely and efficiently.",
        "difficulty": "Mid",
        "category": "Coding"
      },
      {
        "question": "Differentiate between 'r', 'w', and 'a' file modes in Python.",
        "answer": "The `'r'` mode is for reading; the file pointer is placed at the beginning, and if the file doesn't exist, it raises a `FileNotFoundError`. The `'w'` mode is for writing; it creates a new file or truncates (empties) an existing one if it exists. The file pointer is at the beginning. The `'a'` mode is for appending; it creates the file if it doesn't exist, otherwise, it places the file pointer at the end of the existing file, so new data is added without overwriting.",
        "difficulty": "Mid",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "python-virtual-envs-dependencies",
    "slug": "virtual-environments-dependencies",
    "title": "Virtual Environments and Dependency Management",
    "description": "Learn to create isolated Python environments to manage project-specific dependencies, ensuring reproducibility and avoiding conflicts using `venv` or `conda`.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "virtual environment",
      "venv",
      "conda",
      "dependency management",
      "reproducibility",
      "project setup"
    ],
    "sections": {
      "what": {
        "text": "In data science and software development, projects often rely on specific versions of libraries (dependencies). If multiple projects on the same machine require different versions of the same library, conflicts can arise (e.g., Project A needs `pandas==1.0` while Project B needs `pandas==1.4`). This is known as 'dependency hell'.\n\n**Virtual environments** solve this problem by creating isolated Python environments for each project. Each virtual environment is a self-contained directory that holds a specific Python interpreter and its own set of installed packages, separate from the global Python installation and other virtual environments. This ensures that changes in one project's dependencies do not affect others.\n\nPython 3.3+ includes the `venv` module as a lightweight way to create virtual environments. For more complex data science scenarios, especially when dealing with non-Python dependencies (like R, Java, or specific system libraries) or multiple Python versions, **Conda** (Anaconda/Miniconda) is a popular and powerful alternative. Conda is a package, dependency, and environment manager that works for any language.\n\n**Dependency management** typically involves:\n1.  **Creating** a virtual environment.\n2.  **Activating** it to ensure `pip` (Python's package installer) installs packages into *that* environment.\n3.  **Installing** required packages using `pip install package_name`.\n4.  **Freezing** the environment's dependencies into a `requirements.txt` file (`pip freeze > requirements.txt`). This file lists all installed packages and their exact versions, making the project reproducible.\n5.  **Installing** dependencies from a `requirements.txt` file in a new environment (`pip install -r requirements.txt`).\n\nUsing virtual environments is a crucial best practice for maintaining clean, reproducible, and conflict-free Python data science projects.",
        "eli5": "Imagine you have many Lego projects, and each project needs specific Lego bricks. A 'virtual environment' is like giving each project its own separate box of bricks. So, your 'space station' project has its own box with space-themed bricks, and your 'castle' project has its own box with castle-themed bricks. This way, the bricks never get mixed up, and you can always build your space station exactly as you designed it, without worrying if the castle project used up all the grey pieces.",
        "points": [
          "Virtual environments create isolated Python installations for specific projects.",
          "They prevent dependency conflicts between different projects.",
          "`venv` is Python's built-in module for creating virtual environments.",
          "Conda (Anaconda/Miniconda) is a broader environment and package manager, popular in data science.",
          "`pip` is used to install and manage packages within an activated virtual environment.",
          "`requirements.txt` lists all project dependencies and their versions for reproducibility (`pip freeze > requirements.txt`)."
        ]
      },
      "code": {
        "code": "# --- Using 'venv' (Built-in Python Virtual Environment) ---\n\n# 1. Create a virtual environment (run in your terminal/command prompt)\n# python3 -m venv my_project_env\n\n# 2. Activate the virtual environment\n# On macOS/Linux:\n# source my_project_env/bin/activate\n# On Windows (Cmd):\n# my_project_env\\Scripts\\activate.bat\n# On Windows (PowerShell):\n# my_project_env\\Scripts\\Activate.ps1\n\n# --- After activation, your terminal prompt might change (e.g., (my_project_env) your_user@host) ---\n\n# 3. Install packages into the activated environment\n# pip install pandas scikit-learn matplotlib\n\n# 4. Generate a requirements file\n# pip freeze > requirements.txt\n\n# 5. Deactivate the virtual environment (returns to global Python)\n# deactivate\n\n# --- To set up a project on another machine or from scratch ---\n\n# 1. Create a new virtual environment (e.g., 'new_env')\n# python3 -m venv new_env\n\n# 2. Activate the new environment\n# source new_env/bin/activate\n\n# 3. Install all dependencies from requirements.txt\n# pip install -r requirements.txt\n\n# 4. Deactivate\n# deactivate\n\n# --- Example of creating a dummy requirements.txt for demonstration ---\n# This is what `pip freeze > requirements.txt` would generate for a basic environment with pandas\n# Create a dummy requirements.txt for the exercise if you're not running the full shell commands\nimport os\nif not os.path.exists('requirements.txt'):\n    with open('requirements.txt', 'w') as f:\n        f.write('pandas==1.5.3\\n')\n        f.write('numpy==1.24.4\\n')\n        f.write('scipy==1.10.1\\n')\n    print(\"Generated dummy requirements.txt\")\n\n# The actual Python code (if you were inside an activated venv)\n# import pandas as pd\n# data = {'col1': [1, 2], 'col2': [3, 4]}\n# df = pd.DataFrame(data)\n# print(df)\n",
        "breakdown": [
          {
            "line": "# python3 -m venv my_project_env",
            "explanation": "Creates a new virtual environment named `my_project_env` in the current directory. `-m venv` tells Python to run the `venv` module as a script."
          },
          {
            "line": "# source my_project_env/bin/activate",
            "explanation": "Activates the virtual environment on Unix-like systems (Linux/macOS). This modifies your shell's PATH variable to prioritize the environment's Python and `pip`."
          },
          {
            "line": "# my_project_env\\Scripts\\activate.bat",
            "explanation": "Activates the virtual environment on Windows Command Prompt."
          },
          {
            "line": "# pip install pandas scikit-learn matplotlib",
            "explanation": "Installs the specified Python packages into the *currently activated* virtual environment. These packages will not affect your global Python installation."
          },
          {
            "line": "# pip freeze > requirements.txt",
            "explanation": "Lists all packages installed in the *current* environment with their exact version numbers and writes them to a file named `requirements.txt`. This is crucial for reproducibility."
          },
          {
            "line": "# deactivate",
            "explanation": "Deactivates the virtual environment, returning your shell to the global Python environment."
          },
          {
            "line": "# pip install -r requirements.txt",
            "explanation": "Installs all packages listed in the `requirements.txt` file into the *currently activated* virtual environment. This command is used to set up a project's dependencies from a shared file."
          },
          {
            "line": "import os; if not os.path.exists('requirements.txt'): ...",
            "explanation": "This Python block programmatically creates a sample `requirements.txt` for demonstration purposes, assuming the user might not run the shell commands directly. In a real scenario, `pip freeze` would generate this."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "The main purpose of a virtual environment is to isolate project dependencies.",
          "`venv` is part of the standard library since Python 3.3.",
          "Conda is a more comprehensive tool, managing environments and packages for multiple languages, often preferred in data science for its ability to handle non-Python libraries.",
          "`pip freeze > requirements.txt` exports the exact state of your environment's dependencies.",
          "`pip install -r requirements.txt` installs dependencies from a file.",
          "Always activate your virtual environment before installing packages or running project code to ensure correct dependencies are used."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Why are virtual environments considered a best practice in Python development, especially for data science projects?",
            "options": [
              "A. They make Python code run faster by optimizing package loading.",
              "B. They allow multiple Python projects to use different versions of the same library without conflicts.",
              "C. They automatically update all installed packages to their latest versions.",
              "D. They convert Python code into a compiled executable for deployment."
            ],
            "correctIndex": 1,
            "explanation": "Virtual environments create isolated spaces for each project, allowing them to have their own set of dependencies. This prevents conflicts where different projects require different versions of the same package, ensuring project stability and reproducibility."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What problem do virtual environments solve in Python development?",
        "answer": "Virtual environments solve the 'dependency hell' problem. Without them, all Python packages would be installed globally, making it difficult to manage different projects that require conflicting versions of the same library. Virtual environments create isolated environments for each project, allowing them to have their own specific set of dependencies without affecting other projects or the global Python installation, thereby ensuring project reproducibility and preventing conflicts.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How do you create and manage project dependencies using `venv` and `requirements.txt`?",
        "answer": "First, you create a virtual environment using `python -m venv <env_name>`. Then, you activate it (e.g., `source <env_name>/bin/activate` on Linux/macOS). Once activated, you install your project's dependencies using `pip install <package_name>`. To capture the exact versions of all installed packages for reproducibility, you run `pip freeze > requirements.txt`. To set up the project on another machine, you create a new virtual environment, activate it, and then run `pip install -r requirements.txt`.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "python-type-hinting-static-analysis",
    "slug": "type-hinting-static-analysis",
    "title": "Type Hinting and Static Analysis",
    "description": "Enhance code readability, maintainability, and catch potential errors early by using type hints and static analysis tools in your Python projects.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 40,
    "tags": [
      "type hinting",
      "mypy",
      "static analysis",
      "code quality",
      "readability",
      "maintainability"
    ],
    "sections": {
      "what": {
        "text": "Python is a dynamically typed language, meaning you don't declare variable types explicitly, and types are checked at runtime. While this offers flexibility, it can lead to bugs that only surface during execution, and makes large codebases harder to read, maintain, and refactor, especially in collaborative data science projects.\n\n**Type hinting**, introduced in PEP 484, allows developers to optionally specify the expected types of variables, function arguments, and return values. These 'hints' are not enforced by the Python interpreter at runtime (Python remains dynamically typed), but they provide valuable metadata for human readers and, more importantly, for **static analysis tools**.\n\nStatic analysis tools, like `mypy`, can read these type hints and perform type checking *before* the code is run. They can identify potential type mismatches, missing attributes, or incorrect function calls that would otherwise result in runtime errors. This helps catch bugs earlier in the development cycle, improves code reliability, and makes refactoring safer.\n\nBenefits of type hinting:\n*   **Improved Readability and Documentation**: Clearly shows what types of data functions expect and return, acting as self-documentation.\n*   **Better IDE Support**: Modern IDEs leverage type hints for intelligent autocomplete, parameter suggestions, and immediate error highlighting.\n*   **Enhanced Code Maintainability**: Makes it easier for new team members to understand the codebase and for developers to safely make changes.\n*   **Early Bug Detection**: Static type checkers can find many common errors before execution.\n\nCommon type hints include `int`, `str`, `list`, `dict`. For more complex scenarios, the `typing` module provides types like `List[int]`, `Dict[str, Any]`, `Optional[str]`, `Union[str, int]`, and `Callable`.",
        "eli5": "Imagine you're giving instructions to a friend. Python usually lets you say things like 'take this thing'. But if you use 'type hints', it's like saying 'take this *apple*' or 'take this *basket of fruit*'. The computer doesn't strictly force you to take an apple, but a helpful robot (a 'static analyzer') can look at your instructions beforehand and warn you, 'Hey, you said you'd take an *apple*, but you're trying to take a *banana* here! That might cause a problem later!' It helps you spot mistakes before you even try to follow the instructions.",
        "points": [
          "Type hints are optional annotations for variable types, function arguments, and return values.",
          "Python remains dynamically typed; hints are for readability and static analysis, not runtime enforcement.",
          "Static analysis tools (e.g., `mypy`) use type hints to check code for type errors without running it.",
          "Benefits include improved code readability, better IDE support, enhanced maintainability, and early bug detection.",
          "The `typing` module provides more complex types like `List`, `Dict`, `Optional`, `Union`, `Any`."
        ]
      },
      "code": {
        "code": "from typing import List, Dict, Optional, Union, Any\n\n# 1. Basic Type Hints for variables and functions\ndef calculate_average(numbers: List[float]) -> float:\n    \"\"\"Calculates the average of a list of floats.\"\"\"\n    if not numbers:\n        return 0.0\n    return sum(numbers) / len(numbers)\n\n# 2. Type hints for variables\nuser_name: str = \"Alice\"\nuser_age: int = 30\n\n# 3. Using Optional and Union\ndef get_user_info(user_id: int) -> Optional[Dict[str, Union[str, int]]]:\n    \"\"\"Fetches user info; returns None if user_id not found.\"\"\"\n    users = {\n        1: {\"name\": \"Bob\", \"age\": 25},\n        2: {\"name\": \"Charlie\", \"age\": 35}\n    }\n    return users.get(user_id)\n\n# 4. Demonstrating usage (runtime execution, type hints are ignored)\nprint(f\"Average: {calculate_average([10.5, 20.0, 15.5])}\")\nprint(f\"User Info (ID 1): {get_user_info(1)}\")\nprint(f\"User Info (ID 3): {get_user_info(3)}\")\n\n# --- Example of what `mypy` would catch (run `mypy your_script.py` in terminal) ---\n# def greet_user(name: str) -> None:\n#     print(f\"Hello, {name}!\")\n#\n# greet_user(123) # mypy would flag: Argument \"name\" to \"greet_user\" has incompatible type \"int\"; expected \"str\"\n\n# Another example for mypy\n# def add_numbers(a: int, b: int) -> int:\n#     return a + b\n#\n# result = add_numbers(5, \"hello\") # mypy would flag: Argument \"b\" to \"add_numbers\" has incompatible type \"str\"; expected \"int\"\n",
        "breakdown": [
          {
            "line": "from typing import List, Dict, Optional, Union, Any",
            "explanation": "Imports specific type hints from the `typing` module for more complex type annotations."
          },
          {
            "line": "def calculate_average(numbers: List[float]) -> float:",
            "explanation": "Function `calculate_average` expects `numbers` to be a `List` of `float`s and is declared to return a `float`. `:` is for argument type, `->` for return type."
          },
          {
            "line": "user_name: str = \"Alice\"",
            "explanation": "Variable `user_name` is explicitly hinted as a `str`."
          },
          {
            "line": "def get_user_info(user_id: int) -> Optional[Dict[str, Union[str, int]]]:",
            "explanation": "Function `get_user_info` expects `user_id` to be an `int`. It is hinted to return either `None` (`Optional`) or a `Dict` whose keys are `str` and values can be either `str` or `int` (`Union`)."
          },
          {
            "line": "# greet_user(123)",
            "explanation": "This commented-out line shows an example of a type mismatch that a static type checker like `mypy` would flag. An `int` is passed where a `str` is expected."
          },
          {
            "line": "# result = add_numbers(5, \"hello\")",
            "explanation": "Another example of a type error that `mypy` would catch: passing a `str` to a function expecting an `int` for its second argument."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Type hints are optional and do not affect Python's runtime behavior.",
          "They are primarily used for documentation, readability, and enabling static analysis tools.",
          "`mypy` is a popular static type checker for Python.",
          "The `typing` module is essential for hinting collections (`List[int]`), optional values (`Optional[str]`), multiple possible types (`Union[str, int]`), and any type (`Any`).",
          "Type comments (`# type: ignore`) can temporarily suppress type checking warnings.",
          "Type hints improve code quality and collaboration, especially in larger data science projects."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "What is the main purpose of type hinting in Python?",
            "options": [
              "A. To enforce type checking at runtime, making Python a statically typed language.",
              "B. To provide metadata for human readers and static analysis tools to improve code clarity and catch errors before runtime.",
              "C. To automatically convert variables to the specified type during execution.",
              "D. To optimize code performance by pre-allocating memory for variables."
            ],
            "correctIndex": 1,
            "explanation": "Type hints do not change Python's dynamic typing behavior at runtime. Their primary role is to improve code readability, serve as documentation, and enable static analysis tools like `mypy` to find potential type-related errors before the code is executed."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What are type hints in Python, and why are they useful, especially in data science?",
        "answer": "Type hints are optional annotations in Python (introduced in PEP 484) that indicate the expected type of variables, function arguments, and return values. They are useful because, while Python is dynamically typed, type hints provide explicit information about data types. This significantly improves code readability, acts as self-documentation, helps catch type-related bugs early via static analysis tools (like `mypy`), and enhances IDE support (autocompletion, error checking). In data science, where data types are critical and pipelines can be complex, type hints make code more robust, maintainable, and easier to debug, especially in collaborative projects or when dealing with large datasets.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Explain the role of static analysis tools like `mypy` in conjunction with type hints.",
        "answer": "Static analysis tools like `mypy` are crucial for leveraging the full benefits of type hints. Since Python's interpreter ignores type hints at runtime, `mypy` steps in to perform a 'linting' or 'checking' process on your code *before* it runs. It reads the type annotations and analyzes the code to identify potential type mismatches, incorrect argument types, or invalid return types. This allows developers to catch a wide range of common programming errors early, improving code quality, reliability, and reducing the time spent on debugging runtime type errors.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "concurrency-asyncio-threading",
    "slug": "concurrency-asyncio-threading",
    "title": "Asynchronous & Concurrent Programming: `asyncio` and `threading`",
    "description": "Explore Python's capabilities for handling multiple tasks concurrently using `asyncio` for I/O-bound operations and `threading` for parallel execution within the GIL's constraints.",
    "difficulty": "Advanced",
    "estimatedMinutes": 90,
    "tags": [
      "concurrency",
      "async",
      "threading",
      "performance",
      "asyncio"
    ],
    "sections": {
      "what": {
        "text": "Concurrency in Python refers to the ability of a program to handle multiple tasks seemingly at the same time. This is distinct from parallelism, which involves executing multiple tasks simultaneously on different CPU cores. Python offers two primary modules for concurrency: `threading` and `asyncio`.\n\nThe `threading` module allows you to run multiple functions (threads) concurrently within a single process. Due to Python's Global Interpreter Lock (GIL), only one thread can execute Python bytecode at a time, limiting its effectiveness for CPU-bound tasks. However, for I/O-bound operations (like reading from a network or disk), `threading` can be highly effective because the GIL is released during these blocking I/O calls, allowing other threads to run. Threads share the same memory space, which can lead to complex issues like race conditions if not managed carefully with locks and semaphores.\n\n`asyncio` is Python's framework for writing single-threaded concurrent code using coroutines, event loops, and the `async`/`await` syntax. It's particularly well-suited for I/O-bound and high-level structured network code. Instead of creating new threads, `asyncio` uses a single thread to manage multiple tasks by cooperatively switching between them when one task is awaiting an I/O operation. This non-blocking approach makes it very efficient for handling a large number of concurrent connections without the overhead and synchronization challenges of threads. Understanding when to use `threading` versus `asyncio` is crucial for optimizing Python applications.",
        "eli5": "Imagine you're making dinner. Concurrency means you can chop veggies, then stir the pot, then check the oven – doing a little bit of each, quickly switching between tasks. `threading` is like having a helper who also chops veggies, but only one of you can use the knife at a time (Python's GIL). So, if one of you is waiting for the water to boil (I/O), the other can use the knife. `asyncio` is like you doing all the cooking yourself, but you're super organized: you put water on to boil, and *while it boils*, you quickly chop veggies, and then go back to the water when it's ready. You never just sit and wait; you always do something useful.",
        "points": [
          "Concurrency handles multiple tasks seemingly at once, while parallelism executes them simultaneously.",
          "`threading` is best for I/O-bound tasks in Python due to the GIL, which limits CPU-bound parallel execution.",
          "`asyncio` uses a single thread with an event loop for cooperative multitasking, ideal for high-performance I/O-bound operations.",
          "Threads share memory, requiring synchronization primitives (locks, semaphores) to prevent race conditions.",
          "Coroutines in `asyncio` (`async`/`await`) define points where tasks can yield control, enabling non-blocking I/O."
        ]
      },
      "code": {
        "code": "import asyncio\nimport threading\nimport time\nimport requests\n\n# --- Asyncio Example: Fetching multiple URLs concurrently ---\n\nasync def fetch_url(url):\n    print(f\"[Asyncio] Starting fetch for {url}\")\n    # Simulate network I/O with asyncio-compatible aiohttp or similar\n    # For this example, we'll use a blocking requests call in a ThreadPoolExecutor\n    # for simplicity, but in real asyncio, you'd use aiohttp or httpx[async].\n    # This part is illustrative of *what* a real async I/O operation would do.\n    # await asyncio.sleep(1) # Simulating an async non-blocking I/O operation\n    response = await asyncio.to_thread(requests.get, url) # Run blocking code in a separate thread\n    print(f\"[Asyncio] Finished fetch for {url} (Status: {response.status_code})\")\n    return response.status_code\n\nasync def main_asyncio():\n    urls = [\n        \"http://example.com\",\n        \"http://google.com\",\n        \"http://bing.com\"\n    ]\n    start_time = time.monotonic()\n    # Create a list of coroutine objects\n    tasks = [fetch_url(url) for url in urls]\n    # Run them concurrently\n    results = await asyncio.gather(*tasks)\n    end_time = time.monotonic()\n    print(f\"\\n[Asyncio] All tasks completed in {end_time - start_time:.2f} seconds. Results: {results}\")\n\n# --- Threading Example: Simple concurrent computation ---\n\ndef task_thread(name, delay):\n    print(f\"[Thread {name}] Starting...\")\n    time.sleep(delay) # Simulate CPU-bound or I/O-bound work (GIL released during sleep)\n    print(f\"[Thread {name}] Finished after {delay} seconds.\")\n\ndef main_threading():\n    print(\"\\n--- Threading Example ---\")\n    threads = []\n    start_time = time.monotonic()\n    \n    # Create and start threads\n    t1 = threading.Thread(target=task_thread, args=('A', 2))\n    t2 = threading.Thread(target=task_thread, args=('B', 1))\n    t3 = threading.Thread(target=task_thread, args=('C', 3))\n    \n    threads.append(t1)\n    threads.append(t2)\n    threads.append(t3)\n    \n    for t in threads:\n        t.start() # Start the thread's execution\n        \n    for t in threads:\n        t.join() # Wait for all threads to complete\n    \n    end_time = time.monotonic()\n    print(f\"[Threading] All threads completed in {end_time - start_time:.2f} seconds.\")\n\n# Run the examples\nif __name__ == \"__main__\":\n    print(\"--- Asyncio Example ---\")\n    asyncio.run(main_asyncio())\n    main_threading()",
        "breakdown": [
          {
            "line": "import asyncio\nimport threading\nimport time\nimport requests",
            "explanation": "Imports necessary modules for asynchronous operations, threading, time measurement, and making HTTP requests."
          },
          {
            "line": "async def fetch_url(url):",
            "explanation": "Defines an asynchronous function (`async def`) that will fetch a URL. This function is a coroutine."
          },
          {
            "line": "response = await asyncio.to_thread(requests.get, url)",
            "explanation": "In an `asyncio` context, to run a blocking I/O operation (like `requests.get`) without blocking the event loop, `asyncio.to_thread` is used. It runs the blocking function in a separate thread from a default thread pool, effectively making it awaitable."
          },
          {
            "line": "async def main_asyncio():",
            "explanation": "The main asynchronous function that orchestrates fetching multiple URLs."
          },
          {
            "line": "tasks = [fetch_url(url) for url in urls]",
            "explanation": "Creates a list of coroutine objects, one for each URL. These are not yet running."
          },
          {
            "line": "results = await asyncio.gather(*tasks)",
            "explanation": "`asyncio.gather` runs all given coroutines concurrently and waits for them to complete, collecting their results. The `await` keyword pauses `main_asyncio` until all `fetch_url` coroutines are done."
          },
          {
            "line": "def task_thread(name, delay):",
            "explanation": "A regular function designed to be run in a separate thread. It simulates work by sleeping."
          },
          {
            "line": "t1 = threading.Thread(target=task_thread, args=('A', 2))",
            "explanation": "Creates a `Thread` object. `target` specifies the function to run in the new thread, and `args` passes arguments to that function."
          },
          {
            "line": "t.start()",
            "explanation": "Starts the execution of the thread. The `task_thread` function begins running in a new thread."
          },
          {
            "line": "t.join()",
            "explanation": "Waits for the thread to complete its execution. The main program flow will pause here until the joined thread finishes."
          },
          {
            "line": "asyncio.run(main_asyncio())",
            "explanation": "Runs the top-level `main_asyncio` coroutine. This function sets up and manages the `asyncio` event loop."
          },
          {
            "line": "main_threading()",
            "explanation": "Calls the function that demonstrates `threading`."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Understand the distinction between concurrency (managing multiple tasks) and parallelism (executing multiple tasks simultaneously).",
          "The GIL restricts `threading` for CPU-bound tasks, making `multiprocessing` a better choice for true parallelism in Python.",
          "`threading` is effective for I/O-bound tasks because the GIL is released during blocking I/O operations.",
          "`asyncio` is single-threaded and uses an event loop with `async`/`await` for cooperative multitasking, excelling in I/O-bound scenarios.",
          "Always use synchronization primitives (e.g., `Lock`, `Semaphore`) with `threading` to prevent race conditions when threads access shared resources.",
          "`asyncio` coroutines are lightweight and do not require explicit locking for shared state unless passing blocking code to `asyncio.to_thread`."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following best describes the Global Interpreter Lock (GIL) in Python?",
            "options": [
              "It's a mechanism that allows multiple threads to execute Python bytecode simultaneously on multiple CPU cores.",
              "It's a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once.",
              "It's a feature that enables asynchronous I/O operations without blocking the main thread.",
              "It's a tool for managing memory in concurrent programs, similar to a garbage collector."
            ],
            "correctIndex": 1,
            "explanation": "The GIL is a mutex (mutual exclusion lock) that allows only one thread to execute Python bytecodes at a time, even on multi-core processors. This is why standard Python threads cannot achieve true CPU parallelism."
          },
          {
            "question": "For which type of task is Python's `asyncio` module most effective?",
            "options": [
              "CPU-bound tasks that require heavy computation.",
              "Tasks involving large data processing on multi-core CPUs.",
              "I/O-bound tasks, such as network requests or database queries.",
              "Tasks that modify shared memory resources frequently across multiple processes."
            ],
            "correctIndex": 2,
            "explanation": "`asyncio` excels in I/O-bound tasks because it allows the program to switch to other tasks while waiting for I/O operations to complete, making efficient use of a single thread. It does not provide CPU parallelism."
          },
          {
            "question": "What is the primary benefit of using `threading` over `asyncio` for certain concurrent tasks in Python?",
            "options": [
              "Threads offer true CPU parallelism regardless of the GIL.",
              "Threads are simpler to implement for I/O-bound tasks that inherently release the GIL (e.g., `time.sleep`, `requests`).",
              "Threads consume less memory and resources than `asyncio` coroutines.",
              "Threads provide stronger isolation between concurrent operations."
            ],
            "correctIndex": 1,
            "explanation": "While `asyncio` is generally more scalable for I/O-bound tasks, `threading` can be simpler to integrate with existing blocking I/O libraries (like `requests`) where the underlying C implementation releases the GIL during the I/O call. `asyncio` requires libraries to be written specifically for `async`/`await` or wrapping blocking calls (e.g., with `to_thread`)."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Explain the difference between concurrency and parallelism, and how Python addresses each with `threading` and `multiprocessing`.",
        "answer": "Concurrency is about dealing with many things at once (e.g., a single chef juggling multiple dishes). Python achieves concurrency using `threading` and `asyncio`. `threading` allows multiple threads to exist within one process, but due to the GIL, only one thread can execute Python bytecode at a time, making it suitable for I/O-bound tasks where the GIL is released during blocking I/O. Parallelism is about doing many things at once (e.g., multiple chefs cooking dishes simultaneously). Python achieves true parallelism for CPU-bound tasks using the `multiprocessing` module, which spawns separate processes, each with its own Python interpreter and GIL, thus bypassing the GIL limitation.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "When would you choose `asyncio` over `threading` for a data science application involving network requests?",
        "answer": "I would choose `asyncio` when dealing with a large number of concurrent I/O-bound operations, such as making many HTTP requests to an API or interacting with multiple databases. `asyncio` is more efficient and scalable in these scenarios because it uses a single thread and an event loop to cooperatively switch between tasks, avoiding the overhead of context switching between threads and the complexities of shared memory synchronization that come with `threading`. For a very large number of connections, `asyncio` typically outperforms `threading` due to its non-blocking nature.",
        "difficulty": "Mid",
        "category": "Scenario"
      },
      {
        "question": "What is `await asyncio.to_thread(blocking_func, *args)` used for, and why is it important in `asyncio` programs?",
        "answer": "`await asyncio.to_thread(blocking_func, *args)` is used to run a synchronous, potentially blocking function in a separate OS thread without blocking the `asyncio` event loop. This is crucial for integrating traditional blocking code (like `requests` calls or CPU-bound computations) into an `asyncio` application. Without `to_thread`, calling a blocking function directly within an `async` function would halt the entire event loop, defeating the purpose of asynchronous programming and negatively impacting responsiveness. `to_thread` effectively offloads the blocking work to a worker thread, allowing the event loop to continue processing other `async` tasks.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "advanced-collections-dataclasses",
    "slug": "advanced-collections-dataclasses",
    "title": "Enhanced Data Structures: `collections` Module and `dataclasses`",
    "description": "Dive into Python's `collections` module for specialized data types like `Counter`, `deque`, and `defaultdict`, and master `dataclasses` for creating concise, type-hinted data objects.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "data structures",
      "collections",
      "dataclasses",
      "typing",
      "efficiency"
    ],
    "sections": {
      "what": {
        "text": "While Python's built-in `list`, `dict`, `set`, and `tuple` are fundamental, the `collections` module in the standard library provides specialized container datatypes that offer alternatives with enhanced functionality and performance for specific use cases. For example, `Counter` is a subclass of `dict` that helps count hashable objects; `deque` (double-ended queue) provides O(1) appends and pops from both ends, unlike lists; and `defaultdict` allows you to specify a default value factory for missing keys, simplifying code that deals with aggregating data.\n\nBeyond specialized containers, `dataclasses` (introduced in Python 3.7) offer a streamlined way to create classes primarily used to store data. They reduce boilerplate by automatically generating methods like `__init__`, `__repr__`, `__eq__`, and `__hash__` based on type-hinted fields. This makes `dataclasses` ideal for defining simple data structures, configuration objects, or rows in a dataset without the full overhead of traditional Python classes. They combine the readability and type-safety of classes with some of the conciseness of dictionaries, making them particularly useful in data science for defining schema for data points or model parameters.",
        "eli5": "Imagine your toy box has regular compartments for different types of toys. The `collections` module is like having special compartments: one that automatically counts how many red blocks you have (`Counter`), one that lets you quickly add or remove toys from either end (`deque`), and one that automatically puts a new toy in a compartment if you try to get one that isn't there yet (`defaultdict`). `dataclasses` are like special labels for your toys that automatically write down their name, color, and size for you, so you don't have to write it out every time for each toy, making it neat and easy to understand what each toy is.",
        "points": [
          "The `collections` module provides specialized, high-performance container datatypes.",
          "`Counter` is for counting hashable objects, similar to a frequency map.",
          "`deque` (double-ended queue) supports efficient appends and pops from both ends.",
          "`defaultdict` provides a default value for keys that don't exist, simplifying aggregation logic.",
          "`namedtuple` creates tuple subclasses with named fields, improving readability.",
          "`dataclasses` simplify creation of data-holding classes by auto-generating boilerplate methods (`__init__`, `__repr__`, etc.) based on type hints."
        ]
      },
      "code": {
        "code": "from collections import Counter, deque, defaultdict, namedtuple\nfrom dataclasses import dataclass, field\n\n# --- Counter Example ---\ntext = \"this is a test string for counting words this is a test\"\nword_counts = Counter(text.split())\nprint(f\"\\n--- Counter Example ---\\nWord counts: {word_counts}\")\nprint(f\"Most common 2 words: {word_counts.most_common(2)}\")\n\n# --- deque Example ---\nd = deque(['a', 'b', 'c'])\nprint(f\"\\n--- deque Example ---\\nInitial deque: {d}\")\nd.append('d')      # Add to the right\nd.appendleft('z')  # Add to the left\nprint(f\"After append/appendleft: {d}\")\npopped_right = d.pop()  # Remove from right\npopped_left = d.popleft() # Remove from left\nprint(f\"Popped {popped_left} and {popped_right}. Current deque: {d}\")\n\n# --- defaultdict Example ---\ns = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]\ndd = defaultdict(list)\nfor k, v in s:\n    dd[k].append(v)\nprint(f\"\\n--- defaultdict Example ---\\nGrouped by color: {dd}\")\nprint(f\"Value for 'green' (default empty list): {dd['green']}\") # Accessing non-existent key returns default\n\n# --- namedtuple Example ---\nPoint = namedtuple('Point', ['x', 'y'])\np1 = Point(10, 20)\nprint(f\"\\n--- namedtuple Example ---\\nPoint p1: {p1}\")\nprint(f\"p1.x: {p1.x}, p1.y: {p1.y}\")\n\n# --- dataclass Example ---\n@dataclass\nclass Product:\n    name: str\n    price: float\n    quantity: int = 0  # Default value\n    tags: list[str] = field(default_factory=list) # Mutable default\n\n    @property\n    def total_cost(self) -> float:\n        return self.price * self.quantity\n\nitem1 = Product(\"Laptop\", 1200.50, 1)\nitem2 = Product(\"Mouse\", 25.00, 5, tags=[\"electronics\", \"peripheral\"])\nitem3 = Product(\"Laptop\", 1200.50, 1) # Same values as item1\n\nprint(f\"\\n--- dataclass Example ---\")\nprint(f\"Item 1: {item1}\")\nprint(f\"Item 2: {item2} (Total cost: {item2.total_cost:.2f})\")\nprint(f\"Item 1 == Item 3: {item1 == item3}\") # dataclasses automatically generate __eq__\nprint(f\"Item 1.tags: {item1.tags}\")\nitem1.tags.append(\"electronics\")\nprint(f\"Item 1.tags after modification: {item1.tags}\")",
        "breakdown": [
          {
            "line": "from collections import Counter, deque, defaultdict, namedtuple",
            "explanation": "Imports specific data structures from the `collections` module."
          },
          {
            "line": "from dataclasses import dataclass, field",
            "explanation": "Imports the `dataclass` decorator and `field` function from the `dataclasses` module."
          },
          {
            "line": "word_counts = Counter(text.split())",
            "explanation": "Creates a `Counter` object from a list of words, which automatically counts the frequency of each word."
          },
          {
            "line": "d = deque(['a', 'b', 'c'])",
            "explanation": "Initializes a `deque` (double-ended queue) with some elements."
          },
          {
            "line": "d.append('d')",
            "explanation": "Adds an element to the right end of the `deque`."
          },
          {
            "line": "d.appendleft('z')",
            "explanation": "Adds an element to the left end of the `deque`."
          },
          {
            "line": "popped_left = d.popleft()",
            "explanation": "Removes and returns an element from the left end of the `deque`."
          },
          {
            "line": "dd = defaultdict(list)",
            "explanation": "Initializes a `defaultdict` where, if a key is not found, a new empty list will be created and returned as its default value."
          },
          {
            "line": "for k, v in s:\n    dd[k].append(v)",
            "explanation": "Iterates through key-value pairs and appends values to the list associated with each key in the `defaultdict`."
          },
          {
            "line": "Point = namedtuple('Point', ['x', 'y'])",
            "explanation": "Creates a `namedtuple` class named 'Point' with two named fields: 'x' and 'y'."
          },
          {
            "line": "p1 = Point(10, 20)",
            "explanation": "Creates an instance of the `Point` namedtuple, assigning values to its named fields."
          },
          {
            "line": "@dataclass",
            "explanation": "The decorator that transforms a regular class into a `dataclass`, automatically generating methods like `__init__`, `__repr__`, `__eq__`, etc."
          },
          {
            "line": "quantity: int = 0",
            "explanation": "Defines a field `quantity` of type `int` with a default value of 0."
          },
          {
            "line": "tags: list[str] = field(default_factory=list)",
            "explanation": "Defines a field `tags` of type `list[str]`. `default_factory=list` is used for mutable default values to ensure each `dataclass` instance gets its own independent list, preventing unintended sharing."
          },
          {
            "line": "item1 = Product(\"Laptop\", 1200.50, 1)",
            "explanation": "Instantiates the `Product` dataclass. The `__init__` method is automatically generated by the `@dataclass` decorator."
          },
          {
            "line": "print(f\"Item 1 == Item 3: {item1 == item3}\")",
            "explanation": "Demonstrates the automatically generated `__eq__` method, which compares instances based on their field values."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "`collections.Counter` is ideal for frequency counting and can perform set-like operations (union, intersection).",
          "`collections.deque` offers O(1) performance for append/pop operations at both ends, unlike `list` which is O(N) for operations at the start.",
          "`collections.defaultdict` avoids `KeyError` by providing a default value when a non-existent key is accessed.",
          "`collections.namedtuple` provides immutable, tuple-like objects with readable, named fields, improving code clarity over plain tuples.",
          "`dataclasses` simplify creating classes for data storage, reducing boilerplate and providing automatic `__init__`, `__repr__`, `__eq__` methods.",
          "When using mutable default values in `dataclasses` (e.g., lists, dicts), always use `field(default_factory=...)` to prevent shared mutable state across instances."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which `collections` data type would be best suited for efficiently maintaining a history of the last N items accessed?",
            "options": [
              "`Counter`",
              "`defaultdict`",
              "`deque`",
              "`namedtuple`"
            ],
            "correctIndex": 2,
            "explanation": "`deque` (double-ended queue) is ideal for this, especially when combined with a `maxlen` parameter, as it allows efficient adding and removal from both ends, perfect for a fixed-size history or queue."
          },
          {
            "question": "What is the main advantage of using a `dataclass` over a regular Python class for simple data structures?",
            "options": [
              "Dataclasses enforce strict immutability by default.",
              "Dataclasses automatically generate boilerplate methods like `__init__` and `__repr__`.",
              "Dataclasses offer superior performance for mathematical operations.",
              "Dataclasses can only hold primitive data types."
            ],
            "correctIndex": 1,
            "explanation": "The primary advantage is the automatic generation of special methods like `__init__`, `__repr__`, `__eq__`, and `__hash__`, which significantly reduces boilerplate code for data-holding classes."
          },
          {
            "question": "When defining a `dataclass` field with a mutable default value (like a list), what is the correct way to avoid unintended shared state between instances?",
            "options": [
              "Assign an empty list directly to the field: `my_list: list = []`",
              "Make the `dataclass` immutable using `frozen=True`.",
              "Use `field(default_factory=list)`.",
              "Define the list in the `__post_init__` method."
            ],
            "correctIndex": 2,
            "explanation": "Assigning `my_list: list = []` directly would cause all instances to share the same list object. `field(default_factory=list)` ensures that a new, independent list is created for each instance, preventing mutable default value issues. `frozen=True` would make the *instance* immutable, but doesn't solve the shared mutable default problem if `field` isn't used correctly."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Describe a scenario in data science where `collections.Counter` would be particularly useful.",
        "answer": "`collections.Counter` is extremely useful for frequency analysis of categorical data or text. For example, if you have a list of words from a document, you can use `Counter(words_list)` to quickly get the count of each unique word. This can be extended to analyze the most common categories in a dataset, top N hashtags in social media data, or distribution of errors in a log file. It simplifies finding modal values and performing basic statistical summaries of discrete data.",
        "difficulty": "Fresher",
        "category": "Scenario"
      },
      {
        "question": "What problem do `dataclasses` solve, and how do they compare to using dictionaries for structured data?",
        "answer": "`Dataclasses` solve the problem of writing extensive boilerplate code for simple data-holding classes, automatically generating `__init__`, `__repr__`, `__eq__`, etc. They improve readability, maintainability, and provide static type checking benefits over dictionaries. While dictionaries are flexible for unstructured data, `dataclasses` provide a defined schema, better IDE support (autocomplete, refactoring), and ensure consistency when working with structured data, making them safer and easier to manage in larger codebases or when defining clear data models for APIs or datasets.",
        "difficulty": "Mid",
        "category": "Scenario"
      },
      {
        "question": "Explain the concept of 'default_factory' in `dataclasses.field` and why it's necessary.",
        "answer": "`default_factory` in `dataclasses.field` is a way to provide a default value for a field when that default value is a mutable object (like a list, dictionary, or set). If you were to assign a mutable object directly as a default (e.g., `tags: list[str] = []`), all instances of that `dataclass` would share the *same* mutable object. Any change to `tags` in one instance would affect all other instances. `default_factory` accepts a callable (e.g., `list`, `dict`) that will be called without arguments to create a *new* default object each time a new instance of the `dataclass` is created, thus preventing unintended shared state.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "performance-profiling-optimization",
    "slug": "performance-profiling-optimization",
    "title": "Python Performance: Profiling, Optimization & `timeit`",
    "description": "Learn to identify performance bottlenecks in Python code using profiling tools like `cProfile` and `timeit`, and apply effective optimization strategies for faster execution.",
    "difficulty": "Advanced",
    "estimatedMinutes": 75,
    "tags": [
      "performance",
      "optimization",
      "profiling",
      "cProfile",
      "timeit",
      "efficiency"
    ],
    "sections": {
      "what": {
        "text": "Optimizing Python code for performance is crucial in data science, where large datasets and complex computations are common. The first step in optimization is identifying bottlenecks – the parts of your code that consume the most time or resources. This process is called profiling.\n\nPython provides built-in tools for profiling. `cProfile` (and its pure Python equivalent `profile`) can be used to gather statistics about execution time of different functions in your program. It tells you how many times each function was called and how much time was spent in it. Understanding `cProfile` output, which often comes in a tabular format showing cumulative time and call counts, is key to pinpointing 'hot spots' where optimization efforts will yield the greatest benefits.\n\nFor micro-benchmarking small code snippets, the `timeit` module is invaluable. It executes a given code snippet multiple times and measures the execution time, providing a more accurate measure by running code in a 'clean' environment, free from external interference or previous runs' overhead. Effective optimization strategies often include using built-in functions and C-implemented modules where possible (e.g., `numpy` for array operations), understanding Python's data structures for optimal use, employing generator expressions for memory efficiency with large iterables, and minimizing costly operations like global variable lookups or repeated function calls. True optimization often means focusing on the algorithm first, then the implementation details.",
        "eli5": "Imagine your race car is running slow, but you don't know why. 'Profiling' is like having a mechanic watch every part of the engine while you race, telling you exactly which part is taking too long (e.g., 'the spark plugs are slow!'). `cProfile` is the mechanic with a big stopwatch. Then, 'optimization' is fixing that slow part. `timeit` is like trying out two different kinds of spark plugs on a very short track to see which one is actually faster for that tiny bit of the race. The goal is to make your race car (your code) go zoom!",
        "points": [
          "Profiling identifies performance bottlenecks; `cProfile` is Python's built-in profiler for function-level timing.",
          "`cProfile` output shows call counts and time spent in functions (cumulative vs. internal time).",
          "`timeit` is used for accurate micro-benchmarking of small code snippets, minimizing setup overhead.",
          "Optimization strategies include using built-ins, `numpy` for numerical operations, and generator expressions.",
          "Avoid premature optimization; profile first to identify actual bottlenecks.",
          "Algorithmic improvements often yield greater performance gains than micro-optimizations."
        ]
      },
      "code": {
        "code": "import cProfile\nimport pstats\nimport timeit\nimport random\n\n# --- Example functions to profile ---\ndef inefficient_sum(n):\n    total = 0\n    for i in range(n):\n        total += i * i\n    return total\n\ndef efficient_sum(n):\n    # Mathematical formula for sum of squares: n*(n+1)*(2n+1)/6\n    return n * (n + 1) * (2 * n + 1) // 6\n\ndef complex_list_operations(size):\n    my_list = [random.randint(0, 100) for _ in range(size)]\n    # Inefficient: repeated list concatenations\n    temp = []\n    for x in my_list:\n        temp = temp + [x * 2] # This creates a new list each time\n    # Inefficient: repeated linear searches\n    for _ in range(size // 10):\n        if 50 in my_list:\n            pass # Just checking presence\n    return temp\n\ndef optimized_list_operations(size):\n    my_list = [random.randint(0, 100) for _ in range(size)]\n    # Efficient: list comprehension\n    temp = [x * 2 for x in my_list]\n    # Efficient: using a set for O(1) average lookup\n    my_set = set(my_list)\n    for _ in range(size // 10):\n        if 50 in my_set:\n            pass # Just checking presence\n    return temp\n\n# --- cProfile Demonstration ---\ndef run_profiling():\n    print(\"\\n--- Running cProfile ---\")\n    N = 100_000\n    cProfile.run('inefficient_sum(N)', 'profile_data_inefficient.prof')\n    cProfile.run('efficient_sum(N)', 'profile_data_efficient.prof')\n    cProfile.run('complex_list_operations(N)', 'profile_data_complex.prof')\n    cProfile.run('optimized_list_operations(N)', 'profile_data_optimized.prof')\n    \n    # Analyze and print stats for inefficient_sum\n    p = pstats.Stats('profile_data_inefficient.prof')\n    print(\"\\n*** Stats for inefficient_sum ***\")\n    p.strip_dirs().sort_stats('cumulative').print_stats(5) # Top 5 functions by cumulative time\n    \n    # Analyze and print stats for efficient_sum\n    p = pstats.Stats('profile_data_efficient.prof')\n    print(\"\\n*** Stats for efficient_sum ***\")\n    p.strip_dirs().sort_stats('cumulative').print_stats(5)\n    \n    # Analyze and print stats for complex_list_operations\n    p = pstats.Stats('profile_data_complex.prof')\n    print(\"\\n*** Stats for complex_list_operations ***\")\n    p.strip_dirs().sort_stats('cumulative').print_stats(5)\n    \n    # Analyze and print stats for optimized_list_operations\n    p = pstats.Stats('profile_data_optimized.prof')\n    print(\"\\n*** Stats for optimized_list_operations ***\")\n    p.strip_dirs().sort_stats('cumulative').print_stats(5)\n\n# --- timeit Demonstration ---\ndef run_timeit():\n    print(\"\\n--- Running timeit ---\")\n    SETUP_CODE = \"import random; N = 10000; my_list = [random.randint(0, 100) for _ in range(N)]\"\n\n    # Time a list comprehension vs loop for squaring\n    time_list_comp = timeit.timeit('[x*x for x in my_list]', setup=SETUP_CODE, number=1000)\n    time_loop_append = timeit.timeit('temp = []; for x in my_list: temp.append(x*x)', setup=SETUP_CODE, number=1000)\n    print(f\"List comprehension (sq): {time_list_comp:.4f}s\")\n    print(f\"Loop with append (sq):   {time_loop_append:.4f}s\")\n\n    # Time list 'in' vs set 'in'\n    # The setup needs to create the set for the set check\n    SETUP_SET_CODE = \"import random; N = 10000; my_list = [random.randint(0, 100) for _ in range(N)]; my_set = set(my_list)\"\n    time_list_in = timeit.timeit('50 in my_list', setup=SETUP_CODE, number=10000)\n    time_set_in = timeit.timeit('50 in my_set', setup=SETUP_SET_CODE, number=10000)\n    print(f\"'in' operator on list:  {time_list_in:.4f}s\")\n    print(f\"'in' operator on set:   {time_set_in:.4f}s\")\n\nif __name__ == \"__main__\":\n    run_profiling()\n    run_timeit()",
        "breakdown": [
          {
            "line": "import cProfile\nimport pstats\nimport timeit\nimport random",
            "explanation": "Imports modules for profiling (`cProfile`, `pstats`), micro-benchmarking (`timeit`), and generating random data."
          },
          {
            "line": "def inefficient_sum(n):\n    total = 0\n    for i in range(n):\n        total += i * i\n    return total",
            "explanation": "An example function that calculates the sum of squares using a simple loop, which can be inefficient for large `n`."
          },
          {
            "line": "def efficient_sum(n):\n    return n * (n + 1) * (2 * n + 1) // 6",
            "explanation": "An optimized function that uses a mathematical formula to calculate the sum of squares, avoiding a loop."
          },
          {
            "line": "def complex_list_operations(size):\n    # ... inefficient list concatenations and linear searches ...",
            "explanation": "Demonstrates common inefficient list operations like repeated `+` for concatenation (creates new lists) and `in` operator on a list (linear search)."
          },
          {
            "line": "def optimized_list_operations(size):\n    # ... efficient list comprehension and set lookups ...",
            "explanation": "Shows optimized list operations using list comprehensions and `set` for `O(1)` average time complexity lookups."
          },
          {
            "line": "cProfile.run('inefficient_sum(N)', 'profile_data_inefficient.prof')",
            "explanation": "Runs the `inefficient_sum(N)` code string and saves profiling statistics to a file named `profile_data_inefficient.prof`."
          },
          {
            "line": "p = pstats.Stats('profile_data_inefficient.prof')",
            "explanation": "Loads the profiling data from the specified file into a `pstats.Stats` object for analysis."
          },
          {
            "line": "p.strip_dirs().sort_stats('cumulative').print_stats(5)",
            "explanation": "Formats the statistics: `strip_dirs()` removes path information, `sort_stats('cumulative')` sorts by cumulative time spent in a function (including sub-calls), and `print_stats(5)` prints the top 5 entries."
          },
          {
            "line": "SETUP_CODE = \"import random; N = 10000; my_list = [random.randint(0, 100) for _ in range(N)]\"",
            "explanation": "Defines setup code that `timeit` will run once before measuring the execution of the main code snippet. This ensures the environment is ready."
          },
          {
            "line": "time_list_comp = timeit.timeit('[x*x for x in my_list]', setup=SETUP_CODE, number=1000)",
            "explanation": "Measures the execution time of a list comprehension, running it `number` times after executing `setup` code. Returns the total time taken."
          },
          {
            "line": "time_list_in = timeit.timeit('50 in my_list', setup=SETUP_CODE, number=10000)",
            "explanation": "Compares the 'in' operator performance for lists vs. sets using `timeit`."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always profile before optimizing: don't guess where bottlenecks are.",
          "`cProfile` measures time spent in functions, `ncalls` (number of calls), `tottime` (total time in function excluding sub-calls), and `cumtime` (total time including sub-calls).",
          "Focus optimization efforts on functions with high `cumtime` and `tottime` values.",
          "`timeit` is best for comparing small code snippets in isolation, providing precise timing by repeating execution.",
          "Common Python optimization techniques include: using built-in functions, `list` vs `set` vs `dict` for appropriate access patterns, generator expressions (memory), `numpy` for numerical arrays (C-optimized), avoiding repeated lookups (e.g., global variables in loops), and choosing efficient algorithms.",
          "List concatenations with `+` are `O(N)` and inefficient; `list.extend()` or `list.append()` are better, or preferably list comprehensions for new lists."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which `cProfile` metric would you primarily look at to identify the functions where the most overall time is spent, including time in their called sub-functions?",
            "options": [
              "`ncalls`",
              "`tottime`",
              "`percall`",
              "`cumtime`"
            ],
            "correctIndex": 3,
            "explanation": "`cumtime` (cumulative time) measures the total time spent in a function, including the time spent in all functions it calls. This is the best metric to find the highest-level bottlenecks."
          },
          {
            "question": "You need to compare the execution speed of two different ways to calculate the sum of a list of numbers. Which Python module is most suitable for this task?",
            "options": [
              "`logging`",
              "`cProfile`",
              "`timeit`",
              "`asyncio`"
            ],
            "correctIndex": 2,
            "explanation": "`timeit` is specifically designed for micro-benchmarking small code snippets and comparing their performance, providing more accurate timing results by repeating the execution many times."
          },
          {
            "question": "What is an efficient alternative to `my_list = my_list + [new_item]` for extending a list inside a loop in Python?",
            "options": [
              "`my_list.append(new_item)`",
              "`my_list.add(new_item)`",
              "`my_list = my_list.extend(new_item)`",
              "`my_list.insert(0, new_item)`"
            ],
            "correctIndex": 0,
            "explanation": "`my_list + [new_item]` creates a new list in memory on each iteration, which is very inefficient. `my_list.append(new_item)` modifies the list in-place and is `O(1)`, making it the most efficient way to add a single item. `my_list.extend(iterable)` is for adding multiple items from an iterable. `my_list.add()` is for sets, not lists. `my_list.insert(0, new_item)` is `O(N)` as it shifts all other elements."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "Why is it generally recommended to profile your code before attempting to optimize it?",
        "answer": "It's recommended to profile first because intuitions about performance bottlenecks are often incorrect. A small, seemingly insignificant part of the code might be called thousands of times, becoming a major bottleneck, while a complex-looking section might rarely execute. Profiling provides empirical data on where the program spends most of its time, allowing developers to focus their optimization efforts on the 'hot spots' that will yield the most significant performance improvements, rather than prematurely optimizing non-critical sections of the code.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "Describe three common Python-specific optimization techniques or best practices for data science workflows.",
        "answer": "1. **Leveraging NumPy/Pandas for vectorization:** Instead of writing explicit Python loops for numerical operations, use NumPy arrays and Pandas DataFrames which execute C-optimized, vectorized operations. This significantly reduces Python's interpretation overhead. 2. **Using generator expressions/functions for large datasets:** For large iterables, generators yield items one by one rather than building entire lists in memory, which saves memory and can improve performance for chained operations. 3. **Choosing the right data structure:** Understanding the time complexity of operations for lists (e.g., `O(N)` for `in`), sets/dictionaries (e.g., `O(1)` average for `in`), and deques (e.g., `O(1)` for appends/pops at ends) helps in selecting the most efficient structure for the task. Additionally, avoiding global variable lookups inside tight loops can offer minor gains.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "When would you use `timeit` versus `cProfile`?",
        "answer": "`timeit` is used for micro-benchmarking: precisely measuring the execution time of small, isolated code snippets or single lines of code, often to compare two different ways of achieving the same outcome. It runs the code multiple times to minimize measurement errors and warm-up effects. `cProfile` is used for macro-profiling: analyzing the performance of an entire program or a larger section of code, identifying which functions are called most frequently and where the program spends the majority of its execution time (the 'hot spots'). `cProfile` helps pinpoint bottlenecks in a larger system, while `timeit` helps optimize those identified bottlenecks or specific algorithms.",
        "difficulty": "Mid",
        "category": "Coding"
      }
    ]
  },
  {
    "id": "regular-expressions-re-module",
    "slug": "regular-expressions-re-module",
    "title": "Mastering Text: Regular Expressions with Python's `re` Module",
    "description": "Understand and apply regular expressions (regex) in Python using the `re` module for powerful pattern matching, search, and manipulation of textual data.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 60,
    "tags": [
      "text processing",
      "regex",
      "re module",
      "data cleaning",
      "string manipulation"
    ],
    "sections": {
      "what": {
        "text": "Regular expressions, often abbreviated as regex or regexp, are sequences of characters that define a search pattern. They are incredibly powerful tools for text processing, allowing you to match, locate, and manipulate strings based on complex rules rather than exact matches. In data science, regex is indispensable for tasks like data cleaning, parsing log files, extracting specific information from unstructured text, validating input formats (e.g., email addresses, phone numbers), and tokenizing text for natural language processing (NLP).\n\nPython's built-in `re` module provides full support for regular expressions. Key functions within this module include `re.search()` for finding the first occurrence of a pattern, `re.match()` for matching a pattern only at the beginning of a string, `re.findall()` for retrieving all non-overlapping matches, and `re.sub()` for substituting matched patterns with a replacement string. Understanding common regex metacharacters (like `.` for any character, `*` for zero or more, `+` for one or more, `?` for zero or one, `[]` for character sets, `^` for start, `$` for end) and special sequences (like `\\d` for digits, `\\w` for word characters, `\\s` for whitespace) is fundamental. Additionally, using raw strings (prefixed with `r` like `r'pattern'`) for regex patterns is a best practice to avoid issues with Python's own backslash escape sequences, as regex patterns often use backslashes for special meaning.",
        "eli5": "Imagine you have a messy pile of letters and numbers. Regular expressions are like a special magnifying glass that can only see certain patterns. If you want to find all phone numbers, you tell the magnifying glass: 'look for three numbers, then a dash, then three more, then a dash, then four more numbers!' (`\\d{3}-\\d{3}-\\d{4}`). The `re` module is your helper who uses this special magnifying glass to quickly find, pull out, or change those patterns in your pile of text.",
        "points": [
          "Regular expressions define search patterns for text manipulation.",
          "Python's `re` module provides functions like `search`, `match`, `findall`, and `sub`.",
          "`re.search()` finds the first match anywhere in the string; `re.match()` only at the beginning.",
          "`re.findall()` returns all non-overlapping matches as a list of strings.",
          "`re.sub()` replaces occurrences of a pattern with a specified replacement.",
          "Key regex metacharacters: `.`, `*`, `+`, `?`, `[]`, `{}`, `()`, `^`, `$`.",
          "Special sequences: `\\d` (digit), `\\w` (word char), `\\s` (whitespace), `\\b` (word boundary).",
          "Use raw strings (`r'...'`) for regex patterns to prevent conflicts with Python's backslash escapes."
        ]
      },
      "code": {
        "code": "import re\n\n# Sample text data\ntext = \"Hello world! My email is user@example.com and you can reach me at john.doe@mail.net. Phone: (123) 456-7890 or 987-654-3210. Dates: 2023-01-15, 05/12/2024.\"\n\nprint(f\"Original Text: {text}\\n\")\n\n# --- re.search(): Find the first match ---\n# Find an email address pattern\nemail_pattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'\nmatch = re.search(email_pattern, text)\nif match:\n    print(f\"re.search (first email): {match.group(0)}\")\nelse:\n    print(\"No email found with re.search\")\n\n# --- re.findall(): Find all non-overlapping matches ---\n# Find all email addresses\nall_emails = re.findall(email_pattern, text)\nprint(f\"re.findall (all emails): {all_emails}\")\n\n# Find all numbers\nnumbers = re.findall(r'\\d+', text)\nprint(f\"re.findall (all numbers): {numbers}\")\n\n# --- re.match(): Match only at the beginning of the string ---\n# This will not match 'Hello world!' since the pattern doesn't start with digits\ndigit_start_match = re.match(r'\\d+', text)\nprint(f\"re.match (digit at start): {digit_start_match}\") # Will be None\n\n# --- re.sub(): Substitute patterns ---\n# Replace phone numbers with '[PHONE_REDACTED]'\nphone_pattern = r'\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}'\ncleaned_text = re.sub(phone_pattern, '[PHONE_REDACTED]', text)\nprint(f\"re.sub (phone numbers redacted): {cleaned_text}\")\n\n# --- Using groups to extract parts of a match ---\ndate_pattern = r'(\\d{4})-(\\d{2})-(\\d{2})'\nfirst_date_match = re.search(date_pattern, text)\nif first_date_match:\n    print(f\"\\nre.search with groups (first date): {first_date_match.group(0)}\") # Full match\n    print(f\"  Year: {first_date_match.group(1)}\")\n    print(f\"  Month: {first_date_match.group(2)}\")\n    print(f\"  Day: {first_date_match.group(3)}\")\n    print(f\"  Groups as tuple: {first_date_match.groups()}\")\n\n# re.findall with groups returns list of tuples\nall_dates = re.findall(date_pattern, text)\nprint(f\"re.findall with groups (all dates): {all_dates}\")",
        "breakdown": [
          {
            "line": "import re",
            "explanation": "Imports the regular expression module."
          },
          {
            "line": "email_pattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'",
            "explanation": "Defines a raw string (`r'...'`) for an email address pattern. `\\b` for word boundaries, `[chars]+` for one or more of specified characters, `\\.` for a literal dot, `@` and `.` are literals."
          },
          {
            "line": "match = re.search(email_pattern, text)",
            "explanation": "`re.search()` scans through the string for the *first* location where the regex pattern produces a match. Returns a match object or `None`."
          },
          {
            "line": "print(f\"... {match.group(0)}\")",
            "explanation": "If a match is found, `match.group(0)` returns the entire matched string."
          },
          {
            "line": "all_emails = re.findall(email_pattern, text)",
            "explanation": "`re.findall()` finds *all* non-overlapping matches of the pattern in the string and returns them as a list of strings."
          },
          {
            "line": "numbers = re.findall(r'\\d+', text)",
            "explanation": "Finds sequences of one or more digits (`\\d+`)."
          },
          {
            "line": "digit_start_match = re.match(r'\\d+', text)",
            "explanation": "`re.match()` attempts to match the pattern only at the *beginning* of the string. Returns a match object or `None`."
          },
          {
            "line": "phone_pattern = r'\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}'",
            "explanation": "Regex for phone numbers. `\\(` and `\\)` match literal parentheses; `?` makes them optional. `[\\s-]?` matches an optional space or hyphen. `\\d{3}` matches exactly three digits."
          },
          {
            "line": "cleaned_text = re.sub(phone_pattern, '[PHONE_REDACTED]', text)",
            "explanation": "`re.sub()` replaces all occurrences of the pattern found in the `text` with the string `'[PHONE_REDACTED]'`."
          },
          {
            "line": "date_pattern = r'(\\d{4})-(\\d{2})-(\\d{2})'",
            "explanation": "Regex for YYYY-MM-DD dates. Parentheses `()` create capturing groups, allowing individual parts of the match to be extracted."
          },
          {
            "line": "print(f\"  Year: {first_date_match.group(1)}\")",
            "explanation": "Accesses the content of the first capturing group (the year). `group(0)` is the full match, `group(1)` is the first group, etc."
          },
          {
            "line": "print(f\"  Groups as tuple: {first_date_match.groups()}\")",
            "explanation": "`groups()` returns a tuple containing all the captured subgroups."
          },
          {
            "line": "all_dates = re.findall(date_pattern, text)",
            "explanation": "When `re.findall()` is used with a pattern containing capturing groups, it returns a list of tuples, where each tuple contains the strings captured by the groups."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Always use raw strings (`r\"pattern\"`) for regex to prevent backslash interpretation issues by Python itself.",
          "`re.match()` anchors the pattern to the beginning of the string, while `re.search()` looks for the first match anywhere.",
          "`re.findall()` returns a list of all non-overlapping matches. If groups are present, it returns a list of tuples (one tuple per match, containing group values).",
          "`re.sub(pattern, repl, string)` replaces matches of `pattern` with `repl`.",
          "Common metacharacters: `.` (any char except newline), `*` (0 or more), `+` (1 or more), `?` (0 or 1), `[]` (character set), `()` (grouping), `|` (OR).",
          "Common special sequences: `\\d` (digit), `\\D` (non-digit), `\\w` (word char), `\\W` (non-word char), `\\s` (whitespace), `\\S` (non-whitespace), `\\b` (word boundary), `\\B` (non-word boundary).",
          "Flags like `re.IGNORECASE` (or `re.I`) can modify matching behavior."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which `re` module function would you use to find all occurrences of a specific pattern within a string?",
            "options": [
              "`re.match()`",
              "`re.search()`",
              "`re.findall()`",
              "`re.sub()`"
            ],
            "correctIndex": 2,
            "explanation": "`re.findall()` returns a list containing all non-overlapping matches of the pattern in the string. `re.match()` only checks the beginning, `re.search()` finds the first, and `re.sub()` replaces."
          },
          {
            "question": "What is the purpose of using a raw string (e.g., `r'\\d+'`) for a regular expression pattern in Python?",
            "options": [
              "To make the pattern case-insensitive.",
              "To define the pattern using hexadecimal values.",
              "To prevent Python from interpreting backslashes as escape sequences.",
              "To compile the regex pattern for faster execution."
            ],
            "correctIndex": 2,
            "explanation": "Raw strings (prefixed with `r`) tell Python to treat backslashes `\\` as literal characters rather than escape sequences (e.g., `\\n` for newline). This is crucial for regex patterns, which heavily rely on backslashes for special sequences like `\\d` (digit), preventing conflicts with Python's own escape rules."
          },
          {
            "question": "What does the regex pattern `^\\w+\\s\\d+$` match?",
            "options": [
              "Any string containing a word character, followed by a space, followed by a digit.",
              "A string that starts with one or more word characters, followed by a single space, followed by one or more digits, and ends there.",
              "A string that starts with a word, followed by a space and then a number, anywhere in the string.",
              "A string that contains only word characters and digits, separated by a space."
            ],
            "correctIndex": 1,
            "explanation": "`^` anchors the match to the start of the string. `\\w+` matches one or more word characters. `\\s` matches a single whitespace character. `\\d+` matches one or more digits. `$` anchors the match to the end of the string. So, it matches an entire string that follows this exact pattern."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "In what data science scenarios are regular expressions particularly useful?",
        "answer": "Regular expressions are invaluable in many data science scenarios, particularly for text pre-processing and feature engineering. Examples include: **Data Cleaning:** Removing unwanted characters, standardizing formats (e.g., dates, phone numbers). **Information Extraction:** Pulling specific entities like email addresses, URLs, prices, or product IDs from unstructured text. **Text Parsing:** Breaking down log files or complex strings into structured components. **Validation:** Checking if user input or data points conform to a specific format (e.g., ISBNs, social security numbers). **Tokenization:** Splitting text into words or sub-word units based on custom rules.",
        "difficulty": "Fresher",
        "category": "Scenario"
      },
      {
        "question": "Explain the difference between `re.match()` and `re.search()` in Python.",
        "answer": "Both `re.match()` and `re.search()` attempt to find a match for a regex pattern within a string, but their behavior regarding the starting position of the search differs. `re.match()` only attempts to match the pattern at the *beginning* of the string. If the pattern is not found at the very first character, `re.match()` returns `None`. In contrast, `re.search()` scans through the entire string (or a specified substring) from left to right, finding the *first* location where the pattern matches. So, `re.search()` is more general-purpose for finding patterns anywhere, while `re.match()` is useful when you need to confirm that a string *starts* with a specific pattern.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "You have a string containing multiple dates in `YYYY-MM-DD` format. How would you extract all years from these dates using `re.findall()` with capturing groups?",
        "answer": "I would define a regex pattern with a capturing group specifically for the year. For example, `r'(\\d{4})-\\d{2}-\\d{2}'`. When `re.findall()` is used with a pattern that contains capturing groups, it returns a list of tuples, where each tuple represents a match and contains the strings captured by the groups. In this case, each tuple would contain a single element: the year. If I only needed the years as a flat list, I could iterate through the resulting tuples or use a list comprehension. For instance, `years = [year_tuple[0] for year_tuple in re.findall(r'(\\d{4})-\\d{2}-\\d{2}', text)]`.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "logging-configuration-management",
    "slug": "logging-configuration-management",
    "title": "Robust Python Applications: Logging and Configuration",
    "description": "Implement effective logging for monitoring and debugging, and manage application configurations using Python's `logging` module and best practices for flexible deployments.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 70,
    "tags": [
      "logging",
      "configuration",
      "robustness",
      "best practices",
      "production"
    ],
    "sections": {
      "what": {
        "text": "In any non-trivial Python application, especially in data science pipelines or machine learning services, robust error handling and monitoring are paramount. While exception handling (`try-except`) deals with immediate errors, `logging` provides a persistent record of events, status, and diagnostic messages during an application's lifecycle. Python's `logging` module is a powerful and flexible framework for emitting log messages at different severity levels (DEBUG, INFO, WARNING, ERROR, CRITICAL). These messages can be directed to various destinations, such as the console, files, network sockets, or even email. Proper logging is essential for debugging issues in production, understanding application behavior, and auditing events.\n\nAlongside logging, effective configuration management is vital for building flexible and maintainable applications. Hardcoding parameters like database credentials, API keys, file paths, or model hyperparameters makes applications inflexible and difficult to deploy across different environments (development, staging, production). Configuration management involves externalizing these parameters. Common strategies include using environment variables (especially for sensitive data), configuration files (e.g., `.ini` with `configparser`, YAML, JSON), and dedicated configuration libraries (like `Pydantic BaseSettings` for type-safe validation). The goal is to separate configuration from code, allowing the application to behave differently without code changes, enhancing portability and security.",
        "eli5": "Imagine your code is a secret agent doing important missions. 'Logging' is like giving the agent a diary to write down everything important that happens, good or bad. If something goes wrong, you can read the diary to figure out what happened. Different things have different importance levels: a 'DEBUG' message is like drawing a tiny map of where they went, 'ERROR' is like shouting 'HELP!'. 'Configuration' is like giving the agent different mission briefs for different situations. One brief might say 'use the red car', another says 'use the blue car'. The agent doesn't change *how* they do the mission, just some details, so they can adapt to new situations easily.",
        "points": [
          "Logging provides a structured record of events, status, and diagnostics, complementing exception handling.",
          "Python's `logging` module supports various severity levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
          "Log messages can be directed to multiple handlers (console, file, network) and formatted.",
          "Configuration management externalizes application parameters from code.",
          "Common config sources: environment variables (for secrets), config files (INI, YAML, JSON), command-line arguments.",
          "Separating config from code improves flexibility, portability, and security across environments."
        ]
      },
      "code": {
        "code": "import logging\nimport os\nfrom configparser import ConfigParser\n\n# --- Logging Example ---\n\n# 1. Basic configuration (console output)\n# logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')\n\n# 2. More advanced configuration with file handler\n# Create a logger object\nlogger = logging.getLogger(__name__)\nlogger.setLevel(logging.DEBUG) # Set the lowest level to capture all messages\n\n# Create a console handler and set level to INFO\nch = logging.StreamHandler()\nch.setLevel(logging.INFO)\n\n# Create a file handler and set level to DEBUG\n# Ensure 'app.log' is created in a writable directory or specify a full path\nlog_file_path = os.path.join(os.getcwd(), 'app.log')\nfh = logging.FileHandler(log_file_path)\nfh.setLevel(logging.DEBUG)\n\n# Create a formatter and add it to the handlers\nformatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')\nch.setFormatter(formatter)\nfh.setFormatter(formatter)\n\n# Add the handlers to the logger\nlogger.addHandler(ch)\nlogger.addHandler(fh)\n\ndef simulate_data_processing(data_size):\n    logger.info(f\"Starting data processing for {data_size} records.\")\n    if data_size < 100:\n        logger.debug(\"Data size is small, performing quick check.\")\n    else:\n        logger.warning(\"Large data size detected, this might take a while.\")\n    \n    try:\n        result = 100 / (data_size - 50) # Simulate potential division by zero\n        logger.info(f\"Processing step 1 complete. Intermediate result: {result:.2f}\")\n        # ... more processing ...\n        logger.debug(\"Detailed step X complete.\")\n        logger.info(\"Data processing finished successfully.\")\n    except ZeroDivisionError:\n        logger.error(\"Critical error: Division by zero occurred!\")\n    except Exception as e:\n        logger.critical(f\"An unexpected critical error occurred: {e}\", exc_info=True)\n\nprint(\"--- Logging Output (check console and app.log) ---\")\nsimulate_data_processing(20)\nsimulate_data_processing(100)\nsimulate_data_processing(50) # This will cause an error\n\n# --- Configuration Management Example (configparser) ---\n\n# 1. Create a sample config file (config.ini)\nconfig_content = \"\"\"\n[database]\nhost = localhost\nport = 5432\nuser = admin\npassword = secret\n\n[api]\nendpoint = https://api.example.com\nversion = v1\nrate_limit_per_minute = 60\n\"\"\"\n\nconfig_file_path = 'config.ini'\nwith open(config_file_path, 'w') as f:\n    f.write(config_content)\n\n# 2. Read configuration from the file\nconfig = ConfigParser()\nconfig.read(config_file_path)\n\nprint(\"\\n--- Configuration Management Output ---\")\n\n# Accessing database settings\ndb_host = config['database']['host']\ndb_port = config['database'].getint('port') # Use getint for integer values\ndb_user = config['database']['user']\n# For sensitive data, better to use environment variables and not store directly in config files\ndb_password = os.environ.get('DB_PASSWORD', config['database']['password']) \n\nlogger.info(f\"Database Host: {db_host}, Port: {db_port}, User: {db_user}\")\nlogger.info(f\"Using DB_PASSWORD from environment: {db_password == os.environ.get('DB_PASSWORD')}\")\n\n# Accessing API settings\napi_endpoint = config['api']['endpoint']\napi_version = config['api']['version']\napi_rate_limit = config['api'].getint('rate_limit_per_minute')\n\nlogger.info(f\"API Endpoint: {api_endpoint}, Version: {api_version}, Rate Limit: {api_rate_limit}\")\n\n# Clean up config file (optional)\nos.remove(config_file_path)\n\n# Demonstrate environment variables (set before running script)\n# For example, in bash: export APP_ENV='production'\napp_environment = os.getenv('APP_ENV', 'development')\nlogger.info(f\"Application running in environment: {app_environment}\")",
        "breakdown": [
          {
            "line": "import logging\nimport os\nfrom configparser import ConfigParser",
            "explanation": "Imports the logging module, os module for environment variables/path, and `ConfigParser` for `.ini` files."
          },
          {
            "line": "logger = logging.getLogger(__name__)",
            "explanation": "Gets a logger instance. `__name__` ensures a unique logger for this module, making it easier to manage logging from different parts of an application."
          },
          {
            "line": "logger.setLevel(logging.DEBUG)",
            "explanation": "Sets the lowest severity level that this logger will process. `DEBUG` means all messages (DEBUG, INFO, WARNING, ERROR, CRITICAL) will be passed on to handlers."
          },
          {
            "line": "ch = logging.StreamHandler()\nch.setLevel(logging.INFO)",
            "explanation": "Creates a `StreamHandler` (for console output) and sets its level to `INFO`. This handler will only display INFO, WARNING, ERROR, CRITICAL messages."
          },
          {
            "line": "fh = logging.FileHandler(log_file_path)\nfh.setLevel(logging.DEBUG)",
            "explanation": "Creates a `FileHandler` (for writing to a file) and sets its level to `DEBUG`. This handler will write all messages to `app.log`."
          },
          {
            "line": "formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')",
            "explanation": "Defines the format for log messages, including timestamp, logger name, level, and the message itself."
          },
          {
            "line": "ch.setFormatter(formatter)\nfh.setFormatter(formatter)",
            "explanation": "Applies the defined formatter to both the console and file handlers."
          },
          {
            "line": "logger.addHandler(ch)\nlogger.addHandler(fh)",
            "explanation": "Adds the configured handlers to the logger. A logger can have multiple handlers, sending messages to different destinations."
          },
          {
            "line": "logger.info(f\"Starting data processing...\")",
            "explanation": "Emits an INFO level log message. This message will be handled by both console and file handlers because it meets their respective levels."
          },
          {
            "line": "logger.debug(\"Data size is small...\")",
            "explanation": "Emits a DEBUG level log message. This will be written to the file handler (level DEBUG) but not printed to the console handler (level INFO)."
          },
          {
            "line": "logger.error(\"Critical error...\")",
            "explanation": "Emits an ERROR level log message, suitable for recoverable but significant issues."
          },
          {
            "line": "logger.critical(f\"An unexpected critical error...\", exc_info=True)",
            "explanation": "Emits a CRITICAL level log message, indicating a severe error. `exc_info=True` automatically adds exception information (traceback) to the log message."
          },
          {
            "line": "config_file_path = 'config.ini'\nwith open(config_file_path, 'w') as f:\n    f.write(config_content)",
            "explanation": "Creates a sample `config.ini` file for demonstration purposes."
          },
          {
            "line": "config = ConfigParser()\nconfig.read(config_file_path)",
            "explanation": "Initializes a `ConfigParser` object and reads the configuration from the specified `.ini` file."
          },
          {
            "line": "db_host = config['database']['host']",
            "explanation": "Accesses a configuration value using dictionary-like access (`section_name['key']`)."
          },
          {
            "line": "db_port = config['database'].getint('port')",
            "explanation": "`getint()` is used to retrieve a configuration value and parse it as an integer, ensuring correct data type."
          },
          {
            "line": "db_password = os.environ.get('DB_PASSWORD', config['database']['password'])",
            "explanation": "Demonstrates prioritizing environment variables (e.g., for sensitive data like passwords) over values in config files if the environment variable is set."
          },
          {
            "line": "app_environment = os.getenv('APP_ENV', 'development')",
            "explanation": "Retrieves the value of an environment variable `APP_ENV`. If it's not set, it defaults to 'development'."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Python's `logging` module hierarchy: Logger -> Handlers -> Formatters.",
          "Logging levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) indicate message severity.",
          "A logger's level filters messages before sending to handlers; a handler's level filters messages it receives.",
          "`StreamHandler` sends logs to console (stderr), `FileHandler` to a file.",
          "Use `logging.basicConfig()` for simple setups; use `logging.getLogger()` for more complex, modular applications.",
          "Configuration should be externalized from code using environment variables (for secrets/per-env), config files (INI, YAML, JSON), or specific libraries.",
          "Always prioritize environment variables for sensitive information like API keys or database credentials to avoid hardcoding or committing them to version control.",
          "`configparser` is good for simple `.ini` files; for more complex structures, consider YAML or JSON files combined with appropriate parsers."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which logging level in Python typically indicates that an event has occurred that might be of interest, but doesn't necessarily signify a problem?",
            "options": [
              "`logging.DEBUG`",
              "`logging.INFO`",
              "`logging.WARNING`",
              "`logging.ERROR`"
            ],
            "correctIndex": 1,
            "explanation": "`logging.INFO` is used for general information about the application's progress or significant events that are not errors but are important for monitoring."
          },
          {
            "question": "What is the primary reason for using environment variables to manage sensitive configuration data like API keys or database passwords?",
            "options": [
              "Environment variables are faster to access than file-based configurations.",
              "They are automatically encrypted by the operating system.",
              "They keep sensitive information out of version control systems and allow easy changes across environments.",
              "They provide a structured format for complex data types."
            ],
            "correctIndex": 2,
            "explanation": "Environment variables are a common and effective way to store sensitive data because they are not typically committed to version control, and they can be easily set and changed per deployment environment without modifying the application's code, thus enhancing security and flexibility."
          },
          {
            "question": "If a logger's level is set to `WARNING` and a handler's level is set to `INFO`, which messages will the handler process?",
            "options": [
              "DEBUG, INFO, WARNING, ERROR, CRITICAL",
              "INFO, WARNING, ERROR, CRITICAL",
              "WARNING, ERROR, CRITICAL",
              "ERROR, CRITICAL"
            ],
            "correctIndex": 2,
            "explanation": "A message must meet *both* the logger's level *and* the handler's level to be processed. Here, the logger filters out DEBUG and INFO messages. The remaining messages (WARNING, ERROR, CRITICAL) are then passed to the handler, which accepts INFO and above. Thus, only WARNING, ERROR, and CRITICAL messages will be processed by this handler."
          }
        ]
      }
    },
    "interviewQuestions": [
      {
        "question": "What is the purpose of Python's `logging` module, and how does it differ from simple `print()` statements for debugging?",
        "answer": "The `logging` module provides a flexible framework for emitting event messages, status updates, and diagnostic information from an application, far beyond what `print()` statements offer. Key differences: 1. **Severity Levels:** Logging allows messages to be categorized by importance (DEBUG, INFO, WARNING, ERROR, CRITICAL), enabling filtering. 2. **Output Destinations:** Logs can be directed to multiple destinations (console, files, network, etc.) simultaneously, while `print()` only goes to stdout. 3. **Formatters:** Logs can be consistently formatted with timestamps, module names, levels, etc. 4. **Granularity:** Different parts of an application can have their own loggers with specific configurations. 5. **Persistence:** Logs provide a persistent record, crucial for post-mortem debugging and auditing in production environments.",
        "difficulty": "Mid",
        "category": "Conceptual"
      },
      {
        "question": "How would you handle configuration for a data processing script that needs to run in both a local development environment and a production cloud environment, including sensitive credentials?",
        "answer": "For configuration, I would employ a layered approach. For non-sensitive parameters (like file paths, processing options), I'd use configuration files (e.g., `config.ini` with `configparser` or a YAML file) that are version-controlled but potentially have environment-specific overrides. For sensitive credentials (database passwords, API keys), I would exclusively use environment variables (e.g., `DB_PASSWORD`, `API_KEY`). My script would first attempt to read from environment variables using `os.getenv()`, falling back to values from a config file if the environment variable is not set. This keeps secrets out of source control and allows for flexible deployment across environments, as each environment can set its own variables without code changes.",
        "difficulty": "Mid",
        "category": "Scenario"
      },
      {
        "question": "Explain the concept of loggers, handlers, and formatters in the Python `logging` module, and how they interact.",
        "answer": "In Python's `logging` module: \n- A **Logger** is the entry point for logging. It's the object you call (`logger.info()`, `logger.error()`) to send log messages. Each logger has a `level` (e.g., `DEBUG`, `INFO`) that acts as a threshold: messages below this level are ignored.\n- **Handlers** are responsible for sending log messages to specific destinations. Examples include `StreamHandler` (for console), `FileHandler` (for files), `SMTPHandler` (for email), etc. Each handler also has a `level` that filters messages it receives from the logger.\n- **Formatters** specify the layout of log records in the final output. They define what information (timestamp, logger name, level, message) and in what order it appears.\n\nTheir interaction: A log message is created by a **Logger**. If its severity is at or above the logger's level, it's passed to all registered **Handlers**. Each handler then checks if the message's severity is at or above its own level. If it passes, the handler uses its associated **Formatter** to structure the message before sending it to its destination.",
        "difficulty": "Senior",
        "category": "Conceptual"
      }
    ]
  },
  {
    "id": "python-testing-unittest-pytest",
    "slug": "python-testing-unittest-pytest",
    "title": "Testing Python Code: unittest and pytest",
    "description": "Learn the fundamentals of writing robust unit tests and integration tests in Python using the built-in `unittest` module and the popular third-party `pytest` framework, crucial for building reliable data science applications.",
    "difficulty": "Intermediate",
    "estimatedMinutes": 75,
    "tags": [
      "testing",
      "unit testing",
      "pytest",
      "unittest",
      "software quality",
      "TDD",
      "data science best practices"
    ],
    "sections": {
      "what": {
        "text": "In the world of data science, where models predict critical outcomes and data pipelines transform invaluable information, ensuring the correctness and reliability of your code is paramount. Testing is not merely a software engineering best practice; it's a data science imperative for reproducibility, model validation, and safe refactoring. This topic explores the essential techniques for testing Python code using two prominent frameworks: the built-in `unittest` module and the widely adopted `pytest`.\n\n`unittest` is Python's standard library for creating unit tests, following an xUnit-style architecture. It provides a rich set of assertion methods, test fixtures for setup and teardown, and test runners. While powerful, its class-based structure can sometimes feel verbose, especially for simpler tests. Understanding `unittest` provides a strong foundation in testing principles and is valuable for interacting with older codebases or environments where external dependencies are restricted.\n\n`pytest`, on the other hand, offers a more modern and Pythonic approach to testing. It emphasizes simplicity, readability, and flexibility, allowing developers to write tests as simple functions. `pytest` automatically discovers tests, provides powerful fixtures for managing test state, and supports a vast ecosystem of plugins for everything from code coverage to parallel test execution. Its capabilities make it a preferred choice for new projects and complex data science workflows, significantly improving developer productivity and test maintainability. By mastering both, you'll be equipped to write high-quality, verifiable code that stands up to the rigors of data-driven development.",
        "eli5": "Imagine you're building a fancy LEGO house (your Python code). Testing is like gently shaking, pushing, or knocking on different parts of the house before you show it to your friends. If a piece falls off, you fix it right away before anyone notices. `unittest` is like having a very detailed instruction book for how to test each specific brick. `pytest` is like having a super smart friend who just tells you if your house is sturdy just by looking, and you don't need a complicated rulebook.",
        "points": [
          "Testing is crucial for reliable, reproducible, and maintainable data science code.",
          "Understand the difference between unit tests (small, isolated components) and integration tests (how components work together).",
          "`unittest` is Python's built-in testing framework, based on an xUnit style (class-based).",
          "`pytest` is a popular third-party framework known for its simplicity, powerful fixtures, and extensibility (function-based).",
          "Learn to use assertions to check expected outcomes in tests.",
          "Master test fixtures for setting up and tearing down test environments efficiently.",
          "Compare `unittest` and `pytest` to choose the right tool for different project needs."
        ]
      },
      "code": {
        "code": "# -*- coding: utf-8 -*-\nimport unittest\nimport pytest\n\n# --- Example function to be tested ---\ndef analyze_data(data_list):\n    \"\"\"\n    Analyzes a list of numbers, returning the sum and average.\n    Returns (sum, average) or (None, None) if list is empty.\n    \"\"\"\n    if not data_list:\n        return None, None\n    total_sum = sum(data_list)\n    average = total_sum / len(data_list)\n    return total_sum, average\n\n# --- unittest Example ---\nclass TestAnalyzeDataUnittest(unittest.TestCase):\n    def test_positive_numbers(self):\n        # Test with a list of positive numbers\n        data = [1, 2, 3, 4, 5]\n        result_sum, result_avg = analyze_data(data)\n        self.assertEqual(result_sum, 15)\n        self.assertAlmostEqual(result_avg, 3.0)\n\n    def test_empty_list(self):\n        # Test with an empty list\n        result_sum, result_avg = analyze_data([])\n        self.assertIsNone(result_sum)\n        self.assertIsNone(result_avg)\n\n    def test_single_number(self):\n        # Test with a single number\n        data = [7]\n        result_sum, result_avg = analyze_data(data)\n        self.assertEqual(result_sum, 7)\n        self.assertEqual(result_avg, 7.0)\n\n# To run unittest tests from a script:\n# if __name__ == '__main__':\n#     unittest.main()\n\n# --- pytest Example ---\n# Fixture for common test data setup in pytest\n@pytest.fixture\ndef sample_data():\n    \"\"\"Provides a common list of data for tests.\"\"\"\n    return [10, 20, 30]\n\n\ndef test_analyze_positive_numbers_pytest():\n    # Test with positive numbers using pytest's simple assertion\n    data = [1, 2, 3, 4, 5]\n    result_sum, result_avg = analyze_data(data)\n    assert result_sum == 15\n    assert result_avg == pytest.approx(3.0) # pytest.approx for float comparisons\n\n\ndef test_analyze_empty_list_pytest():\n    # Test with an empty list\n    result_sum, result_avg = analyze_data([])\n    assert result_sum is None\n    assert result_avg is None\n\n\ndef test_analyze_data_with_fixture(sample_data):\n    # Test using the sample_data fixture\n    result_sum, result_avg = analyze_data(sample_data) # sample_data is [10, 20, 30]\n    assert result_sum == 60\n    assert result_avg == pytest.approx(20.0)\n\n# To run pytest tests from command line:\n# 1. Save this file as e.g., `test_analytics.py`\n# 2. Open terminal in the same directory\n# 3. Run: `pytest`",
        "breakdown": [
          {
            "line": "def analyze_data(data_list):",
            "explanation": "This is the simple Python function we want to test. It calculates the sum and average of a list of numbers."
          },
          {
            "line": "class TestAnalyzeDataUnittest(unittest.TestCase):",
            "explanation": "In `unittest`, tests are organized into classes that inherit from `unittest.TestCase`. Each method starting with `test_` is a separate test."
          },
          {
            "line": "self.assertEqual(result_sum, 15)",
            "explanation": "An assertion in `unittest`. `assertEqual` checks if two values are equal. `unittest.TestCase` provides many `assert` methods."
          },
          {
            "line": "self.assertIsNone(result_sum)",
            "explanation": "Another `unittest` assertion, specifically checking if a value is `None`."
          },
          {
            "line": "@pytest.fixture",
            "explanation": "A `pytest` decorator to define a fixture. Fixtures are functions that set up a test environment or provide common data for tests. `pytest` injects them automatically into test functions that request them by name."
          },
          {
            "line": "def test_analyze_positive_numbers_pytest():",
            "explanation": "In `pytest`, tests are simple functions that start with `test_`. No need for classes or inheritance unless structuring is desired."
          },
          {
            "line": "assert result_sum == 15",
            "explanation": "A `pytest` assertion. `pytest` uses standard Python `assert` statements, making tests more readable and less verbose."
          },
          {
            "line": "assert result_avg == pytest.approx(3.0)",
            "explanation": "When comparing floating-point numbers, direct equality can fail due to precision issues. `pytest.approx` provides a robust way to compare floats within an acceptable tolerance."
          },
          {
            "line": "def test_analyze_data_with_fixture(sample_data):",
            "explanation": "This test function receives `sample_data` as an argument. `pytest` automatically discovers the `sample_data` fixture and provides its return value to the test function."
          }
        ]
      },
      "examNotes": {
        "examNotes": [
          "Know the core differences: `unittest` is class-based with `self.assert*` methods; `pytest` is function-based with plain `assert` statements.",
          "Understand the purpose and usage of test fixtures in both frameworks (setup/teardown). `unittest` uses `setUp`/`tearDown` methods; `pytest` uses `@pytest.fixture`.",
          "Be familiar with common assertion methods (e.g., `assertEqual`/`assert`, `assertTrue`/`assert`, `assertIsNone`/`assert`).",
          "Remember how to run tests: `python -m unittest your_module.py` for `unittest` or simply `pytest` (after `pip install pytest`) from the terminal.",
          "Explain why `pytest.approx` is important for floating-point comparisons.",
          "Identify scenarios where one framework might be preferred over the other (e.g., `unittest` for existing projects or simple needs, `pytest` for flexibility, plugins, and modern development)."
        ]
      },
      "quiz": {
        "quiz": [
          {
            "question": "Which of the following is a primary reason to write unit tests for your data science code?",
            "options": [
              "To improve the aesthetic appeal of your code.",
              "To ensure that individual functions or components work correctly and in isolation.",
              "To speed up the execution time of your data analysis scripts.",
              "To automatically generate documentation for your project."
            ],
            "correctIndex": 1,
            "explanation": "Unit tests focus on verifying the correctness of the smallest testable parts of an application, ensuring that each component functions as expected independently."
          },
          {
            "question": "In `pytest`, how do you typically perform an assertion to check if two values are equal?",
            "options": [
              "Using `self.assertEqual(a, b)`",
              "Using `assert a == b`",
              "Using `test.assert_equals(a, b)`",
              "Using `pytest.equals(a, b)`"
            ],
            "correctIndex": 1,
            "explanation": "`pytest` leverages standard Python `assert` statements for its assertions, making tests more concise and readable compared to `unittest`'s explicit assertion methods."
          },
          {
            "question": "What is the main purpose of a `pytest` fixture?",
            "options": [
              "To define the main execution logic of a test.",
              "To set up a test environment or provide data that tests can use.",
              "To mark a test as skipped or expected to fail.",
              "To measure the performance of a test function."
            ],
            "correctIndex": 1,
            "explanation": "`pytest` fixtures are used to provide a reliable, consistent, and isolated environment for tests. They manage setup (like creating temporary files or database connections) and teardown."
          }
        ]
      }
    },
    "interviewQuestions": [
        {
          "question": "Why is testing important in a data science project, especially when working with models and data pipelines?",
          "answer": "Testing in data science is crucial for several reasons: it ensures the correctness of data transformations and model logic, preventing subtle errors that could lead to flawed insights or predictions. It's essential for reproducibility, allowing others (or future self) to verify results. Testing also provides confidence when refactoring code, ensuring that changes don't break existing functionality, which is vital in iteratively developing models. For productionizing models, tests act as a quality gate, verifying that the model behaves as expected under various conditions.",
          "difficulty": "Mid",
          "category": "Conceptual"
        },
        {
          "question": "When would you choose `pytest` over `unittest`, and vice-versa, for a new Python project?",
          "answer": "I would generally prefer `pytest` for new projects due to its simpler, more Pythonic syntax (plain `assert` statements), powerful fixture system for managing test setup/teardown, and vast plugin ecosystem (e.g., `pytest-cov`, `pytest-xdist`). It leads to more readable and maintainable tests. I would consider `unittest` in scenarios where external dependencies are restricted (as it's built-in), or if I'm integrating into an existing project that already extensively uses `unittest` to maintain consistency. For data science, `pytest`'s flexibility and ease of use often make it more appealing.",
          "difficulty": "Mid",
          "category": "Conceptual"
        },
        {
          "question": "Explain the concept of test fixtures and provide an example of how you might use one in a data science context.",
          "answer": "Test fixtures are a way to set up a baseline state or provide common resources needed by one or more tests. They ensure that each test starts from a known, clean state, making tests independent and reliable. In `unittest`, you'd use `setUp` and `tearDown` methods within a test class. In `pytest`, they are more flexible, defined as functions decorated with `@pytest.fixture`.\n\n**Example in Data Science (using `pytest`):**\nSuppose you have a model training function that requires a preprocessed dataset. Instead of loading and preprocessing the data in every test, you could use a fixture:\n\n```python\nimport pytest\nimport pandas as pd\n\n@pytest.fixture\ndef preprocessed_data():\n    # Simulate loading and preprocessing a small dataset\n    data = {'feature1': [1, 2, 3], 'feature2': [4, 5, 6]}\n    df = pd.DataFrame(data)\n    df['feature3'] = df['feature1'] + df['feature2'] # Simple preprocessing\n    return df\n\ndef test_model_training_on_valid_data(preprocessed_data):\n    # 'preprocessed_data' fixture is automatically provided here\n    # Simulate training and assert something about the model output\n    # model = train_model(preprocessed_data)\n    assert preprocessed_data.shape == (3, 3)\n    assert 'feature3' in preprocessed_data.columns\n```\nThis fixture ensures that `test_model_training_on_valid_data` always receives a consistent, preprocessed DataFrame without duplicating setup code.",
          "difficulty": "Mid",
          "category": "Conceptual"
        }
      ]
    }
];
