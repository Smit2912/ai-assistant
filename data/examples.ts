export const samplePrompts = [
    "Create a function that reverses a string.",
    "Develop a simple to-do list application using React.",
    "Implement a binary search algorithm in Python.",
    "Create a REST API endpoint for user authentication.",
];

export const sampleCode = ` //Sample Fibonacci function
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`;

export const sampleBuggyCode = ` function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i <= items.length; i++) {
        total += items[i].price;
    }
    return total;
}`;

export const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "TypeScript",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
]