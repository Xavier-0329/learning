import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})

  const handleNext = () => {
    const random = Math.floor(Math.random()*8);
    setSelected(random);
    console.log(random);
  }

  const handleVote = () => {
    const newVote = {...vote};
    newVote[selected] += 1;
    setVote(newVote)
    console.log(newVote)
  }

  const voteValues = Object.values(vote);
  console.log('voteValues', voteValues)
  const maxVotes = Math.max(...voteValues);
  console.log('maxVotes', maxVotes)
  let mostVotedIndex = null;
  for (const key in vote){
    if (vote[key] == maxVotes){
      mostVotedIndex = key;
      break;
    }
  }
  console.log(mostVotedIndex)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>has {vote[selected]} vote(s)</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
      <br/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedIndex]}
      <br/>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App