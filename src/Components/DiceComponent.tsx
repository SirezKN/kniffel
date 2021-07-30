import {Component} from "react";
import {Dice, DiceState} from "./Dice";


export class DiceComponent extends Component<{ dice: (states: DiceState[]) => void }, { dices: DiceState[], dicedTimes: number }> {

    constructor(props: any) {
        super(props);
        this.state = {
            dices: [
                {
                    locked: false,
                    value: undefined,
                },
                {
                    locked: false,
                    value: undefined,
                },
                {
                    locked: false,
                    value: undefined,
                },
                {
                    locked: false,
                    value: undefined,
                },
                {
                    locked: false,
                    value: undefined,
                },
            ],
            dicedTimes: 0
        }
    }

    private lockDice(lock: boolean, i: number) {
        this.setState({
            dices: this.state.dices.map((d, index) => i == index ? {
                value: d.value,
                locked: lock
            } : d)
        });
    }

    render() {
        return <div>
            {this.state.dices.map((d, i) => <Dice state={d} lock={(lock: boolean) => this.lockDice(lock, i)}/>)}
            <button onClick={() => this.dice()}>Würfeln</button>
        </div>;
    }

    private dice() {
        if (this.state.dicedTimes < 3) {
            this.setState({
                dices: this.state.dices.map((d, index) => d.locked ? d : {
                    value: Math.floor(Math.random() * 6) + 1,
                    locked: d.locked
                }),
                dicedTimes: this.state.dicedTimes + 1
            })
        }
    }
}