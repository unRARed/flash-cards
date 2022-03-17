function sample(list) {
  return Math.random() * list.length - 1;
}

var FlashCard = function FlashCard(props) {
  return React.createElement(
    'p',
    null,
    props.acronym
  );
};

window.addEventListener('DOMContentLoaded', function (event) {
  ReactDOM.render(FlashCard(acronyms[sample(acronyms)]), document.getElementById('root'));
});