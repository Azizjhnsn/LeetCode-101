// ***************************** Remove Duplicates From Sorted Array ***********************************
function removeDuplicates(nums: number[]): number {
        if(nums.length === 0 ) return 0;
    
    let i = 0;
    for (let j = 1; j<nums.length; j++){
        if(nums[j] !== nums[i]){
            i++
            nums[i] = nums[j];
        }
    }
    return i + 1;
};

// ***************************** Best time to buy and sell stock II ***********************************
function maxProfit(prices: number[]): number {
let profit = 0;
    for (let i = 1; i<prices.length; i++){
        if(prices[i]>prices[i - 1]){
            profit += prices[i] - prices[i-1];
        }
    }
    return profit

}

// ***************************** Rotate Array ***********************************
function rotateArr(nums: number[], k: number): void {
    for (let i = 1; i<= k; i++){
        let last = nums[nums.length -1];
        nums.unshift(last)
        nums.pop()
    }
};

// ***************************** Contains Duplicates Zeroes ***********************************
function containsDuplicate(nums: number[]): boolean {
    let set = new Set<number>();
    for (let i = 0; i < nums.length; i++){
        if(set.has(nums[i])){
            return true
        } else {
            set.add(nums[i]);
        }
    }
    return false
};

// ***************************** Single Number ***********************************
function singleNumber(nums: number[]): number {
let result = 0;
    for (const num of nums){
        result ^= num
    }
    return result
};

// ***************************** Intersection of two arrays II Zeroes ***********************************
function intersect(nums1: number[], nums2: number[]): number[] {
let result:number[] = []; 
    for (let i=0; i<nums1.length; i++){
        let index = nums2.indexOf(nums1[i]);
        if (index !== -1){
            result.push(nums1[i]);
            nums2.splice(index, 1)
        }     
        }
    return result
};

// ***************************** Plus One ***********************************
function plusOne(digits: number[]): number[] {
    const str = digits.join('');
    const number = BigInt(str) + 1n;
    const output = number.toString().split('').map(Number);
    return output
};

// ***************************** Move Zeroes ***********************************
function moveZeroes(nums: number[]): void {
    let j = 0 //keep tract of last non zero number index
    for (let i = 0; i <nums.length; i++){
        if(nums[i] !== 0){
            nums[j] = nums[i];
            j++
        }
    }

    for (let i = j; i<nums.length; i++){
        nums[i] = 0
    }
};

// ***************************** Two Sum ***********************************
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i<nums.length; i++){
        for (let j = i+1; j < nums.length; j++ ){
            if (nums[j] + nums[i] == target){
                return [i,j]
            }
        }
    }
    return []
};

// ***************************** Valid Sudoku ***********************************
function isValidSudoku(board: string[][]): boolean {
    // Create sets for each row, column, and box
    const rows = Array(9).fill(0).map(() => new Set());
    const cols = Array(9).fill(0).map(() => new Set());
    const boxes = Array(9).fill(0).map(() => new Set());

    for (let i = 0; i < 9; i++) {         // row
        for (let j = 0; j < 9; j++) {     // column
            const val = board[i][j];

            if (val === '.') continue; // ignore empty cells

            // Box index (0 to 8) for the 3x3 subgrid
            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            if (
                rows[i].has(val) ||
                cols[j].has(val) ||
                boxes[boxIndex].has(val)
            ) {
                return false;
            }

            rows[i].add(val);
            cols[j].add(val);
            boxes[boxIndex].add(val);
        }
    }

    return true;
};

// ***************************** Rotate n x n 2D matrix ***********************************
function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let row of matrix) {
        row.reverse();
    }
}
