export const SPLIT_QUESTION_IN_PARTS = questionText => {
    let numberOfSpaces = 0;
    const tempQuestionParts = questionText.split("___________");
    const questionParts = tempQuestionParts.map(part => {
        return { text: part, val: "text" };
    });

    let insert = false;
    tempQuestionParts.forEach((part, index) => {
        if (insert) {
            numberOfSpaces++;
            questionParts.splice(index, 0, { text: "___________", val: "void" });
        } else if ((index === tempQuestionParts.length - 1 && !part)) {
            numberOfSpaces++;
            questionParts.splice(index + 1, 0, { text: "___________", val: "void" });
        }
        insert = !insert;
    });
    if (!questionParts[0].text) {
        questionParts.splice(0, 1);
    }

    if (!questionParts[questionParts.length - 1].text) {
        questionParts.splice(questionParts.length - 1, 1);
    }

    return [questionParts, numberOfSpaces];
};

export const ADD_PART_IN_QUESTION = (questionParts, questionPartText, numberOfSpaces) => {
    const index = questionParts.length - 1;

    if (!questionPartText) {
        if ((!questionParts[index] || questionParts[index].val === "text") && numberOfSpaces < 3) {
            questionParts.push({ text: "___________", val: "void" });
            numberOfSpaces++;
        }
    } else {
        if (!questionParts[index] || questionParts[index].val === "void") {
            questionParts.push({ text: questionPartText, val: "text" });
            questionPartText = "";
        }
    }
    return [questionParts, questionPartText, numberOfSpaces];
};

export const REMOVE_PART_IN_QUESTION = (questionParts, questionPartText, numberOfSpaces) => {
    const index = questionParts.length - 1;
    if (questionParts[index]) {
        if (questionParts[index].val === "void") {
            numberOfSpaces--;
        }
        questionParts.splice(index, 1);
        questionPartText = "";
    }
    return [questionParts, questionPartText, numberOfSpaces];
};