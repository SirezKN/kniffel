import {Component} from "react";
import {KniffelKind} from "./GameComponent";



export class GameField extends Component<{ kind: KniffelKind, fieldClicked: (kind: KniffelKind) => void }, {}>{


    render() {
            return <div onClick={() => this.props.fieldClicked(this.props.kind)}>
                <div>
                    {this.props.kind.name}
                </div>
                <div>
                    {this.props.kind.filled ? this.props.kind.value : '-'}
                </div>
            </div>;
        }
}