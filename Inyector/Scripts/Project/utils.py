def transform_types(dictionary: dict, list_1: list, list_2: list):
    for llave in list_1:
        if llave in dictionary.keys():
            value_type = list_2.pop(0)
            dictionary[llave] = value_type(dictionary[llave])
        else:
            raise Exception("The dictionary does not meet the required keys")
    return dictionary