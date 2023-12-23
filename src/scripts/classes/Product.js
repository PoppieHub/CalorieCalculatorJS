import { create_UUID } from '../utils/uuid.js';

export default class Product {
    constructor(name, calories, description) {
        this._id = create_UUID();
        this._name = name;
        this._calories = calories;
        this._description = description;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get calories() {
        return this._calories;
    }

    set calories(calories) {
        this._calories = calories;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }
}
