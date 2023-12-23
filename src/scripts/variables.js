export const
    openModalBtn = document.querySelector('#openModalBtn'),
    modal = document.querySelector('#modal'),
    goalsModal = document.querySelector('#goalsModal'),
    closeModalBtn = document.querySelector('#closeModalBtn'),
    productForm = document.querySelector('#productForm'),
    productList = document.querySelector('.productList'),
    productListContent = document.querySelector('.productList-container'),
    productListShow = document.querySelector('.productList-show'),
    sortProductListBtn = document.querySelector('.productList-sort'),
    filterInput = document.querySelector('.productList-filterInput'),
    setGoalsBtn = document.querySelector('#setGoalsBtn'),
    closeGoalsModalBtn = document.querySelector('#closeGoalsModalBtn'),
    saveGoalsBtn = document.querySelector('#saveGoalsBtn'),
    caloriesGoalDisplay = document.querySelector('.calories-goalDisplay'),
    selectedProductsContainer = document.querySelector('.selected-products-container'),
    totalCaloriesDisplay = document.querySelector('#totalCalories'),
    clearAllDataBtn = document.querySelector('#clearAllDataBtn'),
    dropZone = document.querySelector('.selectedProducts'),
    canvas = document.querySelector('#chartCanvas');

export const
    // Объект для управления направлением сортировки
    sortDirection = {
        ascending: true,
        toggle: function () {
            this.ascending = !this.ascending;
        },
    },
    // Объект ключей из localStorage
    storage = {
        products: 'products',
        goals: 'goals',
        selectedProducts: 'selectedProducts'
    };

