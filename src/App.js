import { useEffect, useState, useRef } from "react";
import "./App.css";
import Expense from "./expense";

function App() {
  const [input, setInput] = useState({
    Value: "",
    Disc: "",
    Date: "",
  });
  const [expenses, setExpenses] = useState([]);
  const renderCount = useRef(0);

  //local storage
  useEffect(() => {
    setExpenses(() => {
      if (localStorage.getItem("expenses"))
        return [...JSON.parse(localStorage.getItem("expenses"))];
      else return [];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderCount.current++;
    console.log(renderCount.current);
  }, [expenses]);

  function resetLocalStorage() {
    localStorage.clear();
    setExpenses([]);
    setInput({
      Value: "",
      Disc: "",
      Date: "",
    });
  }

  //handling events
  function handleChange(e) {
    setInput((prevInput) => {
      let { name, value } = e.target;

      if (e.target.name === "Value") {
        value = Number(value);

        if (isNaN(value)) {
          return {
            ...prevInput,
          };
        }
      }

      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setExpenses((prevExp) => {
      return [...prevExp, input];
    });
  }

  function handleDelete(index) {
    setExpenses((prevExp) => {
      const arr = [...prevExp];
      arr.splice(index, 1);
      return [...arr];
    });
  }

  //-----------------------------------> RETURN
  return (
    <div className="App">
      <div className="container">
        <label className="form-label" htmlFor="add-new-expense">
          Add new expense
        </label>
        <form onSubmit={handleSubmit} id="add-new-expense">
          <div className="form-content">
            <div className="input-box">
              <div className="input-label">
                <label htmlFor="expense-value">Expense value</label>
              </div>
              <input
                value={input.Value}
                id="expense-value"
                type="text"
                name="Value"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <div className="input-label">
                <label htmlFor="discription">Discription</label>
              </div>
              <input
                value={input.Disc}
                id="discription"
                type="text"
                name="Disc"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <div className="input-label">
                <label htmlFor="date">Date</label>
              </div>
              <input
                value={input.Date}
                id="date"
                type="date"
                name="Date"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="list-controll-btn">
            Add
          </button>
          <button
            type="button"
            className="list-controll-btn"
            onClick={resetLocalStorage}
          >
            Clear
          </button>
        </form>
        <ul>
          {expenses.map((exp, i) => {
            return (
              <Expense
                data={exp}
                key={i}
                index={i}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
