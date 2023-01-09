import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.ceil(Math.random() * 100)
  );

  let inputNumber = "";

  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredNumberTouched, setEnteredNumberTouched] = useState(false);
  const [attempts, setAttempts] = useState(10);
  const [prevAnswer, setPrevAnswer] = useState([]);
  const [messageAlert, setMessageAlert] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [styleClass, setStyleClass] = useState("");
  const [wrongNumber, setWrongNumber] = useState("");
  const [inputDisable, setInputDisable] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
 

  const enteredNumberIsValid = enteredNumber.trim() !== "";
  const numberInputIsInvalid = !enteredNumberIsValid && enteredNumberTouched;

  const sameNumber =
    !prevAnswer.length === 0 || prevAnswer.includes(enteredNumber);

  const numberChangeHandler = (e) => {
    inputNumber = e.target.value;
    // if (inputNumber < 1 || inputNumber > 100) {
    //   setWrongNumber("Guess a number inside the range 1-100");
    // } else {
      setEnteredNumber(inputNumber);
    //   setWrongNumber("");
    // }
  };

  const youWin = () => {
    setMessageAlert("Congratulations! You got it right!");
    setStyleClass("bg-success");
    setIsStart(true);
    setIsOver(true);
    setDisabledButton(true);
    setEnteredNumber("");
    setInputDisable(true);
  };

  const toHigh = () => {
    setMessageAlert("UPS! The last guess was too high!");
    setStyleClass("bg-denger");
    setAttempts(attempts - 1);
    setIsStart(true);
  };

  const toLow = () => {
    setMessageAlert("UPS! The last guess was too low");
    setStyleClass("bg-info");
    setAttempts(attempts - 1);
    setIsStart(true);
  };

  const gameOver = () => {
    setAttempts(0);
    setIsOver(true);
    setMessageAlert("GAME OVER!");
    setStyleClass("bg-warning");
    setIsStart(true);
    setPrevAnswer([]);
    setDisabledButton(true);
    setInputDisable(true);
  };

  const numberSubmitHandler = (e) => {
    e.preventDefault();

    setEnteredNumberTouched(true);

    if (!enteredNumberIsValid) {
      return;
    }
    if (sameNumber) {
      return;
    }

    console.log(typeof attempts);

    if((enteredNumber < 1) || (enteredNumber >100)){
      setWrongNumber("The number must be within the range of 1-100")
      setEnteredNumber("");
      return
    } else{
      setWrongNumber("");
    }

    if (attempts > 0) {
      if (attempts >= 1 && Number(enteredNumber) === randomNumber) {
        youWin();
      } else if (attempts === 1 && Number(enteredNumber) !== randomNumber) {
        gameOver();
      } else if (enteredNumber > randomNumber) {
        toHigh();
      } else if (enteredNumber < randomNumber) {
        toLow();
      }
    }
    setPrevAnswer([...prevAnswer, enteredNumber]);
    setEnteredNumber("");
    setEnteredNumberTouched(false);
  };

  function startNewGame() {
    setRandomNumber(Math.ceil(Math.random() * 100));
    setAttempts(10);
    setPrevAnswer([]);
    setStyleClass("");
    setIsStart(false);
    setIsOver(false);
    setDisabledButton(false);
    setEnteredNumber("");
    setMessageAlert("");
    setInputDisable(false);
  }

  function reset() {
    if (!isOver) {
      setAttempts(10);
      setPrevAnswer([]);
      setStyleClass("");
      setMessageAlert("");
      setEnteredNumber("");
      setInputDisable(false);
    }
  }

  function clear() {
    setEnteredNumber("");
  }

  return (
    <div className="container">
      <Header />
      <div>
        <form onSubmit={numberSubmitHandler}>
          <div>
            <label htmlFor="number">Enter a number</label>
            <p>Guess a number inside the range 1-100</p>

            <input
              type="number"
              onChange={numberChangeHandler}
              value={enteredNumber}
              placeholder={wrongNumber}
              disabled={inputDisable}
            />

            {numberInputIsInvalid && <p>Number must be INTEGER</p>}
            {numberInputIsInvalid && <p>Form must not be empty!</p>}
            {sameNumber && (
              <p>You have already entered this number! Try again!</p>
            )}
          </div>
        </form>

        <button
          className="btn-big"
          onClick={numberSubmitHandler}
          disabled={!enteredNumber}
        >
          Submit number
        </button>
        <button className="btn-small" onClick={clear} disabled={disabledButton}>
          Clear
        </button>
        <button className="btn-small" onClick={reset} disabled={disabledButton}>
          Reset
        </button>

        <hr />
        <div
          className="attempts-box"
          style={{ visibility: isStart ? "visible" : "hidden" }}
        >
          <p>Remaining attempts: {attempts}</p>
        </div>
        <div style={{ visibility: isStart ? "visible" : "hidden" }}>
          <p>Previous guesses: {prevAnswer + ","} </p>
        </div>
        <div
          style={{
            visibility: isStart ? "visible" : "hidden",
          }}
          className={styleClass}
        >
          <p style={{ padding: "10px", color: "#fff" }}>{messageAlert}</p>
        </div>
        <div>
          <button
            style={{ visibility: isOver ? "visible" : "hidden" }}
            className="btn-big"
            onClick={startNewGame}
          >
            Star new game
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;