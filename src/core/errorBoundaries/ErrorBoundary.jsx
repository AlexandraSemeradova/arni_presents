import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Global ErrorBoundary:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172a",
            color: "#e5e7eb",
            padding: "1.5rem",
            fontFamily: "system-ui",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Niečo sa pokazilo.</h1>

          <button
            onClick={this.reset}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              background: "#38bdf8",
              color: "#0f172a",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Skúsiť znova
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
