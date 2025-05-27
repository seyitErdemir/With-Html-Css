const exercises = {
    shoulders: [
        {
            name: "Dumbbell Shoulder Press",
            description: "Ayakta veya oturarak, ellerde dambıllarla omuz hizasında başlayıp yukarı doğru itme hareketi.",
            sets: "3-4 set",
            reps: "8-12 tekrar"
        },
        {
            name: "Lateral Raise",
            description: "Ayakta, ellerde dambıllarla yanlara doğru kaldırma hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
        }
    ],
    chest: [
        {
            name: "Bench Press",
            description: "Sırt üstü yatarak, barbell veya dambıllarla göğüs hizasından yukarı itme hareketi.",
            sets: "4 set",
            reps: "8-12 tekrar"
        },
        {
            name: "Push-ups",
            description: "Şınav pozisyonunda, vücudu yukarı itme hareketi.",
            sets: "3 set",
            reps: "Maksimum tekrar"
        }
    ],
    abs: [
        {
            name: "Crunches",
            description: "Sırt üstü yatarak, karın kaslarını kasarak üst vücudu kaldırma hareketi.",
            sets: "3 set",
            reps: "15-20 tekrar"
        },
        {
            name: "Plank",
            description: "Şınav pozisyonunda, dirsekler üzerinde durarak karın kaslarını sıkma.",
            sets: "3 set",
            reps: "30-60 saniye"
        }
    ],
    legs: [
        {
            name: "Squats",
            description: "Ayakta, bacakları bükerek çömelme hareketi.",
            sets: "4 set",
            reps: "10-12 tekrar"
        },
        {
            name: "Lunges",
            description: "Ayakta, bir adım öne atarak çömelme hareketi.",
            sets: "3 set",
            reps: "Her bacak için 10-12 tekrar"
        }
    ],
    glutes: [
        {
            name: "Hip Thrust",
            description: "Sırt üstü yatarak, kalçayı yukarı kaldırma hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
        },
        {
            name: "Glute Bridge",
            description: "Sırt üstü yatarak, dizleri büküp kalçayı yukarı kaldırma.",
            sets: "3 set",
            reps: "15-20 tekrar"
        }
    ]
};

function showExercises(bodyPart) {
    const container = document.getElementById('exerciseContainer');
    const exerciseList = exercises[bodyPart];
    
    let html = '<div class="exercise-list">';
    exerciseList.forEach(exercise => {
        html += `
            <div class="exercise-item">
                <h3>${exercise.name}</h3>
                <p>${exercise.description}</p>
                <p><strong>Set:</strong> ${exercise.sets}</p>
                <p><strong>Tekrar:</strong> ${exercise.reps}</p>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
} 