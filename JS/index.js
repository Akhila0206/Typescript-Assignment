"use strict";
// Astronaut Class
class Astronaut {
    constructor(massKg, name) {
        this.massKg = massKg;
        this.name = name;
    }
}
// Cargo Class
class Cargo {
    constructor(massKg, material) {
        this.massKg = massKg;
        this.material = material;
    }
}
// Rocket Class
class Rocket {
    constructor(name, totalCapacityKg) {
        this.name = name;
        this.totalCapacityKg = totalCapacityKg;
        this.cargoItems = [];
        this.astronauts = [];
        this.currentRocketMass = 0;
        this.sumMass = (items) => {
            let totalMass = 0;
            items.forEach((item) => {
                totalMass += item.massKg;
            });
            return totalMass;
        };
        this.canAdd = (item) => this.currentRocketMass + item.massKg <= this.totalCapacityKg;
        this.addCargo = (cargo) => {
            if (this.canAdd(cargo)) {
                this.cargoItems.push(cargo);
                this.currentRocketMass = this.sumMass([...this.cargoItems, ...this.astronauts]);
                return true;
            }
            return false;
        };
        this.addAstronaut = (astronaut) => {
            if (this.canAdd(astronaut)) {
                this.astronauts.push(astronaut);
                this.currentRocketMass = this.sumMass([...this.cargoItems, ...this.astronauts]);
                return true;
            }
            return false;
        };
        this.currentMassKg = () => this.currentRocketMass;
    }
}
// Simulation
const astronaut = new Astronaut(75, 'John');
const cargo = new Cargo(100, 'Food Supplies');
const rocket = new Rocket('SpaceX', 1000);
console.log(`Adding astronaut to ${rocket.name} rocket: ${rocket.addAstronaut(astronaut)}`); // Output: Adding astronaut: true
console.log(`Adding cargo to ${rocket.name} rocket: ${rocket.addCargo(cargo)}`); // Output: Adding cargo: true
console.log(`Current mass of ${rocket.name} rocket: ${rocket.currentMassKg()} kg`); // Output: Current rocket mass: 175 kg
