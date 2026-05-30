import { Topic } from '../../types/content';

export const pythonTopics: Topic[] = [
  {
    id: 'python-getting-started',
    slug: 'getting-started',
    title: 'Getting Started',
    description: "Anaconda Installation, VS Code setup, and creating virtual environments.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Welcome to **Python Programming!**\n\nBefore writing your first line of code, you need a robust development environment. This module walks you through installing Python, setting up Anaconda, configuring VS Code, and creating isolated Virtual Environments.\n\n### Anaconda vs Standard Python\nPython by itself is just the language runtime. However, in data science, you need hundreds of complex third-party libraries (like NumPy and Pandas) which often rely on C++ under the hood. Anaconda is a specialized distribution that comes pre-packaged with all these libraries, a package manager (`conda`), and GUI tools. Data scientists prefer Anaconda because it handles these complex dependency trees seamlessly, preventing the dreaded 'C extensions failed to compile' errors you often get with standard Python.\n\n### VS Code Integration\nVisual Studio Code (VS Code) is currently the most popular Integrated Development Environment (IDE). It is lightweight but endlessly customizable. By installing the official Python and Pylance extensions, VS Code transforms into a powerhouse, offering features like IntelliSense (smart autocomplete), real-time error checking, and integrated Jupyter Notebooks right inside your editor.\n\n### Virtual Environments (`venv` / `conda`)\nImagine building three different projects. Project A needs Python 3.8 and Pandas 1.0. Project B needs Python 3.11 and Pandas 2.0. If you install packages 'globally' on your machine, installing Project B's requirements will instantly break Project A! Virtual Environments solve this by creating an isolated, fenced-off directory for each project. You should *never* install packages globally. Always create a virtual environment first.\n\n### Solving Common Path Issues\nWhen you type `python` or `conda` into your terminal and get a 'Command Not Recognized' error, it means the executable file is not registered in your operating system's PATH environment variables. During installation, always ensure you check the box that says 'Add Anaconda to my PATH environment variable', or manually add the `Scripts` and `Library/bin` folders to your Windows Environment Variables.",
        eli5: "Think of Python as a set of tools. Anaconda is the giant toolbox that comes pre-organized with everything you need. VS Code is your workbench where you build things, and Virtual Environments are separate rooms in your house\u2014if an experiment blows up in one room, it doesn't destroy the whole house!"
      },
      why: {
        text: "A solid foundation prevents hours of frustrating debugging later. If your environment is misconfigured, even perfect code won't run. Mastering virtual environments ensures your code works consistently across different machines.",
        tip: "Always create a new virtual environment for every new project. It takes 10 seconds but saves hours of dependency conflicts."
      },
      code: {
        code: "# To verify installation inside Python:\nimport sys\nprint('Python version:', sys.version)\nprint('Executable path:', sys.executable)",
        breakdown: [
          { line: "import sys", explanation: "Imports the built-in system module, which provides access to variables and functions that interact strongly with the interpreter." },
          { line: "print('Python version:', sys.version)", explanation: "Accesses the 'version' attribute of the sys module to print exactly which version of Python is currently running." },
          { line: "print('Executable path:', sys.executable)", explanation: "Prints the absolute path of the Python executable. This is incredibly useful for verifying that your code is actually running inside your activated virtual environment and not the global Python install." },
        ]
      },
      examNotes: {
        examNotes: [
          "Anaconda is a distribution of Python and R for scientific computing.",
          "Virtual environments isolate package dependencies for different projects.",
          "VS Code is an IDE; Anaconda Navigator is a GUI for environment management.",
          "Interview Prep: Be able to explain the difference between `pip install` and `conda install`."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary purpose of a Python Virtual Environment?",
            options: ["To make Python run faster", "To isolate project dependencies and avoid version conflicts", "To run Python in the cloud", "To compile Python code to machine language"],
            correctIndex: 1,
            explanation: "Virtual environments create an isolated directory containing a specific Python version and set of packages, preventing conflicts with other projects."
          }
        ]
      }
    }
  },
  {
    id: 'python-basics',
    slug: 'basics',
    title: 'Python Basics',
    description: "Syntax, semantics, variables, basic data types, and operators in Python.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "This module covers the core **Syntax and Semantics** of Python. You will learn how to declare variables, understand how Python handles memory dynamically, and explore fundamental data types.\n\n### Variables & Dynamic Typing\nUnlike C++ or Java, Python does not require explicit type declarations. You don't have to tell Python that a variable is an integer; it figures it out automatically when the code runs. In Python, variables aren't 'buckets' that hold data. Instead, they act as 'tags' or 'references' pointing to objects sitting in memory. This means you can assign a variable to a number, and then immediately reassign it to a string without throwing an error.\n\n### Basic Data Types\nThe foundation of your data lies in simple types. Integers (`int`) are whole numbers. Floating-point numbers (`float`) handle decimals. Strings (`str`) handle text and are strictly immutable (they cannot be changed in-place). Booleans (`bool`) represent binary truth, being exactly `True` or `False`. Understanding the limitations and methods of these primitives is required before moving to complex structures.\n\n### Operators\nOperators are symbols that perform operations on variables. Arithmetic operators handle math (`+`, `-`, `*`, `/`). Notably, Python includes floor division (`//`) which divides and rounds down to the nearest whole number, and the modulo operator (`%`) which returns the remainder of a division. Comparison operators (`==`, `!=`, `>`, `<`) return boolean values. Logical operators (`and`, `or`, `not`) allow you to combine multiple boolean expressions into complex logic gates.\n\n### Type Casting\nOften, data comes in the wrong format\u2014like receiving a user's age as a string `'25'` instead of a number `25`. Type casting is the process of manually converting one data type into another using built-in functions like `int()`, `float()`, and `str()`. If the conversion is mathematically impossible (like `int('hello')`), Python will throw a ValueError.",
        eli5: "Programming is just giving instructions to a computer. Variables are like labelled boxes where you store information (numbers, text). Operators are the actions you perform on those boxes (like adding two numbers together)."
      },
      why: {
        text: "These are the absolute building blocks. You cannot build complex machine learning models or web apps without deeply understanding how data is stored, modified, and evaluated at the lowest level.",
        tip: "In Python, strings can be enclosed in single quotes ('hello') or double quotes (\"hello\"). They are completely identical, but consistency is key!"
      },
      code: {
        code: "user_age_str = \"25\"\nmultiplier = 1.5\n\n# Type Casting\nuser_age = int(user_age_str)\n\n# Arithmetic Operator\nfinal_score = int(user_age * multiplier)\n\n# Logical Evaluation\ncan_access = (user_age >= 18) and (final_score > 30)\nprint(f\"Access Granted: {can_access}\")",
        breakdown: [
          { line: "user_age_str = \"25\"", explanation: "Assigns the string literal '25' to the variable. It is text, not math." },
          { line: "user_age = int(user_age_str)", explanation: "Type casting: converts the string '25' into the mathematical integer 25 so we can do math on it." },
          { line: "final_score = int(user_age * multiplier)", explanation: "Multiplies 25 by 1.5 (yielding 37.5). Wrapping it in int() forces it to drop the decimal, becoming 37." },
          { line: "can_access = (user_age >= 18) and (final_score > 30)", explanation: "Evaluates two conditions. Since 25 is >= 18 (True) AND 37 is > 30 (True), the final boolean result is True." },
        ]
      },
      examNotes: {
        examNotes: [
          "Python is dynamically typed; types are checked at runtime.",
          "Floor division `//` always rounds down to the nearest integer.",
          "Strings are immutable; you cannot change a character in-place.",
          "Interview Trap: `bool(\"False\")` evaluates to `True` because it is a non-empty string."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the output of `9 // 2` in Python?",
            options: ["4.5", "4", "5", "Error"],
            correctIndex: 1,
            explanation: "The `//` operator performs floor division, truncating the decimal part and returning the largest integer less than or equal to the result."
          }
        ]
      }
    }
  },
  {
    id: 'python-control-flow',
    slug: 'control-flow',
    title: 'Control Flow',
    description: "Conditional statements (if, elif, else) and loops.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Control flow allows your program to make decisions and repeat tasks. Without it, scripts would only execute top-to-bottom once.\n\n### Conditional Logic (`if`, `elif`, `else`)\nConditional statements form the 'brain' of your program. They evaluate boolean expressions (statements that are either True or False) and execute specific blocks of code based on the result. The `if` block runs if the condition is True. The `elif` (else if) block checks a secondary condition if the first fails. Finally, the `else` block acts as a catch-all if absolutely none of the previous conditions were met. In Python, these blocks are defined entirely by indentation, not curly braces like in Java or C++.\n\n### For Loops\nA `for` loop in Python is technically an iterator. Unlike other languages where you define a counter (like `for(i=0; i<10; i++)`), Python's `for` loop is designed to iterate directly over the elements of a sequence (like a list, a string, or a dictionary). If you specifically need a counter, you combine the loop with the `range()` function, which generates a sequence of numbers on the fly.\n\n### While Loops\nA `while` loop continues to execute its block of code endlessly, as long as its condition evaluates to True. This makes it perfect for scenarios where you don't know exactly how many times the loop needs to run in advance (for example, waiting for a user to input the correct password, or waiting for a server to respond). Be careful: if the condition never becomes False, you will create an infinite loop that crashes your program!\n\n### Loop Control Statements\nSometimes you need precise control over how a loop executes. The `break` statement instantly kills the innermost loop and exits it entirely, regardless of the condition. The `continue` statement skips the rest of the current iteration and jumps immediately back to the top of the loop for the next cycle. Finally, `pass` does absolutely nothing\u2014it is a null placeholder used when the syntax requires a block of code, but you haven't written the logic yet.",
        eli5: "Control flow is like giving a computer a flowchart. 'IF it is raining, take an umbrella, ELSE wear sunglasses.' Loops are like telling it: 'FOR every shirt in the laundry basket, wash it.'"
      },
      why: {
        text: "Control flow is what makes programs 'smart'. It allows algorithms to adapt to different data inputs dynamically and automate repetitive tasks efficiently.",
        tip: "Python relies heavily on indentation (whitespace) to define code blocks. A single mismatched space can throw an IndentationError!"
      },
      code: {
        code: "score = 85\n\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelse:\n    grade = 'C'\n\nprint(f\"Final grade: {grade}\")\n\nfor i in range(1, 4):\n    if i == 2:\n        continue\n    print(f\"Processing item {i}\")",
        breakdown: [
          { line: "if score >= 90:", explanation: "Checks the first condition. Since 85 is not >= 90, this evaluates to False and the block is skipped." },
          { line: "elif score >= 80:", explanation: "Checks the secondary condition. 85 IS >= 80, so this evaluates to True. The code inside this block executes." },
          { line: "grade = 'B'", explanation: "Assigns the string 'B' to the variable grade. The subsequent 'else' block is completely ignored." },
          { line: "for i in range(1, 4):", explanation: "Starts a loop that will generate numbers from 1 up to (but not including) 4. So 'i' will be 1, 2, and 3." },
          { line: "if i == 2:", explanation: "Checks if the current iteration number is 2." },
          { line: "continue", explanation: "When i is 2, the continue statement executes, skipping the print statement below it and instantly jumping to i=3." },
          { line: "print(f\"Processing item {i}\")", explanation: "Uses an f-string to print the item. It will output for item 1 and item 3, but not item 2." },
        ]
      },
      examNotes: {
        examNotes: [
          "Indentation is syntactically significant in Python.",
          "`range(start, stop)` goes up to, but does not include, the `stop` value.",
          "`else` blocks can be used with `for` and `while` loops (executes if the loop completes without a `break`)."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What happens when a `break` statement is encountered inside a loop?",
            options: ["The program crashes", "The current iteration skips to the next one", "The loop terminates immediately", "The loop pauses for user input"],
            correctIndex: 2,
            explanation: "The `break` statement terminates the innermost loop immediately, and execution resumes at the next statement following the loop."
          }
        ]
      }
    }
  },
  {
    id: 'python-data-structures',
    slug: 'data-structures',
    title: 'Inbuilt Data Structures',
    description: "Lists, tuples, sets, dictionaries, and list comprehensions.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Data structures are specialized formats for organizing and storing data. Python provides four powerful built-in structures.\n\n### Lists (`[]`)\nLists are ordered, mutable collections. This means they maintain the order in which you inserted items, and you can change, add, or remove items after the list is created. Lists are extremely versatile and can hold mixed data types. You can also create them dynamically using **List Comprehensions**, which are highly optimized, one-line syntax for creating lists out of loops.\n\n### Tuples (`()`)\nTuples are exactly like lists, but they are **immutable**. Once you create a tuple, you cannot add, remove, or change its elements. Because they are fixed in size, Python can optimize them heavily under the hood, making them faster than lists. They are commonly used for data that shouldn't change, like coordinates or database connection strings.\n\n### Sets (`{}`)\nSets are unordered collections of **unique** elements. Under the hood, sets are implemented using hash tables. This means you cannot access elements by index (e.g., `my_set[0]` will fail), but checking if an item exists inside a set (`x in my_set`) takes O(1) constant time, making it lightning fast even for millions of items. Sets automatically remove duplicates.\n\n### Dictionaries (`{key: value}`)\nDictionaries are Key-Value stores. They are also implemented as hash tables. You provide a 'key' (which must be an immutable type like a string or number) and map it to a 'value' (which can be anything, even another dictionary). Looking up a value by its key is incredibly fast. Dictionaries are the backbone of JSON data parsing and are ubiquitous in web development and data science.",
        eli5: "List = an ordered shopping list (you can cross things off). Tuple = coordinates carved in stone (you can't change it). Set = a jar of unique marbles (no duplicates allowed). Dictionary = a phone book (look up a name to get a number)."
      },
      diagram: {
        chart: `graph TD
  A[Python Collections] --> B{Ordered?}
  B -- Yes --> C{Mutable?}
  C -- Yes --> L[List]
  C -- No --> T[Tuple]
  B -- No --> D{Key-Value?}
  D -- Yes --> DI[Dictionary]
  D -- No --> S[Set]`
      },
      why: {
        text: "Choosing the right data structure dictates the performance of your algorithm. Using a list instead of a set for membership checking on a million items will grind your application to a halt. Using dictionaries allows you to structure complex, hierarchical data elegantly.",
        tip: "List comprehensions are faster than traditional `for` loops because they are optimized in C under the hood. Use them for simple transformations!"
      },
      code: {
        code: "# List Comprehension\nsquares = [x**2 for x in range(5)]\n\n# Tuple Unpacking\ncoordinates = (34.05, -118.24)\nlat, lon = coordinates\n\n# Set Operations (Unique items)\nunique_ids = {101, 102, 102, 103}\n\n# Dictionary Fast Lookup\nuser_db = {\n    'alex': {'age': 25, 'role': 'admin'},\n    'sam': {'age': 30, 'role': 'user'}\n}\nprint(user_db['alex']['role'])",
        breakdown: [
          { line: "squares = [x**2 for x in range(5)]", explanation: "A list comprehension that iterates x from 0 to 4, squares each value, and builds a new list: [0, 1, 4, 9, 16]." },
          { line: "lat, lon = coordinates", explanation: "Tuple unpacking. Python automatically assigns 34.05 to 'lat' and -118.24 to 'lon' based on their position in the tuple." },
          { line: "unique_ids = {101, 102, 102, 103}", explanation: "Creates a set. Since sets only store unique values, the duplicate '102' is automatically discarded. The set becomes {101, 102, 103}." },
          { line: "print(user_db['alex']['role'])", explanation: "Accesses the dictionary using the key 'alex', which returns another nested dictionary. It then accesses that nested dictionary using the key 'role', outputting 'admin'." },
        ]
      },
      examNotes: {
        examNotes: [
          "Lists are mutable, Tuples are immutable.",
          "Sets do not record element position or order of insertion.",
          "Dictionary keys must be hashable (immutable types like strings, numbers, tuples).",
          "Checking `x in my_set` is O(1), while `x in my_list` is O(N)."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Which data structure provides O(1) average time complexity for checking if an item exists?",
            options: ["List", "Tuple", "Set", "Array"],
            correctIndex: 2,
            explanation: "Sets (and dictionaries) are implemented using hash tables in Python, allowing for extremely fast O(1) membership testing."
          }
        ]
      }
    }
  },
  {
    id: 'python-functions',
    slug: 'functions',
    title: 'Functions in Python',
    description: "Defining functions, lambda, map, filter, and practice exercises.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Functions are reusable blocks of code that perform a specific task. They prevent code duplication and make programs modular.\n\n### Defining Functions (`def`)\nA function is defined using the `def` keyword, followed by the function name and parentheses. Inside the parentheses, you define **parameters**\u2014variables the function expects to receive. When you call the function, the actual data you pass in are called **arguments**. Functions can use the `return` keyword to pass data back to the caller. If no `return` statement is used, the function returns `None`.\n\n### `*args` and `**kwargs`\nSometimes you don't know how many arguments will be passed to your function. Python solves this with `*args` (which packs all extra positional arguments into a Tuple) and `**kwargs` (which packs all extra keyword arguments into a Dictionary). This allows you to build incredibly flexible, dynamic functions.\n\n### Lambda Functions\nA lambda function is a small, anonymous function defined using the `lambda` keyword. It can take any number of arguments, but can only have one expression. They are typically used for short, throwaway operations where defining a full `def` block would be overkill.\n\n### Higher-Order Functions (`map`, `filter`)\nHigher-order functions are functions that take *other* functions as arguments. \n- `map(func, iterable)` applies the given function to every item in the iterable (like a list), returning a new map object.\n- `filter(func, iterable)` applies a boolean function to every item. If the function returns True, the item is kept; if False, it is discarded.",
        eli5: "A function is like a blender. You put ingredients in (arguments), the blender does a specific job (the code inside), and gives you a smoothie back (return value)."
      },
      why: {
        text: "Functions enforce the DRY principle (Don't Repeat Yourself). Without functions, scripts become impossibly long, hard to read, and a nightmare to debug. They allow you to build complex programs by snapping together small, tested blocks of logic.",
        tip: "A function should ideally do ONE thing and do it well. If your function is 200 lines long and handles downloading, parsing, and saving data, it should be broken down into three separate functions."
      },
      code: {
        code: "def calculate_discount(price, discount=0.1):\n    return price * (1 - discount)\n\ndef sum_all(*args):\n    return sum(args)\n\nprices = [100, 150, 200]\ndiscounted = list(map(lambda x: x * 0.9, prices))\nexpensive = list(filter(lambda x: x > 100, discounted))",
        breakdown: [
          { line: "def calculate_discount(price, discount=0.1):", explanation: "Defines a function with a required parameter 'price' and an optional parameter 'discount' which defaults to 0.1 (10%) if not provided." },
          { line: "def sum_all(*args):", explanation: "The *args syntax allows the function to accept any number of positional arguments, packing them into a tuple named 'args'." },
          { line: "discounted = list(map(lambda x: x * 0.9, prices))", explanation: "Uses map() to apply a lambda function (which multiplies a number by 0.9) to every element in the 'prices' list, and wraps the result in a new list." },
          { line: "expensive = list(filter(lambda x: x > 100, discounted))", explanation: "Uses filter() to keep only the items in the 'discounted' list that are greater than 100. The lambda function acts as the boolean condition." },
        ]
      },
      examNotes: {
        examNotes: [
          "Default arguments are evaluated ONCE when the function is defined. Never use mutable types (like lists `[]`) as default arguments.",
          "`*args` packs arguments into a tuple. `**kwargs` packs keyword arguments into a dictionary.",
          "Lambda functions can only contain a single expression."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is it dangerous to use a mutable object (like a list `[]`) as a default argument in a function?",
            options: ["It throws a syntax error", "The list is shared across all calls to the function", "It makes the function run infinitely", "It converts the list to a tuple"],
            correctIndex: 1,
            explanation: "Default arguments are evaluated only once during function definition. If you modify the list, the changes persist across subsequent calls to the function, leading to massive bugs."
          }
        ]
      }
    }
  },
  {
    id: 'python-oops',
    slug: 'oops-concepts',
    title: 'OOPS Concepts',
    description: "Classes, objects, inheritance, polymorphism, encapsulation, abstraction, and magic methods.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data (attributes) and code (methods).\n\n### Classes & Objects\nA Class is a blueprint. It defines the properties and behaviors that a specific type of entity should have. An Object is an actual 'instance' of that blueprint built into memory. For example, `Car` is a class, but your specific red Toyota parked outside is the object.\n\n### Inheritance\nInheritance allows a new class (Child) to take on the attributes and methods of an existing class (Parent). This promotes massive code reuse. If you have an `Animal` class with a `breathe()` method, you can create a `Dog` class that inherits from `Animal`, meaning the Dog gets the `breathe()` method automatically without you writing it again.\n\n### Polymorphism\nPolymorphism means 'many forms'. It allows different classes to be treated as instances of the same class through a common interface. The most common form of this is Method Overriding: a child class can provide its own specific implementation of a method that is already provided by its parent class.\n\n### Encapsulation & Abstraction\nEncapsulation is the bundling of data with the methods that operate on that data, restricting direct access to some of the object's components. In Python, this is done by convention using an underscore `_variable` or double underscore `__variable` (name mangling). Abstraction means hiding complex implementation details and exposing only the necessary features to the user.\n\n### Magic (Dunder) Methods\nMagic methods (or double underscore methods) allow your custom objects to interact with built-in Python syntax. For example, if you define `__str__(self)` in your class, Python knows exactly what to print when someone calls `print(your_object)`. If you define `__len__(self)`, your object can be used with `len(your_object)`.",
        eli5: "A Class is like a blueprint for a car. It specifies it has 4 wheels and an engine. An Object is a specific physical car built from that blueprint (like your red Toyota)."
      },
      why: {
        text: "OOP helps model real-world entities logically. It makes large codebases highly modular, easier to maintain, and extremely reusable. It is the absolute backbone of major libraries like Scikit-Learn (where every model is a Class) and Pandas.",
        tip: "In Python, encapsulation is mostly by convention. A single underscore `_var` means 'please don't touch this', but it doesn't strictly prevent access like `private` variables in Java."
      },
      code: {
        code: "class Animal:\n    def __init__(self, name):\n        self.name = name  \n        self.__id = 1234  # Private attribute\n\n    def speak(self):\n        pass \n\nclass Dog(Animal):\n    def speak(self):\n        return f\"{self.name} says Woof!\"\n\nmy_dog = Dog(\"Buddy\")\nprint(my_dog.speak())\n# print(my_dog.__id) -> AttributeError",
        breakdown: [
          { line: "class Animal:", explanation: "Defines the parent blueprint class." },
          { line: "def __init__(self, name):", explanation: "The constructor magic method. It runs automatically when an object is created. 'self' refers to the specific object being instantiated." },
          { line: "self.__id = 1234", explanation: "The double underscore enforces name mangling, acting as Encapsulation. You cannot access my_dog.__id directly from outside the class." },
          { line: "class Dog(Animal):", explanation: "Demonstrates Inheritance. The Dog class inherits all attributes and methods from the Animal class." },
          { line: "def speak(self):", explanation: "Demonstrates Polymorphism (Method Overriding). The Dog class provides its own specific implementation of the 'speak' method that was empty in the parent class." },
          { line: "my_dog = Dog(\"Buddy\")", explanation: "Instantiates the object. It calls the parent's __init__ method (since Dog doesn't have one) to set the name to 'Buddy'." },
        ]
      },
      examNotes: {
        examNotes: [
          "`self` refers to the instance of the class calling the method. It must be the first parameter of any instance method.",
          "`__init__` is the constructor method called when an object is instantiated.",
          "Method overriding allows a child class to provide a specific implementation of a method already provided by its parent class."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Which OOP concept is demonstrated when a child class implements a method with the same name as a method in its parent class?",
            options: ["Encapsulation", "Polymorphism (Method Overriding)", "Abstraction", "Multiple Inheritance"],
            correctIndex: 1,
            explanation: "Method overriding allows a subclass to provide a specific implementation of a method that is already provided by its parent class, a classic form of polymorphism."
          }
        ]
      }
    }
  },
  {
    id: 'python-data-analysis',
    slug: 'data-analysis',
    title: 'Data Analysis',
    description: "Numpy, Pandas DataFrames, and Data Visualization with Matplotlib/Seaborn.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "This module transitions from pure Python programming into the domain of Data Science. You will learn the core libraries used to manipulate, analyze, and visualize structured data.\n\n### NumPy (Numerical Python)\nNumPy is the core foundation for scientific computing in Python. It introduces the `ndarray` (N-dimensional array) object, which provides lightning-fast vector and matrix operations. Unlike standard Python lists, NumPy arrays must contain elements of the exact same data type. Because they are implemented in highly optimized C code, NumPy arrays perform mathematical operations up to 100x faster than traditional Python `for` loops.\n\n### Pandas (Python Data Analysis Library)\nBuilt directly on top of NumPy, Pandas is the ultimate tool for data manipulation. It introduces two main structures: `Series` (1-Dimensional arrays) and `DataFrames` (2-Dimensional tables, exactly like a SQL table or Excel spreadsheet). With Pandas, you can effortlessly handle missing values (`NaN`), execute complex `JOIN`s and `GROUP BY` aggregations, filter millions of rows in milliseconds, and read/write data to CSVs or SQL databases.\n\n### Matplotlib & Seaborn\nData Visualization is critical for interpreting data. Matplotlib is the fundamental plotting library, giving you granular control over every single pixel, line, and axis of a chart. However, it can be verbose to write. Seaborn is built on top of Matplotlib and provides beautiful, statistically-focused graphics (like heatmaps, violin plots, and pairplots) out-of-the-box with just one line of code.",
        eli5: "NumPy is a super-fast calculator for giant grids of numbers. Pandas is like Excel on steroids, allowing you to manipulate millions of rows in seconds using code. Matplotlib and Seaborn are the artists that draw the pretty charts."
      },
      why: {
        text: "Python's standard structures (like lists and dictionaries) are too slow and memory-inefficient for large datasets. Without NumPy and Pandas, Machine Learning would be impossibly slow. These libraries execute operations at C-speed while allowing you to write simple Python code.",
        tip: "Whenever you find yourself writing a `for` loop to iterate over rows in a Pandas DataFrame, STOP! There is almost always a 'vectorized' Pandas or NumPy method that will do the exact same thing 100x faster."
      },
      code: {
        code: "import pandas as pd\nimport numpy as np\n\ndata = {\n    'Name': ['Alex', 'Sam', 'Jane', 'Bob'],\n    'Age': [25, 30, np.nan, 22],\n    'Salary': [50000, 80000, 60000, 45000]\n}\ndf = pd.DataFrame(data)\n\ndf['Age'] = df['Age'].fillna(df['Age'].mean())\nhigh_earners = df[df['Salary'] > 55000]\nprint(high_earners)",
        breakdown: [
          { line: "import pandas as pd", explanation: "Imports the Pandas library using the universal alias 'pd'." },
          { line: "data = {...}", explanation: "Creates a standard Python dictionary representing column names and their corresponding data arrays. Notice the np.nan (Not a Number) representing a missing age." },
          { line: "df = pd.DataFrame(data)", explanation: "Converts the dictionary into a Pandas DataFrame, creating a 2D tabular data structure." },
          { line: "df['Age'].fillna(df['Age'].mean())", explanation: "Calculates the mathematical mean of the Age column (ignoring the NaN), and then fills the missing NaN value with that calculated mean. This is called Imputation." },
          { line: "high_earners = df[df['Salary'] > 55000]", explanation: "Boolean Indexing. It filters the DataFrame to only keep rows where the Salary column is strictly greater than 55,000." },
        ]
      },
      examNotes: {
        examNotes: [
          "NumPy arrays must contain elements of the same data type for contiguous memory storage.",
          "Pandas `.loc[]` is label-based indexing, `.iloc[]` is integer-position based indexing.",
          "Vectorization in NumPy avoids python-level loops, executing operations at C-speed."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "In Pandas, what is the primary difference between `.loc` and `.iloc`?",
            options: ["loc is for rows, iloc is for columns", "loc is label-based, iloc is integer-position based", "loc modifies the original dataframe, iloc returns a copy", "There is no difference"],
            correctIndex: 1,
            explanation: ".loc is used to access rows/columns by their explicit labels (index names), whereas .iloc is used to access them by their implicit integer positions (0 to length-1)."
          }
        ]
      }
    }
  },
  {
    id: 'python-function-practice',
    slug: 'function-practice',
    title: 'Function Practice Questions',
    description: "Hands-on implementation of mathematical and utility functions.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Theory is useless without practice. This module focuses on taking abstract function concepts and applying them to solve concrete, real-world utility problems.\n\n### Converting Mathematical Formulas\nOne of the most common tasks for a function is taking a raw mathematical formula (like converting Celsius to Fahrenheit) and translating it into code. You must ensure that your function handles the inputs correctly and returns the exact expected datatype.\n\n### Handling Edge Cases\nWhen writing utility functions, you cannot assume the user will always pass perfect data. Good functions handle 'edge cases'\u2014what happens if the user passes a negative number when calculating area? What if they pass a string instead of an integer? Practice involves adding validation checks at the top of your function to prevent it from crashing unexpectedly.\n\n### Composing Functions\nComplex problems are rarely solved in a single function. 'Function composition' is the practice of having one function call another function to complete a step. For example, a `calculate_total_bill()` function might internally call a `calculate_tax()` function and a `calculate_tip()` function. This keeps your code modular and readable.",
        eli5: "If functions are tools in a toolbox, this lesson is your workbench. We are going to build a hammer, a screwdriver, and a wrench, and make sure they actually work when we hit a nail."
      },
      why: {
        text: "Memorizing syntax is not enough. You must train your brain to break down a word problem ('calculate the area of a circle') into logical programming steps (parameters, formulas, return statements).",
        tip: "Always test your functions with at least 3 different inputs: a standard input, a zero, and a negative/unexpected input to ensure it doesn't break."
      },
      code: {
        code: "import math\n\ndef celsius_to_fahrenheit(celsius):\n    \"\"\"Converts Celsius to Fahrenheit\"\"\"\n    return (celsius * 9/5) + 32\n\ndef circle_area(radius):\n    \"\"\"Calculates area of a circle\"\"\"\n    if radius < 0:\n        raise ValueError(\"Radius cannot be negative\")\n    return math.pi * (radius ** 2)\n\nprint(f\"20C is {celsius_to_fahrenheit(20)}F\")\nprint(f\"Area of radius 5: {circle_area(5):.2f}\")",
        breakdown: [
          { line: "import math", explanation: "Imports the built-in math module, granting access to mathematical constants like Pi and functions like square root." },
          { line: "def celsius_to_fahrenheit(celsius):", explanation: "Defines a function that accepts one parameter: the temperature in Celsius." },
          { line: "return (celsius * 9/5) + 32", explanation: "Applies the mathematical conversion formula and returns the calculated Fahrenheit float." },
          { line: "if radius < 0:", explanation: "An edge-case validation check. A circle cannot physically have a negative radius." },
          { line: "raise ValueError(...)", explanation: "If the radius is invalid, we intentionally crash the program with a specific, helpful error message rather than returning a silent, mathematically incorrect result." },
          { line: "return math.pi * (radius ** 2)", explanation: "Uses the imported math.pi constant and squares the radius to calculate the area (Pi * r^2)." },
        ]
      },
      examNotes: {
        examNotes: [
          "Docstrings (`\"\"\"\"\"\"`) are used to document what a function does. They are accessible via `function.__doc__`.",
          "Raising exceptions (`raise ValueError`) is the proper way to handle invalid inputs in professional code.",
          "Mathematical operations follow standard PEMDAS order of operations in Python."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is it important to use `raise ValueError` for an invalid input rather than just returning `0` or `None`?",
            options: ["It saves memory", "Returning 0 or None might be treated as a valid mathematical result by the calling code, causing silent bugs later", "It makes the code run faster", "It is required by Python syntax"],
            correctIndex: 1,
            explanation: "Silent failures are dangerous. If `circle_area(-5)` returns `0`, the rest of your program might use that `0` to build a bridge. Raising an error immediately halts the program and points to the exact problem."
          }
        ]
      }
    }
  },
  {
    id: 'python-data-structures-practice',
    slug: 'data-structures-practice',
    title: 'Data Structures Practice',
    description: "Hands-on implementation of list merges, dictionary parsing, and word frequencies.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "This module applies theoretical knowledge of lists, sets, and dictionaries to solve common algorithmic challenges you will face in coding interviews and daily tasks.\n\n### Aggregation & Transformation\nOften, you need to loop over a list and aggregate data\u2014for example, calculating the sum of all elements, or filtering out negative numbers. While you can use a `for` loop, list comprehensions provide a much more pythonic and efficient way to transform arrays.\n\n### Set Mathematics\nWhen dealing with two lists of data (like 'users active today' and 'users active yesterday'), sets allow you to instantly find the overlap (Intersection), combine them without duplicates (Union), or find the differences. This is vastly superior to writing nested `for` loops.\n\n### Dictionary Frequencies\nA massive use-case for dictionaries is counting the frequency of items (like counting how many times each word appears in a paragraph). Because dictionaries provide O(1) lookup time, you can iterate through the text once, incrementing the count for each word in the dictionary. This is the foundation of Natural Language Processing (NLP).",
        eli5: "We are taking the raw containers (lists, dictionaries) and using them to sort mail. We'll find duplicate letters (sets), count how many letters came from each person (dictionaries), and bundle them together (lists)."
      },
      why: {
        text: "Data structures are the primary tool for solving algorithmic problems. Knowing when to use a Set instead of a List separates junior developers from senior engineers.",
        tip: "Python's standard library includes `collections.Counter`, which can count item frequencies in a list automatically with zero manual dictionary logic!"
      },
      code: {
        code: "# 1. Merge Lists and remove duplicates\nlist_a = [1, 2, 3, 4]\nlist_b = [3, 4, 5, 6]\nmerged_unique = list(set(list_a + list_b))\n\n# 2. Word Frequency Counter\ntext = \"apple banana apple orange banana apple\"\nwords = text.split()\nfrequency = {}\n\nfor word in words:\n    if word in frequency:\n        frequency[word] += 1\n    else:\n        frequency[word] = 1\n\nprint(\"Unique Merged:\", merged_unique)\nprint(\"Word Frequency:\", frequency)",
        breakdown: [
          { line: "list_a + list_b", explanation: "The + operator concatenates the two lists into one long list: [1, 2, 3, 4, 3, 4, 5, 6]." },
          { line: "set(...)", explanation: "Converting the combined list into a Set automatically removes all duplicates. It becomes {1, 2, 3, 4, 5, 6}." },
          { line: "list(...)", explanation: "Converts the Set back into a standard List so we have an ordered, mutable array again." },
          { line: "words = text.split()", explanation: "Splits the single string into a list of words, separating by spaces." },
          { line: "if word in frequency:", explanation: "Checks if the word already exists as a key in our dictionary. Because it's a dictionary, this check is incredibly fast (O(1))." },
          { line: "frequency[word] += 1", explanation: "If the word exists, we grab its current count and increment it by 1." },
          { line: "frequency[word] = 1", explanation: "If the word does NOT exist, we add it to the dictionary and set its initial count to 1." },
        ]
      },
      examNotes: {
        examNotes: [
          "Adding two lists `[1] + [2]` results in `[1, 2]`. It concatenates, it does not do math.",
          "Converting a list to a set and back to a list is the fastest way to remove duplicates in Python.",
          "`dict.get(key, default)` is a safer way to access dictionary values without throwing a KeyError."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the time complexity of checking if a specific key exists in a Python dictionary?",
            options: ["O(N) - Linear time", "O(N^2) - Quadratic time", "O(1) - Constant time", "O(log N) - Logarithmic time"],
            correctIndex: 2,
            explanation: "Dictionaries in Python are implemented using hash tables. Hashing the key provides the exact memory address instantly, meaning lookup takes the same amount of time regardless of whether the dictionary has 10 items or 10 million items."
          }
        ]
      }
    }
  },
  {
    id: 'python-modules-packages',
    slug: 'modules-packages',
    title: 'Modules And Packages',
    description: "Importing modules, standard library overview, and custom packages.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "As your codebase grows, writing everything in a single `main.py` file becomes impossible to manage. Modules and Packages allow you to split your code into multiple files and folders.\n\n### What is a Module?\nA module is simply a file containing Python definitions and statements (any file ending in `.py`). If you write a file called `math_tools.py`, you have created a module. You can then use the `import math_tools` statement in another file to access all its functions and classes.\n\n### What is a Package?\nA package is a directory (folder) that contains a collection of modules. To tell Python that a directory is a package, it must contain a special file named `__init__.py` (though this requirement was relaxed in Python 3.3 for namespace packages, it is still best practice). Packages allow you to organize modules hierarchically using dot notation (e.g., `import my_package.math_tools`).\n\n### The Standard Library\nPython comes with 'batteries included'. The Standard Library is a massive collection of built-in modules that handle everything from math (`math`), dealing with dates (`datetime`), generating random numbers (`random`), to interacting with the operating system (`os`). You don't need to pip install these; they are always available.\n\n### `__name__ == '__main__'`\nWhen you import a module, Python executes all the code inside it. If your module contains testing code at the bottom, that code will run when imported! To prevent this, you wrap execution code in `if __name__ == '__main__':`. This tells Python: 'Only run this code if this file is executed directly, NOT if it is being imported by another file.'",
        eli5: "A Module is a single chapter in a book (a single .py file). A Package is the entire book containing many chapters (a folder of .py files). Importing is just grabbing that book from the library so you can read it in your current project."
      },
      why: {
        text: "Modularity is the key to scalable software engineering. It allows multiple developers to work on different files simultaneously without conflicting, and it allows you to reuse the exact same code across 10 different projects.",
        tip: "Avoid using `from module import *`. It pollutes your global namespace and makes it incredibly difficult to figure out where a specific function came from when debugging."
      },
      code: {
        code: "# my_math.py (Imagine this is a separate file)\ndef add(a, b):\n    return a + b\n\n# main.py (Your current file)\nimport math             # Built-in standard library\nfrom datetime import date # Importing specific class\n# import my_math        # Importing custom module\n\nprint(\"Pi:\", math.pi)\nprint(\"Today:\", date.today())\n\n# Using the standard library to generate a random number\nimport random\nprint(\"Lucky number:\", random.randint(1, 100))",
        breakdown: [
          { line: "import math", explanation: "Imports the entire built-in 'math' module. To use its functions, you must prefix them with 'math.' (e.g., math.pi)." },
          { line: "from datetime import date", explanation: "Selectively imports ONLY the 'date' class from the 'datetime' module. You can use it directly without a prefix." },
          { line: "print(\"Pi:\", math.pi)", explanation: "Accesses the pi constant located inside the math module." },
          { line: "import random", explanation: "Imports the random module, which contains functions for generating pseudo-random numbers." },
          { line: "random.randint(1, 100)", explanation: "Calls the randint function inside the random module, generating an integer between 1 and 100 inclusive." },
        ]
      },
      examNotes: {
        examNotes: [
          "A module is a single `.py` file. A package is a directory of modules.",
          "`__init__.py` is used to mark a directory as a Python package.",
          "`if __name__ == '__main__':` ensures code only runs when the script is executed directly, not imported."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is it generally considered bad practice to use `from module import *`?",
            options: ["It crashes the Python interpreter", "It is slower than standard imports", "It imports all names into the current namespace, which can overwrite existing variables and make the code hard to trace", "It only imports the first function in the module"],
            correctIndex: 2,
            explanation: "Wildcard imports (`*`) dump everything from the module into your current file. If the module has a function called `sum()`, it will overwrite Python's built-in `sum()` function silently, causing massive debugging headaches."
          }
        ]
      }
    }
  },
  {
    id: 'python-file-handling',
    slug: 'file-handling',
    title: 'File Handling In Python',
    description: "File operations, paths, reading, and writing files.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "File handling allows your Python script to interact with the persistent storage on your hard drive. Without it, all data disappears the moment your script stops running.\n\n### Opening Files (`open()`)\nThe built-in `open()` function takes two main arguments: the file path, and the 'mode'. \n- `'r'` = Read (Default). Opens file for reading, errors if it doesn't exist.\n- `'w'` = Write. Opens file for writing, **overwrites** the file if it exists, creates it if it doesn't.\n- `'a'` = Append. Opens file for writing, but adds data to the **end** of the file without deleting existing content.\n\n### The `with` Statement (Context Managers)\nWhen you open a file, your operating system locks it. If your script crashes before you call `file.close()`, that file remains locked and corrupted in memory. The `with open(...) as file:` syntax is called a Context Manager. It guarantees that the file will be safely and automatically closed the millisecond the block of code finishes, even if a fatal error occurs inside the block. **Always use `with`.**\n\n### Reading and Writing Data\nYou can read an entire file into a single string using `file.read()`, or read it line-by-line into a list using `file.readlines()`. When writing, you use `file.write()`. Note that `write()` does not automatically add newlines; you must explicitly add `\\n` to the end of your strings.",
        eli5: "Variables are like writing on a whiteboard\u2014when you turn off the computer, the whiteboard is wiped clean. File handling is like writing in a notebook\u2014the data is saved permanently on your hard drive."
      },
      why: {
        text: "Data Science is entirely about data. If you cannot read a `.csv` file into your script, or write your final predictions to a `.txt` file, you cannot perform data science.",
        tip: "Always specify the encoding (e.g., `encoding='utf-8'`) when opening files. If you don't, Windows and Mac might try to read the file using different default text encodings, causing weird symbol errors."
      },
      code: {
        code: "# Writing to a file (Overwrites if exists)\nwith open('data_log.txt', 'w', encoding='utf-8') as f:\n    f.write(\"User: Alice\\n\")\n    f.write(\"Action: Login\\n\")\n\n# Appending to a file (Adds to the bottom)\nwith open('data_log.txt', 'a', encoding='utf-8') as f:\n    f.write(\"User: Bob\\n\")\n\n# Reading from a file\nwith open('data_log.txt', 'r', encoding='utf-8') as f:\n    lines = f.readlines()\n    \nprint(\"File Contents:\")\nfor line in lines:\n    print(line.strip()) # strip() removes the invisible \\n",
        breakdown: [
          { line: "with open('data_log.txt', 'w', encoding='utf-8') as f:", explanation: "Opens 'data_log.txt' in Write ('w') mode. The 'with' keyword ensures the file will be closed automatically. 'f' is the variable holding the file object." },
          { line: "f.write(\"User: Alice\\n\")", explanation: "Writes a string to the file. The '\\n' is mandatory if you want the next write to be on a new line." },
          { line: "with open('data_log.txt', 'a', encoding='utf-8') as f:", explanation: "Opens the SAME file, but in Append ('a') mode. This ensures Bob is added to the bottom, instead of erasing Alice." },
          { line: "lines = f.readlines()", explanation: "Reads the entire file and returns a List, where every element is a string representing one line from the file." },
          { line: "print(line.strip())", explanation: "When we read the lines, the invisible '\\n' newline characters are still attached. strip() removes trailing whitespace and newlines so print() doesn't double-space the output." },
        ]
      },
      examNotes: {
        examNotes: [
          "The `with` statement acts as a Context Manager, automatically handling `file.close()`.",
          "Mode `'w'` destroys existing file contents. Mode `'a'` preserves them.",
          "You must explicitly include `\\n` when using `file.write()`; it does not add line breaks automatically."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary advantage of using the `with open(...) as file:` syntax?",
            options: ["It automatically encrypts the file", "It automatically closes the file when the block ends, even if an error occurs", "It makes reading the file significantly faster", "It converts the file to JSON automatically"],
            correctIndex: 1,
            explanation: "The `with` statement implements a Context Manager. It guarantees cleanup operations (like closing the file and releasing system locks) are executed no matter how the block exits."
          }
        ]
      }
    }
  },
  {
    id: 'python-exception-handling',
    slug: 'exception-handling',
    title: 'Exception Handling In Python',
    description: "try, except, else, finally blocks and custom exception handling.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "When Python encounters an error (like dividing by zero, or opening a file that doesn't exist), it throws an 'Exception' and completely crashes the program. Exception Handling allows you to intercept these crashes and deal with them gracefully.\n\n### `try` and `except`\nYou place the risky code inside a `try` block. If the code executes successfully, the `except` block is entirely ignored. However, if the code crashes, Python immediately jumps to the `except` block instead of halting the program. You can catch specific errors (like `except ZeroDivisionError:`) so you know exactly what went wrong.\n\n### The `else` Block\nThe `else` block (which is optional) executes *only* if the `try` block succeeded without throwing any errors. It is the perfect place to put code that relies on the success of the `try` block.\n\n### The `finally` Block\nThe `finally` block executes *no matter what*\u2014whether an error occurred or not. It is typically used for critical cleanup operations, like closing database connections or releasing memory locks, guaranteeing they happen even if the `try` block failed spectacularly.\n\n### Raising Custom Exceptions\nYou don't just have to catch errors; you can create them. If a user inputs invalid data (like an age of -5), you can use the `raise ValueError(\"Age cannot be negative\")` syntax to manually trigger an exception.",
        eli5: "Try/Except is like a safety net for a tightrope walker. `try`: walk the rope. `except`: if you fall, bounce off the net instead of hitting the ground and dying."
      },
      why: {
        text: "In production environments (like a web server), your code cannot crash just because one user uploaded a corrupted image. Exception handling ensures the server stays alive, logs the specific error, and tells the user 'Invalid File' instead of shutting down.",
        tip: "Never use a bare `except:` block. Always catch specific errors (like `except FileNotFoundError:`). A bare `except` will catch EVERYTHING, including the user pressing Ctrl+C to kill a frozen program, making it un-killable!"
      },
      code: {
        code: "def divide_numbers(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print(\"Error: You cannot divide by zero!\")\n        return None\n    except TypeError:\n        print(\"Error: Both inputs must be numbers.\")\n        return None\n    else:\n        print(\"Division successful!\")\n        return result\n    finally:\n        print(\"--- Execution Finished ---\")\n\nprint(divide_numbers(10, 2))\nprint(divide_numbers(10, 0))",
        breakdown: [
          { line: "try:", explanation: "Starts the protected block. Python monitors any code inside here for crashes." },
          { line: "result = a / b", explanation: "The risky operation. If b is 0, this will instantly trigger a ZeroDivisionError." },
          { line: "except ZeroDivisionError:", explanation: "If a ZeroDivisionError occurs, the program jumps here instead of crashing, allowing us to print a friendly error message." },
          { line: "except TypeError:", explanation: "You can stack multiple except blocks to handle different types of errors differently. This catches if someone passed a string instead of a number." },
          { line: "else:", explanation: "This block ONLY runs if the 'try' block completed perfectly with no errors." },
          { line: "finally:", explanation: "This block ALWAYS runs. It will print 'Execution Finished' whether the division worked or failed by zero." },
        ]
      },
      examNotes: {
        examNotes: [
          "`try` blocks must have at least one `except` or `finally` block attached.",
          "Catch specific exceptions instead of a bare `except:`. `Exception` is the base class for all built-in, non-system-exiting exceptions.",
          "The `finally` block is executed irrespective of whether an exception occurred or was caught."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Under what condition does the `else` block in a try-except structure execute?",
            options: ["Always, regardless of errors", "Only if an exception was raised", "Only if NO exceptions were raised in the try block", "It executes repeatedly until an exception occurs"],
            correctIndex: 2,
            explanation: "The `else` block is specifically designed for code that should only run if the `try` block was 100% successful. If any exception is thrown, the `else` block is skipped."
          }
        ]
      }
    }
  },
  {
    id: 'python-advance-python',
    slug: 'advance-python',
    title: 'Advance Python',
    description: "Iterators, generators, closures, and decorators.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Advanced Python bridges the gap between writing scripts that 'just work' and writing elegant, highly optimized Pythonic code.\n\n### Iterators & Generators (`yield`)\nA standard list `[1, 2, ..., 1000000]` stores every single number in memory simultaneously, which can consume gigabytes of RAM. A Generator is a special type of function that uses the `yield` keyword instead of `return`. It doesn't calculate all the numbers at once; it 'generates' them on-the-fly, one at a time, pausing its execution state until the next number is requested. Generators allow you to process massive datasets (like a 50GB log file) using almost zero memory.\n\n### Closures\nA closure occurs when a nested (child) function captures and remembers the variables from its enclosing (parent) function, even after the parent function has finished executing. This allows for data hiding and is the foundational concept behind decorators.\n\n### Decorators (`@`)\nA Decorator is a function that takes another function as an argument, adds some new functionality to it, and returns the modified function\u2014all without altering the original function's source code. You apply them using the `@decorator_name` syntax above a function. They are heavily used in web frameworks like Flask/Django to easily add 'login required' checks or 'route mapping' to hundreds of different functions seamlessly.",
        eli5: "Generators: Instead of buying a truckload of apples and storing them in your garage (List), you plant an apple tree and pick one apple exactly when you are hungry. Decorators: Taking your standard bicycle and wrapping a jetpack around it without changing the bike itself."
      },
      why: {
        text: "Generators are mandatory for Big Data processing where datasets exceed your computer's RAM. Decorators are the industry standard for applying widespread logic (like authentication, logging, or timing) across an entire codebase cleanly.",
        tip: "If you ever get an `Out Of Memory` or `MemoryError` when loading a large CSV or processing data, you should probably be using a Generator!"
      },
      code: {
        code: "# 1. Generator Example\ndef fibonacci_generator(limit):\n    a, b = 0, 1\n    while a < limit:\n        yield a  # Pauses execution and returns 'a'\n        a, b = b, a + b\n\n# 2. Decorator Example\nimport time\n\ndef timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f\"{func.__name__} took {time.time() - start:.4f}s\")\n        return result\n    return wrapper\n\n@timer_decorator\ndef heavy_computation():\n    # The decorator automatically wraps this function!\n    return sum(x**2 for x in range(1000000))\n\nprint(\"Fibonacci up to 10:\", list(fibonacci_generator(10)))\nheavy_computation()",
        breakdown: [
          { line: "yield a", explanation: "Unlike 'return' which kills the function, 'yield' spits out the value of 'a', but freezes the function's state exactly where it is. The next time the generator is called, it resumes on the very next line." },
          { line: "def timer_decorator(func):", explanation: "A decorator takes a function ('func') as an argument." },
          { line: "def wrapper(*args, **kwargs):", explanation: "It creates an inner 'wrapper' function that can accept any arguments. This wrapper will add new behavior around the original function." },
          { line: "result = func(*args, **kwargs)", explanation: "Inside the wrapper, we actually execute the original function and store its result." },
          { line: "@timer_decorator", explanation: "Syntactic sugar. This applies the timer logic to heavy_computation automatically. When we call heavy_computation(), we are actually calling the wrapper()." },
        ]
      },
      examNotes: {
        examNotes: [
          "Generators use `yield` and evaluate lazily (on-demand), making them highly memory efficient.",
          "A decorator is a higher-order function that modifies the behavior of another function.",
          "Closures allow inner functions to remember the state of their enclosing scope."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why would a developer choose to use a Generator (`yield`) instead of returning a List for a sequence of 10 million numbers?",
            options: ["Generators execute code faster", "Generators use significantly less memory because they yield one item at a time instead of storing all 10 million in RAM", "Generators automatically sort the numbers", "Generators can run on multiple CPU cores simultaneously"],
            correctIndex: 1,
            explanation: "Generators evaluate 'lazily'. They only hold the current value in memory, calculate the next value when requested, and forget the old one. A list of 10 million numbers requires allocating RAM for all 10 million simultaneously."
          }
        ]
      }
    }
  },
  {
    id: 'python-sqlite3',
    slug: 'sqlite3',
    title: 'Working With Sqlite3',
    description: "CRUD Operations with SQLite3 and Python.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "SQLite3 is a C library that provides a lightweight, disk-based database. It doesn't require a separate server process (like PostgreSQL or MySQL) and is built directly into Python's standard library.\n\n### The Concept of a Relational Database\nInstead of saving data to text or CSV files, databases store data in structured tables with rows and columns. This allows you to use SQL (Structured Query Language) to perform complex queries, join different tables together, and aggregate data rapidly.\n\n### Connecting & Cursors\nTo use SQLite in Python, you first establish a `Connection` to the database file (e.g., `data.db`). If the file doesn't exist, SQLite automatically creates it. From that connection, you instantiate a `Cursor`. The cursor is the object that actually traverses the database, executes your SQL strings, and fetches the results.\n\n### CRUD Operations\nDatabase interactions are categorized into four operations:\n- **Create**: Using `INSERT INTO` to add new rows.\n- **Read**: Using `SELECT` to fetch data.\n- **Update**: Using `UPDATE` to modify existing rows.\n- **Delete**: Using `DELETE` to remove rows.\n\n### Committing Transactions\nWhen you `INSERT`, `UPDATE`, or `DELETE` data, those changes are not saved to the file immediately. They are held in memory as a 'Transaction'. You must call `connection.commit()` to permanently save the changes. If your program crashes before the commit, all changes are rolled back, protecting data integrity.",
        eli5: "SQLite is a fully functional database that lives entirely inside a single file on your computer. You use Python to send it SQL text commands, and it gives you structured data back."
      },
      why: {
        text: "JSON and CSV files become unbearably slow and unmanageable when dealing with gigabytes of data or complex relationships. SQLite is the industry standard for local data storage, mobile apps (iOS/Android), and lightweight web apps.",
        tip: "NEVER use string formatting (like f-strings) to insert variables into a SQL query. This opens your app to SQL Injection attacks. Always use parameterized queries `(?, ?)`."
      },
      code: {
        code: "import sqlite3\n\n# 1. Connect to DB (Creates file if it doesn't exist)\nconn = sqlite3.connect('example.db')\ncursor = conn.cursor()\n\n# 2. CREATE Table\ncursor.execute('''\n    CREATE TABLE IF NOT EXISTS users (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        name TEXT,\n        age INTEGER\n    )\n''')\n\n# 3. INSERT Data (Parameterized to prevent SQL Injection)\ncursor.execute(\"INSERT INTO users (name, age) VALUES (?, ?)\", (\"Alice\", 28))\nconn.commit()  # Save changes!\n\n# 4. READ Data\ncursor.execute(\"SELECT * FROM users WHERE age > ?\", (20,))\nresults = cursor.fetchall()\nprint(\"Fetched Data:\", results)\n\nconn.close() # Always close the connection",
        breakdown: [
          { line: "conn = sqlite3.connect('example.db')", explanation: "Opens a connection to the database file. If 'example.db' doesn't exist in your folder, Python creates it instantly." },
          { line: "cursor = conn.cursor()", explanation: "Creates a cursor object. You use this cursor to execute SQL commands and retrieve data." },
          { line: "cursor.execute(''' CREATE TABLE ... ''')", explanation: "Executes a SQL string to create a table. IF NOT EXISTS prevents an error if we run this script twice." },
          { line: "VALUES (?, ?)\", (\"Alice\", 28)", explanation: "The '?' marks are placeholders. We pass a tuple (\"Alice\", 28) as the second argument. The SQLite library safely injects them. NEVER use f-strings here!" },
          { line: "conn.commit()", explanation: "Saves the Insert operation permanently to the disk. Without this, the data vanishes when the script ends." },
          { line: "cursor.fetchall()", explanation: "After running a SELECT query, fetchall() grabs all the matching rows from the database and returns them as a Python List of Tuples." },
        ]
      },
      examNotes: {
        examNotes: [
          "SQLite databases are contained in a single file and require no background server process.",
          "You must call `conn.commit()` to save `INSERT`, `UPDATE`, or `DELETE` operations.",
          "Always use parameter substitution `?` to defend against SQL Injection attacks."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why is it critical to use parameter substitution (the `?` placeholder) instead of f-strings when executing SQL queries in Python?",
            options: ["It makes the query run faster", "It prevents SQL Injection attacks by properly escaping user input", "It allows you to query multiple databases at once", "It is the only way SQLite can read strings"],
            correctIndex: 1,
            explanation: "If you use f-strings to inject user input, a malicious user could input `Robert'); DROP TABLE users;--`. The database would execute this literally and delete your entire table. Parameter substitution sanitizes the input safely."
          }
        ]
      }
    }
  },
  {
    id: 'python-logging',
    slug: 'logging',
    title: 'Logging In Python',
    description: "Logging implementation, multiple loggers, and real-world examples.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Logging is the practice of recording events, errors, and warnings that occur while your software runs. In production, you cannot stare at the terminal watching `print()` statements.\n\n### Why Not Print?\n`print()` statements are ephemeral. Once the terminal closes, the text is gone forever. More importantly, `print()` cannot easily differentiate between a critical system failure and a simple informational message. The built-in `logging` module solves all of this.\n\n### Log Levels\nThe logging module provides five standard severity levels (in increasing order of severity):\n1. `DEBUG`: Detailed information, typically of interest only when diagnosing problems.\n2. `INFO`: Confirmation that things are working as expected.\n3. `WARNING`: An indication that something unexpected happened, but the software is still functioning (e.g., 'Disk space low').\n4. `ERROR`: A serious problem; the software has not been able to perform some function.\n5. `CRITICAL`: A serious error, indicating that the program itself may be unable to continue running.\n\n### Handlers and Formatters\nA 'Logger' creates the log message. A 'Handler' decides where that message goes (e.g., `FileHandler` sends it to a `.log` file, `StreamHandler` sends it to the terminal). A 'Formatter' decides exactly what the text looks like (e.g., prepending the timestamp, the line number, and the severity level before the actual message).",
        eli5: "Print is like talking out loud in an empty room. Logging is like writing a detailed diary entry with the exact time, date, and severity of what happened, so you can read it tomorrow."
      },
      why: {
        text: "When your web scraper crashes at 3:00 AM on a remote cloud server, `print()` is useless. A proper `.log` file is the only way to perform an autopsy and figure out exactly what line of code broke and why.",
        tip: "By default, the logging module suppresses `DEBUG` and `INFO` messages. You must explicitly configure `level=logging.DEBUG` to see them!"
      },
      code: {
        code: "import logging\n\n# Configure the root logger\nlogging.basicConfig(\n    filename='app.log', \n    level=logging.INFO,\n    format='%(asctime)s - %(levelname)s - %(message)s'\n)\n\ndef process_payment(amount):\n    logging.info(f\"Starting payment process for ${amount}\")\n    \n    if amount < 0:\n        logging.error(\"Payment amount cannot be negative!\")\n        return False\n        \n    if amount > 10000:\n        logging.warning(\"Unusually large transaction detected.\")\n        \n    # Process logic here...\n    logging.info(\"Payment successful.\")\n    return True\n\nprocess_payment(50)\nprocess_payment(-10)",
        breakdown: [
          { line: "import logging", explanation: "Imports the built-in standard library logging module." },
          { line: "logging.basicConfig(...)", explanation: "Configures the default behavior. We tell it to write to 'app.log', listen to everything INFO-level and above, and we define a specific string format." },
          { line: "format='%(asctime)s - %(levelname)s - %(message)s'", explanation: "The Formatter. Every log will automatically prepend the exact timestamp and the severity level (INFO, ERROR, etc.) before the actual message." },
          { line: "logging.info(...)", explanation: "Logs an informational trace message. Useful for knowing what the code is currently doing." },
          { line: "logging.error(...)", explanation: "Logs a high-severity error message. In production, this might be configured to send an email or Slack alert to the developers." },
        ]
      },
      examNotes: {
        examNotes: [
          "The five standard logging levels: DEBUG, INFO, WARNING, ERROR, CRITICAL.",
          "By default, `basicConfig()` only handles WARNING, ERROR, and CRITICAL.",
          "Formatters are used to inject dynamic data like timestamps and line numbers into log outputs."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Which of the following is NOT a standard Python logging level?",
            options: ["DEBUG", "INFO", "FATAL", "CRITICAL"],
            correctIndex: 2,
            explanation: "The 5 standard levels are DEBUG (10), INFO (20), WARNING (30), ERROR (40), and CRITICAL (50). While some languages use FATAL, Python officially uses CRITICAL."
          }
        ]
      }
    }
  },
  {
    id: 'python-multithreading-multiprocessing',
    slug: 'multithreading-multiprocessing',
    title: 'Multi Threading and Multi Processing',
    description: "Threads vs Processes, ThreadPoolExecutor, ProcessPoolExecutor, and Web Scraping.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Modern computers have multiple CPU cores, but standard Python runs on a single thread on a single core. This module teaches you how to execute multiple tasks simultaneously to drastically speed up your programs.\n\n### The Global Interpreter Lock (GIL)\nPython has a notorious feature called the GIL. The GIL acts as a strict bouncer, ensuring that only **one** Python thread can execute Python byte-code at a time, even if you have 8 CPU cores. Because of the GIL, Multithreading in Python does *not* speed up heavy mathematical calculations.\n\n### Multi-Threading (Concurrency)\nIf the GIL blocks simultaneous execution, why use threads? Threads are perfect for **I/O-Bound** tasks. If your script downloads 100 images from the internet, a single thread will request image 1, wait 2 seconds for it to download, then request image 2. Multithreading allows you to request all 100 images simultaneously. While one thread is 'waiting' for the network, the GIL releases it and lets another thread work. Multithreading is heavily used in Web Scraping and Network requests.\n\n### Multi-Processing (Parallelism)\nFor **CPU-Bound** tasks (like training a machine learning model, resizing millions of images, or heavy math), you use Multi-Processing. The `multiprocessing` module completely bypasses the GIL by creating entirely separate Python programs (processes) in the background. Each process gets its own memory space and its own GIL, allowing true parallel execution across all your CPU cores. The downside? Processes use significantly more RAM than threads and take longer to start up.",
        eli5: "Multithreading is one chef cooking 5 different meals by switching pots while waiting for water to boil. Multiprocessing is hiring 5 separate chefs to work in 5 separate kitchens simultaneously."
      },
      why: {
        text: "If you need to scrape 10,000 web pages, a standard Python `for` loop will take hours. Utilizing a `ThreadPoolExecutor` can reduce that to minutes. Understanding concurrency is mandatory for data engineering and scraping.",
        tip: "Rule of thumb: If your program is waiting for the internet or a hard drive, use `Threading`. If your program is freezing because it's doing heavy math, use `Processing`."
      },
      code: {
        code: "import time\nimport concurrent.futures\n\ndef fake_download(item):\n    print(f\"Starting download {item}...\")\n    time.sleep(1) # Simulates waiting for network\n    return f\"{item} Complete!\"\n\nitems = [\"File_A\", \"File_B\", \"File_C\"]\n\nstart = time.time()\n# ThreadPoolExecutor manages a pool of worker threads automatically\nwith concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:\n    # map applies the function to every item in the list concurrently\n    results = executor.map(fake_download, items)\n\nfor res in results:\n    print(res)\n\nprint(f\"Total Time: {time.time() - start:.2f} seconds\")",
        breakdown: [
          { line: "time.sleep(1)", explanation: "Simulates an I/O bound task, like waiting for a web server to respond. In a normal loop, 3 items would take 3 seconds total." },
          { line: "with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:", explanation: "Creates a pool of 3 background threads. The 'with' context manager ensures the threads are safely shut down when finished." },
          { line: "executor.map(fake_download, items)", explanation: "Just like standard map(), but it farms the tasks out to the 3 threads. All 3 threads hit the 'sleep(1)' at the exact same time." },
          { line: "print(f\"Total Time:...\")", explanation: "Because the 3 threads waited simultaneously, the total execution time is roughly 1 second, not 3 seconds!" },
        ]
      },
      examNotes: {
        examNotes: [
          "The GIL (Global Interpreter Lock) prevents multiple native threads from executing Python bytecodes at once.",
          "Multithreading is for I/O-bound tasks (Network, Disk).",
          "Multiprocessing is for CPU-bound tasks (Math, Image Processing)."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Which of the following tasks would benefit the most from Python's `multiprocessing` module rather than `threading`?",
            options: ["Downloading 500 HTML pages from a website", "Querying an external SQL database", "Performing complex matrix multiplications on a massive dataset", "Reading lines from a text file"],
            correctIndex: 2,
            explanation: "Matrix multiplication is a purely CPU-bound task. Because of the GIL, threading will not speed this up. Multiprocessing bypasses the GIL by creating separate processes across multiple CPU cores, drastically speeding up math operations."
          }
        ]
      }
    }
  },
  {
    id: 'python-memory-management',
    slug: 'memory-management',
    title: 'Memory Management With Python',
    description: "Memory allocation, deallocation, garbage collection, and best practices.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Memory management is how Python handles the RAM in your computer. Unlike C or C++, where you must manually allocate and free memory, Python handles this completely automatically. However, understanding *how* it does this is critical for writing efficient code.\n\n### Variables are References\nIn Python, variables are not buckets containing data. Variables are simply sticky notes (references) stuck to objects floating in memory. If you write `a = [1, 2, 3]` and then `b = a`, you did NOT copy the list. You just put two sticky notes on the exact same list in memory. If you append to `b`, `a` will change too!\n\n### Reference Counting\nThe primary mechanism Python uses to manage memory is 'Reference Counting'. Every object in memory keeps a tally of how many variables (sticky notes) are currently pointing at it. If `a = 10` and `b = a`, the integer `10` has a reference count of 2. If you then delete `a` and `b`, the reference count drops to 0.\n\n### Garbage Collection\nWhen an object's reference count drops to exactly 0, Python's Garbage Collector instantly deletes the object and frees up that RAM for the operating system to use. Python also has a secondary generational garbage collector running in the background to detect 'reference cycles' (e.g., Object A points to Object B, and Object B points back to Object A, so their counts never reach zero).",
        eli5: "Imagine a balloon (data in memory) held by several strings (variables). As long as at least one string is holding it, the balloon stays. Once the last string is cut, Python's Garbage Collector pops the balloon to save space."
      },
      why: {
        text: "When processing millions of rows in Machine Learning, inefficient memory usage will crash your script with an `Out Of Memory` error. Understanding references prevents massive bugs where you accidentally modify a dataset you thought you copied.",
        tip: "If you actually want to duplicate a list so they don't share memory, you must explicitly copy it using `b = a.copy()` or slicing `b = a[:]`."
      },
      code: {
        code: "import sys\nimport copy\n\n# Variables are references\nlist_a = [1, 2, 3]\nlist_b = list_a  # Both point to the exact same memory!\nlist_b.append(4)\n\nprint(\"List A:\", list_a)  # Notice list_a also has the 4!\n\n# How to actually copy memory\nlist_c = list_a.copy()\nlist_c.append(5)\nprint(\"List A after C appends:\", list_a) # A is unchanged\n\n# Checking reference counts\nx = \"Hello, World!\"\nprint(\"Reference count for x:\", sys.getrefcount(x))",
        breakdown: [
          { line: "list_b = list_a", explanation: "Does NOT copy the data. It assigns list_b as a reference pointing to the exact same list object in memory as list_a." },
          { line: "list_b.append(4)", explanation: "Since both variables point to the same object, modifying it via 'list_b' also affects what 'list_a' sees." },
          { line: "list_c = list_a.copy()", explanation: "Creates a completely new object in memory with the same values, and points list_c to it. This is a 'shallow copy'." },
          { line: "sys.getrefcount(x)", explanation: "A built-in utility that reveals exactly how many variables/internal processes are currently pointing to an object. (It usually returns 1 higher than expected because passing x to the function creates a temporary reference)." },
        ]
      },
      examNotes: {
        examNotes: [
          "Python manages memory primarily through Reference Counting.",
          "The Garbage Collector periodically runs to clean up cyclic references.",
          "Assignment (`=`) of mutable objects like lists/dicts does not copy the object, it only copies the reference."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What happens when an object's reference count drops to zero in Python?",
            options: ["The object is saved to the hard drive", "The program crashes", "The Garbage Collector instantly destroys the object and frees the memory", "The object is kept in a cache forever"],
            correctIndex: 2,
            explanation: "Python's reference counting system immediately deallocates the memory of an object the moment its reference count hits zero, ensuring efficient RAM usage."
          }
        ]
      }
    }
  },
  {
    id: 'python-flask',
    slug: 'flask',
    title: 'Getting Started With Flask Framework',
    description: "Building dynamic web apps, routing, Jinja 2 templates, and REST APIs.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Flask is a lightweight 'micro-framework' for building web applications and APIs in Python. While Data Scientists build models, they use Flask to deploy those models to the internet so others can access them.\n\n### WSGI and Routing\nAt its core, Flask maps URLs (like `/home` or `/predict`) to specific Python functions. This is called 'Routing'. When a user types a URL into their browser, Flask intercepts that HTTP request, executes the associated Python function, and returns an HTTP response (usually HTML or JSON).\n\n### REST APIs\nA massive use-case for Flask is building RESTful APIs. Instead of returning graphical web pages, an API returns raw data in JSON format. For example, a frontend React application might send a user's data to a Flask API via a `POST` request. Flask processes the data through an AI model, and returns the prediction as a JSON dictionary.\n\n### Jinja2 Templating\nIf you want Flask to render actual web pages, it uses the Jinja2 templating engine. This allows you to write standard HTML files, but inject Python logic directly into the HTML using `{{ variables }}` or `{% for loop %}` syntax, creating dynamic web pages that change based on user data.",
        eli5: "Flask is the bridge between your Python script and the internet. It turns your local code into a web address that anyone in the world can visit."
      },
      why: {
        text: "A machine learning model sitting on your laptop is useless to a business. Flask allows you to wrap your model in a web API, allowing mobile apps and websites to send it data and get predictions.",
        tip: "Never run Flask's default development server (`app.run()`) in a real production environment. It cannot handle concurrent users. Always use a production WSGI server like `Gunicorn`."
      },
      code: {
        code: "from flask import Flask, jsonify, request\n\n# Initialize the Flask application\napp = Flask(__name__)\n\n# Define a route for a GET request\n@app.route('/', methods=['GET'])\ndef home():\n    return \"Welcome to the Machine Learning API!\"\n\n# Define a route for a POST request (Receiving data)\n@app.route('/predict', methods=['POST'])\ndef predict():\n    data = request.get_json()\n    age = data.get('age')\n    \n    # Dummy ML Logic\n    risk = \"High\" if age > 50 else \"Low\"\n    \n    # Return JSON response\n    return jsonify({\"status\": \"success\", \"risk_level\": risk})\n\n# if __name__ == '__main__':\n#     app.run(debug=True, port=5000)",
        breakdown: [
          { line: "app = Flask(__name__)", explanation: "Creates the central Flask application object. __name__ helps Flask locate static files and templates." },
          { line: "@app.route('/', methods=['GET'])", explanation: "A decorator that binds the URL path '/' (the homepage) to the home() function directly beneath it." },
          { line: "@app.route('/predict', methods=['POST'])", explanation: "Creates an API endpoint at '/predict' that specifically requires a POST request (meaning the user must submit data to it)." },
          { line: "data = request.get_json()", explanation: "Parses the incoming JSON payload from the user's POST request and converts it into a Python dictionary." },
          { line: "return jsonify(...)", explanation: "Converts our Python dictionary into a properly formatted JSON HTTP response to send back to the client." },
        ]
      },
      examNotes: {
        examNotes: [
          "Flask routes are created using the `@app.route()` decorator.",
          "APIs typically use `GET` to request data and `POST` to submit data.",
          "`jsonify()` converts a Python dictionary into an HTTP JSON response."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Which HTTP method is typically used in a Flask route when a user is submitting sensitive data (like a form or a JSON payload) to the server?",
            options: ["GET", "POST", "UPDATE", "FETCH"],
            correctIndex: 1,
            explanation: "POST requests encapsulate the data in the body of the HTTP request, making it the standard method for submitting data. GET appends data to the URL, which is insecure and limited in size."
          }
        ]
      }
    }
  },
  {
    id: 'python-streamlit',
    slug: 'streamlit',
    title: 'Getting Started With Streamlit Web Framework',
    description: "Building ML Web Apps quickly using Streamlit.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Streamlit is a revolutionary open-source app framework specifically designed for Machine Learning and Data Science teams. It allows you to create beautiful, interactive web applications in minutes using purely Python, with zero knowledge of HTML, CSS, or JavaScript required.\n\n### The Paradigm Shift\nHistorically, to deploy a dashboard, a Data Scientist had to write the backend in Flask/Django, and learn React or Vue for the frontend. Streamlit changes this. You simply write standard Python scripts from top to bottom. If you add `st.write(dataframe)`, Streamlit automatically renders it as a beautiful interactive HTML table in the browser.\n\n### Reactivity\nStreamlit apps act like highly interactive Jupyter Notebooks. Whenever a user interacts with a widget (like moving a slider, or clicking a button), Streamlit automatically re-runs the entire Python script from top to bottom, injecting the new widget values into your code and updating the UI instantly.\n\n### Caching\nBecause Streamlit re-runs the whole script on every user interaction, loading large machine learning models or 5GB datasets would be painfully slow. Streamlit solves this with the `@st.cache_data` decorator, which saves the results of heavy functions in memory so they load instantly on subsequent runs.",
        eli5: "Streamlit is magic. You write a normal Python script, and it instantly generates a sleek, modern website out of your code without you writing a single line of web code."
      },
      why: {
        text: "Speed. Data scientists can deploy functional, interactive proof-of-concept web apps for their ML models in an afternoon, rather than waiting weeks for a frontend engineering team.",
        tip: "Streamlit runs from top-to-bottom on every interaction. Always put heavy data loading inside functions decorated with `@st.cache_data` to prevent your app from freezing on every click!"
      },
      code: {
        code: "import streamlit as st\nimport pandas as pd\nimport numpy as np\n\n# Set page title\nst.title(\"My First ML Dashboard\")\n\n# Sidebar widget\nnum_points = st.sidebar.slider(\"Number of points\", 10, 100, 50)\n\n# Main content\nst.write(f\"Generating a chart with {num_points} data points...\")\n\n# Generate random data based on slider\nchart_data = pd.DataFrame(\n    np.random.randn(num_points, 3),\n    columns=['A', 'B', 'C']\n)\n\n# Render an interactive line chart instantly\nst.line_chart(chart_data)",
        breakdown: [
          { line: "import streamlit as st", explanation: "Imports the Streamlit library. It is convention to alias it as 'st'." },
          { line: "st.title(\"My First ML Dashboard\")", explanation: "Automatically generates an HTML <h1> tag styled beautifully at the top of the web app." },
          { line: "st.sidebar.slider(...)", explanation: "Creates a sliding input widget placed in a collapsible left sidebar. The current value of the slider is assigned to the 'num_points' variable in real-time." },
          { line: "st.write(...)", explanation: "The 'swiss army knife' of Streamlit. It can render text, dataframes, markdown, and errors dynamically depending on what you pass to it." },
          { line: "st.line_chart(chart_data)", explanation: "Takes a Pandas DataFrame and instantly renders a fully interactive, zoomable line chart without needing complex Matplotlib code." },
        ]
      },
      examNotes: {
        examNotes: [
          "Streamlit apps are purely Python; no frontend web languages are required.",
          "The entire script re-runs from top to bottom whenever a user interacts with a widget.",
          "`@st.cache_data` is used to cache expensive operations (like loading data or models) to prevent slowdowns."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What happens under the hood when a user interacts with a widget (like a slider or button) in a Streamlit app?",
            options: ["It sends an AJAX request to update just that widget", "It opens a new browser tab", "Streamlit automatically re-runs the entire Python script from top to bottom with the new widget value", "The app crashes until the developer manually refreshes it"],
            correctIndex: 2,
            explanation: "Streamlit's core architecture is reactive. Any interaction with an input widget triggers a full top-to-bottom re-execution of the Python script, ensuring the UI always perfectly reflects the current state of variables."
          }
        ]
      }
    }
  }
