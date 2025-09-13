import React from "react";
import { createRoot } from "react-dom/client";
import { translateText } from "../../utils/api";
import "./ContentScript.css";

class TranslationTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translation: "",
      isLoading: false,
      position: { x: 0, y: 0 },
    };
    this.tooltipRef = React.createRef();
  }

  componentDidMount() {
    this.translateWord(this.props.word);
    this.updatePosition();
    window.addEventListener("resize", this.updatePosition);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePosition);
  }

  updatePosition = () => {
    const { x, y } = this.props.position;
    this.setState({ position: { x, y } });

    // Adjust position if tooltip goes off screen
    if (this.tooltipRef.current) {
      const rect = this.tooltipRef.current.getBoundingClientRect();
      let adjustedX = x;
      let adjustedY = y;

      if (rect.right > window.innerWidth) {
        adjustedX = window.innerWidth - rect.width - 10;
      }

      if (rect.bottom > window.innerHeight) {
        adjustedY = window.innerHeight - rect.height - 10;
      }

      if (adjustedX !== x || adjustedY !== y) {
        this.setState({ position: { x: adjustedX, y: adjustedY } });
      }
    }
  };

  async translateWord(word) {
    this.setState({ isLoading: true });
    try {
      const translation = await translateText(word);
      this.setState({ translation, isLoading: false });
    } catch (error) {
      this.setState({ translation: "Translation failed", isLoading: false });
    }
  }

  render() {
    const { translation, isLoading, position } = this.state;
    const { word } = this.props;

    return (
      <div
        ref={this.tooltipRef}
        className="translation-tooltip"
        style={{ left: position.x, top: position.y }}
      >
        <div className="tooltip-header">
          <span className="original-word">{word}</span>
        </div>
        <div className="tooltip-body">
          {isLoading ? (
            <div className="loading">Translating...</div>
          ) : (
            <div className="translation">{translation}</div>
          )}
        </div>
      </div>
    );
  }
}

// Main content script functionality
let tooltipContainer = null;
let currentWord = null;

const initializeContentScript = () => {
  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
};

const handleMouseOver = (e) => {
  if (e.target.tagName === "SCRIPT" || e.target.tagName === "STYLE") return;

  const word = getWordUnderCursor(e);
  if (word && word !== currentWord) {
    currentWord = word;
    showTranslationTooltip(word, e.clientX, e.clientY);
  }
};

const handleMouseOut = (e) => {
  if (e.target.tagName === "SCRIPT" || e.target.tagName === "STYLE") return;

  if (!e.relatedTarget || !e.relatedTarget.closest(".translation-tooltip")) {
    removeTranslationTooltip();
    currentWord = null;
  }
};

const getWordUnderCursor = (e) => {
  const text = e.target.textContent || "";
  const range = document.caretRangeFromPoint(e.clientX, e.clientY);
  if (!range) return null;

  range.expand("word");
  const word = range.toString().trim();
  // Only consider words that are likely English
  if (word && /^[a-zA-Z]+$/.test(word) && word.length > 2) {
    return word;
  }
  return null;
};

const showTranslationTooltip = (word, x, y) => {
  removeTranslationTooltip();

  tooltipContainer = document.createElement("div");
  tooltipContainer.id = "translation-tooltip-container";
  document.body.appendChild(tooltipContainer);

  const root = createRoot(tooltipContainer);
  root.render(
    <TranslationTooltip word={word} position={{ x: x + 15, y: y + 15 }} />
  );
};

const removeTranslationTooltip = () => {
  if (tooltipContainer) {
    const root = createRoot(tooltipContainer);
    root.unmount();
    tooltipContainer.remove();
    tooltipContainer = null;
  }
};

// Initialize the content script
initializeContentScript();
