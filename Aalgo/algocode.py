from queue import PriorityQueue 

def a_star(START, END,GRAPH,HeuristicValue):
    
    """Optimal path from source to destination using straight line distance heuristic
    :param Start: Start city name
    :param End: End city name
    :param GRAPH: 
    :param HeuristicValue: striaght line distance value 

    :returns: Heuristic value, cost and path for optimal traversal
    """
    
    priority_queue, visited = PriorityQueue(), {}
    priority_queue.put((HeuristicValue[START], 0, START, [START]))
    visited[START] = HeuristicValue[START]
    while not priority_queue.empty():
        (heuristic, cost, vertex, path) = priority_queue.get()
        if vertex == END:
            return heuristic, cost, path
        for next_node in GRAPH[vertex].keys():
            current_cost = cost + GRAPH[vertex][next_node]
            heuristic = current_cost + HeuristicValue[next_node]
            if not next_node in visited or visited[next_node] >= heuristic:
                visited[next_node] = heuristic
                priority_queue.put((heuristic, current_cost, next_node, path + [next_node]))
