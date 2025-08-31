// ******************************************* Arrays (Medium) *******************************************

// 1- 3Sum – Sort array, fix one number, use two pointers to find triplets summing to 0, skip duplicates
// expl: Input: nums = [-1,0,1,2,-1,-4] Output: [[-1,-1,2],[-1,0,1]]

// 2- Subarray Sum Equals K – Use prefix sum and a hashmap to count how many times (sum-k) has appeared
// expl: Input: nums = [1,1,1], k = 2 Output: 2

// 3- Product of Array Except Self – Build prefix product and suffix product arrays, multiply them
// expl: Input: nums = [1,2,3,4] Output: [24,12,8,6]

// 4- Maximum Subarray – Kadane’s Algorithm: keep current sum, reset if it drops below 0
// expl: Input: nums = [-2,1,-3,4,-1,2,1,-5,4] Output: 6 (subarray [4,-1,2,1])

// 5- Set Matrix Zeroes – Mark first row/col as indicators, then zero out rows and cols
// expl: Input: [[1,1,1],[1,0,1],[1,1,1]] Output: [[1,0,1],[0,0,0],[1,0,1]]

// 6- Spiral Matrix – Traverse layer by layer with boundaries (top, bottom, left, right)
// expl: Input: [[1,2,3],[4,5,6],[7,8,9]] Output: [1,2,3,6,9,8,7,4,5]

// 7- Insert Interval – Add intervals before/after new one, merge overlaps
// expl: Input: intervals = [[1,3],[6,9]], newInterval = [2,5] Output: [[1,5],[6,9]]

// 8- Game of Life – Count live neighbors for each cell, update board in-place using state encoding
// expl: Input: [[0,1,0],[0,0,1],[1,1,1],[0,0,0]] Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

// 9- Rotate Array – Reverse whole array, then reverse first k and last n-k
// expl: Input: nums = [1,2,3,4,5,6,7], k = 3 Output: [5,6,7,1,2,3,4]

// 10- Find First and Last Position – Binary search for leftmost and rightmost target
// expl: Input: nums = [5,7,7,8,8,10], target = 8 Output: [3,4]

// ----------------------
// 1-) 3Sum – Sorting + Two Pointers
// ----------------------
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return res;
}

// ----------------------
// 2-) Subarray Sum Equals K – Prefix Sum + Hash Map
// ----------------------
function subarraySum(nums: number[], k: number): number {
    let count = 0, sum = 0;
    const map = new Map<number, number>();
    map.set(0, 1);
    for (let num of nums) {
        sum += num;
        if (map.has(sum - k)) count += map.get(sum - k)!;
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}

// ----------------------
// 3-) Product of Array Except Self – Prefix + Suffix
// ----------------------
function productExceptSelf(nums: number[]): number[] {
    const res = new Array(nums.length).fill(1);
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= suffix;
        suffix *= nums[i];
    }
    return res;
}

// ----------------------
// 4-) Maximum Subarray – Kadane’s Algorithm
// ----------------------
function maxSubArray(nums: number[]): number {
    let maxSum = nums[0], curr = nums[0];
    for (let i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
}

// ----------------------
// 5-) Set Matrix Zeroes – In-Place with Markers
// ----------------------
function setZeroes(matrix: number[][]): void {
    let firstRow = false, firstCol = false;
    const m = matrix.length, n = matrix[0].length;
    for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstCol = true;
    for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRow = true;
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
        }
    }
    if (firstRow) for (let j = 0; j < n; j++) matrix[0][j] = 0;
    if (firstCol) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}

// ----------------------
// 6-) Spiral Matrix – Boundaries
// ----------------------
function spiralOrder(matrix: number[][]): number[] {
    const res: number[] = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) res.push(matrix[top][j]);
        top++;
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (let j = right; j >= left; j--) res.push(matrix[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
            left++;
        }
    }
    return res;
}

// ----------------------
// 7-) Insert Interval – Merge Intervals
// ----------------------
function insert(intervals: number[][], newInterval: number[]): number[][] {
    const res: number[][] = [];
    let i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i++]);
    }
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < intervals.length) res.push(intervals[i++]);
    return res;
}

// ----------------------
// 8-) Game of Life – In-Place with State Encoding
// ----------------------
function gameOfLife(board: number[][]): void {
    const dirs = [-1, 0, 1];
    const m = board.length, n = board[0].length;
    const getNeighbors = (r: number, c: number) => {
        let count = 0;
        for (let dr of dirs) {
            for (let dc of dirs) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    if (Math.abs(board[nr][nc]) === 1) count++;
                }
            }
        }
        return count;
    };
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const liveNeighbors = getNeighbors(r, c);
            if (board[r][c] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                board[r][c] = -1;
            }
            if (board[r][c] === 0 && liveNeighbors === 3) {
                board[r][c] = 2;
            }
        }
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] > 0) board[r][c] = 1;
            else board[r][c] = 0;
        }
    }
}

// ----------------------
// 9-) Rotate Array – Reverse Trick
// ----------------------
function rotate(nums: number[], k: number): void {
    k %= nums.length;
    const reverse = (l: number, r: number) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++; r--;
        }
    };
    reverse(0, nums.length - 1);
    reverse(0, k - 1);
    reverse(k, nums.length - 1);
}

// ----------------------
// 10-) Find First and Last Position – Binary Search
// ----------------------
function searchRange(nums: number[], target: number): number[] {
    const findBound = (isFirst: boolean): number => {
        let l = 0, r = nums.length - 1, ans = -1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                ans = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    };
    return [findBound(true), findBound(false)];
}


// ******************************************* Strings (Medium) *******************************************

// 1- Longest Substring Without Repeating Characters – Sliding window with set
// expl: Input: "abcabcbb" Output: 3 ("abc")

