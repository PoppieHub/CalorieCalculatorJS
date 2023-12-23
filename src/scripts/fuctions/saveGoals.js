import {storage} from "../variables.js";
import currentDate from "../utils/currentDate.js";
import {closeGoalsModal} from "./modal.js";
import {displayGoals} from "./displayFunctions.js";

// Сохранение установленной цели по калориям
export default function saveGoals() {
    // Получение значения цели из поля ввода
    const caloriesGoal = document.querySelector('#caloriesGoal').value;
    // Проверка наличия введенного значения
    if (!caloriesGoal) {
        alert('Укажите цель по калориям на сегодня');
        return;
    }

    // Получение текущих целей из localStorage
    let goals = JSON.parse(localStorage.getItem(storage.goals)) || [];

    // Поиск цели для текущей даты в сохраненных целях
    const existingGoalIndex = goals.findIndex(goal => goal.date === currentDate());

    // Обновление существующей цели или добавление новой
    if (existingGoalIndex !== -1) {
        goals[existingGoalIndex].caloriesGoal = caloriesGoal;
    } else {
        goals.push({ date: currentDate(), caloriesGoal });
    }

    // Сохранение обновленных целей в localStorage, закрытие модального окна и обновление отображения целей
    localStorage.setItem(storage.goals, JSON.stringify(goals));
    closeGoalsModal();
    displayGoals();
}