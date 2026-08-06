import { useState } from "react";
// import Math from ""

const AnecdotesWithMostVotes = ({vote,anecdotes}) => {
//   vote.sort((a,b)=>a-b)
//   const length= vote.length
//  let a=[1,2,3,54,6]
let max= 0
let maxIndex=0
  for (let index = 0; index < vote.length; index++) {
    if(vote[index]>max){
        console.log("ctrl coming")
        max=vote[index]
        maxIndex=index

    }
    
}
  return (
    <>
      {console.log("The votes array ontained from the main App = ", vote)}
      {console.log("The max vote anecdote index", maxIndex)}
      <h1>Anecdotes with most votes</h1>
      {maxIndex || max ?  <div className="realAnecdot">{`${anecdotes[maxIndex]} [votes=${max}]`} </div>: <div> All the quotes have equal votes</div>}
      
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const nextanecdotes = () => {
    let change = Math.round((Math.random() * 7))
    if (change === selected) change = Math.round((Math.random() * 7))
    if (change === selected) change = Math.round((Math.random() * 7))
    if (change === selected) change = Math.round((Math.random() * 7))
    console.log(
      "the next quote's index",
      change,
      " & the quote equals to = ",
      anecdotes[change],
    );
    const changeSelected = () => {
      setSelected(change);
    };
    return changeSelected;
  };

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([]);
  return [
    <div key={90}>{anecdotes[selected]}</div>,
    <div key={878}>has votes {vote[selected]}</div>,
    <button
      key={"yuy"}
      onClick={() => {
        let votee = [...vote];
        votee[selected]
          ? (votee[selected] = votee[selected] + 1)
          : (votee[selected] = 1);
        setVote(votee);
        console.log("The vote arrow now equall to ", vote);
      }}
    >
      vote
    </button>,
    <button key={87} onClick={nextanecdotes()}>
      next anecdotes
    </button>,
    <AnecdotesWithMostVotes key={"alwaysBeUnique"} vote={vote} anecdotes={anecdotes}  />
  ];
};

export default App;
