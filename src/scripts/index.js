import Product from './classes/Product.js';

const openModalBtn = document.querySelector('#openModalBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
const modal = document.querySelector('#modal');
const productForm = document.querySelector('#productForm');
const productList = document.querySelector('.productList');
const productListContent = document.querySelector('.productList-container');
const productListShow = document.querySelector('.productList-show');
const sortProductListBtn = document.querySelector('.productList-sort');
const filterInput = document.querySelector('.productList-filterInput');
const setGoalsBtn = document.querySelector('#setGoalsBtn');
const goalsModal = document.querySelector('#goalsModal');
const closeGoalsModalBtn = document.querySelector('#closeGoalsModalBtn');
const saveGoalsBtn = document.querySelector('#saveGoalsBtn');
const caloriesGoalDisplay = document.querySelector('.calories-goalDisplay');
const selectedProductsContainer = document.querySelector('.selected-products-container');
const totalCaloriesDisplay = document.querySelector('#totalCalories');

// Инициализация переменных и получение сохраненных целей из localStorage
let showProductList = false;
let goals = JSON.parse(localStorage.getItem('goals')) || [];
const currentDate = new Date().toLocaleDateString();

// Обработчики
document.addEventListener('DOMContentLoaded', () => {
    openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    const clearAllDataBtn = document.querySelector('#clearAllDataBtn');
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

    const dropZone = document.querySelector('.selectedProducts');
    dropZone.addEventListener('dragover', allowDrop);
    dropZone.addEventListener('drop', handleDrop);

    // Инициализация отображения продуктов, целевых каллорий и выбранных продуктов
    displayProducts();
    displayGoals();
    displaySelectedProducts();
});

// Открытие модального окна
const openModal = () => {
    modal.style.display = 'block';
};

// Закрытие модального окна
const closeModal = () => {
    modal.style.display = 'none';
};

// Обработчик отправки формы продукта
const handleProductFormSubmit = (e) => {
    // Отмена стандартного поведения формы
    e.preventDefault();

    // Получение значений полей формы продукта
    const productName = document.querySelector('#productName').value;
    const calories = document.querySelector('#calories').value;
    const description = document.querySelector('#description').value;

    // Проверка на заполненность всех полей
    if (!productName || !calories || !description) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Создание экземпляра продукта и сохранение в localStorage
    const product = new Product(productName, calories, description);
    saveProduct(product);

    // Сброс формы, закрытие модального окна и обновление отображения продуктов
    productForm.reset();
    closeModal();
    displayProducts();
};

// Обработчик для удаления из списка продуктов
const handleProductListClick = (e) => {
    // Проверка, что клик произошел по кнопке удаления
    if (e.target.classList.contains('delete-btn')) {
        // Получение и удаление продукта по ID
        const productId = e.target.dataset.productId;
        deleteProduct(productId);
        // Обновление отображения продуктов
        displayProducts();
    }
};

// Переключение видимости списка продуктов
const toggleProductListVisibility = () => {
    showProductList = !showProductList;
    // Изменение стиля отображения списка продуктов (Виден/ отключен)
    productList.style.display = showProductList ? 'none' : 'grid';
    // Изменение текста кнопки переключения видимости
    productListShow.textContent = showProductList ? 'Показать список продуктов' : 'Скрыть список продуктов';
};

// Переключение направления сортировки списка продуктов
const toggleSortDirection = () => {
    sortDirection.toggle();
    // Обновление рендеринга продуктов с учетом нового порядка сортировки
    displayProducts();
};

// Открытие модального окна для целевых каллорий
const openGoalsModal = () => {
    goalsModal.style.display = 'block';
};

// Закрытие модального окна для целевых каллорий
const closeGoalsModal = () => {
    goalsModal.style.display = 'none';
};

// Сохранение установленной цели по калориям
const saveGoals = () => {
    // Получение значения цели из поля ввода
    const caloriesGoal = document.querySelector('#caloriesGoal').value;
    // Проверка наличия введенного значения
    if (!caloriesGoal) {
        alert('Укажите цель по калориям на сегодня');
        return;
    }

    // Получение текущей даты и загрузка сохраненных целей из localStorage
    const currentDate = new Date().toLocaleDateString();
    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    // Поиск цели для текущей даты в сохраненных целях
    const existingGoalIndex = goals.findIndex(goal => goal.date === currentDate);

    // Обновление существующей цели или добавление новой
    if (existingGoalIndex !== -1) {
        goals[existingGoalIndex].caloriesGoal = caloriesGoal;
    } else {
        goals.push({ date: currentDate, caloriesGoal });
    }

    // Сохранение обновленных целей в localStorage, закрытие модального окна и обновление отображения целей
    localStorage.setItem('goals', JSON.stringify(goals));
    closeGoalsModal();
    displayGoals();
};

// Удаление продукта по ID
const deleteProduct = (productId) => {
    // Загрузка сохраненных продуктов из localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // Фильтрация продуктов, исключая продукт с заданным ID
    products = products.filter(product => product.id !== productId);
    // Сохранение обновленного списка продуктов в localStorage
    localStorage.setItem('products', JSON.stringify(products));
};

// Сохранение продукта в localStorage
const saveProduct = (product) => {
    // Загрузка сохраненных продуктов из localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    // Добавление нового продукта к списку продуктов
    products.push({
        id: product.id,
        name: product.name,
        calories: product.calories,
        description: product.description
    });
    // Сохранение обновленного списка продуктов в localStorage
    localStorage.setItem('products', JSON.stringify(products));
};

// Отображение списка продуктов с учетом фильтрации и сортировки
const displayProducts = () => {
    // Получение значения фильтра по имени
    const filterByName = filterInput.value.toLowerCase();
    // Загрузка сохраненных продуктов из localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Фильтрация продуктов по имени
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(filterByName));

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
const displayGoals = () => {
    const currentGoals = goals.find(goal => goal.date === currentDate);
    if (currentGoals) {
        caloriesGoalDisplay.textContent = `Сегодняшняя цель по калориям: ${currentGoals.caloriesGoal} ккал`;
    } else {
        caloriesGoalDisplay.textContent = 'Цель не задана';
    }
};

// Объект для управления направлением сортировки
const sortDirection = {
    ascending: true,
    toggle: function () {
        this.ascending = !this.ascending;
    },
};

// Добавление продукта к выбранным продуктам
const addToSelectedProducts = (product) => {
    // Получение текущей даты и загрузка сохраненных выбранных продуктов из localStorage
    const currentDate = new Date().toLocaleDateString();
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Поиск записи выбранных продуктов для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate);

    // Создание новой записи, если она отсутствует
    if (!currentDateEntry) {
        currentDateEntry = { date: currentDate, products: [] };
        selectedProducts.push(currentDateEntry);
    }

    // Добавление продукта к текущей дате
    currentDateEntry.products.push([{
        id: product.id,
        name: product.name,
        calories: product.calories,
    }]);

    // Сохранение обновленных выбранных продуктов в localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
};

