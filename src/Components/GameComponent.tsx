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
            let counts: { [key in number]: number } = {};
            dices.map(d => d.value == undefined ? 0 : d.value).forEach((x) => {
                counts[x] = (counts[x] != undefined ? counts[x] + 1 : 1)
            });
            let hit: boolean = false;
            dices.forEach(d => counts[d.value == undefined ? 0 : d.value] >= 3 && (hit = true));
            return hit ? dices.map(d => d.value == undefined ? 0 : d.value).reduce((a, b) => a + b) : 0;
        },
        value: undefined,
        part: "bottom",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Viererpasch',
        check: dices => {
            let counts: { [key in number]: number } = {};
            dices.map(d => d.value == undefined ? 0 : d.value).forEach((x) => {
                counts[x] = (counts[x] != undefined ? counts[x] + 1 : 1)
            });
            let hit: boolean = false;
            dices.forEach(d => counts[d.value == undefined ? 0 : d.value] >= 4 && (hit = true));
            return hit ? dices.map(d => d.value == undefined ? 0 : d.value).reduce((a, b) => a + b) : 0;
        },
        value: undefined,
        part: "bottom",
        type: KniffelKindsType.variable,
        filled: false,
    },
    {
        name: 'Fullhouse',
        value: 25,
        check: dices => {
            let counts: { [key in number]: number } = {};
            dices.map(d => d.value == undefined ? 0 : d.value).forEach((x) => {
                counts[x] = (counts[x] != undefined ? counts[x] + 1 : 1)
            });
            let hit: boolean = false;
            let sorted = dices.map(d => d.value == undefined ? 0 : d.value).sort();
            if (counts[sorted[0]] == 3 && counts[sorted[4]] == 2 || counts[sorted[0]] == 2 && counts[sorted[4]] == 3) {
                hit = true;
            }
            return hit ? 25 : 0;
        },
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Kleine Straße',
        value: 30,
        check: dices => {
            let unique = dices.map(d => d.value == undefined ? 0 : d.value).filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
            let sorted = unique.sort();
            return sorted.length == 4 && sorted[3] - sorted[0] == 3 ? 30 : 0;
        },
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Große Straße',
        value: 40,
        check: dices => {
            let sorted = dices.map(d => d.value == undefined ? 0 : d.value).sort();
            let hit = sorted[0] + 1 == sorted[1] && sorted[1] + 1 == sorted[2] && sorted[2] + 1 == sorted[3] && sorted[3] + 1 == sorted[4];
            return hit ? 40 : 0;
        },
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Kniffel',
        value: 50,
        check: dices => {
            let unique = dices.map(d => d.value == undefined ? 0 : d.value).filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
            return unique.length == 1 ? 50 : 0;
        },
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },
    {
        name: 'Chance',
        value: undefined,
        check: dices => {
            return dices.map(d => d.value == undefined ? 0 : d.value).reduce((a, b) => a + b);
        },
        part: "bottom",
        type: KniffelKindsType.fixed,
        filled: false,
    },

]

const dices = [
    {
        value: undefined,
        locked: false,
    },
    {
        value: undefined,
        locked: false,
    },
    {
        value: undefined,
        locked: false,
    },
    {
        value: undefined,
        locked: false,
    },
    {
        value: undefined,
        locked: false,
    }
];


export class GameComponent extends Component<{}, {
    dicedTimes: number;
    finished: boolean;
    currentDices: DiceState[];
    currentKnifs: KniffelKind[];
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            dicedTimes: 0,
            finished: false,
            currentDices: dices,
            currentKnifs: Kniffels
        }
    }

    render() {
        let topKniffels = this.state.currentKnifs.filter(k => k.part == 'top');
        let bottomKniffels = this.state.currentKnifs.filter(k => k.part == 'bottom');
        return <div>
            <TopPart kinds={topKniffels} fieldClicked={(kind: KniffelKind) => this.handleFieldClick(kind)}/>
            <BottomPart kinds={bottomKniffels} fieldClicked={(kind: KniffelKind) => this.handleFieldClick(kind)}/>
            <DiceComponent dicedTimes={this.state.dicedTimes} dices={this.state.currentDices} lockDice={(lock: boolean, i: number) => this.lockDice(lock, i)}
                           dice={() => this.dice()}/>
            <div>
                <div>Summe Gesamt:</div>
                <div>{topKniffels.map(a => a.value != undefined && a.filled ? a.value : 0).reduce((a, b) => a + b) + (bottomKniffels.map(a => a.value != undefined && a.filled ? a.value : 0).reduce((a, b) => a + b) > 65 ? bottomKniffels.map(a => a.value != undefined && a.filled ? a.value : 0).reduce((a, b) => a + b) + 35 : bottomKniffels.map(a => a.value != undefined && a.filled ? a.value : 0).reduce((a, b) => a + b))}</div>
            </div>
            <span>{this.state.finished && 'Game Over'}</span>
        </div>;
    }

    private handleFieldClick(kind: KniffelKind) {
        if (!kind.filled && this.state.dicedTimes > 0) {
            this.setState({
                currentKnifs: this.state.currentKnifs.map(k => kind.name == k.name ? {
                    ...k,
                    filled: true,
                    value: k.check(this.state.currentDices)
                } : k),
                currentDices: dices,
                dicedTimes: 0
            })
        }
        let l = this.state.currentKnifs.map(d => d.filled);
        let finished = true;
        console.log(JSON.stringify(l));
        l.forEach(l => !l && (finished = false));
        console.log(finished);
        if (finished) {
            this.setState({
                finished: true
            })
        }
    }


    private dice() {
        if (this.state.dicedTimes < 3) {
            this.setState({
                currentDices: this.state.currentDices.map((d, index) => d.locked ? d : {
                    value: Math.floor(Math.random() * 6) + 1,
                    locked: d.locked
                }),
                dicedTimes: this.state.dicedTimes + 1
            })
        }
    }

    private lockDice(lock: boolean, i: number) {
        if(this.state.dicedTimes > 0) {
            this.setState({
                currentDices: this.state.currentDices.map((d, index) => i == index ? {
                    value: d.value,
                    locked: lock
                } : d)
            });
        }
    }
}