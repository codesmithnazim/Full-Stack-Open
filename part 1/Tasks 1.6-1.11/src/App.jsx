const Feedback = ({ setgood, setneutral, setbad }) => {
  return (
    <>
      <h1>give Feedback</h1>
      <button onClick={() => setgood((good) => good + 1)}>good</button>
      <button onClick={() => setneutral((neutral) => neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setbad((bad) => bad + 1)}>bad</button>
    </>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <div style={{ marginTop: "14px" }}>
      {good + bad + neutral !== 0 ? (
        <>
          <h1>Statistics</h1>
          {/* <div>Good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div> */}
          <table>
            <tbody>
              <StatisticLine text={"good"} value={good} />
              <StatisticLine text={"neutral"} value={neutral} />
              <StatisticLine text={"bad"} value={bad} />
              <StatisticLine text={"all"} value={good + neutral + bad} />
              {good === bad ? (
                <StatisticLine text={"average"} value={0} />
              ) : (
                <StatisticLine
                  text={"average"}
                  value={(good * 1 + bad * -1) / (good + bad + neutral)}
                />
              )}
              <StatisticLine
                text={"positive"}
                value={`${(good / (good + neutral + bad)) * 100} %`}
              />
            </tbody>
          </table>
        </>
      ) : (
        <div>No feedback is given yet</div>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    // <div>
    //   {text} {value}
    // </div>
  );
};

import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Feedback setgood={setGood} setneutral={setNeutral} setbad={setBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
