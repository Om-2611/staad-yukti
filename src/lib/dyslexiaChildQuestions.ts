export interface DyslexiaChildOption {
  text: string;
  score: number;
}

export interface DyslexiaChildQuestion {
  id: string;
  text: string;
  options: DyslexiaChildOption[];
  correctAnswer: string;
}

export interface DyslexiaChildCategory {
  questions: DyslexiaChildQuestion[];
  expectedTimePerQuestion: number; // in seconds
  thresholdIncorrect: number;
  thresholdSlowResponses: number;
}

// Language type
export type Language = 'en' | 'hi' | 'te';

// Cache for loaded translations
let hindiQuestions: Record<string, DyslexiaChildCategory> | null = null;
let teluguQuestions: Record<string, DyslexiaChildCategory> | null = null;

// Function to get Dyslexia Child questions based on language
export const getDyslexiaChildQuestions = async (language: Language): Promise<Record<string, DyslexiaChildCategory>> => {
  if (language === 'hi') {
    if (!hindiQuestions) {
      // Dynamically import Hindi translations
      const hiModule = await import('@/locales/dyslexia_child/hi.json');
      hindiQuestions = hiModule.default;
    }
    return hindiQuestions;
  } else if (language === 'te') {
    if (!teluguQuestions) {
      // Dynamically import Telugu translations
      const teModule = await import('@/locales/dyslexia_child/te.json');
      teluguQuestions = teModule.default;
    }
    return teluguQuestions;
  }
  
  // Default to English
  return dyslexiaChildQuestions;
};

