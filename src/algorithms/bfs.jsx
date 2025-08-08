export function bfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    startNode.isVisited = true;
    queue.push(startNode);
  
    while (queue.length > 0) {
      const currentNode = queue.shift(); // FIFO
  
      if (currentNode.isWall) continue;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === endNode) return visitedNodesInOrder;
  
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  
    return visitedNodesInOrder; // if end not found
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
  