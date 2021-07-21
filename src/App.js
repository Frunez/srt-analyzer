import React, { Component } from "react";
import "./App.css";
import { dropBox } from "./AppStyles";
import parseSrt from "./parseSrt";
import SubtitleInfo from "./SubtitleInfo";
import Timebar from "./Timebar";

const exampleSubData = {
  number: 1,
  start: 1000,
  end: 3000,
  timecode: "00:00:01,000 --> 00:00:03,000",
  text: "Hello world"
};

class App extends Component {
  state = { fileData: [], showBrokenSubs: false };

  readFile = file => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = event => {
      const splitSubs = parseSrt(event.target.result);
      this.setState({ fileData: splitSubs });
    };
  };

  onDrop = e => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    this.readFile(file);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>SRT Analyzer</p>
          <div
            style={dropBox}
            onDragOver={e => {
              e.preventDefault();
            }}
            onDrop={this.onDrop}
          >
            Drop File Here
          </div>
        </header>
        <button
          onClick={() =>
            this.setState({ showBrokenSubs: !this.state.showBrokenSubs })
          }
        >
          Show broken subs
        </button>
        <div style={{ margin: "50px" }}>
          {this.state.fileData.length > 0 && (
            <Timebar subs={this.state.fileData} />
          )}
          {this.state.fileData.length > 0 ? (
            this.state.fileData.map((sub, index) => {
              const prevSub = this.state.fileData[index - 1];
              const subDiff = prevSub ? sub.start - prevSub.end : sub.start;

              if (this.state.showBrokenSubs) {
                if (subDiff > 0 && sub.end - sub.start > 0) return null;
                return (
                  <SubtitleInfo key={sub.number} sub={sub} prevSub={prevSub} />
                );
              }

              return (
                <SubtitleInfo key={sub.number} sub={sub} prevSub={prevSub} />
              );
            })
          ) : (
            <div>
              <div>Drop an srt file in box above to analyze</div>
              <div>
                The result will have multiple subtitles displayed like so:
              </div>
              <SubtitleInfo sub={exampleSubData} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
