// ...imports
import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./App.css";
import { dijkstra } from "./algorithms/dijkstra";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { aStar } from "./algorithms/astar";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState({ row: 10, col: 5 });
  const [endNode, setEndNode] = useState({ row: 10, col: 25 });
  const [mode, setMode] = useState("wall");
  const [speedDelay, setSpeedDelay] = useState(10); // 👈 speed control state

  useEffect(() => {
    setGrid(createGrid());
  }, []);

  const createNode = (row, col) => ({
    row,
    col,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  });

  const createGrid = () => {
    const rows = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 40; col++) {
        currentRow.push(createNode(row, col));
      }
      rows.push(currentRow);
    }
    return rows;
  };

  const handleMouseDown = (row, col) => {
    if (mode === "start") {
      const newGrid = grid.map((r) =>
        r.map((node) => ({ ...node, isStart: false }))
      );
      newGrid[row][col].isStart = true;
      setStartNode({ row, col });
      setGrid(newGrid);
    } else if (mode === "end") {
      const newGrid = grid.map((r) =>
        r.map((node) => ({ ...node, isEnd: false }))
      );
      newGrid[row][col].isEnd = true;
      setEndNode({ row, col });
      setGrid(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || mode !== "wall") return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return newGrid;
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // 🎞️ Animation
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, speedDelay * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, speedDelay * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 30 * i); // You can also make this dynamic if you want
    }
  };

  // 🎯 Visualize functions
  const visualizeDijkstra = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visited = dijkstra(grid, start, end);
    const path = getNodesInShortestPathOrder(end);
    animateDijkstra(visited, path);
  };

  const visualizeBFS = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visited = bfs(grid, start, end);
    const path = getNodesInShortestPathOrder(end);
    animateDijkstra(visited, path);
  };

  const visualizeDFS = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visited = dfs(grid, start, end);
    const path = getNodesInShortestPathOrder(end);
    animateDijkstra(visited, path);
  };

  const visualizeAStar = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    const visited = aStar(grid, start, end);
    const path = getNodesInShortestPathOrder(end);
    animateDijkstra(visited, path);
  };

  const getNodesInShortestPathOrder = (endNode) => {
    const path = [];
    let current = endNode;
    while (current !== null) {
      path.unshift(current);
      current = current.previousNode;
    }
    return path;
  };

  const handleReset = () => {
    const cleared = createGrid();
    setGrid(cleared);
    document.querySelectorAll(".node").forEach((el) => {
      el.className = "node";
    });
  };

  return (
    <>
      <h1 className="heading">Dijkstra Path Finding Visualizer</h1>

      {/* 🕹 Speed Control */}
      <div style={{ margin: "10px 20px" }}>
        <label>Speed: </label>
        <input
          type="range"
          min="5"
          max="100"
          step="5"
          value={speedDelay}
          onChange={(e) => setSpeedDelay(Number(e.target.value))}
        />
        <span style={{ marginLeft: "10px" }}>
          {speedDelay <= 20 ? "Fast" : speedDelay <= 50 ? "Medium" : "Slow"}
        </span>
      </div>

      {/* 🔘 Controls */}
      <div className="buttons">
        <button
          className={mode === "wall" ? "active" : ""}
          onClick={() => setMode("wall")}
        >
          Wall
        </button>

        <button
          className={mode === "start" ? "active" : ""}
          onClick={() => setMode("start")}
        >
          Set Start
        </button>

        <button
          className={mode === "end" ? "active" : ""}
          onClick={() => setMode("end")}
        >
          Set End
        </button>

        {/* Dropdown for algorithms */}
        <div className="dropdown">
          <button className="dropbtn">Visualize Algorithm ⏷</button>
          <div className="dropdown-content">
            <button onClick={visualizeDijkstra}>Dijkstra's</button>
            <button onClick={visualizeBFS}>BFS</button>
            <button onClick={visualizeDFS}>DFS</button>
            <button onClick={visualizeAStar}>A*</button>
          </div>
        </div>

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* 🔲 Grid */}
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
