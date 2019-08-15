const mark = {
    fullName: 'mark',
    mass: 20,
    height:180,
    calculateBMI: function(){
        const BMI = this.mass / (this.height^2);
        console.log(BMI);
        return this.BMI;
    }
}

const john = {
    fullName: 'John',
    mass: 40,
    height:160,
}

john.calculateBMI = mark.calculateBMI;
john.calculateBMI();
