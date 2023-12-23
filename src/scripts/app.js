import {
    openModalBtn,
    closeModalBtn,
    clearAllDataBtn,
    productForm,
    productListContent,
    productListShow,
    filterInput,
    sortProductListBtn,
    setGoalsBtn,
    closeGoalsModalBtn,
    saveGoalsBtn,
    dropZone
} from './variables.js';

import {
    openModal,
    closeModal,
    openGoalsModal,
    closeGoalsModal
} from './fuctions/modal.js';

import toggleProductListVisibility from './fuctions/toggleProductListVisibility.js';
import toggleSortDirection from "./fuctions/toggleSortDirection.js";
import saveGoals from "./fuctions/saveGoals.js";
import clearAllData from "./fuctions/clearAllData.js";
import {
    handleProductFormSubmit,
    handleProductListClick
} from "./fuctions/handleProduct.js";
import {
    displayProducts,
    displaySelectedProducts,
    displayGoals
} from "./fuctions/displayFunctions.js";
import {
    allowDrop,
    handleDrop
} from "./fuctions/dragAndDropFunctions.js";


// Обработчики
document.addEventListener('DOMContentLoaded', () => {
    openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (clearAllDataBtn) {
        clearAllDataBtn.addEventListener('click', clearAllData);
    }

    productForm.addEventListener('submit', handleProductFormSubmit);
    productListContent.addEventListener('click', handleProductListClick);
    productListShow.addEventListener('click', toggleProductListVisibility);
    filterInput.addEventListener('input', displayProducts);
    sortProductListBtn.addEventListener('click', toggleSortDirection);
    setGoalsBtn.addEventListener('click', openGoalsModal);
    closeGoalsModalBtn.addEventListener('click', closeGoalsModal);
    saveGoalsBtn.addEventListener('click', saveGoals);

    dropZone.addEventListener('dragover', allowDrop);
    dropZone.addEventListener('drop', handleDrop);

    // Инициализация отображения продуктов, целевых калорий и выбранных продуктов
    displayProducts();
    displayGoals();
    displaySelectedProducts();
});