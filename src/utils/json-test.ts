import { faker } from '@faker-js/faker';

const test = () => {
    let obj:any = {};
    for (let i = 0 ; i <= 3000; i++){
        obj[`data_${i}`] = faker.name.findName()+faker.name.jobTitle()
    }
    return obj;
}

console.log(JSON.stringify(test()));
