"use strict";

const graph = {
  nodes: [
    { id: "northlight", label: "Project Northlight", type: "project", x: 50, y: 48, summary: "A fictional project connecting product direction and learning." },
    { id: "architecture", label: "Information Architecture", type: "knowledge", x: 74, y: 27, summary: "A fictional model for organizing useful operating context." },
    { id: "privacy", label: "Privacy Boundary", type: "knowledge", x: 43, y: 18, summary: "A fictional reminder that capability should remain visibly bounded." },
    { id: "journeys", label: "User Journeys", type: "knowledge", x: 24, y: 32, summary: "Synthetic paths through orientation, context, and consultation." },
    { id: "prototype", label: "Interface Prototype", type: "project", x: 21, y: 65, summary: "A fictional prototype used to test the operating-system experience." },
    { id: "decision", label: "Shell Direction", type: "decision", x: 68, y: 68, summary: "A fictional decision to make the assistant one tool within the system." },
    { id: "review", label: "Phase Review", type: "review", x: 84, y: 83, summary: "A fictional checkpoint for evidence, limits, and next actions." }
  ],
  edges: [["northlight","architecture"],["northlight","privacy"],["northlight","journeys"],["northlight","prototype"],["northlight","decision"],["architecture","decision"],["decision","review"]]
};

const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll("[data-view]")];
let selectedId = null;

function activateView(id) {
  views.forEach((view) => { view.hidden = view.id !== id; });
  navItems.forEach((item) => {
    const active = item.dataset.view === id;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach((item) => item.addEventListener("click", () => activateView(item.dataset.view)));
document.querySelector("[data-open-graph]").addEventListener("click", () => activateView("graph"));

function connections(id) {
  return graph.edges.filter(([a,b]) => a === id || b === id).map(([a,b]) => a === id ? b : a);
}

function selectedNode() {
  return graph.nodes.find((node) => node.id === selectedId) || null;
}

function selectNode(id) {
  selectedId = id;
  const node = selectedNode();
  if (!node) return;
  document.querySelector("[data-title]").textContent = node.label;
  document.querySelector("[data-summary]").textContent = node.summary;
  document.querySelector("[data-type]").textContent = node.type;
  document.querySelector("[data-links]").textContent = String(connections(id).length);
  document.querySelector("[data-open-workspace]").disabled = false;
  renderGraph();
}

function makeNodeButton(node) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `node${selectedId === node.id ? " selected" : ""}`;
  button.dataset.type = node.type;
  button.style.left = `${node.x}%`;
  button.style.top = `${node.y}%`;
  button.textContent = node.label;
  button.addEventListener("click", () => selectNode(node.id));
  return button;
}

function drawEdge(source, target) {
  const edge = document.createElement("span");
  edge.className = "edge";
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  edge.style.left = `${source.x}%`;
  edge.style.top = `${source.y}%`;
  edge.style.width = `${Math.sqrt(dx * dx + dy * dy)}%`;
  edge.style.transform = `rotate(${Math.atan2(dy, dx) * 180 / Math.PI}deg)`;
  return edge;
}

function renderGraph() {
  const query = document.querySelector("[data-search]").value.trim().toLowerCase();
  const nodes = graph.nodes.filter((node) => !query || node.label.toLowerCase().includes(query));
  const ids = new Set(nodes.map((node) => node.id));
  const nodeLayer = document.querySelector("[data-nodes]");
  const edgeLayer = document.querySelector("[data-edges]");
  const list = document.querySelector("[data-list]");
  nodeLayer.replaceChildren(); edgeLayer.replaceChildren(); list.replaceChildren();
  graph.edges.forEach(([a,b]) => {
    if (!ids.has(a) || !ids.has(b)) return;
    edgeLayer.append(drawEdge(graph.nodes.find((node) => node.id === a), graph.nodes.find((node) => node.id === b)));
  });
  nodes.forEach((node) => {
    nodeLayer.append(makeNodeButton(node));
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button"; button.textContent = `${node.label} · ${node.type}`;
    button.addEventListener("click", () => selectNode(node.id));
    item.append(button); list.append(item);
  });
  document.querySelector("[data-count]").textContent = `${nodes.length} nodes`;
}

document.querySelector("[data-search]").addEventListener("input", renderGraph);

document.querySelector("[data-open-workspace]").addEventListener("click", () => {
  const node = selectedNode(); if (!node) return;
  document.querySelector("[data-workspace-title]").textContent = node.label;
  document.querySelector("[data-workspace-summary]").textContent = node.summary;
  const related = document.querySelector("[data-related]"); related.replaceChildren();
  connections(node.id).map((id) => graph.nodes.find((item) => item.id === id)).forEach((item) => {
    const li = document.createElement("li"); const button = document.createElement("button");
    button.type = "button"; button.textContent = item.label;
    button.addEventListener("click", () => { selectNode(item.id); document.querySelector("[data-open-workspace]").click(); });
    li.append(button); related.append(li);
  });
  document.querySelector("[data-prepare]").disabled = false;
  activateView("workspace");
});

document.querySelector("[data-prepare]").addEventListener("click", () => {
  const node = selectedNode(); if (!node) return;
  document.querySelector("[data-draft]").value = `Regarding the synthetic context “${node.label}” (${node.type}): ${node.summary}\n\nMy question: `;
  document.querySelector("[data-status]").textContent = "Draft prepared locally. Nothing has been transmitted or saved.";
  activateView("consult");
  document.querySelector("[data-draft]").focus();
});

document.querySelector("[data-demo-submit]").addEventListener("click", () => {
  document.querySelector("[data-status]").textContent = "Review demonstrated. This showcase has no AI or network connection, so nothing was sent.";
});

renderGraph();