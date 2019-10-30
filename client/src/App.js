import React from "react";
const style = {
  selected: {
    width: "100px",
    height: "50px",
    backgroundColor: "black",
    color: "white"
  },
  notSelected: {
    width: "100px",
    height: "50px",
    backgroundColor: "white",
    color: "black"
  }
};

const subCat1 = [
  { id: 1, name: "dance type one", selected: false },
  { id: 2, name: "dance type two", selected: false },
  { id: 3, name: "dance type three", selected: false }
];
const subCat2 = [
  { id: 1, name: "photog type one", selected: false },
  { id: 2, name: "photog type two", selected: false },
  { id: 3, name: "photog type three", selected: false }
];

class App extends React.Component {
  state = {
    profession: "",
    subcategory: "",
    selectedSubs: [],
    subCat1,
    subCat2
  };

  resetSub = subCat => {
    const reset = subCat.map(sub => ({ ...sub, selected: false }));
    return reset;
  };

  updateProfession = e => {
    const { subCat1, subCat2 } = this.state;
    this.setState({
      profession: e.target.name,
      subCat1: this.resetSub(subCat1),
      subCat2: this.resetSub(subCat2)
    });
  };

  setSubCats = e => {
    const { profession, subCat1, subCat2 } = this.state;
    const currentSubCat = profession === "dancer" ? subCat1 : subCat2;
    const { id, name } = e.target;

    const updatedSubCat = currentSubCat.map(sub => {
      if (sub.id == id) {
        sub.selected = !sub.selected;
        return sub;
      }
      return sub;
    });

    this.setState({
      subcategory: name,
      [currentSubCat]: updatedSubCat
    });
  };

  displaySubcat = () => {
    const { profession, subCat1, subCat2 } = this.state;
    const currentSubCat = profession === "dancer" ? subCat1 : subCat2;
    return currentSubCat.map(sub => {
      return (
        <button
          key={sub.id}
          id={sub.id}
          name={sub.name}
          style={sub.selected ? style.selected : style.notSelected}
          onClick={this.setSubCats}
        >
          {sub.name}
        </button>
      );
    });
  };

  submit = () => {
    const { profession, subCat1, subCat2 } = this.state;
    const currentSubCat = profession === "dancer" ? subCat1 : subCat2;
    const selected = currentSubCat.map(sub => sub.name);
    const data = {
      profession: this.state.profession,
      skills: selected
    };
    console.log(data);
  };

  render() {
    const { profession } = this.state;

    return (
      <div>
        <br />
        <button
          name="dancer"
          style={profession == "dancer" ? style.selected : style.notSelected}
          onClick={this.updateProfession}
        >
          dance
        </button>
        <button
          name="photog"
          style={profession == "photog" ? style.selected : style.notSelected}
          onClick={this.updateProfession}
        >
          photog
        </button>
        <br />
        {profession ? this.displaySubcat() : null}
        <br />
        <button onClick={this.submit}>Submit (check console)</button>
      </div>
    );
  }
}

export default App;
