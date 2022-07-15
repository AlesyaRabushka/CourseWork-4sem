from datetime import datetime
from time import perf_counter, perf_counter

# convert number into binary system
def into_binary(decimal_number):
    binary_number=''
    while decimal_number > 0:
        binary_number = str(decimal_number % 2) + binary_number
        decimal_number = decimal_number // 2
    return binary_number


# checking for 6 digits
def check_number_digits(number):
    number = str(number)
    if len(number) < 6:
        new_number = ''
        number_start_digit = 6 - len(number)
        # resize the number to be 6 digital
        index = 0
        while index != number_start_digit:
            new_number += '0'
            index += 1
        new_number += number
        number = new_number
        return number


# make similar digits to compose the numbers
def check_digits(bigger, smaller):
    bigger_len = len(bigger)
    smaller_len = len(smaller)

    new_value = ''
    for i in range(0, bigger_len - smaller_len):
        new_value += '0'
    smaller = new_value + smaller
    return smaller


# binary composition
def binary_composition(list, iter):
    result = ''
    if len(list) == 2:
        print(f'\n\t----- Composition {iter}-----')

        carry = 0
        first_number = list[0]
        second_number = list[1]
        if len(first_number) > len(second_number):
            second_number = check_digits(first_number, second_number)
        elif len(second_number) > len(first_number):
            first_number = check_digits(second_number, first_number)

        print('\tFirst number:       ', first_number)
        print('\tSecond number:      ', second_number)
        for i in range(len(first_number) - 1, -1, -1):
            d = carry
            if first_number[i] == '1':
                d += 1
            else:
                d += 0
            if second_number[i] == '1':
                d += 1
            else:
                d += 0

            if d % 2 == 1:
                result = '1' + result
            else:
                result = '0' + result

            if d < 2:
                carry = 0
            else:
                carry = 1

        if carry != 0:
            result = '1' + result

        return str(result)
    else:
        return result


# binary multiplication with intermediate results
# with the left shift of the binary number
def digital_binary_multiplication(binary_number, digit, sum, iter):
    time1 = perf_counter()
    multiplication_result = ''
    intermediate_sum=''
    binary_number = str(binary_number)


    if digit == 1:
        multiplication_result = binary_number
        sum.append(multiplication_result)
        intermediate_sum = str(binary_composition(sum, iter))


    elif digit == 0:
        for i in range(0, len(binary_number)):
            multiplication_result += '0'
        sum.append(multiplication_result)
        intermediate_sum = str(binary_composition(sum, iter))


    # left shift
    if len(sum) == 2:
        print('\tIntermediate sum:   ', intermediate_sum)

        sum.clear()
        sum.append(intermediate_sum)

    binary_number += '0'
    time2 = perf_counter()
    print(f'\ttime {time2-time1:0.7f} seconds')
    return binary_number


# multiplication of two binary numbers
def multiplication(first_binary, second_binary):
    print('\t------- MULTIPLICATION --------')
    sum=[]
    iter = 0
    new_second_binary = second_binary[::-1]

    print('\tFirst number: ', first_binary)
    print('\tSecond number:', second_binary)

    for i in new_second_binary:
        if i == '0':
            iter += 1
            first_binary = digital_binary_multiplication(str(first_binary), 0, sum, iter-1)
        elif i == '1':
            iter += 1
            first_binary = digital_binary_multiplication(str(first_binary), 1, sum, iter-1)
    print('\n\t\tFinal: ', sum[0])
    print('\t-------------------------------')


# the main function of the programm
def lists_multiplication(first_list, second_list):

    for i in first_list:
        for j in second_list:
            first_number = check_number_digits(into_binary(int(i)))
            second_number = check_number_digits(into_binary(int(j)))
            multiplication(first_number, second_number)


# start
lists_multiplication([11, 5], [6, 7])


