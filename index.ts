// Payload interface
interface Payload {
    massKg: number;
  }
  
  // Astronaut Class
  class Astronaut implements Payload {
    constructor(public massKg: number, public name: string) {}
  }
  
  // Cargo Class
  class Cargo implements Payload {
    constructor(public massKg: number, public material: string) {}
  }
  
  // Rocket Class
  class Rocket {
    cargoItems: Cargo[] = [];
    astronauts: Astronaut[] = [];
    currentRocketMass: number = 0;
  
    constructor(public name: string, public totalCapacityKg: number) {}
  
    sumMass = (items: Payload[]): number => {
      let totalMass = 0;
      items.forEach((item) => {
        totalMass += item.massKg;
      });
      return totalMass;
    };
  
    canAdd = (item: Payload): boolean => this.currentRocketMass + item.massKg <= this.totalCapacityKg;
  
    addCargo = (cargo: Cargo): boolean => {
      if (this.canAdd(cargo)) {
        this.cargoItems.push(cargo);
        this.currentRocketMass = this.sumMass([...this.cargoItems, ...this.astronauts]);
        return true;
      }
      return false;
    };
  
    addAstronaut = (astronaut: Astronaut): boolean => {
      if (this.canAdd(astronaut)) {
        this.astronauts.push(astronaut);
        this.currentRocketMass = this.sumMass([...this.cargoItems, ...this.astronauts]);
        return true;
      }
      return false;
    };
  
    currentMassKg = (): number => this.currentRocketMass;
  }
  
  // Simulation
  const astronaut = new Astronaut(75, 'John');
  const cargo = new Cargo(100, 'Food Supplies');
  const rocket = new Rocket('SpaceX', 1000);
  
  console.log(`Adding astronaut to ${rocket.name} rocket: ${rocket.addAstronaut(astronaut)}`); // Output: Adding astronaut: true
  console.log(`Adding cargo to ${rocket.name} rocket: ${rocket.addCargo(cargo)}`); // Output: Adding cargo: true
  console.log(`Current mass of ${rocket.name} rocket: ${rocket.currentMassKg()} kg`); // Output: Current rocket mass: 175 kg
  