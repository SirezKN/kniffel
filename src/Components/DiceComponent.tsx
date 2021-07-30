import {Component} from "react";
import {Dice, DiceState} from "./Dice";


export class DiceComponent extends Component<{ dice: () => void, dices: DiceState[], dicedTimes: number, lockDice: (lock: boolean, i: number) => void }, { }> {


    render() {
        return <div>
            {this.props.dices.map((d, i) => <Dice state={d} lock={(lock: boolean) => this.props.lockDice(lock, i)}/>)}
            <button onClick={this.props.dice}>Würfeln</button>
        </div>;
    }
}