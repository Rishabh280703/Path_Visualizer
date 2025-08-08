export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const pathFound = dfsRecursive(
      startNode,
      finishNode,
      visitedNodesInOrder,
      grid
    );
    return visitedNodesInOrder;
  }
  
  function dfsRecursive(node, finishNode, visitedNodesInOrder, grid) {
    if (!node || node.isWall || node.isVisited) return false;
  
    node.isVisited = true;
    visitedNodesInOrder.push(node);
  
    if (node === finishNode) return true;
  
    const { row, col } = node;
    const neighbors = getUnvisitedNeighbors(row, col, grid);
  
    for (const neighbor of neighbors) {
      // ✅ ADD THIS LINE
      neighbor.previousNode = node;
  
      if (dfsRecursive(neighbor, finishNode, visitedNodesInOrder, grid)) {
        return true;
      }
    }
  
    return false;
  }
  
  function getUnvisitedNeighbors(row, col, grid) {
    const neighbors = [];
    const directions = [
      [0, -1], // Left
      [0, 1],  // Right
      [-1, 0], // Up
      [1, 0],  // Down
    ];
  
    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
  
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        const neighbor = grid[newRow][newCol];
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbors.push(neighbor);
        }
      }
    }
  
    return neighbors;
  }
  
