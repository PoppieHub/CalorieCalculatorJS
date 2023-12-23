import {
    caloriesGoalDisplay,
    filterInput,
    productListContent,
    selectedProductsContainer,
    sortDirection,
    sortProductListBtn,
    storage,
    totalCaloriesDisplay
} from "../variables.js";
import {handleDragStart} from "./dragAndDropFunctions.js";
import currentDate from "../utils/currentDate.js";
import removeSelectedProduct from "./removeSelectedProduct.js";
import {checkDailyCaloriesLimit} from "./ProductManager.js";
import {displayChart} from "./chart.js";

// Отображение списка продуктов с учетом фильтрации и сортировки
export const displayProducts = () => {
    // Получение значения фильтра по имени
    const filterByName = filterInput.value.toLowerCase();
    // Загрузка сохраненных продуктов из localStorage
    const products = JSON.parse(localStorage.getItem(storage.products)) || [];

    // Фильтрация продуктов по имени
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filterByName)
    );

    // Сортировка продуктов по калориям
    const sortedProducts = filteredProducts.sort((a, b) => {
        const multiplier = sortDirection.ascending ? 1 : -1;
        return multiplier * (a.calories - b.calories);
    });

    // Отображение отфильтрованных и отсортированных продуктов
    if (sortedProducts.length === 0) {
        productListContent.innerHTML = '<h3>Нет сохраненных продуктов</h3>';
    } else {
        productListContent.innerHTML = '';
        sortedProducts.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.draggable = true;
            div.addEventListener('dragstart', (e) => handleDragStart(e, product.id));
            div.innerHTML = `<span class="product-card-title">${product.name}</span>
                            <span>${product.calories} ккал</span>
                            <p>${product.description}</p>
                            <button class="delete-btn" data-product-id="${product.id}">&times;</button>`;
            productListContent.appendChild(div);
        });
    }

    // Обновление текста кнопки сортировки
    sortProductListBtn.textContent = `Сортировать по калориям ${sortDirection.ascending ? '↑' : '↓'}`;
};

// Отображение целевых на текущую дату
export const displayGoals = () => {
    // Получение текущих целей из localStorage
    let goals = JSON.parse(localStorage.getItem(storage.goals)) || [];

    const currentGoals = goals.find(goal => goal.date === currentDate());
    if (currentGoals) {
        caloriesGoalDisplay.textContent = `Сегодняшняя цель по калориям: ${currentGoals.caloriesGoal} ккал`;
    } else {
        caloriesGoalDisplay.textContent = 'Цель не задана';
    }
};

// Рендеринг съеденных продуктов
export const displaySelectedProducts = () => {
    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem(storage.selectedProducts)) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate());

    // Отображение выбранных продуктов
    if (currentDateEntry) {
        const totalCalories = currentDateEntry.products.reduce((sum, productGroup) => {
            return sum + productGroup.reduce((productSum, product) => productSum + parseInt(product.calories), 0);
        }, 0);

        // Отображение выбранных продуктов в списке
        selectedProductsContainer.innerHTML = '';

        currentDateEntry.products.forEach(productGroup => {
            productGroup.forEach(product => {
                const li = document.createElement('li');
                li.className = 'selected-product-card';

                li.innerHTML = `<span class="selected-product-card-title">${product.name}</span>
                                <span>${product.calories} ккал</span>
                                <button class="remove-btn" data-product-id="${product.id}">&times;</button>`;

                li.querySelector('.remove-btn').addEventListener('click', () => {
                    removeSelectedProduct(product.id);
                    displaySelectedProducts();
                });

                selectedProductsContainer.appendChild(li);
            });
        });

        // Отображение общей суммы калорий для текущей даты
        totalCaloriesDisplay.textContent = `Сегодняшний итог: ${totalCalories} ккал`;
    } else {
        // Отображение сообщения, если нет выбранных продуктов
        selectedProductsContainer.innerHTML = '<h3>На сегодня нет выбранных продуктов</h3>';
        totalCaloriesDisplay.textContent = 'Сумма калорий: 0 ккал';
    }

    // Проверка на превышение дневного лимита калорий и отображение графика
    checkDailyCaloriesLimit();
    displayChart();
};