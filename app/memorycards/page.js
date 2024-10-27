'use client'
import React, {useState} from 'react';
import FlashcardList from './flashcardlist';
import './app.css'

function App(){
    const [flashcard, setflashcards] = useState(SAMPLE_FLASHCARDS)

    // useEffect(() =>{

    // },[]
    // )
    return(
        <div className = "container">
             <FlashcardList flashcards={flashcard}/>
        </div>
       
    );
}
const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        question: 'question1',
        answer: 'a1',
        options: [
            'a1',
            'b1',
            'c1',
            'd1'
        ]
    },
    {
        id: 2,
        question: 'question2',
        answer: 'a2',
        options: [
            'a2',
            'b2',
            'c2',
            'd2'
        ]
    },
    {
        id: 3,
        question: 'question3',
        answer: 'a3',
        options: [
            'a3',
            'b3',
            'c3',
            'd3'
        ]
    },
    {
        id: 4,
        question: 'question4',
        answer: 'a4',
        options: [
            'a4',
            'b4',
            'c4',
            'd4'
        ]
    },
    {
        id: 5,
        question: 'question5',
        answer: 'a5',
        options: [
            'a5',
            'b5',
            'c5',
            'd5'
        ]
    },
    {
        id: 6,
        question: 'question6',
        answer: 'a6',
        options: [
            'a6',
            'b6',
            'c6',
            'd6'
        ]
    },
    {
        id: 7,
        question: 'question7',
        answer: 'a7',
        options: [
            'a7',
            'b7',
            'c7',
            'd7'
        ]
    },
    {
        id: 8,
        question: 'question8',
        answer: 'a8',
        options: [
            'a8',
            'b8',
            'c8',
            'd8'
        ]
    },
    {
        id: 9,
        question: 'question9',
        answer: 'a9',
        options: [
            'a9',
            'b9',
            'c9',
            'd9'
        ]
    },
    {
        id: 10,
        question: 'question10',
        answer: 'a10',
        options: [
            'a10',
            'b10',
            'c10',
            'd10'
        ]
    }
]

export default App;