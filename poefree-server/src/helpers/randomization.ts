export type RandomProfileInfo = {
    imagePath: string,
    name: string
}

export function getRandomProfileInfo(): RandomProfileInfo {
    const BASE_IMAGE_PATH = "/uploads/default/";
    const imagePaths = [
        "socrates-owl.webp",
        "quill-fox.webp",
        "epicurean-lion.webp",
        "aristotle-hare.webp",
        "plato-panda.webp",
        "dante-dog.webp",
        "virgil-cat.webp",
        "confucius-koala.webp",
        "poet-peacock.webp",
        "voltaire-turtle.webp"
    ];
    const possibleNames = [
        "Socrates Owl",
        "Quill Fox",
        "Epicurean Lion",
        "Aristotle Hare",
        "Plato Panda",
        "Dante Dog",
        "Virgil Cat",
        "Confucius Koala",
        "Poet Peacock",
        "Voltaire Turtle"
    ];

    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return {
        imagePath: BASE_IMAGE_PATH + imagePaths[randomIndex],
        name: possibleNames[randomIndex]
    };
}
