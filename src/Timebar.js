import React from "react";

const bar = {
  position: "relative",
  backgroundColor: "rgba(100, 100, 170, 0.8)",
  height: "100px"
};

class Timebar extends React.Component {
  state = {
    barWidth: 0
  };

  onResize = () => {
    if (this.bar) {
      setTimeout(() => {
        this.setState({ barWidth: this.bar.offsetWidth });
      }, 50);
    }
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.onResize, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.onResize, false);
  };

  render() {
    const { subs } = this.props;
    const lastSubEnd = subs[subs.length - 1].end;
    const msInPixels = this.state.barWidth / lastSubEnd;
    console.log("TCL: Timebar -> render -> msInPixels", msInPixels);

    return (
      <div
        style={{
          width: "100%",
          overflowX: "scroll",
          overflowY: "visible",
          textOverflow: "visible"
        }}
      >
        <div
          style={{ ...bar, width: `${lastSubEnd / 50}px` }}
          ref={node => {
            this.bar = node;
            this.onResize();
          }}
        >
          {this.props.subs.map((sub, index) => {
            const prevSub =
              this.state.fileData && this.state.fileData[index - 1];

            const subDiff = prevSub ? sub.start - prevSub.end : sub.start;
            const subDur = sub.end - sub.start;
            const subWidth = (subDur >= 0 ? subDur : -subDur) * msInPixels;
            const subPos =
              subDur >= 0
                ? sub.start * msInPixels
                : sub.start * msInPixels - subWidth;

            return (
              <a
                key={sub.number}
                href={`#${sub.number}`}
                style={{
                  fontWeight: "700",
                  fontSize: "10px",
                  appearance: "none",
                  display: "inline-block",
                  position: "absolute",
                  left: 0,
                  backgroundColor:
                    sub.end - sub.start > 0
                      ? "rgba(100, 200, 170, 0.8)"
                      : "rgba(250, 0, 100, 0.8)",
                  height: "100%",
                  width: `${subWidth}px`,
                  transform: `translateX(${subPos}px)`
                }}
              >
                {sub.number}
                <div
                  style={{
                    color: subDiff > 0 ? "white" : "rgb(250, 100, 100)",
                    fontSize: "10px",
                    fontWeight: "600",
                    position: "absolute",
                    transform: "rotate(-90deg)",
                    width: 0,
                    left: 0,
                    bottom: 0,
                    textOverflow: "visible"
                  }}
                >
                  {sub.start}
                </div>
                <div
                  style={{
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "600",
                    position: "absolute",
                    transform: "rotate(-90deg)",
                    width: 0,
                    right: 0,
                    bottom: "50px",
                    textOverflow: "visible"
                  }}
                >
                  {sub.end}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Timebar;
