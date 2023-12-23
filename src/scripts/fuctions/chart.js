import {canvas, storage} from "../variables.js";

// Отрисовка диаграммы
export const drawChart = (chartData) => {

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
export const displayChart = () => {
    // Получение выбранных продуктов из localStorage
    let selectedProducts = JSON.parse(localStorage.getItem(storage.selectedProducts)) || [];

    // Преобразование данных для отображения на графике
    const chartData = selectedProducts.map(entry => {
        const totalCalories = entry.products.reduce((sum, productGroup) => {
            return sum + productGroup.reduce((productSum, product) => productSum + parseInt(product.calories), 0);
        }, 0);

        // Получение целей из localStorage
        const goals = JSON.parse(localStorage.getItem(storage.goals)) || [];
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