// Позволяет браузеру обрабатывать событие перетаскивания
const allowDrop = (e) => {
    e.preventDefault();
};

// Обработка события "drop" при перетаскивании продукта
const handleDrop = (e) => {
    e.preventDefault();
    // Получение id продукта из перетаскиваемых данных
    const productId = e.dataTransfer.getData('text/plain');
    // Получение продукта по id и добавление его к выбранным продуктам
    const product = getProductById(productId);

    if (product) {
        addToSelectedProducts(product);
        // Обновление отображения выбранных продуктов
        displaySelectedProducts();
    }
};

// Получение продукта по id
const getProductById = (productId) => {
    // Загрузка сохраненных продуктов из localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Поиск продукта по id
    return products.find(product => product.id === productId);
};

// Обработка события при начале перетаскивания продукта
const handleDragStart = (e, productId) => {
    // Установка id для перетаскивания
    e.dataTransfer.setData('text/plain', productId);
};

// Отображение предупреждающего модального окна
const showWarningModal = () => {
    // Создание контейнера модального окна
    const modalContainer = document.createElement('div');
    modalContainer.className = 'warning-modal';

    // Создание элементов модального окна
    const modalContent = document.createElement('div');
    modalContent.className = 'warning-modal-content';
    modalContent.innerHTML = `<span>Превышен дневной лимит калорий!</span>`;

    // Создание кнопки закрытия модального окна
    const closeButton = document.createElement('button');
    closeButton.innerHTML = `&times`;
    closeButton.className = 'close';
    closeButton.addEventListener('click', () => {
        modalContainer.remove();
    });

    // Добавление кнопки закрытия в содержимое модального окна
    modalContent.appendChild(closeButton);
    // Добавление содержимого модального окна в контейнер
    modalContainer.appendChild(modalContent);

    // Добавление контейнера модального окна в body документа
    document.body.appendChild(modalContainer);
};

