import React, {Component} from "react";
import {TopPart} from "./TopPart";
import {BottomPart} from "./BottomPart";
import {DiceComponent} from "./DiceComponent";
import {DiceState} from "./Dice";


export enum KniffelKindsType {
    fixed,
    variable
}

export enum DiceValues {
    eins = 1,
    zwei = 2,
    drei = 3,
    vier = 4,
    fünf = 5,
    sechs = 6
}


export interface KniffelKind {
    name: string;
    check: (dices: DiceState[]) => number;
    value: number | undefined;
    part: 'top' | 'bottom';
    type: KniffelKindsType;
    filled: boolean;
}

export const Kniffels: KniffelKind[] = [
    {
        name: 'Einer',
        check: dices => {
            return dices.map(d => d.value == 1 ? 0 + 1 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Zweier',
        check: dices => {
            return dices.map(d => d.value == 2 ? 0 + 2 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Dreier',
        check: dices => {
            return dices.map(d => d.value == 3 ? 0 + 3 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Vierer',
        check: dices => {
            return dices.map(d => d.value == 4 ? 0 + 4 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Fünfer',
        check: dices => {
            return dices.map(d => d.value == 5 ? 0 + 5 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false
    },
    {
        name: 'Sechser',
        check: dices => {
            return dices.map(d => d.value == 6 ? 0 + 6 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "top",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Dreierpasch',
        check: dices => {
            return dices.map(d => d.value == 3 ? 0 + 3 : 0).reduce((a, b) => a + b);
        },
        value: undefined,
        part: "bottom",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Viererpasch',
        value: undefined,
        part: "bottom",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Fullhouse',
        value: 25,
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Kleine Straße',
        value: 30,
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Große Straße',
        value: 40,
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Kniffel',
        value: 50,
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Chance',
        value: undefined,
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },

]


export class GameComponent extends Component<{}, {
    dicedTimes: number;
    finished: boolean;
    currentDices: DiceState[];
}> {


    render() {
        let topKniffels = Kniffels.filter(k => k.part == 'top');
        let bottomKniffels = Kniffels.filter(k => k.part == 'bottom');
        return <div>
            <TopPart kinds={topKniffels} fieldClicked={(kind: KniffelKind) => this.handleFieldClick(kind)}/>
            <BottomPart kinds={bottomKniffels}/>
            <DiceComponent dice={states => this.handleDice(states)}/>
        </div>;
    }

    private handleDice(states: DiceState[]) {
        this.setState({
            currentDices: states
        })
    }

    private handleFieldClick(kind: KniffelKind) {

    }
}