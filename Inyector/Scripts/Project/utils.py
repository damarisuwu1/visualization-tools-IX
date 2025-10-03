import time, functools, statistics, pandas as pd, os

def transform_types(dictionary: dict, list_1: list, list_2: list):
    for llave in list_1:
        if llave in dictionary.keys():
            value_type = list_2.pop(0)
            dictionary[llave] = value_type(dictionary[llave])
        else:
            raise Exception("The dictionary does not meet the required keys")
    return dictionary

def benchmark_method(func, *args, repeat=5, **kwargs):
    """
    Benchmark the execution time of a function or method.
    
    Args:
        func (callable): function or method to benchmark
        *args, **kwargs: arguments for the function
        repeat (int): number of times to repeat the benchmark

    Returns:
        dict: contains results of benchmarking (mean, median, min, max, all runs)
    """
    times = []
    for _ in range(repeat):
        start = time.perf_counter()
        func(*args, **kwargs)
        end = time.perf_counter()
        times.append(end - start)

    return {
        "mean": statistics.mean(times),
        "median": statistics.median(times),
        "min": min(times),
        "max": max(times),
        "runs": times
    }


def benchmark_class_methods(instance, methods=None, repeat=5):
    """
    Benchmark specific methods of a class instance.
    
    Args:
        instance (object): instantiated class
        methods (list[str] | None): list of method names to benchmark. 
                                    If None, benchmarks only 'procesar'
        repeat (int): number of times to repeat

    Returns:
        dict: mapping method names to their benchmark results
    """
    results = {}
    if methods is None:
        methods = ["procesar"]

    for method_name in methods:
        method = getattr(instance, method_name)
        results[method_name] = benchmark_method(method, repeat=repeat)

    return results

def save_benchmark_data(list_1: list):
    benchmarks = pd.json_normalize(list_1)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, '../../Files/data/benchmarks.csv')
    benchmarks = benchmarks.to_csv(file_path, index=False)
    return benchmarks