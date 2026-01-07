let questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Markup Language",
            "High Tech Multi Language",
            "Hyper Transfer Main Link",
            "Home Tool Markup Language"
        ]
    },
    {
        numb: 2,
        question: "Which tag is used for the largest heading in HTML?",
        answer: "<h1>",
        options: [
            "<h1>",
            "<head>",
            "<header>",
            "<h6>"
        ]
    },
    {
        numb: 3,
        question: "What is the correct HTML element for inserting a line break?",
        answer: "<br>",
        options: [
            "<br>",
            "<lb>",
            "<break>",
            "<newline>"
        ]
    },
    {
        numb: 4,
        question: "In CSS, how do you select an element with id 'demo'?",
        answer: "#demo",
        options: [
            "#demo",
            ".demo",
            "demo",
            "*demo"
        ]
    },
    {
        numb: 5,
        question: "Which property is used to change the background color?",
        answer: "background-color",
        options: [
            "background-color",
            "color",
            "bgcolor",
            "background"
        ]
    },
    {
        numb: 6,
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        answer: "alert('Hello World')",
        options: [
            "alert('Hello World')",
            "msg('Hello World')",
            "msgBox('Hello World')",
            "alertBox('Hello World')"
        ]
    },
    {
        numb: 7,
        question: "Which keyword is used to declare a variable in ES6?",
        answer: "let",
        options: [
            "let",
            "var",
            "dim",
            "int"
        ]
    },
    {
        numb: 8,
        question: "What is the output of 2 + '2' in JavaScript?",
        answer: "'22'",
        options: [
            "'22'",
            "4",
            "NaN",
            "Error"
        ]
    },
    {
        numb: 9,
        question: "Which symbol is used for comments in JavaScript?",
        answer: "//",
        options: [
            "//",
            "#",
            "<!--",
            "**"
        ]
    },
    {
        numb: 10,
        question: "What does DOM stand for?",
        answer: "Document Object Model",
        options: [
            "Document Object Model",
            "Data Object Mode",
            "Digital Ordinance Model",
            "Desktop Orientation Mode"
        ]
    },
    {
        numb: 11,
        question: "Which array method adds a new element to the end?",
        answer: "push()",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ]
    },
    {
        numb: 12,
        question: "How do you check interaction equality in JS?",
        answer: "===",
        options: [
            "===",
            "==",
            "=",
            "equals()"
        ]
    },
    {
        numb: 13,
        question: "Which HTTP method is used to update data?",
        answer: "PUT",
        options: [
            "PUT",
            "GET",
            "POST",
            "DELETE"
        ]
    },
    {
        numb: 14,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Structured Query Language",
            "Strong Question Language",
            "Structured Question List",
            "Simple Query Language"
        ]
    },
    {
        numb: 15,
        question: "Which command initiates a new Git repository?",
        answer: "git init",
        options: [
            "git init",
            "git start",
            "git new",
            "git create"
        ]
    },
    {
        numb: 16,
        question: "What is the file extension for a Python file?",
        answer: ".py",
        options: [
            ".py",
            ".pt",
            ".python",
            ".p"
        ]
    },
    {
        numb: 17,
        question: "Which data structure uses LIFO?",
        answer: "Stack",
        options: [
            "Stack",
            "Queue",
            "Array",
            "Tree"
        ]
    },
    {
        numb: 18,
        question: "What is the time complexity of binary search?",
        answer: "O(log n)",
        options: [
            "O(log n)",
            "O(n)",
            "O(n^2)",
            "O(1)"
        ]
    },
    {
        numb: 19,
        question: "Which header is used for JSON content type?",
        answer: "Content-Type",
        options: [
            "Content-Type",
            "Accept",
            "Authorization",
            "Host"
        ]
    },
    {
        numb: 20,
        question: "What port does HTTP use by default?",
        answer: "80",
        options: [
            "80",
            "443",
            "8080",
            "21"
        ]
    },
    {
        numb: 21,
        question: "Which keyword creates a constant in JavaScript?",
        answer: "const",
        options: [
            "const",
            "let",
            "var",
            "final"
        ]
    },
    {
        numb: 22,
        question: "What does JSON stand for?",
        answer: "JavaScript Object Notation",
        options: [
            "JavaScript Object Notation",
            "Java Source Object Network",
            "JavaScript Online Node",
            "Java Standard Output Net"
        ]
    },
    {
        numb: 23,
        question: "Which function parses a JSON string?",
        answer: "JSON.parse()",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.toObj()",
            "parseJSON()"
        ]
    },
    {
        numb: 24,
        question: "What is a closure in JavaScript?",
        answer: "Function inside function",
        options: [
            "Function inside function",
            "Block of code",
            "Object property",
            "Class method"
        ]
    },
    {
        numb: 25,
        question: "Which event occurs when a user clicks an HTML element?",
        answer: "onclick",
        options: [
            "onclick",
            "onchange",
            "onmouseover",
            "onmouseclick"
        ]
    },
    {
        numb: 26,
        question: "What is the boolean value for 'false' in Python?",
        answer: "False",
        options: [
            "False",
            "false",
            "0",
            "null"
        ]
    },
    {
        numb: 27,
        question: "Which CSS property controls text size?",
        answer: "font-size",
        options: [
            "font-size",
            "text-size",
            "font-style",
            "text-style"
        ]
    },
    {
        numb: 28,
        question: "What is the box model component outside the border?",
        answer: "Margin",
        options: [
            "Margin",
            "Padding",
            "Content",
            "Outline"
        ]
    },
    {
        numb: 29,
        question: "Which Git command stages files?",
        answer: "git add",
        options: [
            "git add",
            "git commit",
            "git push",
            "git stage"
        ]
    },
    {
        numb: 30,
        question: "What is the result of '5' - 3 in JavaScript?",
        answer: "2",
        options: [
            "2",
            "53",
            "NaN",
            "Error"
        ]
    }
];