// Age 4-6: 20 questions, 10-15 sec per question
const dyslexiaChildQuestions: Record<string, DyslexiaChildCategory> = {
  'age-4-6': {
    expectedTimePerQuestion: 12.5, // average of 10-15 sec
    thresholdIncorrect: 6,
    thresholdSlowResponses: 4,
    questions: [
      {
        id: 'AGE4-6-1',
        text: 'Which one is a cat?',
        correctAnswer: '🐱',
        options: [
          { text: '🐱', score: 1 },
          { text: '🐶', score: 0 },
          { text: '🐰', score: 0 },
          { text: '🐘', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-2',
        text: 'Choose the number 3',
        correctAnswer: '3',
        options: [
          { text: '1', score: 0 },
          { text: '2', score: 0 },
          { text: '3', score: 1 },
          { text: '4', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-3',
        text: 'Which picture shows rain?',
        correctAnswer: '☔',
        options: [
          { text: '⭐', score: 0 },
          { text: '☁️', score: 0 },
          { text: '☀️', score: 0 },
          { text: '☔', score: 1 }
        ]
      },
      {
        id: 'AGE4-6-4',
        text: 'Tap the same animal twice: 🐸 🐘 🐸',
        correctAnswer: '🐸',
        options: [
          { text: '🐶', score: 0 },
          { text: '🐘', score: 0 },
          { text: '🐸', score: 1 },
          { text: '🦁', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-5',
        text: 'Which toy is smaller?',
        correctAnswer: 'small toy',
        options: [
          { text: '🧸', score: 0 },
          { text: '🧸', score: 1 },
          { text: '🚗', score: 0 },
          { text: '🚗', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-6',
        text: 'What comes after 2?',
        correctAnswer: '3',
        options: [
          { text: '3', score: 1 },
          { text: '5', score: 0 },
          { text: '1', score: 0 },
          { text: '4', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-7',
        text: 'Which shape is round?',
        correctAnswer: '🔵',
        options: [
          { text: '🔵', score: 1 },
          { text: '🟦', score: 0 },
          { text: '🟪', score: 0 },
          { text: '🟥', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-8',
        text: 'Which two look the same?',
        correctAnswer: '🐘',
        options: [
          { text: '🐘', score: 1 },
          { text: '🐪', score: 0 },
          { text: '🐘', score: 1 },
          { text: '🦏', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-9',
        text: 'Which one shows night?',
        correctAnswer: '🌙',
        options: [
          { text: '⭐', score: 0 },
          { text: '☁️', score: 0 },
          { text: '☀️', score: 0 },
          { text: '🌙', score: 1 }
        ]
      },
      {
        id: 'AGE4-6-10',
        text: 'Tap the animal',
        correctAnswer: '🐱',
        options: [
          { text: '🍎', score: 0 },
          { text: '🍏', score: 0 },
          { text: '⚽', score: 0 },
          { text: '🐱', score: 1 }
        ]
      },
      {
        id: 'AGE4-6-11',
        text: 'Which is first in this row? 🍎 ⭐ 🌈',
        correctAnswer: '🍎',
        options: [
          { text: '🍎', score: 1 },
          { text: '⭐', score: 0 },
          { text: '🌈', score: 0 },
          { text: '🍏', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-12',
        text: 'Pick the sky color',
        correctAnswer: '🔵',
        options: [
          { text: '🔵', score: 1 },
          { text: '🟥', score: 0 },
          { text: '🟢', score: 0 },
          { text: '🟠', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-13',
        text: 'Which number is bigger?',
        correctAnswer: '5',
        options: [
          { text: '5', score: 1 },
          { text: '2', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-14',
        text: 'Tap the toy',
        correctAnswer: '🧸',
        options: [
          { text: '🧸', score: 1 },
          { text: '🌳', score: 0 },
          { text: '🍎', score: 0 },
          { text: '🐰', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-15',
        text: 'Which two shapes are the same?',
        correctAnswer: '🟦',
        options: [
          { text: '🔵', score: 0 },
          { text: '🟦', score: 1 },
          { text: '🟦', score: 1 },
          { text: '🔵', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-16',
        text: 'Which is a fruit?',
        correctAnswer: '🍎',
        options: [
          { text: '🍎', score: 1 },
          { text: '🥕', score: 0 },
          { text: '🍋', score: 0 },
          { text: '🥔', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-17',
        text: 'Tap the picture showing water',
        correctAnswer: '💧',
        options: [
          { text: '💧', score: 1 },
          { text: '🌊', score: 0 },
          { text: '🌈', score: 0 },
          { text: '☀️', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-18',
        text: 'Which face is happy?',
        correctAnswer: '😊',
        options: [
          { text: '😊', score: 1 },
          { text: '😐', score: 0 },
          { text: '😠', score: 0 },
          { text: '😢', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-19',
        text: 'Which one can fly?',
        correctAnswer: '🦋',
        options: [
          { text: '🐘', score: 0 },
          { text: '🦋', score: 1 },
          { text: '🐢', score: 0 },
          { text: '🚗', score: 0 }
        ]
      },
      {
        id: 'AGE4-6-20',
        text: 'Which is in the middle? 🦋 🐛 🐞',
        correctAnswer: '🐛',
        options: [
          { text: '🦋', score: 0 },
          { text: '🐛', score: 1 },
          { text: '🐞', score: 0 }
        ]
      }
    ]
  },
  'age-6-10': {
    expectedTimePerQuestion: 11, // average of 10-12 sec
    thresholdIncorrect: 7,
    thresholdSlowResponses: 5,
    questions: [
      {
        id: 'AGE6-10-1',
        text: 'Choose the correct spelling',
        correctAnswer: 'school',
        options: [
          { text: 'skool', score: 0 },
          { text: 'school', score: 1 },
          { text: 'scholl', score: 0 },
          { text: 'scool', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-2',
        text: 'Which number is odd?',
        correctAnswer: '7',
        options: [
          { text: '4', score: 0 },
          { text: '7', score: 1 },
          { text: '10', score: 0 },
          { text: '12', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-3',
        text: 'Tap the word that sounds different:',
        correctAnswer: 'sun',
        options: [
          { text: 'cat', score: 0 },
          { text: 'mat', score: 0 },
          { text: 'hat', score: 0 },
          { text: 'sun', score: 1 }
        ]
      },
      {
        id: 'AGE6-10-4',
        text: 'What comes after 15?',
        correctAnswer: '16',
        options: [
          { text: '14', score: 0 },
          { text: '16', score: 1 },
          { text: '13', score: 0 },
          { text: '12', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-5',
        text: 'Choose the picture that shows "running"',
        correctAnswer: '🏃',
        options: [
          { text: '🧍', score: 0 },
          { text: '🏃', score: 1 },
          { text: '🚶', score: 0 },
          { text: '🧘', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-6',
        text: 'Find the word with b/d confusion:',
        correctAnswer: 'deb',
        options: [
          { text: 'bed', score: 0 },
          { text: 'deb', score: 1 },
          { text: 'beq', score: 0 },
          { text: 'beb', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-7',
        text: 'Tap the number bigger: 32 or 23?',
        correctAnswer: '32',
        options: [
          { text: '23', score: 0 },
          { text: '32', score: 1 }
        ]
      },
      {
        id: 'AGE6-10-8',
        text: 'Which one is a fruit?',
        correctAnswer: '🍎',
        options: [
          { text: '🍎', score: 1 },
          { text: '🥕', score: 0 },
          { text: '🍋', score: 0 },
          { text: '🍊', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-9',
        text: 'Choose the same word: dog, god, dig, dog',
        correctAnswer: 'dog',
        options: [
          { text: 'dog', score: 1 },
          { text: 'god', score: 0 },
          { text: 'dig', score: 0 },
          { text: 'dog', score: 1 }
        ]
      },
      {
        id: 'AGE6-10-10',
        text: 'Which one is spelled wrong?',
        correctAnswer: 'banna',
        options: [
          { text: 'apple', score: 0 },
          { text: 'orange', score: 0 },
          { text: 'banna', score: 1 },
          { text: 'grapes', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-11',
        text: 'Choose the letter that comes after M',
        correctAnswer: 'N',
        options: [
          { text: 'N', score: 1 },
          { text: 'O', score: 0 },
          { text: 'L', score: 0 },
          { text: 'P', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-12',
        text: 'Tap the word starting with "S"',
        correctAnswer: 'sun',
        options: [
          { text: 'tree', score: 0 },
          { text: 'cat', score: 0 },
          { text: 'sun', score: 1 },
          { text: 'ear', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-13',
        text: 'Choose the right shape for square',
        correctAnswer: '🟥',
        options: [
          { text: '🟩', score: 0 },
          { text: '🔵', score: 0 },
          { text: '🟧', score: 0 },
          { text: '🟥', score: 1 }
        ]
      },
      {
        id: 'AGE6-10-14',
        text: 'Which is rhyming with "ball"?',
        correctAnswer: 'tall',
        options: [
          { text: 'tall', score: 1 },
          { text: 'book', score: 0 },
          { text: 'pen', score: 0 },
          { text: 'run', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-15',
        text: 'Which one is a number?',
        correctAnswer: 'five',
        options: [
          { text: 'five', score: 1 },
          { text: 'fish', score: 0 },
          { text: 'fan', score: 0 },
          { text: 'fire', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-16',
        text: 'Find the odd one out',
        correctAnswer: 'cap',
        options: [
          { text: 'cat', score: 0 },
          { text: 'bat', score: 0 },
          { text: 'rat', score: 0 },
          { text: 'cap', score: 1 }
        ]
      },
      {
        id: 'AGE6-10-17',
        text: 'Choose two same numbers: 6, 9, 6, 4',
        correctAnswer: '6',
        options: [
          { text: '6', score: 1 },
          { text: '9', score: 0 },
          { text: '4', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-18',
        text: 'Tap the animal',
        correctAnswer: '🐱',
        options: [
          { text: '🍎', score: 0 },
          { text: '🔵', score: 0 },
          { text: '🐱', score: 1 },
          { text: '🎈', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-19',
        text: 'Choose the letter pattern that repeats:',
        correctAnswer: 'ABAB',
        options: [
          { text: 'ABAB', score: 1 },
          { text: 'AABB', score: 0 },
          { text: 'ABCD', score: 0 },
          { text: 'ABCA', score: 0 }
        ]
      },
      {
        id: 'AGE6-10-20',
        text: 'Which is first alphabetically?',
        correctAnswer: 'apple',
        options: [
          { text: 'ball', score: 0 },
          { text: 'apple', score: 1 },
          { text: 'cat', score: 0 },
          { text: 'dog', score: 0 }
        ]
      }
    ]
  },
  'age-10-16': {
    expectedTimePerQuestion: 9, // average of 8-10 sec
    thresholdIncorrect: 8,
    thresholdSlowResponses: 5,
    questions: [
      {
        id: 'AGE10-16-1',
        text: 'Choose the correct spelling',
        correctAnswer: 'receive',
        options: [
          { text: 'receive', score: 1 },
          { text: 'recieve', score: 0 },
          { text: 'recite', score: 0 },
          { text: 'receve', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-2',
        text: 'Which one does not rhyme?',
        correctAnswer: 'book',
        options: [
          { text: 'high', score: 0 },
          { text: 'sky', score: 0 },
          { text: 'tie', score: 0 },
          { text: 'book', score: 1 }
        ]
      },
      {
        id: 'AGE10-16-3',
        text: 'Tap the odd one out',
        correctAnswer: 'apple',
        options: [
          { text: 'circle', score: 0 },
          { text: 'square', score: 0 },
          { text: 'triangle', score: 0 },
          { text: 'apple', score: 1 }
        ]
      },
      {
        id: 'AGE10-16-4',
        text: 'What comes after 49?',
        correctAnswer: '50',
        options: [
          { text: '48', score: 0 },
          { text: '50', score: 1 },
          { text: '51', score: 0 },
          { text: '52', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-5',
        text: 'Choose the word with correct order',
        correctAnswer: 'from',
        options: [
          { text: 'from', score: 1 },
          { text: 'form', score: 0 },
          { text: 'froam', score: 0 },
          { text: 'frmo', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-6',
        text: 'Select the pair that matches sound',
        correctAnswer: 'sun-fun',
        options: [
          { text: 'sun-fun', score: 1 },
          { text: 'ball-doll', score: 0 },
          { text: 'pen-pan', score: 0 },
          { text: 'car-cat', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-7',
        text: 'Tap the correct homophone for "sea"',
        correctAnswer: 'see',
        options: [
          { text: 'see', score: 1 },
          { text: 'si', score: 0 },
          { text: 'she', score: 0 },
          { text: 'sew', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-8',
        text: 'Find the same number pair: 28, 82, 28, 38',
        correctAnswer: '28',
        options: [
          { text: '28', score: 1 },
          { text: '82', score: 0 },
          { text: '38', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-9',
        text: 'Choose the letter after G',
        correctAnswer: 'H',
        options: [
          { text: 'H', score: 1 },
          { text: 'F', score: 0 },
          { text: 'I', score: 0 },
          { text: 'J', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-10',
        text: 'Choose the odd word out',
        correctAnswer: 'cap',
        options: [
          { text: 'cat', score: 0 },
          { text: 'bat', score: 0 },
          { text: 'rat', score: 0 },
          { text: 'cap', score: 1 }
        ]
      },
      {
        id: 'AGE10-16-11',
        text: 'Tap the word that looks confusing (b/d)',
        correctAnswer: 'bed',
        options: [
          { text: 'bed', score: 1 },
          { text: 'bad', score: 0 },
          { text: 'bud', score: 0 },
          { text: 'bid', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-12',
        text: 'Which is spelled wrong?',
        correctAnswer: 'tigre',
        options: [
          { text: 'elephant', score: 0 },
          { text: 'giraffe', score: 0 },
          { text: 'lion', score: 0 },
          { text: 'tigre', score: 1 }
        ]
      },
      {
        id: 'AGE10-16-13',
        text: 'Choose word with same sound: "two"',
        correctAnswer: 'too',
        options: [
          { text: 'too', score: 1 },
          { text: 'to', score: 0 },
          { text: 'tow', score: 0 },
          { text: 'toy', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-14',
        text: 'Which one is a verb?',
        correctAnswer: 'run',
        options: [
          { text: 'run', score: 1 },
          { text: 'car', score: 0 },
          { text: 'chair', score: 0 },
          { text: 'hill', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-15',
        text: 'Choose similar meaning: "happy"',
        correctAnswer: 'glad',
        options: [
          { text: 'sad', score: 0 },
          { text: 'glad', score: 1 },
          { text: 'angry', score: 0 },
          { text: 'tired', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-16',
        text: 'Which number is missing? 12, 14, __, 18',
        correctAnswer: '16',
        options: [
          { text: '16', score: 1 },
          { text: '13', score: 0 },
          { text: '15', score: 0 },
          { text: '17', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-17',
        text: 'Which word is first alphabetically?',
        correctAnswer: 'apple',
        options: [
          { text: 'dog', score: 0 },
          { text: 'apple', score: 1 },
          { text: 'ball', score: 0 },
          { text: 'cat', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-18',
        text: 'Choose the correct sentence',
        correctAnswer: 'He plays.',
        options: [
          { text: 'He is play.', score: 0 },
          { text: 'He plays.', score: 1 },
          { text: 'He playing.', score: 0 },
          { text: 'Plays he', score: 0 }
        ]
      },
      {
        id: 'AGE10-16-19',
        text: 'Tap the rhyming pair',
        correctAnswer: 'both 1 & 3',
        options: [
          { text: 'light-right', score: 1 },
          { text: 'pen-fan', score: 0 },
          { text: 'big-pig', score: 1 },
          { text: 'both 1 & 3', score: 1 }
        ]
      },
      {
        id: 'AGE10-16-20',
        text: 'Choose matching pattern',
        correctAnswer: 'A1B2',
        options: [
          { text: 'A1B2', score: 1 },
          { text: 'A2B3', score: 0 },
          { text: 'A1B1', score: 0 },
          { text: 'A3B2', score: 0 }
        ]
      }
    ]
  },
  'age-16-plus': {
    expectedTimePerQuestion: 7, // average of 6-8 sec
    thresholdIncorrect: 9,
    thresholdSlowResponses: 6,
    questions: [
      {
        id: 'AGE16PLUS-1',
        text: 'Choose the correct spelling',
        correctAnswer: 'accommodate',
        options: [
          { text: 'accommodate', score: 1 },
          { text: 'accomodate', score: 0 },
          { text: 'accomadate', score: 0 },
          { text: 'accomodat', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-2',
        text: 'Which one is a homophone of "right"',
        correctAnswer: 'both',
        options: [
          { text: 'write', score: 1 },
          { text: 'rite', score: 1 },
          { text: 'both', score: 1 },
          { text: 'none', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-3',
        text: 'Choose the odd word out',
        correctAnswer: 'reflect',
        options: [
          { text: 'affect', score: 0 },
          { text: 'effect', score: 0 },
          { text: 'impact', score: 0 },
          { text: 'reflect', score: 1 }
        ]
      },
      {
        id: 'AGE16PLUS-4',
        text: 'Tap the correct word order',
        correctAnswer: 'their',
        options: [
          { text: 'their', score: 1 },
          { text: 'there', score: 0 },
          { text: 'they\'re', score: 0 },
          { text: 'thier', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-5',
        text: 'Which number is palindrome?',
        correctAnswer: '121',
        options: [
          { text: '121', score: 1 },
          { text: '234', score: 0 },
          { text: '456', score: 0 },
          { text: '987', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-6',
        text: 'Tap the word spelled incorrectly',
        correctAnswer: 'governmant',
        options: [
          { text: 'environment', score: 0 },
          { text: 'governmant', score: 1 },
          { text: 'education', score: 0 },
          { text: 'solution', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-7',
        text: 'Choose same sound pair:',
        correctAnswer: 'both',
        options: [
          { text: 'hear-here', score: 1 },
          { text: 'hair-hare', score: 1 },
          { text: 'both', score: 1 },
          { text: 'none', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-8',
        text: 'Which is closest meaning of "brief"?',
        correctAnswer: 'short',
        options: [
          { text: 'short', score: 1 },
          { text: 'long', score: 0 },
          { text: 'large', score: 0 },
          { text: 'slow', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-9',
        text: 'Choose correct sentence',
        correctAnswer: 'He doesn\'t know.',
        options: [
          { text: 'He don\'t know.', score: 0 },
          { text: 'He doesn\'t know.', score: 1 },
          { text: 'He not know.', score: 0 },
          { text: 'He got know.', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-10',
        text: 'Tap the odd number',
        correctAnswer: '15',
        options: [
          { text: '12', score: 0 },
          { text: '15', score: 1 },
          { text: '18', score: 0 },
          { text: '20', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-11',
        text: 'Choose the correct synonym of "huge"',
        correctAnswer: 'large',
        options: [
          { text: 'tiny', score: 0 },
          { text: 'large', score: 1 },
          { text: 'soft', score: 0 },
          { text: 'dull', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-12',
        text: 'Tap word that sounds confusing',
        correctAnswer: 'quiet',
        options: [
          { text: 'quite', score: 0 },
          { text: 'quiet', score: 1 },
          { text: 'quilt', score: 0 },
          { text: 'quit', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-13',
        text: 'Choose right antonym of "begin"',
        correctAnswer: 'end',
        options: [
          { text: 'end', score: 1 },
          { text: 'start', score: 0 },
          { text: 'continue', score: 0 },
          { text: 'finish', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-14',
        text: 'Tap the word with double letter',
        correctAnswer: 'apple',
        options: [
          { text: 'apple', score: 1 },
          { text: 'book', score: 0 },
          { text: 'play', score: 0 },
          { text: 'read', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-15',
        text: 'Choose the rhyming pair',
        correctAnswer: 'both',
        options: [
          { text: 'bear-fair', score: 1 },
          { text: 'cat-bat', score: 1 },
          { text: 'both', score: 1 },
          { text: 'none', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-16',
        text: 'Tap the sentence with correct grammar',
        correctAnswer: 'She goes. / She is going.',
        options: [
          { text: 'She go.', score: 0 },
          { text: 'She goes.', score: 1 },
          { text: 'She is going.', score: 1 },
          { text: 'She going.', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-17',
        text: 'Choose word with same sound: "knew"',
        correctAnswer: 'new',
        options: [
          { text: 'new', score: 1 },
          { text: 'now', score: 0 },
          { text: 'no', score: 0 },
          { text: 'near', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-18',
        text: 'Choose correct pattern',
        correctAnswer: 'ABAB',
        options: [
          { text: 'ABAB', score: 1 },
          { text: 'AABB', score: 0 },
          { text: 'ABBA', score: 0 },
          { text: 'ABCD', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-19',
        text: 'Tap word that doesn\'t fit',
        correctAnswer: 'sleep',
        options: [
          { text: 'read', score: 0 },
          { text: 'write', score: 0 },
          { text: 'sleep', score: 1 },
          { text: 'think', score: 0 }
        ]
      },
      {
        id: 'AGE16PLUS-20',
        text: 'Choose correct homophone for "pair"',
        correctAnswer: 'both',
        options: [
          { text: 'pear', score: 1 },
          { text: 'pare', score: 1 },
          { text: 'both', score: 1 },
          { text: 'none', score: 0 }
        ]
      }
    ]
  }
};

export default dyslexiaChildQuestions;
