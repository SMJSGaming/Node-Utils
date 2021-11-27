import { Case } from "../enums/Case";

export class Converter {

    public static caseConverter(inputText: string, inputCase: Case, outputCase: Case): string {
        let joinChar = "";
        let splitRegex: RegExp | string;
        let mapCallback = (word: string) => word;
        let afterProcess = (input: string) => input;

        switch (inputCase) {
            case Case.CAMEL:
                splitRegex = /(?=[A-Z])/;
                break;
            case Case.SNAKE:
                splitRegex = "_";
                break;
            case Case.KEBAB:
                splitRegex = "-";
                break;
            case Case.PASCAL:
                splitRegex = /(?=[A-Z])/;
                break;
            case Case.UPPER:
                splitRegex = "_";
                break;
            case Case.TITLE:
                splitRegex = " ";
                break;
            case Case.NORMAL:
                splitRegex = " ";
        }

        switch (outputCase) {
            case Case.CAMEL:
                mapCallback = (word) => word.charAt(0).toUpperCase() + word.slice(1);
                afterProcess = (input) => input.charAt(0).toLowerCase() + input.slice(1);
                break;
            case Case.SNAKE:
                joinChar = "_";
                break;
            case Case.KEBAB:
                joinChar = "-";
                break;
            case Case.PASCAL:
                mapCallback = (word) => word.charAt(0).toUpperCase() + word.slice(1);
                break;
            case Case.UPPER:
                joinChar = "_";
                mapCallback = (word) => word.toUpperCase();
                break;
            case Case.TITLE:
                joinChar = " ";
                mapCallback = (word) => word.charAt(0).toUpperCase() + word.slice(1);
                break;
            case Case.NORMAL:
                joinChar = " ";
                break;
        }

        return afterProcess(inputText.split(splitRegex).map(mapCallback).join(joinChar));
    }

    // TODO: Add converter registration and selection
}