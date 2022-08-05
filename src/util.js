const WinPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export const checkIfWinner = (grid) => {
    return WinPatterns.map(box => {
        sum = grid[box[0]] + grid[box[1]] + grid[box[2]]
        return sum == 3 || sum == 6; 
    }).includes(true);
}