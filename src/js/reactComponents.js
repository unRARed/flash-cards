// Entry file - JSX allowed here

// Returns random int between 0 and length of :list
//
// @param :list Array
function sample(list) {
  return Math.floor(Math.random() * (list.length -1));
}

// The React component
const FlashCard = (props) => {
  const specialCharacters = /[^a-z0-9 \-]/gi;
  const [selected, setSelected] = React.useState(0);
  const [isPeeked, setIsPeeked] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [countDown, setCountDown] = React.useState(3);
  const [correctCount, setCorrectCount] = React.useState(0);
  let interval, timeout;

  // Resets the state for the current data item
  function reset() {
    setCountDown(3);
    setIsCorrect(false);
    setIsPeeked(false);
    clearTimeout(timeout);
    clearInterval(interval);
  }

  // cleared externally
  //
  // @param :seconds Integer
  function handleCountDown(seconds) {
    let count = seconds;
    setCountDown(seconds);
    interval = setInterval(function () {
      if (count === 0) { return clearInterval(internal); }
      count = count - 1;
      setCountDown(count);
    }, 1000)
  }

  // Resets state and selects the next item
  function nextCard(isReverse) {
    reset();
    if (isReverse) {
      console.log('rev');
      if (selected === 0) {
        setSelected(props.data.length - 1);
      }
      else {
        setSelected(selected - 1);
      }
    }
    else {
      if (selected + 1 === props.data.length) {
        setSelected(0);
      }
      else {
        setSelected(selected + 1);
      }
    }
  }

  // Displays the item answer for :seconds
  //
  // @param :seconds Integer
  function peek(seconds) {
    handleCountDown(seconds);
    setIsPeeked(true);
    let timeout = setTimeout(function() { reset(); }, (seconds * 1000));
  }

  function checkInput(e) {
    let response = e.
      target.value.toLowerCase().replace(specialCharacters, '');
    let answer = props.
      data[selected].answer.toLowerCase().replace(specialCharacters, '');
    setIsCorrect(response === answer);
    if (response === answer) { setCorrectCount(correctCount + 1); }
  }

  return (
    <div key={props.data[selected].question}>
      <div className={"card" + (isCorrect ? " card--correct" : "")}>
        { <div className="meta">Correct answers: {correctCount}</div> }
        <div className="meta cursor">
          Card {selected + 1}/{props.data.length}
        </div>
        { !isPeeked ?
          <h2 className="q">{props.data[selected].question}</h2> :
          <h3 className="a">
            {props.data[selected].answer} ({countDown})
          </h3>
        }
        <p className="prompt">Enter your answer:</p>
        { isCorrect ?
          <input type="text" /> :
          <input type="text" onChange={checkInput} />
        }
        { !isPeeked ?
          <div>
            <button onClick={() => nextCard(true)}>Prev Card</button>
            <button onClick={() => nextCard(false)}>Next Card</button>
            <button onClick={() => peek(3)}>Peek</button>
          </div> :
          <div>
            <button className="disabled">Prev Card</button>
            <button className="disabled">Next Card</button>
            <button className="disabled">Peek</button>
          </div>
        }
      </div>
      <div>
        { isCorrect && <h1 className="success">Correct!</h1> }
      </div>
    </div>
  );
};

const sortedData = questions.sort(() => Math.random() - 0.5);

window.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(
    <FlashCard data={sortedData} />,
    document.getElementById('root')
  );
});