,
  {
    id: 'python-type-hinting',
    slug: 'type-hinting',
    title: 'Type Hinting & Pydantic',
    description: "Modern static typing in Python, PEP 484, and data validation with Pydantic.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Type Hinting brings static typing to Python's dynamic world. It allows you to explicitly state what data types your variables, function arguments, and return values should be.\n\n### PEP 484 and the `typing` Module\nHistorically, Python developers had to read the code or docstrings to guess what type of data a function expected. With Type Hinting, you can explicitly declare `def process_data(data: List[int]) -> bool:`. The `typing` module provides advanced hints like `Optional`, `Dict`, `Union`, and `Any`.\n\n### Static Type Checking with `mypy`\nType hints do not affect Python at runtime (Python ignores them when running code). Instead, you run a static analyzer like `mypy` before running your code. It scans your codebase and points out exactly where you passed a String into a function that expected an Integer, catching massive bugs before they ever reach production.\n\n### Pydantic Data Validation\nPydantic is the most downloaded data validation library in Python. It enforces type hints at *runtime*. If you define a Pydantic model expecting an Integer and pass it a String like `'123'`, Pydantic will automatically coerce it into an Integer. If coercion is impossible (like `'hello'`), it throws a strict validation error. Pydantic powers FastAPI, making it the industry standard for API development.",
        eli5: "Type hinting is like putting labels on your moving boxes. Instead of a box saying 'Stuff', it says 'Fragile Glassware'. Pydantic is the strict bouncer at the door making sure nobody sneaks an apple into a box meant for oranges."
      },
      why: {
        text: "In massive codebases, dynamic typing becomes a nightmare because you never know what shape the data is in. Type hinting enables auto-complete in VS Code, makes code self-documenting, and prevents thousands of runtime crashes.",
        tip: "Always use `Optional[str]` instead of just `str` if there is even a 1% chance the variable could be `None`. It forces you to handle the None case explicitly!"
      },
      code: {
        code: "from typing import List, Optional\nfrom pydantic import BaseModel, ValidationError\n\n# 1. Standard Type Hints\ndef calculate_total(prices: List[float], tax_rate: float = 0.1) -> float:\n    return sum(prices) * (1 + tax_rate)\n\n# 2. Pydantic Model\nclass User(BaseModel):\n    id: int\n    name: str\n    email: Optional[str] = None\n\n# Pydantic automatic coercion\nuser = User(id='100', name='Alex')\nprint(user.id)  # Outputs integer 100",
        breakdown: [
          { line: "from typing import List, Optional", explanation: "Imports advanced type hint structures. 'List' is used for array hints, 'Optional' means the value can be either the specified type OR None." },
          { line: "from pydantic import BaseModel", explanation: "Imports the base class used to create strictly validated data models in Pydantic." },
          { line: "def calculate_total(prices: List[float]...", explanation: "The signature strictly states: it accepts a list of floats, an optional float tax rate, and promises to return a float." },
          { line: "class User(BaseModel):", explanation: "Defines a Pydantic model. By inheriting from BaseModel, it gains the power to validate data upon instantiation." },
          { line: "email: Optional[str] = None", explanation: "The email is an optional string, and defaults to None if the user does not provide it." },
          { line: "user = User(id='100', name='Alex')", explanation: "We pass a string '100' for the id. Because the model expects an int, Pydantic automatically casts the string to an integer at runtime!" }
        ]
      },
      examNotes: {
        examNotes: [
          "Python ignores type hints at runtime unless a framework like Pydantic or FastAPI explicitly enforces them.",
          "`Optional[T]` is exactly equivalent to `Union[T, None]`.",
          "To enforce types, you must use a static type checker like `mypy`."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "What is the primary difference between standard Python type hints and Pydantic?",
            options: ["Type hints are faster", "Pydantic enforces types at runtime, standard hints do not", "Standard hints require compiling to C", "Pydantic is built into the Python standard library"],
            correctIndex: 1,
            explanation: "Standard Python type hints are ignored during execution and only checked by linters like mypy. Pydantic actively validates and coerces data while the program is running."
          }
        ]
      }
    }
  },
  {
    id: 'python-asyncio',
    slug: 'asyncio',
    title: 'Asynchronous Programming (asyncio)',
    description: "Master concurrent programming with async/await, event loops, and non-blocking I/O.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Asynchronous programming allows your code to run concurrently without multiple threads or processes. It is the modern standard for writing highly scalable web servers and scripts.\n\n### The Event Loop\nAt the core of `asyncio` is the Event Loop. Think of it as a highly efficient manager. Instead of letting the CPU sit idle while waiting for a slow network response or a database query to return, the event loop pauses the current task and immediately starts executing another task. Once the network response arrives, it resumes the paused task.\n\n### `async` and `await`\nTo use asyncio, you define your functions using the `async def` keyword, which turns the function into a 'coroutine'. Inside a coroutine, you use the `await` keyword in front of any I/O bound operation (like downloading a file). When Python hits `await`, it essentially says 'This is going to take a while, go do something else while I wait for this.'\n\n### Async vs Multithreading\nUnlike multithreading (where the OS constantly switches between threads, incurring overhead), asynchronous programming runs entirely on a single thread. It uses cooperative multitasking—tasks explicitly yield control back to the event loop. This makes it vastly more memory efficient, allowing a single server to handle tens of thousands of concurrent connections (like in Node.js or FastAPI).",
        eli5: "Imagine a chef making toast and boiling eggs. Synchronous: Put bread in toaster, stare at it for 2 mins, then put eggs in water. Asynchronous (asyncio): Put bread in toaster, start boiling eggs immediately while toaster runs. You get both done in half the time."
      },
      why: {
        text: "For I/O bound tasks (API calls, web scraping, database queries), synchronous code is disastrously slow. Asyncio is the backbone of modern frameworks like FastAPI, aiohttp, and Discord.py. If you are building microservices, you must know asyncio.",
        tip: "You can ONLY use `await` inside an `async def` function. And you cannot `await` a regular, synchronous function (it will just block the event loop)!"
      },
      code: {
        code: "import asyncio\nimport time\n\nasync def fetch_data(id, delay):\n    print(f\"Task {id}: Starting fetch...\")\n    # Simulate network delay (does NOT block the CPU)\n    await asyncio.sleep(delay)\n    print(f\"Task {id}: Done!\")\n    return {\"id\": id, \"data\": \"Success\"}\n\nasync def main():\n    start = time.time()\n    # Schedule 3 tasks to run concurrently\n    tasks = [\n        fetch_data(1, 2),\n        fetch_data(2, 3),\n        fetch_data(3, 1)\n    ]\n    # Wait for all tasks to finish\n    results = await asyncio.gather(*tasks)\n    print(f\"Total time: {time.time() - start:.2f}s\")\n    print(results)\n\n# Entry point\n# asyncio.run(main())",
        breakdown: [
          { line: "async def fetch_data(id, delay):", explanation: "The 'async' keyword marks this function as a coroutine, meaning it can be paused and resumed." },
          { line: "await asyncio.sleep(delay)", explanation: "The critical line. 'await' tells the event loop to pause this specific task for 'delay' seconds and go execute other tasks. (We use asyncio.sleep instead of time.sleep because time.sleep blocks the entire thread)." },
          { line: "async def main():", explanation: "We must wrap our main execution logic in an async coroutine as well to use 'await' inside it." },
          { line: "tasks = [...]", explanation: "Creates a list of 3 unexecuted coroutine objects. Notice we are passing delays of 2, 3, and 1 seconds." },
          { line: "results = await asyncio.gather(*tasks)", explanation: "Executes all 3 tasks concurrently. Even though the delays add up to 6 seconds, the total execution time will only be ~3 seconds (the length of the longest single task)." },
          { line: "asyncio.run(main())", explanation: "The standard way to start the event loop and execute the top-level coroutine from a synchronous script." }
        ]
      },
      examNotes: {
        examNotes: [
          "Asyncio is strictly for I/O bound tasks. It does absolutely nothing to speed up CPU-bound tasks (like heavy math).",
          "A regular function that blocks (like `requests.get` or `time.sleep`) will freeze the entire asyncio event loop.",
          "`asyncio.gather()` is the standard way to run multiple coroutines concurrently."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "Why should you NOT use `time.sleep()` inside an `async def` function?",
            options: ["It throws a SyntaxError", "It blocks the entire thread, defeating the purpose of the event loop", "It is deprecated in Python 3", "It runs too fast"],
            correctIndex: 1,
            explanation: "`time.sleep()` is synchronous and blocking. It will freeze the entire event loop, preventing any other async tasks from running. Always use `await asyncio.sleep()` instead."
          }
        ]
      }
    }
  },
  {
    id: 'python-pytest',
    slug: 'automated-testing',
    title: 'Automated Testing (pytest)',
    description: "Unit testing, fixtures, mocking, and ensuring code reliability.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "Automated testing is the practice of writing code that tests your other code. It guarantees that as you add new features, you haven't broken the old ones. `pytest` is the undisputed industry standard for testing in Python.\n\n### Unit Testing\nA unit test isolates a small piece of code (like a single function) and verifies it behaves exactly as expected. If you have a `add(x, y)` function, your unit test passes inputs like `2, 3` and asserts that the output is exactly `5`.\n\n### Pytest Basics\nUnlike Python's built-in `unittest` library which requires you to write verbose Object-Oriented classes, `pytest` allows you to write simple, raw functions. Any file starting with `test_` and any function starting with `test_` will be automatically discovered and run by the pytest framework. You just use standard Python `assert` statements.\n\n### Fixtures\nFixtures are powerful tools that provide data, configurations, or state to your tests. If 10 different tests all require a temporary SQLite database connection, you can write a fixture to create that database, yield it to the test, and then cleanly tear it down after the test finishes.\n\n### Mocking\nSometimes functions interact with external systems (like charging a credit card via Stripe API). You obviously don't want to hit a real API and spend money every time you run your tests. Mocking allows you to intercept the API call and return a fake 'Success' response, allowing you to test your code's logic without relying on external servers.",
        eli5: "Testing is like a teacher grading homework. Your main code is the student doing the math. The Test code is the answer key. Pytest just runs through the homework and puts a red X or a green checkmark next to every problem."
      },
      why: {
        text: "Code without tests is broken by design. In a professional environment, you cannot merge your code into the main project unless it passes all the automated tests in the CI/CD pipeline. Testing changes debugging from 'guessing what broke' to 'knowing exactly what broke on line 42'.",
        tip: "Write your tests to cover the 'Happy Path' (normal inputs), but more importantly, write tests to cover the 'Sad Path' (negative numbers, None values, missing keys). That is where the bugs live."
      },
      code: {
        code: "# main.py\ndef divide(a, b):\n    if b == 0:\n        raise ValueError(\"Cannot divide by zero\")\n    return a / b\n\n# test_main.py\nimport pytest\nfrom main import divide\n\ndef test_divide_normal():\n    # Arrange & Act\n    result = divide(10, 2)\n    # Assert\n    assert result == 5.0\n\ndef test_divide_by_zero():\n    # We use pytest.raises to assert that an error IS thrown\n    with pytest.raises(ValueError) as exc_info:\n        divide(10, 0)\n    \n    assert str(exc_info.value) == \"Cannot divide by zero\"",
        breakdown: [
          { line: "def divide(a, b):", explanation: "The main function we want to test. Notice it explicitly raises a ValueError for division by zero." },
          { line: "import pytest", explanation: "Imports the pytest framework into our testing file." },
          { line: "def test_divide_normal():", explanation: "A test function. Pytest will automatically run this because the name starts with 'test_'." },
          { line: "assert result == 5.0", explanation: "The standard Python assert statement. If result is 5.0, it silently passes. If result is anything else, pytest prints a massive error report." },
          { line: "with pytest.raises(ValueError) as exc_info:", explanation: "This tells pytest: 'I EXPECT the following block of code to crash with a ValueError. If it does NOT crash, fail the test!'" },
          { line: "assert str(exc_info.value) == ...", explanation: "We capture the error and assert that the error message perfectly matches our expected string." }
        ]
      },
      examNotes: {
        examNotes: [
          "Pytest automatically discovers files matching `test_*.py` or `*_test.py`.",
          "Fixtures are defined using the `@pytest.fixture` decorator.",
          "Use `pytest.raises()` to test that your code correctly handles and throws expected exceptions."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "In pytest, how do you verify that a function correctly throws an error when given invalid input?",
            options: ["Use a try/except block", "Use the `assert_error()` function", "Use the `with pytest.raises(ExpectedError):` context manager", "You cannot test for errors in pytest"],
            correctIndex: 2,
            explanation: "The `with pytest.raises(ExceptionType)` context manager is the standard way to assert that a block of code will raise a specific exception. If the exception is raised, the test passes."
          }
        ]
      }
    }
  },
  {
    id: 'python-api-requests',
    slug: 'api-requests',
    title: 'Working with APIs (requests)',
    description: "Consuming REST APIs, HTTP methods, JSON parsing, and handling status codes.",
    estimatedMinutes: 60,
    interviewQuestions: [],
    sections: {
      what: {
        text: "In the modern web, applications rarely operate in isolation. They communicate with other servers to get weather data, send emails, or fetch stock prices. They do this by making HTTP requests to REST APIs. The `requests` library is the absolute standard for doing this in Python.\n\n### HTTP Methods\nWhen you talk to an API, you must specify what action you want to take using an HTTP Method. \n- **GET**: Retrieve data from the server (e.g., getting a list of users).\n- **POST**: Send new data to the server to create a resource (e.g., submitting a sign-up form).\n- **PUT/PATCH**: Update an existing resource.\n- **DELETE**: Remove a resource.\n\n### Status Codes\nWhenever you make a request, the server responds with a 3-digit Status Code.\n- **200s (Success)**: Everything went perfectly. (e.g., 200 OK, 201 Created).\n- **400s (Client Error)**: YOU made a mistake. (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found).\n- **500s (Server Error)**: The SERVER crashed. It's not your fault. (e.g., 500 Internal Server Error).\n\n### Parsing JSON\nAlmost all REST APIs return data in JSON (JavaScript Object Notation) format. JSON looks almost exactly like a Python Dictionary. The `requests` library provides a built-in `.json()` method that automatically parses the incoming JSON text string and converts it directly into a standard Python dictionary so you can access it easily.",
        eli5: "An API is a restaurant menu. The `requests` library is the waiter. You tell the waiter what you want (GET burger), the waiter goes to the kitchen (Server), and brings you back your food (JSON data). If the kitchen is out of burgers, the waiter brings back an error code (404 Not Found)."
      },
      why: {
        text: "Whether you are a Data Scientist pulling live Crypto prices from Binance, or a Backend Engineer integrating Stripe payments, consuming APIs is a daily requirement. The `requests` library abstracts away all the nightmare-inducing networking protocols into simple, elegant python commands.",
        tip: "Never hardcode your API keys (passwords) directly into your python script. If you push that to GitHub, hackers will steal it in seconds. Use environment variables instead!"
      },
      code: {
        code: "import requests\n\nurl = \"https://jsonplaceholder.typicode.com/users/1\"\n\n# 1. Make a GET request\nresponse = requests.get(url)\n\n# 2. Always check the status code first\nif response.status_code == 200:\n    # 3. Parse the JSON response into a Dictionary\n    user_data = response.json()\n    \n    print(f\"Success! Fetched user: {user_data['name']}\")\n    print(f\"Email: {user_data['email']}\")\nelse:\n    # Handle the error\n    print(f\"Failed to fetch data. Status Code: {response.status_code}\")\n\n# Example POST request with headers\npayload = {'title': 'foo', 'body': 'bar', 'userId': 1}\nheaders = {'Content-type': 'application/json'}\n\npost_resp = requests.post(\n    \"https://jsonplaceholder.typicode.com/posts\",\n    json=payload,\n    headers=headers\n)\nprint(\"POST Status:\", post_resp.status_code)",
        breakdown: [
          { line: "response = requests.get(url)", explanation: "Initiates a synchronous HTTP GET request to the specified URL. The script will pause on this line until the server responds." },
          { line: "if response.status_code == 200:", explanation: "Best practice: ALWAYS verify the status code is 200 (OK) before trying to read the data. If it's a 404, reading the data will likely crash your app." },
          { line: "user_data = response.json()", explanation: "Takes the raw JSON text returned by the server and magically converts it into a Python Dictionary." },
          { line: "post_resp = requests.post(..., json=payload)", explanation: "Makes a POST request to send data. By passing the payload to the 'json' parameter, the library automatically serializes our dictionary into a JSON string and sets the correct headers!" }
        ]
      },
      examNotes: {
        examNotes: [
          "`response.raise_for_status()` is a great method that automatically throws a Python exception if the status code is a 4xx or 5xx error.",
          "Pass query parameters (like `?page=2&sort=desc`) using the `params={'page': 2, 'sort': 'desc'}` argument in `requests.get()`.",
          "Authentication is typically handled by passing a Bearer token in the `headers` dictionary."
        ]
      },
      quiz: {
        quiz: [
          {
            question: "If an API returns a Status Code of 401, what does it generally mean?",
            options: ["The server crashed", "The resource was successfully created", "Unauthorized (You provided an invalid or missing API key)", "The resource was not found"],
            correctIndex: 2,
            explanation: "4xx errors are Client Errors. 401 specifically means Unauthorized—you are trying to access a secure API endpoint without providing valid authentication credentials."
          }
        ]
      }
    }
  }
];
