// Hover effect on game boxes
const game_boxes = document.querySelectorAll('.game_boxes img');
game_boxes.forEach(img => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease'; 
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
    });
});