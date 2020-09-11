import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ ...Array(anecdotes.length).fill(0) });

  const mostVotedAnecdoteIndex = Object.keys(
    votes
  ).reduce((mostVotedIndex, currentIndex) =>
    votes[currentIndex] > votes[mostVotedIndex] ? currentIndex : mostVotedIndex
  );

  const selectRandom = () =>
    setSelected(Math.ceil(Math.random() * (anecdotes.length - 1)));

  const vote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedAnecdoteIndex]}</p>
    </div>
  );
};

const anecdotesList = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Thyerefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <App anecdotes={anecdotesList} />,
  document.getElementById('root')
);
