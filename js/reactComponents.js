var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Entry file - JSX allowed here

// Returns random int between 0 and length of :list
//
// @param :list Array
function sample(list) {
  return Math.floor(Math.random() * (list.length - 1));
}

// The React component
var FlashCard = function FlashCard(props) {
  var specialCharacters = /[^a-z0-9 \-]/gi;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selected = _React$useState2[0],
      setSelected = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isPeeked = _React$useState4[0],
      setIsPeeked = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isCorrect = _React$useState6[0],
      setIsCorrect = _React$useState6[1];

  var _React$useState7 = React.useState(3),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      countDown = _React$useState8[0],
      setCountDown = _React$useState8[1];

  var _React$useState9 = React.useState(0),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      correctCount = _React$useState10[0],
      setCorrectCount = _React$useState10[1];

  var interval = void 0,
      timeout = void 0;

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
    var count = seconds;
    setCountDown(seconds);
    interval = setInterval(function () {
      if (count === 0) {
        return clearInterval(internal);
      }
      count = count - 1;
      setCountDown(count);
    }, 1000);
  }

  // Resets state and selects the next item
  function nextCard(isReverse) {
    reset();
    if (isReverse) {
      console.log('rev');
      if (selected === 0) {
        setSelected(props.data.length - 1);
      } else {
        setSelected(selected - 1);
      }
    } else {
      if (selected + 1 === props.data.length) {
        setSelected(0);
      } else {
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
    var timeout = setTimeout(function () {
      reset();
    }, seconds * 1000);
  }

  function checkInput(e) {
    var response = e.target.value.toLowerCase().replace(specialCharacters, '');
    var answer = props.data[selected].answer.toLowerCase().replace(specialCharacters, '');
    setIsCorrect(response === answer);
    if (response === answer) {
      setCorrectCount(correctCount + 1);
    }
  }

  return React.createElement(
    'div',
    { key: props.data[selected].question },
    React.createElement(
      'div',
      { className: "card" + (isCorrect ? " card--correct" : "") },
      React.createElement(
        'div',
        { className: 'meta' },
        'Correct answers: ',
        correctCount
      ),
      React.createElement(
        'div',
        { className: 'meta cursor' },
        'Card ',
        selected + 1,
        '/',
        props.data.length
      ),
      !isPeeked ? React.createElement(
        'h2',
        { className: 'q' },
        props.data[selected].question
      ) : React.createElement(
        'h3',
        { className: 'a' },
        props.data[selected].answer,
        ' (',
        countDown,
        ')'
      ),
      React.createElement(
        'p',
        { className: 'prompt' },
        'Enter your answer:'
      ),
      isCorrect ? React.createElement('input', { type: 'text' }) : React.createElement('input', { type: 'text', onChange: checkInput }),
      !isPeeked ? React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: function onClick() {
              return nextCard(true);
            } },
          'Prev Card'
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return nextCard(false);
            } },
          'Next Card'
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return peek(3);
            } },
          'Peek'
        )
      ) : React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'disabled' },
          'Prev Card'
        ),
        React.createElement(
          'button',
          { className: 'disabled' },
          'Next Card'
        ),
        React.createElement(
          'button',
          { className: 'disabled' },
          'Peek'
        )
      )
    ),
    React.createElement(
      'div',
      null,
      isCorrect && React.createElement(
        'h1',
        { className: 'success' },
        'Correct!'
      )
    )
  );
};

var sortedData = questions.sort(function () {
  return Math.random() - 0.5;
});

window.addEventListener('DOMContentLoaded', function (event) {
  ReactDOM.render(React.createElement(FlashCard, { data: sortedData }), document.getElementById('root'));
});