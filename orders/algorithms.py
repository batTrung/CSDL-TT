from collections import defaultdict
import math
import operator

# ============================================= #
# 				Algorithms (Python)				#
# ============================================= #

# PREFIX TREE - TRIE ( Cau 5)
class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.isEnd = False
        
    def insert(self, word):
        node = self
        for w in word:
            node = node.children[w]
        node.isEnd = True

    def search(self, word):
        node = self
        for w in word:
            if w in node.children:
                node = node.children[w]
            else:
                return []
        # Khớp vối tiền tố

        result = []
        self.traverse(node, list(word), result)
        return [''.join(r) for r in result]

    def traverse(self, root, prefix, result):
        if root.isEnd:
            result.append(prefix[:])
        for c, n in root.children.items():
            prefix.append(c)
            self.traverse(n, prefix, result)
            prefix.pop(-1)

# KDTree ( Cau 8)
def khoangcach(x,xi):
    d = 0.0
    d = pow(float(x[0])- float(xi['lat']),2) + pow(float(x[1])- float(xi['lng']),2)

    return math.sqrt(d)

def getNeighbors(trainingSet, testInstance, k):
    distances = []
    for x in range(len(trainingSet)):
        dist = khoangcach(testInstance, trainingSet[x])
        distances.append((trainingSet[x], dist))
    distances.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(k):
        neighbors.append(distances[x][0])
    return neighbors
    
# Huffman ( Cau 7)


# Backtracking ( Cau 2)
def search(sr, sc, er, ec, path, grid):

    if sr < 0 or sc < 0 or sr >= len(grid) or sc >= len(grid[0]):
        return
    if (sr, sc) in path:
        return

    path.append((sr, sc))
    if (sr, sc) == (er, ec):
        yield path
    else:
        for possible_path in search(sr+1, sc, er, ec, list(path), grid):
            yield possible_path
        for possible_path in search(sr-1, sc, er, ec, list(path), grid):
            yield possible_path
        for possible_path in search(sr, sc+1, er, ec, list(path), grid):
            yield possible_path
        for possible_path in search(sr, sc-1, er, ec, list(path), grid):
            yield possible_path


def backtrackingMaze(grid):
    sumList = list(sum(grid[node[0]][node[1]] for node in so) for so in search(0, 0, 4, 4, [],grid))
    elMax = max(sumList)
    indexOfMax = sumList.index(elMax)

    return (list(search(0, 0, 4, 4, [],grid))[indexOfMax],elMax)

