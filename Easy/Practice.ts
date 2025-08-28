// ----------------------
// 1-) Optimized Two Sum – Hash Map
// ----------------------
function TwoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// ----------------------
// 2-) Best Time to Buy and Sell Stock – Brute Force
// ----------------------
function maxProfit(prices: number[]): number {
    let profit = 0;
    for (let j = 0; j < prices.length; j++) {
        for (let i = j + 1; i < prices.length; i++) {
            if (prices[i] > prices[j]) {
                const currentProfit = prices[i] - prices[j];
                if (currentProfit > profit) {
                    profit = currentProfit;
                }
            }
        }
    }
    return profit;
}

// ----------------------
// 3-) Remove Element – Two Pointers
// ----------------------
function removeElement(nums: number[], val: number): number {
    let k = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[k] = nums[j];
            k++;
        }
    }
    return k;
}

// ----------------------
// 4-) Search Insert Position – Binary Search
// ----------------------
function SearchInsert(nums: number[], target: number): number {
    let low = 0;
    let high = nums.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return low;
}

// ----------------------
// 5-) Contains Duplicate – Hash Set
// ----------------------
function ContainsDuplicate(nums: number[]): boolean {
    let seen = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i])) {
            return true;
        }
        seen.add(nums[i]);
    }
    return false;
}

// ----------------------
// 6-) Intersection of Two Arrays II – Hash Map + Frequency Counting
// ----------------------
function intersection(nums1: number[], nums2: number[]): number[] {
    const set1 = new Set<number>();
    for (let i = 0; i < nums1.length; i++) {
        set1.add(nums1[i]);
    }
    const result: number[] = [];
    const seen = new Set<number>();
    for (let i = 0; i < nums2.length; i++) {
        const num = nums2[i];
        if (set1.has(num) && !seen.has(num)) {
            result.push(num);
            seen.add(num);
        }
    }
    return result;
}

// ----------------------
// 7-) Plus One – Digit Manipulation
// ----------------------
function PlusOne(digits: number[]): number[] {
    for (let i = digits.length - 1; i < digits.length; i--) {
        if (i == 0 && digits[i] === 9) {
            digits[i] = 0;
            digits.unshift(1);
        } else if (digits[i] !== 9) {
            digits[i] = digits[i] + 1;
            return digits;
        } else if (digits[i] === 9) {
            digits[i] = 0;
        }
    }
    return digits;
}

// ----------------------
// 8-) Maximum Product of Two Elements – Brute Force
// ----------------------
function maxProduct(nums: number[]): number {
    let res = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                const product = (nums[i] - 1) * (nums[j] - 1);
                if (product > res) res = product;
            }
        }
    }
    return res;
}

// ----------------------
// 9-) Maximum Product of Two Elements – Linear Scan
// ----------------------
function MaxProduct(nums: number[]): number {
    let max1 = -Infinity, max2 = -Infinity;
    for (let num of nums) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
    }
    return (max1 - 1) * (max2 - 1);
}

// ----------------------
// 10-) Third Maximum Number – Sorting + Deduplication
// ----------------------
function ThirdMax(nums: number[]): number {
    nums.sort((a, b) => b - a);
    const filteredNums: number[] = [];
    for (const num of nums) {
        if (filteredNums.length === 0 || num !== filteredNums[filteredNums.length - 1]) {
            filteredNums.push(num);
        }
    }
    return filteredNums.length >= 3 ? filteredNums[2] : filteredNums[0];
}

// ----------------------
// 11-) Majority Element – Boyer-Moore Voting Algorithm
// ----------------------
function MajorityElement(nums: number[]): number {
    let candidate = nums[0];
    let count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (candidate === nums[i]) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
}

// ----------------------
// 12-) Maximum Average Subarray – Sliding Window
// ----------------------
function FindMaxAverage(nums: number[], k: number): number {
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    let maxSum = windowSum;
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum / k;
}

// ----------------------
// 13-) Maximum Average Subarray – Brute Force
// ----------------------
function findMaxAverage(nums: number[], k: number): number {
    let highestAverage = -Infinity;
    for (let i = 0; i <= nums.length - k; i++) {
        let average = 0;
        for (let j = i; j < i + k; j++) {
            average += nums[j];
        }
        average = average / k;
        if (average > highestAverage) {
            highestAverage = average;
        }
    }
    return highestAverage;
}

// ----------------------
// 14-) Remove Duplicates from Sorted Array – Two Pointers
// ----------------------
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}

// ----------------------
// 15-) Merge Sorted Array – Three Pointers
// ----------------------
function Merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}

// ----------------------
// 16-) Move Zeroes – In-place Two Pointers
// ----------------------
function MoveZeroes(nums: number[]): void {
    let nonZeroIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        }
    }
    for (let i = nonZeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
}


