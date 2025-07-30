def bin_search(sorted_list, search_value):
    low = 0;
    high = len(sorted_list) - 1

    while (low <= high):

        middle_index = (low + high) // 2
        
        middle_value = sorted_list[middle_index]

        if middle_value == search_value:
            return middle_index
        elif middle_value > search_value:
            high = middle_index - 1
        else:
            low = middle_index + 1


    return None


list = [1015, 1020, 1300,1400, 1569, 1700, 1900, 2001, 2020, 2050, 2500, 2600]

index_number = bin_search(list, 2600)
print(f"Index number {index_number}")
