import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import IMeal from './IMeal';
import INewMeal from './INewMeal';

/**
 *  Modul that handles the communication with the backend
 */

const serverUrl: string = process.env.REACT_APP_SERVER_URL ?? '';

const http = rateLimit(axios.create(), {
    maxRequests: 2,
    perMilliseconds: 10000,
});

function getReqConfig(token: string) {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
}

async function getMeals(token: string): Promise<IMeal[]> {
    let meals: IMeal[] = [];

    const header = getReqConfig(token);

    await http
        .get(serverUrl + '/meal', header)
        .then(
            (res) => {
                if (res?.data !== undefined) {
                    meals = res.data as IMeal[];
                } else {
                    console.log('undefined meals');
                    meals = [];
                }
            },
            (error) => {
                console.log(error);
            },
        )
        .catch((reason) => {
            console.log(reason);
        });
    return meals;
}

async function deleteMeal(id: string, token: string) {
    const reqConfig = getReqConfig(token);
    await http.delete(serverUrl + '/meal?id=' + id, reqConfig);
}

function updateMeal(id: string, meal: IMeal, token: string) {
    const reqConfig = getReqConfig(token);
    return http
        .put(serverUrl + '/meal', { Id: id, name: meal.name }, reqConfig)
        .then((response) => console.log('added with id ' + response.data.id));
}

function addMeal(meal: INewMeal, token: string) {
    const reqConfig = getReqConfig(token);
    http.post(serverUrl + '/meal', meal, reqConfig).then((response) =>
        console.log('added with id ' + response.data.id),
    );
}

export { getMeals, deleteMeal, updateMeal, addMeal };