// ******************************************* Strings *******************************************

// 1- Reverse String – Use two pointers (left/right), meet at middle, swap elements using array destructuring, modify array in-place
// expl: Input: s = ["h","e","l","l","o"] Output: ["o","l","l","e","h"]

// 2- Valid Palindrome – Two pointers from ends, skip non-alphanumeric with regex test, compare lowercased chars, move to middle
// expl: Input: s = "A man, a plan, a canal: Panama" Output: true

// 3- Find the Index of First Occurrence – Loop through string, use substring to check if window of needle's length matches needle exactly
// expl: Input: haystack = "sadbutsad", needle = "sad" Output: 0

// 4- Longest Common Prefix – Take first string as prefix, for each other string 1 by 1 reduce prefix length until it matches start of string
// expl: Input: strs = ["flower","flow","flight"] Output: "fl"

// 5- Valid Anagram – Create frequency map of first string's chars, decrease counts for second string's chars, fail if any char missing
// expl: Input: s = "anagram", t = "nagaram" Output: true

// 6- First Unique Character – Build frequency map of all chars, then find first char with count of 1
// expl: Input: s = "leetcode" Output: 0 (first non-repeating char 'l' is at index 0)

// 7- Reverse Words in String III – Split by space, for each word split to array, reverse, join back, join all with spaces
// expl: Input: s = "Let's take LeetCode contest" Output: "s'teL ekat edoCteeL tsetnoc"

// 8- Count and Say – Recursive: get previous result, count consecutive same digits, build string of "count + digit"
// expl: Input: n = 4 Output: "1211" (1 is read as "one 1" = "11", 11 is read as "two 1s" = "21", 21 is read as "one 2 one 1" = "1211")

// 9- Add Binary – Right-to-left addition, track carry, build result string from right using modulo and division
// expl: Input: a = "11", b = "1" Output: "100"

// 10- Length of Last Word – Skip trailing spaces from end, count chars until space or start, handle single word edge case
// expl: Input: s = "Hello World  " Output: 5 (length of "World")

// ----------------------
// 1-) Reverse String – Two Pointers
// ----------------------
function ReverseString(s: string[]): void {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// ----------------------
// 2-) Valid Palindrome – Two Pointers
// ----------------------
function IsPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    while (left < right) {
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
}

// ----------------------
// 3-) Find the Index of the First Occurrence in a String – Naive Substring Search
// ----------------------
function StrStr(haystack: string, needle: string): number {
    if (needle.length === 0) return 0;
    for (let i = 0; i <= haystack.length - needle.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) return i;
    }
    return -1;
}

// ----------------------
// 4-) Longest Common Prefix – Horizontal Scanning
// ----------------------
function LongestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    return prefix;
}

// ----------------------
// 5-) Valid Anagram – Frequency Counting
// ----------------------
function IsAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const count: Record<string, number> = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}

// ----------------------
// 6-) First Unique Character in a String – Hash Map
// ----------------------
function FirstUniqChar(s: string): number {
    const count: Record<string, number> = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) return i;
    }
    return -1;
}

// ----------------------
// 7-) Reverse Words in a String III – Split + Reverse
// ----------------------
function ReverseWords(s: string): string {
    return s.split(" ")
            .map(word => word.split("").reverse().join(""))
            .join(" ");
}

// ----------------------
// 8-) Count and Say – Recursive String Construction
// ----------------------
function CountAndSay(n: number): string {
    if (n === 1) return "1";
    const prev = CountAndSay(n - 1);
    let result = "";
    let count = 1;
    for (let i = 1; i <= prev.length; i++) {
        if (prev[i] === prev[i - 1]) {
            count++;
        } else {
            result += count.toString() + prev[i - 1];
            count = 1;
        }
    }
    return result;
}

// ----------------------
// 9-) Add Binary – Digit by Digit Addition
// ----------------------
function AddBinary(a: string, b: string): string {
    let i = a.length - 1, j = b.length - 1, carry = 0;
    let result = "";
    while (i >= 0 || j >= 0 || carry) {
        let sum = carry;
        if (i >= 0) sum += Number(a[i--]);
        if (j >= 0) sum += Number(b[j--]);
        result = (sum % 2).toString() + result;
        carry = Math.floor(sum / 2);
    }
    return result;
}

// ----------------------
// 10-) Length of Last Word – Reverse Scan
// ----------------------
function LengthOfLastWord(s: string): number {
    let length = 0;
    let i = s.length - 1;
    while (i >= 0 && s[i] === " ") i--;
    while (i >= 0 && s[i] !== " ") {
        length++;
        i--;
    }
    return length;
}