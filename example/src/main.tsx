import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/inter/latin-400.css"
import "@fontsource/inter/latin-500.css"
import "@fontsource/inter/latin-600.css"
import "@fontsource/inter/latin-700.css"
import "@fontsource/plus-jakarta-sans/latin-500.css"
import "@fontsource/plus-jakarta-sans/latin-600.css"
import "@fontsource/plus-jakarta-sans/latin-700.css"
import "@fontsource/plus-jakarta-sans/latin-800.css"
import "@fontsource/lilita-one/latin-400.css"
import "@fontsource/jetbrains-mono/latin-400.css"
import "@fontsource/jetbrains-mono/latin-500.css"
import "@fontsource/jetbrains-mono/latin-600.css"
import "@fontsource/jetbrains-mono/latin-700.css"
import "./index.css"
import App from "./App"

// Identity selection: ?identity=<slug> wins, then the stored choice, then ocean-calm.
const params = new URLSearchParams(location.search)
const identity = params.get("identity") || localStorage.getItem("uifa-identity") || "ocean-calm"
localStorage.setItem("uifa-identity", identity)
document.documentElement.dataset.identity = identity
document.documentElement.dataset.theme = identity

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App identity={identity} />
  </React.StrictMode>,
)
