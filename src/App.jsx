import { useState } from "react";

const StatisticLine = ({ text, value, perc = "" }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>{perc}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <div>
          <table>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={positive} perc="%" />
          </table>
        </div>
      ) : (
        <div>
          <p>No feedback given</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClick = (feedback) => {
    let updatedGood = good;
    let updatedNeutral = neutral;
    let updatedBad = bad;

    if (feedback == "good") {
      updatedGood += 1;
      setGood(updatedGood);
    } else if (feedback == "neutral") {
      updatedNeutral += 1;
      setNeutral(updatedNeutral);
    } else {
      updatedBad += 1;
      setBad(updatedBad);
    }

    const updatedAll = all + 1;
    setAll(updatedAll);

    setAvg((updatedGood + updatedBad * -1) / updatedAll);

    setPositive((updatedGood / updatedAll) * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>
      <br />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        avg={avg}
        all={all}
        positive={positive}
      />
    </div>
  );
};

export default App;