// Функция для проверки лимита каллорий
const checkDailyCaloriesLimit = () => {
    // Получение текущей даты
    const currentDate = new Date().toLocaleDateString();

    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate);

    // Проверка превышения лимита калорий
    if (currentDateEntry) {
        const totalCalories = currentDateEntry.products.reduce((sum, productGroup) => {
            return sum + productGroup.reduce((productSum, product) => productSum + parseInt(product.calories), 0);
        }, 0);

        // Получение целей из localStorage
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        // Поиск текущих целей для текущей даты
        const currentGoals = goals.find(goal => goal.date === currentDate);

        // Сравнение суммарных калорий с установленной целью
        if (currentGoals && totalCalories > currentGoals.caloriesGoal) {
            // Вывод предупреждения о превышении
            showWarningModal();
        }
    }
};

// Отрисовка диаграммы
const drawChart = (chartData) => {
    // Получение элемента canvas
    const canvas = document.querySelector('#chartCanvas');

    // Проверка наличия элемента canvas
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    // Получение контекста рисования на canvas
    const ctx = canvas.getContext('2d');
    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Определение параметров для рисования графиков
    const barWidth = 4;
    const spacing = 5;
    const chartHeight = canvas.height - 40;

    // Рисование каждой колонки на графике
    chartData.forEach((data, index) => {
        const x = index * (barWidth + spacing) * 2 + spacing;

        // Рисование синей колонки для потребленных калорий
        ctx.fillStyle = 'blue';
        const consumedHeight = (data.totalCalories / data.maxValue) * chartHeight / 5;
        ctx.fillRect(x, chartHeight - consumedHeight, barWidth, consumedHeight);

        // Рисование красной колонки для целевых калорий
        ctx.fillStyle = 'red';
        const targetHeight = (data.targetCalories / data.maxValue) * chartHeight / 5;
        ctx.fillRect(x + barWidth + spacing, chartHeight - targetHeight, barWidth, targetHeight);

        // Рисование даты под каждой колонкой
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';

        ctx.save();
        ctx.translate(x + barWidth / 2, canvas.height - 21);
        ctx.rotate(Math.PI / 3);
        ctx.fillText(data.date, 0, 0);
        ctx.restore();
    });
};

// Отрисовка графика
const displayChart = () => {
    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Преобразование данных для отображения на графике
    const chartData = selectedProducts.map(entry => {
        const totalCalories = entry.products.reduce((sum, productGroup) => {
            return sum + productGroup.reduce((productSum, product) => productSum + parseInt(product.calories), 0);
        }, 0);

        // Получение целей из localStorage
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        // Поиск текущих целей для текущей даты
        const currentGoals = goals.find(goal => goal.date === entry.date);

        // Определение данных для графика
        const targetCalories = currentGoals ? parseInt(currentGoals.caloriesGoal) : 0;

        return {
            date: entry.date,
            totalCalories: totalCalories,
            targetCalories: targetCalories,
            maxValue: Math.max(totalCalories, targetCalories),
        };
    });

    // Отрисовка графика
    drawChart(chartData);
};

// Удаление из массива съеденных
const removeSelectedProduct = (productId) => {
    // Получение текущей даты
    const currentDate = new Date().toLocaleDateString();

    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate);

    // Удаление продукта по его id
    if (currentDateEntry) {
        currentDateEntry.products = currentDateEntry.products.map(productGroup =>
            productGroup.filter(product => product.id !== productId)
        );

        // Удаление пустых групп продуктов
        currentDateEntry.products = currentDateEntry.products.filter(productGroup => productGroup.length > 0);

        // Удаление записи, если в ней нет продуктов
        if (currentDateEntry.products.length === 0) {
            selectedProducts = selectedProducts.filter(entry => entry.date !== currentDate);
        }

        // Сохранение изменений в localStorage
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }
};

// Рендеринг съеденных продуктов
const displaySelectedProducts = () => {
    // Получение текущей даты
    const currentDate = new Date().toLocaleDateString();

    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Поиск записи о продуктах для текущей даты
    let currentDateEntry = selectedProducts.find(entry => entry.date === currentDate);

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

// Удаление данных из localStorage и перезагрузка страницы
const clearAllData = () => {
    localStorage.removeItem('products');
    localStorage.removeItem('goals');
    localStorage.removeItem('selectedProducts');
    location.reload();
};