// 2- Longest Palindromic Substring – Expand around center
// expl: Input: "babad" Output: "bab" or "aba"

// 3- Group Anagrams – Sort string as key in hashmap
// expl: Input: ["eat","tea","tan","ate","nat","bat"] Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

// 4- Longest Repeating Character Replacement – Sliding window with max frequency
// expl: Input: "AABABBA", k=1 Output: 4 ("AABA")

// 5- Minimum Window Substring – Sliding window shrinking left when valid
// expl: Input: s="ADOBECODEBANC", t="ABC" Output: "BANC"

// 6- Valid Parentheses – Stack to match open/close
// expl: Input: "({[]})" Output: true

// 7- Decode String – Stack for nested brackets
// expl: Input: "3[a2[c]]" Output: "accaccacc"

// 8- Multiply Strings – Simulate multiplication digit by digit
// expl: Input: "123","456" Output: "56088"

// 9- Add Strings – Simulate addition with carry
// expl: Input: "11","123" Output: "134"

// 10- Integer to Roman – Greedy subtract values
// expl: Input: 1994 Output: "MCMXCIV"


// ----------------------
// 1-) Longest Substring Without Repeating Characters – Sliding Window
// ----------------------
function lengthOfLongestSubstring(s: string): number {
    const set = new Set<string>();
    let l = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        while (set.has(s[r])) {
            set.delete(s[l]);
            l++;
        }
        set.add(s[r]);
        res = Math.max(res, r - l + 1);
    }
    return res;
}

// ----------------------
// 2-) Longest Palindromic Substring – Expand Around Center
// ----------------------
function longestPalindrome(s: string): string {
    if (s.length < 2) return s;
    let res = "";
    const expand = (l: number, r: number) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > res.length) {
                res = s.substring(l, r + 1);
            }
            l--; r++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);     // odd length
        expand(i, i + 1); // even length
    }
    return res;
}

// ----------------------
// 3-) Group Anagrams – Hash Map
// ----------------------
function groupAnagrams(strs: string[]): string[][] {
    const map: Record<string, string[]> = {};
    for (let word of strs) {
        const key = word.split("").sort().join("");
        if (!map[key]) map[key] = [];
        map[key].push(word);
    }
    return Object.values(map);
}

// ----------------------
// 4-) Longest Repeating Character Replacement – Sliding Window
// ----------------------
function characterReplacement(s: string, k: number): number {
    const count: Record<string, number> = {};
    let l = 0, maxCount = 0, res = 0;
    for (let r = 0; r < s.length; r++) {
        count[s[r]] = (count[s[r]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[r]]);
        while ((r - l + 1) - maxCount > k) {
            count[s[l]]--;
            l++;
        }
        res = Math.max(res, r - l + 1);
    }
    return res;
}

// ----------------------
// 5-) Minimum Window Substring – Sliding Window
// ----------------------
function minWindow(s: string, t: string): string {
    const need: Record<string, number> = {};
    for (let c of t) need[c] = (need[c] || 0) + 1;
    let have = 0, required = Object.keys(need).length;
    let l = 0, res = [-1, -1], resLen = Infinity;
    const window: Record<string, number> = {};

    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        window[c] = (window[c] || 0) + 1;
        if (need[c] && window[c] === need[c]) have++;

        while (have === required) {
            if ((r - l + 1) < resLen) {
                res = [l, r];
                resLen = r - l + 1;
            }
            window[s[l]]--;
            if (need[s[l]] && window[s[l]] < need[s[l]]) have--;
            l++;
        }
    }
    return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);
}

// ----------------------
// 6-) Valid Parentheses – Stack
// ----------------------
function isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
    for (let c of s) {
        if (c in map) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}

// ----------------------
// 7-) Decode String – Stack
// ----------------------
function decodeString(s: string): string {
    const stack: any[] = [];
    let currStr = "", currNum = 0;
    for (let c of s) {
        if (!isNaN(Number(c))) {
            currNum = currNum * 10 + Number(c);
        } else if (c === "[") {
            stack.push([currStr, currNum]);
            currStr = ""; currNum = 0;
        } else if (c === "]") {
            const [prevStr, num] = stack.pop();
            currStr = prevStr + currStr.repeat(num);
        } else {
            currStr += c;
        }
    }
    return currStr;
}

// ----------------------
// 8-) Multiply Strings – Simulated Math
// ----------------------
function multiply(num1: string, num2: string): string {
    if (num1 === "0" || num2 === "0") return "0";
    const res = new Array(num1.length + num2.length).fill(0);
    for (let i = num1.length - 1; i >= 0; i--) {
        for (let j = num2.length - 1; j >= 0; j--) {
            const mul = Number(num1[i]) * Number(num2[j]);
            const sum = mul + res[i + j + 1];
            res[i + j + 1] = sum % 10;
            res[i + j] += Math.floor(sum / 10);
        }
    }
    while (res[0] === 0) res.shift();
    return res.join("");
}

// ----------------------
// 9-) Add Strings – Elementary Addition
// ----------------------
function addStrings(num1: string, num2: string): string {
    let i = num1.length - 1, j = num2.length - 1, carry = 0, res = "";
    while (i >= 0 || j >= 0 || carry) {
        const sum = (Number(num1[i--] || 0) + Number(num2[j--] || 0) + carry);
        res = (sum % 10) + res;
        carry = Math.floor(sum / 10);
    }
    return res;
}

// ----------------------
// 10-) Integer to Roman – Greedy
// ----------------------
function intToRoman(num: number): string {
    const val = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let res = "";
    for (let i = 0; i < val.length; i++) {
        while (num >= val[i]) {
            num -= val[i];
            res += syms[i];
        }
    }
    return res;
}
