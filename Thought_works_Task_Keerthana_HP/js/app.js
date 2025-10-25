var app = angular.module('quizApp', []);

app.controller('QuizController', function($scope) {
    $scope.userName = '';
    $scope.currentState = 'welcome';
    $scope.currentSet = 0;
    $scope.currentQuestion = 0;
    $scope.score = 0;
    $scope.userAnswers = [];

    $scope.quizSets = [
        {
           
            questions: [
                {
                    question: "Which is the smallest country in the world?",
                    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                    correct: 1
                },
                {
                    question: "What is the capital of Australia?",
                    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
                    correct: 2
                },
                {
                    question: "Which is the longest river in the world?",
                    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
                    correct: 1
                },
                {
                    question: "Which continent is the largest?",
                    options: ["North America", "Africa", "Europe", "Asia"],
                    correct: 3
                },
                {
                    question: "What is the capital of France?",
                    options: ["London", "Paris", "Berlin", "Rome"],
                    correct: 1
                },
                {
                    question: "What is the largest ocean on Earth?",
                    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
                    correct: 3
                },
                {
                    question: "Which is the tallest mountain in the world?",
                    options: ["K2", "Mount Everest", "Mount Kilimanjaro", "Mount Fuji"],
                    correct: 1
                },
                {
                    question: "Which country is home to the kangaroo?",
                    options: ["New Zealand", "South Africa", "Australia", "India"],
                    correct: 2
                },
                {
                    question: "Which country is known as the Land of the Rising Sun?",
                    options: ["China", "Korea", "Japan", "Thailand"],
                    correct: 2
                },
                {
                    question: "What is the capital of Brazil?",
                    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
                    correct: 2
                }
            ]
        },
        {
      
            questions: [
                {
                    question: "Which planet is closest to the sun?",
                    options: ["Venus", "Mars", "Mercury", "Earth"],
                    correct: 2
                },
                {
                    question: "What is the hardest natural substance on Earth?",
                    options: ["Gold", "Iron", "Diamond", "Platinum"],
                    correct: 2
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Jupiter", "Mars", "Venus", "Saturn"],
                    correct: 1
                },
                {
                    question: "What is the largest mammal in the world?",
                    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                    correct: 1
                },
                {
                    question: "Which is the fastest land animal?",
                    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
                    correct: 1
                },
                {
                    question: "Which animal is known as the 'King of the Jungle'?",
                    options: ["Tiger", "Lion", "Leopard", "Panther"],
                    correct: 1
                },
                {
                    question: "What is the largest organ in the human body?",
                    options: ["Heart", "Brain", "Liver", "Skin"],
                    correct: 3
                },
                {
                    question: "What is the chemical symbol for gold?",
                    options: ["Au", "Ag", "Fe", "Cu"],
                    correct: 0
                },
                {
                    question: "Which famous scientist developed the theory of relativity?",
                    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
                    correct: 1
                },
                {
                    question: "Who is known as the father of computers?",
                    options: ["Charles Babbage", "Bill Gates", "Steve Jobs", "Alan Turing"],
                    correct: 0
                }
            ]
        },
        {
     
            questions: [
                {
                    question: "Who painted the Mona Lisa?",
                    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
                    correct: 1
                },
                {
                    question: "Who wrote 'Romeo and Juliet'?",
                    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                    correct: 1
                },
                {
                    question: "What is the most spoken language in the world?",
                    options: ["English", "Spanish", "Mandarin", "Hindi"],
                    correct: 2
                },
                {
                    question: "What is the currency of Japan?",
                    options: ["Won", "Yuan", "Yen", "Ringgit"],
                    correct: 2
                },
                {
                    question: "What is the main ingredient in guacamole?",
                    options: ["Banana", "Avocado", "Mango", "Papaya"],
                    correct: 1
                },
                {
                    question: "Which sport is played at Wimbledon?",
                    options: ["Football", "Cricket", "Tennis", "Golf"],
                    correct: 2
                },
                {
                    question: "What is the national flower of Japan?",
                    options: ["Rose", "Lotus", "Cherry Blossom", "Tulip"],
                    correct: 2
                },
                {
                    question: "Who invented the telephone?",
                    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
                    correct: 1
                },
                {
                    question: "How many players are there in a cricket team?",
                    options: ["9", "10", "11", "12"],
                    correct: 2
                },
                {
                    question: "How many continents are there in the world?",
                    options: ["5", "6", "7", "8"],
                    correct: 2
                }
            ]
        }
    ];

    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    $scope.startQuiz = function() {
        if ($scope.userName.trim() === '') {
            return;
        }
        // Check if name contains only alphabets and spaces
        var nameRegex = /^[a-zA-Z\s]*$/;
        if (!nameRegex.test($scope.userName)) {
            alert('Please use only alphabets in name!');
            return;
        }
        
        // Select a random set
        $scope.currentSet = Math.floor(Math.random() * 3) + 1;
        
        // Create a deep copy of the questions and shuffle them
        var currentQuizSet = $scope.quizSets[$scope.currentSet - 1];
        var shuffledQuestions = JSON.parse(JSON.stringify(currentQuizSet.questions));
        shuffleArray(shuffledQuestions);
        
        // Replace the questions with shuffled ones
        currentQuizSet.questions = shuffledQuestions;
        
        $scope.currentQuestion = 0;
        $scope.userAnswers = new Array(10).fill(null);
        $scope.visitedQuestions = new Array(10).fill(false);
        $scope.visitedQuestions[0] = true;
        $scope.score = 0;
        $scope.currentState = 'quiz';
    };

    $scope.getCurrentQuestion = function() {
        return $scope.quizSets[$scope.currentSet - 1].questions[$scope.currentQuestion];
    };

    $scope.goToQuestion = function(questionNumber) {
        $scope.currentQuestion = questionNumber;
        $scope.visitedQuestions[questionNumber] = true;
    };

    $scope.$watch('userAnswers', function(newVal, oldVal) {
        if (newVal && oldVal) {
            newVal.forEach(function(answer, index) {
                // If the answer is now valid (not null or -1), make sure it's not marked as skipped
                if (answer !== null && answer !== -1) {
                    if (oldVal[index] === -1) {
                        $scope.userAnswers[index] = answer;
                    }
                }
            });
        }
    }, true);

    $scope.getQuizSetName = function() {
        switch($scope.currentSet) {
            case 1: return 'Set A';
            case 2: return 'Set B';
            case 3: return 'Set C';
            default: return '';
        }
    };

    $scope.getProgressPercentage = function() {
        return ($scope.getAnsweredCount() / 10) * 100;
    };

    $scope.getAnsweredCount = function() {
        return $scope.userAnswers.filter(answer => answer !== null && answer !== -1).length;
    };

    $scope.previousQuestion = function() {
        if ($scope.currentQuestion > 0) {
            $scope.currentQuestion--;
            $scope.visitedQuestions[$scope.currentQuestion] = true;
        }
    };

    $scope.nextQuestion = function() {
        if ($scope.currentQuestion < 9) {
            // Only mark as skipped if still null (not answered)
            if ($scope.userAnswers[$scope.currentQuestion] === null) {
                $scope.userAnswers[$scope.currentQuestion] = -1;
            }
            $scope.currentQuestion++;
            $scope.visitedQuestions[$scope.currentQuestion] = true;
        }
    };

    $scope.submitQuiz = function() {
        $scope.score = 0;
        var currentQuizSet = $scope.quizSets[$scope.currentSet - 1];
        for (var i = 0; i < 10; i++) {
            if ($scope.userAnswers[i] === currentQuizSet.questions[i].correct) {
                $scope.score++;
            }
        }
        $scope.animatedScore = 0;
        $scope.currentState = 'results';
        // Animate score and confetti after view updates
        setTimeout(function() {
            // Animate score
            var i = 0;
            var interval = setInterval(function() {
                $scope.$apply(function() { 
                    $scope.animatedScore = Math.min(i, $scope.score);
                });
                if (i >= $scope.score) clearInterval(interval);
                i++;
            }, 120);
            // Confetti
            var confetti = document.getElementById('confetti');
            if (confetti) {
                confetti.innerHTML = '';
                for (let j = 0; j < 60; j++) {
                    let div = document.createElement('div');
                    div.className = 'confetti-piece';
                    div.style.left = Math.random() * 100 + '%';
                    div.style.background = 'hsl(' + (Math.random()*360) + ',80%,60%)';
                    div.style.animationDelay = (Math.random()*0.7) + 's';
                    confetti.appendChild(div);
                }
            }
        }, 300);
    };

    // Store the original questions for resetting
    var originalQuizSets = JSON.parse(JSON.stringify($scope.quizSets));

    $scope.restartQuiz = function() {
        // Reset questions to their original order
        $scope.quizSets = JSON.parse(JSON.stringify(originalQuizSets));
        
        $scope.currentState = 'welcome';
        $scope.currentSet = 0;
        $scope.currentQuestion = 0;
        $scope.userAnswers = [];
        $scope.score = 0;
    };

    // Show review screen
    $scope.reviewAnswers = function() {
        $scope.selectedSet = $scope.currentSet - 1;
        $scope.currentState = 'review';
    };
});