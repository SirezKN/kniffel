import {Component} from "react";

export interface DiceState {
    value: number | undefined,
    locked: boolean
}

export class Dice extends Component<{ state: DiceState, lock: (isLocked: boolean) => void }, {}> {


    render() {
        return <div>
            <button>
                {this.props.state.value != undefined ? this.props.state.value : '?'}
            </button>
            <button onClick={() => this.toggleLock()}>
                {!this.props.state.locked ? 'Behalten' : 'Freigeben'}
            </button>
        </div>;
    }

    private toggleLock() {
        let newState = !this.props.state.locked;
        this.setState(
            {locked: newState}
        )
        this.props.lock(newState);
    }
}