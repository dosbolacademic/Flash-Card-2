import React, { useState } from "react";
import "./FlashCard.css";
import FlashCardData from "./FlashCardData";
console.log('FlashCardData: ', FlashCardData);
import FlashCardQuestion from "./FlashCardQuestion";
import FlashCardAnswer from "./FlashCardAnswer";
import stringSimilarity from "string-similarity"; // import string-similarity library

function FlashCard() {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  console.log('currentQuestion: ', currentQuestion);
  const [isFlipped, setFlipped] = useState(false);
  const [count, setCount] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  // const [masteredQuestions, setMasteredQuestions] = useState([]);

  const flipCard = () => {
    setFlipped(!isFlipped);
  };

  const handleNextQuestion = () => {
    setFlipped(false);
    setCurrentQuestion(currentQuestion => {
      const nextQuestion = currentQuestion + 1;
      return nextQuestion < FlashCardData.length ? nextQuestion : 0;
    });
    setCount(0); // reset count state when moving to next question
  };

  const handleBackQuestion = () => {
    setFlipped(false);
    setCurrentQuestion(currentQuestion => {
      const prevQuestion = currentQuestion - 1;
      return prevQuestion >= 0 ? prevQuestion : FlashCardData.length - 1;
    });
    setCount(0); // reset count state when moving to previous question
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission
    
    const userInput = event.target.elements["name"].value.toLowerCase(); // get user input and convert to lowercase
    const answer = FlashCardData[currentQuestion].answer.toLowerCase(); // get the actual answer and convert to lowercase
    
    // use string-similarity library to compare the user's input with the actual answer
    const score = stringSimilarity.compareTwoStrings(userInput, answer);
    const threshold = 0.70; // set a threshold score above which the user's input is considered correct
    
    if (score >= threshold) {
      setCount((prevCount) => prevCount + 1); // update count using functional update form
      event.target.elements["name"].style.backgroundColor = "green"; // change the background color of the input field to green
    } else {
      event.target.elements["name"].style.backgroundColor = "red"; // change the background color of the input field to red
      setLongestStreak((prevLongestStreak) => Math.max(prevLongestStreak, count)); // update Longest_Streak state
      setCount(0); // reset count state
    }
  };

  const handleMasteredQuestion = () => {
    setMasteredQuestions((prevMasteredQuestions) => {
      const newMasteredQuestions = [...prevMasteredQuestions, currentQuestion];
      return newMasteredQuestions;
    });






  
    setQuestions((prevQuestions) => {
      const newQuestions = prevQuestions.filter((question) => question.id !== currentQuestion.id);
      return newQuestions;
    });
  
    handleNextQuestion();
  };

  let question = "Start";
  let answer = "Press the next arrow to start the flashcards :)";
  let color = "";
  let image = "";
  let id = 0;

  if (currentQuestion >= 0) {
    question = FlashCardData[currentQuestion].question;
    answer = FlashCardData[currentQuestion].answer;
    id = FlashCardData[currentQuestion].id;

    const category = FlashCardData[currentQuestion].category;
    if (category === "Geography" || category === "Chemistry") {
      const difficulty = FlashCardData[currentQuestion].difficulty;
      if (difficulty === "Easy") {
        color = "green";
      } else if (difficulty === "Medium") {
        color = "#8B8000";
      } else {
        color = "red";
      }
    } else {
      color = "blue";
    }
    image = FlashCardData[currentQuestion].image;
  }

  return (
    <div className={`flashcard-container`} onClick={flipCard}>
      <div className="score-container">
  <h4 style={{ display: "inline-block", color: "yellow" }}>Count: {count}</h4>
  <h4 style={{ display: "inline-block", marginLeft: "1em", color: "yellow" }}>Longest Streak: {longestStreak}</h4>
</div>

    
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
        <FlashCardAnswer answer={answer} image={image} color={color} />
        <FlashCardQuestion question={question} image={image} color={color} />
      </div>


  
      <form className="FormButton" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
  <label>
    Guess the answer here:
    <input type="text" name="name" placeholder="Place your answer here..."  onClick={(e) => e.stopPropagation()}/>
  </label>
  <input type="submit" value="Guess & Submit" onClick={(e) => e.stopPropagation()} />
</form>




<div className="Buttons">
  <button
    onClick={(e) => {
      if (currentQuestion > 0) {
        handleBackQuestion();
      }
      e.stopPropagation();
    }}
    disabled={currentQuestion <= 0}
  >
    {currentQuestion < 0 ? "🢘" : "🢘"}
  </button>
  <button className="Shuffle" onClick={(e) => {
    setCurrentQuestion(Math.floor(Math.random() * 13))
      
      e.stopPropagation();
    }}>SHUFFLE</button>
  <button
    onClick={(e) => {
      if (currentQuestion < 12) {
        handleNextQuestion();
      }
      e.stopPropagation();
    }}
    disabled={currentQuestion >= 12}
  >
    {currentQuestion < 0 ? "🢚" : "🢚"}
  </button>


  <button
  onClick={(e) => {
    e.stopPropagation();
    handleMasteredQuestion();
    
  }}
>
  Mastered
</button>

  
</div>



    </div>
  );
      }

export default FlashCard;




