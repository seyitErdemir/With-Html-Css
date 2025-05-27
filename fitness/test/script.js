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
    biceps: [
        {
            name: "Bicep Curl",
            description: "Ayakta, ellerde dambıllarla ön kolları yukarı doğru bükme hareketi.",
            sets: "3-4 set",
            reps: "10-12 tekrar"
        },
        {
            name: "Hammer Curl",
            description: "Ayakta, ellerde dambıllarla çekiç tutuş pozisyonunda kaldırma hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
        }
    ],
    forearms: [
        {
            name: "Wrist Curl",
            description: "Oturarak, ön kolları dizler üzerinde tutup bilekleri yukarı doğru bükme.",
            sets: "3 set",
            reps: "15-20 tekrar"
        },
        {
            name: "Reverse Wrist Curl",
            description: "Oturarak, ön kolları dizler üzerinde tutup bilekleri aşağı doğru bükme.",
            sets: "3 set",
            reps: "15-20 tekrar"
        }
    ],
    thighs: [
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
    calves: [
        {
            name: "Standing Calf Raise",
            description: "Ayakta, topukları yukarı kaldırma hareketi.",
            sets: "4 set",
            reps: "15-20 tekrar"
        },
        {
            name: "Seated Calf Raise",
            description: "Oturarak, topukları yukarı kaldırma hareketi.",
            sets: "3 set",
            reps: "15-20 tekrar"
        }
    ],
    back: [
        {
            name: "Pull-ups",
            description: "Asılı pozisyondan, kolları bükerek yukarı çekme hareketi.",
            sets: "3-4 set",
            reps: "Maksimum tekrar"
        },
        {
            name: "Bent Over Row",
            description: "Eğilerek, dambılları göğüs hizasına çekme hareketi.",
            sets: "3 set",
            reps: "10-12 tekrar"
        }
    ],
    'lower-back': [
        {
            name: "Deadlift",
            description: "Eğilerek, ağırlığı yerden kaldırma hareketi.",
            sets: "4 set",
            reps: "8-10 tekrar"
        },
        {
            name: "Back Extension",
            description: "Yüzüstü yatarak, üst vücudu yukarı kaldırma hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
        }
    ],
    triceps: [
        {
            name: "Tricep Pushdown",
            description: "Ayakta, kablolu makinede aşağı doğru itme hareketi.",
            sets: "3-4 set",
            reps: "12-15 tekrar"
        },
        {
            name: "Tricep Extension",
            description: "Oturarak veya ayakta, dambıllarla arkaya doğru itme hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
        }
    ],
    hamstrings: [
        {
            name: "Romanian Deadlift",
            description: "Ayakta, bacakları hafif bükerek öne eğilme hareketi.",
            sets: "3-4 set",
            reps: "10-12 tekrar"
        },
        {
            name: "Leg Curl",
            description: "Yüzüstü yatarak, bacakları bükme hareketi.",
            sets: "3 set",
            reps: "12-15 tekrar"
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