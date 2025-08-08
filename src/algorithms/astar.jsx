export function aStar(grid, startNode, finishNode) {
  const openSet = [];
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  startNode.heuristic = getHeuristic(startNode, finishNode);
  startNode.totalCost = startNode.heuristic;
  openSet.push(startNode);

  while (openSet.length > 0) {
    // Sort by totalCost (f = g + h)
    openSet.sort((a, b) => a.totalCost - b.totalCost);
    const currentNode = openSet.shift();

    if (currentNode.isWall) continue;
    if (currentNode.visited) continue;

    currentNode.visited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const tentative_g = currentNode.distance + 1;

      if (tentative_g < neighbor.distance) {
        neighbor.distance = tentative_g;
        neighbor.heuristic = getHeuristic(neighbor, finishNode);
        neighbor.totalCost = tentative_g + neighbor.heuristic;
        neighbor.previousNode = currentNode;
        openSet.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.visited);
}

function getHeuristic(nodeA, nodeB) {
  const dx = Math.abs(nodeA.row - nodeB.row);
  const dy = Math.abs(nodeA.col - nodeB.col);
  return dx + dy; // Manhattan Distance
}
