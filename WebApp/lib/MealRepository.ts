import IMeal from './IMeal';

interface IMealRepository {
    getMealsAsync(): Promise<IMeal[]>;
    getMealAsync(id: string): Promise<IMeal>;
    updateMealAsync(id: string, updatedMeal: IMeal): Promise<IMeal>;
    deleteMealAsync(id: string): Promise<void>;
    addMealAsync(meal: IMeal): Promise<IMeal>;
}

class InMemoryMealRepository implements IMealRepository {
    meals = { '1': { id: '1', name: 'Bratkartoffeln' }, '2': { id: '2', name: 'Beispiel Essen' } };

    getMealsAsync(): Promise<IMeal[]> {
        return new Promise((resolve) => {
            const tempMeals: IMeal[] = [];
            for (const key in this.meals) {
                tempMeals.push(this.meals[key]);
            }
            resolve(tempMeals);
        });
    }

    getMealAsync(id: string): Promise<IMeal> {
        return new Promise((resolve) => {
            resolve(this.meals[id]);
        });
    }

    updateMealAsync(id: string, updatedMeal: IMeal): Promise<IMeal> {
        this.meals[id] = updatedMeal;
        return new Promise((resolve) => {
            resolve(this.meals[id]);
        });
    }

    deleteMealAsync(id: string): Promise<void> {
        delete this.meals[id];
        return new Promise((resolve) => {
            resolve(null);
        });
    }

    addMealAsync(meal: IMeal): Promise<IMeal> {
        const maxId = Object.keys(this.meals).reduce((prevValue, currentValue) =>
            prevValue > currentValue ? prevValue : currentValue,
        );
        const maxIdNumber = Number(maxId);
        const newId = maxIdNumber + 1;
        meal.id = newId.toString();
        this.meals[meal.id] = meal;

        return new Promise((resolve) => {
            resolve(null);
        });
    }
}

export default new InMemoryMealRepository();

//export default InMemoryMealRepository;
