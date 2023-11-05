import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
const createUser = () => {
    let users = [];
    for (let i = 0; i <= 10; i++) { // Adjusted loop to run 11 times
        let userObj = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 90000000),
            balance: 1000000 * i,
        };
        users.push(userObj);
    }
    return users;
};
// ATM machine
const atmMachine = async (users) => {
    try {
        const response = await inquirer.prompt({
            type: "number",
            message: "Enter your PIN code",
            name: "pin",
        });
        const findingUser = users.find((user) => user.pin === response.pin);
        if (findingUser) {
            console.log(chalk.green(`Welcome ${findingUser.name} to your Account`));
            await atmFunc(findingUser);
        }
        else {
            console.log(chalk.red("Invalid User Pin"));
        }
    }
    catch (error) {
        console.error(chalk.red("An error occurred: " + error));
    }
};
const atmFunc = async (findingUser) => {
    try {
        const answer = await inquirer.prompt({
            type: "list",
            name: "Select",
            message: "Choose the selection that you want to do",
            choices: ["Withdraw", "Balance", "Deposit", "Exit"],
        });
        if (answer.Select === "Withdraw") {
            const amount = await inquirer.prompt({
                type: "number",
                message: "Enter Amount",
                name: "amount",
            });
            if (amount.amount > findingUser.balance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                findingUser.balance -= amount.amount;
                console.log(chalk.green(`Withdraw amount: ${amount.amount}`));
                console.log(chalk.yellow(`Total Balance: ${findingUser.balance}`));
            }
        }
        if (answer.Select === "Balance") {
            console.log(chalk.yellow(`Balance: ${findingUser.balance}`));
        }
        if (answer.Select === "Deposit") {
            const deposit = await inquirer.prompt({
                type: "number",
                message: "Enter Deposit Amount",
                name: "amount",
            });
            findingUser.balance += deposit.amount;
            console.log(chalk.green(`Deposit amount: ${deposit.amount}`));
            console.log(chalk.yellow(`Total Balance: ${findingUser.balance}`));
        }
        if (answer.Select === "Exit") {
            console.log(chalk.blue("Thanks For Using This ATM...."));
        }
    }
    catch (error) {
        console.error(chalk.red("An error occurred: " + error));
    }
};
const users = createUser();
atmMachine(users);
