import { readonly, ref } from 'vue';
import operations from '../config/operations';

const operationsArr = Object.keys(operations);

export default function useCalculate() {
  const currentOperation = ref(null);
  const currentNumber = ref('0');

  function chooseOperation(operation) {
    if (!operationsArr.includes(operation)) {
      throw new Error('operation should be ope of' + operationsArr);
    }

    currentOperation.value = operation;
  }

  function calculate(number) {
    switch (currentOperation.value) {
      case 'plus':
        currentNumber.value = Number(currentNumber.value) + Number(number);
        break;
      case 'minus':
        currentNumber.value = Number(currentNumber.value) - Number(number);
        break;
      case 'multiply':
        currentNumber.value = Math.round((Number(currentNumber.value) * Number(number)) * 100) / 100;
        break;
      case 'devide':
        currentNumber.value = Math.round((Number(currentNumber.value) / Number(number)) * 100) / 100;
        break;
      default:
        break;
    }

    currentOperation.value = null;

    return String(currentNumber.value);
  }

  function clear() {
    currentNumber.value = '0';
    currentOperation.value = null;
  }

  return {
    currentNumber,
    currentOperation: readonly(currentOperation),
    chooseOperation,
    calculate,
    clear,
  }
};
