import React from "react";
import "./PhotoCompare.css";

export class PhotoCompare extends React.Component {
  state = {
    availableItems: [],
    compareItems: [],
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          availableItems: result,
        });
      });
  }

  addItems = (obj) => {
    const newCompareItems = [...this.state.compareItems];
    newCompareItems.push(obj);
    this.setState({ compareItems: newCompareItems });
  };

  removeItem = (obj) => {
    const newCompareItems = [...this.state.compareItems];
    const newArray =  newCompareItems.filter((item)=> item.id !==obj.id);
    this.setState({compareItems:newArray});
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", overflowX: "scroll" }}>
          {this.state.availableItems.map((item) => {
            return (
              <div className="card" key={item.id}>
                <img src={item.url} alt="Avatar" style={{ width: "100%" }} />
                <div className="container">
                  <div>{item.title}</div>
                  <div>
                    <b>{item.id}</b>
                  </div>
                  <div>{item.url}</div>
                  {this.state.compareItems.includes(item) ? (
                    <button
                      style={{ color: "red" }}
                      onClick={() => this.removeItem(item)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      style={{ color: "blue" }}
                      onClick={() => this.addItems(item)}
                    >
                      Compare
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <table style={{ width: "100%", marginTop: "50px" }}>
          <thead>
            <tr>Comparison Table</tr>
            <tr>
              <th>Photo</th>
              <th>ID</th>
              <th>Url</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.state.compareItems.map((val) => {
              return (
                <tr key={val.id}>
                  <td>
                    <img
                      src={val.url}
                      alt="Avatar"
                      style={{ height: "100px", width: "100%" }}
                    />
                  </td>
                  <td>{val.id}</td>
                  <td>{val.url}</td>
                  <td>{val.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
