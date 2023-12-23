import {storage} from "../variables.js";
import currentDate from "../utils/currentDate.js";
import {showWarningModal} from "./modal.js";

// Сохранение продукта в localStorage
export const saveProduct = (product) => {
    // Загрузка сохраненных продуктов из localStorage
    let products = JSON.parse(localStorage.getItem(storage.products)) || [];
    // Добавление нового продукта к списку продуктов
    products.push({
        id: product.id,
        name: product.name,
        calories: product.calories,
        description: product.description
    });
    // Сохранение обновленного списка продуктов в localStorage
    localStorage.setItem(storage.products, JSON.stringify(products));
};

// Удаление продукта по ID
export const deleteProduct = (productId) => {
    // Загрузка сохраненных продуктов из localStorage
    let products = JSON.parse(localStorage.getItem(storage.products)) || [];
    // Фильтрация продуктов, исключая продукт с заданным ID
    products = products.filter(product => product.id !== productId);
    // Сохранение обновленного списка продуктов в localStorage
    localStorage.setItem(storage.products, JSON.stringify(products));
};

// Получение продукта по id
export const getProductById = (productId) => {
    // Загрузка сохраненных продуктов из localStorage
    const products = JSON.parse(localStorage.getItem(storage.products)) || [];
    // Поиск продукта по id
    return products.find(product => product.id === productId);
};

// Добавление продукта к выбранным продуктам
export const addToSelectedProducts = (product) => {
    // Получение сохраненных выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem(storage.selectedProducts)) || [];

    // Поиск записи выбранных продуктов для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate());

    // Создание новой записи, если она отсутствует
    if (!currentDateEntry) {
        currentDateEntry = { date: currentDate(), products: [] };
        selectedProducts.push(currentDateEntry);
    }

    // Добавление продукта к текущей дате
    currentDateEntry.products.push([{
        id: product.id,
        name: product.name,
        calories: product.calories,
    }]);

    // Сохранение обновленных выбранных продуктов в localStorage
    localStorage.setItem(storage.selectedProducts, JSON.stringify(selectedProducts));
};

// Функция для проверки лимита калорий
export const checkDailyCaloriesLimit = () => {
    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem(storage.selectedProducts)) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate());

    // Проверка превышения лимита калорий
    if (currentDateEntry) {
        const totalCalories = currentDateEntry.products.reduce((sum, productGroup) => {
            return sum + productGroup.reduce((productSum, product) => productSum + parseInt(product.calories), 0);
        }, 0);

        // Получение целей из localStorage
        const goals = JSON.parse(localStorage.getItem(storage.goals)) || [];
        // Поиск текущих целей для текущей даты
        const currentGoals = goals.find(goal => goal.date === currentDate());

        // Сравнение суммарных калорий с установленной целью
        if (currentGoals && totalCalories > currentGoals.caloriesGoal) {
            // Вывод предупреждения о превышении
            showWarningModal();
        }
    }
};