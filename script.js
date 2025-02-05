document.addEventListener('DOMContentLoaded', () => {
    const currentWeightDropdown = document.getElementById('current-weight');
    const output = document.getElementById('output');
    const scheduleOutput = document.getElementById('schedule');
    const mealsOutput = document.getElementById('meals');
    const waterOutput = document.getElementById('water');

    // Populate weight dropdown (1 to 800 lbs)
    for (let i = 1; i <= 800; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} lbs`;
        currentWeightDropdown.appendChild(option);
    }

    // Handle form submission
    document.getElementById('calculate').addEventListener('click', () => {
        const currentWeight = parseInt(document.getElementById('current-weight').value);
        const goalLoss = parseFloat(document.getElementById('goal-loss').value);
        const wakeTime = document.getElementById('wake-time').value;
        const workStart = document.getElementById('work-start').value;
        const break1 = document.getElementById('break1').value;
        const lunchTime = document.getElementById('lunch-time').value;
        const break2 = document.getElementById('break2').value;
        const workEnd = document.getElementById('work-end').value;

        // Calculate caloric deficit
        const dailyCaloricDeficit = goalLoss * 500;

        // Suggest exercise
        const exercisePlan = `
            Morning: None (per your preference).
            After Work: Walk for 30 minutes at a brisk pace.
            Alternatives: High knees (3 sets x 30 seconds), Jumping Jacks (3 sets x 1 minute).
        `;

        // Suggest meal options
        const mealOptions = `
            Breakfast: Oatmeal with banana, Greek yogurt, or eggs with spinach.
            Lunch: Grilled chicken salad, turkey sandwich, or quinoa bowl with veggies.
            Dinner: Baked salmon, lean beef stir fry, or grilled tofu with sweet potatoes.
        `;

        // Water intake
        const waterIntake = `
            By Lunch: Drink at least 2 bottles of water.
            Total Goal: Drink 8 bottles (16 oz each) by the end of the day.
        `;

        // Generate schedule
        const schedule = `
            Wake-Up Time: ${wakeTime}.
            Work Start: ${workStart}.
            First Break: ${break1}.
            Lunch: ${lunchTime}.
            Second Break: ${break2}.
            Work End: ${workEnd}.
            Workout: 30 minutes of walking or alternatives after ${workEnd}.
        `;

        // Display results
        scheduleOutput.textContent = schedule;
        mealsOutput.textContent = mealOptions;
        waterOutput.textContent = waterIntake;
    });
});