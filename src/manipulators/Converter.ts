import { UnregisteredConversionException } from "../errors/UnregisteredConversionException";
import { parameterCallback } from "../types/parameterCallback";
import { TypeConverter } from "../interfaces/TypeConverter";
import { DynamicClass } from "../interfaces/DynamicClass";
import { Case } from "../enums/Case"

export class Converter {

    private static readonly CONVERTERS: TypeConverter[] = [];

    public static registerConverter<T extends DynamicClass<T["prototype"]>, U extends DynamicClass<U["prototype"]>>(converter: parameterCallback<T["prototype"], U["prototype"]>, inputClass: T, outputClass: U): void {
        const key = Object.values(Converter.CONVERTERS).findIndex((value) => Object.is(value.classObject, inputClass));

        if (key == -1) {
            Converter.CONVERTERS.push({
                classObject: inputClass,
                converts: [
                    {
                        classObject: outputClass,
                        converter
                    }
                ]
            });
        } else {
            const converterKey = Converter.CONVERTERS[key].converts.findIndex((value) => Object.is(value.classObject, outputClass));

            if (converterKey == -1) {
                Converter.CONVERTERS[key].converts.push({
                    classObject: outputClass,
                    converter
                });
            } else {
                Converter.CONVERTERS[key].converts[converterKey].converter = converter;
            }
        }
    }

    public static convert<T extends DynamicClass<T["prototype"]>, U extends DynamicClass<U["prototype"]>>(value: T["prototype"], inputClass: T, outputClass: U): U {
        const converter = Object.values(Converter.CONVERTERS)
            .filter((typeConverter) => Object.is(typeConverter.classObject, inputClass))[0]
            ?.converts.filter((converter) => Object.is(converter.classObject, outputClass))[0]
            ?.converter;

        if (converter) {
            return converter(value);
        } else {
            throw new UnregisteredConversionException();
        }
    }

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
}